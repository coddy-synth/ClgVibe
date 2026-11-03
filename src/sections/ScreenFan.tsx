import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers } from 'lucide-react';
import { PhoneFrame } from '../components/phone/PhoneFrame';
import { SCREEN_MAP, ScreenId } from '../components/phone/screens';
import { useIsDesktop } from '../hooks/useViewport';

gsap.registerPlugin(ScrollTrigger);

const SCREENS: { id: ScreenId; label: string; line: string }[] = [
  { id: 'events', label: 'Events', line: 'Tickets with QR check-in at the door.' },
  { id: 'chats', label: 'Chats', line: 'End-to-end encrypted, no phone numbers.' },
  { id: 'feed', label: 'Feed', line: 'Your campus, verified students only.' },
  { id: 'blinks', label: 'Blinks', line: 'Photos and videos that vanish after one view.' },
  { id: 'notes', label: 'Notes', line: 'Papers and notes, shared by seniors.' },
];

export const ScreenFan: React.FC = () => {
  const isDesktop = useIsDesktop();
  const scale = isDesktop ? 0.64 : 0.43;
  const [focus, setFocus] = useState(2);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const w = 300 * scale;
  const h = 620 * scale;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const offs = isDesktop
        ? { x: [-410, -205, 0, 205, 410], y: [56, 20, 0, 20, 56], r: [-11, -5.5, 0, 5.5, 11] }
        : { x: [-124, -62, 0, 62, 124], y: [30, 11, 0, 11, 30], r: [-12, -6, 0, 6, 12] };

      gsap.from('[data-fan-head] > *', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-fan-head]', start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('[data-fan-phone]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: 0, y: 70, rotation: 0, scale: 0.8, opacity: 0.4 },
          {
            x: offs.x[i],
            y: offs.y[i],
            rotation: offs.r[i],
            scale: 1,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 88%',
              end: 'top 28%',
              scrub: 0.7,
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [isDesktop]);

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('[data-fan-inner]').forEach((el, i) => {
      gsap.to(el, {
        scale: i === focus ? 1.07 : 1,
        y: i === focus ? -16 : 0,
        duration: 0.55,
        ease: 'back.out(2.2)',
      });
    });
  }, [focus]);

  const order = [0, 1, 2, 3, 4].sort((a, b) => Math.abs(b - focus) - Math.abs(a - focus));

  return (
    <section id="screens" ref={rootRef} className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#0095f6]/10 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <div data-fan-head>
          <span className="inline-flex items-center gap-2 rounded-full bg-vibe-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-vibe-dark">
            <Layers className="h-3.5 w-3.5" /> Inside the app
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px]">
            Five screens. One campus.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-ink/60 sm:text-[18px]">
            Scroll and watch them fan out, then tap any screen to bring it forward.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto mt-10 lg:mt-14"
          style={{ height: h + 60, maxWidth: 1100 }}
        >
          {SCREENS.map((s, i) => {
            const S = SCREEN_MAP[s.id];
            return (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                data-fan-phone
                aria-label={`Bring ${s.label} screen forward`}
                onClick={() => setFocus(i)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFocus(i)}
                className="absolute top-0 cursor-pointer outline-none"
                style={{ left: '50%', marginLeft: -w / 2, width: w, height: h, zIndex: 10 - order.indexOf(i) }}
              >
                <div data-fan-inner className="h-full w-full">
                  <PhoneFrame scale={scale}>
                    <S />
                  </PhoneFrame>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setFocus(i)}
              className={`h-10 rounded-full px-5 text-[14px] font-semibold transition ${
                focus === i ? 'bg-ink text-white shadow-lg' : 'bg-black/[0.05] text-ink/65 hover:bg-black/[0.09]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-4 min-h-[24px] text-[16px] font-medium text-ink/70" aria-live="polite">
          {SCREENS[focus].line}
        </p>
      </div>
    </section>
  );
};
