import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Smartphone } from 'lucide-react';
import { AVATARS, LINKS } from '../lib/links';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onGetApp: () => void;
}

const FLOATERS = [
  { src: AVATARS.aanya, cls: 'left-[5%] top-[10%] h-11 w-11 sm:top-[14%] sm:h-12 sm:w-12 lg:h-16 lg:w-16' },
  { src: AVATARS.rohan, cls: 'left-[14%] bottom-[12%] hidden h-12 w-12 sm:block lg:h-14 lg:w-14' },
  { src: AVATARS.meera, cls: 'right-[5%] top-[10%] h-11 w-11 sm:right-[6%] sm:top-[12%] sm:h-12 sm:w-12 lg:h-14 lg:w-14' },
  { src: AVATARS.kabir, cls: 'right-[13%] bottom-[14%] hidden h-12 w-12 sm:block lg:h-16 lg:w-16' },
  { src: AVATARS.zoya, cls: 'left-[34%] top-[6%] hidden h-10 w-10 lg:block lg:h-12 lg:w-12' },
  { src: AVATARS.dev, cls: 'right-[32%] bottom-[7%] hidden h-10 w-10 lg:block lg:h-12 lg:w-12' },
];

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetApp }) => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cta-card]', {
        y: 90,
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '[data-cta-card]', start: 'top 88%', toggleActions: 'play none none reverse' },
      });
      gsap.from('[data-cta-in] > *', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-cta-card]', start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.from('[data-floater]', {
        scale: 0,
        rotate: -30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: '[data-cta-card]', start: 'top 72%', toggleActions: 'play none none reverse' },
      });
      // gentle scroll parallax on the floating avatars
      gsap.utils.toArray<HTMLElement>('[data-floater-wrap]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: i % 2 ? 30 : -30 },
          {
            y: i % 2 ? -30 : 30,
            ease: 'none',
            scrollTrigger: { trigger: '[data-cta-card]', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-white px-5 py-20 lg:py-28">
      <div
        data-cta-card
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0095f6] via-[#0a7fe6] to-[#5b6df0] px-6 py-16 text-center text-white shadow-[0_40px_80px_-30px_rgba(0,100,200,0.7)] lg:rounded-[48px] lg:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-white/25 blur-[80px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(60%_80%_at_50%_50%,black,transparent)]" />

        {FLOATERS.map((f) => (
          <div key={f.src} data-floater-wrap className={`absolute ${f.cls}`}>
            <img
              data-floater
              src={f.src}
              alt=""
              className="h-full w-full animate-floaty rounded-full bg-sky-100 object-cover shadow-xl ring-4 ring-white/80"
            />
          </div>
        ))}

        <div data-cta-in className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-[38px] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[58px] lg:text-[66px]">
            Find your people on campus.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/85 lg:text-[19px]">
            Free for students. Takes a minute to join.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={LINKS.signup}
              className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-white px-8 text-[16px] font-bold text-[#0a6fd6] shadow-[0_18px_36px_-14px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5"
            >
              Join ClgVibe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={onGetApp}
              className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 text-[16px] font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <Smartphone className="h-4 w-4" />
              Get the app
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

