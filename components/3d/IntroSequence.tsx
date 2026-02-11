'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface IntroSequenceProps {
  /** Called when intro finishes or is skipped */
  onComplete: () => void;
  /** Whether the intro is currently playing */
  isPlaying: boolean;
  /** Timing config (in seconds) */
  timing?: {
    cursorBlinkDuration: number;   // Phase 0: just cursor blinks
    nodesMaterialize: number;      // Phase 1: nodes appear (staggered)
    labelsFadeIn: number;          // Phase 2: AI system labels orbit in
    typewriterStart: number;       // Phase 3: text begins typing
    hubActivate: number;           // Phase 4: transition to hub
  };
}

/**
 * IntroSequence - Orchestrates the cinematic intro animation inside the R3F canvas.
 *
 * Timeline:
 *  0-1s   → Cursor blinks on black (handled by HTML overlay, not this component)
 *  1-3s   → Brain nodes materialize from center outward
 *  3-4s   → AI system labels fade in
 *  4-5.5s → Typewriter text appears
 *  5.5s+  → Hub state activates
 *
 * This component controls:
 *  - A global opacity multiplier for NetworkBrain nodes (introNodesOpacity)
 *  - A global opacity multiplier for AI connectors (introLabelsOpacity)
 *  - The intro typewriter text
 */
export default function IntroSequence({
  onComplete,
  isPlaying,
  timing = {
    cursorBlinkDuration: 1.0,
    nodesMaterialize: 2.0,
    labelsFadeIn: 1.0,
    typewriterStart: 4.0,
    hubActivate: 6.5,
  },
}: IntroSequenceProps) {
  const elapsedRef = useRef(0);
  const hasCompletedRef = useRef(false);

  // Typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hi, I'm Robin. Welcome to my neural workspace.";
  const typewriterStartedRef = useRef(false);
  const charIndexRef = useRef(0);
  const lastCharTimeRef = useRef(0);
  const charsPerSecond = 30;

  // Text opacity for fade out
  const [textOpacity, setTextOpacity] = useState(0);

  useFrame((_, delta) => {
    if (!isPlaying || hasCompletedRef.current) return;

    elapsedRef.current += delta;
    const t = elapsedRef.current;

    // Phase 3: Typewriter text (starts at typewriterStart)
    if (t >= timing.typewriterStart && !typewriterStartedRef.current) {
      typewriterStartedRef.current = true;
      lastCharTimeRef.current = t;
    }

    if (typewriterStartedRef.current && charIndexRef.current < fullText.length) {
      const charInterval = 1 / charsPerSecond;
      if (t - lastCharTimeRef.current >= charInterval) {
        charIndexRef.current++;
        lastCharTimeRef.current = t;
        setDisplayedText(fullText.slice(0, charIndexRef.current));
      }
    }

    // Text opacity: fade in when typing starts, fade out near hub activate
    if (t >= timing.typewriterStart && t < timing.hubActivate - 0.5) {
      setTextOpacity(Math.min(1, (t - timing.typewriterStart) * 3));
    } else if (t >= timing.hubActivate - 0.5) {
      setTextOpacity(Math.max(0, 1 - (t - (timing.hubActivate - 0.5)) * 2));
    }

    // Phase 4: Complete
    if (t >= timing.hubActivate && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  });

  // Reset on replay
  useEffect(() => {
    if (isPlaying) {
      elapsedRef.current = 0;
      hasCompletedRef.current = false;
      typewriterStartedRef.current = false;
      charIndexRef.current = 0;
      setDisplayedText('');
      setTextOpacity(0);
    }
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <group>
      {/* Intro typewriter text - positioned above brain */}
      {displayedText && (
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.18}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          font={undefined}
          outlineWidth={0.005}
          outlineColor="#003322"
          fillOpacity={textOpacity}
        >
          {displayedText}
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={textOpacity}
            toneMapped={false}
          />
        </Text>
      )}

      {/* Blinking cursor */}
      {displayedText && charIndexRef.current < fullText.length && (
        <Text
          position={[0, 2.2, 0.01]}
          fontSize={0.18}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          fillOpacity={textOpacity * (Math.sin(elapsedRef.current * 6) > 0 ? 1 : 0)}
        >
          {'_'.padStart(displayedText.length + 1)}
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={textOpacity * (Math.sin(Date.now() * 0.006) > 0 ? 1 : 0)}
            toneMapped={false}
          />
        </Text>
      )}
    </group>
  );
}

/**
 * useIntroTimeline - Hook to compute intro animation progress values
 * Used by parent to control NetworkBrain & AISystemConnector opacity
 */
export function useIntroTimeline(
  isPlaying: boolean,
  timing = {
    cursorBlinkDuration: 1.0,
    nodesMaterialize: 2.0,
    labelsFadeIn: 1.0,
    typewriterStart: 4.0,
    hubActivate: 6.5,
  }
) {
  const elapsedRef = useRef(0);
  const [nodesOpacity, setNodesOpacity] = useState(isPlaying ? 0 : 1);
  const [labelsOpacity, setLabelsOpacity] = useState(isPlaying ? 0 : 1);
  const [phase, setPhase] = useState<'cursor' | 'nodes' | 'labels' | 'typewriter' | 'hub'>(
    isPlaying ? 'cursor' : 'hub'
  );

  useFrame((_, delta) => {
    if (!isPlaying) return;

    elapsedRef.current += delta;
    const t = elapsedRef.current;

    // Phase transitions
    if (t < timing.cursorBlinkDuration) {
      setPhase('cursor');
      setNodesOpacity(0);
      setLabelsOpacity(0);
    } else if (t < timing.cursorBlinkDuration + timing.nodesMaterialize) {
      setPhase('nodes');
      // Ease in nodes over the materialize duration
      const nodeProgress = (t - timing.cursorBlinkDuration) / timing.nodesMaterialize;
      setNodesOpacity(easeOutCubic(Math.min(1, nodeProgress)));
      setLabelsOpacity(0);
    } else if (t < timing.typewriterStart) {
      setPhase('labels');
      setNodesOpacity(1);
      // Ease in labels
      const labelProgress = (t - timing.cursorBlinkDuration - timing.nodesMaterialize) / timing.labelsFadeIn;
      setLabelsOpacity(easeOutCubic(Math.min(1, labelProgress)));
    } else {
      setPhase('typewriter');
      setNodesOpacity(1);
      setLabelsOpacity(1);
    }
  });

  // When intro ends or isn't playing, ensure full opacity
  useEffect(() => {
    if (!isPlaying) {
      setNodesOpacity(1);
      setLabelsOpacity(1);
      setPhase('hub');
      elapsedRef.current = 0;
    }
  }, [isPlaying]);

  return { nodesOpacity, labelsOpacity, phase };
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
