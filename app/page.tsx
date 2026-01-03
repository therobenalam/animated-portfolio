'use client';

import { useState } from 'react';
import Scene from '@/components/3d/Scene';
import BrainModel from '@/components/3d/BrainModel';
import NetworkBrain from '@/components/3d/NetworkBrain';
import ModelAttribution from '@/components/ui/ModelAttribution';
import BrainControls from '@/components/ui/BrainControls';

export default function Home() {
  const [variant, setVariant] = useState<'idle' | 'thinking' | 'scanning' | 'pulsing'>('thinking');
  const [interactive, setInteractive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [scale, setScale] = useState(1.5);
  const [useNetwork, setUseNetwork] = useState(true); // Network mode by default

  return (
    <main className="fixed inset-0 h-screen w-screen bg-black m-0 p-0">
      <Scene className="h-full w-full">
        {useNetwork ? (
          <NetworkBrain
            position={[0, 0, 0]}
            scale={scale}
            nodeCount={400}
            connectionDensity={0.12}
            nodeSize={0.015}
            animated={true}
            pulseSpeed={variant === 'thinking' ? 1.5 : variant === 'scanning' ? 2 : variant === 'pulsing' ? 1 : 0.5}
          />
        ) : (
          <BrainModel 
            position={[0, 0, 0]} 
            scale={scale} 
            variant={variant}
            interactive={interactive}
            autoRotate={autoRotate}
            glowIntensity={glowIntensity}
          />
        )}
      </Scene>
      
      {/* Toggle between network and textured model */}
      <button
        onClick={() => setUseNetwork(!useNetwork)}
        className="fixed top-4 right-4 z-50 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg"
      >
        {useNetwork ? '🧠 Textured' : '🔗 Network'}
      </button>
      
      <BrainControls
        onVariantChange={setVariant}
        onInteractiveChange={setInteractive}
        onAutoRotateChange={setAutoRotate}
        onGlowIntensityChange={setGlowIntensity}
        onScaleChange={setScale}
        initialVariant={variant}
        initialInteractive={interactive}
        initialAutoRotate={autoRotate}
        initialGlowIntensity={glowIntensity}
        initialScale={scale}
      />
      <ModelAttribution />
    </main>
  );
}
