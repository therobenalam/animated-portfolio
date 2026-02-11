'use client';

import { useState, useEffect, useCallback } from 'react';

interface IntroOverlayProps {
  /** Current app state */
  appState: 'LOADING' | 'INTRO' | 'HUB' | 'SECTION_OPEN';
  /** Called when user clicks skip */
  onSkip: () => void;
}

/**
 * IntroOverlay - HTML overlay for the intro sequence
 * 
 * Renders:
 * - Blinking cursor during the first ~1s of intro (before nodes appear)
 * - Skip button that appears after 1s
 * - Fades out when transitioning to HUB
 */
export default function IntroOverlay({
  appState,
  onSkip,
}: IntroOverlayProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showCursorPhase, setShowCursorPhase] = useState(true);
  const [introElapsed, setIntroElapsed] = useState(0);

  // Track elapsed time during intro for cursor phase
  useEffect(() => {
    if (appState !== 'INTRO') {
      setIntroElapsed(0);
      setShowCursorPhase(true);
      return;
    }
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setIntroElapsed(elapsed);
      if (elapsed > 1.0) {
        setShowCursorPhase(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [appState]);

  // Show skip button after 1s delay
  useEffect(() => {
    if (appState !== 'INTRO') {
      setShowSkip(false);
      return;
    }
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, [appState]);

  // Blink cursor
  useEffect(() => {
    if (!showCursorPhase || appState !== 'INTRO') return;
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [showCursorPhase, appState]);

  if (appState !== 'INTRO') return null;

  return (
    <>
      {/* Cursor blink overlay - only during first ~1s */}
      {showCursorPhase && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <span
            className="font-mono text-2xl text-cyan-400 transition-opacity duration-100"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            ▊
          </span>
        </div>
      )}

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={onSkip}
          className="fixed bottom-8 right-8 z-[70] px-4 py-2 rounded border border-white/10 bg-black/40 
                     text-[11px] tracking-[0.15em] text-white/40 font-mono uppercase
                     hover:text-white/70 hover:border-white/25 hover:bg-black/60
                     transition-all duration-300 backdrop-blur-sm"
        >
          Skip ›
        </button>
      )}
    </>
  );
}
