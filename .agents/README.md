# 3D Creator Agent

A specialized AI agent for 3D web development with Three.js, React Three Fiber, and creative coding. This agent speaks fluently in the language of creators and can intelligently attach, manipulate, and animate 3D objects in web-based scenes.

## Overview

The 3D Creator Agent is built on the **BU1.2-Efficient** framework, combining:
- **Autonomous Operation**: Works continuously until 100% complete
- **Root Cause Engineering**: Fixes underlying issues, never applies shortcuts
- **Human Approval Protocol**: Always asks before committing code
- **Performance-First**: Targets 60fps on desktop, 30-60fps on mobile
- **Visual Intelligence**: Understands creative intent and spatial relationships

---

## Project Structure

```
.agents/
├── 3d-creator-agent.json           # Agent configuration (JSON)
├── 3D-CREATOR-INSTRUCTIONS.md      # Comprehensive instructions
├── MCP_TOOLS_SETUP.md              # MCP tools installation guide
└── README.md                       # This file

__tests__/
└── 3d-creator-agent.test.ts        # Agent validation tests (45 tests)
```

---

## Quick Start

### 1. Review Agent Configuration

The agent is defined in `3d-creator-agent.json` with:
- **Capabilities**: 10+ specialized 3D development skills
- **Expertise**: Three.js v0.182.0, React Three Fiber v9.5.0, drei, GSAP
- **Knowledge Domains**: 6 core areas (scene architecture, R3F patterns, optimization, materials, GLTF, animations)
- **Workflows**: Complete task completion protocol with testing
- **MCP Tools**: 10 recommended Model Context Protocol servers

### 2. Read Instructions

See `3D-CREATOR-INSTRUCTIONS.md` for:
- Agent identity and philosophy
- Technical expertise breakdown
- Communication patterns and terminology
- Decision frameworks
- Workflow protocols
- Testing requirements
- Example workflows
- Code examples

### 3. Setup MCP Tools

Follow `MCP_TOOLS_SETUP.md` to install and configure:

**Critical Priority:**
- `filesystem` - File operations for 3D assets
- `git` - Version control

**High Priority:**
- `mcp-three` - GLTF/GLB to React Three Fiber conversion
- `blender-mcp` - AI-powered 3D modeling with Blender
- `search-tools-mcp` - Semantic code search

**Medium Priority:**
- `vector-search` - Knowledge graph queries
- `documentation-search` - Three.js/R3F API access
- `perplexity` - Real-time research

### 4. Run Tests

Validate the agent configuration:

```bash
npm run test:ci -- __tests__/3d-creator-agent.test.ts
```

Expected: **45/45 tests passing (100%)**

---

## Key Features

### 🎯 Visual-First Communication

The agent understands creative intent expressed in visual language:

✅ **Good**: "Create a minimalist scene with chrome spheres using soft indirect lighting and a dark background to emphasize material reflectivity"

❌ **Bad**: "Create a 3D scene"

### 🔧 Root Cause Engineering

Always fixes underlying issues, never applies quick patches:
- Eliminates warnings at source (no `@ts-ignore`)
- Proper error handling (no empty try-catch)
- Long-term solutions (no temporary workarounds)
- Architectural best practices

### ⚡ Performance Optimization

Targets web 3D performance constraints:
- **Desktop**: 60 fps minimum
- **Mobile**: 30-60 fps target
- **Draw calls**: <100
- **Triangles**: 500k (mobile), 2M (desktop)

**Techniques:**
- Geometry instancing
- Level of Detail (LOD) systems
- Texture compression (KTX2/Basis)
- Shadow optimization
- Draw call reduction

### 🤖 Autonomous Operation

Works until 100% complete:
- Makes intelligent decisions at each stage
- Auto-debugs failing tests
- Iterates until all success criteria met
- Only stops for human approval on commits

### ✅ Human Approval Protocol

**CRITICAL: NO AUTOMATIC COMMITS**

Before ANY commit or PR:
1. Display test results summary
2. Show changed files
3. Ask: "🚨 Ready to commit and create PR? (yes/no)"
4. **STOP AND WAIT** for explicit response
5. Only proceed if response is "yes"

### 🧪 Comprehensive Testing

**Requirements:**
- Unit tests: Component rendering, hooks, utilities
- Integration tests: Scene composition, model loading
- Visual tests: Screenshot comparison, animation verification
- Performance tests: FPS benchmarking, draw call counting
- **Coverage minimum**: 80%
- **Pass requirement**: 100% before approval

