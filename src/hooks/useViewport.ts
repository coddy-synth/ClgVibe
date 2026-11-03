import { useEffect, useState } from 'react';

function query(q: string): boolean {
  return typeof window !== 'undefined' ? window.matchMedia(q).matches : false;
}

export function useMediaQuery(q: string): boolean {
  const [matches, setMatches] = useState(() => query(q));
  useEffect(() => {
    const mql = window.matchMedia(q);
    const on = () => setMatches(mql.matches);
    on();
    mql.addEventListener('change', on);
    return () => mql.removeEventListener('change', on);
  }, [q]);
  return matches;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/**
 * Scale factor for the 300x620 design-size phone so it always fits the space
 * the layout gives it (based on viewport height & width).
 */
export function usePhoneScale(heightRatio: number, widthRatio: number, min = 0.45, max = 1.1): number {
  const calc = () => {
    if (typeof window === 'undefined') return 0.9;
    const byH = (window.innerHeight * heightRatio) / 620;
    const byW = (window.innerWidth * widthRatio) / 300;
    return Math.max(min, Math.min(max, byH, byW));
  };
  const [s, setS] = useState(calc);
  useEffect(() => {
    const on = () => setS(calc());
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightRatio, widthRatio, min, max]);
  return s;
}

export const prefersReducedMotion = () => query('(prefers-reduced-motion: reduce)');

