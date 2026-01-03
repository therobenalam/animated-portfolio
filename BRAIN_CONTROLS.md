# 🎛️ Brain Controls Component

Interactive control panel for the 3D brain model with real-time adjustments.

## Features

### 🎨 Animation Variants (4 Options)
- **💤 Idle** - Subtle floating animation
- **🧠 Thinking** - Pulsing with electric glow
- **🔍 Scanning** - Oscillating rotation with scan waves
- **💓 Pulsing** - Heartbeat-like rhythm

### 🔘 Toggle Switches
- **Interactive Scroll** - Enable/disable mouse wheel rotation
- **Auto Rotate** - Enable/disable automatic rotation

### 🎚️ Sliders
- **Glow Intensity** - Adjust emissive glow (0.0 - 1.0)
- **Scale** - Adjust model size (0.5x - 3.0x)

### ⚙️ Additional
- **Reset to Defaults** - One-click reset to initial settings

## Usage

```tsx
import BrainControls from '@/components/ui/BrainControls';

<BrainControls
  onVariantChange={(variant) => console.log(variant)}
  onInteractiveChange={(enabled) => console.log(enabled)}
  onAutoRotateChange={(enabled) => console.log(enabled)}
  onGlowIntensityChange={(intensity) => console.log(intensity)}
  onScaleChange={(scale) => console.log(scale)}
  initialVariant="thinking"
  initialInteractive={true}
  initialAutoRotate={true}
  initialGlowIntensity={0.4}
  initialScale={1.5}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onVariantChange` | `(variant) => void` | ✅ | - | Callback when variant changes |
| `onInteractiveChange` | `(boolean) => void` | ✅ | - | Callback when interactive toggles |
| `onAutoRotateChange` | `(boolean) => void` | ✅ | - | Callback when auto-rotate toggles |
| `onGlowIntensityChange` | `(number) => void` | ✅ | - | Callback when glow changes |
| `onScaleChange` | `(number) => void` | ✅ | - | Callback when scale changes |
| `initialVariant` | `string` | ❌ | `'thinking'` | Initial animation variant |
| `initialInteractive` | `boolean` | ❌ | `true` | Initial interactive state |
| `initialAutoRotate` | `boolean` | ❌ | `true` | Initial auto-rotate state |
| `initialGlowIntensity` | `number` | ❌ | `0.4` | Initial glow intensity |
| `initialScale` | `number` | ❌ | `1.5` | Initial scale value |

## Integration Example

```tsx
'use client';

import { useState } from 'react';
import BrainModel from '@/components/3d/BrainModel';
import BrainControls from '@/components/ui/BrainControls';

export default function Page() {
  const [variant, setVariant] = useState('thinking');
  const [interactive, setInteractive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [scale, setScale] = useState(1.5);

  return (
    <>
      <BrainModel
        variant={variant}
        interactive={interactive}
        autoRotate={autoRotate}
        glowIntensity={glowIntensity}
        scale={scale}
      />
      <BrainControls
        onVariantChange={setVariant}
        onInteractiveChange={setInteractive}
        onAutoRotateChange={setAutoRotate}
        onGlowIntensityChange={setGlowIntensity}
        onScaleChange={setScale}
      />
    </>
  );
}
```

## UI Location

- **Position:** Top-left corner (fixed)
- **Collapsed State:** Small button with "🎛️ Controls"
- **Expanded State:** Full control panel with all options
- **Z-Index:** 50 (above 3D scene)

## Accessibility

✅ ARIA labels for all interactive elements
✅ Keyboard navigation support
✅ Focus states for all controls
✅ Screen reader friendly

## Styling

- **Theme:** Dark mode with backdrop blur
- **Accent:** Blue (#3b82f6)
- **Background:** Black with 90% opacity
- **Border:** White with 10% opacity
- **Shadow:** 2xl shadow for depth

## Testing

See `__tests__/BrainControls.test.tsx` for comprehensive test coverage:
- ✅ Rendering states
- ✅ Variant selection
- ✅ Toggle switches
- ✅ Slider interactions
- ✅ Reset functionality
- ✅ Accessibility compliance

## Browser Support

Works in all modern browsers with CSS Grid and CSS custom properties support:
- ✅ Chrome/Edge 88+
- ✅ Firefox 91+
- ✅ Safari 14+

---

**Last Updated:** 2026-01-03  
**Component:** BrainControls.tsx  
**Tests:** 22 passing
