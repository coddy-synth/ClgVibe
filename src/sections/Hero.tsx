import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, Heart, Lock, QrCode, ShieldCheck, Smartphone, EyeOff, PhoneOff } from 'lucide-react';
import { PhoneFrame } from '../components/phone/PhoneFrame';
import { ScreenStack } from '../components/phone/ScreenStack';
import { ChipLayer } from '../components/phone/ChipLayer';
import type { ChipData } from '../components/phone/PopChip';
import type { ScreenId } from '../components/phone/screens';
import { AVATARS, LINKS } from '../lib/links';
import { useIsDesktop, usePhoneScale } from '../hooks/useViewport';

gsap.registerPlugin(ScrollTrigger);

const TABS: { id: ScreenId; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'chats', label: 'Chats' },
  { id: 'blinks', label: 'Blinks' },
  { id: 'events', label: 'Events' },
];

const CHIPS: ChipData[][] = [
  [
    { icon: ShieldCheck, title: 'Verified batchmate', sub: '@aanya · your college', pos: 'tl', tone: 'blue' },
    { icon: Heart, title: '128 likes', sub: 'on the Demo Day post', pos: 'br', tone: 'rose' },
  ],
  [
    { icon: Lock, title: 'End-to-end encrypted', sub: 'Only you two can read it', pos: 'tr', tone: 'green' },
    { icon: PhoneOff, title: 'No phone numbers', sub: 'Just @usernames', pos: 'bl', tone: 'violet' },
  ],
  [
    { icon: EyeOff, title: 'Gone after 1 view', sub: 'Blinks disappear', pos: 'tl', tone: 'violet' },
    { icon: Heart, title: '+12 reactions', sub: 'from your batch', pos: 'br', tone: 'rose' },
  ],
  [
    { icon: QrCode, title: 'Pass #CV-26 ready', sub: 'Scan at the door', pos: 'tr', tone: 'amber' },
    { icon: ShieldCheck, title: 'Campus only', sub: 'Verified students', pos: 'bl', tone: 'blue' },
  ],
];

interface HeroProps {
  onGetApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetApp }) => {
  const isDesktop = useIsDesktop();
  const scale = usePhoneScale(isDesktop ? 0.74 : 0.5, isDesktop ? 0.4 : 0.64, 0.5, 1.08);
  const [tab, setTab] = useState(0);
  const interacted = useRef(false);

  const rootRef = useRef<HTMLElement>(null);
  const phoneRigRef = useRef<HTMLDivElement>(null);

  /* auto-cycle tabs until the visitor takes over */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!interacted.current) setTab((t) => (t + 1) % TABS.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero-word]', { yPercent: 115, rotate: 3, duration: 0.9, stagger: 0.09 }, 0.1)
        .from('[data-hero-fade]', { y: 22, opacity: 0, duration: 0.7, stagger: 0.09 }, 0.45)
        .from(
          '[data-phone-intro]',
          { y: 90, opacity: 0, rotateY: -22, rotateX: 10, scale: 0.88, duration: 1.2, ease: 'power4.out' },
          0.2
        );

      // scroll-driven parallax: phone drifts up & tilts, blobs counter-drift
      gsap.to(phoneRigRef.current, {
        y: -70,
        rotateY: 9,
        rotateX: -3,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to('[data-blob-a]', {
        y: 140,
        x: -40,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to('[data-blob-b]', {
        y: -90,
        x: 50,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to('[data-hero-copy]', {
        y: -40,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: '55% top', end: 'bottom top', scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const words = (t: string, cls = '') =>
    t.split(' ').map((w, i) => (
      <span key={`${w}-${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-top last:mr-0">
        <span data-hero-word className={`inline-block ${cls}`}>
          {w}
        </span>
      </span>
    ));

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden pb-14 pt-[92px] lg:pb-24 lg:pt-[120px]">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,60,120,0.09)_1px,transparent_0)] [background-size:26px_26px] [mask-image:radial-gradient(70%_60%_at_60%_30%,black,transparent)]" />
      <div data-blob-a aria-hidden className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#0095f6]/20 blur-[90px] lg:h-[560px] lg:w-[560px]" />
      <div data-blob-b aria-hidden className="pointer-events-none absolute -left-32 top-[40%] h-[320px] w-[320px] rounded-full bg-[#9099fc]/25 blur-[90px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 lg:min-h-[calc(100svh-180px)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
        {/* copy */}
        <div data-hero-copy className="text-center lg:text-left">
          <div
            data-hero-fade
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink/75 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vibe opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-vibe" />
            </span>
            For verified college students
          </div>

          <h1 className="mt-5 font-display text-[44px] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px] lg:text-[78px]">
            <span className="block">{words('Your campus,')}</span>
            <span className="block">{words('in one app.', 'bg-gradient-to-r from-[#0095f6] via-[#4aa8ff] to-[#9099fc] bg-clip-text text-transparent')}</span>
          </h1>

          <p data-hero-fade className="mx-auto mt-5 max-w-[34rem] text-[16px] leading-relaxed text-ink/65 sm:text-[18px] lg:mx-0">
            Your campus feed, encrypted chats and Blinks, events with tickets, notes from seniors, and clubs you start
            yourselves. Only verified students from your college.
          </p>

          <div data-hero-fade className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <a
              href={LINKS.signup}
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-vibe px-8 text-[16px] font-semibold text-white shadow-[0_16px_34px_-12px_rgba(0,149,246,0.95)] transition hover:-translate-y-0.5 hover:bg-vibe-dark"
            >
              Join ClgVibe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={onGetApp}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-7 text-[16px] font-semibold text-ink transition hover:-translate-y-0.5 hover:border-black/30"
            >
              <Smartphone className="h-4 w-4 text-vibe" />
              Get the app
            </button>
          </div>

          <div data-hero-fade className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <div className="flex -space-x-2.5">
              {[AVATARS.aanya, AVATARS.rohan, AVATARS.meera, AVATARS.kabir, AVATARS.priya, AVATARS.dev].map((a) => (
                <img key={a} src={a} alt="" className="h-9 w-9 rounded-full bg-sky-100 object-cover ring-2 ring-white" />
              ))}
            </div>
            <p className="text-[13.5px] text-ink/55">Real names, real students. Verified by college email or student ID.</p>
          </div>
        </div>

        {/* phone */}
        <div className="flex flex-col items-center">
          <div style={{ perspective: 1400 }} className="relative">
            <div ref={phoneRigRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* glow card behind */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[88%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[44px] bg-gradient-to-br from-[#e6f3ff] via-white to-[#eef0ff]"
              />
              <div data-phone-intro className="relative" style={{ width: 300 * scale, height: 620 * scale, transformStyle: 'preserve-3d' }}>
                <PhoneFrame scale={scale}>
                  <ScreenStack screens={TABS.map((t) => t.id)} active={tab} />
                </PhoneFrame>
                <ChipLayer sets={CHIPS} active={tab} />
              </div>
            </div>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-black/[0.08] bg-white/90 p-1 shadow-sm backdrop-blur">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  interacted.current = true;
                  setTab(i);
                }}
                className={`h-9 rounded-full px-4 text-[13px] font-semibold transition ${
                  tab === i ? 'bg-ink text-white shadow' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#features"
        data-hero-fade
        className="relative mx-auto mt-8 hidden w-fit items-center gap-2 text-[12.5px] font-semibold text-ink/45 transition hover:text-ink lg:flex"
      >
        <ChevronDown className="h-4 w-4 animate-bounce text-vibe" /> Scroll to see everything it does
      </a>
    </section>
  );
};
