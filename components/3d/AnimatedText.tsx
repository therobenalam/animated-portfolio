'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface AnimatedTextProps {
  lines: string[];
  startPosition?: [number, number, number];
  endPosition?: [number, number, number];
  delay?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  onAnimationComplete?: () => void;
}

/**
 * AnimatedText - 3D text that animates from brain model to top of screen
 * 
 * Features:
 * - GSAP-powered smooth animation
 * - Multi-line text support with dynamic line breaks
 * - Emissive glow effect
 * - Fade in/out transitions
 * - Center-aligned text with gentle rotation
 * - Responsive font sizing
 */
export default function AnimatedText({
  lines,
  startPosition = [0, -0.5, 0],
  endPosition = [0, 4, 0],
  delay = 1,
  duration = 4,
  fontSize = 0.25,
  color = '#ffffff',
  emissiveColor = '#4488ff',
  emissiveIntensity = 0.6,
  onAnimationComplete,
}: AnimatedTextProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;

    // Set initial state
    group.position.set(...startPosition);

    // Create animation timeline
    const tl = gsap.timeline({
      delay,
      onComplete: onAnimationComplete,
    });

    // Fade in
    tl.to(
      {},
      {
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: function () {
          setOpacity(this.progress());
        },
      }
    );

    // Move upward
    tl.to(
      group.position,
      {
        x: endPosition[0],
        y: endPosition[1],
        z: endPosition[2],
        duration: duration,
        ease: 'power2.inOut',
      },
      '-=0.4' // Overlap with fade in
    );

    // Fade out at the end
    tl.to(
      {},
      {
        duration: 1,
        ease: 'power2.in',
        onUpdate: function () {
          setOpacity(1 - this.progress());
        },
      },
      '-=1' // Start fade out before reaching end
    );

    return () => {
      tl.kill();
    };
  }, [startPosition, endPosition, delay, duration, onAnimationComplete]);

  // Gentle floating and rotation animation
  useFrame((state) => {
    if (groupRef.current && opacity > 0) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
      // Subtle scale pulse
      const scale = 1 + Math.sin(time * 2) * 0.02;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, index) => (
        <Text
          key={index}
          position={[0, -index * (fontSize * 1.3), 0]}
          fontSize={fontSize}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {line}
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity * opacity}
            metalness={0.2}
            roughness={0.3}
            transparent
            opacity={opacity}
          />
        </Text>
      ))}
    </group>
  );
}
