# Brain Layer Opacity Controls

## Overview

The brain model now supports **individual opacity control for each mesh layer**. This allows you to show/hide or fade specific anatomical structures independently, enabling x-ray views, layer isolation, and custom visualizations.

## Features

✨ **Per-Layer Opacity Control** - Independent opacity sliders for each mesh in the brain model  
🔍 **Automatic Layer Detection** - Automatically discovers all meshes in the GLTF model  
🎛️ **Global Opacity Override** - Quick fade for entire brain while preserving layer relationships  
🎨 **Smart Layer Naming** - Cleans up technical mesh names to human-readable labels  
📊 **Real-Time Updates** - Immediate visual feedback with smooth transitions  
🔄 **Reset Controls** - Reset individual layers or all layers to 100%  

## Visual Elements in the Brain Model

The brain GLTF model typically contains these anatomical layers:

| Layer | Icon | Description |
|-------|------|-------------|
| **Cerebral Cortex** | 🧠 | Outer grey matter with characteristic folds (gyri/sulci) |
| **White Matter** | ⚪ | Inner brain tissue containing nerve fibers |
| **Cerebellum** | 🎯 | Posterior structure responsible for motor control |
| **Brain Stem** | 🌿 | Connects brain to spinal cord |
| **Corpus Callosum** | 🌉 | Bridge connecting left and right hemispheres |
| **Additional Meshes** | 🔘 | Other anatomical structures in the model |

*Note: Actual layer names depend on the specific brain.glb model being used.*

## Usage

### Basic Setup with Layer Controls

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BrainModel from '@/components/3d/BrainModel';
import BrainLayerControls from '@/components/ui/BrainLayerControls';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function BrainScene() {
  const [layerOpacities, setLayerOpacities] = useState({});
  const [availableLayers, setAvailableLayers] = useState([]);
  
  // Detect layers from brain model
  useEffect(() => {
    const detectLayers = async () => {
      const { scene } = await useGLTF.preload('/models/brain.glb');
      const layers = [];
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshName = child.name || `Unnamed_${child.id}`;
          if (!layers.includes(meshName)) {
            layers.push(meshName);
          }
        }
      });
      
      setAvailableLayers(layers);
      
      // Initialize all to 100% opacity
      const initialOpacities = {};
      layers.forEach(layer => {
        initialOpacities[layer] = 1.0;
      });
      setLayerOpacities(initialOpacities);
    };
    
    detectLayers();
  }, []);
  
  return (
    <>
      <Canvas>
        <BrainModel
          position={[0, 0, 0]}
          scale={1.5}
          layerOpacities={layerOpacities}
        />
      </Canvas>
      
      <BrainLayerControls
        availableLayers={availableLayers}
        onLayerOpacityChange={setLayerOpacities}
      />
    </>
  );
}
```

### Manual Layer Control

```tsx
import BrainModel from '@/components/3d/BrainModel';

// Control specific layers programmatically
<BrainModel
  position={[0, 0, 0]}
  scale={1.5}
  layerOpacities={{
    'Cortex': 0.8,           // 80% visible
    'Cerebellum': 0.5,       // 50% visible
    'BrainStem': 1.0,        // Fully visible
    'WhiteMatter': 0.0,      // Hidden
  }}
/>
```

### Preset Visualization Modes

```tsx
// X-Ray Mode - See internal structures
const xrayMode = {
  'Cortex': 0.3,
  'WhiteMatter': 0.7,
  'Cerebellum': 0.5,
  'BrainStem': 1.0,
};

// Cortex Focus - Emphasize outer layer
const cortexFocus = {
  'Cortex': 1.0,
  'WhiteMatter': 0.2,
  'Cerebellum': 0.3,
  'BrainStem': 0.4,
};

// Anatomy Study - Hide outer to reveal inner
const anatomyMode = {
  'Cortex': 0.0,
  'WhiteMatter': 1.0,
  'Cerebellum': 1.0,
  'BrainStem': 1.0,
};

<BrainModel layerOpacities={xrayMode} />
```

## BrainModel Props

### New Props

```typescript
interface BrainModelProps {
  // ... existing props
  
  layerOpacities?: {
    [meshName: string]: number;  // 0.0 (hidden) to 1.0 (opaque)
  };
}
```

### Example

```tsx
<BrainModel
  position={[0, 0, 0]}
  scale={1.5}
  variant="thinking"
  glowIntensity={0.4}
  layerOpacities={{
    'Mesh_Cortex': 0.8,
    'Mesh_Cerebellum': 0.6,
  }}
