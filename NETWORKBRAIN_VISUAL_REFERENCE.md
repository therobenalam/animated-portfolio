# NetworkBrain Visual Layer Reference

Quick visual reference for all NetworkBrain layers and controls.

## Layer Breakdown

```
NetworkBrain (4 Visual Layers)
├── 🧠 Skin (Semi-transparent Brain Surface)
│   ├── Color: Full spectrum control
│   ├── Opacity: 0 → 1 (transparent → opaque)
│   ├── Surface Detail: 0 → 2 (smooth → highly textured)
│   ├── Fold Depth: 0 → 2 (flat → deep wrinkles)
│   └── Roughness: 0 → 2 (smooth → detailed)
│
├── 🔵 Nodes (Glowing Dots)
│   ├── Color: Full spectrum control
│   ├── Opacity: 0 → 1
│   ├── Size: Fixed (0.02 units)
│   └── Animation: Pulse scaling
│
├── 📊 Edges (Connection Lines)
│   ├── Color: Full spectrum control
│   ├── Opacity: 0 → 1
│   ├── Density: Fixed (15% connections)
│   └── Animation: Opacity pulsing
│
└── ✨ Glow (Center Point Light)
    ├── Color: Full spectrum control
    ├── Intensity: 0 → 2 (off → bright)
    ├── Distance: 3 units
    └── Effect: Creates halo around brain
```

## Control Panel Layout

```
┌─────────────────────────────────────┐
│  🎨 NetworkBrain Controls      [✕]  │
├─────────────────────────────────────┤
│  Quick Presets                      │
│  [default] [ghost] [neon] [medical] │
├─────────────────────────────────────┤
│  Tabs                               │
│  [🧠 Skin] [✨ Glow] [🔵 Network] [⚡ Animation]
├─────────────────────────────────────┤
│                                     │
│  [Active Tab Content]               │
│  - Toggles                          │
│  - Color pickers                    │
│  - Sliders with values              │
│  - Helper text                      │
│                                     │
├─────────────────────────────────────┤
│  [Reset to Defaults]                │
└─────────────────────────────────────┘
```

## Skin Tab Controls

```
🧠 SKIN
─────────────────────────────

Show Skin                    [ON]

Skin Color                   [🎨]
                            #4488ff

Opacity                     0.35
├─────●─────────────────────┤
0                           1

Surface Detail              1.00
├────────────●──────────────┤
0                           2
↓ Texture frequency

Fold Depth                  1.00
├────────────●──────────────┤
0                           2
↓ Gyri/sulci depth

Surface Roughness           1.00
├────────────●──────────────┤
0                           2
↓ Micro-detail intensity
```

## Glow Tab Controls

```
✨ GLOW
─────────────────────────────

Show Glow                    [ON]

Glow Color                   [🎨]
                            #4488ff

Glow Intensity              0.50
├────────●──────────────────┤
0                           2
↓ Center point light brightness

💡 Tip: The glow creates ambient
lighting around the brain. Higher
intensity creates a stronger halo
effect.
```

## Network Tab Controls

```
🔵 NETWORK
─────────────────────────────

┌─────────────────────────────┐
│ Nodes (Dots)          [ON]  │
│                             │
│ Node Color            [🎨]  │
│                      #4488ff│
│                             │
│ Nodes Opacity         0.90  │
│ ├──────────●────────────┤   │
│ 0                       1   │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Edges (Lines)         [ON]  │
│                             │
│ Edge Color            [🎨]  │
│                      #2244aa│
│                             │
│ Edges Opacity         0.40  │
│ ├────●──────────────────┤   │
│ 0                       1   │
└─────────────────────────────┘
```

## Animation Tab Controls

```
⚡ ANIMATION
─────────────────────────────

Enable Animation             [ON]

Pulse Speed                 1.00x
├────────────●──────────────┤
0                           5
↓ Controls node scaling and edge pulsing

⚡ Animation: Pulse speed affects both
node scale animation and edge opacity
pulsing. Higher values create faster,
more energetic motion.
```

## Preset Comparison

```
                DEFAULT    GHOST     NEON      MEDICAL
              ─────────────────────────────────────────
Skin Opacity    0.35      0.15      0.60       0.45
Surface Detail  1.00      0.50      1.50       1.20
Fold Depth      1.00      0.30      1.50       1.20
Roughness       1.00      0.20      0.80       1.00
Skin Color      Blue      White     Magenta    Red
Glow Intensity  0.50      0.30      1.50       0.60
Nodes Opacity   0.90      0.40      1.00       0.80
Edges Opacity   0.40      0.20      0.70       0.50
Pulse Speed     1.00      0.50      2.00       1.20

Visual Style    Balanced  Ethereal  Cyberpunk  Medical
Use Case        General   Subtle    High-tech  Science
Performance     Good      Best      Medium     Good
```

## Parameter Effects Visualization

### Skin Opacity
```
0.0 ──────────────────── 1.0
👻 Invisible    →    🧠 Solid

Visual Impact:
• Low (0-0.3): Ghost-like, see-through
• Medium (0.3-0.6): Translucent overlay
• High (0.6-1.0): Opaque surface
```

