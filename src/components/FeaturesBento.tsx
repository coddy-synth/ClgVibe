import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { FEATURE_STAGES, ScreenStageId } from '../data/campusData';
import { PhoneShowcase } from './PhoneShowcase';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRigRef = useRef<HTMLDivElement>(null);
  const fanSectionRef = useRef<HTMLDivElement>(null);
  const [focusedFanScreen, setFocusedFanScreen] = useState<ScreenStageId>('feed');

  // 1. Scroll-Triggered Feature Cards + Sticky 3D Phone (Zero pin-spacer gap!)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const stageCards = sectionRef.current.querySelectorAll('.feature-scroll-card');

      stageCards.forEach((card, index) => {
        // Pop-up entrance as each card enters viewport
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 36, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Activate corresponding phone screen when card is in focus zone
        ScrollTrigger.create({
          trigger: card,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // Subtle 3D tilt on the sticky desktop phone as you scroll through the section
      if (phoneRigRef.current) {
        gsap.fromTo(
          phoneRigRef.current,
          { rotateY: -9, rotateX: 4 },
          {
            rotateY: 9,
            rotateX: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. GSAP Multi-Screen Application Render Fan-Out on Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!fanSectionRef.current) return;

      const cards = fanSectionRef.current.querySelectorAll('.fan-phone-item');
      const offsets = [
        { x: -330, y: 38, rot: -13, scale: 0.85 },
        { x: -170, y: 14, rot: -6.5, scale: 0.93 },
        { x: 0, y: 0, rot: 0, scale: 1 },
        { x: 170, y: 14, rot: 6.5, scale: 0.93 },
        { x: 330, y: 38, rot: 13, scale: 0.85 },
      ];

      cards.forEach((card, i) => {
        const target = offsets[i] || offsets[2];
        gsap.fromTo(
          card,
          { x: target.x * 0.25, y: 40, rotation: target.rot * 0.25, scale: 0.82 },
          {
            x: target.x,
            y: target.y,
            rotation: target.rot,
            scale: target.scale,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fanSectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 0.6,
            },
          }
        );
      });
    }, fanSectionRef);

    return () => ctx.revert();
  }, []);

  const currentStage = FEATURE_STAGES[activeIndex];
  const fanScreens: { id: ScreenStageId; label: string }[] = [
    { id: 'events', label: 'Events & QR Passes' },
    { id: 'chats', label: 'E2E Encrypted Chats' },
    { id: 'feed', label: 'Verified Campus Feed' },
    { id: 'blinks', label: '1x View Blinks' },
    { id: 'notes', label: 'Senior Notes & PYQs' },
  ];

  return (
    <>
      {/* PART A: SCROLL-DRIVEN 6-FEATURE SHOWDOWN (Desktop Sticky + Mobile Interactive) */}
      <section
        id="features"
        ref={sectionRef}
        className="relative bg-[#05060a] py-20 sm:py-28 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-[12px] font-semibold text-[#0095f6]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Feature Showdown · 01 — 06</span>
            </div>
            <h2 className="mt-4 font-display text-balance text-[30px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white">
              Everything your campus does,{' '}
              <span className="text-[#0095f6]">in one place.</span>
            </h2>
            <p className="mt-3 text-[15.5px] sm:text-[17px] text-slate-400">
              Scroll through each campus pillar — watch the application screen and pop-up layers react in real time.
            </p>
          </div>

          {/* Scrollytelling 2-Column Layout */}
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Left Column: 6 Scroll-Triggered Feature Cards */}
            <div className="space-y-8 sm:space-y-12">
              {FEATURE_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`feature-scroll-card cursor-pointer rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                      isActive
                        ? 'border-white/25 bg-[#0d101a] shadow-[0_24px_60px_rgba(0,0,0,0.65)]'
                        : 'border-white/[0.07] bg-[#090b12]/70 hover:border-white/15'
                    }`}
                  >
                    {/* Card Top Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11.5px] font-semibold text-white">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: stage.accentColor }}
                        />
                        <span className="font-mono text-slate-400">{stage.number}</span>
                        <span>{stage.badge}</span>
                      </div>

                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10.5px] font-bold"
                        style={{
                          backgroundColor: `${stage.accentColor}20`,
                          color: stage.accentColor,
                        }}
                      >
                        {stage.metricValue}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-5 font-display text-[24px] sm:text-[30px] font-extrabold leading-[1.12] tracking-tight text-white">
                      {stage.title}{' '}
                      <span style={{ color: stage.accentColor }}>
                        {stage.highlight}
                      </span>
                    </h3>

                    <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-relaxed text-slate-300">
                      {stage.description}
                    </p>

                    {/* Bullets */}
                    <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-4">
                      {stage.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[13.5px] sm:text-[14px] font-medium text-slate-200"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: stage.accentColor }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* MOBILE-ONLY INLINE APPLICATION SCREEN RENDER + POPUPS */}
                    <div className="mt-7 flex justify-center lg:hidden pt-2 overflow-hidden">
                      <PhoneShowcase
                        activeStage={stage.id}
                        showPopups={true}
                        compact={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky 3D Phone Stage on Desktop */}
            <div className="hidden lg:flex lg:sticky lg:top-24 flex-col items-center justify-center rounded-[36px] border border-white/[0.08] bg-[#090b12]/80 p-8 backdrop-blur-xl overflow-hidden">
              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-12 rounded-full bg-gradient-to-tr ${currentStage.glowClass} blur-[90px] transition-all duration-700`}
              />

              {/* Quick Stage Switcher Pills */}
              <div className="relative z-20 mb-6 flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
                {FEATURE_STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition-all ${
                      idx === activeIndex
                        ? 'bg-[#0095f6] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {stage.number}
                  </button>
                ))}
              </div>

              <div ref={phoneRigRef} className="relative z-10 preserve-3d">
                <PhoneShowcase
                  activeStage={currentStage.id}
                  onSelectStage={(id) => {
                    const targetIdx = FEATURE_STAGES.findIndex((s) => s.id === id);
                    if (targetIdx !== -1) setActiveIndex(targetIdx);
                  }}
                  showPopups={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART B: 5-PHONE APPLICATION SCREEN RENDER FAN-OUT SHOWCASE */}
      <section
        id="screens"
        ref={fanSectionRef}
        className="relative overflow-hidden bg-[#07080e] py-20 sm:py-28 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-[12px] font-semibold text-sky-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Multi-Screen Application Renders</span>
          </div>

          <h2 className="mt-4 font-display text-balance text-[30px] sm:text-[44px] font-extrabold leading-tight tracking-tight text-white">
            Five native-grade campus screens.{' '}
            <span className="text-[#0095f6]">Zero bloat.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15.5px] sm:text-[16.5px] text-slate-400">
            Watch the screens fan out on scroll — or tap any screen below to inspect it.
          </p>

          {/* Desktop 5-Phone Fanned Stage */}
          <div className="relative mt-14 hidden lg:flex h-[560px] items-center justify-center perspective-stage">
            {fanScreens.map((screen, idx) => {
              const isFocused = focusedFanScreen === screen.id;
              const baseZIndex = idx === 2 ? 30 : idx === 1 || idx === 3 ? 20 : 10;
              return (
                <div
                  key={screen.id}
                  onClick={() => setFocusedFanScreen(screen.id)}
                  style={{ zIndex: isFocused ? 40 : baseZIndex }}
                  className={`fan-phone-item cursor-pointer absolute transition-transform duration-300 ${
                    isFocused
                      ? 'ring-2 ring-[#0095f6] rounded-[48px]'
                      : 'hover:brightness-110'
                  }`}
                >
                  <PhoneShowcase
                    activeStage={screen.id}
                    showPopups={false}
                    compact={true}
                  />
                  <span className="mt-3 inline-block rounded-full bg-white/[0.08] border border-white/10 px-3 py-1 text-[11.5px] font-semibold text-white">
                    {screen.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile / Tablet Interactive Screen Switcher + Swipeable Carousel */}
          <div className="mt-8 lg:hidden">
            {/* Mobile Screen Selector Pills */}
            <div className="mb-6 flex flex-wrap justify-center gap-1.5">
              {fanScreens.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFocusedFanScreen(s.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
                    focusedFanScreen === s.id
                      ? 'bg-[#0095f6] text-white'
                      : 'bg-white/[0.06] text-slate-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Horizontal Snap Scroll Gallery */}
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 px-2">
              {fanScreens.map((screen) => (
                <div
                  key={screen.id}
                  onClick={() => setFocusedFanScreen(screen.id)}
                  className="snap-center shrink-0 flex flex-col items-center"
                >
                  <PhoneShowcase
                    activeStage={screen.id}
                    showPopups={false}
                    compact={true}
                  />
                  <span className="mt-3 rounded-full bg-white/[0.08] border border-white/10 px-3.5 py-1 text-[12px] font-semibold text-white">
                    {screen.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
