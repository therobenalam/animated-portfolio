'use client';

import { useEffect, useState } from 'react';
import { isMobile } from '@/utils/three-utils';

export default function Lights() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.5} />
      
      {/* Hemisphere light for natural sky/ground lighting */}
      <hemisphereLight 
        color="#ffffff" 
        groundColor="#444444" 
        intensity={0.6} 
      />
      
      {/* Directional light (shadows disabled on mobile for performance) */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow={!mobile}
        shadow-mapSize-width={mobile ? 512 : 2048}
        shadow-mapSize-height={mobile ? 512 : 2048}
      />
      
      {/* Spot light (only on desktop) */}
      {!mobile && (
        <spotLight
          position={[-5, 5, 2]}
          intensity={0.5}
          angle={0.3}
          penumbra={1}
        />
      )}
    </>
  );
}
