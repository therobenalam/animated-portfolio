# MCP Tools Setup Guide for 3D Creator Agent

## Overview

This guide provides comprehensive instructions for setting up Model Context Protocol (MCP) servers that will enhance the 3D Creator Agent's capabilities. These tools enable the agent to interact with 3D modeling software, access documentation, perform semantic searches, and manage version control.

---

## Architecture

```
AI Agent (Claude Desktop / Cline)
    ↓
MCP Client (Built-in)
    ↓
MCP Servers (Multiple simultaneous connections)
    ↓
├─ Filesystem (file operations)
├─ Git (version control)
├─ MCP Three (GLTF → React Three Fiber)
├─ Blender MCP (3D modeling)
├─ Search Tools (code search)
├─ Vector Search (semantic search)
├─ Documentation Search (API reference)
├─ Perplexity (research)
└─ Specialized tools (as needed)
```

---

## Critical Priority Setup

### 1. Filesystem MCP Server

**Description:** Secure file operations for managing 3D assets, shaders, and configurations.

**Installation:**

```bash
# Using npx (no installation required)
npx @modelcontextprotocol/server-filesystem /path/to/your/project
```

**Configuration (Claude Desktop):**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/robenalam/Documents/animated-portfolio"
      ]
    }
  }
}
```

**Configuration (Cline/VS Code):**

Edit VS Code settings (`.vscode/settings.json`):

```json
{
  "mcp.servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${workspaceFolder}"
      ]
    }
  }
}
```

**Capabilities:**
- Read files (GLSL shaders, configs, components)
- Write files (new shaders, components)
- Create directories
- List directory contents
- Move/rename files
- Delete files (with safety checks)

**Use Cases for 3D Agent:**
- Reading/writing GLSL shader files
- Managing GLB/GLTF model files
- Updating component files
- Managing texture assets
- Creating new 3D component files

---

### 2. Git MCP Server

**Description:** Comprehensive version control for code and 3D assets.

**Installation:**

```bash
npm install -g git-mcp-server
```

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "git": {
      "command": "git-mcp-server",
      "args": []
    }
  }
}
```

**Configuration (Cline/VS Code):**

```json
{
  "mcp.servers": {
    "git": {
      "command": "git-mcp-server",
      "args": ["${workspaceFolder}"]
    }
  }
}
```

**Capabilities:**
- Read repository contents
- Search code patterns
- Create commits
- Manage branches
- Create pull requests
- View commit history
- Check repository status

**Use Cases for 3D Agent:**
- Committing shader changes
- Tracking 3D model file versions
- Creating PRs for new 3D features
- Searching for similar implementations
- Managing feature branches

---

## High Priority Setup

### 3. MCP Three Server

**Description:** Convert GLTF/GLB 3D models to React Three Fiber JSX components.

**Installation:**

```bash
git clone https://github.com/basementstudio/mcp-three.git
cd mcp-three
npm install
npm run build
```

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "mcp-three": {
      "command": "node",
      "args": ["/path/to/mcp-three/dist/index.js"]
    }
  }
}
```

**Capabilities:**
- **gltfjsx**: Convert GLTF/GLB to React Three Fiber JSX
  - TypeScript definitions generation
  - Mesh and material instancing
  - Texture format conversion
  - Mesh simplification
  - Bone layout preparation
- **get-model-structure**: Analyze 3D model hierarchy
  - Return JSON structure of model
  - Identify meshes, materials, animations
  - Debug complex models

**Use Cases for 3D Agent:**
- Converting downloaded 3D models to React components
- Analyzing model structure before integration
- Optimizing model organization
- Generating TypeScript types for models

---

### 4. Blender MCP Server

**Description:** Direct integration with Blender for AI-powered 3D modeling.

**Installation:**

```bash
git clone https://github.com/ahujasid/blender-mcp.git
cd blender-mcp
npm install
npm run build
```

**Requirements:**
- Blender 3.x or 4.x installed
- Python 3.10+

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "blender": {
      "command": "node",
      "args": ["/path/to/blender-mcp/dist/index.js"],
      "env": {
        "BLENDER_PATH": "/Applications/Blender.app/Contents/MacOS/Blender"
      }
    }
  }
}
```

