import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SCREEN_MAP, ScreenId } from './screens';

interface ScreenStackProps {
  screens: ScreenId[];
  active: number;
}

/** Stacks every screen inside the phone and cross-fades between them with GSAP. */
export const ScreenStack: React.FC<ScreenStackProps> = ({ screens, active }) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const prev = useRef(active);

  useLayoutEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prev.current === active) return;
    const from = refs.current[prev.current];
    const to = refs.current[active];
    const dir = active > prev.current ? 1 : -1;
    prev.current = active;
    if (!from || !to) return;
    gsap.killTweensOf([from, to]);
    refs.current.forEach((el, i) => {
      if (el && el !== from && el !== to) gsap.set(el, { opacity: 0, zIndex: 1 });
      if (i === active) gsap.set(el, { zIndex: 3 });
    });
    gsap.fromTo(
      to,
      { opacity: 0, x: 34 * dir, scale: 1.05 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
    gsap.to(from, { opacity: 0, x: -34 * dir, scale: 0.96, duration: 0.45, ease: 'power2.in', zIndex: 2 });
  }, [active]);

  return (
    <>
      {screens.map((id, i) => {
        const S = SCREEN_MAP[id];
        return (
          <div
            key={id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute inset-0"
            aria-hidden={i !== active}
          >
            <S />
          </div>
        );
      })}
    </>
  );
};

