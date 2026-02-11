'use client';

import { useState, useEffect } from 'react';

interface BrainLayerControlsProps {
  availableLayers: string[];
  onLayerOpacityChange: (layerOpacities: { [key: string]: number }) => void;
  onVariantChange?: (variant: 'idle' | 'thinking' | 'scanning' | 'pulsing') => void;
  onGlobalOpacityChange?: (opacity: number) => void;
  initialLayerOpacities?: { [key: string]: number };
  initialGlobalOpacity?: number;
}

/**
 * BrainLayerControls - Advanced control panel with per-layer opacity controls
 * Allows individual opacity adjustment for each mesh in the brain model
 */
export default function BrainLayerControls({
  availableLayers,
  onLayerOpacityChange,
  onVariantChange,
  onGlobalOpacityChange,
  initialLayerOpacities = {},
  initialGlobalOpacity = 1.0,
}: BrainLayerControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [layerOpacities, setLayerOpacities] = useState<{ [key: string]: number }>(
    initialLayerOpacities
  );
  const [globalOpacity, setGlobalOpacity] = useState(initialGlobalOpacity);
  const [variant, setVariant] = useState<'idle' | 'thinking' | 'scanning' | 'pulsing'>('thinking');

  // Initialize layer opacities for newly discovered layers
  useEffect(() => {
    const newOpacities = { ...layerOpacities };
    let hasChanges = false;

    availableLayers.forEach((layer) => {
      if (newOpacities[layer] === undefined) {
        newOpacities[layer] = 1.0;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setLayerOpacities(newOpacities);
      onLayerOpacityChange(newOpacities);
    }
  }, [availableLayers]);

  const handleLayerOpacityChange = (layerName: string, opacity: number) => {
    const newOpacities = { ...layerOpacities, [layerName]: opacity };
    setLayerOpacities(newOpacities);
    onLayerOpacityChange(newOpacities);
  };

  const handleGlobalOpacityChange = (opacity: number) => {
    setGlobalOpacity(opacity);
    if (onGlobalOpacityChange) {
      onGlobalOpacityChange(opacity);
    }
  };

  const handleVariantChange = (newVariant: typeof variant) => {
    setVariant(newVariant);
    if (onVariantChange) {
      onVariantChange(newVariant);
    }
  };

  const handleResetLayer = (layerName: string) => {
    handleLayerOpacityChange(layerName, 1.0);
  };

  const handleResetAll = () => {
    const resetOpacities: { [key: string]: number } = {};
    availableLayers.forEach((layer) => {
      resetOpacities[layer] = 1.0;
    });
    setLayerOpacities(resetOpacities);
    onLayerOpacityChange(resetOpacities);
    setGlobalOpacity(1.0);
    if (onGlobalOpacityChange) {
      onGlobalOpacityChange(1.0);
    }
  };

  const variants = [
    { value: 'idle', label: 'Idle', emoji: '💤' },
    { value: 'thinking', label: 'Think', emoji: '🧠' },
    { value: 'scanning', label: 'Scan', emoji: '🔍' },
    { value: 'pulsing', label: 'Pulse', emoji: '💓' },
  ] as const;

  const getLayerDisplayName = (layerName: string): string => {
    // Remove common prefixes and clean up names
    const cleaned = layerName
      .replace(/^(Object_|Mesh_|Node_)/i, '')
      .replace(/_/g, ' ')
      .trim();
    
    // Capitalize first letter of each word
    return cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ') || layerName;
  };

  const getLayerIcon = (layerName: string): string => {
    const nameLower = layerName.toLowerCase();
    if (nameLower.includes('cortex') || nameLower.includes('cerebr')) return '🧠';
    if (nameLower.includes('cerebellum')) return '🎯';
    if (nameLower.includes('stem') || nameLower.includes('brain_stem')) return '🌿';
    if (nameLower.includes('white') || nameLower.includes('matter')) return '⚪';
    if (nameLower.includes('corpus') || nameLower.includes('callosum')) return '🌉';
    return '🔘';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isExpanded ? (
        <div className="rounded-lg bg-black/95 p-4 text-white backdrop-blur-md border border-white/10 shadow-2xl max-w-sm max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sticky top-0 bg-black/95 pb-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span>🧬</span>
              <span>Brain Layers</span>
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Collapse controls"
            >
              ✕
            </button>
          </div>

          {/* Animation Variants */}
          {onVariantChange && (
            <div className="mb-4 pb-4 border-b border-white/10">
              <label className="block text-xs font-medium mb-2 text-gray-300">
                Animation
              </label>
              <div className="grid grid-cols-4 gap-1">
                {variants.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => handleVariantChange(v.value)}
                    className={`
                      px-2 py-2 rounded text-xs transition-all
                      ${variant === v.value
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm">{v.emoji}</span>
                      <span className="text-[10px]">{v.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Global Opacity */}
          {onGlobalOpacityChange && (
            <div className="mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-300">
                  Global Opacity
                </label>
                <span className="text-xs text-blue-400 font-mono">
                  {(globalOpacity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={globalOpacity}
                onChange={(e) => handleGlobalOpacityChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}

          {/* Layer Controls */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-gray-300">
                Layer Opacity
              </label>
              <span className="text-[10px] text-gray-500">
                {availableLayers.length} layers
              </span>
            </div>

            {availableLayers.length === 0 ? (
              <div className="text-xs text-gray-500 text-center py-4">
                Loading layers...
              </div>
            ) : (
              <div className="space-y-3">
                {availableLayers.map((layerName) => {
                  const opacity = layerOpacities[layerName] ?? 1.0;
                  const displayName = getLayerDisplayName(layerName);
                  const icon = getLayerIcon(layerName);

                  return (
                    <div
                      key={layerName}
                      className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm">{icon}</span>
                          <span className="text-xs text-gray-200 truncate" title={layerName}>
                            {displayName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-400 font-mono w-10 text-right">
                            {(opacity * 100).toFixed(0)}%
                          </span>
                          <button
                            onClick={() => handleResetLayer(layerName)}
                            className="text-[10px] text-gray-500 hover:text-blue-400 transition-colors"
                            title="Reset to 100%"
                          >
                            ↺
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={opacity}
                        onChange={(e) =>
                          handleLayerOpacityChange(layerName, parseFloat(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-small"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset All Button */}
          <button
            onClick={handleResetAll}
            className="w-full px-3 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10"
          >
            Reset All Layers to 100%
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="rounded-full bg-black/70 px-4 py-2.5 text-sm text-white backdrop-blur-sm hover:bg-black/90 transition-colors shadow-xl flex items-center gap-2 border border-white/10"
          aria-label="Show layer controls"
        >
          <span>🧬</span>
          <span>Layers</span>
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
        .slider-small::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #60a5fa;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(96, 165, 250, 0.5);
        }
        .slider-small::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #60a5fa;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 6px rgba(96, 165, 250, 0.5);
        }
      `}</style>
    </div>
  );
}
