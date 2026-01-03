'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkBrainProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  nodeCount?: number;
  connectionDensity?: number;
  nodeSize?: number;
  nodeColor?: string;
  edgeColor?: string;
  animated?: boolean;
  pulseSpeed?: number;
}

/**
 * NetworkBrain - Nodes and vertices visualization
 * Replaces textured model with neural network-like structure
 */
export default function NetworkBrain({
  position = [0, 0, 0],
  scale = 1.5,
  rotation = [-Math.PI / 2, 0, 0], // Upright position (rotate -90° on X-axis)
  nodeCount = 150,
  connectionDensity = 0.15,
  nodeSize = 0.02,
  nodeColor = '#4488ff',
  edgeColor = '#2244aa',
  animated = true,
  pulseSpeed = 1,
}: NetworkBrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const targetRotationRef = useRef({ x: rotation[0], y: rotation[1] });
  
  // Generate brain-shaped node positions using ellipsoid
  const { nodePositions, edges } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const edgesList: [number, number][] = [];
    
    // Create nodes in brain-like ellipsoid shape with multiple layers
    for (let i = 0; i < nodeCount; i++) {
      // Use spherical coordinates with brain proportions
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const layerDepth = Math.random(); // 0 = surface, 1 = core
      
      // Brain shape: wider in back (cerebrum), narrower in front
      // Enhanced anatomical proportions
      const baseRadiusX = 1.0 + Math.sin(phi) * 0.35; // Width (temporal lobes)
      const baseRadiusY = 0.85 + Math.cos(theta) * 0.25 - Math.abs(Math.sin(phi * 2)) * 0.1; // Height (crown)
      const baseRadiusZ = 1.3 - Math.abs(Math.sin(phi)) * 0.5; // Depth (occipital lobe)
      
      // Add depth layers for cortex thickness
      const layerScale = 0.85 + layerDepth * 0.15; // Most nodes on surface
      const radiusX = baseRadiusX * layerScale;
      const radiusY = baseRadiusY * layerScale;
      const radiusZ = baseRadiusZ * layerScale;
      
      const x = radiusX * Math.sin(phi) * Math.cos(theta);
      const y = radiusY * Math.cos(phi);
      const z = radiusZ * Math.sin(phi) * Math.sin(theta);
      
      // Add cerebellum hint (back-bottom cluster)
      let finalX = x;
      let finalY = y;
      let finalZ = z;
      
      if (Math.random() < 0.15 && y < -0.3 && z > 0.5) {
        // Cerebellum region (back-bottom)
        finalY -= 0.3;
        finalZ += 0.2;
        const cerebellumNoise = (Math.random() - 0.5) * 0.1;
        finalX += cerebellumNoise;
        finalY += cerebellumNoise * 0.5;
      }
      
      // Add regional clustering for lobes
      const clusterNoise = (Math.random() - 0.5) * 0.1;
      const regionalCluster = Math.sin(theta * 3) * Math.cos(phi * 2) * 0.05;
      
      positions.push(new THREE.Vector3(
        finalX + clusterNoise + regionalCluster,
        finalY + clusterNoise * 0.8,
        finalZ + clusterNoise
      ));
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < positions.length; i++) {
      const connectionsPerNode = Math.floor(nodeCount * connectionDensity);
      const distances: { index: number; distance: number }[] = [];
      
      // Calculate distances to all other nodes
      for (let j = 0; j < positions.length; j++) {
        if (i !== j) {
          const distance = positions[i].distanceTo(positions[j]);
          distances.push({ index: j, distance });
        }
      }
      
      // Sort by distance and connect to nearest neighbors
      distances.sort((a, b) => a.distance - b.distance);
      
      for (let k = 0; k < Math.min(connectionsPerNode, distances.length); k++) {
        const targetIndex = distances[k].index;
        // Avoid duplicate edges
        if (i < targetIndex) {
          edgesList.push([i, targetIndex]);
        }
      }
    }
    
    return { nodePositions: positions, edges: edgesList };
  }, [nodeCount, connectionDensity]);

  // Create edge geometry
  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(edges.length * 6); // 2 vertices per edge, 3 coords each
    
    edges.forEach(([start, end], i) => {
      const startPos = nodePositions[start];
      const endPos = nodePositions[end];
      
      positions[i * 6] = startPos.x;
      positions[i * 6 + 1] = startPos.y;
      positions[i * 6 + 2] = startPos.z;
      positions[i * 6 + 3] = endPos.x;
      positions[i * 6 + 4] = endPos.y;
      positions[i * 6 + 5] = endPos.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodePositions, edges]);

  // Initialize node instances
  useEffect(() => {
    if (!nodesRef.current) return;
    
    const dummy = new THREE.Object3D();
    
    nodePositions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [nodePositions]);

  // Mouse interaction handler
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 0.002;
      targetRotationRef.current.y += e.deltaX * scrollSpeed;
      targetRotationRef.current.x += e.deltaY * scrollSpeed;
      
      // Clamp X rotation to prevent flipping
      targetRotationRef.current.x = Math.max(-Math.PI, Math.min(0, targetRotationRef.current.x));
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime * pulseSpeed;
    
    // Smooth rotation interpolation (mouse control)
    groupRef.current.rotation.x += (targetRotationRef.current.x - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y += (targetRotationRef.current.y - groupRef.current.rotation.y) * 0.1;
    
    // Pulse nodes
    if (animated && nodesRef.current) {
      const dummy = new THREE.Object3D();
      
      nodePositions.forEach((pos, i) => {
        const individualPhase = i * 0.1;
        const localPulse = Math.sin(time * 2 + individualPhase) * 0.2 + 1;
        
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.scale.set(localPulse, localPulse, localPulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
    
    // Pulse edges opacity
    if (animated && edgesRef.current) {
      const material = edgesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 1.5) * 0.2;
    }
    
    // Gentle floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Nodes (vertices) */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodeCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[nodeSize, 8, 8]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </instancedMesh>
      
      {/* Edges (connections) */}
      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </lineSegments>
      
      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} color={nodeColor} intensity={0.5} distance={3} />
    </group>
  );
}
