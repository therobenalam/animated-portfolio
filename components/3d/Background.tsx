'use client';

import { Environment } from '@react-three/drei';

interface BackgroundProps {
  preset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  blur?: number;
}

export default function Background({ 
  preset = 'city',
  blur = 0.5 
}: BackgroundProps) {
  return (
    <>
      {/* Environment lighting for realistic reflections */}
      <Environment preset={preset} background blur={blur} />
      
      {/* Optional: Custom gradient background */}
      {/* <color attach="background" args={['#000000']} /> */}
    </>
  );
}