**Capabilities:**
- Create 3D objects (cube, sphere, cylinder, etc.)
- Apply materials and textures
- Modify geometry
- Manage scenes
- Export to GLTF/GLB, OBJ, FBX
- Access Poly Haven API (textures, HDRIs)
- **AI-powered generation via Hyper3D Rodin:**
  - Generate 3D models from text descriptions
  - Generate models from images
  - Professional-quality outputs

**Configuration for Hyper3D Rodin:**

Set API key in environment:
```bash
export HYPER3D_API_KEY="your-api-key-here"
```

Get API key: https://hyperhuman.top/rodin

**Use Cases for 3D Agent:**
- Creating custom 3D models from descriptions
- Rapid prototyping of 3D assets
- Applying materials procedurally
- Exporting optimized models for web
- Accessing high-quality textures from Poly Haven

---

### 5. Search Tools MCP Server

**Description:** Semantic code search using CodeRank algorithm.

**Installation:**

```bash
git clone https://github.com/voxmenthe/search-tools-mcp.git
cd search-tools-mcp
npm install
npm run build
```

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "search-tools": {
      "command": "node",
      "args": ["/path/to/search-tools-mcp/dist/index.js"]
    }
  }
}
```

**Capabilities:**
- Semantic code search (CodeRank-powered)
- Contextual keyword search with surrounding lines
- Importance-based result ranking
- Multi-file pattern discovery

**Use Cases for 3D Agent:**
- Finding shader implementations across codebase
- Locating Three.js usage patterns
- Discovering React Three Fiber component examples
- Searching for optimization techniques
- Identifying similar 3D features

---

## Medium Priority Setup

### 6. Vector Search MCP Server

**Description:** Semantic search across knowledge base using embeddings.

**Installation:**

```bash
git clone https://github.com/omarguzmanm/mcp-server-vector-search.git
cd mcp-server-vector-search
npm install
npm run build
```

**Requirements:**
- Neo4j database (for knowledge graph)
- OpenAI API key (for embeddings)

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "vector-search": {
      "command": "node",
      "args": ["/path/to/mcp-server-vector-search/dist/index.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "your-password",
        "OPENAI_API_KEY": "your-openai-key"
      }
    }
  }
}
```

**Setup Neo4j:**

```bash
# Using Docker
docker run -d \
  --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/your-password \
  neo4j:latest
```

**Capabilities:**
- Index code, documentation, patterns as vectors
- Semantic similarity search
- Natural language queries
- Context-aware results

**Use Cases for 3D Agent:**
- "Find shader patterns that create iridescent effects"
- "Locate previous implementations of character animation"
- "Search for optimization patterns in similar projects"
- "Find material definitions with metallic properties"

---

### 7. Documentation Search MCP Server

**Description:** Access Three.js, React Three Fiber, and library documentation.

**Installation:**

```bash
# Install documentation search server
npm install -g @documentation/mcp-server
```

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "docs": {
      "command": "documentation-mcp-server",
      "args": [
        "--sources",
        "threejs,react-three-fiber,drei,gsap"
      ]
    }
  }
}
```

**Capabilities:**
- Query Three.js API documentation
- Access React Three Fiber guides
- Search drei helper library docs
- Find GSAP animation references

**Use Cases for 3D Agent:**
- Checking Three.js API parameters
- Verifying React Three Fiber patterns
- Finding drei helper documentation
- Looking up shader material properties

---

### 8. Perplexity MCP Server

**Description:** Real-time research using Perplexity AI.

**Installation:**

Already available in your MCP setup (perplexity MCP is active).

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "your-perplexity-api-key"
      }
    }
  }
}
```

Get API key: https://www.perplexity.ai/settings/api

**Capabilities:**
- Real-time web research
- Technical documentation lookup
- Emerging pattern discovery
- Performance optimization research

**Use Cases for 3D Agent:**
- Researching latest Three.js optimization techniques
- Finding WebGL best practices
- Discovering new shader techniques
- Understanding complex 3D concepts

---

## Specialized Tools (Optional)

### 9. Shaderc-VkRunner MCP Server

**Description:** Shader development and testing sandbox with CPU-emulated Vulkan.

**Installation:**

```bash
git clone https://github.com/shader-mcp/shaderc-vkrunner.git
cd shaderc-vkrunner
npm install
npm run build
```

**Capabilities:**
- Develop Vulkan shaders safely
- Compile GLSL/HLSL shaders
- Test shaders in CPU-emulated environment
- Debug shader compilation errors

