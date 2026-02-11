'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Lights from './Lights';

interface SceneProps {
  children?: React.ReactNode;
  className?: string;
}

function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ff0000" wireframe />
    </mesh>
  );
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-lg bg-red-500/10 p-6 text-center">
        <p className="text-lg font-semibold text-red-400">3D Scene Error</p>
        <p className="mt-2 text-sm text-gray-400">{error.message}</p>
      </div>
    </div>
  );
}

export default function Scene({ children, className = '' }: SceneProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Canvas
        className={className}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block',
          background: '#000000',
        }}
        camera={{
          position: [0, 0, 6.5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 2]} // Adaptive pixel ratio for performance
      >
        <Suspense fallback={<SceneFallback />}>
          <Lights />
          {children}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
