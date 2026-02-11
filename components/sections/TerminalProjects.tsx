'use client';

import { useState, useEffect, useCallback } from 'react';
import { projects, Project } from '@/data/projects';
import { brainZones } from '@/data/brainZones';
import ProjectDetail from './ProjectDetail';

// ─── Helpers ───────────────────────────────────────────────────────
function getZoneColor(brainZone?: string): string | null {
  if (!brainZone) return null;
  return brainZones.find((z) => z.id === brainZone)?.color ?? null;
}

function CategoryBadge({ category }: { category: Project['category'] }) {
  const styles =
    category === 'ai'
      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      : 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  const label = category === 'ai' ? 'AI / ML' : 'Engineering';
  return (
    <span
      className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${styles}`}
    >
      {label}
    </span>
  );
}

// ─── Props ─────────────────────────────────────────────────────────
interface TerminalProjectsProps {
  /** The brain zone currently hovered in the 3D scene */
  highlightedZoneId?: string | null;
  /** Called when a project card is hovered (passes zone ID or null) */
  onProjectHover?: (zoneId: string | null) => void;
  /** Externally selected project ID (e.g. from a brain zone click) */
  selectedProjectId?: string | null;
  /** Called when selected project changes (including deselect via back) */
  onProjectSelect?: (projectId: string | null) => void;
}

// ─── Component ─────────────────────────────────────────────────────
export default function TerminalProjects({
  highlightedZoneId = null,
  onProjectHover,
  selectedProjectId = null,
  onProjectSelect,
}: TerminalProjectsProps) {
  // Internal detail view state
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  // Sync external selectedProjectId → internal detail view
  useEffect(() => {
    if (selectedProjectId) {
      const p = projects.find((proj) => proj.id === selectedProjectId);
      if (p) setDetailProject(p);
    }
  }, [selectedProjectId]);

  const handleCardClick = useCallback(
    (project: Project) => {
      setDetailProject(project);
      onProjectSelect?.(project.id);
    },
    [onProjectSelect]
  );

  const handleBack = useCallback(() => {
    setDetailProject(null);
    onProjectSelect?.(null);
  }, [onProjectSelect]);

  const handleCardHover = useCallback(
    (zoneId: string | null) => {
      onProjectHover?.(zoneId);
    },
    [onProjectHover]
  );

  // ── Detail view ──
  if (detailProject) {
    return <ProjectDetail project={detailProject} onBack={handleBack} />;
  }

  // ── Grid view ──
  return (
    <div className="font-mono text-sm space-y-4">
      <p className="text-green-400 text-xs tracking-widest mb-1">{'>'} ls -la /projects</p>
      <p className="text-gray-500 text-xs mb-3">{projects.length} entries found</p>

      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => {
          const zoneColor = getZoneColor(project.brainZone);
          const isHighlighted = !!(
            highlightedZoneId &&
            project.brainZone === highlightedZoneId
          );

          return (
            <div
              key={project.id}
              className="group rounded border bg-white/[0.02] transition-all duration-200 p-3.5 cursor-pointer"
              style={{
                borderColor: isHighlighted
                  ? `${zoneColor}99`
                  : 'rgba(255,255,255,0.1)',
                backgroundColor: isHighlighted
                  ? `${zoneColor}08`
                  : undefined,
                boxShadow: isHighlighted
                  ? `0 0 12px ${zoneColor}22, inset 0 0 20px ${zoneColor}08`
                  : undefined,
              }}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => handleCardHover(project.brainZone ?? null)}
              onMouseLeave={() => handleCardHover(null)}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {/* Zone color dot */}
                  {zoneColor && (
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
                      style={{
                        backgroundColor: zoneColor,
                        boxShadow: isHighlighted ? `0 0 8px ${zoneColor}` : 'none',
                      }}
                    />
                  )}
                  <h3
                    className="text-sm font-bold tracking-wide transition-colors"
                    style={{
                      color: isHighlighted ? zoneColor : undefined,
                    }}
                  >
                    <span className={isHighlighted ? '' : 'text-white group-hover:text-cyan-300'}>
                      {project.title}
                    </span>
                  </h3>
                </div>
                <CategoryBadge category={project.category} />
              </div>

              {/* Description */}
              <p className="text-gray-400 text-xs leading-relaxed mb-2.5">
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                    style={{
                      color: isHighlighted ? `${zoneColor}cc` : 'rgba(0,255,255,0.5)',
                      backgroundColor: isHighlighted
                        ? `${zoneColor}15`
                        : 'rgba(0,255,255,0.06)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-3 mt-2 pt-2 border-t border-white/5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-green-400 hover:text-green-300 tracking-widest"
                      onClick={(e) => e.stopPropagation()}
                    >
                      [LIVE]
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-gray-400 hover:text-white tracking-widest"
                      onClick={(e) => e.stopPropagation()}
                    >
                      [SOURCE]
                    </a>
                  )}
                </div>
              )}

              {/* Zone indicator (visible on highlight) */}
              {isHighlighted && (
                <div className="mt-2 pt-2 border-t border-white/5">
                  <span className="text-[9px] tracking-widest" style={{ color: `${zoneColor}99` }}>
                    BRAIN_ZONE: {project.brainZone?.replace('zone-', '').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
