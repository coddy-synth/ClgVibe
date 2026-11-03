import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Lock,
  Eye,
  QrCode,
  FileText,
  Gamepad2,
  Sparkles,
  Check,
  PhoneOff,
  EyeOff,
  CalendarCheck,
  GraduationCap,
  Zap,
  MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PhoneFrame } from '../components/phone/PhoneFrame';
import { ScreenStack } from '../components/phone/ScreenStack';
import { ChipLayer } from '../components/phone/ChipLayer';
import type { ChipData } from '../components/phone/PopChip';
import type { ScreenId } from '../components/phone/screens';
import { useIsDesktop, usePhoneScale } from '../hooks/useViewport';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  id: ScreenId;
  kicker: string;
  icon: LucideIcon;
  title: string;
  body: string;
  bullets: string[];
  glow: string; // rgba triplet
  accent: string;
  chips: ChipData[];
}

const STEPS: Step[] = [
  {
    id: 'chapters',
    kicker: 'Chapters',
    icon: Users,
    title: 'Start a club with friends.',
    body: 'Rally backers, run events, and hand it down when you graduate. Every Chapter is built and run by students.',
    bullets: ['Propose a Chapter and collect backers', 'Post updates and run events together', 'Pass it on to the next batch'],
    glow: '0,149,246',
    accent: '#0095f6',
    chips: [
      { icon: Users, title: '8 of 10 backers', sub: 'to start Robotics Club', pos: 'tl', tone: 'blue' },
      { icon: GraduationCap, title: 'Run by students', sub: 'Hand it down at graduation', pos: 'br', tone: 'violet' },
    ],
  },
  {
    id: 'chats',
    kicker: 'Chats',
    icon: Lock,
    title: 'Chats and groups, end-to-end encrypted.',
    body: 'Only you and the people you’re talking to can read them. Connect by @username, so your number stays yours.',
    bullets: ['Messages are encrypted on your device', 'No phone numbers, ever', 'Share PDFs and notes inside batch groups'],
    glow: '16,185,129',
    accent: '#10b981',
    chips: [
      { icon: Lock, title: 'End-to-end encrypted', sub: 'We can’t read your chats', pos: 'tr', tone: 'green' },
      { icon: PhoneOff, title: 'No phone number shared', sub: 'Private @username DMs', pos: 'bl', tone: 'violet' },
    ],
  },
  {
    id: 'blinks',
    kicker: 'Blinks',
    icon: Eye,
    title: 'Blinks vanish once they’re seen.',
    body: 'Photos and videos that disappear after one view. Share the late-night study session, not a permanent record.',
    bullets: ['One-time view photos and videos', 'Reply with a reaction or a message', 'Nothing left on your profile'],
    glow: '255,111,165',
    accent: '#ff6fa5',
    chips: [
      { icon: EyeOff, title: 'Gone after 1 view', sub: 'Auto-disappears', pos: 'tl', tone: 'rose' },
      { icon: Sparkles, title: '+12 reactions', sub: 'from your batch', pos: 'br', tone: 'amber' },
    ],
  },
  {
    id: 'events',
    kicker: 'Events',
    icon: CalendarCheck,
    title: 'Fests, workshops and meetups, with tickets.',
    body: 'Grab a pass in one tap and check in at the door with a QR ticket. See what’s happening on campus this week.',
    bullets: ['QR passes with check-in at the door', 'See who from your batch is going', 'Venue and reminders in one place'],
    glow: '245,158,11',
    accent: '#f59e0b',
    chips: [
      { icon: QrCode, title: 'Pass #CV-26', sub: 'Scan at the door', pos: 'tr', tone: 'amber' },
      { icon: MapPin, title: 'Main Block', sub: 'TechFest ’26 · Mar 14', pos: 'bl', tone: 'blue' },
    ],
  },
  {
    id: 'notes',
    kicker: 'Notes',
    icon: FileText,
    title: 'Notes and past papers, from your seniors.',
    body: 'Shared by seniors, sorted by subject. Find what you need the night before.',
    bullets: ['Solved papers and unit notes by subject', 'Know which senior shared it', 'Download and keep offline'],
    glow: '144,153,252',
    accent: '#7c83f5',
    chips: [
      { icon: FileText, title: 'OS · 2025 paper', sub: 'Shared by Rohan, 3rd year', pos: 'tl', tone: 'violet' },
      { icon: Check, title: 'From verified seniors', sub: 'Your college only', pos: 'br', tone: 'green' },
    ],
  },
  {
    id: 'games',
    kicker: 'Games',
    icon: Gamepad2,
    title: 'UNO and party games with your batch.',
    body: 'Between lectures or after them. Spin up a room, bring your batchmates, and settle it over a hand of UNO.',
    bullets: ['Live multiplayer rooms', 'Stack +2s and call it', 'Play with your batch or your hostel'],
    glow: '59,130,246',
    accent: '#3b82f6',
    chips: [
      { icon: Gamepad2, title: 'Room 4B is live', sub: '3 of 4 players ready', pos: 'tr', tone: 'blue' },
      { icon: Zap, title: '+2 stacked!', sub: 'Chaos incoming', pos: 'bl', tone: 'amber' },
    ],
  },
];

const N = STEPS.length;

