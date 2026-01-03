'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { isMobile, getResponsiveScale } from '@/utils/three-utils';

interface ModelLoaderProps {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

/**
 * ModelLoader - Dynamic 3D model loader with performance optimization
 * 
 * Usage:
 * 1. Export model from Blender as .glb (with Draco compression)
 * 2. Place in public/models/
 * 3. Use this component: <ModelLoader modelPath="/models/your-model.glb" />
 * 
 * For custom components, use gltfjsx:
 * npx gltfjsx public/models/your-model.glb -o components/3d/YourModel.tsx
 */
export default function ModelLoader({
  modelPath,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: ModelLoaderProps) {
  const [responsiveScale, setResponsiveScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  
  // Load model with useGLTF hook
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    setResponsiveScale(getResponsiveScale());
    setMobile(isMobile());

    const handleResize = () => {
      setResponsiveScale(getResponsiveScale());
      setMobile(isMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const finalScale = scale * responsiveScale;

  return (
    <primitive
      object={scene}
      position={position}
      scale={finalScale}
      rotation={rotation}
    />
  );
}

// Preload model for better performance
export function preloadModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