### Surface Detail
```
0.0 ──────────────────── 2.0
⚪ Smooth       →    🌊 Textured

Visual Impact:
• Low (0-0.5): Minimal texture
• Medium (0.5-1.5): Realistic cortex
• High (1.5-2.0): Hyper-detailed
```

### Fold Depth
```
0.0 ──────────────────── 2.0
🥚 Smooth       →    🧠 Wrinkled

Visual Impact:
• Low (0-0.5): Simplified shape
• Medium (0.5-1.5): Anatomical
• High (1.5-2.0): Exaggerated folds
```

### Glow Intensity
```
0.0 ──────────────────── 2.0
🌑 Dark         →    💫 Bright

Visual Impact:
• Off (0): No center light
• Low (0.1-0.5): Subtle ambient
• Medium (0.5-1.0): Visible glow
• High (1.0-2.0): Strong halo
```

### Pulse Speed
```
0.0 ──────────────────── 5.0
🐌 Slow         →    ⚡ Fast

Animation Impact:
• Slow (0-1): Gentle breathing
• Normal (1-2): Active thinking
• Fast (2-5): Intense processing
```

## Common Use Cases

### 🎮 Gaming/Tech Portfolio
```typescript
skinOpacity={0.6}
surfaceDetail={1.5}
foldDepth={1.5}
skinColor="#00ffff"
glowIntensity={1.5}
pulseSpeed={2.0}
```
→ Bright, cyberpunk aesthetic

### 🏥 Medical/Scientific
```typescript
skinOpacity={0.45}
surfaceDetail={1.2}
foldDepth={1.2}
skinColor="#ffccaa"}
glowIntensity={0.3}
pulseSpeed={1.0}
```
→ Anatomically accurate, subtle

### 🌌 Ambient/Background
```typescript
skinOpacity={0.15}
surfaceDetail={0.5}
foldDepth={0.3}
skinColor="#ffffff"
glowIntensity={0.2}
pulseSpeed={0.5}
```
→ Subtle, non-distracting

### 🎨 Creative/Artistic
```typescript
skinOpacity={0.5}
surfaceDetail={1.8}
foldDepth={1.6}
skinColor="#ff00ff"
glowIntensity={1.2}
pulseSpeed={1.5}
```
→ Vibrant, expressive

## Performance Guide

### High Performance (Mobile)
```
✅ surfaceDetail: 0.5-1.0
✅ foldDepth: 0.5-1.0
✅ surfaceRoughness: 0.5-1.0
✅ nodesOpacity: 0.6-0.8
✅ edgesOpacity: 0.2-0.4
```

### Balanced (Desktop)
```
✅ surfaceDetail: 1.0-1.5
✅ foldDepth: 1.0-1.5
✅ surfaceRoughness: 1.0-1.5
✅ nodesOpacity: 0.8-1.0
✅ edgesOpacity: 0.4-0.6
```

### Maximum Quality (High-end)
```
✅ surfaceDetail: 1.5-2.0
✅ foldDepth: 1.5-2.0
✅ surfaceRoughness: 1.5-2.0
✅ nodesOpacity: 1.0
✅ edgesOpacity: 0.6-0.8
```

## Layer Toggle Scenarios

```
All Layers ON
🧠 Skin    ✅
🔵 Nodes   ✅
📊 Edges   ✅
✨ Glow    ✅
→ Full, rich appearance

Wireframe Only
🧠 Skin    ❌
🔵 Nodes   ✅
📊 Edges   ✅
✨ Glow    ✅
→ Technical, X-ray look

Ghost Mode
🧠 Skin    ✅ (low opacity)
🔵 Nodes   ❌
📊 Edges   ❌
✨ Glow    ✅ (low intensity)
→ Ethereal, minimal

Network Focus
🧠 Skin    ❌
🔵 Nodes   ✅
📊 Edges   ✅
✨ Glow    ❌
→ Pure data visualization
```

## Quick Reference Card

```
┌──────────────────────────────────────┐
│  NETWORKBRAIN QUICK REFERENCE        │
├──────────────────────────────────────┤
│  SKIN                                │
│  • Opacity: transparency (0-1)       │
│  • Detail: texture frequency (0-2)   │
│  • Depth: wrinkle depth (0-2)        │
│  • Roughness: micro-detail (0-2)     │
├──────────────────────────────────────┤
│  GLOW                                │
│  • Intensity: brightness (0-2)       │
│  • Color: any hex value              │
├──────────────────────────────────────┤
│  NETWORK                             │
│  • Nodes: opacity (0-1)              │
│  • Edges: opacity (0-1)              │
├──────────────────────────────────────┤
│  ANIMATION                           │
│  • Pulse Speed: multiplier (0-5x)    │
├──────────────────────────────────────┤
│  PRESETS                             │
│  default | ghost | neon | medical    │
└──────────────────────────────────────┘
```

---

**Pro Tip:** Start with a preset, then fine-tune individual parameters for your exact visual goal.
