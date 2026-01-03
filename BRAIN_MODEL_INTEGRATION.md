# Brain Model Integration Guide

## Overview

The human brain 3D model has been successfully integrated into the animated portfolio with advanced features including interactive controls, multiple animation variants, and proper PBR rendering.

## Components

### 1. BrainModel Component
**Location:** `components/3d/BrainModel.tsx`

Specialized React Three Fiber component for rendering the human brain model with enhanced features.

#### Props

```typescript
interface BrainModelProps {
  position?: [number, number, number];  // 3D position [x, y, z]
  scale?: number;                       // Uniform scale multiplier
  rotation?: [number, number, number];  // Initial rotation [x, y, z]
  variant?: 'idle' | 'thinking' | 'scanning' | 'pulsing';
  interactive?: boolean;                // Enable scroll-based rotation
  autoRotate?: boolean;                 // Enable automatic rotation
  glowIntensity?: number;               // Emissive glow (0-1)
}
```

#### Animation Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `idle` | Subtle floating with slow rotation | Background, ambient |
| `thinking` | Pulsing scale with faster rotation | Active processing, AI thinking |
| `scanning` | Oscillating rotation with scan waves | Analysis, data processing |
| `pulsing` | Heartbeat-like rhythmic pulsing | Loading, waiting states |

#### Usage Examples

```tsx
// Basic usage
<BrainModel position={[0, 0, 0]} scale={1.5} />

// Thinking mode with glow
<BrainModel 
  variant="thinking" 
  glowIntensity={0.6}
  autoRotate={true}
/>

// Interactive scanning mode
<BrainModel 
  variant="scanning"
  interactive={true}
  position={[0, 1, 0]}
  scale={2}
/>

// Idle background mode
<BrainModel 
  variant="idle"
  autoRotate={true}
  glowIntensity={0.2}
/>
```

### 2. ModelAttribution Component
**Location:** `components/ui/ModelAttribution.tsx`

Displays required CC-BY-4.0 license attribution for the brain model.

#### Features
- ✅ Collapsible info button (bottom-right corner)
- ✅ Links to original Sketchfab model
- ✅ Links to author profile
- ✅ Links to CC-BY-4.0 license
- ✅ Complies with attribution requirements

#### Usage

```tsx
import ModelAttribution from '@/components/ui/ModelAttribution';

// Add to any page using the brain model
<ModelAttribution />
```

**⚠️ IMPORTANT:** This component MUST be included on any page that displays the brain model to comply with the CC-BY-4.0 license.

## Integration Steps

### 1. Model Setup ✅
```bash
# Model location
/utils/human-brain/models/human-brain.glb  # Source
/public/models/brain.glb                   # Production (copied)
```

### 2. Import in Page ✅
```tsx
import Scene from '@/components/3d/Scene';
import BrainModel from '@/components/3d/BrainModel';
import ModelAttribution from '@/components/ui/ModelAttribution';

export default function Page() {
  return (
    <div className="relative h-screen">
      <Scene>
        <BrainModel variant="thinking" />
      </Scene>
      <ModelAttribution />
    </div>
  );
}
```

### 3. Configuration Options

#### Performance Optimization
```tsx
// For mobile - reduce quality
<BrainModel 
  scale={1} 
  variant="idle"
  glowIntensity={0.1}
/>

// For desktop - full quality
<BrainModel 
  scale={2} 
  variant="scanning"
  glowIntensity={0.5}
  interactive={true}
/>
```

#### Responsive Scaling
The component automatically adjusts for mobile devices. For manual control:

```tsx
const isMobile = useIsMobile(); // Your hook

<BrainModel 
  scale={isMobile ? 1 : 2}
  variant={isMobile ? 'idle' : 'thinking'}
/>
```

## Technical Details

### Material Properties
- **Metalness:** 0.1 (brain tissue is non-metallic)
- **Roughness:** 0.7 (slightly rough surface)
- **Emissive:** Blue glow (#4488ff) for sci-fi effect
- **Shadows:** Enabled (cast + receive)
- **EnvMap Intensity:** 1.2 (enhanced reflections)

### Texture Maps (PBR Workflow)
- **baseColor.jpeg** - Albedo/diffuse color
- **normal.png** - Surface detail and wrinkles
- **metallicRoughness.png** - Combined metallic + roughness

### Performance
- **Model Size:** 3.9 MB (optimized GLB)
- **Polygon Count:** Optimized for real-time rendering
- **Preloading:** Enabled via `useGLTF.preload()`
- **Shadow Maps:** Soft shadows for realistic lighting

### Browser Support
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (desktop + iOS)
- ✅ WebGL 2.0 required

## Animation Customization

### Creating Custom Variants

Edit `BrainModel.tsx` and add to the switch statement:

```tsx
case 'myVariant':
  // Your custom animation
  groupRef.current.rotation.y += delta * 0.3;
  groupRef.current.scale.setScalar(scale * (1 + Math.sin(time) * 0.1));
  break;
```

### Accessing Model Parts

To animate specific brain regions:

```tsx
useEffect(() => {
  scene.traverse((child) => {
    if (child.name === 'Cerebrum') {
      // Animate cerebrum specifically
    }
  });
}, [scene]);
```

## License & Attribution

**Model:** Human Brain  
**Author:** Yash_Dandavate  
**Source:** [Sketchfab](https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784)  
**License:** [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)

### License Requirements
- ✅ **Attribution required** - Use `<ModelAttribution />` component
- ✅ **Commercial use allowed**
- ✅ **Modifications allowed**
- ✅ **Share-alike NOT required**

## Troubleshooting

### Model doesn't load
```bash
# Verify model exists
ls -lh public/models/brain.glb

# Check console for errors
# Ensure path is correct: /models/brain.glb (not /public/models/...)
```

### Performance issues
```tsx
// Reduce quality
<BrainModel 
  variant="idle"
  glowIntensity={0}
  interactive={false}
/>

// Or use LOD (Level of Detail) - future enhancement
```

### Attribution not showing
```tsx
// Ensure ModelAttribution is at root level
<main>
  <Scene><BrainModel /></Scene>
  <ModelAttribution /> {/* Must be outside Scene */}
</main>
```

## Future Enhancements

- [ ] Add Level of Detail (LOD) for mobile optimization
- [ ] Implement click-to-highlight brain regions
- [ ] Add anatomical labels overlay
- [ ] Create multi-brain compositions
- [ ] Add WebXR support for VR/AR
- [ ] Implement shader-based effects (dissolve, wireframe)
- [ ] Add sound effects synced to animations

## Testing

See `__tests__/BrainModel.test.tsx` for comprehensive unit tests.

```bash
npm test BrainModel
```

---

**Last Updated:** 2026-01-03  
**Version:** 1.0.0
