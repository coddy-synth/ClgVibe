import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserCheck,
  Lock,
  EyeOff,
  Flag,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ChaosVsVibeProps {
  onOpenJoin: () => void;
  onOpenFaculty: () => void;
}

export const ChaosVsVibe: React.FC<ChaosVsVibeProps> = ({
  onOpenJoin,
  onOpenFaculty,
}) => {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const safetyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stepsContainerRef.current) {
        const stepCards = stepsContainerRef.current.querySelectorAll('.step-popup-card');
        gsap.fromTo(
          stepCards,
          { y: 40, scale: 0.92 },
          {
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (safetyContainerRef.current) {
        const safetyCards = safetyContainerRef.current.querySelectorAll('.safety-popup-card');
        gsap.fromTo(
          safetyCards,
          { y: 36, scale: 0.93 },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.65)',
            scrollTrigger: {
              trigger: safetyContainerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Sign up',
      body: 'Pick your @username and select your college from the India directory.',
      chip: 'Takes 15 seconds',
    },
    {
      num: '02',
      title: 'Get verified',
      body: 'Instantly with your college email (.ac.in / .edu.in), or with your student ID.',
      chip: '100% Gatekept',
    },
    {
      num: '03',
      title: 'Find your people',
      body: 'Your campus feed, your batch, your clubs, senior notes, and events in one place.',
      chip: 'Instant Access',
    },
  ];

  const safetyItems = [
    {
      icon: UserCheck,
      title: 'Verified students only',
      body: 'Every account is checked against a college email or student ID before it can post or chat.',
      tag: 'Identity Gate',
    },
    {
      icon: Lock,
      title: 'Encrypted chats',
      body: 'Direct messages are end-to-end encrypted. We can’t read them, and neither can anyone else.',
      tag: 'X25519 + AES-GCM',
    },
    {
      icon: EyeOff,
      title: 'No ads, no tracking',
      body: 'Your data isn’t sold to third parties or coaching networks, and you’re not the product.',
      tag: 'Zero Ad Trackers',
    },
    {
      icon: Flag,
      title: 'Reports reach a person',
      body: 'Anything that breaks the community rules can be reported, and a moderator reviews it.',
      tag: 'Human Review',
    },
  ];

  return (
    <>
      {/* HOW IT WORKS: POP-UP CARDS ON SCROLL */}
      <section
        id="how-it-works"
        className="scroll-mt-20 bg-[#05060a] py-20 sm:py-28 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-[12px] font-semibold text-[#0095f6]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>60-Second Onboarding</span>
            </span>
            <h2 className="mt-4 font-display text-balance text-[30px] sm:text-[44px] font-extrabold leading-tight tracking-tight text-white">
              Up and running in a minute.
            </h2>
            <p className="mt-3 text-[15.5px] sm:text-[16.5px] text-slate-400">
              Three steps to unlock your verified college network.
            </p>
          </div>

          <div
            ref={stepsContainerRef}
            className="mt-12 sm:mt-14 grid gap-5 md:grid-cols-3"
          >
            {steps.map((s) => (
              <div
                key={s.num}
                onClick={onOpenJoin}
                className="step-popup-card group cursor-pointer rounded-3xl border border-white/[0.09] bg-[#0d0f17] p-6 sm:p-7 hover:-translate-y-1.5 hover:border-[#0095f6]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#0095f6] font-display text-[14px] sm:text-[15px] font-extrabold text-white shadow-[0_8px_20px_rgba(0,149,246,0.4)]">
                    {s.num}
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-slate-300">
                    {s.chip}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[20px] font-bold text-white group-hover:text-[#0095f6] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[14.5px] leading-relaxed text-slate-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & TRUST: POP-UP SHIELD GRID */}
      <section
        id="safety"
        className="scroll-mt-20 bg-[#080910] py-20 sm:py-28 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-[12px] font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Security & Trust Architecture</span>
            </span>
            <h2 className="mt-4 font-display text-balance text-[30px] sm:text-[44px] font-extrabold leading-tight tracking-tight text-white">
              Built to be safe, from the start.
            </h2>
            <p className="mt-3 text-[15.5px] sm:text-[16.5px] text-slate-400">
              A campus app only works if you trust who’s on it and what happens to what you share.
            </p>
          </div>

          <div
            ref={safetyContainerRef}
            className="mt-12 sm:mt-14 grid gap-4 sm:gap-5 sm:grid-cols-2"
          >
            {safetyItems.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="safety-popup-card rounded-3xl border border-white/[0.08] bg-[#0e1018] p-6 sm:p-8 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#0095f6]/15 text-[#0095f6] border border-[#0095f6]/25">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[10.5px] font-semibold text-slate-300">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[18px] sm:text-[19px] font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[14.5px] leading-relaxed text-slate-400">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Faculty Advisor Callout */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#0095f6]/10 via-white/[0.03] to-transparent p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0095f6]/20 text-[#0095f6]">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="font-display text-[16px] sm:text-[17px] font-bold text-white">
                  Faculty? Advise your students’ Chapters and approve their events.
                </h4>
                <p className="mt-0.5 text-[13px] sm:text-[13.5px] text-slate-400">
                  Manage club patronage and event approvals from a dedicated faculty space of your own.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenFaculty}
              className="w-full sm:w-auto shrink-0 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-[13.5px] font-bold text-slate-950 hover:bg-slate-100 transition-colors"
            >
              <span>Faculty on ClgVibe</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
