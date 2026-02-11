# Halo Opacity Controls - Visual Guide

## Overview
Control the visibility and opacity of the large blue particle halo/shell that surrounds the brain model.

## What is the Halo?
The **halo** is the outer spherical shell composed of:
- **Blue particle nodes** (spheres) arranged in a brain-shaped ellipsoid
- **Connection edges** (lines) linking nearby nodes
- Creates the distinctive glowing wireframe effect visible in the 3D scene

## Location in UI
The halo opacity control is located in the **Layer Visibility** panel on the left side:

```
┌─────────────────────────────────────┐
│  Layer Visibility                   │
│                                     │
│  Element Opacity                    │
│  🔵 Halo (Outer Shell): 100%        │
│  [━━━━━━━━━━━━━━━━━━━━━━━━]       │
│                                     │
│  Nodes: 0.90                        │
│  [━━━━━━━━━━━━━━━━━━━━━━━━]       │
│                                     │
│  Edges: 0.40                        │
│  [━━━━━━━━━━━━━━━━━━━━━━━━]       │
└─────────────────────────────────────┘
```

## Usage

### Hide the Halo Completely
Set opacity to **0%** to make the halo invisible:
```typescript
<NetworkBrain 
  haloOpacity={0}
  // ... other props
/>
```

**Visual Result:** No outer particle shell visible, only inner brain layers remain

### Semi-Transparent Halo
Set opacity to **50%** for a subtle, ghosted effect:
```typescript
<NetworkBrain 
  haloOpacity={0.5}
  // ... other props
/>
```

**Visual Result:** Halo is translucent, creating a layered depth effect

### Fully Visible Halo
Set opacity to **100%** for maximum visibility:
```typescript
<NetworkBrain 
  haloOpacity={1.0}
  // ... other props
/>
```

**Visual Result:** Bright, prominent blue particle shell (default state)

## How It Works

### Technical Implementation
The `haloOpacity` prop multiplies with existing opacity values:

```typescript
// Node opacity calculation
nodeOpacity = nodesOpacity × opacity × haloOpacity

// Edge opacity calculation
edgeOpacity = edgesOpacity × opacity × haloOpacity
```

### Independence from Other Controls
`haloOpacity` works independently of:
- ✅ **Nodes toggle** (showNodes) - can hide nodes separately
- ✅ **Edges toggle** (showEdges) - can hide edges separately  
- ✅ **Individual element opacity** (nodesOpacity, edgesOpacity) - fine-tune individual elements
- ✅ **Overall model opacity** (opacity) - control entire NetworkBrain

### Layered Control System
```
Final Visibility = Individual Element × Model Opacity × Halo Opacity
                   └─────────────┬─────────────┘
                          Combined Control
```

## Use Cases

### Focus on Inner Brain
Hide or reduce halo to emphasize the inner brain layers:
```typescript
haloOpacity={0}      // Remove halo entirely
haloOpacity={0.2}    // Subtle background presence
```

### Dramatic Effect
Use high halo opacity with low inner brain opacity:
```typescript
haloOpacity={1.0}
skinOpacity={0.1}
originalOpacity={0.2}
```

### Balanced Visualization
Medium values for all layers:
```typescript
haloOpacity={0.6}
networkOpacity={0.5}
originalOpacity={0.5}
```

## Additional Environment Control

### Environment Background (Optional)
Toggle a spherical environment map for atmospheric lighting:

**Enable in UI:**
```
Environment
☑ Show Environment Background
Background Intensity: 30%
[━━━━━━━━━━━━━━━━━━━━━━━━]
```

**Programmatic Control:**
```typescript
<Background 
  preset="city"
  blur={0.7}
  showBackground={true}
  backgroundIntensity={0.3}
/>
```

**Presets Available:**
- `city` - Urban environment (default)
- `sunset` - Warm golden tones
- `night` - Dark, starry sky
- `studio` - Neutral lighting
- `apartment`, `warehouse`, `forest`, etc.

## Performance Notes

### Optimization Tips
1. **Hide completely** rather than use very low opacity (0.01):
   - Hiding (`haloOpacity={0}`) allows GPU to skip rendering
   - Very low values still render but barely visible

2. **Reduce node count** if performance is slow:
   ```typescript
   nodeCount={400}  // Instead of 800
   ```

3. **Disable animation** when interacting:
   ```typescript
   animated={false}
   ```

## Testing
Comprehensive test suite available at:
```
__tests__/HaloOpacityControls.test.tsx
```

Tests cover:
- ✅ Boundary values (0, 1)
- ✅ Interaction with other opacity controls
- ✅ Animation compatibility
- ✅ High node count performance
- ✅ Custom colors
- ✅ Environment background controls

## Keyboard Shortcuts (Future Enhancement)
Suggested shortcuts for quick halo control:
- `H` - Toggle halo visibility
- `Shift + H` - Reduce halo opacity by 10%
- `Ctrl + H` - Increase halo opacity by 10%

---

**Quick Reference Card:**

| Control | Range | Default | Effect |
|---------|-------|---------|--------|
| `haloOpacity` | 0-1 | 1.0 | Overall halo visibility |
| `nodesOpacity` | 0-1 | 0.9 | Individual node brightness |
| `edgesOpacity` | 0-1 | 0.4 | Connection line visibility |
| `showEnvironment` | bool | false | Environment background on/off |
| `environmentIntensity` | 0-1 | 0.3 | Background brightness |

**Created:** January 3, 2026  
**Version:** 1.0  
**Author:** 3D Creator Agent
