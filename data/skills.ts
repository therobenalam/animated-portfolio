export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number }[]; // level 0-100
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'Python', level: 92 },
      { name: 'JavaScript', level: 95 },
      { name: 'SQL', level: 85 },
      { name: 'Rust', level: 40 },
    ],
  },
  {
    id: 'frameworks',
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'Three.js / R3F', level: 80 },
      { name: 'FastAPI', level: 78 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    skills: [
      { name: 'LLM Integration', level: 95 },
      { name: 'LangChain / LangGraph', level: 88 },
      { name: 'RAG Pipelines', level: 90 },
      { name: 'PyTorch', level: 70 },
      { name: 'Fine-Tuning (LoRA)', level: 75 },
      { name: 'Prompt Engineering', level: 95 },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS (EC2, Lambda, S3)', level: 80 },
      { name: 'Vercel / Netlify', level: 92 },
      { name: 'CI/CD (GitHub Actions)', level: 85 },
      { name: 'Supabase / PostgreSQL', level: 88 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Practices',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'VS Code / Copilot', level: 95 },
      { name: 'MCP Servers', level: 85 },
      { name: 'Figma', level: 60 },
      { name: 'Agile / Kanban', level: 85 },
    ],
  },
];
