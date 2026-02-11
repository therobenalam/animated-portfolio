'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery — reactive CSS media query hook.
 * Returns true when the media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Convenience — true on screens ≤ 768px */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/** Convenience — true on screens ≤ 1024px */
export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 1024px)');
}
