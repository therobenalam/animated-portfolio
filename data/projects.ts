export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'ai' | 'engineering';
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  brainZone?: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Neural Agent Framework',
    description:
      'Autonomous AI agent orchestration platform with multi-model routing, tool use, and long-term memory.',
    longDescription:
      'A production-grade autonomous agent platform designed to orchestrate multiple AI models in parallel. ' +
      'Features intelligent task routing across GPT-4, Claude, and open-source models based on task complexity ' +
      'and cost constraints. Implements a persistent memory layer using Supabase pgvector for long-term context ' +
      'retention across sessions. The tool-use system supports 40+ integrations including code execution, web ' +
      'browsing, file manipulation, and API calls. Built with a modular pipeline architecture that allows agents ' +
      'to self-improve through reflection loops and automated evaluation.',
    techStack: ['TypeScript', 'Python', 'LangChain', 'OpenAI', 'Supabase'],
    category: 'ai',
    brainZone: 'zone-frontal',
  },
  {
    id: 'project-2',
    title: 'RAG Knowledge Engine',
    description:
      'Retrieval-augmented generation pipeline with vector search, document chunking, and contextual re-ranking.',
    longDescription:
      'An end-to-end RAG system that processes documents from multiple sources (PDF, HTML, Markdown, code) into ' +
      'semantically chunked vectors stored in FAISS and PostgreSQL. Features a custom re-ranking model trained on ' +
      'domain-specific relevance data, achieving 23% improvement in retrieval precision over baseline BM25. The ' +
      'pipeline supports streaming responses with citation tracking, enabling users to verify every claim against ' +
      'source material. Deployed as a FastAPI service with a React frontend for interactive document exploration.',
    techStack: ['Python', 'FAISS', 'PostgreSQL', 'FastAPI', 'React'],
    category: 'ai',
    brainZone: 'zone-temporal-left',
  },
  {
    id: 'project-3',
    title: 'Real-Time Data Dashboard',
    description:
      'Full-stack analytics dashboard with WebSocket streams, interactive 3D charts, and anomaly detection.',
    longDescription:
      'A real-time analytics platform visualizing high-frequency data streams across multiple dimensions. Built ' +
      'with WebSocket connections to process 10k+ events/second, rendering interactive 3D scatter plots and heatmaps ' +
      'using Three.js and D3. Features an ML-based anomaly detection module that flags statistical outliers in ' +
      'real-time using isolation forests. The backend runs on Node.js with Redis pub/sub for horizontal scaling. ' +
      'Includes configurable alert thresholds, historical replay, and export to CSV/JSON.',
    techStack: ['Next.js', 'Three.js', 'D3', 'Node.js', 'Redis'],
    category: 'engineering',
    brainZone: 'zone-parietal',
  },
  {
    id: 'project-4',
    title: 'Model Fine-Tuning Pipeline',
    description:
      'End-to-end LLM fine-tuning workflow with dataset curation, LoRA training, evaluation, and deployment.',
    longDescription:
      'A comprehensive fine-tuning infrastructure for large language models. Manages the full lifecycle from dataset ' +
      'curation (cleaning, deduplication, quality scoring) through LoRA/QLoRA training with automated hyperparameter ' +
      'sweeps. Evaluation harness covers perplexity, task-specific benchmarks, and human preference alignment. ' +
      'Models are packaged as versioned artifacts with inference-optimized GGUF quantization and deployed via ' +
      'vLLM on AWS with auto-scaling. Reduced training costs by 60% compared to full fine-tuning while maintaining ' +
      '95% of performance.',
    techStack: ['Python', 'PyTorch', 'Hugging Face', 'AWS', 'Docker'],
    category: 'ai',
    brainZone: 'zone-temporal-right',
  },
  {
    id: 'project-5',
    title: 'AI Portfolio (This Site)',
    description:
      'Interactive 3D neural brain visualization built as a portfolio — the site you\'re viewing right now.',
    longDescription:
      'A single-page interactive portfolio featuring a 177-node neural brain visualization as the central navigation ' +
      'hub. Built with React Three Fiber, the brain renders in real-time with instanced meshes, custom GLSL shaders ' +
      'for pulsing effects, and raycasting for zone-based hover interactions. Five AI-themed navigation labels orbit ' +
      'the brain as clickable portals. Content appears in floating terminal panels with typewriter text reveals, ' +
      'scan-line overlays, and glowing borders. Features an intro animation sequence with timed reveals and ' +
      'session-based skip logic. The entire experience is a single Three.js scene — no page transitions.',
    techStack: ['Next.js', 'React', 'Three.js', 'R3F', 'GSAP', 'Tailwind'],
    category: 'engineering',
    brainZone: 'zone-occipital',
  },
  {
    id: 'project-6',
    title: 'MCP Server Toolkit',
    description:
      'Model Context Protocol server implementations for connecting AI agents to external tools and data sources.',
    longDescription:
      'A collection of Model Context Protocol (MCP) servers that expose external tools and data sources to AI agents. ' +
      'Implements servers for task management, knowledge graphs, Google Drive access, sequential thinking, and ' +
      'browser automation. Each server follows the MCP specification with typed tool definitions, streaming responses, ' +
      'and automatic tracing via LangSmith. Designed for composability — servers can be aggregated into a unified ' +
      'endpoint. Used in production to power autonomous coding agents with 70+ tool integrations across memory, ' +
      'GitHub, and cloud services.',
    techStack: ['TypeScript', 'Node.js', 'MCP', 'REST', 'GraphQL'],
    category: 'ai',
    brainZone: 'zone-cerebellum',
  },
];
