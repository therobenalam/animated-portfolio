'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// ==================== SECTION DEFINITIONS ====================

export interface NavSection {
  id: string;
  /** Display label (can include \n for line break) */
  label: string;
  /** Sub-label below main text */
  subtitle: string;
  /** 3D position around the brain */
  position: [number, number, number];
  /** Theme color */
  color: string;
  /** Icon character */
  icon: string;
  /** Brain node indices this label connects to */
  connectionNodes: number[];
}

/** The 5 navigation sections orbiting the brain */
export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'about',
    label: 'NEURAL\nCORE',
    subtitle: 'About Me',
    position: [-4, 2, 1],
    color: '#00ff88',
    icon: '⚡',
    connectionNodes: [10, 45, 89, 120],
  },
  {
    id: 'projects',
    label: 'PROJECT\nMATRIX',
    subtitle: 'Work',
    position: [4, 2, -1],
    color: '#ff8800',
    icon: '◈',
    connectionNodes: [5, 67, 134, 156],
  },
  {
    id: 'blog',
    label: 'DATA\nFEED',
    subtitle: 'Blog',
    position: [-3, -2, 2],
    color: '#ff00ff',
    icon: '◉',
    connectionNodes: [23, 78, 145],
  },
  {
    id: 'contact',
    label: 'COMM\nLINK',
    subtitle: 'Contact',
    position: [3, -2, -2],
    color: '#00ffff',
    icon: '◇',
    connectionNodes: [34, 98, 167],
  },
  {
    id: 'skills',
    label: 'SKILL\nVECTORS',
    subtitle: 'Tech Stack',
    position: [0, 3.5, 0],
    color: '#ffff00',
    icon: '△',
    connectionNodes: [1, 88, 176],
  },
];

// ==================== COMPONENT ====================

interface AISystemConnectorProps {
  brainPosition?: [number, number, number];
  brainNodePositions: THREE.Vector3[];
  systems?: NavSection[];
  showLabels?: boolean;
  showConnections?: boolean;
  showParticles?: boolean;
  particleSpeed?: number;
  connectionOpacity?: number;
  /** Called when a section label is clicked */
  onSectionOpen?: (sectionId: string) => void;
  /** Currently active section (remains highlighted while open) */
  activeSection?: string | null;
  /** Whether interactions are enabled (disable during intro/loading) */
  interactive?: boolean;
}

/**
 * AISystemConnector — Navigation hub labels orbiting the brain.
 *
 * Each label represents a portfolio section (About, Projects, Blog,
 * Contact, Skills).  Hover highlights the label and accelerates its
 * particle flow; click fires `onSectionOpen`.
 */