**Use Cases for 3D Agent:**
- Testing shader syntax before deployment
- Experimenting with advanced GPU features
- Learning Vulkan shader techniques
- Debugging complex shader code

---

### 10. Sketchfab MCP Server

**Description:** Access Sketchfab's library of 3D models.

**Installation:**

```bash
git clone https://github.com/gregkop/sketchfab-mcp.git
cd sketchfab-mcp
npm install
npm run build
```

**Configuration (Claude Desktop):**

```json
{
  "mcpServers": {
    "sketchfab": {
      "command": "node",
      "args": ["/path/to/sketchfab-mcp/dist/index.js"],
      "env": {
        "SKETCHFAB_API_KEY": "your-sketchfab-api-key"
      }
    }
  }
}
```

Get API key: https://sketchfab.com/settings/password

**Capabilities:**
- Search 3D models by keyword
- Filter by license, format, animation
- Download models
- View model metadata

**Use Cases for 3D Agent:**
- Finding reference models
- Sourcing assets for rapid prototyping
- Browsing community creations
- Discovering inspiration

---

## Complete Configuration Example

Here's a complete `claude_desktop_config.json` with all recommended tools:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/robenalam/Documents/animated-portfolio"
      ]
    },
    "git": {
      "command": "git-mcp-server",
      "args": []
    },
    "mcp-three": {
      "command": "node",
      "args": ["/path/to/mcp-three/dist/index.js"]
    },
    "blender": {
      "command": "node",
      "args": ["/path/to/blender-mcp/dist/index.js"],
      "env": {
        "BLENDER_PATH": "/Applications/Blender.app/Contents/MacOS/Blender",
        "HYPER3D_API_KEY": "your-hyper3d-key"
      }
    },
    "search-tools": {
      "command": "node",
      "args": ["/path/to/search-tools-mcp/dist/index.js"]
    },
    "vector-search": {
      "command": "node",
      "args": ["/path/to/mcp-server-vector-search/dist/index.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "your-neo4j-password",
        "OPENAI_API_KEY": "your-openai-key"
      }
    },
    "docs": {
      "command": "documentation-mcp-server",
      "args": [
        "--sources",
        "threejs,react-three-fiber,drei,gsap"
      ]
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "your-perplexity-key"
      }
    }
  }
}
```

---

## Testing Your Setup

### 1. Test Filesystem Access

In Claude Desktop or Cline, ask:
```
Can you list the files in the components/3d directory?
```

Expected: List of 3D component files.

### 2. Test Git Integration

```
What's the current git status of this project?
```

Expected: Current branch, uncommitted changes, etc.

### 3. Test MCP Three

```
Analyze the structure of /public/models/brain.glb
```

Expected: JSON structure showing meshes, materials, hierarchy.

### 4. Test Blender MCP

```
Create a simple sphere in Blender and export it as GLTF
```

Expected: Blender opens, sphere created, GLTF file generated.

### 5. Test Search Tools

```
Find all implementations of useFrame in this codebase
```

Expected: List of files with useFrame usage, ranked by importance.

---

## Troubleshooting

### Filesystem Server Not Working

**Issue:** "Permission denied" or "Cannot access file"

**Solution:**
- Check file paths are correct
- Ensure MCP server has read/write permissions
- Verify workspace folder path in config

### Git Server Not Connecting

**Issue:** "Git command not found"

**Solution:**
```bash
# Ensure git is installed
git --version

# Install if needed (macOS)
xcode-select --install
```

### Blender MCP Issues

**Issue:** "Blender executable not found"

**Solution:**
```bash
# Find Blender path
which blender

# Or on macOS
ls /Applications/Blender.app/Contents/MacOS/Blender

# Update BLENDER_PATH in config
```

### Vector Search Not Starting

**Issue:** Neo4j connection failed

**Solution:**
```bash
# Check Neo4j is running
docker ps | grep neo4j

# Start if needed
docker start neo4j

