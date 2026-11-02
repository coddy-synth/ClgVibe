import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { FEATURE_STAGES, ScreenStageId } from '../data/campusData';
import { AdaptivePhone } from './AdaptivePhone';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesBento: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopPhoneRigRef = useRef<HTMLDivElement>(null);
  const mobilePhoneRigRef = useRef<HTMLDivElement>(null);
  const fanSectionRef = useRef<HTMLDivElement>(null);
  const [focusedFanScreen, setFocusedFanScreen] = useState<ScreenStageId>('feed');

  // 1. Scroll-Driven Feature Showdown
  //    - Mobile / Tablet (< 1024px): scrubbed 3D pop-ups + sticky top phone stage (unchanged)
  //    - Desktop (>= 1024px): original classic showdown (toggle pop-ups + sticky right-hand phone)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
      },
      (context) => {
        if (!sectionRef.current) return;
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const stageCards = sectionRef.current.querySelectorAll('.feature-scroll-card');

        stageCards.forEach((card, index) => {
          if (isDesktop) {
            // Classic desktop pop-up entrance as each card enters the viewport
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
          } else {
            // Elastic 3D pop-up entrance as each feature card scrolls into view
            gsap.fromTo(
              card,
              { opacity: 0.25, y: 48, scale: 0.92, rotateX: 10 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.6,
                ease: 'back.out(1.65)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  end: 'top 45%',
                  scrub: 0.4,
                },
              }
            );

            ScrollTrigger.create({
              trigger: card,
              start: 'top 68%',
              end: 'bottom 38%',
              onEnter: () => setActiveIndex(index),
              onEnterBack: () => setActiveIndex(index),
            });
          }
        });

        // Phone tilt while scrolling through the section
        if (isDesktop) {
          if (desktopPhoneRigRef.current) {
            gsap.fromTo(
              desktopPhoneRigRef.current,
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
        } else if (mobilePhoneRigRef.current) {
          gsap.fromTo(
            mobilePhoneRigRef.current,
            { rotateY: -11, rotateX: 6 },
            {
              rotateY: 11,
              rotateX: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
      },
      sectionRef
    );

    return () => mm.revert();
  }, []);

  // 2. Unified 5-Phone Application Screen Fan-Out on Scroll (Responsive GSAP matchMedia for Mobile + Desktop!)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isTablet: '(min-width: 640px) and (max-width: 1023px)',
        isMobile: '(max-width: 639px)',
      },
      (context) => {
        if (!fanSectionRef.current) return;
        const { isDesktop, isTablet } = context.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
          isMobile: boolean;
        };

        const cards = fanSectionRef.current.querySelectorAll('.fan-phone-item');

        const desktopOffsets = [
          { x: -330, y: 38, rot: -13, scale: 0.85 },
          { x: -170, y: 14, rot: -6.5, scale: 0.93 },
          { x: 0, y: 0, rot: 0, scale: 1 },
          { x: 170, y: 14, rot: 6.5, scale: 0.93 },
          { x: 330, y: 38, rot: 13, scale: 0.85 },
        ];

        const tabletOffsets = [
          { x: -210, y: 30, rot: -13, scale: 0.78 },
          { x: -108, y: 12, rot: -6.5, scale: 0.86 },
          { x: 0, y: 0, rot: 0, scale: 0.94 },
          { x: 108, y: 12, rot: 6.5, scale: 0.86 },
          { x: 210, y: 30, rot: 13, scale: 0.78 },
        ];

        const mobileOffsets = [
          { x: -112, y: 26, rot: -14, scale: 0.68 },
          { x: -58, y: 10, rot: -7, scale: 0.76 },
          { x: 0, y: 0, rot: 0, scale: 0.85 },
          { x: 58, y: 10, rot: 7, scale: 0.76 },
          { x: 112, y: 26, rot: 14, scale: 0.68 },
        ];

        const offsets = isDesktop
          ? desktopOffsets
          : isTablet
          ? tabletOffsets
          : mobileOffsets;

        cards.forEach((card, i) => {
          const target = offsets[i] || offsets[2];
          gsap.fromTo(
            card,
            isDesktop
              ? { x: target.x * 0.25, y: 40, rotation: target.rot * 0.25, scale: 0.82 }
              : { x: 0, y: 55, rotation: 0, scale: target.scale * 0.8 },
            {
              x: target.x,
              y: target.y,
              rotation: target.rot,
              scale: target.scale,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: fanSectionRef.current,
                start: isDesktop ? 'top 80%' : 'top 82%',
                end: 'center center',
                scrub: 0.6,
              },
            }
          );
        });
      },
      fanSectionRef
    );

    return () => mm.revert();
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
      {/* PART A: SCROLL-DRIVEN 6-FEATURE SHOWDOWN (Sticky 3D Phone on BOTH Mobile & Desktop!) */}
      <section
        id="features"
        ref={sectionRef}
        className="relative bg-[#05060a] py-16 sm:py-28 lg:py-28 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1 text-[12px] font-semibold text-[#0095f6]">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="lg:hidden">
                Scroll-Driven Feature Showdown · {currentStage.number} / 06
              </span>
              <span className="hidden lg:inline">Interactive Feature Showdown · 01 — 06</span>
            </div>
            <h2 className="mt-4 font-display text-balance text-[30px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white">
              Everything your campus does,{' '}
              <span className="text-[#0095f6]">in one place.</span>
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-slate-400 lg:hidden">
              Scroll down — the 3D application screen and floating pop-up cards morph automatically with every feature.
            </p>
            <p className="mt-3 hidden text-[17px] text-slate-400 lg:block">
              Scroll through each campus pillar — watch the application screen and pop-up layers react in real time.
            </p>
          </div>

          {/* MOBILE & TABLET STICKY 3D PHONE STAGE (Reacts to scroll identically to desktop!) */}
          <div className="sticky top-[62px] z-20 mb-8 flex flex-col items-center rounded-3xl border border-white/10 bg-[#070911]/90 py-3.5 px-2 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] lg:hidden overflow-hidden">
            {/* Dynamic Ambient Glow on Mobile */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-6 rounded-full bg-gradient-to-tr ${currentStage.glowClass} blur-[65px] transition-all duration-700`}
            />

            {/* Stage Indicator Bar */}
            <div className="relative z-20 mb-2.5 flex items-center gap-1 rounded-full border border-white/10 bg-black/50 p-1">
              {FEATURE_STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold transition-all ${
                    idx === activeIndex
                      ? 'bg-[#0095f6] text-white shadow'
                      : 'text-slate-400'
                  }`}
                >
                  {stage.number}
                </button>
              ))}
            </div>

            {/* 3D Scroll-Tilted Mobile Phone + Pop-Up Badges */}
            <div ref={mobilePhoneRigRef} className="relative z-10 preserve-3d">
              <AdaptivePhone
                activeStage={currentStage.id}
                onSelectStage={(id) => {
                  const targetIdx = FEATURE_STAGES.findIndex((s) => s.id === id);
                  if (targetIdx !== -1) setActiveIndex(targetIdx);
                }}
                showPopups={true}
                mobileSticky={true}
              />
            </div>
          </div>

          {/* Scrollytelling 2-Column Layout */}
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 perspective-stage lg:[perspective:none] lg:[transform-style:flat]">
            {/* Left Column: 6 Scroll-Triggered Feature Cards (Scrolls over/below sticky mobile stage & beside desktop stage) */}
            <div className="relative z-30 space-y-24 sm:space-y-20 lg:space-y-12">
              {FEATURE_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`feature-scroll-card cursor-pointer rounded-3xl border p-6 sm:p-8 backdrop-blur-xl lg:backdrop-blur-none transition-all duration-300 ${
                      isActive
                        ? 'border-white/25 bg-[#0d101a]/95 lg:bg-[#0d101a] shadow-[0_24px_60px_rgba(0,0,0,0.85)] lg:shadow-[0_24px_60px_rgba(0,0,0,0.65)]'
                        : 'border-white/[0.08] lg:border-white/[0.07] bg-[#090b12]/90 lg:bg-[#090b12]/70 hover:border-white/15'
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
                    <h3 className="mt-4 sm:mt-5 font-display text-[22px] sm:text-[30px] font-extrabold leading-[1.12] tracking-tight text-white">
                      {stage.title}{' '}
                      <span style={{ color: stage.accentColor }}>
                        {stage.highlight}
                      </span>
                    </h3>

                    <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15.5px] leading-relaxed text-slate-300">
                      {stage.description}
                    </p>

                    {/* Bullets */}
                    <ul className="mt-4 sm:mt-5 space-y-2 border-t border-white/[0.07] pt-3.5">
                      {stage.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[13px] sm:text-[14px] font-medium text-slate-200"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: stage.accentColor }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
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

              <div ref={desktopPhoneRigRef} className="relative z-10 preserve-3d">
                <AdaptivePhone
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

      {/* PART B: 5-PHONE APPLICATION SCREEN RENDER FAN-OUT SHOWCASE (Active on BOTH Mobile & Desktop!) */}
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
          <p className="mx-auto mt-3 max-w-2xl text-[15px] sm:text-[16.5px] text-slate-400">
            Watch all 5 application screens fan out in 3D space as you scroll — tap any screen to bring it front and center.
          </p>

          {/* Interactive Screen Focus Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {fanScreens.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFocusedFanScreen(s.id)}
                className={`rounded-full px-3 py-1.5 text-[11.5px] sm:text-[12px] font-semibold transition-all ${
                  focusedFanScreen === s.id
                    ? 'bg-[#0095f6] text-white shadow-[0_6px_20px_rgba(0,149,246,0.45)]'
                    : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.12]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Unified 5-Phone Fanned Stage (Works on Mobile, Tablet & Desktop via GSAP matchMedia!) */}
          <div className="relative mt-10 sm:mt-14 flex h-[390px] sm:h-[520px] lg:h-[560px] items-center justify-center perspective-stage">
            {fanScreens.map((screen, idx) => {
              const isFocused = focusedFanScreen === screen.id;
              const baseZIndex = idx === 2 ? 30 : idx === 1 || idx === 3 ? 20 : 10;
              return (
                <div
                  key={screen.id}
                  onClick={() => setFocusedFanScreen(screen.id)}
                  style={{ zIndex: isFocused ? 50 : baseZIndex }}
                  className={`fan-phone-item cursor-pointer absolute transition-shadow duration-300 ${
                    isFocused
                      ? 'ring-2 ring-[#0095f6] rounded-[42px] sm:rounded-[50px] shadow-[0_25px_70px_rgba(0,149,246,0.35)]'
                      : 'hover:brightness-110'
                  }`}
                >
                  <AdaptivePhone
                    activeStage={screen.id}
                    showPopups={false}
                    compact={true}
                  />
                  <span className="mt-2 sm:mt-3 inline-block rounded-full bg-[#0e111a]/90 border border-white/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11.5px] font-semibold text-white shadow-lg">
                    {screen.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
