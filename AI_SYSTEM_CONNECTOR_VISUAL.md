# AI System Connector - Visual Reference

## System Layout

```
                    Vector DB 📊
                   (Yellow, Y=3.5)
                         |
                         |
                         ↓
                    
    LLM 🤖                           Knowledge
  (Green)                            Graph 🕸️
  X=-4, Y=2     ← 🧠 BRAIN →        (Orange)
                  Center             X=4, Y=2
                  (0,0,0)
                    
                    
    MCP 🔌                           Sequential 🧠
  (Purple)                           Thinking
  X=-3, Y=-2                         (Cyan)
                                     X=3, Y=-2
```

## Side View

```
     Y
     ↑
     │         📊 Vector DB (0, 3.5, 0)
     │          /
     │         /
   2 ├── 🤖 ─/─── 🧠 ───── 🕸️
     │      /     
     │     /    
   0 ├────●──────────────────► X
     │   BRAIN
     │   
  -2 ├── 🔌 ────────────── 🧠
     │                    (Sequential)
     │
```

## Top View (Looking Down)

```
      Z
      ↑
      │
      │    🤖 LLM
      │     │
      │     │
    1 ├─────●───── 🕸️ Knowledge
      │   BRAIN    
      │     │
      │     │
      │    🔌 MCP
    0 ├─────┴──────────────► X
      │
   -1 │
      │
   -2 │           🧠 Sequential
      │
```

## Connection Visualization

### LLM Connections (Green)
```
     Node 10
        ▲
        │ ╱
        │╱  Node 45
        ●     ▲
       ╱│      │
      ╱ │      │
     ╱  │      │
🤖 ●   │      │
LLM    │      │
       │    Node 89
       │      ▲
       │     ╱
       │    ╱
       │   ╱
       │  ●
       │   Node 120
```

### Knowledge Graph Connections (Orange)
```
        Node 5
          ▲
          │╲
          │ ╲
          │  ╲ Node 67
          ●   ▲
           ╲  │
            ╲ │
             ╲│
           Node 134 ● ─── 🕸️ KG
              ╲
               ╲
                ╲
                 ●
             Node 156
```

## Particle Flow Animation

### Frame-by-Frame

```
t=0.0s:  🤖 ●────────────● Brain
                ↑
              Particle 1

t=0.5s:  🤖 ●─────●──────● Brain
              ↑     ↑
           Particle 1  Particle 2

t=1.0s:  🤖 ●──────────●─● Brain
                       ↑ ↑ ↑
                      P1 P2 P3

t=1.5s:  🤖 ●────────────● Brain
         ↑                   (P1 loops back)
       Particle 1
```

### Curve Path

```
          End (Brain Node)
            ●
           ╱ ╲
          ╱   ╲
         ╱     ╲
        ╱       ╲
       ╱   Mid   ╲
      ╱     ●     ╲
     ╱    (offset) ╲
    ╱               ╲
   ●─────────────────●
Start (AI System)

Particles follow the curve: Start → Mid → End
```

## Color Scheme

### System Colors

```
LLM:           ████████ #00ff88  (Bright Green)
Knowledge:     ████████ #ff8800  (Orange)
MCP:           ████████ #ff00ff  (Purple/Magenta)
Sequential:    ████████ #00ffff  (Cyan)
Vector DB:     ████████ #ffff00  (Yellow)
```

### Visual Components

```
┌────────────────────────────────┐
│   System Node Breakdown        │
├────────────────────────────────┤
│                                │
│   ┌─────────────┐              │
│   │   Label     │  ← Text      │
│   │  (white)    │              │
│   └─────────────┘              │
│         │                      │
│         ▼                      │
│      ┌─────┐                   │
│      │  ●  │  ← Sphere         │
│      │Icon │    (colored)      │
│      └─────┘                   │
│         │                      │
│         ▼                      │
│       ○───○  ← Ring            │
│              (glow)            │
│                                │
└────────────────────────────────┘
```

## Connection Line Styles

### Default (Opacity 0.3)
```
System ○─ ─ ─ ─ ─ ─ ─ ●─ Brain
       (subtle curve)
```

### High Opacity (0.8)
```
System ●━━━━━━━━━━━━━━●━ Brain
       (bold curve)
```

### With Particles
```
System ●─ ─ ○ ─ ─ ○ ─ ○ ●─ Brain
            ↑     ↑   ↑
         Particles flowing
```

## UI Toggle States

### All Enabled
```
☑ Show AI Systems
☑ System Labels
☑ Connection Lines
☑ Data Flow Particles

Visual:
    📊 Vector DB
       ╱ ○ ○ ○
      ╱
   🧠 BRAIN
```

### Minimal (Particles Only)
```
☑ Show AI Systems
☐ System Labels
☐ Connection Lines
☑ Data Flow Particles

Visual:
    ● (no label)
      ○ ○ ○ (particles)
   🧠 BRAIN
```

### Labels Only
```
☑ Show AI Systems
☑ System Labels
☐ Connection Lines
☐ Data Flow Particles

Visual:
    📊 Vector DB
    ● (sphere only)
    
   🧠 BRAIN
```

## Scale Reference

```
Brain Size:     ~2-3 units diameter
System Sphere:  0.3 units radius
Ring Radius:    0.35-0.45 units
Label Height:   0.6 units above sphere
Particle Size:  0.05 units radius
Connection:     4-6 units length
```

## Camera View

### Default View (Z=6.5)
```
         Camera 👁
           │
           │ (looking at origin)
           │
           ▼
      ┌─────────┐
      │  📊     │  ← All systems visible
      │🤖 🧠 🕸️ │
      │  🔌 🧠  │
      └─────────┘
```

### Close View (Z=3)
```
         Camera 👁
           │
           │
           ▼
      [Closer view]
      Systems appear larger
      More detail visible
```

## Performance Visualization

```
FPS Impact by Feature:

Base (Brain only):     ████████████████████ 60 fps

+ AI Systems:          ███████████████████░ 58 fps
                       (-2 fps, spheres)

+ Connections:         ██████████████████░░ 57 fps
                       (-1 fps, lines)

+ Particles:           █████████████████░░░ 56 fps
                       (-1 fps, animation)

All features:          █████████████████░░░ 56-58 fps ✅
```

## Draw Call Breakdown

```
Per System (×5):
  - Sphere:        1 call
  - Ring:          1 call
  - Label:         1 call
  - Icon:          1 call
                 ─────
                   4 calls × 5 = 20 calls

Connections:
  - Lines:         ~15 calls (3 per system avg)

Particles:
  - Spheres:       ~15 calls (3 per connection)

Total: ~50 additional draw calls
```

## Integration Flow

```
┌─────────────────┐
│  page.tsx       │
│  (Parent)       │
└────────┬────────┘
         │
         ├─► NetworkBrain
         │   │
         │   └─► onNodePositionsUpdate(positions)
         │       │
         │       ▼
         │   setState(positions)
         │       │
         └───────┴─► AISystemConnector
                     (receives positions)
                     │
                     └─► Renders systems + connections
```

## Real-World Analogy

```
Think of it like:

Brain = Central Server/Hub
Systems = External Services
Connections = API Calls
Particles = Data Packets

     API Gateway 📊
           ║
           ║ packets
           ↓
    Auth ← 🧠 Server → Database
    🤖       ║         🕸️
           ║
      Cache 🔌
```

---

**Quick Reference**: 5 systems, curved connections, 3 particles per connection, 60fps maintained
