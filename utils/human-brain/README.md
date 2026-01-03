# Human Brain 3D Model

High-quality anatomically accurate human brain model for 3D visualization.

## 📁 Folder Structure

```
human-brain/
├── models/              # 3D model files in various formats
│   ├── human-brain.glb  # GLB format (standalone, recommended for web)
│   ├── human-brain.usdz # USDZ format (Apple AR Quick Look)
│   ├── scene.gltf       # GLTF format (text-based, with separate binary)
│   └── scene.bin        # GLTF binary data
├── textures/            # PBR texture maps
│   ├── baseColor.jpeg   # Albedo/diffuse color map
│   ├── metallicRoughness.png # Combined metallic (B) + roughness (G) map
│   └── normal.png       # Normal map for surface detail
├── source/              # Original source files
│   └── human-brain-cerebrum-brainstem.zip
├── LICENSE.txt          # CC-BY-4.0 attribution requirements
└── README.md            # This file
```

## 🎨 Model Specifications

- **Format**: GLB (binary glTF 2.0), GLTF, USDZ
- **Polygon Count**: Optimized for real-time rendering
- **Textures**: PBR workflow (BaseColor, Normal, Metallic/Roughness)
- **Texture Resolution**: High quality (check individual files)
- **UV Mapping**: Single UV set, non-overlapping

## 📦 Recommended Usage

### For Next.js/React Three Fiber (Web):
```typescript
import { useGLTF } from '@react-three/drei'

function BrainModel() {
  const { scene } = useGLTF('/models/human-brain.glb')
  return <primitive object={scene} />
}
```

### For iOS AR Quick Look:
```html
<a rel="ar" href="/models/human-brain.usdz">
  <img src="preview.jpg" />
</a>
```

### Loading in Three.js:
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
loader.load('/models/human-brain.glb', (gltf) => {
  scene.add(gltf.scene)
})
```

## 📄 License & Attribution

**License**: [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)

**Requirements**: 
- ✅ Author must be credited
- ✅ Commercial use is allowed
- ✅ Modifications are allowed
- ✅ Must link back to original source

**Credit Text** (required for all uses):
```
This work is based on "human-brain" (https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784) 
by Yash_Dandavate (https://sketchfab.com/Yash_Dandavate) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
```

## 🔧 Technical Details

### Model Formats Comparison:

| Format | Size | Use Case | Browser Support |
|--------|------|----------|-----------------|
| `.glb` | Smallest | Web (recommended) | All modern browsers |
| `.gltf` + `.bin` | Larger | Development/editing | All modern browsers |
| `.usdz` | Medium | iOS AR Quick Look | Safari/iOS only |

### Texture Maps:

- **baseColor.jpeg**: RGB albedo/diffuse color (no lighting info)
- **normal.png**: RGB tangent-space normal map (adds surface detail)
- **metallicRoughness.png**: 
  - R channel: Unused
  - G channel: Roughness (0 = smooth, 1 = rough)
  - B channel: Metallic (0 = dielectric, 1 = metal)

## 🚀 Performance Tips

1. **Use GLB format** - It's compressed and loads faster
2. **Texture optimization**: Consider resizing textures for web (e.g., 2048×2048 → 1024×1024)
3. **Enable compression**: Use Draco compression for even smaller file sizes
4. **Lazy loading**: Load model only when needed
5. **LOD (Level of Detail)**: Consider creating simplified versions for mobile

## 🔗 Original Source

- **Model Name**: human-brain
- **Author**: Yash_Dandavate
- **Source**: [Sketchfab](https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784)
- **License**: CC-BY-4.0

## 📝 Version History

- **v1.0** (2026-01-03): Initial organization and documentation
