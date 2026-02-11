# NetworkBrain Controls Guide

Comprehensive UI controls for customizing NetworkBrain appearance in real-time.

## Quick Start

```tsx
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import NetworkBrain from '@/components/3d/NetworkBrain';
import NetworkBrainControls from '@/components/ui/NetworkBrainControls';

export default function MyScene() {
  const [skinOpacity, setSkinOpacity] = useState(0.35);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  return (
    <>
      <Canvas>
        <NetworkBrain
          skinOpacity={skinOpacity}
          glowIntensity={glowIntensity}
        />
      </Canvas>
      
      <NetworkBrainControls
        onSkinOpacityChange={setSkinOpacity}
        onGlowIntensityChange={setGlowIntensity}
        initialSkinOpacity={skinOpacity}
        initialGlowIntensity={glowIntensity}
      />
    </>
  );
}
```

## Features

### 🎨 4 Control Tabs

1. **Skin** - Brain surface appearance
2. **Glow** - Center light effect  
3. **Network** - Nodes and edges
4. **Animation** - Motion controls

### ⚡ Quick Presets

- **Default** - Balanced blue appearance
- **Ghost** - Subtle, translucent white
- **Neon** - Vibrant magenta with high intensity
- **Medical** - Red anatomical style

## Skin Controls (Tab 1)

### Show Skin Toggle
Enable/disable the brain surface mesh.

```tsx
<NetworkBrainControls
  onShowSkinChange={setShowSkin}
  initialShowSkin={true}
/>
```

### Skin Color
Full color picker for surface tint.

```tsx
<NetworkBrainControls
  onSkinColorChange={setSkinColor}
  initialSkinColor="#4488ff"
/>
```

**Range:** Any hex color  
**Default:** `#4488ff` (blue)

### Opacity
Transparency of the brain surface.

```tsx
<NetworkBrainControls
  onSkinOpacityChange={setSkinOpacity}
  initialSkinOpacity={0.35}
/>
```

**Range:** 0.0 - 1.0  
**Default:** 0.35  
**Effect:** Higher = more opaque, lower = more transparent

### Surface Detail
Frequency of cortical texture patterns.

```tsx
<NetworkBrainControls
  onSurfaceDetailChange={setSurfaceDetail}
  initialSurfaceDetail={1.0}
/>
```

**Range:** 0.0 - 2.0  
**Default:** 1.0  
**Effect:** Higher = more frequent wrinkles/texture

### Fold Depth
Depth of gyri and sulci (brain wrinkles).

```tsx
<NetworkBrainControls
  onFoldDepthChange={setFoldDepth}
  initialFoldDepth={1.0}
/>
```

**Range:** 0.0 - 2.0  
**Default:** 1.0  
**Effect:** Higher = deeper folds, more pronounced anatomy

### Surface Roughness
Micro-detail intensity for lighting.

```tsx
<NetworkBrainControls
  onSurfaceRoughnessChange={setSurfaceRoughness}
  initialSurfaceRoughness={1.0}
/>
```

**Range:** 0.0 - 2.0  
**Default:** 1.0  
**Effect:** Higher = more normal map detail, rougher appearance

## Glow Controls (Tab 2)

### Show Glow Toggle
Enable/disable center point light.

```tsx
<NetworkBrainControls
  onShowGlowChange={setShowGlow}
  initialShowGlow={true}
/>
```

### Glow Color
Color of the center point light.

```tsx
<NetworkBrainControls
  onGlowColorChange={setGlowColor}
  initialGlowColor="#4488ff"
/>
```

**Range:** Any hex color  
**Default:** `#4488ff` (blue)  
**Tip:** Match to skin/node colors for cohesive visuals

### Glow Intensity
Brightness of center point light.

```tsx
<NetworkBrainControls
  onGlowIntensityChange={setGlowIntensity}
  initialGlowIntensity={0.5}
/>
```

**Range:** 0.0 - 2.0  
**Default:** 0.5  
**Effect:** Higher = stronger halo effect around brain

## Network Controls (Tab 3)

### Nodes (Dots)

**Show Nodes Toggle:**
```tsx
<NetworkBrainControls
  onShowNodesChange={setShowNodes}
  initialShowNodes={true}
/>
```

**Node Color:**
```tsx
<NetworkBrainControls
  onNodeColorChange={setNodeColor}
  initialNodeColor="#4488ff"
/>
```

**Nodes Opacity:**
```tsx
<NetworkBrainControls
  onNodesOpacityChange={setNodesOpacity}
  initialNodesOpacity={0.9}
/>
```

**Range:** 0.0 - 1.0  
**Default:** 0.9

### Edges (Lines)

**Show Edges Toggle:**
```tsx
<NetworkBrainControls
  onShowEdgesChange={setShowEdges}
  initialShowEdges={true}
/>
```

**Edge Color:**
```tsx
<NetworkBrainControls
  onEdgeColorChange={setEdgeColor}
  initialEdgeColor="#2244aa"
/>
```

**Edges Opacity:**
```tsx
<NetworkBrainControls
  onEdgesOpacityChange={setEdgesOpacity}
  initialEdgesOpacity={0.4}
/>
```

**Range:** 0.0 - 1.0  
**Default:** 0.4

## Animation Controls (Tab 4)

### Enable Animation Toggle
Enable/disable all motion.

```tsx
<NetworkBrainControls
  onAnimatedChange={setAnimated}
  initialAnimated={true}
/>
```

