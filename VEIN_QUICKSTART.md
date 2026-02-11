# Quick Start: Pulsing Vein System

## 🚀 Get Started in 30 Seconds

### Step 1: Use in Your Page
```tsx
import BrainModel from '@/components/3d/BrainModel';
import { Canvas } from '@react-three/fiber';

export default function HeroSection() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <BrainModel
          enableVeins={true}
          veinColor="#00ffff"
          veinIntensity={0.8}
          veinPulseSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
```

### Step 2: That's It! 🎉

Your brain now has glowing, pulsing veins!

---

## 📋 Copy-Paste Examples

### Electric Blue (Tech)
```tsx
<BrainModel
  variant="thinking"
  enableVeins={true}
  veinColor="#00ffff"
  veinIntensity={0.8}
  veinPulseSpeed={1.5}
  glowIntensity={0.4}
/>
```

### Neon Purple (Creative)
```tsx
<BrainModel
  variant="pulsing"
  enableVeins={true}
  veinColor="#ff00ff"
  veinIntensity={1.0}
  veinPulseSpeed={2.0}
  glowIntensity={0.5}
/>
```

### Medical Red (Healthcare)
```tsx
<BrainModel
  variant="scanning"
  enableVeins={true}
  veinColor="#ff0033"
  veinIntensity={0.9}
  veinPulseSpeed={1.2}
  glowIntensity={0.3}
/>
```

### Matrix Green (Cyberpunk)
```tsx
<BrainModel
  variant="thinking"
  enableVeins={true}
  veinColor="#00ff00"
  veinIntensity={1.2}
  veinPulseSpeed={1.8}
  glowIntensity={0.6}
/>
```

---

## 🎨 3-Minute Customization

### Change Color
```tsx
veinColor="#YOUR_HEX_COLOR"
```
Try: `#ff0066`, `#00ffff`, `#00ff00`, `#ff00ff`

### Adjust Brightness
```tsx
veinIntensity={0.5}  // Subtle
veinIntensity={0.8}  // Balanced (default)
veinIntensity={1.5}  // Intense
```

### Control Speed
```tsx
veinPulseSpeed={0.5}  // Slow, breathing
veinPulseSpeed={1.5}  // Normal (default)
veinPulseSpeed={3.0}  // Fast, energetic
```

### Disable Veins
```tsx
enableVeins={false}  // Back to original look
```

---

## 🎮 Interactive Demo

Want to experiment before coding?

1. Create demo page:
```bash
# Create file: app/vein-demo/page.tsx
```

2. Add this code:
```tsx
import VeinControlDemo from '@/components/ui/VeinControlDemo';

export default function VeinDemoPage() {
  return <VeinControlDemo />;
}
```

3. Run and visit:
```bash
npm run dev
# Visit: http://localhost:3000/vein-demo
```

4. Play with controls:
- Color picker
- Intensity slider
- Speed slider
- Preset buttons
- Copy generated code

---

## ⚡ Common Patterns

### Thinking Brain (Active)
```tsx
<BrainModel
  variant="thinking"
  veinColor="#00ffff"
  veinPulseSpeed={2.0}
/>
```

### Calm Brain (Meditation)
```tsx
<BrainModel
  variant="idle"
  veinColor="#6699ff"
  veinIntensity={0.5}
  veinPulseSpeed={0.5}
/>
```

### Scanning Brain (Analysis)
```tsx
<BrainModel
  variant="scanning"
  veinColor="#00ff99"
  veinPulseSpeed={2.5}
/>
```

### Heartbeat Brain (Alive)
```tsx
<BrainModel
  variant="pulsing"
  veinColor="#ff0066"
  veinPulseSpeed={1.2}
/>
```

---

## 🐛 Troubleshooting

### Veins Not Visible?
```tsx
// Increase intensity
veinIntensity={1.2}

// Use brighter color
veinColor="#00ffff"

// Check you enabled them
enableVeins={true}
```

### Too Bright?
```tsx
// Lower intensity
veinIntensity={0.5}

// Use darker color
veinColor="#0066cc"
```

### Wrong Speed?
```tsx
// Slow down
veinPulseSpeed={0.8}

// Speed up
veinPulseSpeed={2.5}
```

---

## 📱 Mobile Optimization

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function ResponsiveBrain() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <BrainModel
      enableVeins={!isMobile}  // Disable on mobile if needed
      veinIntensity={isMobile ? 0.6 : 0.8}
      veinPulseSpeed={isMobile ? 1.0 : 1.5}
    />
  );
}
```

---

## 🎯 Best Practices

### 1. Match Your Brand
```tsx
// Tech company (blue)
veinColor="#0099ff"

// Creative agency (purple/pink)
veinColor="#ff00ff"

// Healthcare (red)
veinColor="#ff0033"
```

### 2. Consider Context
```tsx
// Hero section: More intense
veinIntensity={1.0}

// Background element: Subtle
veinIntensity={0.5}
```

### 3. Sync with Animation
```tsx
// Calm sections
variant="idle"
veinPulseSpeed={0.8}

// Active sections
variant="thinking"
veinPulseSpeed={2.0}
```

---

## 📚 More Resources

- **Full Documentation**: `VEIN_SYSTEM.md`
- **Visual Guide**: `VEIN_VISUAL_GUIDE.md`
- **Implementation**: `VEIN_IMPLEMENTATION_SUMMARY.md`
- **Examples**: `components/3d/VeinSystemExamples.tsx`
- **Tests**: `__tests__/BrainModelVeins.test.tsx`

---

## ✅ Checklist

- [ ] Import BrainModel component
- [ ] Add to Canvas with lights
- [ ] Set `enableVeins={true}`
- [ ] Choose a color (`veinColor`)
- [ ] Adjust intensity if needed
- [ ] Test in browser
- [ ] Tweak pulse speed
- [ ] Done! 🎉

---

## 🚀 Next Level

Ready for more?

### Audio Reactivity (Future)
```tsx
// Sync with music
const [intensity, setIntensity] = useState(0.8);

// Update from audio analysis
<BrainModel veinIntensity={intensity} />
```

### User Controls
```tsx
const [color, setColor] = useState('#00ffff');

<input 
  type="color" 
  value={color}
  onChange={(e) => setColor(e.target.value)}
/>
<BrainModel veinColor={color} />
```

### Theme Integration
```tsx
// Dark mode: bright veins
// Light mode: subtle veins
const isDark = useTheme();
<BrainModel 
  veinIntensity={isDark ? 1.0 : 0.6}
/>
```

---

## 💡 Pro Tips

1. **Contrast**: Bright veins on dark backgrounds
2. **Speed**: Match animation variant
3. **Intensity**: Less is more for professional sites
4. **Color**: Use your brand colors
5. **Testing**: Try the interactive demo first

---

## 🎊 You're Ready!

The vein system is production-ready. Just copy any example above and start building!

**Questions?** Check the full docs in `VEIN_SYSTEM.md`

**Happy coding! 🧠✨**
