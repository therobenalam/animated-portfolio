'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BrainModel from '@/components/3d/BrainModel';
import BrainLayerControls from '@/components/ui/BrainLayerControls';
import Lights from '@/components/3d/Lights';
import Camera from '@/components/3d/Camera';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * LayerDetector - Helper component that runs inside Canvas to detect layers
 */
function LayerDetector({ onLayersDetected }: { onLayersDetected: (layers: string[]) => void }) {
  const { scene } = useGLTF('/models/brain.glb');
  
  // Detect layers once scene is loaded
  React.useEffect(() => {
    if (!scene) return;
    
    const layers: string[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const meshName = child.name || `Unnamed_${child.id}`;
        if (!layers.includes(meshName)) {
          layers.push(meshName);
        }
      }
    });
    
    if (layers.length > 0) {
      console.log('[LayerDetector] Detected layers:', layers);
      onLayersDetected(layers);
    }
  }, [scene, onLayersDetected]);
  
  return null;
}

/**
 * Brain Layer Demo - Interactive demonstration of per-layer opacity controls
 * 
 * This component automatically detects all meshes in the brain model and
 * provides individual opacity controls for each layer.
 */
export default function BrainLayerDemo() {
  const [layerOpacities, setLayerOpacities] = useState<{ [key: string]: number }>({});
  const [availableLayers, setAvailableLayers] = useState<string[]>([]);
  const [variant, setVariant] = useState<'idle' | 'thinking' | 'scanning' | 'pulsing'>('thinking');
  const [globalOpacity, setGlobalOpacity] = useState(1.0);

  const handleLayersDetected = (layers: string[]) => {
    setAvailableLayers(layers);
    
    // Initialize all layers to 100% opacity
    const initialOpacities: { [key: string]: number } = {};
    layers.forEach((layer) => {
      initialOpacities[layer] = 1.0;
    });
    setLayerOpacities(initialOpacities);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Camera />
        <Lights />
        
        <LayerDetector onLayersDetected={handleLayersDetected} />
        
        <BrainModel
          position={[0, 0, 0]}
          scale={1.8}
          variant={variant}
          interactive={true}
          autoRotate={false}
          glowIntensity={0.4}
          layerOpacities={layerOpacities}
          opacity={globalOpacity}
        />
      </Canvas>

      {/* Layer Controls */}
      <BrainLayerControls
        availableLayers={availableLayers}
        onLayerOpacityChange={setLayerOpacities}
        onVariantChange={setVariant}
        onGlobalOpacityChange={setGlobalOpacity}
        initialLayerOpacities={layerOpacities}
        initialGlobalOpacity={globalOpacity}
      />

      {/* Info Panel */}
      <div className="fixed top-4 left-4 z-40 bg-black/80 backdrop-blur-md rounded-lg p-4 text-white max-w-md border border-white/10">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span>🧬</span>
          Brain Layer Controls Demo
        </h2>
        <p className="text-sm text-gray-300 mb-3">
          Each mesh in the brain model can be controlled independently.
        </p>
        <div className="space-y-1 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">●</span>
            <span>Detected {availableLayers.length} layers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">●</span>
            <span>Adjust individual layer opacity below</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">●</span>
            <span>Scroll on canvas to rotate brain</span>
          </div>
        </div>
      </div>

      {/* Layer Status */}
      <div className="fixed top-4 right-4 z-40 bg-black/80 backdrop-blur-md rounded-lg p-3 text-white max-w-xs border border-white/10">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <span>📊</span>
          Active Layers
        </h3>
        <div className="space-y-1 text-[10px] max-h-40 overflow-y-auto">
          {availableLayers.length === 0 ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            availableLayers.map((layer) => {
              const opacity = layerOpacities[layer] ?? 1.0;
              const isVisible = opacity > 0;
              return (
                <div
                  key={layer}
                  className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-white/5"
                >
                  <span className={isVisible ? 'text-green-400' : 'text-gray-600'}>
                    {isVisible ? '✓' : '○'}
                  </span>
                  <span className="flex-1 truncate" title={layer}>
                    {layer}
                  </span>
                  <span className="text-blue-400 font-mono">
                    {(opacity * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
