'use client';

import { useState } from 'react';

interface BrainControlsProps {
  onVariantChange: (variant: 'idle' | 'thinking' | 'scanning' | 'pulsing') => void;
  onInteractiveChange: (interactive: boolean) => void;
  onAutoRotateChange: (autoRotate: boolean) => void;
  onGlowIntensityChange: (intensity: number) => void;
  onScaleChange: (scale: number) => void;
  initialVariant?: 'idle' | 'thinking' | 'scanning' | 'pulsing';
  initialInteractive?: boolean;
  initialAutoRotate?: boolean;
  initialGlowIntensity?: number;
  initialScale?: number;
}

/**
 * BrainControls - Interactive control panel for BrainModel
 * Provides toggles and sliders for all brain model options
 */
export default function BrainControls({
  onVariantChange,
  onInteractiveChange,
  onAutoRotateChange,
  onGlowIntensityChange,
  onScaleChange,
  initialVariant = 'thinking',
  initialInteractive = true,
  initialAutoRotate = true,
  initialGlowIntensity = 0.4,
  initialScale = 1.5,
}: BrainControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [variant, setVariant] = useState(initialVariant);
  const [interactive, setInteractive] = useState(initialInteractive);
  const [autoRotate, setAutoRotate] = useState(initialAutoRotate);
  const [glowIntensity, setGlowIntensity] = useState(initialGlowIntensity);
  const [scale, setScale] = useState(initialScale);

  const handleVariantChange = (newVariant: typeof variant) => {
    setVariant(newVariant);
    onVariantChange(newVariant);
  };

  const handleInteractiveToggle = () => {
    const newValue = !interactive;
    setInteractive(newValue);
    onInteractiveChange(newValue);
  };

  const handleAutoRotateToggle = () => {
    const newValue = !autoRotate;
    setAutoRotate(newValue);
    onAutoRotateChange(newValue);
  };

  const handleGlowIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setGlowIntensity(newValue);
    onGlowIntensityChange(newValue);
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setScale(newValue);
    onScaleChange(newValue);
  };

  const variants = [
    { value: 'idle', label: 'Idle', emoji: '💤', description: 'Subtle floating' },
    { value: 'thinking', label: 'Thinking', emoji: '🧠', description: 'Pulsing animation' },
    { value: 'scanning', label: 'Scanning', emoji: '🔍', description: 'Scan wave effect' },
    { value: 'pulsing', label: 'Pulsing', emoji: '💓', description: 'Heartbeat rhythm' },
  ] as const;

  return (
    <div className="fixed top-4 left-4 z-50">
      {isExpanded ? (
        <div className="rounded-lg bg-black/90 p-4 text-white backdrop-blur-md border border-white/10 shadow-2xl max-w-xs">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span>🎛️</span>
              <span>Brain Controls</span>
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Collapse controls"
            >
              ✕
            </button>
          </div>

          {/* Animation Variant */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-gray-300">
              Animation Variant
            </label>
            <div className="grid grid-cols-2 gap-2">
              {variants.map((v) => (
                <button
                  key={v.value}
                  onClick={() => handleVariantChange(v.value)}
                  className={`
                    px-3 py-2 rounded-md text-xs font-medium transition-all
                    ${variant === v.value
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }
                  `}
                  title={v.description}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">{v.emoji}</span>
                    <span>{v.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 mb-4">
            {/* Interactive Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-300">Interactive Scroll</label>
              <button
                onClick={handleInteractiveToggle}
                className={`
                  relative w-11 h-6 rounded-full transition-colors
                  ${interactive ? 'bg-blue-500' : 'bg-gray-600'}
                `}
                aria-label="Toggle interactive mode"
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                    ${interactive ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {/* Auto-Rotate Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-300">Auto Rotate</label>
              <button
                onClick={handleAutoRotateToggle}
                className={`
                  relative w-11 h-6 rounded-full transition-colors
                  ${autoRotate ? 'bg-blue-500' : 'bg-gray-600'}
                `}
                aria-label="Toggle auto-rotation"
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                    ${autoRotate ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            {/* Glow Intensity Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-300">Glow Intensity</label>
                <span className="text-xs text-blue-400 font-mono">
                  {glowIntensity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={glowIntensity}
                onChange={handleGlowIntensityChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-300">Scale</label>
                <span className="text-xs text-blue-400 font-mono">
                  {scale.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              handleVariantChange('thinking');
              setInteractive(true);
              onInteractiveChange(true);
              setAutoRotate(true);
              onAutoRotateChange(true);
              setGlowIntensity(0.4);
              onGlowIntensityChange(0.4);
              setScale(1.5);
              onScaleChange(1.5);
            }}
            className="w-full mt-4 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2"
          aria-label="Show brain controls"
        >
          <span>🎛️</span>
          <span>Controls</span>
        </button>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