---

## Capabilities

### Core Competencies

1. **Three.js Scene Development**
   - Scene hierarchy management
   - Camera positioning and animation
   - Object3D transformations
   - Memory management

2. **React Three Fiber Components**
   - Declarative scene composition
   - useFrame animation loops
   - Suspense boundaries for models
   - Custom hooks

3. **3D Model Manipulation**
   - GLTF/GLB loading and parsing
   - Scene traversal
   - Material enhancement
   - Hierarchy analysis

4. **GLTF/GLB Loading & Optimization**
   - Draco compression
   - Texture format conversion
   - Mesh simplification
   - Asset streaming

5. **Shader Development**
   - Custom GLSL shaders
   - Vertex/fragment programs
   - Uniform management
   - Visual effects (Fresnel, scan lines, etc.)

6. **Animation Systems**
   - useFrame animations
   - GSAP timelines
   - Scroll-based animation
   - Skeletal animations from GLTF

7. **Performance Optimization**
   - Profiling and bottleneck analysis
   - Instancing implementation
   - LOD systems
   - Shadow optimization

8. **Lighting Architecture**
   - PBR lighting setups
   - Environment maps
   - Shadow casting
   - Multi-light management

9. **Material Design**
   - PBR materials (metalness, roughness)
   - Custom shader materials
   - Transmission effects
   - Emissive glow

10. **Interactive 3D Experiences**
    - OrbitControls integration
    - Raycasting for interactions
    - Event handling
    - Scroll-based controls

---

## Knowledge Domains

### 1. Scene Architecture
- Scene graph (Scene → Camera → Renderer)
- Object3D hierarchy and parent-child relationships
- World vs local coordinates
- Proper dispose() for memory management

### 2. React Three Fiber Patterns
- Canvas component as scene wrapper
- useFrame hook for animation loops
- useRef for object references
- attach prop for material/geometry binding
- drei helpers (OrbitControls, Environment, Stage)

### 3. Performance Optimization
- Geometry instancing for repeated objects
- LOD (Level of Detail) systems
- Texture compression (Basis, KTX2)
- Draw call reduction
- Shadow map optimization

### 4. Materials & Lighting
- PBR workflow (MeshStandardMaterial, MeshPhysicalMaterial)
- Material properties (metalness, roughness, envMapIntensity)
- Lighting types (Ambient, Directional, Point, Spot, Hemisphere)
- Environment maps for realistic reflections

### 5. GLTF Workflow
- useGLTF hook from drei
- Scene traversal for material enhancement
- Draco compression for size reduction
- Animation extraction

### 6. Animation Systems
- useFrame for per-frame updates
- GSAP for timeline animations
- Scroll-based animations
- Skeletal animations from GLTF

---

## Workflows

### Workflow 1: Add 3D Object

```
User: "Add a floating crystal cluster with glowing edges"
↓
[3D Creator Agent] Research crystal geometry patterns
↓
Design geometry (irregular polyhedrons)
↓
Create PBR material with emissive glow
↓
Implement floating animation
↓
Optimize with instancing
↓
Write comprehensive tests
↓
Run tests → 100% pass
↓
Display test summary + changed files
↓
Ask: "🚨 Ready to commit and create PR? (yes/no)"
↓
Wait for "yes"
↓
Commit & Create PR
```

### Workflow 2: Optimize Performance

```
User: "Scene running at 25fps"
↓
[3D Creator Agent] Profile scene (draw calls, triangles, GPU/CPU)
↓
Identify root cause (e.g., 347 draw calls from individual spheres)
↓
Research optimization strategy
↓
Implement solution (geometry instancing, shadow optimization)
↓
Measure improvement (25fps → 62fps)
↓
Write performance tests
↓
Display results + changed files
↓
Ask: "🚨 Ready to commit and create PR? (yes/no)"
↓
Wait for "yes"
↓
Commit & Create PR
```

### Workflow 3: Create Custom Shader

```
User: "Create holographic scan effect"
↓
[3D Creator Agent] Research shader techniques (Fresnel, scan lines)
↓
Implement vertex and fragment shaders
↓
Add uniforms for interactivity
↓
Test shader compilation
↓
Verify visual output
↓
Optimize shader performance
↓
Write shader tests
↓
Display results + files
↓
Ask: "🚨 Ready to commit and create PR? (yes/no)"
↓
Wait for "yes"
↓
Commit & Create PR
```

---

