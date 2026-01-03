import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

const AGENT_CONFIG_PATH = path.join(__dirname, '../.agents/3d-creator-agent.json');
const INSTRUCTIONS_PATH = path.join(__dirname, '../.agents/3D-CREATOR-INSTRUCTIONS.md');
const MCP_SETUP_PATH = path.join(__dirname, '../.agents/MCP_TOOLS_SETUP.md');

describe('3D Creator Agent Configuration', () => {
  let agentConfig: any;

  beforeAll(() => {
    const configContent = fs.readFileSync(AGENT_CONFIG_PATH, 'utf-8');
    agentConfig = JSON.parse(configContent);
  });

  test('should have valid agent configuration file', () => {
    expect(agentConfig).toBeDefined();
    expect(typeof agentConfig).toBe('object');
  });

  test('should have required metadata fields', () => {
    expect(agentConfig.name).toBe('3D-Creator');
    expect(agentConfig.version).toBe('1.0.0');
    expect(agentConfig.description).toContain('Three.js');
    expect(agentConfig.description).toContain('React Three Fiber');
    expect(agentConfig.mode).toBe('BU1.2-efficient');
  });

  test('should have comprehensive capabilities list', () => {
    expect(agentConfig.capabilities).toBeInstanceOf(Array);
    expect(agentConfig.capabilities.length).toBeGreaterThan(5);
    
    const expectedCapabilities = [
      'three_js_scene_development',
      'react_three_fiber_components',
      '3d_model_manipulation',
      'gltf_glb_loading_optimization',
      'shader_development',
      'animation_systems',
      'performance_optimization'
    ];
    
    expectedCapabilities.forEach(capability => {
      expect(agentConfig.capabilities).toContain(capability);
    });
  });

  test('should have expertise section with frameworks', () => {
    expect(agentConfig.expertise).toBeDefined();
    expect(agentConfig.expertise.frameworks).toBeInstanceOf(Array);
    
    const expectedFrameworks = ['Three.js', 'React Three Fiber', '@react-three/drei'];
    expectedFrameworks.forEach(framework => {
      expect(
        agentConfig.expertise.frameworks.some((f: string) => f.includes(framework))
      ).toBe(true);
    });
  });

  test('should have knowledge domains with proper structure', () => {
    expect(agentConfig.knowledge_domains).toBeDefined();
    
    const expectedDomains = [
      'scene_architecture',
      'react_three_fiber_patterns',
      'performance_optimization',
      'materials_and_lighting',
      'gltf_workflow',
      'animation_systems'
    ];
    
    expectedDomains.forEach(domain => {
      expect(agentConfig.knowledge_domains[domain]).toBeDefined();
      expect(agentConfig.knowledge_domains[domain].description).toBeDefined();
      expect(typeof agentConfig.knowledge_domains[domain].description).toBe('string');
    });
  });

  test('should have performance optimization targets', () => {
    const perfOptimization = agentConfig.knowledge_domains.performance_optimization;
    expect(perfOptimization).toBeDefined();
    expect(perfOptimization.targets).toBeDefined();
    expect(perfOptimization.targets.desktop).toContain('60 fps');
    expect(perfOptimization.targets.mobile).toContain('30-60 fps');
  });

  test('should have decision framework', () => {
    expect(agentConfig.decision_framework).toBeDefined();
    expect(agentConfig.decision_framework.when_to_use_vanilla_three).toBeInstanceOf(Array);
    expect(agentConfig.decision_framework.when_to_use_react_three_fiber).toBeInstanceOf(Array);
    expect(agentConfig.decision_framework.optimization_decision_tree).toBeDefined();
  });

  test('should have root cause engineering in prompting strategies', () => {
    expect(agentConfig.prompting_strategies).toBeDefined();
    expect(agentConfig.prompting_strategies.root_cause_engineering).toBeDefined();
    
    const rootCause = agentConfig.prompting_strategies.root_cause_engineering;
    expect(rootCause.principles).toBeInstanceOf(Array);
    expect(rootCause.principles.length).toBeGreaterThan(3);
    expect(rootCause.principles.some((p: string) => p.includes('root cause'))).toBe(true);
  });

  test('should have comprehensive MCP tools recommendations', () => {
    expect(agentConfig.recommended_mcp_tools).toBeInstanceOf(Array);
    expect(agentConfig.recommended_mcp_tools.length).toBeGreaterThan(5);
    
    const criticalTools = agentConfig.recommended_mcp_tools.filter(
      (tool: any) => tool.priority === 'critical'
    );
    expect(criticalTools.length).toBeGreaterThanOrEqual(2);
    
    // Check for essential tools
    const toolNames = agentConfig.recommended_mcp_tools.map((t: any) => t.name);
    expect(toolNames).toContain('filesystem');
    expect(toolNames).toContain('git');
    expect(toolNames).toContain('mcp-three');
    expect(toolNames).toContain('blender-mcp');
  });

  test('should have tool use cases for each MCP tool', () => {
    agentConfig.recommended_mcp_tools.forEach((tool: any) => {
      expect(tool.name).toBeDefined();
      expect(tool.provider).toBeDefined();
      expect(tool.description).toBeDefined();
      expect(tool.priority).toBeDefined();
      expect(tool.use_cases).toBeInstanceOf(Array);
      expect(tool.use_cases.length).toBeGreaterThan(0);
    });
  });

  test('should have workflow protocols', () => {
    expect(agentConfig.workflow_protocols).toBeDefined();
    expect(agentConfig.workflow_protocols.task_completion).toBeDefined();
    expect(agentConfig.workflow_protocols.autonomous_operation).toBeDefined();
    expect(agentConfig.workflow_protocols.greeting_detection).toBeDefined();
    
    const taskCompletion = agentConfig.workflow_protocols.task_completion;
    expect(taskCompletion.steps).toBeInstanceOf(Array);
    expect(taskCompletion.steps.length).toBeGreaterThanOrEqual(10);
    
    // Verify human approval step exists
    expect(
      taskCompletion.steps.some((step: string) => 
        step.toLowerCase().includes('human approval') || 
        step.toLowerCase().includes('ask human')
      )
    ).toBe(true);
    
    // Verify waiting for "yes" step exists
    expect(
      taskCompletion.steps.some((step: string) => 
        step.toLowerCase().includes('wait') && 
        step.toLowerCase().includes('yes')
      )
    ).toBe(true);
  });

  test('should have autonomous operation principles', () => {
    const autonomous = agentConfig.workflow_protocols.autonomous_operation;
    expect(autonomous.principles).toBeInstanceOf(Array);
    expect(
      autonomous.principles.some((p: string) => 
        p.toLowerCase().includes('100%') || 
        p.toLowerCase().includes('complete')
      )
    ).toBe(true);
  });

  test('should have testing requirements', () => {
    expect(agentConfig.testing_requirements).toBeDefined();
    expect(agentConfig.testing_requirements.unit_tests).toBeInstanceOf(Array);
    expect(agentConfig.testing_requirements.integration_tests).toBeInstanceOf(Array);
    expect(agentConfig.testing_requirements.visual_tests).toBeInstanceOf(Array);
    expect(agentConfig.testing_requirements.coverage_minimum).toBe('80%');
    expect(agentConfig.testing_requirements.pass_requirement).toContain('100%');
  });

  test('should have security considerations', () => {
    expect(agentConfig.security_considerations).toBeDefined();
    expect(agentConfig.security_considerations.sandbox_requirements).toBeInstanceOf(Array);
    expect(agentConfig.security_considerations.validation).toBeInstanceOf(Array);
    
    const sandboxReqs = agentConfig.security_considerations.sandbox_requirements;
    expect(sandboxReqs.some((req: string) => req.toLowerCase().includes('isolated'))).toBe(true);
  });

  test('should have example workflows', () => {
    expect(agentConfig.example_workflows).toBeDefined();
    expect(agentConfig.example_workflows.add_3d_object).toBeDefined();
    expect(agentConfig.example_workflows.optimize_scene).toBeDefined();
    expect(agentConfig.example_workflows.create_custom_shader).toBeDefined();
    
    Object.values(agentConfig.example_workflows).forEach((workflow: any) => {
      expect(workflow.description).toBeDefined();
      expect(workflow.steps).toBeInstanceOf(Array);
      expect(workflow.steps.length).toBeGreaterThan(5);
    });
  });

  test('should have communication style guidelines', () => {
    expect(agentConfig.communication_style).toBeDefined();
    expect(agentConfig.communication_style.announcements).toBeInstanceOf(Array);
    expect(agentConfig.communication_style.status_updates).toBeInstanceOf(Array);
    
    const announcements = agentConfig.communication_style.announcements;
    expect(
      announcements.some((a: string) => a.includes('[3D Creator Agent]'))
    ).toBe(true);
  });

  test('should have continuous learning section', () => {
    expect(agentConfig.continuous_learning).toBeDefined();
    expect(agentConfig.continuous_learning.description).toBeDefined();
    expect(agentConfig.continuous_learning.patterns).toBeInstanceOf(Array);
  });
});

