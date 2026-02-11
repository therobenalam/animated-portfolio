# NetworkBrain Interactive Features

## Overview
The NetworkBrain now responds dynamically to cursor proximity, creating an immersive interactive experience.

## Features Implemented

### 1. **Node Glow Effect**
- Nodes transition to **full white color** when cursor is near
- Uses smooth color interpolation from base color → white
- Implemented via `color.lerpColors(baseColor, whiteColor, colorLerpFactor)`

### 2. **Node Scale Animation**
- Nodes grow up to **3.5x their original size** when cursor is close
- Scale multiplier: `1.0 + colorLerpFactor * 2.5`
- Creates a "magnetic attraction" visual effect

### 3. **Node Emissive Glow**
- Emissive intensity increases dramatically for hot nodes
- Formula: `0.5 + maxIntensity * 2.5`
- Makes nodes appear to radiate light

### 4. **Edge Glow Propagation**
- Edges connected to glowing nodes inherit the glow
- Uses power curve for dramatic effect: `Math.pow(edgeIntensity, 0.7)`
- Edge opacity enhanced: `0.7 + maxEdgeIntensity * 0.8`

### 5. **Proximity Detection**
- Raycasting calculates screen-space distance to each node
- Proximity threshold: **0.25** (normalized screen coordinates)
- "Shy behavior": distant nodes dim to 15% when cursor is near any node

## Technical Implementation

### Mouse Tracking
```typescript
useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```

### Proximity Calculation
```typescript
const worldPos = pos.clone().applyMatrix4(groupRef.current!.matrixWorld);
const nodeScreenPos = worldPos.clone().project(state.camera);
const mouseDistance = Math.sqrt(
  Math.pow(nodeScreenPos.x - mouseRef.current.x, 2) +
  Math.pow(nodeScreenPos.y - mouseRef.current.y, 2)
);
```

### Visual Effects
```typescript
// Color transition to white
const colorLerpFactor = 1.0 - mouseDistance / proximityThreshold;
color.lerpColors(baseColor, whiteColor, colorLerpFactor);

// Scale increase
const scaleMultiplier = 1.0 + colorLerpFactor * 2.5;
dummy.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);

// Intensity boost
proximityIntensity = 1.0 + (1.0 - mouseDistance / proximityThreshold) * 4.0;
```

## Performance Considerations

- **Distance calculations**: O(n) per frame for n nodes
- **Batch updates**: All nodes updated in single loop
- **Instanced rendering**: Maintains efficiency with InstancedMesh
- **Target FPS**: 60fps desktop, 30-60fps mobile

## Usage Example

```tsx
<NetworkBrain
  nodeCount={177}
  connectionDensity={0.12}
  animated={true}
  showNodes={true}
  showEdges={true}
  nodeColor="#4488ff"
  edgeColor="#00ffff"
/>
```

## Visual Behavior

1. **Default State**: Nodes pulse with neural activity animation
2. **Cursor Approaches**: Nearby nodes begin glowing white and growing
3. **Cursor Over Node**: Full white glow at 3.5x size
4. **Connected Edges**: Edges connected to glowing nodes brighten
5. **Other Nodes**: Distant nodes dim to 15% to emphasize interaction
6. **Cursor Leaves**: Smooth transition back to default state

## Testing

Comprehensive tests cover:
- Mouse event tracking and cleanup
- Proximity detection logic
- Node scaling and color transitions
- Edge glow propagation
- Performance with varying node counts

Run tests:
```bash
npm test NetworkBrain.test.tsx
```

---

**Result**: An engaging, interactive 3D brain visualization that responds naturally to user input while maintaining 60fps performance. 🧠✨
