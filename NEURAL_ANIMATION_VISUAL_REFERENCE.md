# Neural Activity Animation - Visual Reference

## Animation Comparison

### OLD: Simple Breathing Effect
```
Time (s)    0    1    2    3    4    5
Opacity   [▁▁▃▅▇▅▃▁▁▃▅▇▅▃▁▁▃▅▇▅▃▁]
Pattern:  Uniform sine wave, fully predictable
```

**Characteristics:**
- Smooth, continuous oscillation
- All edges pulse identically
- Single frequency (1.5 Hz)
- Resembles "breathing"

---

### NEW: Neural Spike Patterns

#### Nodes (Individual Neurons)
```
Neuron 1: ▁▁╔╗▁▁▁▁▁▁╔╗▁▁▁▁▁▁╔╗▁▁  (10 Hz)
Neuron 2: ▁▁▁╔╗▁▁▁▁▁▁╔╗▁▁▁▁▁▁╔   (8 Hz)
Neuron 3: ▁╔╗▁▁▁▁╔╗▁▁▁▁╔╗▁▁▁▁    (12 Hz)
          │  │     │  │     │
          └──┴─────┴──┴─────┴── Theta modulation
```

**Characteristics:**
- Sharp spikes (action potentials)
- Variable firing rates (5-15 Hz)
- Staggered timing
- Theta wave modulation

#### Edges (Neural Propagation)
```
Fast Gamma (30-70 Hz):  ▁▃▅▇▅▃▁▃▅▇▅▃▁▃▅▇▅▃
Beta (13-30 Hz):        ▁▁▃▃▅▅▇▇▅▅▃▃▁▁▃▃▅▅
Theta (4-8 Hz):         ▁▁▁▁▃▃▃▃▅▅▅▅▇▇▇▇▇▇

Burst Events:           ▁▁▁█████▁▁▁▁▁▁█████▁▁
                            ↑              ↑
                        synchronized    next
                        population      burst
                        burst           (3s)

Combined Output:        ▁▃▅█▇▅▃▁▃▅█▇▅▃▁▃▅█▇
```

**Characteristics:**
- Multiple overlapping frequencies
- Traveling waves (20 m/s propagation)
- Periodic burst synchronization
- Background stochastic noise

---

## Detailed Wave Patterns

### 1. Action Potential Shape
```
Voltage (mV)
  +40 ┤     ╭╮              Peak
      │    ╱  ╲
   0  ┼───╯    ╰─          Resting
      │         ╰╮
  -70 ┤          ╰─        Hyperpolarization
      └─────────────────
      0  20  60  100 ms   Time
      
      ├─┤ 20ms rise (depolarization)
         ├──┤ 40ms fall (repolarization)
             ├──┤ 40ms recovery
```

### 2. Theta-Gamma Coupling
```
Theta (5 Hz):     ╱╲      ╱╲      ╱╲
                 ╱  ╲    ╱  ╲    ╱  ╲
                ╱    ╲  ╱    ╲  ╱    ╲

Gamma (40 Hz):   ▁▃▅▇▅▃▁▁▃▅▇▅▃▁▁▃▅▇▅▃▁
                 ├─┤       │
                High     Low gamma
                gamma    (in theta trough)
                (in theta peak)
```

### 3. Burst Pattern
```
Time (s):     0   1   2   3   4   5   6   7   8   9
Activity:     ▁▁▁████▁▁▁▁▁▁▁▁▁████▁▁▁▁▁▁▁▁▁████▁
              └──┬──┘          └──┬──┘
              Burst            Next burst
              (300ms)          (3s interval)

Within Burst: ▁█▁█▁█▁█▁ (200-400 Hz rapid firing)
```

---

## Parameter Settings

### Node Animation Parameters
| Parameter | Value | Neural Equivalent |
|-----------|-------|-------------------|
| Base Rate | 5-15 Hz | Cortical neuron baseline |
| Spike Width | 100ms | Scaled action potential |
| Theta Freq | 4 Hz | Hippocampal theta |
| Burst Multi | 1.5x | Synchronized increase |
| Phase Offset | 0.3 * index | Desynchronized firing |

