'use client';

import { skillCategories } from '@/data/skills';

/** Terminal-style proficiency bar */
function SkillBar({ name, level }: { name: string; level: number }) {
  const barWidth = 20; // total characters
  const filled = Math.round((level / 100) * barWidth);
  const empty = barWidth - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 w-36 shrink-0 truncate">{name}</span>
      <span
        className="font-mono tracking-tight"
        style={{
          color:
            level >= 90
              ? '#00ff88'
              : level >= 70
              ? '#00ccff'
              : level >= 50
              ? '#ffcc00'
              : '#ff6644',
        }}
      >
        {bar}
      </span>
      <span className="text-gray-600 w-8 text-right">{level}%</span>
    </div>
  );
}

export default function TerminalSkills() {
  return (
    <div className="font-mono text-sm space-y-5">
      <p className="text-green-400 text-xs tracking-widest mb-1">
        {'>'} cat /proc/capabilities
      </p>

      {skillCategories.map((cat) => (
        <div key={cat.id}>
          <p className="text-yellow-400 text-[10px] tracking-[0.2em] uppercase mb-2">
            ── {cat.name} ──
          </p>
          <div className="space-y-1">
            {cat.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
