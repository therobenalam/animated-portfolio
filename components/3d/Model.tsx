'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { isMobile, getResponsiveScale } from '@/utils/three-utils';

interface ModelProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  modelPath?: string;
}

export default function Model({ 
  position = [0, 0, 0], 
  scale = 1,
  rotation = [0, 0, 0],
  modelPath = '/models/brain.glb'
}: ModelProps) {
  const groupRef = useRef<Group>(null);
  const [responsiveScale, setResponsiveScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  const scrollRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Load the 3D model
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    setResponsiveScale(getResponsiveScale());
    setMobile(isMobile());

    const handleResize = () => {
      setResponsiveScale(getResponsiveScale());
      setMobile(isMobile());
    };

    // Handle scroll/wheel events to rotate the model
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Update target rotation based on scroll delta
      targetRotation.current.y += e.deltaY * 0.005;
      targetRotation.current.x += e.deltaX * 0.005;
    };

    // Prevent all touch-based navigation gestures
    const preventGestures = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent browser back/forward navigation on horizontal scroll
    const preventNavigation = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', preventGestures, { passive: false });
    window.addEventListener('touchmove', preventGestures, { passive: false });
    document.addEventListener('gesturestart', preventNavigation);
    document.addEventListener('gesturechange', preventNavigation);
    document.addEventListener('gestureend', preventNavigation);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', preventGestures);
      window.removeEventListener('touchmove', preventGestures);
      document.removeEventListener('gesturestart', preventNavigation);
      document.removeEventListener('gesturechange', preventNavigation);
      document.removeEventListener('gestureend', preventNavigation);
    };
  }, []);

  // Animate on each frame with smooth interpolation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth interpolation towards target rotation
      scrollRotation.current.x += (targetRotation.current.x - scrollRotation.current.x) * 0.1;
      scrollRotation.current.y += (targetRotation.current.y - scrollRotation.current.y) * 0.1;
      
      // Apply scroll-based rotation
      groupRef.current.rotation.x = scrollRotation.current.x;
      groupRef.current.rotation.y = scrollRotation.current.y;
      
      // Subtle floating animation (disabled on mobile)
      if (!mobile) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  const finalScale = typeof scale === 'number' ? scale * responsiveScale : scale;

  return (
    <group ref={groupRef} position={position}>
      <primitive 
        object={scene} 
        scale={finalScale}
        rotation={rotation}
      />
    </group>
  );
}

// Preload model for better performance
useGLTF.preload('/models/brain.glb');
