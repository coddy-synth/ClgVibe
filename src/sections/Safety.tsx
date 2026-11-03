import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCheck, Lock, EyeOff, Flag, ShieldCheck, GraduationCap } from 'lucide-react';
import { AVATARS } from '../lib/links';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    icon: UserCheck,
    title: 'Verified students only',
    body: 'Every account is checked against a college email or student ID before it can post or chat.',
  },
  {
    icon: Lock,
    title: 'Encrypted chats',
    body: 'Direct messages are end-to-end encrypted. We can’t read them, and neither can anyone else.',
  },
  {
    icon: EyeOff,
    title: 'No ads, no tracking',
    body: 'Your data isn’t sold, and you’re not the product.',
  },
  {
    icon: Flag,
    title: 'Reports reach a person',
    body: 'Anything that breaks the community rules can be reported, and a moderator reviews it.',
  },
];

export const Safety: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-safe-head] > *', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-safe-head]', start: 'top 85%' },
      });

      gsap.utils.toArray<HTMLElement>('[data-safe-card]').forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          scale: 0.9,
          rotateX: 12,
          transformPerspective: 900,
          duration: 0.8,
          ease: 'back.out(1.6)',
          delay: (i % 2) * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
        gsap.from(card.querySelector('[data-icon]'), {
          scale: 0,
          rotate: -45,
          duration: 0.6,
          ease: 'back.out(3)',
          delay: 0.25 + (i % 2) * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });

      gsap.from('[data-students-only]', {
        y: 60,
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '[data-students-only]', start: 'top 88%', toggleActions: 'play none none reverse' },
      });
      gsap.from('[data-so-avatar]', {
        scale: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.08,
        ease: 'back.out(2.8)',
        scrollTrigger: { trigger: '[data-students-only]', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="safety" ref={rootRef} className="relative scroll-mt-16 overflow-hidden bg-ink-night py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[#0095f6]/20 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div data-safe-head className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-sky-300 ring-1 ring-white/10">
            <ShieldCheck className="h-3.5 w-3.5" /> Safety
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px]">
            Built to be safe, from the start.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/60 sm:text-[18px]">
            A campus app only works if you trust who’s on it and what happens to what you share.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16" style={{ perspective: 1200 }}>
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              data-safe-card
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07] lg:p-8"
            >
              <span data-icon className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0095f6]/20 text-sky-300 ring-1 ring-[#0095f6]/30">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-[21px] font-bold">{title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-white/60">{body}</p>
            </div>
          ))}
        </div>

        {/* students-only statement */}
        <div
          data-students-only
          className="relative mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0095f6]/25 via-white/[0.04] to-[#9099fc]/20 p-7 lg:flex lg:items-center lg:justify-between lg:p-10"
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-sky-300">
              <GraduationCap className="h-4 w-4" /> Students only
            </span>
            <h3 className="mt-2 font-display text-[26px] font-bold leading-tight lg:text-[34px]">
              Only students are on ClgVibe. No faculty. No college admin.
            </h3>
            <p className="mt-2 text-[15.5px] text-white/65">
              It’s a space for the people who actually share a campus: your batch, your seniors, your clubs.
            </p>
          </div>
          <div className="mt-6 flex -space-x-3 lg:mt-0">
            {[AVATARS.aanya, AVATARS.rohan, AVATARS.meera, AVATARS.kabir, AVATARS.zoya].map((a) => (
              <img
                key={a}
                data-so-avatar
                src={a}
                alt=""
                className="h-14 w-14 rounded-full bg-sky-100 object-cover ring-4 ring-[#14161c] lg:h-16 lg:w-16"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

