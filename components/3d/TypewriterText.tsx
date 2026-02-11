'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TypewriterTextProps {
  lines: string[];
  position?: [number, number, number];
  delay?: number;
  charsPerSecond?: number;
  lineDelay?: number;
  fontSize?: number;
  color?: string;
  emissiveColor?: string;
  emissiveIntensity?: number;
  showCursor?: boolean;
  fadeOutDelay?: number;
  onComplete?: () => void;
}

/**
 * TypewriterText - Character-by-character text reveal animation
 * 
 * Features:
 * - Typewriter effect with configurable speed
 * - Optional blinking cursor
 * - Per-line delays
 * - Smooth character transitions
 * - Emissive glow effect
 */
export default function TypewriterText({
  lines,
  position = [0, 0, 0],
  delay = 1,
  charsPerSecond = 20,
  lineDelay = 0.3,
  fontSize = 0.22,
  color = '#ffffff',
  emissiveColor = '#4488ff',
  emissiveIntensity = 0.7,
  showCursor = true,
  fadeOutDelay = 3,
  onComplete,
}: TypewriterTextProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [visibleText, setVisibleText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  // Typewriter animation logic
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const charInterval = 1000 / charsPerSecond;
      
      const typeNextChar = () => {
        if (currentLineIndex >= lines.length) {
          setIsComplete(true);
          if (onComplete) onComplete();
          
          // Start fade out after delay
          setTimeout(() => {
            const fadeInterval = setInterval(() => {
              setOpacity(prev => {
                const newOpacity = prev - 0.02;
                if (newOpacity <= 0) {
                  clearInterval(fadeInterval);
                  return 0;
                }
                return newOpacity;
              });
            }, 50);
          }, fadeOutDelay * 1000);
          
          return;
        }

        const currentLine = lines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          // Type next character
          setVisibleText(prev => {
            const newText = [...prev];
            if (!newText[currentLineIndex]) {
              newText[currentLineIndex] = '';
            }
            newText[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
            return newText;
          });
          setCurrentCharIndex(prev => prev + 1);
          setTimeout(typeNextChar, charInterval);
        } else {
          // Move to next line after delay
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            typeNextChar();
          }, lineDelay * 1000);
        }
      };

      typeNextChar();
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [lines, delay, charsPerSecond, lineDelay, fadeOutDelay, onComplete]);

  // Cursor blink animation
  useEffect(() => {
    if (!showCursor || isComplete) return;

    const blinkInterval = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [showCursor, isComplete]);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current && opacity > 0) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {visibleText.map((line, index) => (
        <group key={index}>
          <Text
            position={[0, -index * (fontSize * 1.3), 0]}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
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
          
          {/* Cursor */}
          {showCursor && 
           index === currentLineIndex && 
           !isComplete && 
           showCursorBlink && (
            <Text
              position={[
                (line.length * fontSize * 0.3) / 2 + fontSize * 0.2,
                -index * (fontSize * 1.3),
                0
              ]}
              fontSize={fontSize}
              color={color}
              anchorX="left"
              anchorY="middle"
            >
              _
              <meshStandardMaterial
                color={color}
                emissive={emissiveColor}
                emissiveIntensity={emissiveIntensity}
                metalness={0.2}
                roughness={0.3}
              />
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}
