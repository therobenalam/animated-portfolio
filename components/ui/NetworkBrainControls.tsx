'use client';

import { useState } from 'react';

interface NetworkBrainControlsProps {
  // Skin properties
  onSkinOpacityChange?: (value: number) => void;
  onSurfaceDetailChange?: (value: number) => void;
  onFoldDepthChange?: (value: number) => void;
  onSurfaceRoughnessChange?: (value: number) => void;
  onSkinColorChange?: (value: string) => void;
  onShowSkinChange?: (value: boolean) => void;
  
  // Glow properties
  onGlowIntensityChange?: (value: number) => void;
  onGlowColorChange?: (value: string) => void;
  onShowGlowChange?: (value: boolean) => void;
  
  // Node/Edge properties
  onNodesOpacityChange?: (value: number) => void;
  onEdgesOpacityChange?: (value: number) => void;
  onNodeColorChange?: (value: string) => void;
  onEdgeColorChange?: (value: string) => void;
  onShowNodesChange?: (value: boolean) => void;
  onShowEdgesChange?: (value: boolean) => void;
  
  // Animation
  onPulseSpeedChange?: (value: number) => void;
  onAnimatedChange?: (value: boolean) => void;
  
  // Initial values
  initialSkinOpacity?: number;
  initialSurfaceDetail?: number;
  initialFoldDepth?: number;
  initialSurfaceRoughness?: number;
  initialSkinColor?: string;
  initialShowSkin?: boolean;
  initialGlowIntensity?: number;
  initialGlowColor?: string;
  initialShowGlow?: boolean;
  initialNodesOpacity?: number;
  initialEdgesOpacity?: number;
  initialNodeColor?: string;
  initialEdgeColor?: string;
  initialShowNodes?: boolean;
  initialShowEdges?: boolean;
  initialPulseSpeed?: number;
  initialAnimated?: boolean;
}

/**
 * NetworkBrainControls - Comprehensive UI for NetworkBrain customization
 * Exposes all visual parameters for skin, glow, nodes, edges, and animation
 */