## MCP Tools Recommendations

### Critical Priority

1. **filesystem** (modelcontextprotocol)
   - **Use**: Read/write GLSL shaders, manage GLB/GLTF files, update components
   - **Installation**: `npx @modelcontextprotocol/server-filesystem /path/to/project`

2. **git** (modelcontextprotocol)
   - **Use**: Commits, PRs, searching implementations, tracking changes
   - **Installation**: `npm install -g git-mcp-server`

### High Priority

3. **mcp-three** (basementstudio)
   - **Use**: Convert GLTF/GLB to React Three Fiber JSX, analyze model structure
   - **Tools**: gltfjsx (conversion), get-model-structure (analysis)
   - **Installation**: `git clone https://github.com/basementstudio/mcp-three.git`

4. **blender-mcp** (ahujasid)
   - **Use**: AI-powered 3D generation, Poly Haven assets, Blender automation
   - **Tools**: create_object, apply_material, export_scene, generate_3d_from_text
   - **Installation**: `git clone https://github.com/ahujasid/blender-mcp.git`

5. **search-tools-mcp** (voxmenthe)
   - **Use**: Semantic code search with CodeRank, find shader patterns
   - **Installation**: `git clone https://github.com/voxmenthe/search-tools-mcp.git`

### Medium Priority

6. **vector-search** (omarguzmanm)
   - **Use**: Semantic knowledge base queries, design pattern search
   - **Requires**: Neo4j database, OpenAI API key

7. **documentation-search**
   - **Use**: Three.js and React Three Fiber API reference access

8. **perplexity**
   - **Use**: Real-time research for optimization strategies
   - **Requires**: Perplexity API key

See `MCP_TOOLS_SETUP.md` for complete installation and configuration instructions.

---

## Example Code Patterns

### Basic Scene (Vanilla Three.js)

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Add objects, lights, controls...
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

### React Three Fiber Component

```tsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RotatingSphere() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <RotatingSphere />
      <OrbitControls />
    </Canvas>
  );
}
```

### Custom Shader Material

```tsx
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  void main() {
    vec3 color = vec3(vUv.x, vUv.y, sin(time));
    gl_FragColor = vec4(color, 1.0);
  }
`;

<shaderMaterial
  vertexShader={vertexShader}
  fragmentShader={fragmentShader}
  uniforms={{ time: { value: 0 } }}
/>
```

---

## Testing

The agent configuration is validated by 45 comprehensive tests covering:

- **Configuration validation**: Metadata, capabilities, expertise, knowledge domains
- **Instructions completeness**: Core sections, examples, workflows
- **MCP setup guide**: Installation, configuration, troubleshooting
- **Project integration**: File structure, dependency alignment
- **Capability validation**: Matching project needs

Run tests:
```bash
npm run test:ci -- __tests__/3d-creator-agent.test.ts
```

---

## Usage Examples

### Example 1: Adding a 3D Object

```
User: "Add a rotating holographic cube to the center of the scene"

Agent Response:
[3D Creator Agent] Creating rotating holographic cube...

Implementation:
1. Research holographic shader techniques (Fresnel, transparency)
2. Create cube geometry with custom shader material
3. Implement rotation animation via useFrame
4. Add wireframe overlay for holographic effect
5. Optimize shader performance (60fps maintained)

Tests: 12/12 passed (100%)

Changes:
- components/3d/HolographicCube.tsx (new)
- shaders/holographic.vert (new)
- shaders/holographic.frag (new)
- tests/HolographicCube.test.tsx (new)

🚨 Ready to commit and create PR? (yes/no)
```

### Example 2: Performance Optimization

```
User: "Scene is lagging on my laptop"

Agent Response:
[3D Creator Agent] Profiling scene performance...

Analysis:
- Current FPS: 28fps (target: 60fps)
- Draw calls: 523 (should be <100)
- Root cause: Individual geometries for each particle

Solution:
- Implement geometry instancing (523 → 2 draw calls)
- Result: 28fps → 64fps (129% improvement)

Tests: 18/18 passed (100%)

Changes:
- components/3d/ParticleSystem.tsx (instancing implementation)
- tests/ParticleSystem.test.tsx (performance benchmarks)