### Pulse Speed
Speed multiplier for animations.

```tsx
<NetworkBrainControls
  onPulseSpeedChange={setPulseSpeed}
  initialPulseSpeed={1.0}
/>
```

**Range:** 0.0 - 5.0  
**Default:** 1.0  
**Effect:** Controls node scale pulsing and edge opacity animation

## Complete Example

```tsx
'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import NetworkBrain from '@/components/3d/NetworkBrain';
import NetworkBrainControls from '@/components/ui/NetworkBrainControls';

export default function CustomizableBrain() {
  // Skin state
  const [skinOpacity, setSkinOpacity] = useState(0.35);
  const [surfaceDetail, setSurfaceDetail] = useState(1.0);
  const [foldDepth, setFoldDepth] = useState(1.0);
  const [surfaceRoughness, setSurfaceRoughness] = useState(1.0);
  const [skinColor, setSkinColor] = useState('#4488ff');
  const [showSkin, setShowSkin] = useState(true);

  // Glow state
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [showGlow, setShowGlow] = useState(true);

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
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <NetworkBrain
          // Skin
          skinOpacity={skinOpacity}
          surfaceDetail={surfaceDetail}
          foldDepth={foldDepth}
          surfaceRoughness={surfaceRoughness}
          nodeColor={skinColor}
          showSkin={showSkin}
          // Glow
          glowIntensity={glowIntensity}
          showGlow={showGlow}
          // Network
          nodesOpacity={nodesOpacity}
          edgesOpacity={edgesOpacity}
          nodeColor={nodeColor}
          edgeColor={edgeColor}
          showNodes={showNodes}
          showEdges={showEdges}
          // Animation
          pulseSpeed={pulseSpeed}
          animated={animated}
        />

        <OrbitControls />
      </Canvas>

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
      />
    </div>
  );
}
```

## Preset Values Reference

### Default Preset
```json
{
  "skinOpacity": 0.35,
  "surfaceDetail": 1.0,
  "foldDepth": 1.0,
  "surfaceRoughness": 1.0,
  "skinColor": "#4488ff",
  "glowIntensity": 0.5,
  "nodesOpacity": 0.9,
  "edgesOpacity": 0.4,
  "nodeColor": "#4488ff",
  "edgeColor": "#2244aa",
  "pulseSpeed": 1.0
}
```

### Ghost Preset
```json
{
  "skinOpacity": 0.15,
  "surfaceDetail": 0.5,
  "foldDepth": 0.3,
  "surfaceRoughness": 0.2,
  "skinColor": "#ffffff",
  "glowIntensity": 0.3,
  "nodesOpacity": 0.4,
  "edgesOpacity": 0.2,
  "nodeColor": "#88ccff",
  "edgeColor": "#446688",
  "pulseSpeed": 0.5
}
```

### Neon Preset
```json
{
  "skinOpacity": 0.6,
  "surfaceDetail": 1.5,
  "foldDepth": 1.5,
  "surfaceRoughness": 0.8,
  "skinColor": "#ff00ff",
  "glowIntensity": 1.5,
  "nodesOpacity": 1.0,
  "edgesOpacity": 0.7,
  "nodeColor": "#ff00ff",
  "edgeColor": "#ff0088",
  "pulseSpeed": 2.0
}
```

### Medical Preset
```json
{
  "skinOpacity": 0.45,
  "surfaceDetail": 1.2,
  "foldDepth": 1.2,
  "surfaceRoughness": 1.0,
  "skinColor": "#ff3333",
  "glowIntensity": 0.6,
  "nodesOpacity": 0.8,
  "edgesOpacity": 0.5,
  "nodeColor": "#ff3333",
  "edgeColor": "#cc2222",
  "pulseSpeed": 1.2
}
```

## Tips & Best Practices

### Visual Cohesion
Match skin color, node color, and glow color for unified appearance:
```tsx
const themeColor = '#4488ff';
setSkinColor(themeColor);
setNodeColor(themeColor);
setGlowColor(themeColor);
```

### Performance Optimization
- Lower `surfaceDetail` and `surfaceRoughness` for better FPS on mobile
- Reduce `foldDepth` to simplify geometry calculations
- Disable unused layers (skin, nodes, edges, glow)

### Anatomical Realism
For medical/scientific visualization:
```tsx
skinOpacity={0.45}
surfaceDetail={1.2}
foldDepth={1.2}
skinColor="#ffccaa"  // Tissue color
glowIntensity={0.3}  // Subtle
```

### Cyberpunk Aesthetic
For sci-fi/tech visuals:
```tsx
skinOpacity={0.6}
surfaceDetail={1.5}
skinColor="#00ffff"
glowIntensity={1.5}
nodesOpacity={1.0}
pulseSpeed={2.0}
```

## Accessibility

The control panel includes:
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatible
- High contrast UI with backdrop blur

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Requires WebGL 2.0 support.

## Related Components

- [NetworkBrain.tsx](../components/3d/NetworkBrain.tsx) - Main 3D component
- [NetworkBrainDemo.tsx](../components/demos/NetworkBrainDemo.tsx) - Complete demo
- [BrainControls.tsx](../components/ui/BrainControls.tsx) - Controls for BrainModel

## Testing

See [NetworkBrainControls.test.tsx](./__tests__/NetworkBrainControls.test.tsx) for comprehensive test suite.

```bash
npm test NetworkBrainControls
```

100% test coverage for all controls and callbacks.
