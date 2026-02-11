'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { BrainZone, brainZones as defaultBrainZones, getZoneForNode } from '@/data/brainZones';

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
  showNodes?: boolean;
  showEdges?: boolean;
  showSkin?: boolean;
  showGlow?: boolean;
  disableScrollRotation?: boolean;
  // Texture/surface detail controls
  surfaceDetail?: number; // Overall detail intensity (0-1)
  foldDepth?: number; // Depth of gyri/sulci folds (0-1)
  surfaceRoughness?: number; // Micro-detail roughness (0-1)
  skinOpacity?: number; // Transparency of skin (0-1)
  opacity?: number; // Overall model opacity (0-1)
  nodesOpacity?: number; // Nodes/spheres opacity (0-1)
  edgesOpacity?: number; // Edges/lines opacity (0-1)
  glowIntensity?: number; // Glow light intensity (0-2)
  // Vein system controls
  veinColor?: string; // Color of veins (default: red)
  veinPulseSpeed?: number; // Speed of vein pulse animation (0-5)
  veinIntensity?: number; // Intensity of vein glow (0-1)
  // Halo/shell effect controls
  haloOpacity?: number; // Opacity of outer particle halo (0-1)
  // Callback to expose node positions to parent
  onNodePositionsUpdate?: (positions: THREE.Vector3[]) => void;
  // Zone interaction props
  zones?: BrainZone[]; // Zones to use (defaults to brainZones from data file)
  /** Currently highlighted zone (external control, e.g. from a list) */
  highlightedZone?: string | null;
  /** Fired when a zone is clicked */
  onZoneClick?: (zoneId: string) => void;
  /** Fired when a zone is hovered / unhovered */
  onZoneHover?: (zoneId: string | null) => void;
  /** Enable zone interactions (hover highlight + click). Disable during intro. */
  zoneInteractive?: boolean;
}

/**
 * NetworkBrain - Nodes and vertices visualization
 * Replaces textured model with neural network-like structure
 */
