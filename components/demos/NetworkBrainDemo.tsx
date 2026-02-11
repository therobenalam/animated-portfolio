'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import NetworkBrain from '@/components/3d/NetworkBrain';
import NetworkBrainControls from '@/components/ui/NetworkBrainControls';

/**
 * NetworkBrainDemo - Interactive demo with full customization controls
 * Shows how to connect NetworkBrainControls to NetworkBrain component
 */
export default function NetworkBrainDemo() {
  // Skin state
  const [skinOpacity, setSkinOpacity] = useState(0.35);
  const [surfaceDetail, setSurfaceDetail] = useState(1.0);
  const [foldDepth, setFoldDepth] = useState(1.0);
  const [surfaceRoughness, setSurfaceRoughness] = useState(1.0);
  const [skinColor, setSkinColor] = useState('#4488ff');
  const [showSkin, setShowSkin] = useState(true);

  // Glow state
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [glowColor, setGlowColor] = useState('#4488ff');
  const [showGlow, setShowGlow] = useState(false);

  // Network state
  const [nodesOpacity, setNodesOpacity] = useState(0.9);
  const [edgesOpacity, setEdgesOpacity] = useState(0.4);
  const [nodeColor, setNodeColor] = useState('#4488ff');
  const [edgeColor, setEdgeColor] = useState('#2244aa');
  const [showNodes, setShowNodes] = useState(true);
  const [showEdges, setShowEdges] = useState(true);

  // Animation state
  const [pulseSpeed, setPulseSpeed] = useState(1.0);
  const [animated, setAnimated] = useState(true);

  return (
    <div className="w-full h-screen bg-black">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <NetworkBrain
          position={[0, 0, 0]}
          scale={1.5}
          // Skin props
          skinOpacity={skinOpacity}
          surfaceDetail={surfaceDetail}
          foldDepth={foldDepth}
          surfaceRoughness={surfaceRoughness}
          showSkin={showSkin}
          // Glow props
          glowIntensity={glowIntensity}
          showGlow={showGlow}
          // Network props
          nodesOpacity={nodesOpacity}
          edgesOpacity={edgesOpacity}
          nodeColor={nodeColor}
          edgeColor={edgeColor}
          showNodes={showNodes}
          showEdges={showEdges}
          // Animation props
          pulseSpeed={pulseSpeed}
          animated={animated}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
        <Environment preset="night" />
      </Canvas>

      {/* Controls Panel */}
      <NetworkBrainControls
        // Skin callbacks
        onSkinOpacityChange={setSkinOpacity}
        onSurfaceDetailChange={setSurfaceDetail}
        onFoldDepthChange={setFoldDepth}
        onSurfaceRoughnessChange={setSurfaceRoughness}
        onSkinColorChange={setSkinColor}
        onShowSkinChange={setShowSkin}
        // Glow callbacks
        onGlowIntensityChange={setGlowIntensity}
        onGlowColorChange={setGlowColor}
        onShowGlowChange={setShowGlow}
        // Network callbacks
        onNodesOpacityChange={setNodesOpacity}
        onEdgesOpacityChange={setEdgesOpacity}
        onNodeColorChange={setNodeColor}
        onEdgeColorChange={setEdgeColor}
        onShowNodesChange={setShowNodes}
        onShowEdgesChange={setShowEdges}
        // Animation callbacks
        onPulseSpeedChange={setPulseSpeed}
        onAnimatedChange={setAnimated}
        // Initial values
        initialSkinOpacity={skinOpacity}
        initialSurfaceDetail={surfaceDetail}
        initialFoldDepth={foldDepth}
        initialSurfaceRoughness={surfaceRoughness}
        initialSkinColor={skinColor}
        initialShowSkin={showSkin}
        initialGlowIntensity={glowIntensity}
        initialGlowColor={glowColor}
        initialShowGlow={showGlow}
        initialNodesOpacity={nodesOpacity}
        initialEdgesOpacity={edgesOpacity}
        initialNodeColor={nodeColor}
        initialEdgeColor={edgeColor}
        initialShowNodes={showNodes}
        initialShowEdges={showEdges}
        initialPulseSpeed={pulseSpeed}
        initialAnimated={animated}
      />

      {/* Info Banner */}
      <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-white/10 max-w-sm">
        <h2 className="text-white font-bold mb-2">NetworkBrain Demo</h2>
        <p className="text-gray-400 text-sm">
          Use the controls (bottom-right) to customize the brain's appearance in real-time.
          Try the different presets or adjust individual parameters.
        </p>
      </div>
    </div>
  );
}
