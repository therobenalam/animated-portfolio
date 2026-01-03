'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveBrainProps {
  particleCount?: number;
  minRadius?: number;
  maxRadius?: number;
  particleColor?: string;
  connectionColor?: string;
  cursorInfluenceRadius?: number;
  connectionDistance?: number;
  restPositionStiffness?: number;
  neighborStiffness?: number;
}

export default function InteractiveBrain({
  particleCount = 2000,
  minRadius = 30,
  maxRadius = 150,
  particleColor = '#00ff88',
  connectionColor = '#00ff88',
  cursorInfluenceRadius = 100,
  connectionDistance = 15,
  restPositionStiffness = 0.015,
  neighborStiffness = 0.08,
}: InteractiveBrainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<{
    restPositions: Float32Array;
    neighbors: number[][];
    positions: Float32Array;
    prevPositions: Float32Array;
    geometry: THREE.BufferGeometry;
    points: THREE.Points;
  } | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const mouseRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 50));
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize particles with spherical distribution
    const positions = new Float32Array(particleCount * 3);
    const prevPositions = new Float32Array(particleCount * 3);
    const restPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(Math.random() * 2 - 1);
      const r = minRadius + Math.random() * (maxRadius - minRadius);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      prevPositions[i * 3] = x;
      prevPositions[i * 3 + 1] = y;
      prevPositions[i * 3 + 2] = z;

      restPositions[i * 3] = x;
      restPositions[i * 3 + 1] = y;
      restPositions[i * 3 + 2] = z;
    }

    // Pre-compute neighbor lists
    const neighbors: number[][] = [];
    const neighborDistance = connectionDistance * 2.5;

    for (let i = 0; i < particleCount; i++) {
      const neighborList: number[] = [];
      const px = positions[i * 3];
      const py = positions[i * 3 + 1];
      const pz = positions[i * 3 + 2];

      for (let j = 0; j < particleCount; j += 5) {
        if (i === j) continue;

        const dx = positions[j * 3] - px;
        const dy = positions[j * 3 + 1] - py;
        const dz = positions[j * 3 + 2] - pz;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < neighborDistance * neighborDistance) {
          neighborList.push(j);
        }
      }
      neighbors.push(neighborList);
    }

    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    particlesRef.current = {
      positions,
      prevPositions,
      restPositions,
      neighbors,
      geometry,
      points,
    };

    // Create line geometry for connections
    const maxConnections = particleCount * 10;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: connectionColor,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };

      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mouseRef.current.set(pos.x, pos.y, pos.z);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Window resize
    const onWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', onWindowResize);

    // Physics update with Position-Based Dynamics
    const updatePhysics = (deltaTime: number) => {
      if (!particlesRef.current) return;

      const { positions, prevPositions, restPositions, neighbors } = particlesRef.current;
      const damping = 0.98;

      // Step 1: Verlet integration (predict new positions)
      for (let i = 0; i < particleCount; i++) {
        const px = positions[i * 3];
        const py = positions[i * 3 + 1];
        const pz = positions[i * 3 + 2];

        const oldX = prevPositions[i * 3];
        const oldY = prevPositions[i * 3 + 1];
        const oldZ = prevPositions[i * 3 + 2];

        let vx = (px - oldX) * damping;
        let vy = (py - oldY) * damping;
        let vz = (pz - oldZ) * damping;

        // Cursor interaction with quadratic falloff
        const dx = px - mouseRef.current.x;
        const dy = py - mouseRef.current.y;
        const dz = pz - mouseRef.current.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < cursorInfluenceRadius && dist > 0.1) {
          const influence = 1 - dist / cursorInfluenceRadius;
          const cursorForce = 300 * influence * influence;
          const dirX = dx / dist;
          const dirY = dy / dist;
          const dirZ = dz / dist;

          vx += dirX * cursorForce * deltaTime;
          vy += dirY * cursorForce * deltaTime;
          vz += dirZ * cursorForce * deltaTime;
        }

        prevPositions[i * 3] = px;
        prevPositions[i * 3 + 1] = py;
        prevPositions[i * 3 + 2] = pz;

        positions[i * 3] = px + vx;
        positions[i * 3 + 1] = py + vy;
        positions[i * 3 + 2] = pz + vz;
      }

      // Step 2: Apply Position-Based Dynamics constraints
      const iterations = 3;

      for (let iter = 0; iter < iterations; iter++) {
        // Constraint 1: Rest position constraint
        for (let i = 0; i < particleCount; i++) {
          const px = positions[i * 3];
          const py = positions[i * 3 + 1];
          const pz = positions[i * 3 + 2];

          const restX = restPositions[i * 3];
          const restY = restPositions[i * 3 + 1];
          const restZ = restPositions[i * 3 + 2];

          const dx = restX - px;
          const dy = restY - py;
          const dz = restZ - pz;

          positions[i * 3] += dx * restPositionStiffness;
          positions[i * 3 + 1] += dy * restPositionStiffness;
          positions[i * 3 + 2] += dz * restPositionStiffness;
        }

        // Constraint 2: Neighbor distance constraints
        for (let i = 0; i < particleCount; i++) {
          const neighborList = neighbors[i];
          const px = positions[i * 3];
          const py = positions[i * 3 + 1];
          const pz = positions[i * 3 + 2];

          for (const j of neighborList) {
            const qx = positions[j * 3];
            const qy = positions[j * 3 + 1];
            const qz = positions[j * 3 + 2];

            const restDx = restPositions[j * 3] - restPositions[i * 3];
            const restDy = restPositions[j * 3 + 1] - restPositions[i * 3 + 1];
            const restDz = restPositions[j * 3 + 2] - restPositions[i * 3 + 2];
            const restDist = Math.sqrt(restDx * restDx + restDy * restDy + restDz * restDz);

            const dx = qx - px;
            const dy = qy - py;
            const dz = qz - pz;
            const currentDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (currentDist > 0.1) {
              const diff = currentDist - restDist;
              const correction = (diff / currentDist) * neighborStiffness * 0.5;

              positions[i * 3] += dx * correction;
              positions[i * 3 + 1] += dy * correction;
              positions[i * 3 + 2] += dz * correction;
            }
          }
        }

        // Constraint 3: Spherical boundary
        for (let i = 0; i < particleCount; i++) {
          const px = positions[i * 3];
          const py = positions[i * 3 + 1];
          const pz = positions[i * 3 + 2];

          const dist = Math.sqrt(px * px + py * py + pz * pz);

          if (dist < minRadius) {
            const scale = minRadius / dist;
            positions[i * 3] *= scale;
            positions[i * 3 + 1] *= scale;
            positions[i * 3 + 2] *= scale;
          } else if (dist > maxRadius) {
            const scale = maxRadius / dist;
            positions[i * 3] *= scale;
            positions[i * 3 + 1] *= scale;
            positions[i * 3 + 2] *= scale;
          }
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    };

    // Update connections
    const updateConnections = () => {
      if (!particlesRef.current || !linesRef.current) return;

      const { positions } = particlesRef.current;
      const linePositions = linesRef.current.geometry.attributes.position
        .array as Float32Array;
      let lineIndex = 0;

      const checkInterval = Math.max(1, Math.floor(particleCount / 500));

      for (let i = 0; i < particleCount; i += checkInterval) {
        for (let j = i + 1; j < particleCount; j += checkInterval) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];
          }
        }
      }

      linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    };

    // Animation loop
    const animate = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      updatePhysics(deltaTime);
      updateConnections();

      // Gentle camera rotation
      if (cameraRef.current) {
        const time = currentTime * 0.0001;
        cameraRef.current.position.x = Math.sin(time) * 10;
        cameraRef.current.position.y = Math.cos(time * 0.8) * 10;
        cameraRef.current.lookAt(0, 0, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.points.material as THREE.Material).dispose();
      }

      if (linesRef.current) {
        linesRef.current.geometry.dispose();
        (linesRef.current.material as THREE.Material).dispose();
      }
    };
  }, [
    particleCount,
    minRadius,
    maxRadius,
    particleColor,
    connectionColor,
    cursorInfluenceRadius,
    connectionDistance,
    restPositionStiffness,
    neighborStiffness,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