export default function NetworkBrainControls({
  onSkinOpacityChange,
  onSurfaceDetailChange,
  onFoldDepthChange,
  onSurfaceRoughnessChange,
  onSkinColorChange,
  onShowSkinChange,
  onGlowIntensityChange,
  onGlowColorChange,
  onShowGlowChange,
  onNodesOpacityChange,
  onEdgesOpacityChange,
  onNodeColorChange,
  onEdgeColorChange,
  onShowNodesChange,
  onShowEdgesChange,
  onPulseSpeedChange,
  onAnimatedChange,
  initialSkinOpacity = 0.35,
  initialSurfaceDetail = 1.0,
  initialFoldDepth = 1.0,
  initialSurfaceRoughness = 1.0,
  initialSkinColor = '#4488ff',
  initialShowSkin = true,
  initialGlowIntensity = 0.5,
  initialGlowColor = '#4488ff',
  initialShowGlow = false,
  initialNodesOpacity = 0.9,
  initialEdgesOpacity = 0.4,
  initialNodeColor = '#4488ff',
  initialEdgeColor = '#2244aa',
  initialShowNodes = true,
  initialShowEdges = true,
  initialPulseSpeed = 1.0,
  initialAnimated = true,
}: NetworkBrainControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'skin' | 'glow' | 'network' | 'animation'>('skin');
  
  // State for all controls
  const [skinOpacity, setSkinOpacity] = useState(initialSkinOpacity);
  const [surfaceDetail, setSurfaceDetail] = useState(initialSurfaceDetail);
  const [foldDepth, setFoldDepth] = useState(initialFoldDepth);
  const [surfaceRoughness, setSurfaceRoughness] = useState(initialSurfaceRoughness);
  const [skinColor, setSkinColor] = useState(initialSkinColor);
  const [showSkin, setShowSkin] = useState(initialShowSkin);
  
  const [glowIntensity, setGlowIntensity] = useState(initialGlowIntensity);
  const [glowColor, setGlowColor] = useState(initialGlowColor);
  const [showGlow, setShowGlow] = useState(initialShowGlow);
  
  const [nodesOpacity, setNodesOpacity] = useState(initialNodesOpacity);
  const [edgesOpacity, setEdgesOpacity] = useState(initialEdgesOpacity);
  const [nodeColor, setNodeColor] = useState(initialNodeColor);
  const [edgeColor, setEdgeColor] = useState(initialEdgeColor);
  const [showNodes, setShowNodes] = useState(initialShowNodes);
  const [showEdges, setShowEdges] = useState(initialShowEdges);
  
  const [pulseSpeed, setPulseSpeed] = useState(initialPulseSpeed);
  const [animated, setAnimated] = useState(initialAnimated);

  // Handlers with callbacks
  const handleSkinOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSkinOpacity(value);
    onSkinOpacityChange?.(value);
  };

  const handleSurfaceDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSurfaceDetail(value);
    onSurfaceDetailChange?.(value);
  };

  const handleFoldDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFoldDepth(value);
    onFoldDepthChange?.(value);
  };

  const handleSurfaceRoughnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSurfaceRoughness(value);
    onSurfaceRoughnessChange?.(value);
  };

  const handleSkinColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkinColor(value);
    onSkinColorChange?.(value);
  };

  const handleShowSkinToggle = () => {
    const value = !showSkin;
    setShowSkin(value);
    onShowSkinChange?.(value);
  };

  const handleGlowIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGlowIntensity(value);
    onGlowIntensityChange?.(value);
  };

  const handleGlowColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlowColor(value);
    onGlowColorChange?.(value);
  };

  const handleShowGlowToggle = () => {
    const value = !showGlow;
    setShowGlow(value);
    onShowGlowChange?.(value);
  };

  const handleNodesOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setNodesOpacity(value);
    onNodesOpacityChange?.(value);
  };

  const handleEdgesOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setEdgesOpacity(value);
    onEdgesOpacityChange?.(value);
  };

  const handleNodeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNodeColor(value);
    onNodeColorChange?.(value);
  };

  const handleEdgeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEdgeColor(value);
    onEdgeColorChange?.(value);
  };

  const handleShowNodesToggle = () => {
    const value = !showNodes;
    setShowNodes(value);
    onShowNodesChange?.(value);
  };

  const handleShowEdgesToggle = () => {
    const value = !showEdges;
    setShowEdges(value);
    onShowEdgesChange?.(value);
  };

  const handlePulseSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPulseSpeed(value);
    onPulseSpeedChange?.(value);
  };

  const handleAnimatedToggle = () => {
    const value = !animated;
    setAnimated(value);
    onAnimatedChange?.(value);
  };

  // Preset configurations
  const presets = {
    default: {
      skinOpacity: 0.35,
      surfaceDetail: 1.0,
      foldDepth: 1.0,
      surfaceRoughness: 1.0,
      skinColor: '#4488ff',
      glowIntensity: 0.5,
      glowColor: '#4488ff',
      nodesOpacity: 0.9,
      edgesOpacity: 0.4,
      nodeColor: '#4488ff',
      edgeColor: '#2244aa',
      pulseSpeed: 1.0,
    },
    ghost: {
      skinOpacity: 0.15,
      surfaceDetail: 0.5,
      foldDepth: 0.3,
      surfaceRoughness: 0.2,
      skinColor: '#ffffff',
      glowIntensity: 0.3,
      glowColor: '#88ccff',
      nodesOpacity: 0.4,
      edgesOpacity: 0.2,
      nodeColor: '#88ccff',
      edgeColor: '#446688',
      pulseSpeed: 0.5,
    },
    neon: {
      skinOpacity: 0.6,
      surfaceDetail: 1.5,
      foldDepth: 1.5,
      surfaceRoughness: 0.8,
      skinColor: '#ff00ff',
      glowIntensity: 1.5,
      glowColor: '#ff00ff',
      nodesOpacity: 1.0,
      edgesOpacity: 0.7,
      nodeColor: '#ff00ff',
      edgeColor: '#ff0088',
      pulseSpeed: 2.0,
    },
    medical: {
      skinOpacity: 0.45,
      surfaceDetail: 1.2,
      foldDepth: 1.2,
      surfaceRoughness: 1.0,
      skinColor: '#ff3333',
      glowIntensity: 0.6,
      glowColor: '#ff3333',
      nodesOpacity: 0.8,
      edgesOpacity: 0.5,
      nodeColor: '#ff3333',
      edgeColor: '#cc2222',
      pulseSpeed: 1.2,
    },
  };

  const applyPreset = (presetName: keyof typeof presets) => {
    const preset = presets[presetName];
    
    setSkinOpacity(preset.skinOpacity);
    onSkinOpacityChange?.(preset.skinOpacity);
    
    setSurfaceDetail(preset.surfaceDetail);
    onSurfaceDetailChange?.(preset.surfaceDetail);
    
    setFoldDepth(preset.foldDepth);
    onFoldDepthChange?.(preset.foldDepth);
    
    setSurfaceRoughness(preset.surfaceRoughness);
    onSurfaceRoughnessChange?.(preset.surfaceRoughness);
    
    setSkinColor(preset.skinColor);
    onSkinColorChange?.(preset.skinColor);
    
    setGlowIntensity(preset.glowIntensity);
    onGlowIntensityChange?.(preset.glowIntensity);
    
    setGlowColor(preset.glowColor);
    onGlowColorChange?.(preset.glowColor);
    
    setNodesOpacity(preset.nodesOpacity);
    onNodesOpacityChange?.(preset.nodesOpacity);
    
    setEdgesOpacity(preset.edgesOpacity);
    onEdgesOpacityChange?.(preset.edgesOpacity);
    
    setNodeColor(preset.nodeColor);
    onNodeColorChange?.(preset.nodeColor);
    
    setEdgeColor(preset.edgeColor);
    onEdgeColorChange?.(preset.edgeColor);
    
    setPulseSpeed(preset.pulseSpeed);
    onPulseSpeedChange?.(preset.pulseSpeed);
  };

  const tabs = [
    { id: 'skin', label: 'Skin', icon: '🧠', description: 'Brain surface appearance' },
    { id: 'glow', label: 'Glow', icon: '✨', description: 'Center light effect' },
    { id: 'network', label: 'Network', icon: '🔵', description: 'Nodes and edges' },
    { id: 'animation', label: 'Animation', icon: '⚡', description: 'Motion controls' },
  ] as const;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <div className="rounded-lg bg-black/90 p-4 text-white backdrop-blur-md border border-white/10 shadow-2xl w-96 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span>🎨</span>
              <span>NetworkBrain Controls</span>
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Collapse controls"
            >
              ✕
            </button>
          </div>

          {/* Presets */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-gray-300">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(presets).map((preset) => (
                <button
                  key={preset}
                  onClick={() => applyPreset(preset as keyof typeof presets)}
                  className="px-3 py-2 rounded-md text-xs font-medium bg-white/5 text-gray-300 hover:bg-white/10 transition-all capitalize"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-4 bg-white/5 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 px-2 py-2 rounded-md text-xs font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                  }
                `}
                title={tab.description}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-3">
            {/* Skin Tab */}
            {activeTab === 'skin' && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-gray-300">Show Skin</label>
                  <button
                    onClick={handleShowSkinToggle}
                    className={`
                      relative w-11 h-6 rounded-full transition-colors
                      ${showSkin ? 'bg-blue-500' : 'bg-gray-600'}
                    `}
                  >
                    <span
                      className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                        ${showSkin ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-skin-color" className="text-xs text-gray-300">Skin Color</label>
                    <input
                      id="ctrl-skin-color"
                      type="color"
                      value={skinColor}
                      onChange={handleSkinColorChange}
                      disabled={!showSkin}
                      className="w-8 h-6 rounded cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-skin-opacity" className="text-xs text-gray-300">Opacity</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {skinOpacity.toFixed(2)}
                    </span>
                  </div>
                  <input
                    id="ctrl-skin-opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={skinOpacity}
                    onChange={handleSkinOpacityChange}
                    disabled={!showSkin}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-surface-detail" className="text-xs text-gray-300">Surface Detail</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {surfaceDetail.toFixed(2)}
                    </span>
                  </div>
                  <input
                    id="ctrl-surface-detail"
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={surfaceDetail}
                    onChange={handleSurfaceDetailChange}
                    disabled={!showSkin}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Texture frequency</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-fold-depth" className="text-xs text-gray-300">Fold Depth</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {foldDepth.toFixed(2)}
                    </span>
                  </div>
                  <input
                    id="ctrl-fold-depth"
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={foldDepth}
                    onChange={handleFoldDepthChange}
                    disabled={!showSkin}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Gyri/sulci depth</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-surface-roughness" className="text-xs text-gray-300">Surface Roughness</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {surfaceRoughness.toFixed(2)}
                    </span>
                  </div>
                  <input
                    id="ctrl-surface-roughness"
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={surfaceRoughness}
                    onChange={handleSurfaceRoughnessChange}
                    disabled={!showSkin}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Micro-detail intensity</p>
                </div>
              </>
            )}

            {/* Glow Tab */}
            {activeTab === 'glow' && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-gray-300">Show Glow</label>
                  <button
                    onClick={handleShowGlowToggle}
                    className={`
                      relative w-11 h-6 rounded-full transition-colors
                      ${showGlow ? 'bg-blue-500' : 'bg-gray-600'}
                    `}
                  >
                    <span
                      className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                        ${showGlow ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-glow-color" className="text-xs text-gray-300">Glow Color</label>
                    <input
                      id="ctrl-glow-color"
                      type="color"
                      value={glowColor}
                      onChange={handleGlowColorChange}
                      disabled={!showGlow}
                      className="w-8 h-6 rounded cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-glow-intensity" className="text-xs text-gray-300">Glow Intensity</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {glowIntensity.toFixed(2)}
                    </span>
                  </div>
                  <input
                    id="ctrl-glow-intensity"
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={glowIntensity}
                    onChange={handleGlowIntensityChange}
                    disabled={!showGlow}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Center point light brightness</p>
                </div>

                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20 mt-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    💡 <strong>Tip:</strong> The glow creates ambient lighting around the brain. 
                    Higher intensity creates a stronger halo effect. Try matching the glow color 
                    to your skin/node colors for cohesive visuals.
                  </p>
                </div>
              </>
            )}

            {/* Network Tab */}
            {activeTab === 'network' && (
              <>
                {/* Nodes Section */}
                <div className="bg-white/5 p-3 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-200">Nodes (Dots)</label>
                    <button
                      onClick={handleShowNodesToggle}
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${showNodes ? 'bg-blue-500' : 'bg-gray-600'}
                      `}
                    >
                      <span
                        className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                          ${showNodes ? 'translate-x-5' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="ctrl-node-color" className="text-xs text-gray-300">Node Color</label>
                      <input
                        id="ctrl-node-color"
                        type="color"
                        value={nodeColor}
                        onChange={handleNodeColorChange}
                        disabled={!showNodes}
                        className="w-8 h-6 rounded cursor-pointer disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="ctrl-nodes-opacity" className="text-xs text-gray-300">Nodes Opacity</label>
                      <span className="text-xs text-blue-400 font-mono">
                        {nodesOpacity.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id="ctrl-nodes-opacity"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={nodesOpacity}
                      onChange={handleNodesOpacityChange}
                      disabled={!showNodes}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Edges Section */}
                <div className="bg-white/5 p-3 rounded-lg space-y-3 mt-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-200">Edges (Lines)</label>
                    <button
                      onClick={handleShowEdgesToggle}
                      className={`
                        relative w-11 h-6 rounded-full transition-colors
                        ${showEdges ? 'bg-blue-500' : 'bg-gray-600'}
                      `}
                    >
                      <span
                        className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                          ${showEdges ? 'translate-x-5' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="ctrl-edge-color" className="text-xs text-gray-300">Edge Color</label>
                      <input
                        id="ctrl-edge-color"
                        type="color"
                        value={edgeColor}
                        onChange={handleEdgeColorChange}
                        disabled={!showEdges}
                        className="w-8 h-6 rounded cursor-pointer disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="ctrl-edges-opacity" className="text-xs text-gray-300">Edges Opacity</label>
                      <span className="text-xs text-blue-400 font-mono">
                        {edgesOpacity.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id="ctrl-edges-opacity"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={edgesOpacity}
                      onChange={handleEdgesOpacityChange}
                      disabled={!showEdges}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Animation Tab */}
            {activeTab === 'animation' && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-gray-300">Enable Animation</label>
                  <button
                    onClick={handleAnimatedToggle}
                    className={`
                      relative w-11 h-6 rounded-full transition-colors
                      ${animated ? 'bg-blue-500' : 'bg-gray-600'}
                    `}
                  >
                    <span
                      className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform
                        ${animated ? 'translate-x-5' : 'translate-x-0'}
                      `}
                    />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="ctrl-pulse-speed" className="text-xs text-gray-300">Pulse Speed</label>
                    <span className="text-xs text-blue-400 font-mono">
                      {pulseSpeed.toFixed(2)}x
                    </span>
                  </div>
                  <input
                    id="ctrl-pulse-speed"
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={pulseSpeed}
                    onChange={handlePulseSpeedChange}
                    disabled={!animated}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Controls node scaling and edge pulsing</p>
                </div>

                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/20 mt-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    ⚡ <strong>Animation:</strong> Pulse speed affects both node scale animation 
                    and edge opacity pulsing. Higher values create faster, more energetic motion.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={() => applyPreset('default')}
            className="w-full mt-4 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2"
          aria-label="Show NetworkBrain controls"
        >
          <span>🎨</span>
          <span>Network Controls</span>
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
        .slider:disabled::-webkit-slider-thumb {
          background: #6b7280;
          box-shadow: none;
        }
        .slider:disabled::-moz-range-thumb {
          background: #6b7280;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}
