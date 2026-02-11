export interface AboutData {
  name: string;
  title: string;
  bio: string[];
  stats: { label: string; value: string }[];
  avatarUrl?: string;
}

export const aboutData: AboutData = {
  name: 'Robin',
  title: 'AI Engineer & Full-Stack Developer',
  bio: [
    'I architect intelligent systems that bridge the gap between cutting-edge AI research and production-grade software.',
    'With a deep focus on LLMs, autonomous agents, and neural architectures, I build tools that think, reason, and create.',
    'My work spans from fine-tuning foundation models to deploying scalable AI pipelines — always with an emphasis on elegant, maintainable code.',
  ],
  stats: [
    { label: 'FOCUS', value: 'AI / ML / LLMs' },
    { label: 'STACK', value: 'TypeScript · Python · React · Next.js' },
    { label: 'SPECIALTIES', value: 'Autonomous Agents · RAG · Fine-tuning' },
    { label: 'STATUS', value: 'ONLINE — Building the future' },
  ],
};