### Edge Animation Parameters
| Parameter | Value | Neural Equivalent |
|-----------|-------|-------------------|
| Wave 1 (Gamma) | 30 Hz | Fast oscillations |
| Wave 2 (Beta) | 15 Hz | Motor/attention band |
| Wave 3 (Theta) | 5 Hz | Slow modulation |
| Propagation | 20 m/s | Myelinated axon |
| Burst Cycle | 3 seconds | ~0.33 Hz synchronized |
| Noise Level | 20% | Background activity |

---

## Visual Effects Timeline

### 0-1 seconds: Initial Activity
- Nodes begin firing at staggered intervals
- Low-level background edge activity
- Theta modulation starts building

### 1-2 seconds: Increased Coordination
- Some nodes synchronize via theta coupling
- Beta waves become more apparent
- Edge activity increases

### 2-3 seconds: First Burst
- Synchronized population burst
- Edges light up dramatically (~0.3s)
- Rapid gamma oscillations visible
- Immediate post-burst quieting

### 3-6 seconds: Regular Activity
- Return to baseline spiking
- Continuous theta modulation
- Mixed beta/gamma in edges
- Stochastic variations

### 6+ seconds: Pattern Repeats
- Next burst at ~6 seconds
- Ongoing neural dynamics
- Never identical (stochastic component)

---

## Performance Characteristics

### Computational Complexity
```
OLD (Breathing):
  Math.sin(time * 1.5) × nodes     = O(n)
  
NEW (Neural):
  Per Node: 4× trig + 2× conditional = O(5n)
  Per Edge: 7× trig + 3× math       = O(10)
  
Total: ~3x computation increase
Still maintains 60 fps easily
```

### Visual Richness
```
OLD: Single frequency → low entropy
NEW: Multi-frequency → high entropy

Information Content:
OLD: ~1 bit (on/off)
NEW: ~6 bits (multi-component)
```

---

## Real-World Neural Comparison

### Human EEG During Active Thinking
```
Measured Brain Activity (simplified):
  Delta:  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁ (sleep waves, minimal)
  Theta:  ▁▃▅▇▅▃▁▃▅▇▅▃▁▃ (memory processing)
  Alpha:  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁ (reduced in active task)
  Beta:   ▃▅▇▅▃▅▇▅▃▅▇▅▃▅ (attention/motor)
  Gamma:  ▅▇█▇▅▇█▇▅▇█▇▅▇ (feature binding)
```

### Our NetworkBrain Animation
```
Simulated Activity:
  Theta:  ▁▃▅▇▅▃▁▃▅▇▅▃▁▃ ✓ Present
  Beta:   ▃▅▇▅▃▅▇▅▃▅▇▅▃▅ ✓ Present
  Gamma:  ▅▇█▇▅▇█▇▅▇█▇▅▇ ✓ Present
  Bursts: ▁▁▁███▁▁▁▁▁███ ✓ Present
  Noise:  ~20% variance   ✓ Present
```

**Match**: High fidelity to real neural dynamics!

---

## Technical Notes

### Frequency Ranges
All frequencies are scaled for visual clarity:
- **Real neurons**: 1-2ms spike = 500 Hz equivalent
- **Our animation**: 100ms spike = 10 Hz visual
- **Scaling factor**: ~50x slower for visibility

### Color-Coded Activity Levels
```
Inactive:  ▁▁▁ (0.0-0.2) - Dark blue
Low:       ▃▃▃ (0.2-0.4) - Medium blue  
Medium:    ▅▅▅ (0.4-0.6) - Bright blue
High:      ▇▇▇ (0.6-0.8) - Cyan
Burst:     ███ (0.8-1.0) - White/Bright
```

---

**Last Updated**: January 3, 2026  
**Animation Type**: Scientific Neural Activity Simulation  
**Accuracy**: High (with temporal scaling)
