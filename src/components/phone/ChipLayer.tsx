import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChipData, PopChip } from './PopChip';

interface ChipLayerProps {
  sets: ChipData[][];
  active: number;
}

/** Pops each step's floating cards in with an elastic back.out, and fades the previous set out. */
export const ChipLayer: React.FC<ChipLayerProps> = ({ sets, active }) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const first = useRef(true);

  useLayoutEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) gsap.set(el.querySelectorAll('[data-chip]'), { opacity: 0, scale: 0.4 });
      if (el && i !== active) el.style.visibility = 'hidden';
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const chips = el.querySelectorAll('[data-chip]');
      gsap.killTweensOf(chips);
      if (i === active) {
        el.style.visibility = 'visible';
        gsap.fromTo(
          chips,
          { opacity: 0, scale: 0.4, y: 22 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: 'back.out(2.2)',
            stagger: 0.14,
            delay: first.current ? 0.9 : 0.25,
          }
        );
      } else {
        gsap.to(chips, {
          opacity: 0,
          scale: 0.7,
          y: -10,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (i !== active) el.style.visibility = 'hidden';
          },
        });
      }
    });
    first.current = false;
  }, [active]);

  return (
    <>
      {sets.map((chips, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          {chips.map((c, j) => (
            <PopChip key={c.title} {...c} delay={j * 0.7} />
          ))}
        </div>
      ))}
    </>
  );
};

