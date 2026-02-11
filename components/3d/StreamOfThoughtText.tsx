'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface ThoughtSegment {
  text: string;
  delay: number;
  duration: number;
}

interface StreamOfThoughtTextProps {
  thoughts: ThoughtSegment[];
  position?: [number, number, number];
  initialDelay?: number;
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  flowDirection?: 'up' | 'down' | 'left' | 'right';
  spacing?: number;
  onComplete?: () => void;
}

/**
 * StreamOfThoughtText - Words/phrases appear in flowing sequence
 * 
 * Features:
 * - Thoughts appear one at a time
 * - Smooth fade in/out per thought
 * - Configurable flow direction
 * - Staggered timing for natural feel
 * - Each thought can have custom duration
 */
export default function StreamOfThoughtText({
  thoughts,
  position = [0, 1, 0],
  initialDelay = 1,
  fontSize = 0.25,
  color = '#ffffff',
  emissiveColor = '#4488ff',
  emissiveIntensity = 0.8,
  flowDirection = 'up',
  spacing = 0.6,
  onComplete,
}: StreamOfThoughtTextProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [visibleThoughts, setVisibleThoughts] = useState<Set<number>>(new Set());
  const [thoughtOpacities, setThoughtOpacities] = useState<number[]>(
    new Array(thoughts.length).fill(0)
  );

  // Stream animation logic
  useEffect(() => {
    let cumulativeDelay = initialDelay;
    const timeouts: NodeJS.Timeout[] = [];

    thoughts.forEach((thought, index) => {
      // Fade in
      const fadeInTimeout = setTimeout(() => {
        setVisibleThoughts(prev => new Set([...prev, index]));
        
        gsap.to(thoughtOpacities, {
          [index]: 1,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: () => setThoughtOpacities([...thoughtOpacities]),
        });
      }, cumulativeDelay * 1000);

      timeouts.push(fadeInTimeout);

      // Fade out
      const fadeOutTimeout = setTimeout(() => {
        gsap.to(thoughtOpacities, {
          [index]: 0,
          duration: 0.5,
          ease: 'power2.in',
          onUpdate: () => setThoughtOpacities([...thoughtOpacities]),
          onComplete: () => {
            setVisibleThoughts(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          },
        });
      }, (cumulativeDelay + thought.duration) * 1000);

      timeouts.push(fadeOutTimeout);

      cumulativeDelay += thought.delay + thought.duration;
    });

    // Final callback
    const completeTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, cumulativeDelay * 1000);

    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [thoughts, initialDelay, onComplete]);

  // Gentle wave motion
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      // Subtle position drift
      groupRef.current.position.x = position[0] + Math.sin(time * 0.4) * 0.1;
      groupRef.current.position.y = position[1] + Math.cos(time * 0.5) * 0.1;
    }
  });

  const getThoughtPosition = (index: number): [number, number, number] => {
    switch (flowDirection) {
      case 'up':
        return [0, index * spacing, 0];
      case 'down':
        return [0, -index * spacing, 0];
      case 'left':
        return [-index * spacing, 0, 0];
      case 'right':
        return [index * spacing, 0, 0];
      default:
        return [0, index * spacing, 0];
    }
  };

  return (
    <group ref={groupRef} position={position}>
      {thoughts.map((thought, index) => (
        visibleThoughts.has(index) && (
          <Text
            key={index}
            position={getThoughtPosition(index)}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
            textAlign="center"
          >
            {thought.text}
            <meshStandardMaterial
              color={color}
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity * thoughtOpacities[index]}
              metalness={0.3}
              roughness={0.2}
              transparent
              opacity={thoughtOpacities[index]}
            />
          </Text>
        )
      ))}
    </group>
  );
}
