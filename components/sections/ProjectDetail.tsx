'use client';

import { useState, useEffect, useRef } from 'react';
import { Project } from '@/data/projects';
import { brainZones } from '@/data/brainZones';

// ─── Typewriter hook for long description ──────────────────────────
function useTypewriter(text: string, speed = 8, delay = 300) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

// ─── Component ─────────────────────────────────────────────────────
interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { displayed, done } = useTypewriter(project.longDescription, 6, 200);

  // Resolve zone color for this project
  const zone = brainZones.find((z) => z.id === project.brainZone);
  const zoneColor = zone?.color ?? '#00ffcc';

  return (
    <div className="font-mono text-sm space-y-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-xs tracking-widest text-gray-500 hover:text-white transition-colors group"
      >
        <span className="text-green-400 group-hover:text-green-300">{'>'}</span>{' '}
        cd ..  <span className="text-gray-600">[BACK TO PROJECTS]</span>
      </button>

      {/* Project header */}
      <div className="border rounded border-white/10 p-4" style={{ borderColor: `${zoneColor}33` }}>
        {/* Title row */}
        <div className="flex items-center gap-3 mb-2">
          {/* Zone color dot */}
          <span
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: zoneColor, boxShadow: `0 0 8px ${zoneColor}88` }}
          />
          <h2 className="text-lg font-bold text-white tracking-wide">{project.title}</h2>
        </div>

        {/* Category + zone info */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${
              project.category === 'ai'
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            }`}
          >
            {project.category === 'ai' ? 'AI / ML' : 'Engineering'}
          </span>
          {zone && (
            <span className="text-[10px] text-gray-500 tracking-wider">
              BRAIN_ZONE: <span style={{ color: zoneColor }}>{zone.id.replace('zone-', '').toUpperCase()}</span>
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-3" />

        {/* Long description — typewriter reveal */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-600 tracking-widest mb-2">{'>'} cat README.md</p>
          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">
            {displayed}
            {!done && <span className="text-green-400 animate-pulse">▊</span>}
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-600 tracking-widest mb-2">{'>'} cat package.json | jq .dependencies</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded font-mono border"
                style={{
                  color: zoneColor,
                  backgroundColor: `${zoneColor}15`,
                  borderColor: `${zoneColor}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2 border-t border-white/5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest hover:brightness-125 transition-all"
              style={{ color: zoneColor }}
            >
              {'>'} open --live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white tracking-widest transition-colors"
            >
              {'>'} git clone
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span className="text-[10px] text-gray-600 tracking-widest">
              [NO PUBLIC LINKS AVAILABLE]
            </span>
          )}
        </div>
      </div>

      {/* Status footer */}
      <p className="text-[10px] text-gray-600 tracking-widest">
        PROJECT_STATUS: <span className="text-green-400">ACTIVE</span> | ZONE:{' '}
        <span style={{ color: zoneColor }}>{zone?.id ?? 'UNLINKED'}</span>
      </p>
    </div>
  );
}
