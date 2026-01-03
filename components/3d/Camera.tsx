'use client';

import { OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { isMobile } from '@/utils/three-utils';

interface CameraProps {
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export default function Camera({
  enableZoom = true,
  enablePan = false,
  enableRotate = true,
  autoRotate = false,
  autoRotateSpeed = 0.5,
}: CameraProps) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <OrbitControls
      enableZoom={enableZoom && !mobile}
      enablePan={enablePan}
      enableRotate={enableRotate}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minDistance={2}
      maxDistance={10}
      enableDamping
      dampingFactor={0.05}
    />
  );
}
