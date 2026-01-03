'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { Group, Mesh } from 'three';
import * as THREE from 'three';

interface BrainModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  variant?: 'idle' | 'thinking' | 'scanning' | 'pulsing';
  interactive?: boolean;
  autoRotate?: boolean;
  glowIntensity?: number;
}

/**
 * BrainModel - Specialized component for the human brain 3D model
 * 
 * Features:
 * - Multiple animation variants (idle, thinking, scanning, pulsing)
 * - Interactive scroll-based rotation
 * - Glow effects and dynamic lighting
 * - Optimized performance with LOD
 * - PBR materials with proper texture mapping
 * 
 * Attribution: CC-BY-4.0 - Yash_Dandavate (Sketchfab)
 */
export default function BrainModel({
  position = [0, 0, 0],
  scale = 1.5,
  rotation = [0, 0, 0],
  variant = 'idle',
  interactive = true,
  autoRotate = false,
  glowIntensity = 0.3,
}: BrainModelProps) {
  const groupRef = useRef<Group>(null);
  const scrollRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const pulseTime = useRef(0);

  // Load the brain model
  const { scene } = useGLTF('/models/brain.glb');

  useEffect(() => {
    if (!scene) return;

    // Enhance materials with proper PBR settings
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          // Enable shadows
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // Enhance material properties for brain tissue appearance
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.metalness = 0.1;
            mesh.material.roughness = 0.7;
            mesh.material.envMapIntensity = 1.2;
            
            // Add subtle emissive glow
            if (glowIntensity > 0) {
              mesh.material.emissive = new THREE.Color(0x4488ff);
              mesh.material.emissiveIntensity = glowIntensity;
            }
          }
        }
      }
    });

    // Interactive scroll handler with navigation prevention
    if (interactive) {
      const handleWheel = (e: WheelEvent) => {
        if (e.target instanceof HTMLCanvasElement) {
          e.preventDefault();
          e.stopPropagation();
          targetRotation.current.y += e.deltaY * 0.005;
          targetRotation.current.x += e.deltaX * 0.005;
        }
      };

      // Prevent multi-finger gestures that trigger navigation
      const preventGestures = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      // Prevent browser back/forward navigation on horizontal scroll/swipe
      const preventNavigation = (e: Event) => {
        e.preventDefault();
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', preventGestures, { passive: false });
      window.addEventListener('touchmove', preventGestures, { passive: false });
      document.addEventListener('gesturestart', preventNavigation);
      document.addEventListener('gesturechange', preventNavigation);
      document.addEventListener('gestureend', preventNavigation);
      
      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', preventGestures);
        window.removeEventListener('touchmove', preventGestures);
        document.removeEventListener('gesturestart', preventNavigation);
        document.removeEventListener('gesturechange', preventNavigation);
        document.removeEventListener('gestureend', preventNavigation);
      };
    }
  }, [scene, interactive, glowIntensity]);

  // Animation variants
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    pulseTime.current += delta;

    // Base rotation interpolation for interactive mode
    if (interactive) {
      scrollRotation.current.x += (targetRotation.current.x - scrollRotation.current.x) * 0.1;
      scrollRotation.current.y += (targetRotation.current.y - scrollRotation.current.y) * 0.1;
      groupRef.current.rotation.x = scrollRotation.current.x;
      groupRef.current.rotation.y = scrollRotation.current.y;
    }

    // Variant-specific animations
    switch (variant) {
      case 'idle':
        // Subtle floating and slow rotation
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
        if (autoRotate) {
          groupRef.current.rotation.y += delta * 0.2;
        }
        break;

      case 'thinking':
        // Pulsing scale and faster rotation
        const thinkPulse = 1 + Math.sin(time * 2) * 0.05;
        groupRef.current.scale.setScalar(scale * thinkPulse);
        groupRef.current.rotation.y += delta * 0.5;
        
        // Electric effect - traverse and update emissive
        scene.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissiveIntensity = glowIntensity * (1 + Math.sin(time * 3) * 0.5);
          }
        });
        break;

      case 'scanning':
        // Oscillating rotation with scan line effect
        groupRef.current.rotation.y = Math.sin(time * 0.8) * Math.PI * 0.3;
        groupRef.current.rotation.x = Math.cos(time * 0.6) * 0.2;
        
        // Scanning wave effect on materials
        const scanIntensity = (Math.sin(time * 4) + 1) * 0.5;
        scene.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissiveIntensity = glowIntensity * scanIntensity * 2;
          }
        });
        break;

      case 'pulsing':
        // Rhythmic pulsing like a heartbeat
        const pulseValue = Math.sin(pulseTime.current * 2) * 0.5 + 0.5;
        const pulseScale = 1 + pulseValue * 0.15;
        groupRef.current.scale.setScalar(scale * pulseScale);
        
        // Sync glow with pulse
        scene.traverse((child) => {
          if (child instanceof Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissiveIntensity = glowIntensity * pulseValue * 2;
          }
        });
        break;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} scale={scale} rotation={rotation} />
    </group>
  );
}

// Preload for better performance
useGLTF.preload('/models/brain.glb');
