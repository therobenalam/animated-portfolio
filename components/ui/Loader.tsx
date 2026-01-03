'use client';

import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function Loader() {
  const { progress, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // Fade out loader after content is loaded
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        !active && progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mb-4 h-2 w-64 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">
          Loading 3D Experience... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