/>
```

## BrainLayerControls Props

```typescript
interface BrainLayerControlsProps {
  availableLayers: string[];              // List of mesh names from model
  onLayerOpacityChange: (opacities: { [key: string]: number }) => void;
  onVariantChange?: (variant: 'idle' | 'thinking' | 'scanning' | 'pulsing') => void;
  onGlobalOpacityChange?: (opacity: number) => void;
  initialLayerOpacities?: { [key: string]: number };
  initialGlobalOpacity?: number;
}
```

### Props Description

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `availableLayers` | `string[]` | ✅ Yes | Array of mesh names detected from the model |
| `onLayerOpacityChange` | `function` | ✅ Yes | Callback with updated layer opacities object |
| `onVariantChange` | `function` | ❌ No | Optional animation variant control |
| `onGlobalOpacityChange` | `function` | ❌ No | Optional global opacity control |
| `initialLayerOpacities` | `object` | ❌ No | Initial opacity values for layers |
| `initialGlobalOpacity` | `number` | ❌ No | Initial global opacity (default: 1.0) |

## Implementation Details

### How It Works

1. **Layer Detection**: On mount, the component traverses the GLTF scene graph and identifies all `Mesh` nodes
2. **Name Extraction**: Each mesh's `.name` property becomes the layer identifier
3. **Opacity Application**: When `layerOpacities` changes, materials are updated with `transparent: true` and `opacity: value`
4. **Material Preservation**: Original material properties are preserved, only opacity is modified
5. **Shader Compatibility**: Works with custom shaders and Fresnel glow effects

### Browser Console Logging

The BrainModel component logs detected layers to the console:

```
[BrainModel] Found mesh: Cortex
[BrainModel] Found mesh: Cerebellum
[BrainModel] Found mesh: BrainStem
[BrainModel] Total meshes: 3
[BrainModel] Available mesh names: ['Cortex', 'Cerebellum', 'BrainStem']
```

Use this to discover the exact mesh names in your model.

### Performance Considerations

- **Material Updates**: Opacity changes trigger material updates (minimal performance impact)
- **No Geometry Changes**: Meshes remain in scene even at 0% opacity (use culling if needed)
- **Shader Uniforms**: Custom shader uniforms are preserved during opacity changes
- **Frame Rate**: No impact on animation frame rate (updates occur in React useEffect)

## Demo Page

A complete demo page is available at:

**File**: `components/demos/BrainLayerDemo.tsx`

Features:
- Automatic layer detection
- Live layer status panel
- All controls in one interface
- Real-time visual feedback

To use the demo:

```tsx
import BrainLayerDemo from '@/components/demos/BrainLayerDemo';

// In your page
export default function DemoPage() {
  return <BrainLayerDemo />;
}
```

## Troubleshooting

### Layers Not Appearing in Controls

**Problem**: BrainLayerControls shows "0 layers"

**Solutions**:
1. Check browser console for `[BrainModel] Found mesh:` logs
2. Verify `/models/brain.glb` loads correctly
3. Ensure useGLTF.preload() completes before rendering controls
4. Check that meshes have `.name` properties (some exporters omit names)

### Opacity Not Changing

**Problem**: Slider moves but brain doesn't change

**Solutions**:
1. Verify mesh names in `layerOpacities` match console logs exactly
2. Check that materials support transparency (PBR materials do by default)
3. Ensure `layerOpacities` prop is passed to BrainModel correctly
4. Try setting global opacity to confirm material updates work

### Mesh Names Too Technical

**Problem**: Layer names show as `Mesh_001`, `Object_Cube.003`

**Solutions**:
- BrainLayerControls automatically cleans common prefixes (`Object_`, `Mesh_`, `Node_`)
- Names are capitalized and underscores replaced with spaces
- For custom naming, edit the mesh names in Blender before export:
  1. Select mesh in Blender
  2. Rename in Outliner to "Cortex", "Cerebellum", etc.
  3. Re-export GLTF

## Testing

Comprehensive tests included:

**File**: `__tests__/BrainLayerControls.test.tsx`

Run tests:
```bash
npm test BrainLayerControls
```

Coverage:
- ✅ Layer detection and initialization
- ✅ Opacity slider interactions
- ✅ Global opacity control
- ✅ Animation variant switching
- ✅ Reset functionality (individual and all)
- ✅ UI state management (expand/collapse)
- ✅ Edge cases (no layers, unnamed meshes)

## Examples

### Medical Visualization

```tsx
// Progressive reveal for educational purposes
const [revealProgress, setRevealProgress] = useState(0);

const layers = {
  'Cortex': Math.max(0, 1 - revealProgress * 2),      // Fade out first
  'WhiteMatter': Math.max(0, 1 - (revealProgress - 0.5) * 2), // Then fade
  'Cerebellum': 1.0,                                   // Keep visible
  'BrainStem': 1.0,
};

<BrainModel layerOpacities={layers} />
```

### Scan Effect

```tsx
// Vertical scan revealing layers
useFrame((state) => {
  const scanPos = (Math.sin(state.clock.elapsedTime) + 1) * 0.5;
  
  setLayerOpacities({
    'Cortex': scanPos > 0.2 ? 1.0 : 0.3,
    'WhiteMatter': scanPos > 0.5 ? 1.0 : 0.3,
    'Cerebellum': scanPos > 0.8 ? 1.0 : 0.3,
  });
});
```

### Interactive Exploration

```tsx
// Click to toggle layer visibility
const [selectedLayer, setSelectedLayer] = useState(null);

const layers = availableLayers.reduce((acc, layer) => {
  acc[layer] = selectedLayer === layer ? 1.0 : 0.3;
  return acc;
}, {});

<BrainModel layerOpacities={layers} />
```

## Future Enhancements

Potential additions:
- 🎨 **Color per layer** - Individual color overrides
- ✂️ **Clipping planes** - Cut-away views
- 📍 **Layer groups** - Control multiple meshes as one unit
- 💾 **Preset saving** - Save/load visualization configurations
- 🎬 **Animation timelines** - Keyframe layer opacity changes

## Summary

The layer opacity control system provides:
- ✅ Independent control over each brain mesh
- ✅ Automatic layer detection from GLTF
- ✅ Intuitive UI with real-time preview
- ✅ Programmatic and interactive control
- ✅ Performance-optimized implementation
- ✅ Comprehensive testing coverage

This feature enables sophisticated anatomical visualizations, x-ray effects, progressive reveals, and educational animations.

---

**Need help?** Check browser console for layer detection logs or inspect the demo at `components/demos/BrainLayerDemo.tsx`.
