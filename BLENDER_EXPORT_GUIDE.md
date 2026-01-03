# Blender Export Pipeline for 3D Portfolio

This document explains how to export 3D models from Blender for optimal web performance.

## Prerequisites
- Blender 4.0+ installed
- Basic knowledge of Blender interface

## Export Settings

### Step 1: Prepare Your Model in Blender
1. Open your model in Blender
2. Select all objects you want to export (A key)
3. Go to File → Export → glTF 2.0 (.glb/.gltf)

### Step 2: Configure Export Settings

**Essential Settings:**
```
Format: glTF Binary (.glb)
Include: Selected Objects ✓
Transform: +Y Up
```

**Geometry Settings:**
```
✓ Apply Modifiers
✓ UVs
✓ Normals
✓ Tangents
□ Vertex Colors (only if needed)
```

**Compression (CRITICAL for web performance):**
```
Compression: Draco [required]
Compression level: 6
Position quantization: 14 bits
Normal quantization: 10 bits
Texture coord quantization: 12 bits
```

**Materials:**
```
Materials: Export
Images: Automatic
```

### Step 3: Export Location
- Save to: `public/models/your-model-name.glb`
- Keep filename lowercase with hyphens (e.g., `robot-character.glb`)

## Converting GLB to React Component

After exporting, run this command in your terminal:

```bash
npx gltfjsx public/models/your-model-name.glb -o components/3d/YourModelName.tsx
```

This generates a ready-to-use React component!

## Size Optimization Guidelines

**Target File Sizes:**
- Simple models: <100KB
- Medium complexity: 100-300KB
- Complex models: 300-500KB
- **Total 3D assets: <1MB**

**Optimization Tips:**
1. **Reduce polygon count:**
   - Use Decimate modifier in Blender
   - Target: 10K-50K triangles for web

2. **Optimize textures:**
   - Max resolution: 2048x2048 (2K)
   - Use compressed formats: JPEG for color, PNG for transparency
   - Consider texture atlasing

3. **Remove unnecessary data:**
   - Delete hidden objects
   - Remove unused materials
   - Clean up vertex groups

## Example Workflow

```bash
# 1. Export from Blender to public/models/robot.glb (with Draco compression)

# 2. Generate React component
npx gltfjsx public/models/robot.glb -o components/3d/Robot.tsx

# 3. Use in your scene
import Robot from '@/components/3d/Robot';

<Scene>
  <Robot position={[0, 0, 0]} scale={1} />
</Scene>
```

## Performance Benchmarks

With proper optimization:
- Initial load: <1.5s
- 3D asset download: <2s
- Target FPS: 60fps desktop, 30fps mobile

## Troubleshooting

**Model too large?**
- Increase Draco compression level (up to 10)
- Reduce texture resolution
- Use Decimate modifier

**Model not showing?**
- Check console for errors
- Verify file path is correct
- Ensure model has materials applied

**Performance issues?**
- Reduce polygon count below 20K
- Use LOD (Level of Detail) system
- Disable shadows on mobile

## Additional Resources

- [Blender glTF Export Documentation](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [glTF Specification](https://www.khronos.org/gltf/)
- [Three.js glTF Loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
