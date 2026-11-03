import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AtSign, BadgeCheck, Sparkles, Search, Mail } from 'lucide-react';
import { AVATARS } from '../lib/links';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-how-head] > *', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-how-head]', start: 'top 85%' },
      });

      // connector line fills as you scroll through the steps
      gsap.fromTo(
        '[data-line-x]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        }
      );
      gsap.fromTo(
        '[data-line-y]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((card) => {
        const badge = card.querySelector('[data-badge]');
        const bits = card.querySelectorAll('[data-bit]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none reverse' },
        });
        tl.from(card, { y: 60, opacity: 0, scale: 0.92, duration: 0.7, ease: 'back.out(1.7)' })
          .from(badge, { scale: 0, rotate: -90, duration: 0.55, ease: 'back.out(2.6)' }, 0.1)
          .from(bits, { y: 14, opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' }, 0.35);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      n: 1,
      title: 'Sign up',
      body: 'Pick a username and find your college.',
      visual: (
        <div className="space-y-2">
          <div data-bit className="flex h-11 items-center gap-2 rounded-xl bg-black/[0.04] px-3 text-[14px] font-semibold ring-1 ring-black/[0.06]">
            <AtSign className="h-4 w-4 text-vibe" /> aanya.cse
          </div>
          <div data-bit className="flex h-11 items-center gap-2 rounded-xl bg-black/[0.04] px-3 text-[14px] text-ink/55 ring-1 ring-black/[0.06]">
            <Search className="h-4 w-4" /> Find your college…
          </div>
        </div>
      ),
    },
    {
      n: 2,
      title: 'Get verified',
      body: 'Instantly with your college email, or with your student ID.',
      visual: (
        <div className="space-y-2">
          <div data-bit className="flex h-11 items-center gap-2 rounded-xl bg-black/[0.04] px-3 text-[13.5px] font-medium ring-1 ring-black/[0.06]">
            <Mail className="h-4 w-4 text-ink/50" /> aanya@college.ac.in
          </div>
          <div data-bit className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[13px] font-bold text-emerald-700">
            <BadgeCheck className="h-4 w-4" /> Verified student
          </div>
        </div>
      ),
    },
    {
      n: 3,
      title: 'Find your people',
      body: 'Your campus feed, your batch, your clubs, all in one place.',
      visual: (
        <div className="space-y-3">
          <div data-bit className="flex -space-x-2.5">
            {[AVATARS.aanya, AVATARS.rohan, AVATARS.meera, AVATARS.kabir, AVATARS.zoya].map((a) => (
              <img key={a} src={a} alt="" className="h-9 w-9 rounded-full bg-sky-100 object-cover ring-2 ring-white" />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Feed', 'Your batch', 'Clubs'].map((t) => (
              <span key={t} data-bit className="rounded-full bg-vibe-soft px-3 py-1.5 text-[12.5px] font-semibold text-vibe-dark">
                {t}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" ref={rootRef} className="relative scroll-mt-16 bg-[#fafafa] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div data-how-head className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-vibe-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-vibe-dark">
            <Sparkles className="h-3.5 w-3.5" /> How it works
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px]">
            Up and running in a minute.
          </h2>
        </div>

        <div data-steps className="relative mt-12 pl-[40px] lg:mt-20 lg:pl-0">
          {/* desktop horizontal connector */}
          <div aria-hidden className="absolute left-[16.6%] right-[16.6%] top-0 hidden h-[3px] -translate-y-1/2 rounded-full bg-black/10 lg:block">
            <div data-line-x className="h-full origin-left rounded-full bg-gradient-to-r from-[#0095f6] to-[#9099fc]" />
          </div>
          {/* mobile vertical connector */}
          <div aria-hidden className="absolute bottom-10 left-[27px] top-10 w-[3px] rounded-full bg-black/10 lg:hidden">
            <div data-line-y className="h-full origin-top rounded-full bg-gradient-to-b from-[#0095f6] to-[#9099fc]" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                data-step
                className="relative rounded-[28px] border border-black/[0.06] bg-white p-6 pt-[28px] shadow-card lg:p-7 lg:pt-[52px]"
              >
                <span
                  data-badge
                  className="absolute -left-[40px] top-6 flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#0095f6] to-[#4aa8ff] font-display text-[22px] font-bold text-white shadow-[0_14px_28px_-10px_rgba(0,149,246,0.9)] lg:left-7 lg:-top-[27px]"
                >
                  {s.n}
                </span>
                <h3 className="font-display text-[22px] font-bold lg:text-[24px]">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/65">{s.body}</p>
                <div className="mt-5">{s.visual}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
