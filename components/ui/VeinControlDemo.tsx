'use client';

import { useState } from 'react';
import BrainModel from '@/components/3d/BrainModel';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

/**
 * Interactive Vein Control Demo
 * Allows real-time adjustment of vein parameters
 */
export default function VeinControlDemo() {
  const [enableVeins, setEnableVeins] = useState(true);
  const [veinColor, setVeinColor] = useState('#00ffff');
  const [veinIntensity, setVeinIntensity] = useState(0.8);
  const [veinPulseSpeed, setVeinPulseSpeed] = useState(1.5);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [variant, setVariant] = useState<'idle' | 'thinking' | 'scanning' | 'pulsing'>('thinking');

  // Preset configurations
  const presets = {
    electric: { color: '#00ffff', intensity: 0.8, speed: 1.5, glow: 0.4 },
    neon: { color: '#ff00ff', intensity: 1.0, speed: 2.0, glow: 0.5 },
    medical: { color: '#ff0033', intensity: 0.9, speed: 1.2, glow: 0.3 },
    matrix: { color: '#00ff00', intensity: 1.2, speed: 1.8, glow: 0.6 },
    subtle: { color: '#6699ff', intensity: 0.5, speed: 0.8, glow: 0.2 },
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const config = presets[preset];
    setVeinColor(config.color);
    setVeinIntensity(config.intensity);
    setVeinPulseSpeed(config.speed);
    setGlowIntensity(config.glow);
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      {/* 3D Canvas */}
      <div className="w-full h-3/4">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <BrainModel
            position={[0, 0, 0]}
            scale={1.5}
            variant={variant}
            enableVeins={enableVeins}
            veinColor={veinColor}
            veinIntensity={veinIntensity}
            veinPulseSpeed={veinPulseSpeed}
            glowIntensity={glowIntensity}
          />
          
          <OrbitControls enableZoom={true} enablePan={false} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Controls Panel */}
      <div className="w-full h-1/4 bg-gray-900 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Enable/Disable Veins */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enableVeins}
                onChange={(e) => setEnableVeins(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="font-semibold">Enable Veins</span>
            </label>
          </div>

          {/* Vein Color Picker */}
          <div className="space-y-2">
            <label className="block font-semibold">
              Vein Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={veinColor}
                onChange={(e) => setVeinColor(e.target.value)}
                className="w-16 h-10 cursor-pointer"
                disabled={!enableVeins}
              />
              <input
                type="text"
                value={veinColor}
                onChange={(e) => setVeinColor(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 rounded text-sm"
                disabled={!enableVeins}
              />
            </div>
          </div>

          {/* Vein Intensity */}
          <div className="space-y-2">
            <label className="block font-semibold">
              Vein Intensity: {veinIntensity.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={veinIntensity}
              onChange={(e) => setVeinIntensity(parseFloat(e.target.value))}
              className="w-full"
              disabled={!enableVeins}
            />
          </div>

          {/* Vein Pulse Speed */}
          <div className="space-y-2">
            <label className="block font-semibold">
              Pulse Speed: {veinPulseSpeed.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={veinPulseSpeed}
              onChange={(e) => setVeinPulseSpeed(parseFloat(e.target.value))}
              className="w-full"
              disabled={!enableVeins}
            />
          </div>

          {/* Glow Intensity */}
          <div className="space-y-2">
            <label className="block font-semibold">
              Glow Intensity: {glowIntensity.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={glowIntensity}
              onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Animation Variant */}
          <div className="space-y-2">
            <label className="block font-semibold">
              Animation Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              className="w-full px-3 py-2 bg-gray-800 rounded"
            >
              <option value="idle">Idle</option>
              <option value="thinking">Thinking</option>
              <option value="scanning">Scanning</option>
              <option value="pulsing">Pulsing</option>
            </select>
          </div>

          {/* Presets */}
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="block font-semibold mb-2">
              Presets
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset('electric')}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded transition"
              >
                Electric Blue
              </button>
              <button
                onClick={() => applyPreset('neon')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
              >
                Neon Purple
              </button>
              <button
                onClick={() => applyPreset('medical')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
              >
                Medical Red
              </button>
              <button
                onClick={() => applyPreset('matrix')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
              >
                Matrix Green
              </button>
              <button
                onClick={() => applyPreset('subtle')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
              >
                Subtle Professional
              </button>
            </div>
          </div>

          {/* Current Config Display */}
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="block font-semibold mb-2">
              Current Configuration (Copy this code)
            </label>
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-xs">
{`<BrainModel
  variant="${variant}"
  enableVeins={${enableVeins}}
  veinColor="${veinColor}"
  veinIntensity={${veinIntensity}}
  veinPulseSpeed={${veinPulseSpeed}}
  glowIntensity={${glowIntensity}}
/>`}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}
