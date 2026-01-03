# 🧠 Brain Model Setup Guide

## Model Selected: Human Brain by Yash Dandavate

**Model Details:**
- **Downloads:** 7,500+
- **Views:** 55,000+
- **Triangles:** 45.3k
- **Vertices:** 22.7k
- **License:** CC Attribution (requires credit)
- **Performance:** Optimized for web use

## 📥 Download Instructions

### Option 1: Download from Sketchfab (Recommended)

1. **Visit the model page:**
   https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784

2. **Log in to Sketchfab** (free account required for downloads)

3. **Click "Download 3D Model"** button

4. **Select format:**
   - Choose: **"Autoconverted format (glTF)"**
   - This will download as a ZIP file

5. **Extract and rename:**
   - Unzip the downloaded file
   - Find the `.glb` file (usually in a subfolder)
   - Rename it to: `brain.glb`

6. **Move to project:**
   ```bash
   # Move the file to your project's models folder
   mv ~/Downloads/brain.glb /Users/robenalam/Documents/animated-portfolio/public/models/brain.glb
   ```

### Option 2: Alternative Free Brain Models

If you prefer a different style, here are other free options:

#### Low Poly Brain (Best Performance)
- **URL:** https://sketchfab.com/3d-models/low-poly-brain-ef16b7bb02c14c4a83b9798bccaf293f
- **Triangles:** Only 154! (ultra lightweight)
- **Style:** Modern, minimalist
- **Use:** Save as `brain.glb` in `public/models/`

#### Cyber Brain AI (Futuristic)
- **URL:** https://sketchfab.com/3d-models/cyber-brain-ai-5c8bf975736b457eacf9b4b2212f63db
- **Triangles:** 590.4k (high detail)
- **Style:** Cyberpunk/AI themed
- **Use:** Save as `brain.glb` in `public/models/`

## ✅ What's Already Done

The code has been updated to:
- ✅ Load GLB models using Three.js GLTF loader
- ✅ Replace the placeholder box with brain model
- ✅ Maintain all animations (floating, scroll-based rotation)
- ✅ Keep responsive scaling for mobile devices
- ✅ Preload model for optimal performance

## 🚀 Testing Your Model

Once you've downloaded and placed `brain.glb` in `/public/models/`:

1. **Start the dev server** (if not already running):
   ```bash
   cd /Users/robenalam/Documents/animated-portfolio
   npm run dev
   ```

2. **Open your browser:**
   - Go to: http://localhost:3000
   - You should see the brain model instead of the blue box

3. **Test interactions:**
   - ✅ Scroll with mouse wheel → Brain should rotate
   - ✅ Model should float gently up and down
   - ✅ Responsive on mobile (no floating animation on mobile)

## 🎨 Customization

### Adjust Model Scale
In `app/page.tsx`, change the scale:
```tsx
<Model position={[0, 0, 0]} scale={2.0} /> // Make it bigger
<Model position={[0, 0, 0]} scale={0.8} /> // Make it smaller
```

### Change Model Position
```tsx
<Model position={[1, 0, 0]} /> // Move right
<Model position={[0, 1, 0]} /> // Move up
<Model position={[0, 0, 2]} /> // Move closer
```

### Use Different Model
To use a different model file:
```tsx
<Model modelPath="/models/other-brain.glb" />
```

## 📋 Attribution Required

Since this model uses CC Attribution license, add this credit somewhere in your portfolio:

```
3D Brain Model: "Human Brain" by Yash Dandavate
Source: https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784
License: CC Attribution
```

Good places for attribution:
- Footer of your website
- About page
- Credits/Acknowledgments section

## 🐛 Troubleshooting

### Model doesn't appear?
1. Check console for errors (F12 → Console)
2. Verify file exists: `ls -la public/models/brain.glb`
3. Ensure file is named exactly `brain.glb`
4. Try clearing browser cache (Cmd+Shift+R)

### Model is too big/small?
Adjust the `scale` prop in `app/page.tsx`

### Model is wrong color?
The materials from the GLB file are used. You can modify materials in Blender before export, or add custom materials in the code.

### Performance issues?
- Try the Low Poly Brain model (only 154 triangles)
- Reduce texture resolution in Blender
- Check browser performance tab (F12 → Performance)

## 🎯 Next Steps

1. Download the brain model following instructions above
2. Test it in your browser
3. Adjust scale/position to your liking
4. Add attribution to your portfolio
5. Deploy and enjoy your animated 3D brain! 🧠✨
