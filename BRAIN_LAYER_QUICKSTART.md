# Brain Layer Opacity - Quick Start

## What You're Seeing

When you open the brain model in your browser, you're seeing these **visual layers**:

1. **Brain Mesh/Geometry** - The main 3D model structure
2. **Material Surface** - The rendered appearance (color, reflectivity)
3. **Fresnel Glow** - Blue rim lighting around edges
4. **Emissive Effects** - Pulsing/scanning animation overlays

## Identifying Your Specific Layers

To see what meshes are in YOUR brain.glb model:

### Step 1: Check Browser Console

Open your page with the brain model and check the browser console (F12). You'll see:

```
[BrainModel] Found mesh: Object_Cortex
[BrainModel] Found mesh: Object_Cerebellum  
[BrainModel] Found mesh: Object_BrainStem
[BrainModel] Total meshes: 3
[BrainModel] Available mesh names: ['Object_Cortex', 'Object_Cerebellum', 'Object_BrainStem']
```

These are YOUR actual layer names!

### Step 2: Use Those Names

```tsx
<BrainModel
  layerOpacities={{
    'Object_Cortex': 0.8,      // Use exact names from console
    'Object_Cerebellum': 0.5,
    'Object_BrainStem': 1.0,
  }}
/>
```

## Quick Demo

Add this to any page:

```tsx
'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BrainModel from '@/components/3d/BrainModel';
import Lights from '@/components/3d/Lights';
import Camera from '@/components/3d/Camera';

export default function TestPage() {
  const [cortexOpacity, setCortexOpacity] = useState(1.0);

  return (
    <div className="h-screen">
      <Canvas>
        <Camera />
        <Lights />
        <BrainModel
          position={[0, 0, 0]}
          scale={1.5}
          layerOpacities={{
            // Replace with your actual mesh names!
            'Object_Cortex': cortexOpacity,
          }}
        />
      </Canvas>
      
      {/* Simple opacity slider */}
      <div className="fixed bottom-4 left-4 bg-black/80 p-4 text-white rounded">
        <label>Cortex Opacity: {(cortexOpacity * 100).toFixed(0)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={cortexOpacity}
          onChange={(e) => setCortexOpacity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
```

## Using the Full Controls

```tsx
import BrainLayerDemo from '@/components/demos/BrainLayerDemo';

export default function Page() {
  return <BrainLayerDemo />;
}
```

This gives you:
- ✅ Automatic layer detection
- ✅ Individual opacity sliders for each layer
- ✅ Global opacity control
- ✅ Animation variant selection
- ✅ Real-time visual feedback

## Common Mesh Names

Depending on your brain.glb source:

| Source | Typical Names |
|--------|---------------|
| Sketchfab | `Object_1`, `Object_2`, etc. |
| Blender Export | `Cortex`, `Cerebellum`, custom names |
| Medical Models | `Grey_Matter`, `White_Matter`, `Brain_Stem` |
| Generic | `Mesh`, `Mesh.001`, `Mesh.002` |

**Always check console logs for exact names!**

## Next Steps

1. ✅ Check console for your mesh names
2. ✅ Try the demo page (components/demos/BrainLayerDemo.tsx)
3. ✅ Use BrainLayerControls component for full UI
4. ✅ Read BRAIN_LAYER_OPACITY.md for advanced features

## Troubleshooting

**Q: No console logs appear?**
- Ensure BrainModel is rendering (check Canvas)
- Verify `/models/brain.glb` loads (Network tab in devtools)

**Q: Opacity doesn't change?**
- Use exact mesh names from console (case-sensitive!)
- Check that layerOpacities prop is passed correctly

**Q: All meshes called "Unnamed_123"?**
- Your GLTF has no mesh names
- Edit in Blender and rename objects before export
- Or use the IDs directly: `'Unnamed_123': 0.5`

---

**Ready to explore!** Open the demo and start adjusting layer opacities. 🧠✨