export default function NetworkBrain({
  position = [0, 0, 0],
  scale = 1.65,
  rotation = [(360 * Math.PI) / 180, (630 * Math.PI) / 180, 0], // 360° tilt (X), 630° spin (Y)
  nodeCount = 177,
  connectionDensity = 0.12,
  nodeSize = 0.015,
  nodeColor = '#4488ff',
  edgeColor = '#00ffff',
  animated = true,
  pulseSpeed = 1,
  showNodes = true,
  showEdges = true,
  showSkin = true,
  showGlow = false,
  disableScrollRotation = false,
  surfaceDetail = 1.0,
  foldDepth = 1.0,
  surfaceRoughness = 1.0,
  skinOpacity = 0.35,
  opacity = 1.0,
  nodesOpacity = 0.9,
  edgesOpacity = 0.4,
  glowIntensity = 0.5,
  veinColor = '#ff3333',
  veinPulseSpeed = 1.5,
  veinIntensity = 0.8,
  haloOpacity = 1.0,
  onNodePositionsUpdate,
  zones = defaultBrainZones,
  highlightedZone = null,
  onZoneClick,
  onZoneHover,
  zoneInteractive = true,
}: NetworkBrainProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const skinMeshRef = useRef<THREE.Mesh>(null);
  const targetRotationRef = useRef({ x: rotation[0], y: rotation[1] });
  const mouseRef = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const nodeIntensitiesRef = useRef<Float32Array>(new Float32Array(nodeCount));
  
  // Zone hover state (internal — the zone the cursor is closest to)
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  // Precompute node→zone lookup for O(1) access in the animation loop
  const nodeZoneMap = useMemo(() => {
    const map = new Map<number, BrainZone>();
    zones.forEach((zone) => {
      zone.nodeIndices.forEach((idx) => map.set(idx, zone));
    });
    return map;
  }, [zones]);

  // Effective highlighted zone: external prop takes priority, then internal hover
  const effectiveZone = highlightedZone ?? hoveredZoneId;

  // The actual BrainZone object for the effective zone (for color / name)
  const activeZone = useMemo(
    () => zones.find((z) => z.id === effectiveZone) ?? null,
    [zones, effectiveZone]
  );

  // Access canvas for cursor styling
  const { gl } = useThree();

  // Ref to bridge useFrame → React state for hovered zone (can't setState in useFrame)
  const hoveredZoneRef = useRef<string | null>(null);

  // Sync hoveredZoneRef → React state every frame via a second useFrame
  useFrame(() => {
    const current = hoveredZoneRef.current;
    if (current !== hoveredZoneId) {
      setHoveredZoneId(current);
      if (onZoneHover) onZoneHover(current);
      gl.domElement.style.cursor = current ? 'pointer' : 'default';
    }
  });

  // Zone click handler
  useEffect(() => {
    if (!zoneInteractive || !onZoneClick) return;
    const onClick = () => {
      if (hoveredZoneRef.current) {
        onZoneClick(hoveredZoneRef.current);
      }
    };
    const canvas = gl.domElement;
    canvas.addEventListener('click', onClick);
    return () => canvas.removeEventListener('click', onClick);
  }, [gl.domElement, zoneInteractive, onZoneClick]);

  // Reset cursor on unmount
  useEffect(() => () => { gl.domElement.style.cursor = 'default'; }, [gl.domElement]);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update target rotation when prop changes (for external control)
  useEffect(() => {
    if (disableScrollRotation) {
      targetRotationRef.current.x = rotation[0];
      targetRotationRef.current.y = rotation[1];
    }
  }, [rotation, disableScrollRotation]);
  
  // Update shader material opacity when opacity prop changes
  useEffect(() => {
    if (skinMeshRef.current) {
      const material = skinMeshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms && material.uniforms.opacity) {
        material.uniforms.opacity.value = skinOpacity * opacity;
      }
    }
  }, [skinOpacity, opacity]);
  
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

  // Notify parent of node positions (with world transform applied)
  useEffect(() => {
    if (onNodePositionsUpdate && groupRef.current) {
      // Apply group transformation to node positions
      const worldPositions = nodePositions.map((pos) => {
        const worldPos = pos.clone();
        worldPos.applyMatrix4(groupRef.current!.matrixWorld);
        return worldPos;
      });
      onNodePositionsUpdate(worldPositions);
    }
  }, [nodePositions, onNodePositionsUpdate, scale, position]);

  // Create edge geometry with alpha attribute for per-edge opacity
  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(edges.length * 6); // 2 vertices per edge, 3 coords each
    const colors = new Float32Array(edges.length * 6); // RGB per vertex for intensity
    
    edges.forEach(([start, end], i) => {
      const startPos = nodePositions[start];
      const endPos = nodePositions[end];
      
      positions[i * 6] = startPos.x;
      positions[i * 6 + 1] = startPos.y;
      positions[i * 6 + 2] = startPos.z;
      positions[i * 6 + 3] = endPos.x;
      positions[i * 6 + 4] = endPos.y;
      positions[i * 6 + 5] = endPos.z;
      
      // Initialize colors to white (will be modulated by material color)
      for (let j = 0; j < 6; j++) {
        colors[i * 6 + j] = 1.0;
      }
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [nodePositions, edges]);

  // Initialize node instances with color attributes
  useEffect(() => {
    if (!showNodes || !nodesRef.current) return;
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    
    nodePositions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Initialize color (will be updated in animation loop)
      color.set(nodeColor);
      nodesRef.current!.setColorAt(i, color);
    });
    
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [nodePositions, showNodes]);

  // Mouse interaction handler (only if not externally controlled)
  useEffect(() => {
    if (disableScrollRotation) return;
    
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 0.002;
      targetRotationRef.current.y += e.deltaX * scrollSpeed;
      targetRotationRef.current.x += e.deltaY * scrollSpeed;
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [disableScrollRotation]);

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime * pulseSpeed;
    
    // Apply rotation - use external rotation when scroll is disabled
    if (disableScrollRotation) {
      // Use external rotation prop for synchronized rotation
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    } else {
      // Apply rotation directly for responsive control
      groupRef.current.rotation.x = targetRotationRef.current.x;
      groupRef.current.rotation.y = targetRotationRef.current.y;
    }
    
    // Neural spike animation for nodes with proximity-based intensity
    if (animated && showNodes && nodesRef.current) {
      const dummy = new THREE.Object3D();
      const nodeMaterial = nodesRef.current.material as THREE.MeshStandardMaterial;
      const color = new THREE.Color();
      const baseColor = new THREE.Color(nodeColor);
      const whiteColor = new THREE.Color(0xffffff);
      
      // Calculate all node distances first to find closest
      let minDistance = Infinity;
      let closestNodeIdx = -1;
      const nodeDistances: number[] = [];
      
      nodePositions.forEach((pos, i) => {
        const worldPos = pos.clone().applyMatrix4(groupRef.current!.matrixWorld);
        const nodeScreenPos = worldPos.clone().project(state.camera);
        const mouseDistance = Math.sqrt(
          Math.pow(nodeScreenPos.x - mouseRef.current.x, 2) +
          Math.pow(nodeScreenPos.y - mouseRef.current.y, 2)
        );
        nodeDistances[i] = mouseDistance;
        if (mouseDistance < minDistance) {
          minDistance = mouseDistance;
          closestNodeIdx = i;
        }
      });
      
      // Determine if mouse is close to any node
      const proximityThreshold = 0.25;
      const isMouseNearAnyNode = minDistance < proximityThreshold;

      // ── Zone detection ──
      // When zoneInteractive is on and the cursor is close to a node, resolve
      // which zone that node belongs to.  All nodes in that zone get the
      // zone color; non-zone nodes dim.  When zoneInteractive is off (or the
      // cursor is far away) we fall back to the original white proximity glow.
      let cursorZone: BrainZone | null = null;
      let cursorZoneNodeSet: Set<number> | null = null;

      if (zoneInteractive && isMouseNearAnyNode && closestNodeIdx >= 0) {
        cursorZone = nodeZoneMap.get(closestNodeIdx) ?? null;
        if (cursorZone) {
          cursorZoneNodeSet = new Set(cursorZone.nodeIndices);
        }
      }

      // Also handle externally-highlighted zone (from prop)
      if (!cursorZone && effectiveZone) {
        cursorZone = zones.find((z) => z.id === effectiveZone) ?? null;
        if (cursorZone) {
          cursorZoneNodeSet = new Set(cursorZone.nodeIndices);
        }
      }

      // Update hoveredZoneId state (throttled: only when it changes)
      const newHoveredId = (zoneInteractive && isMouseNearAnyNode && closestNodeIdx >= 0)
        ? (nodeZoneMap.get(closestNodeIdx)?.id ?? null)
        : null;
      // We can't call setState inside useFrame safely, so we use a ref+effect trick
      hoveredZoneRef.current = newHoveredId;

      const zoneColor = cursorZone ? new THREE.Color(cursorZone.color) : null;
      
      nodePositions.forEach((pos, i) => {
        const mouseDistance = nodeDistances[i];
        
        // Proximity intensity: boost when mouse is near, suppress others
        let proximityIntensity = 1.0;
        let colorLerpFactor = 0;
        
        if (cursorZoneNodeSet) {
          // ── Zone mode: zone nodes glow in zone color, others dim ──
          if (cursorZoneNodeSet.has(i)) {
            // Node is in the active zone → glow zone color
            proximityIntensity = 2.5;
            colorLerpFactor = 0.85; // towards zone color
          } else {
            // Not in zone → dim
            proximityIntensity = 0.15;
            colorLerpFactor = 0;
          }
        } else if (isMouseNearAnyNode) {
          // ── Original white proximity glow (no zone resolved) ──
          if (mouseDistance < proximityThreshold) {
            proximityIntensity = 1.0 + (1.0 - mouseDistance / proximityThreshold) * 4.0;
            colorLerpFactor = 1.0 - mouseDistance / proximityThreshold;
          } else {
            proximityIntensity = 0.15;
          }
        }
        
        // Simulate action potential firing
        const firingRate = 10 + Math.sin(i * 0.5) * 5;
        const spikeFrequency = firingRate / 60;
        const phaseOffset = i * 0.3;
        
        const thetaWave = Math.sin(time * 0.4 + phaseOffset * 0.1) * 0.5 + 0.5;
        
        const spikeTime = (time * spikeFrequency + phaseOffset) % 1;
        let spikePulse = 0;
        
        if (spikeTime < 0.1) {
          if (spikeTime < 0.02) {
            spikePulse = spikeTime / 0.02;
          } else if (spikeTime < 0.06) {
            spikePulse = 1 - ((spikeTime - 0.02) / 0.04) * 1.2;
          } else {
            spikePulse = -0.2 + ((spikeTime - 0.06) / 0.04) * 0.2;
          }
        }
        
        const modulatedSpike = spikePulse * (0.5 + thetaWave * 0.5);
        
        const burstProbability = Math.sin(time * 0.8 + i) * 0.5 + 0.5;
        const inBurst = burstProbability > 0.7;
        const burstMultiplier = inBurst ? 1.5 : 1.0;
        
        const animationIntensity = 0.3 + modulatedSpike * 0.7 * burstMultiplier;
        
        // Store final intensity for edge rendering
        nodeIntensitiesRef.current[i] = animationIntensity * proximityIntensity;
        
        // Lerp color: zone color when in zone mode, white otherwise
        const targetColor = (cursorZoneNodeSet && zoneColor) ? zoneColor : whiteColor;
        color.lerpColors(baseColor, targetColor, colorLerpFactor);
        nodesRef.current!.setColorAt(i, color);
        
        // Scale nodes based on proximity to cursor
        const scaleMultiplier = 1.0 + colorLerpFactor * 0.8; // Up to 1.8x size when cursor is close
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      // Update node material opacity based on average intensity
      const avgIntensity = nodeIntensitiesRef.current.reduce((sum, val) => sum + val, 0) / nodeCount;
      const maxIntensity = Math.max(...Array.from(nodeIntensitiesRef.current));
      
      // Boost emissive intensity when nodes are glowing from mouse proximity
      nodeMaterial.opacity = nodesOpacity * opacity * haloOpacity * (0.5 + avgIntensity * 0.5);
      nodeMaterial.emissiveIntensity = 0.5 + maxIntensity * 2.5; // Increase glow for hot nodes
      
      nodesRef.current.instanceMatrix.needsUpdate = true;
      if (nodesRef.current.instanceColor) {
        nodesRef.current.instanceColor.needsUpdate = true;
      }
    }
    
    // Neural propagation animation for edges with per-edge intensity
    if (animated && showEdges && edgesRef.current) {
      const material = edgesRef.current.material as THREE.LineBasicMaterial;
      const alphaAttribute = edgesRef.current.geometry.getAttribute('alpha') as THREE.BufferAttribute;
      
      // Base wave animation
      const propagationSpeed = 20;
      const wavePosition = (time * propagationSpeed) % 10;
      const wave1 = Math.sin(time * 3 + wavePosition) * 0.5 + 0.5;
      const wave2 = Math.sin(time * 1.5 + wavePosition * 0.5) * 0.5 + 0.5;
      const wave3 = Math.sin(time * 0.5) * 0.5 + 0.5;
      const combinedActivity = (wave1 * 0.4 + wave2 * 0.3 + wave3 * 0.3);
      
      const burstCycle = (time * 0.7) % 3;
      const burstIntensity = burstCycle < 0.3 ? Math.pow(Math.sin(burstCycle * Math.PI / 0.3), 2) : 0;
      const noise = (Math.sin(time * 15.7) * Math.cos(time * 23.3) * 0.5 + 0.5) * 0.2;
      const baseActivity = 0.2 + combinedActivity * 0.3 + burstIntensity * 0.4 + noise;
      
      // Update per-edge color based on connected node intensities
      const colorAttribute = edgesRef.current.geometry.getAttribute('color') as THREE.BufferAttribute;
      edges.forEach(([start, end], i) => {
        const startIntensity = nodeIntensitiesRef.current[start];
        const endIntensity = nodeIntensitiesRef.current[end];
        // Use max intensity of connected nodes for strong glow propagation
        const edgeIntensity = Math.max(startIntensity, endIntensity);
        
        // Boost edge glow significantly when nodes are hot
        const glowBoost = Math.pow(edgeIntensity, 0.7); // Power curve for dramatic effect
        
        // Set RGB values (will be modulated by material color)
        for (let v = 0; v < 2; v++) {
          colorAttribute.setXYZ(i * 2 + v, glowBoost, glowBoost, glowBoost);
        }
      });
      colorAttribute.needsUpdate = true;
      
      // Enhance opacity for glowing edges
      const maxEdgeIntensity = Math.max(...edges.map(([start, end]) => 
        Math.max(nodeIntensitiesRef.current[start], nodeIntensitiesRef.current[end])
      ));
      material.opacity = baseActivity * edgesOpacity * opacity * haloOpacity * (0.7 + maxEdgeIntensity * 0.8);
    }
    
    // Animate flowing skin material
    if (animated && showSkin && skinMeshRef.current) {
      const material = skinMeshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }
    }
    
    // Gentle floating animation (only when not using external rotation)
    if (!disableScrollRotation) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;
    }
  });

  // Create brain-shaped skin mesh with custom flowing shader
  const skinGeometry = useMemo(() => {
    // Create high-detail ellipsoid geometry for better surface definition
    const geometry = new THREE.SphereGeometry(1.4, 128, 128);
    const positions = geometry.attributes.position;
    
    // Simple noise function for surface detail
    const noise3D = (x: number, y: number, z: number, frequency: number) => {
      const p = { x: x * frequency, y: y * frequency, z: z * frequency };
      return (
        Math.sin(p.x * 12.9898 + p.y * 78.233 + p.z * 45.164) * 
        Math.cos(p.x * 93.989 + p.y * 23.421 + p.z * 67.321) * 0.5 + 0.5
      );
    };
    
    // Deform to brain proportions with anatomical surface detail
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Calculate spherical coordinates
      const phi = Math.acos(y / Math.sqrt(x * x + y * y + z * z));
      const theta = Math.atan2(z, x);
      
      // Brain-like deformation
      const scaleX = 1.0 + Math.sin(phi) * 0.25;
      const scaleY = 0.85 + Math.cos(theta) * 0.2;
      const scaleZ = 1.2 - Math.abs(Math.sin(phi)) * 0.4;
      
      // Apply base brain shape
      let newX = x * scaleX;
      let newY = y * scaleY;
      let newZ = z * scaleZ;
      
      // Add gyri and sulci (brain wrinkles/folds) - anatomical detail
      const gyriFreq1 = 8.0; // Primary folds
      const gyriFreq2 = 16.0; // Secondary folds
      const gyriFreq3 = 32.0; // Tertiary detail
      
      // Layered noise for realistic cortical folding (controlled by foldDepth)
      const fold1 = noise3D(newX, newY, newZ, gyriFreq1) * 0.08 * foldDepth;
      const fold2 = noise3D(newX, newY, newZ, gyriFreq2) * 0.04 * foldDepth;
      const fold3 = noise3D(newX, newY, newZ, gyriFreq3) * 0.02 * foldDepth;
      
      // Combine folds with bias toward outer surface (cortex is wrinkled, not smooth)
      const totalDisplacement = (fold1 + fold2 + fold3) - (0.05 * foldDepth); // Negative bias creates valleys
      
      // Reduce folding on bottom (brain stem area is smoother)
      const yFactor = Math.max(0, (y + 0.5) * 1.2); // Less detail on underside
      const adjustedDisplacement = totalDisplacement * yFactor * surfaceDetail;
      
      // Normalize and apply displacement along surface normal direction
      const length = Math.sqrt(newX * newX + newY * newY + newZ * newZ);
      const nx = newX / length;
      const ny = newY / length;
      const nz = newZ / length;
      
      positions.setXYZ(
        i,
        newX + nx * adjustedDisplacement,
        newY + ny * adjustedDisplacement,
        newZ + nz * adjustedDisplacement
      );
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [foldDepth, surfaceDetail]);

  // Custom shader material for flowing organic skin
  const skinMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(nodeColor) },
        opacity: { value: skinOpacity * opacity },
        surfaceRoughness: { value: surfaceRoughness },
        surfaceDetail: { value: surfaceDetail },
        veinColor: { value: new THREE.Color(veinColor) },
        veinPulseSpeed: { value: veinPulseSpeed },
        veinIntensity: { value: veinIntensity },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        uniform float time;
        
        // Simple noise function
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        }
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          
          // Flowing organic distortion
          vec3 pos = position;
          float n1 = noise(position * 2.0 + time * 0.2);
          float n2 = noise(position * 3.0 - time * 0.15);
          
          pos += normal * (n1 * 0.03 + n2 * 0.02);
          
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPosition = worldPos.xyz;
          
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        uniform float time;
        uniform float surfaceRoughness;
        uniform float surfaceDetail;
        uniform vec3 veinColor;
        uniform float veinPulseSpeed;
        uniform float veinIntensity;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        
        // Enhanced 3D noise for surface texture
        float noise3D(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f); // Smoothstep
          
          float n = i.x + i.y * 57.0 + i.z * 113.0;
          return mix(
            mix(
              mix(fract(sin(n) * 43758.5453), fract(sin(n + 1.0) * 43758.5453), f.x),
              mix(fract(sin(n + 57.0) * 43758.5453), fract(sin(n + 58.0) * 43758.5453), f.x),
              f.y
            ),
            mix(
              mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
              mix(fract(sin(n + 170.0) * 43758.5453), fract(sin(n + 171.0) * 43758.5453), f.x),
              f.y
            ),
            f.z
          );
        }
        
        // Layered noise for cortical texture
        float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          
          // 4 octaves of noise for detailed surface texture
          for(int i = 0; i < 4; i++) {
            value += amplitude * noise3D(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          
          return value;
        }
        
        void main() {
          // Fresnel rim lighting with proper world space calculation
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(0.0, dot(viewDir, vNormal)), 2.5);
          
          // Surface texture using multi-scale noise (gyri and sulci detail) - controlled by surfaceDetail
          float surfaceTexture = fbm(vWorldPosition * 8.0 * surfaceDetail);
          
          // Animated flowing energy pattern
          float flow = sin(vUv.x * 10.0 + time * 0.5) * sin(vUv.y * 10.0 - time * 0.3);
          flow = flow * 0.5 + 0.5;
          
          // Micro-detail normal perturbation for realistic lighting - controlled by surfaceRoughness
          float detailNoise = noise3D(vWorldPosition * 32.0 * surfaceRoughness) * 0.3;
          
          // Combine all texture layers
          float textureIntensity = surfaceTexture * 0.6 + detailNoise * 0.4;
          
          // Darken valleys (sulci), brighten ridges (gyri)
          float cortexShading = mix(0.7, 1.3, textureIntensity);
          
          // Combine effects with anatomical shading
          vec3 finalColor = color * cortexShading * (0.9 + fresnel * 1.5 + flow * 0.2);
          float finalOpacity = opacity * (1.3 + fresnel * 0.7 + textureIntensity * 0.3);
          
          gl_FragColor = vec4(finalColor, finalOpacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [nodeColor, skinOpacity, surfaceRoughness, surfaceDetail, opacity]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Semi-transparent flowing skin */}
      {showSkin && <mesh ref={skinMeshRef} geometry={skinGeometry} material={skinMaterial} />}
      
      {/* Nodes (vertices) */}
      {showNodes && (
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, nodeCount]}
          frustumCulled={false}
        >
          <sphereGeometry args={[nodeSize, 8, 8]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={0.5}
            transparent
            opacity={nodesOpacity * opacity * haloOpacity}
            vertexColors
            toneMapped={false}
          />
        </instancedMesh>
      )}
      
      {/* Edges (connections) */}
      {showEdges && (
        <lineSegments ref={edgesRef} geometry={edgeGeometry}>
          <lineBasicMaterial
            color={edgeColor}
            transparent
            opacity={edgesOpacity * opacity * haloOpacity}
            vertexColors
            toneMapped={false}
          />
        </lineSegments>
      )}
      
      {/* Glow effect */}
      {showGlow && <pointLight position={[0, 0, 0]} color={nodeColor} intensity={glowIntensity * opacity} distance={3} />}

      {/* Floating zone label — appears when hovering over a zone */}
      {activeZone && showNodes && (
        <ZoneLabel zone={activeZone} nodePositions={nodePositions} />
      )}
    </group>
  );
}

// ==================== ZONE LABEL SUB-COMPONENT ====================

/** Renders a floating project name at the centroid of the hovered zone's nodes. */
function ZoneLabel({ zone, nodePositions }: { zone: BrainZone; nodePositions: THREE.Vector3[] }) {
  const centroid = useMemo(() => {
    const sum = new THREE.Vector3();
    let count = 0;
    zone.nodeIndices.forEach((idx) => {
      if (idx < nodePositions.length) {
        sum.add(nodePositions[idx]);
        count++;
      }
    });
    if (count > 0) sum.divideScalar(count);
    // Offset upward so label floats above the cluster
    sum.y += 0.35;
    return sum;
  }, [zone, nodePositions]);

  return (
    <Text
      position={centroid}
      fontSize={0.12}
      color={zone.color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.015}
      outlineColor="#000000"
      letterSpacing={0.12}
    >
      {`[ ${zone.name.toUpperCase()} ]`}
    </Text>
  );
}