export default function AISystemConnector({
  brainPosition = [0, 0, 0],
  brainNodePositions = [],
  systems = NAV_SECTIONS,
  showLabels = true,
  showConnections = true,
  showParticles = true,
  particleSpeed = 1,
  connectionOpacity = 0.3,
  onSectionOpen,
  activeSection = null,
  interactive = true,
}: AISystemConnectorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleProgressRef = useRef<Map<string, number[]>>(new Map());
  const { gl, camera } = useThree();

  // ==================== HOVER / CLICK ====================
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // We keep refs to invisible hit-area meshes for raycasting
  const hitMeshesRef = useRef<THREE.Mesh[]>([]);

  const registerHitMesh = useCallback(
    (mesh: THREE.Mesh | null, systemId: string) => {
      if (mesh) {
        mesh.userData.systemId = systemId;
        // Avoid duplicates
        if (!hitMeshesRef.current.includes(mesh)) {
          hitMeshesRef.current.push(mesh);
        }
      }
    },
    []
  );

  // Clean up hit meshes when systems change
  useEffect(() => {
    hitMeshesRef.current = [];
  }, [systems]);

  // Raycaster (reused every frame)
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2(9999, 9999)); // offscreen default

  // Track pointer position on canvas
  useEffect(() => {
    if (!interactive) return;

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointermove', onMove);
    return () => {
      canvas.removeEventListener('pointermove', onMove);
    };
  }, [gl.domElement, interactive]);

  // Click handler — fires onSectionOpen for the hovered section
  useEffect(() => {
    if (!interactive) return;

    const onClick = () => {
      if (hoveredId && onSectionOpen) {
        onSectionOpen(hoveredId);
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener('click', onClick);
    return () => {
      canvas.removeEventListener('click', onClick);
    };
  }, [gl.domElement, interactive, hoveredId, onSectionOpen]);

  // Per-frame raycast to detect which label is hovered
  useFrame(() => {
    if (!interactive || hitMeshesRef.current.length === 0) return;

    raycaster.current.setFromCamera(pointer.current, camera);
    const hits = raycaster.current.intersectObjects(hitMeshesRef.current, false);

    if (hits.length > 0) {
      const id = hits[0].object.userData.systemId as string;
      if (id !== hoveredId) {
        setHoveredId(id);
        gl.domElement.style.cursor = 'pointer';
      }
    } else if (hoveredId !== null) {
      setHoveredId(null);
      gl.domElement.style.cursor = 'default';
    }
  });

  // Reset cursor on unmount
  useEffect(() => () => { gl.domElement.style.cursor = 'default'; }, [gl.domElement]);

  // ==================== CONNECTIONS ====================
  const connections = useMemo(() => {
    if (brainNodePositions.length === 0) return [];

    const lines: {
      system: NavSection;
      start: THREE.Vector3;
      end: THREE.Vector3;
      nodeIndex: number;
    }[] = [];

    systems.forEach((system) => {
      const sysPos = new THREE.Vector3(...system.position);
      system.connectionNodes.forEach((idx) => {
        if (idx < brainNodePositions.length) {
          lines.push({
            system,
            start: sysPos,
            end: brainNodePositions[idx].clone(),
            nodeIndex: idx,
          });
        }
      });
    });

    return lines;
  }, [brainNodePositions, systems]);

  // Initialize particle progress
  useEffect(() => {
    const map = new Map<string, number[]>();
    systems.forEach((sys) => {
      const progress: number[] = [];
      sys.connectionNodes.forEach((_, ci) => {
        for (let i = 0; i < 3; i++) {
          progress.push(i / 3 + ci * 0.2);
        }
      });
      map.set(sys.id, progress);
    });
    particleProgressRef.current = map;
  }, [systems]);

  // Animate particles
  useFrame((state) => {
    const dt = state.clock.getDelta();
    systems.forEach((sys) => {
      const prog = particleProgressRef.current.get(sys.id);
      if (!prog) return;
      const isActive = hoveredId === sys.id || activeSection === sys.id;
      const speed = isActive ? 2.5 : 1.0;
      for (let i = 0; i < prog.length; i++) {
        prog[i] += dt * particleSpeed * 0.2 * speed;
        if (prog[i] > 1) prog[i] = 0;
      }
    });
  });

  // ==================== RENDER HELPERS ====================
  /** Build a quadratic bezier curve between two points with perpendicular offset */
  const buildCurve = useCallback(
    (start: THREE.Vector3, end: THREE.Vector3) => {
      const dir = new THREE.Vector3().subVectors(end, start).normalize();
      const dist = start.distanceTo(end);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const perp = new THREE.Vector3(-dir.y, dir.x, 0).normalize();
      mid.add(perp.multiplyScalar(dist * 0.2));
      return new THREE.QuadraticBezierCurve3(start, mid, end);
    },
    []
  );

  return (
    <group ref={groupRef}>
      {/* ── Navigation Nodes ── */}
      {systems.map((sys) => {
        const isHovered = hoveredId === sys.id;
        const isActive = activeSection === sys.id;
        const isHighlighted = isHovered || isActive;
        const isDimmed = activeSection !== null && !isActive && !isHovered;
        const sphereOpacity = isDimmed ? 0.25 : isHighlighted ? 1.0 : 0.8;
        const emissiveBoost = isHighlighted ? 1.5 : 0.8;
        const scaleVal = isHighlighted ? 1.15 : 1.0;

        return (
          <group key={sys.id} position={sys.position} scale={scaleVal}>
            {/* Invisible hit area (larger radius for easy targeting) */}
            <mesh
              ref={(m) => registerHitMesh(m, sys.id)}
              visible={false}
            >
              <sphereGeometry args={[0.7, 8, 8]} />
              <meshBasicMaterial />
            </mesh>

            {/* Visible sphere */}
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={sys.color}
                emissive={sys.color}
                emissiveIntensity={emissiveBoost}
                transparent
                opacity={sphereOpacity}
                metalness={0.3}
                roughness={0.3}
              />
            </mesh>

            {/* Glow ring */}
            <mesh>
              <ringGeometry args={[0.35, isHighlighted ? 0.55 : 0.45, 32]} />
              <meshBasicMaterial
                color={sys.color}
                transparent
                opacity={isHighlighted ? 0.7 : isDimmed ? 0.15 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Extra pulse ring on highlight */}
            {isHighlighted && (
              <mesh>
                <ringGeometry args={[0.55, 0.65, 32]} />
                <meshBasicMaterial
                  color={sys.color}
                  transparent
                  opacity={0.25}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}

            {/* Label text */}
            {showLabels && (
              <>
                <Text
                  position={[0, 0.75, 0]}
                  fontSize={isHighlighted ? 0.2 : 0.17}
                  color={isDimmed ? '#666666' : '#ffffff'}
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.02}
                  outlineColor="#000000"
                  letterSpacing={0.08}
                >
                  {sys.label}
                  <meshStandardMaterial
                    emissive={sys.color}
                    emissiveIntensity={isHighlighted ? 0.6 : isDimmed ? 0.05 : 0.3}
                  />
                </Text>

                {/* Subtitle */}
                <Text
                  position={[0, -0.45, 0]}
                  fontSize={0.11}
                  color={isDimmed ? '#444444' : isHighlighted ? sys.color : '#888888'}
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.15}
                >
                  {isHighlighted ? `[ ${sys.subtitle.toUpperCase()} ]` : sys.subtitle.toUpperCase()}
                </Text>
              </>
            )}

            {/* Icon */}
            <Text
              position={[0, 0, 0.31]}
              fontSize={0.2}
              anchorX="center"
              anchorY="middle"
              color={sys.color}
            >
              {sys.icon}
            </Text>
          </group>
        );
      })}

      {/* ── Connection Lines ── */}
      {showConnections &&
        connections.map((conn, i) => {
          const isActive = hoveredId === conn.system.id || activeSection === conn.system.id;
          const isDimmed =
            activeSection !== null && activeSection !== conn.system.id && hoveredId !== conn.system.id;
          const lineOpacity = isDimmed ? 0.05 : isActive ? connectionOpacity * 2.5 : connectionOpacity;

          const curve = buildCurve(conn.start, conn.end);
          const pts = curve.getPoints(50);
          const geo = new THREE.BufferGeometry().setFromPoints(pts);

          return (
            <primitive
              key={`conn-${conn.system.id}-${i}`}
              object={
                new THREE.Line(
                  geo,
                  new THREE.LineBasicMaterial({
                    color: conn.system.color,
                    transparent: true,
                    opacity: lineOpacity,
                  })
                )
              }
            />
          );
        })}

      {/* ── Flowing Particles ── */}
      {showParticles &&
        connections.map((conn, ci) => {
          const sys = conn.system;
          const isActive = hoveredId === sys.id || activeSection === sys.id;
          const isDimmed = activeSection !== null && activeSection !== sys.id && hoveredId !== sys.id;
          if (isDimmed) return null;

          const prog = particleProgressRef.current.get(sys.id);
          if (!prog) return null;

          const curve = buildCurve(conn.start, conn.end);
          const slice = prog.slice(ci * 3, ci * 3 + 3);

          return (
            <group key={`p-${sys.id}-${ci}`}>
              {slice.map((t, pi) => {
                const pt = curve.getPoint(t % 1);
                return (
                  <mesh key={pi} position={pt}>
                    <sphereGeometry args={[isActive ? 0.07 : 0.05, 8, 8]} />
                    <meshBasicMaterial
                      color={sys.color}
                      transparent
                      opacity={isActive ? 1.0 : 0.8}
                    />
                  </mesh>
                );
              })}
            </group>
          );
        })}
    </group>
  );
}