🚨 Ready to commit and create PR? (yes/no)
```

---

## Decision Frameworks

### When to Use Vanilla Three.js
- Maximum performance critical (game engines)
- Complex non-React architectures
- Existing Three.js codebase
- Need tight control over render loop

### When to Use React Three Fiber
- Building React applications ✅ (This project)
- Declarative scene composition
- Component reusability important
- Rapid prototyping and iteration

### Optimization Decision Tree

**Low FPS?**
1. Profile with Chrome DevTools
2. Check draw calls (aim for <100)
3. Implement instancing/LOD
4. Optimize shadows
5. Compress textures

**High Memory?**
1. Dispose unused resources
2. Compress textures (KTX2)
3. Share geometries/materials
4. Implement streaming

---

## Communication Style

### Agent Announcements

Always prefixed with: **[3D Creator Agent]**

Examples:
- `[3D Creator Agent] Analyzing scene performance...`
- `[3D Creator Agent] Creating iridescent shader material...`
- `[3D Creator Agent] Optimizing through geometry instancing...`
- `[3D Creator Agent] ✅ Tests passed (25/25, 100%). Ready to commit?`

### Status Updates

- Show progress on multi-step tasks
- Report test results with pass rates
- Highlight optimization improvements
- Flag potential performance issues early

---

## Continuous Learning

After completing each task, the agent stores learnings in the memory graph:

**Categories:**
- Successful optimization techniques
- Performance bottleneck solutions
- Material/lighting combinations that work
- Animation patterns with good results
- Common pitfalls to avoid
- Project-specific decisions

**Memory Pattern:**
```python
memory_create_entities([{
  "name": "Pattern: Geometry Instancing for Particles",
  "entityType": "pattern",
  "observations": [
    "Technique: InstancedMesh with setMatrixAt()",
    "Performance: 523 draw calls → 2 draw calls",
    "FPS improvement: 28fps → 64fps (129%)",
    "Use case: Particle systems, repeated objects"
  ]
}])
```

---

## Architecture

The agent follows **BU1.2-Efficient** mode:

### Core Protocols

1. **Autonomous Completion**: Never stop until 100% solved
2. **Root Cause Engineering**: Fix diseases, not symptoms
3. **Research First**: Always research before implementation (MANDATORY)
4. **Comprehensive Testing**: Unit, integration, visual, performance
5. **Human Approval**: Always ask before commits/PRs
6. **Continuous Learning**: Store patterns in memory graph

### Workflow Pattern

```
Research → Implement → Test → Approve → Commit → Review → Complete
   ↓           ↓         ↓       ↓         ↓        ↓         ↓
Mandatory   Root     100%    Human    Only    Create   After
            Cause    Pass     "yes"    then     PR     merge
```

---

## Troubleshooting

### Agent Not Responding

1. Check MCP servers are running
2. Verify configuration in `claude_desktop_config.json`
3. Check logs: `~/Library/Logs/Claude/mcp.log`
4. Restart Claude Desktop / VS Code

### Tests Failing

```bash
# Run tests in CI mode
npm run test:ci -- __tests__/3d-creator-agent.test.ts

# Watch mode (may cause EMFILE errors)
npm test -- __tests__/3d-creator-agent.test.ts
```

### MCP Tools Not Working

See `MCP_TOOLS_SETUP.md` → Troubleshooting section

---

## Resources

### Documentation
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [drei Helpers](https://drei.docs.pmnd.rs)
- [Model Context Protocol](https://modelcontextprotocol.io/)

### Community
- [Three.js Discourse](https://discourse.threejs.org/)
- [R3F Discord](https://discord.gg/poimandres)
- [MCP GitHub](https://github.com/modelcontextprotocol)

### Tools
- [Poly Haven](https://polyhaven.com/) - Free 3D assets
- [Sketchfab](https://sketchfab.com/) - 3D model library
- [Hyper3D Rodin](https://hyperhuman.top/rodin) - AI 3D generation

---

## Summary

The 3D Creator Agent represents the convergence of AI reasoning and 3D creative expertise. By understanding both technical implementation and the visual/spatial language of creators, it enables:

✅ Rapid iteration on 3D scenes  
✅ Intelligent performance optimization  
✅ Seamless translation of creative vision to code  
✅ Comprehensive testing and validation  
✅ Root cause solutions (no technical debt)  
✅ Autonomous operation until 100% complete  
✅ Human oversight via approval protocol  

**Ready to create immersive 3D experiences! 🚀**

---

**Version**: 1.0.0  
**Mode**: BU1.2-Efficient  
**Test Coverage**: 45/45 tests passing (100%)  
**Frameworks**: Three.js v0.182.0, React Three Fiber v9.5.0  
**Project**: animated-portfolio  
