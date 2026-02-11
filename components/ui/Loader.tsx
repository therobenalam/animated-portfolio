'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

interface LoaderProps {
  onLoadComplete?: () => void;
}

export default function Loader({ onLoadComplete }: LoaderProps) {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [dots, setDots] = useState('');
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    if (!active && progress === 100) {
      // Notify parent that loading is done
      if (!hasCalledComplete.current && onLoadComplete) {
        hasCalledComplete.current = true;
        onLoadComplete();
      }
      const timer = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onLoadComplete]);

  // Animated dots for terminal feel
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Status messages based on progress
  const statusMessage = useMemo(() => {
    if (progress < 15) return 'BOOTING NEURAL INTERFACE';
    if (progress < 40) return 'LOADING 3D CORTEX MODEL';
    if (progress < 60) return 'INITIALIZING SYNAPTIC MESH';
    if (progress < 80) return 'MAPPING NEURAL PATHWAYS';
    if (progress < 95) return 'CALIBRATING VISUAL CORTEX';
    return 'WORKSPACE READY';
  }, [progress]);

  if (!isVisible) return null;

  const isReady = !active && progress === 100;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.015) 2px, rgba(0,255,100,0.015) 4px)',
        }}
      />

      <div className="text-center font-mono">
        {/* Neural pulse icon */}
        <div className="mb-6 flex justify-center">
          <svg width="64" height="32" viewBox="0 0 64 32" className="text-cyan-500">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              points="0,16 12,16 16,4 20,28 24,8 28,24 32,16 36,16 40,12 44,20 48,16 64,16"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="mb-3 h-[2px] w-72 overflow-hidden bg-gray-800/60 rounded-sm">
          <div
            className="h-full transition-all duration-300 ease-out rounded-sm"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff88, #00d4ff, #00ff88)',
              boxShadow: '0 0 8px rgba(0,255,136,0.6), 0 0 20px rgba(0,212,255,0.3)',
            }}
          />
        </div>

        {/* Status readout */}
        <p className="text-[11px] tracking-[0.2em] text-cyan-400/80 mb-1">
          {statusMessage}{dots}
        </p>
        <p className="text-[10px] tracking-[0.15em] text-gray-600">
          [{Math.round(progress).toString().padStart(3, '0')}%] SYS.NEURAL.INIT
        </p>
      </div>
    </div>
  );
}