# Check connection
curl http://localhost:7474
```

### MCP Server Crashes

**Issue:** Server stops responding

**Solution:**
1. Restart Claude Desktop / VS Code
2. Check logs in `~/Library/Logs/Claude/mcp.log`
3. Verify all dependencies installed: `npm install` in server directory
4. Check for port conflicts

---

## Performance Optimization

### Reduce Startup Time

Only enable servers you actively use. Comment out unused servers:

```json
{
  "mcpServers": {
    "filesystem": { ... },
    "git": { ... },
    // "sketchfab": { ... },  // Disabled - not frequently used
    "mcp-three": { ... }
  }
}
```

### Memory Management

If experiencing high memory usage:
- Limit vector search index size
- Reduce concurrent MCP connections
- Close unused servers

### Network Optimization

For remote MCP servers:
- Use local caching
- Implement request batching
- Set appropriate timeouts

---

## Security Considerations

### API Keys

Store API keys securely:
```bash
# Use environment variables
export HYPER3D_API_KEY="your-key"

# Or macOS Keychain
security add-generic-password -a "$USER" -s "hyper3d" -w "your-key"
```

### File Access

Limit filesystem server to project directory only:
```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/robenalam/Documents/animated-portfolio"  // Specific path only
    ]
  }
}
```

### Git Operations

Review commits before pushing:
- Always use approval workflow
- Check git status before commits
- Review diffs before PRs

---

## Advanced Workflows

### Workflow 1: Model Import Pipeline

```
1. User: "Download model from Sketchfab and integrate it"
2. Agent: Use Sketchfab MCP → Download model
3. Agent: Use MCP Three → Convert to React Three Fiber component
4. Agent: Use Filesystem MCP → Save component file
5. Agent: Use Git MCP → Commit changes (after approval)
```

### Workflow 2: Shader Development

```
1. User: "Create holographic scan shader"
2. Agent: Use Perplexity MCP → Research shader techniques
3. Agent: Use Search Tools MCP → Find similar implementations
4. Agent: Use Filesystem MCP → Create shader files
5. Agent: Use Shaderc MCP → Test shader compilation
6. Agent: Use Git MCP → Commit shader (after approval)
```

### Workflow 3: Performance Optimization

```
1. User: "Optimize scene performance"
2. Agent: Use Search Tools MCP → Find bottleneck patterns
3. Agent: Use Vector Search MCP → Retrieve optimization solutions
4. Agent: Use Filesystem MCP → Update component files
5. Agent: Use Perplexity MCP → Research advanced techniques
6. Agent: Use Git MCP → Commit optimizations (after approval)
```

---

## Maintenance

### Update MCP Servers

```bash
# Update npm-based servers
cd /path/to/mcp-server
git pull
npm install
npm run build

# Update npx-based servers (automatic)
npx @modelcontextprotocol/server-filesystem  # Auto-updates
```

### Monitor Server Health

```bash
# Check MCP logs
tail -f ~/Library/Logs/Claude/mcp.log

# Check server processes
ps aux | grep mcp

# Monitor resource usage
top -o cpu | grep node
```

### Backup Configuration

```bash
# Backup Claude Desktop config
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json \
   ~/Documents/animated-portfolio/.agents/claude_desktop_config.backup.json
```

---

## Resources

### Official Documentation
- MCP Specification: https://modelcontextprotocol.io/
- Three.js Docs: https://threejs.org/docs/
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Blender API: https://docs.blender.org/api/current/

### Community
- MCP GitHub: https://github.com/modelcontextprotocol
- Three.js Discourse: https://discourse.threejs.org/
- R3F Discord: https://discord.gg/poimandres

### Tools
- Hyper3D Rodin: https://hyperhuman.top/rodin
- Poly Haven: https://polyhaven.com/
- Sketchfab: https://sketchfab.com/

---

## Summary

With these MCP tools configured, the 3D Creator Agent can:

✅ **Manage Files:** Read/write shaders, models, components  
✅ **Version Control:** Commit changes, create PRs, track history  
✅ **Convert Models:** GLTF → React Three Fiber components  
✅ **Create 3D Assets:** Generate models with Blender + AI  
✅ **Search Code:** Find patterns semantically across codebase  
✅ **Access Knowledge:** Query indexed design patterns and solutions  
✅ **Research:** Real-time lookup of optimization techniques  
✅ **Test Shaders:** Safe shader development and compilation  

This comprehensive toolkit enables autonomous, intelligent 3D development workflows with minimal human intervention required.

**Next Steps:**
1. Install critical priority tools (filesystem, git)
2. Install high priority tools (mcp-three, blender-mcp)
3. Configure API keys where needed
4. Test each tool with sample queries
5. Start building 3D experiences! 🚀
