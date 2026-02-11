export interface BlogPost {
  id: string;
  date: string;
  title: string;
  summary: string;
  url?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    date: '2026-01-28',
    title: 'Building Autonomous AI Agents That Actually Work',
    summary:
      'Lessons learned from deploying multi-agent systems in production — tool use, memory, and the orchestration patterns that matter.',
    tags: ['AI Agents', 'LLMs', 'Architecture'],
  },
  {
    id: 'post-2',
    date: '2025-12-15',
    title: 'RAG Beyond the Basics: Re-Ranking & Contextual Chunking',
    summary:
      'Why naive vector search fails and how to build retrieval pipelines that return genuinely useful results.',
    tags: ['RAG', 'NLP', 'Vector Search'],
  },
  {
    id: 'post-3',
    date: '2025-11-03',
    title: 'Visualizing Neural Networks with Three.js & React',
    summary:
      'A deep dive into creating interactive 3D brain visualizations using React Three Fiber, custom shaders, and instanced rendering.',
    tags: ['Three.js', 'React', '3D', 'Visualization'],
  },
];
