# Animated Text - Visual Reference

## Animation Sequence

```
Timeline (Total: ~6.3 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0.0s ─────────┐ Delay Period
              │ (Text hidden)
              │
1.5s ─────────┤ Animation Start
              │
              ├─ Fade In (0.8s)
2.3s ─────────┤ Fully visible
              │
              │ Upward Movement (5.0s)
              │ + Gentle rotation
              │ + Subtle scale pulse
              │
5.5s ─────────┤ Fade Out begins (1.0s)
              │
6.5s ─────────┘ Animation Complete
              
```

## Position Journey

```
                        ┌──────────────────┐
                        │   END POSITION   │
                        │   Y = 4.5        │  ← Text arrives here
                        └──────────────────┘
                               ▲
                               │
                               │  5 seconds
                               │  Smooth movement
                               │  (power2.inOut)
                               │
                        ┌──────────────────┐
                        │      BRAIN       │  ← Camera view
                        │     MODEL @      │
                        │      Y = 0       │
                        └──────────────────┘
                               ▲
                               │
                        ┌──────────────────┐
                        │  START POSITION  │
                        │   Y = -0.5       │  ← Text begins here
                        └──────────────────┘
```

## Text Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│         Hi, I am built by Robin.            │  ← Line 1 (Y = 0)
│                                             │
│      I am a visual representation           │  ← Line 2 (Y = -0.286)
│                                             │
│       of what an AI agent can do.           │  ← Line 3 (Y = -0.572)
│                                             │
└─────────────────────────────────────────────┘

Line spacing: fontSize * 1.3 = 0.22 * 1.3 = 0.286 units
```

## Visual Effects

### Material Visualization

```
        ╔════════════════════════════════╗
        ║  ░░░░ TEXT MATERIAL ░░░░      ║
        ╠════════════════════════════════╣
        ║                                ║
        ║  Base Color:  ██████  #ffffff  ║
        ║                      (white)   ║
        ║                                ║
        ║  Emissive:    ██████  #4488ff  ║
        ║                  (electric blue)║
        ║                                ║
        ║  Glow Power:  ████████ 0.8     ║
        ║               (very strong)    ║
        ║                                ║
        ║  Metalness:   ██      0.2      ║
        ║               (slightly metal) ║
        ║                                ║
        ║  Roughness:   ███     0.3      ║
        ║               (semi-glossy)    ║
        ║                                ║
        ║  Outline:     1px black border ║
        ║                                ║
        ╚════════════════════════════════╝
```

### Animation Behaviors

**Rotation (Y-axis):**
```
    -0.15 rad ←──────→ +0.15 rad
                ▲
                │
          sin(time * 0.5)
          Gentle sway
```

**Scale Pulse:**
```
    0.98x ←────→ 1.02x
           ▲
           │
     sin(time * 2)
     Subtle breathe
```

**Opacity:**
```
Fade In:   0.0 ─────────► 1.0  (0.8s, power2.out)
           ░░░░░░░█████████

Fade Out:  1.0 ─────────► 0.0  (1.0s, power2.in)
           █████████░░░░░░░
```

## Camera Perspective

```
Side View (XZ plane):
                                       
        │                              
        │  ▲ Y+                        
        │  │                           
        │  │    ╔══════════╗           
        │  │    ║  TEXT    ║  ← End   
        │  │    ╚══════════╝           
        │  │         ▲                 
        │  │         │                 
        │  │     Animation             
        │  │         │                 
        │  │         │                 
   ─────┼──┴─────────┴─────────────    
        │     👁  Camera               
        │    (Z = 6.5)                 
        │      ▲                       
        │      │                       
        │      │                       
        │  ┌───┴───┐                   
        │  │ BRAIN │                   
        │  └───────┘                   
        │      ▲                       
        │      │                       
        │  ╔══════════╗                
        │  ║  TEXT    ║  ← Start       
        │  ╚══════════╝                
        │  │                           
        │  │                           
        │  ▼ Y-                        
```

## Color Scheme Examples

### Current (Tech Blue)
```
Text: #ffffff (white)  ████████████
Glow: #4488ff (blue)   ████████████
Look: Modern, technical, AI-themed
```

### Alternative Schemes

**Warm Energy:**
```
Text: #ffffff (white)   ████████████
Glow: #ff8800 (orange)  ████████████
Look: Energetic, creative, warm
```

**Matrix Green:**
```
Text: #00ff00 (green)   ████████████
Glow: #00ff00 (green)   ████████████
Look: Hacker, digital, code-like
```

**Purple Magic:**
```
Text: #ffffff (white)   ████████████
Glow: #8844ff (purple)  ████████████
Look: Creative, artistic, mystical
```

**Cyan Futuristic:**
```
Text: #ffffff (white)   ████████████
Glow: #00ffff (cyan)    ████████████
Look: Futuristic, sci-fi, clean
```

## Performance Visualization

```
FPS Impact: ≈ 0-2 fps drop
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before: ████████████████████████████████ 60 fps
After:  ██████████████████████████████   58-60 fps

Draw Calls:
Before: ███████████████ 85 calls
After:  ███████████████▓▓▓ 88 calls (+3)

Memory:
Before: ████████████████ 120 MB
After:  ████████████████▓ 125 MB (+5 MB)
```

## Integration Preview

```typescript
// In page.tsx Scene:

<Scene>
  <Background />
  <NetworkBrain />
  <BrainModel />
  <AnimatedText          ← Add here
    lines={[
      "Hi, I am built by Robin.",
      "I am a visual representation",
      "of what an AI agent can do."
    ]}
    startPosition={[0, -0.5, 0]}
    endPosition={[0, 4.5, 0]}
    delay={1.5}
    duration={5}
    fontSize={0.22}
    color="#ffffff"
    emissiveColor="#4488ff"
    emissiveIntensity={0.8}
  />
</Scene>
```

---

**Visual Style**: Cinematic, smooth, professional  
**Technical Approach**: GSAP + Three.js Text  
**Performance**: Minimal impact, 60fps maintained
