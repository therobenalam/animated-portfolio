# 3D Model Loading Guide

## Quick Start

### Option 1: Using ModelLoader Component (Simple)

```tsx
import ModelLoader from '@/components/3d/ModelLoader';

<Scene>
  <ModelLoader 
    modelPath="/models/your-model.glb" 
    position={[0, 0, 0]}
    scale={1}
  />
</Scene>
```

### Option 2: Using gltfjsx (Advanced)

Generate a custom React component from your .glb file:

```bash
npx gltfjsx public/models/robot.glb -o components/3d/Robot.tsx
```

Then use it:

```tsx
import Robot from '@/components/3d/Robot';

<Scene>
  <Robot position={[0, 0, 0]} scale={1} />
</Scene>
```

## Model Requirements

1. **Format:** glTF Binary (.glb)
2. **Compression:** Draco enabled
3. **Size:** <500KB per model
4. **Polygons:** 10K-50K triangles
5. **Textures:** Max 2048x2048

## Example Models

Free 3D models for testing:

- [Sketchfab](https://sketchfab.com/features/gltf) - Download glTF models
- [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Poly Haven](https://polyhaven.com/models) - CC0 assets

## Loading with Preload

Preload models before they're needed:

```tsx
import { preloadModel } from '@/components/3d/ModelLoader';

// Preload in useEffect or on page load
useEffect(() => {
  preloadModel('/models/robot.glb');
}, []);
```

## Example: Replacing Placeholder Cube

### 1. Download a test model
- Go to https://sketchfab.com/features/gltf
- Download a simple .glb model
- Place it in `public/models/test-model.glb`

### 2. Update Hero component

```tsx
// components/sections/Hero.tsx
import ModelLoader from '../3d/ModelLoader';

// Replace:
<Model position={[0, 0, 0]} scale={1.5} />

// With:
<ModelLoader 
  modelPath="/models/test-model.glb" 
  position={[0, 0, 0]}
  scale={1.5}
/>
```

### 3. Restart dev server
```bash
npm run dev
```

## Troubleshooting

**Model not showing?**
- Check browser console for errors
- Verify file path: `/models/filename.glb`
- Ensure model was exported with Draco compression
- Check model scale (try scale={10} if too small)

**Performance issues?**
- Reduce polygon count in Blender
- Compress textures
- Use smaller texture resolutions

**Model appears black?**
- Check if model has materials
- Ensure lights are enabled in scene
- Try adding `<ambientLight intensity={1} />` for testing

## Best Practices

1. ✅ Always use Draco compression
2. ✅ Keep models under 500KB
3. ✅ Preload critical models
4. ✅ Use LOD for complex scenes
5. ✅ Test on mobile devices
6. ❌ Don't load multiple large models at once
7. ❌ Don't use uncompressed models
8. ❌ Don't exceed 100K polygons total