describe('3D Creator Agent Instructions Document', () => {
  let instructionsContent: string;

  beforeAll(() => {
    instructionsContent = fs.readFileSync(INSTRUCTIONS_PATH, 'utf-8');
  });

  test('should have instructions document', () => {
    expect(instructionsContent).toBeDefined();
    expect(instructionsContent.length).toBeGreaterThan(1000);
  });

  test('should contain core sections', () => {
    const expectedSections = [
      '## Agent Identity',
      '## Core Philosophy',
      '## Technical Expertise',
      '## Communication & Terminology',
      '## Decision Frameworks',
      '## Workflows & Protocols',
      '## Testing Requirements',
      '## Example Workflows',
      '## Recommended MCP Tools',
      '## Code Examples'
    ];
    
    expectedSections.forEach(section => {
      expect(instructionsContent).toContain(section);
    });
  });

  test('should contain Three.js specific guidance', () => {
    expect(instructionsContent).toContain('Three.js');
    expect(instructionsContent).toContain('React Three Fiber');
    expect(instructionsContent).toContain('useFrame');
    expect(instructionsContent).toContain('Canvas');
    expect(instructionsContent).toContain('PBR');
  });

  test('should contain performance optimization guidance', () => {
    expect(instructionsContent).toContain('60 fps');
    expect(instructionsContent).toContain('draw calls');
    expect(instructionsContent).toContain('instancing');
    expect(instructionsContent).toContain('LOD');
  });

  test('should contain root cause engineering principles', () => {
    expect(instructionsContent).toContain('Root Cause Engineering');
    expect(instructionsContent).toContain('NEVER take shortcuts');
    expect(instructionsContent).toContain('fix root causes');
  });

  test('should contain autonomous operation protocol', () => {
    expect(instructionsContent).toContain('Autonomous Operation Protocol');
    expect(instructionsContent).toContain('100% solved');
    expect(instructionsContent).toContain('NEVER STOP');
  });

  test('should contain human approval requirements', () => {
    expect(instructionsContent).toContain('NO COMMITS WITHOUT APPROVAL');
    expect(instructionsContent).toContain('WAIT FOR EXPLICIT "YES"');
    expect(instructionsContent).toContain('Ready to commit and create PR');
  });

  test('should contain code examples', () => {
    expect(instructionsContent).toContain('```typescript');
    expect(instructionsContent).toContain('```tsx');
    expect(instructionsContent).toMatch(/useFrame|Canvas|useGLTF/);
  });

  test('should contain shader examples', () => {
    expect(instructionsContent).toContain('shader');
    expect(instructionsContent).toContain('GLSL');
    expect(instructionsContent).toMatch(/vertexShader|fragmentShader/);
  });

  test('should contain material and lighting guidance', () => {
    expect(instructionsContent).toContain('MeshStandardMaterial');
    expect(instructionsContent).toContain('metalness');
    expect(instructionsContent).toContain('roughness');
    expect(instructionsContent).toContain('DirectionalLight');
  });
});

