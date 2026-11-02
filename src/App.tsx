import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { PhoneShowcase } from './components/PhoneShowcase';
import { FeaturesBento } from './components/FeaturesBento';
import { ChaosVsVibe } from './components/ChaosVsVibe';
import { CollegeLaunchpad } from './components/CollegeLaunchpad';
import { ScreenStageId } from './data/campusData';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [heroStage, setHeroStage] = useState<ScreenStageId>('feed');
  const [joinOpen, setJoinOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [facultyOpen, setFacultyOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroPhoneWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }

      if (heroTextRef.current && heroPhoneWrapRef.current) {
        const items = heroTextRef.current.querySelectorAll('.hero-anim');
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );

        gsap.fromTo(
          heroPhoneWrapRef.current,
          { opacity: 0, y: 48, rotateX: 14, rotateY: -12, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            rotateX: 6,
            rotateY: -8,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
          }
        );

        // Scroll-Scrubbed 3D Perspective Tilt on BOTH Mobile & Desktop Hero Phone
        gsap.to(heroPhoneWrapRef.current, {
          rotateX: -4,
          rotateY: 10,
          y: -24,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const heroTabs: { id: ScreenStageId; label: string }[] = [
    { id: 'feed', label: 'Feed' },
    { id: 'chats', label: 'Chats' },
    { id: 'blinks', label: 'Blinks' },
    { id: 'events', label: 'Events' },
    { id: 'notes', label: 'Notes' },
    { id: 'games', label: 'Games' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05060a] pb-16 md:pb-0 text-white antialiased selection:bg-[#0095f6]/30 selection:text-white">
      {/* Top GSAP Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left scale-x-0 bg-gradient-to-r from-[#0095f6] via-cyan-400 to-indigo-500"
      />

      {/* Sticky Glass Launch Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#05060a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0095f6] text-white shadow-[0_4px_16px_rgba(0,149,246,0.5)]">
              <span className="font-display text-[15px] font-extrabold">cv</span>
            </div>
            <span className="font-display text-[19px] font-bold tracking-tight text-white">
              Clg<span className="text-[#0095f6]">Vibe</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Feature Showdown
            </a>
            <a href="#screens" className="hover:text-white transition-colors">
              App Screens
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#safety" className="hover:text-white transition-colors">
              Safety
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setAppOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 text-[13px] font-semibold text-white hover:bg-white/[0.1] transition-colors"
            >
              <Smartphone className="h-3.5 w-3.5 text-[#0095f6]" />
              <span>Get the app</span>
            </button>
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="inline-flex h-9 items-center rounded-full bg-[#0095f6] px-4 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,149,246,0.45)] hover:bg-[#0081d6] transition-colors"
            >
              Join ClgVibe
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          >
            {mobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#05060a] px-4 py-5 space-y-3 md:hidden">
            <div className="flex flex-col space-y-2.5 text-[15px] font-medium text-slate-200">
              <a href="#features" onClick={() => setMobileMenu(false)}>
                Feature Showdown
              </a>
              <a href="#screens" onClick={() => setMobileMenu(false)}>
                App Screens
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenu(false)}>
                How it works
              </a>
              <a href="#safety" onClick={() => setMobileMenu(false)}>
                Safety
              </a>
            </div>
            <div className="pt-2 flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenu(false);
                  setJoinOpen(true);
                }}
                className="flex-1 h-10 rounded-full bg-[#0095f6] text-[13.5px] font-bold text-white"
              >
                Join ClgVibe
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenu(false);
                  setAppOpen(true);
                }}
                className="flex-1 h-10 rounded-full border border-white/20 text-[13.5px] font-semibold text-white"
              >
                Get the app
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO APPLICATION LAUNCH SECTION */}
        <section
          ref={heroSectionRef}
          className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 bg-launch-grid"
        >
          {/* Ambient Top Spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-36 -translate-x-1/2 h-[380px] w-[720px] rounded-full bg-gradient-to-tr from-[#0095f6]/25 via-indigo-500/15 to-cyan-400/10 blur-[120px]"
          />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
              {/* Left: Kinetic Hero Copy */}
              <div ref={heroTextRef} className="text-center lg:text-left">
                <div className="hero-anim inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-[12px] sm:text-[12.5px] font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-[#0095f6] animate-pulse" />
                  <span>For verified college students in India</span>
                </div>

                <h1 className="hero-anim mt-5 font-display text-balance text-[36px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[58px] lg:text-[66px]">
                  Your campus,{' '}
                  <span className="bg-gradient-to-r from-[#0095f6] via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    in one app.
                  </span>
                </h1>

                <p className="hero-anim mx-auto mt-5 max-w-xl text-[15.5px] sm:text-[17.5px] leading-relaxed text-slate-300 lg:mx-0">
                  Your campus feed, encrypted chats and Blinks, events with tickets, notes from seniors, and clubs you start yourselves. Only verified students from your college.
                </p>

                <div className="hero-anim mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  <button
                    type="button"
                    onClick={() => setJoinOpen(true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0095f6] px-7 text-[15px] font-bold text-white shadow-[0_12px_32px_rgba(0,149,246,0.5)] hover:bg-[#0081d6] transition-all"
                  >
                    <span>Join ClgVibe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppOpen(true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 text-[15px] font-semibold text-white hover:bg-white/[0.1] transition-all"
                  >
                    <Smartphone className="h-4 w-4 text-[#0095f6]" />
                    <span>Get the Android app</span>
                  </button>
                </div>

                <div className="hero-anim mt-7 flex flex-col items-center gap-2.5 sm:flex-row lg:justify-start">
                  <div className="flex -space-x-2">
                    {['AS', 'RV', 'KM', 'MS', 'NP'].map((init, i) => (
                      <span
                        key={init}
                        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[9.5px] sm:text-[10px] font-bold text-white ring-2 ring-[#05060a] ${
                          i % 2 === 0 ? 'bg-[#0095f6]' : 'bg-indigo-600'
                        }`}
                      >
                        {init}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12.5px] sm:text-[13px] text-slate-400">
                    Real names, real students. Verified by college email or student ID.
                  </p>
                </div>

                {/* Scroll Cue */}
                <a
                  href="#features"
                  className="hero-anim mt-8 inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronDown className="h-4 w-4 text-[#0095f6] animate-bounce" />
                  <span>Scroll to trigger 3D screen showdown</span>
                </a>
              </div>

              {/* Right: 3D Scroll-Tilted Phone + Pop-Up Cards + Quick Switcher */}
              <div className="flex flex-col items-center perspective-stage">
                <div ref={heroPhoneWrapRef} className="preserve-3d">
                  <PhoneShowcase
                    activeStage={heroStage}
                    onSelectStage={setHeroStage}
                    showPopups={true}
                  />
                </div>

                {/* Interactive Screen Switcher Pills */}
                <div className="mt-5 flex flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1">
                  {heroTabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setHeroStage(t.id)}
                      className={`h-7 sm:h-8 rounded-full px-3 sm:px-3.5 text-[11.5px] sm:text-[12px] font-semibold transition-all ${
                        heroStage === t.id
                          ? 'bg-[#0095f6] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCROLL-DRIVEN 6-FEATURE SHOWDOWN + 5-PHONE SCREEN FAN-OUT */}
        <FeaturesBento />

        {/* SCROLL POP-UP ONBOARDING STEPS + SAFETY SHIELD + FACULTY */}
        <ChaosVsVibe
          onOpenJoin={() => setJoinOpen(true)}
          onOpenFaculty={() => setFacultyOpen(true)}
        />

        {/* CAMPUS NETWORK + LAUNCH FINALE + MODALS */}
        <CollegeLaunchpad
          joinOpen={joinOpen}
          onCloseJoin={() => setJoinOpen(false)}
          appOpen={appOpen}
          onCloseApp={() => setAppOpen(false)}
          facultyOpen={facultyOpen}
          onCloseFaculty={() => setFacultyOpen(false)}
          onOpenJoin={() => setJoinOpen(true)}
          onOpenApp={() => setAppOpen(true)}
        />
      </main>

      {/* MOBILE STICKY BOTTOM LAUNCH BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-white/10 bg-[#05060a]/95 px-4 py-2.5 backdrop-blur-xl md:hidden">
        <button
          type="button"
          onClick={() => setJoinOpen(true)}
          className="flex-1 h-10 rounded-full bg-[#0095f6] text-[13px] font-bold text-white shadow-lg"
        >
          Join ClgVibe
        </button>
        <button
          type="button"
          onClick={() => setAppOpen(true)}
          className="flex items-center justify-center gap-1.5 h-10 rounded-full border border-white/20 bg-white/[0.06] px-4 text-[13px] font-semibold text-white"
        >
          <Smartphone className="h-3.5 w-3.5 text-[#0095f6]" />
          <span>Get App</span>
        </button>
      </div>

      {/* LAUNCH FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#040508] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0095f6] text-[13px] font-extrabold text-white">
                  cv
                </div>
                <span className="font-display text-[17px] font-bold text-white">
                  Clg<span className="text-[#0095f6]">Vibe</span>
                </span>
              </div>
              <p className="mt-2 text-[13px] text-slate-400">
                The campus app for college students in India. Verified students only.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 sm:gap-6 text-[13px] text-slate-400">
              <a
                href="https://clgvibe.com/privacy-policy"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="https://clgvibe.com/terms-and-conditions"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Terms of Service
              </a>
              <a
                href="https://clgvibe.com/community-guidelines"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Community Guidelines
              </a>
              <a
                href="mailto:support@clgvibe.com"
                className="text-[#0095f6] font-semibold hover:underline"
              >
                support@clgvibe.com
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-6 text-[12px] text-slate-500">
            <p>© {new Date().getFullYear()} ClgVibe. All rights reserved.</p>
            <p className="mt-1">
              ClgVibe is an independent student platform and is not officially affiliated with, endorsed by, or sponsored by any specific college, university, or examination body.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