export const FeatureStory: React.FC = () => {
  const isDesktop = useIsDesktop();
  const scale = usePhoneScale(isDesktop ? 0.72 : 0.44, isDesktop ? 0.4 : 0.56, 0.42, 1.05);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const first = useRef(true);

  /* initial text state */
  useLayoutEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
      el.style.pointerEvents = i === 0 ? 'auto' : 'none';
    });
    barRefs.current.forEach((b) => b && gsap.set(b, { scaleX: 0, transformOrigin: 'left center' }));
  }, []);

  /* scroll plumbing */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // intro heading pop
      gsap.from('[data-story-intro] > *', {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: introRef.current, start: 'top 82%' },
      });

      const rotY = gsap.quickTo(rigRef.current, 'rotateY', { duration: 0.7, ease: 'power3.out' });
      const rotX = gsap.quickTo(rigRef.current, 'rotateX', { duration: 0.7, ease: 'power3.out' });
      const lift = gsap.quickTo(rigRef.current, 'y', { duration: 0.7, ease: 'power3.out' });

      stRef.current = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          const raw = p * N;
          const idx = Math.min(N - 1, Math.floor(raw));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
          // segmented progress bars
          barRefs.current.forEach((b, i) => {
            if (!b) return;
            const fill = i < idx ? 1 : i === idx ? Math.min(1, raw - idx) : 0;
            gsap.set(b, { scaleX: fill });
          });
          // continuous 3D tilt while scrolling through the story
          const wave = Math.sin(raw * Math.PI);
          rotY(-14 + p * 28);
          rotX(5 - wave * 6);
          lift(-wave * 10);
        },
      });
    }, trackRef);

    return () => {
      ctx.revert();
      stRef.current?.kill();
    };
  }, []);

  /* step change: text + phone pop + glow */
  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const parts = el.querySelectorAll('[data-s]');
      gsap.killTweensOf(el);
      gsap.killTweensOf(parts);
      if (i === active) {
        el.style.pointerEvents = 'auto';
        gsap.set(el, { opacity: 1 });
        if (first.current) return;
        gsap.fromTo(
          parts,
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.12 }
        );
      } else {
        el.style.pointerEvents = 'none';
        gsap.to(el, { opacity: 0, duration: 0.22, ease: 'power2.in' });
      }
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, { '--g': STEPS[active].glow, duration: 0.8, ease: 'power2.out' });
    }
    if (!first.current && popRef.current) {
      gsap.fromTo(popRef.current, { scale: 0.955 }, { scale: 1, duration: 0.75, ease: 'back.out(3)' });
    }
    first.current = false;
  }, [active]);

  const jumpTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * ((i + 0.5) / N);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section id="features" className="relative bg-[#fafafa]">
      {/* intro (scrolls away) */}
      <div ref={introRef} className="mx-auto max-w-6xl px-5 pb-6 pt-20 text-center lg:pb-10 lg:pt-28">
        <div data-story-intro>
          <span className="inline-flex items-center gap-2 rounded-full bg-vibe-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-vibe-dark">
            <Sparkles className="h-3.5 w-3.5" /> Features
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[34px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px]">
            Everything your campus does, in one place.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-ink/60 sm:text-[18px]">
            Not another feed to scroll. The things you’d otherwise chase across ten group chats.
          </p>
        </div>
      </div>

      {/* scroll track: tall; the stage inside is sticky for the whole length */}
      <div ref={trackRef} style={{ height: `${N * 100}svh` }} className="relative">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            ref={glowRef}
            aria-hidden
            className="absolute inset-0"
            style={{
              ['--g' as string]: STEPS[0].glow,
              background:
                'radial-gradient(60% 55% at 72% 50%, rgba(var(--g),0.22), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(var(--g),0.12), transparent 70%)',
            }}
          />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col px-5 pt-[68px] lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-6 lg:pt-[64px]">
            {/* phone (top on mobile, right on desktop) */}
            <div className="flex min-h-0 flex-1 items-center justify-center lg:order-2 lg:flex-none">
              <div style={{ perspective: 1500 }}>
                <div ref={rigRef} style={{ transformStyle: 'preserve-3d' }}>
                  <div ref={popRef} className="relative" style={{ width: 300 * scale, height: 620 * scale, transformStyle: 'preserve-3d' }}>
                    <PhoneFrame scale={scale}>
                      <ScreenStack screens={STEPS.map((s) => s.id)} active={active} />
                    </PhoneFrame>
                    <ChipLayer sets={STEPS.map((s) => s.chips)} active={active} />
                  </div>
                </div>
              </div>
            </div>

            {/* copy */}
            <div className="shrink-0 pb-6 lg:order-1 lg:pb-0 lg:pr-6">
              <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.id}
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                      className="text-center lg:text-left"
                    >
                      <span
                        data-s
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-bold"
                        style={{ background: `rgba(${s.glow},0.14)`, color: s.accent }}
                      >
                        <Icon className="h-3.5 w-3.5" /> {s.kicker}
                        <span className="font-mono text-[11px] opacity-70">
                          0{i + 1}/0{N}
                        </span>
                      </span>
                      <h3
                        data-s
                        className="mt-3 font-display text-[26px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[34px] lg:mt-4 lg:text-[48px]"
                      >
                        {s.title}
                      </h3>
                      <p data-s className="mx-auto mt-2.5 max-w-md text-[14.5px] leading-relaxed text-ink/65 lg:mx-0 lg:mt-4 lg:text-[17px]">
                        {s.body}
                      </p>
                      <ul className="mt-6 hidden space-y-2.5 lg:block">
                        {s.bullets.map((b) => (
                          <li key={b} data-s className="flex items-center gap-3 text-[15px] font-medium text-ink/80">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: s.accent }}>
                              <Check className="h-3 w-3" strokeWidth={3.4} />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* progress */}
              <div className="mt-5 flex items-center justify-center gap-1.5 lg:mt-8 lg:justify-start">
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Show ${s.kicker}`}
                    onClick={() => jumpTo(i)}
                    className="group relative h-5 w-8 lg:w-12"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 overflow-hidden rounded-full bg-black/10 transition-all group-hover:h-[6px]">
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el;
                        }}
                        className="block h-full w-full rounded-full"
                        style={{ background: s.accent }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