describe('MCP Tools Setup Guide', () => {
  let setupContent: string;

  beforeAll(() => {
    setupContent = fs.readFileSync(MCP_SETUP_PATH, 'utf-8');
  });

  test('should have setup guide document', () => {
    expect(setupContent).toBeDefined();
    expect(setupContent.length).toBeGreaterThan(1000);
  });

  test('should contain setup sections for each MCP tool', () => {
    const expectedTools = [
      'Filesystem MCP Server',
      'Git MCP Server',
      'MCP Three Server',
      'Blender MCP Server',
      'Search Tools MCP Server',
      'Vector Search',
      'Perplexity'
    ];
    
    expectedTools.forEach(tool => {
      expect(setupContent).toContain(tool);
    });
  });

  test('should contain installation instructions', () => {
    expect(setupContent).toContain('Installation:');
    expect(setupContent).toContain('npm install');
    expect(setupContent).toContain('Configuration');
  });

  test('should contain configuration examples', () => {
    expect(setupContent).toContain('claude_desktop_config.json');
    expect(setupContent).toContain('"mcpServers"');
    expect(setupContent).toContain('"command"');
    expect(setupContent).toContain('"args"');
  });

  test('should contain use cases for each tool', () => {
    expect(setupContent).toContain('Use Cases');
    expect(setupContent).toMatch(/Use Cases for 3D Agent:/);
  });

  test('should contain troubleshooting section', () => {
    expect(setupContent).toContain('Troubleshooting');
    expect(setupContent).toContain('Issue:');
    expect(setupContent).toContain('Solution:');
  });

  test('should contain security considerations', () => {
    expect(setupContent).toContain('Security');
    expect(setupContent).toContain('API Keys');
    expect(setupContent).toContain('File Access');
  });

  test('should contain example workflows', () => {
    expect(setupContent).toMatch(/Workflow \d+:/);
    expect(setupContent).toContain('Agent:');
  });

  test('should contain complete configuration example', () => {
    expect(setupContent).toContain('Complete Configuration Example');
    expect(setupContent).toContain('filesystem');
    expect(setupContent).toContain('git');
    expect(setupContent).toContain('mcp-three');
  });

  test('should contain testing instructions', () => {
    expect(setupContent).toContain('Testing Your Setup');
    expect(setupContent).toContain('Expected:');
  });
});

