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
  disableScrollRotation?: boolean;
  opacity?: number;
  layerOpacities?: {
    [meshName: string]: number;
  };
  // Vein system props (used by VeinSystemExamples)
  enableVeins?: boolean;
  veinColor?: string;
  veinIntensity?: number;
  veinPulseSpeed?: number;
  veinDensity?: number;
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
  disableScrollRotation = false,
  opacity = 1.0,
  layerOpacities = {},
}: BrainModelProps) {
  const groupRef = useRef<Group>(null);
  const scrollRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const pulseTime = useRef(0);
  const meshNamesRef = useRef<Set<string>>(new Set());

  // Load the brain model
  const { scene } = useGLTF('/models/brain.glb');
  
  // Log mesh names on first load for debugging
  useEffect(() => {
    if (!scene || meshNamesRef.current.size > 0) return;
    
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const meshName = child.name || `Unnamed_${child.id}`;
        meshNamesRef.current.add(meshName);
        console.log('[BrainModel] Found mesh:', meshName);
      }
    });
    
    if (meshNamesRef.current.size > 0) {
      console.log('[BrainModel] Total meshes:', meshNamesRef.current.size);
      console.log('[BrainModel] Available mesh names:', Array.from(meshNamesRef.current));
    }
  }, [scene]);

  // Update rotation when prop changes (for external control)
  useEffect(() => {
    if (disableScrollRotation && groupRef.current) {
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  }, [rotation, disableScrollRotation]);
  
  // Update mesh materials opacity when opacity or layerOpacities prop changes
  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const meshName = child.name || `Unnamed_${child.id}`;
          
          // Use layer-specific opacity if available, otherwise use global opacity
          const targetOpacity = layerOpacities[meshName] !== undefined 
            ? layerOpacities[meshName] 
            : opacity;
          
          child.material.transparent = true;
          child.material.opacity = targetOpacity;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, opacity, layerOpacities]);

  useEffect(() => {
    if (!scene) return;

    // Enhance materials with proper PBR settings and surface glow
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const mesh = child as Mesh;
        if (mesh.material) {
          // Enable shadows
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // Enhance material properties for brain tissue appearance
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            const originalMaterial = mesh.material;
            const meshName = mesh.name || `Unnamed_${mesh.id}`;
            
            // Determine opacity for this specific mesh
            const meshOpacity = layerOpacities[meshName] !== undefined 
              ? layerOpacities[meshName] 
              : opacity;
            
            // Create custom shader material with Fresnel rim glow
            const customMaterial = new THREE.MeshStandardMaterial({
              ...originalMaterial,
              metalness: 0.1,
              roughness: 0.7,
              envMapIntensity: 1.2,
              transparent: true,
              opacity: meshOpacity,
            });
            
            // Store original onBeforeCompile for cleanup
            const originalOnBeforeCompile = customMaterial.onBeforeCompile;
            
            // Inject Fresnel rim lighting shader
            customMaterial.onBeforeCompile = (shader) => {
              // Add uniform for glow intensity
              shader.uniforms.glowIntensity = { value: glowIntensity };
              shader.uniforms.glowColor = { value: new THREE.Color(0x4488ff) };
              shader.uniforms.rimPower = { value: 3.0 }; // Control rim sharpness
              
              // Add uniforms to fragment shader (vNormal and vViewPosition already exist in MeshStandardMaterial)
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                `#include <common>
                uniform float glowIntensity;
                uniform vec3 glowColor;
                uniform float rimPower;`
              );
              
              // Inject Fresnel calculation in fragment shader
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `#include <dithering_fragment>
                
                // Fresnel rim lighting for surface glow
                vec3 viewDir = normalize(vViewPosition);
                float fresnel = 1.0 - abs(dot(viewDir, normalize(vNormal)));
                fresnel = pow(fresnel, rimPower);
                
                // Add rim glow to final color
                vec3 rimGlow = glowColor * fresnel * glowIntensity * 2.0;
                gl_FragColor.rgb += rimGlow;`
              );
            };
            
            mesh.material = customMaterial;
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
  }, [scene, interactive, glowIntensity, layerOpacities, opacity]);

  // Animation variants
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    pulseTime.current += delta;

    // Base rotation interpolation for interactive mode
    if (interactive && !disableScrollRotation) {
      scrollRotation.current.x += (targetRotation.current.x - scrollRotation.current.x) * 0.1;
      scrollRotation.current.y += (targetRotation.current.y - scrollRotation.current.y) * 0.1;
      groupRef.current.rotation.x = scrollRotation.current.x;
      groupRef.current.rotation.y = scrollRotation.current.y;
    } else if (disableScrollRotation) {
      // Use external rotation prop
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }

    // Variant-specific animations (only when not using external rotation)
    if (!disableScrollRotation) {
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
          
          // Electric effect - update surface glow intensity
          const thinkGlowIntensity = glowIntensity * (1 + Math.sin(time * 3) * 0.5);
          scene.traverse((child) => {
            if (child instanceof Mesh && child.material instanceof THREE.MeshStandardMaterial) {
              const shader = (child.material as any).uniforms;
              if (shader && shader.glowIntensity) {
                shader.glowIntensity.value = thinkGlowIntensity;
              }
            }
          });
          break;

        case 'scanning':
          // Oscillating rotation with surface glow
          const scanIntensity = (Math.sin(time * 4) + 1) * 0.5;
          scene.traverse((child) => {
            if (child instanceof Mesh && child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissiveIntensity = glowIntensity * scanIntensity * 2;
            }
          });
          break;

        case 'pulsing':
          // Pulsing scale with synchronized surface glow
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
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// Preload for better performance
useGLTF.preload('/models/brain.glb');
