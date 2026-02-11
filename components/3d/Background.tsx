'use client';

import { Environment } from '@react-three/drei';

interface BackgroundProps {
  preset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
  blur?: number;
  showBackground?: boolean; // Toggle visibility of environment background
  backgroundIntensity?: number; // Control intensity/opacity of background
}

export default function Background({ 
  preset = 'city',
  blur = 0.5,
  showBackground = false,
  backgroundIntensity = 1.0
}: BackgroundProps) {
  return (
    <>
      {/* Environment lighting for realistic reflections */}
      <Environment 
        preset={preset} 
        background={showBackground} 
        blur={blur}
        backgroundIntensity={backgroundIntensity}
      />
      
      {/* Optional: Custom gradient background */}
      {/* <color attach="background" args={['#000000']} /> */}
    </>
  );
}
