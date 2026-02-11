'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface TerminalPanelProps {
  /** Section id (used for styling/key) */
  sectionId: string;
  /** Title displayed in the header bar */
  title: string;
  /** Accent color for glowing border */
  accentColor?: string;
  /** Whether the panel is open */
  isOpen: boolean;
  /** Called when the panel should close */
  onClose: () => void;
  /** Content inside the panel */
  children: React.ReactNode;
  /** Full-screen mode (mobile) */
  fullScreen?: boolean;
}

/**
 * TerminalPanel — AI terminal-style floating panel.
 *
 * Features:
 * - Dark translucent background with glowing border
 * - Header bar with section title, blinking cursor, and [X] close
 * - Scrollable content area
 * - Scan-line CSS overlay
 * - Open/close animations (scale + fade)
 * - Escape key to close
 * - ARIA role="dialog", focus trapping, screen reader announcements
 */
export default function TerminalPanel({
  sectionId,
  title,
  accentColor = '#00ffcc',
  isOpen,
  onClose,
  children,
  fullScreen = false,
}: TerminalPanelProps) {
  const [animState, setAnimState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  // Open animation
  useEffect(() => {
    if (isOpen && animState === 'closed') {
      setAnimState('opening');
      const t = setTimeout(() => setAnimState('open'), 400);
      return () => clearTimeout(t);
    }
    if (!isOpen && (animState === 'open' || animState === 'opening')) {
      setAnimState('closing');
      const t = setTimeout(() => setAnimState('closed'), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen, animState]);

  // Focus management: save previous focus, focus panel on open, restore on close
  useEffect(() => {
    if (animState === 'open') {
      previousFocusRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    }
    if (animState === 'closed' && previousFocusRef.current) {
      (previousFocusRef.current as HTMLElement)?.focus?.();
      previousFocusRef.current = null;
    }
  }, [animState]);

  // Escape key + focus trap
  useEffect(() => {
    if (animState !== 'open' && animState !== 'opening') return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap: Tab cycles within the panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [animState, onClose]);

  // Stop scroll events from propagating to the canvas
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  if (animState === 'closed') return null;

  const isVisible = animState === 'open' || animState === 'opening';

  return (
    <div
      ref={panelRef}
      onWheel={handleWheel}
      className="fixed inset-0 z-40 flex items-center justify-end pointer-events-none"
      style={{ perspective: '1200px' }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop — subtle dark overlay */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{
          background: 'rgba(0,0,0,0.35)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative pointer-events-auto ${
          fullScreen ? 'mx-0' : 'mr-6 md:mr-12'
        }`}
        style={{
          width: fullScreen ? '100vw' : 'min(560px, 90vw)',
          maxHeight: fullScreen ? '100vh' : '85vh',
          height: fullScreen ? '100vh' : undefined,
          transform: isVisible
            ? 'scale(1) translateX(0)'
            : 'scale(0.92) translateX(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
          willChange: 'transform, opacity',
        }}
      >
        {/* Glowing border wrapper */}
        <div
          className={`overflow-hidden ${fullScreen ? '' : 'rounded-lg'}`}
          style={{
            border: fullScreen ? 'none' : `1px solid ${accentColor}`,
            boxShadow: fullScreen
              ? 'none'
              : `0 0 20px ${accentColor}44, 0 0 60px ${accentColor}22, inset 0 0 30px rgba(0,0,0,0.5)`,
            background: 'rgba(0, 5, 10, 0.92)',
            height: fullScreen ? '100%' : undefined,
          }}
        >
          {/* Scan-line overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-lg"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,200,0.02) 2px, rgba(0,255,200,0.02) 4px)',
              mixBlendMode: 'overlay',
            }}
            aria-hidden="true"
          />

          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 select-none"
            style={{
              borderBottom: `1px solid ${accentColor}44`,
              background: `linear-gradient(90deg, ${accentColor}11, transparent)`,
            }}
          >
            <div className="flex items-center gap-2">
              {/* Status dot */}
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 6px ${accentColor}`,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: accentColor }}
              >
                {title}
              </span>
              {/* Blinking cursor */}
              <span
                className="font-mono text-sm"
                style={{
                  color: accentColor,
                  animation: 'blink 1s step-end infinite',
                }}
                aria-hidden="true"
              >
                ▊
              </span>
            </div>

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="font-mono text-xs px-2 py-0.5 rounded transition-colors hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
              style={{ color: accentColor }}
              aria-label={`Close ${title}`}
            >
              [X]
            </button>
          </div>

          {/* Content area */}
          <div
            ref={contentRef}
            className="overflow-y-auto custom-scrollbar"
            style={{
              maxHeight: fullScreen ? 'calc(100vh - 48px - 52px)' : 'calc(85vh - 48px)',
              padding: '1.25rem 1.5rem',
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${accentColor}66;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