describe('Agent Integration with Project', () => {
  test('should have agent directory', () => {
    const agentDir = path.join(__dirname, '../.agents');
    expect(fs.existsSync(agentDir)).toBe(true);
  });

  test('should have all required agent files', () => {
    const requiredFiles = [
      '3d-creator-agent.json',
      '3D-CREATOR-INSTRUCTIONS.md',
      'MCP_TOOLS_SETUP.md'
    ];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, '../.agents', file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have valid JSON structure in config', () => {
    expect(() => {
      const content = fs.readFileSync(AGENT_CONFIG_PATH, 'utf-8');
      JSON.parse(content);
    }).not.toThrow();
  });

  test('agent config should align with project dependencies', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
    );
    
    const agentConfig = JSON.parse(
      fs.readFileSync(AGENT_CONFIG_PATH, 'utf-8')
    );
    
    // Check that frameworks listed in agent match package.json
    const frameworks = agentConfig.expertise.frameworks;
    
    // Three.js version should match
    const threeFramework = frameworks.find((f: string) => f.includes('Three.js'));
    expect(threeFramework).toBeDefined();
    
    if (packageJson.dependencies.three) {
      const threeVersion = packageJson.dependencies.three.replace('^', '');
      expect(threeFramework).toContain(threeVersion.split('.')[0]); // Major version match
    }
    
    // R3F should be present
    expect(frameworks.some((f: string) => f.includes('React Three Fiber'))).toBe(true);
    expect(packageJson.dependencies['@react-three/fiber']).toBeDefined();
  });

  test('agent should reference existing 3D components', () => {
    const instructionsContent = fs.readFileSync(INSTRUCTIONS_PATH, 'utf-8');
    
    // Check references to actual project components
    const componentRefs = [
      'BrainModel',
      'Scene'
    ];
    
    componentRefs.forEach(component => {
      expect(instructionsContent).toContain(component);
    });
  });
});

describe('Agent Capabilities Validation', () => {
  let agentConfig: any;

  beforeAll(() => {
    const configContent = fs.readFileSync(AGENT_CONFIG_PATH, 'utf-8');
    agentConfig = JSON.parse(configContent);
  });

  test('should have capabilities matching project needs', () => {
    const capabilities = agentConfig.capabilities;
    
    // This project has brain models, so agent should handle model manipulation
    expect(capabilities).toContain('3d_model_manipulation');
    expect(capabilities).toContain('gltf_glb_loading_optimization');
    
    // Project uses animations
    expect(capabilities).toContain('animation_systems');
    
    // Performance is critical for web 3D
    expect(capabilities).toContain('performance_optimization');
    
    // Project uses custom materials
    expect(capabilities).toContain('material_design');
  });

  test('should have knowledge of project-specific patterns', () => {
    const patterns = agentConfig.knowledge_domains.react_three_fiber_patterns.patterns;
    
    // Patterns used in this project
    expect(patterns).toContain('Canvas component as scene wrapper');
    expect(patterns).toContain('useFrame hook for animation loops');
    expect(patterns).toContain('Suspense with fallback for async loading');
  });

  test('should have optimization targets appropriate for project', () => {
    const targets = agentConfig.knowledge_domains.performance_optimization.targets;
    
    expect(targets.desktop).toBeDefined();
    expect(targets.mobile).toBeDefined();
    expect(parseInt(targets.desktop)).toBeGreaterThanOrEqual(60); // Desktop should target 60fps
  });
});
