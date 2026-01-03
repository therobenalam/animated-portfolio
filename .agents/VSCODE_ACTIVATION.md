# Activating the 3D Creator Agent in VS Code

## ✅ Installation Complete

The **3D Creator** agent has been installed to:
```
~/Library/Application Support/Code/User/agents/3d-creator.agent.md
```

---

## 🚀 How to Activate

### Method 1: Agent Picker (Recommended)

1. Open VS Code in this project
2. Open the Command Palette (`Cmd+Shift+P`)
3. Type: **"GitHub Copilot: Select Agent"**
4. Choose: **"3D Creator"**
5. Start using it in the chat!

### Method 2: Direct Reference

In GitHub Copilot Chat, prefix your message with `@3d-creator`:

```
@3d-creator Add a rotating holographic cube with iridescent edges to the scene
```

---

## 💬 Example Usage

### Simple Object Addition
```
@3d-creator Add a floating sphere with chrome material and soft glow
```

**Expected Response:**
```
[3D Creator Agent] Creating floating chrome sphere...

Implementation:
- Created FloatingSphere component with useFrame animation
- Applied MeshStandardMaterial (metalness: 0.9, roughness: 0.1)
- Added emissive glow (intensity: 0.3)
- Floating animation: sine wave (amplitude: 0.5, period: 3s)
- Performance: 60fps maintained
- Tests: 8/8 passed (100%)

Files:
- components/3d/FloatingSphere.tsx (new)
- tests/FloatingSphere.test.tsx (new)

🚨 Ready to commit and create PR? (yes/no)
```

### Performance Optimization
```
@3d-creator The scene is running at 30fps on my laptop. Can you optimize it?
```

**Expected Response:**
```
[3D Creator Agent] Profiling scene performance...

Analysis:
- Current FPS: 30fps (target: 60fps)
- Draw calls: 456 (should be <100)
- Root cause: Individual mesh instances for 400+ particles

Solution:
- Implementing geometry instancing
- Result: 456 → 2 draw calls
- FPS: 30fps → 62fps (107% improvement)

Tests: 15/15 passed (100%)
🚨 Ready to commit? (yes/no)
```

### Custom Shader
```
@3d-creator Create a holographic scan effect shader that sweeps vertically
```

**Expected Response:**
```
[3D Creator Agent] Researching holographic scan techniques...

Implementation:
- Custom GLSL vertex/fragment shaders
- Fresnel effect for edge glow
- Animated scan plane (world Y-axis)
- RGB offset for chromatic aberration
- Uniforms: scanSpeed, scanWidth, glowIntensity

Tests: 12/12 passed (100%)
🚨 Ready to commit? (yes/no)
```

---

## 🎯 What the Agent Can Do

### Core Capabilities
- ✅ Three.js scene development
- ✅ React Three Fiber components
- ✅ GLTF/GLB model loading & optimization
- ✅ Custom GLSL shader development
- ✅ Animation systems (useFrame, GSAP, scroll)
- ✅ Performance optimization (instancing, LOD)
- ✅ Material design (PBR, custom shaders)
- ✅ Lighting architecture
- ✅ Comprehensive testing (unit, integration, visual)

### Visual-First Communication
The agent understands creative intent:

✅ **Good**: "Create minimalist scene with chrome spheres using soft indirect lighting"  
❌ **Bad**: "Create a 3D scene"

✅ **Good**: "Add iridescent material shifting from blue to purple based on angle"  
❌ **Bad**: "Add material"

### Performance Targets
- Desktop: 60 fps minimum
- Mobile: 30-60 fps target
- Draw calls: <100
- Triangles: 500k (mobile), 2M (desktop)

---

## 📋 Workflow

The agent follows this pattern:

```
1. Research best practices (Perplexity)
2. Implement with root cause solutions
3. Write comprehensive tests
4. Run tests → 100% pass required
5. Display test summary + changed files
6. Ask: "🚨 Ready to commit and create PR? (yes/no)"
7. Wait for your explicit "yes"
8. Only then: commit and create PR
```

**CRITICAL**: The agent will **NEVER** commit automatically. It always asks for approval.

---

## 🛠️ MCP Tools Integration

The agent works best with these MCP tools installed:

### Already Available (From Your Setup)
- ✅ `filesystem` - File operations
- ✅ `git` - Version control
- ✅ `perplexity` - Research

### Recommended to Add
- **mcp-three** - Convert GLTF/GLB → React Three Fiber JSX
- **blender-mcp** - AI-powered 3D modeling
- **search-tools-mcp** - Semantic code search

See [MCP_TOOLS_SETUP.md](./MCP_TOOLS_SETUP.md) for installation instructions.

---

## 🧪 Testing the Agent

After activating, try this:

```
@3d-creator Can you analyze the BrainModel component and suggest optimizations?
```

The agent should:
1. Read the BrainModel.tsx file
2. Analyze performance characteristics
3. Identify optimization opportunities
4. Suggest specific improvements with code

---

## 📚 Full Documentation

- **Configuration**: [3d-creator-agent.json](./3d-creator-agent.json)
- **Complete Instructions**: [3D-CREATOR-INSTRUCTIONS.md](./3D-CREATOR-INSTRUCTIONS.md)
- **MCP Setup**: [MCP_TOOLS_SETUP.md](./MCP_TOOLS_SETUP.md)
- **Project README**: [README.md](./README.md)

---

## 🎓 Key Features

### 1. Autonomous Operation
Works until 100% complete:
- Makes intelligent decisions at each stage
- Auto-debugs failing tests
- Iterates until all success criteria met
- Only stops for human approval

### 2. Root Cause Engineering
Always fixes underlying issues:
- No `@ts-ignore` suppressions
- No empty try-catch blocks
- No temporary workarounds
- Long-term, sustainable solutions

### 3. Performance-Aware
Every decision considers FPS impact:
- Profiling before optimization
- Instancing for repeated objects
- LOD systems for distant objects
- Texture compression
- Shadow optimization

### 4. Visual Intelligence
Understands spatial and creative concepts:
- Translates visual descriptions to code
- Proper material/lighting setups
- Animation timing and feel
- Shader effects from descriptions

---

## ⚡ Quick Reference

### Common Commands

**Add Object:**
```
@3d-creator Add [description] to the scene
```

**Optimize:**
```
@3d-creator Optimize the scene for mobile performance
```

**Create Shader:**
```
@3d-creator Create a [effect] shader
```

**Fix Issue:**
```
@3d-creator The [component] has [issue]. Can you fix it?
```

**Analyze:**
```
@3d-creator Analyze [component] for performance bottlenecks
```

---

## 🔄 Switching Between Agents

You can use multiple agents in the same session:

```
@3d-creator Add a rotating cube
@entrepreneur Analyze the market for 3D web portfolios  
@3d-creator Optimize the cube rendering
```

Each agent has specialized knowledge for its domain.

---

## ✨ Summary

The **3D Creator** agent is now available in VS Code! 

**To activate:**
1. `Cmd+Shift+P` → "GitHub Copilot: Select Agent" → "3D Creator"
2. Or use `@3d-creator` in chat

**Capabilities:**
- Three.js scene development
- React Three Fiber components
- Custom shader development
- Performance optimization
- Comprehensive testing
- Visual-first communication

**Remember:**
- It speaks the language of creators (visual descriptions)
- Always asks approval before commits
- Works autonomously until 100% complete
- Fixes root causes, not symptoms

**Ready to create immersive 3D experiences! 🚀**
