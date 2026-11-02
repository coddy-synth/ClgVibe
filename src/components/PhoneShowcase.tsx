import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  CheckCircle2,
  Heart,
  MessageCircle,
  Bookmark,
  FileText,
  Lock,
  ShieldCheck,
  Flame,
  Eye,
  MapPin,
  QrCode,
  Download,
  Sparkles,
  Calendar,
  Gamepad2,
  Users,
  Zap,
} from 'lucide-react';
import { ScreenStageId } from '../data/campusData';

interface PhoneShowcaseProps {
  activeStage: ScreenStageId;
  onSelectStage?: (stage: ScreenStageId) => void;
  showPopups?: boolean;
  compact?: boolean;
  mobileSticky?: boolean;
}

const QR_BITS = [
  1, 1, 1, 0, 1,
  1, 0, 1, 1, 0,
  1, 1, 1, 0, 1,
  0, 1, 0, 1, 1,
  1, 0, 1, 1, 1,
];

export const PhoneShowcase: React.FC<PhoneShowcaseProps> = ({
  activeStage,
  onSelectStage,
  showPopups = true,
  compact = false,
  mobileSticky = false,
}) => {
  const screenContentRef = useRef<HTMLDivElement>(null);
  const popupsContainerRef = useRef<HTMLDivElement>(null);

  // Trigger elastic GSAP screen transition + 3D pop-up burst on every stage change
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (screenContentRef.current) {
        gsap.fromTo(
          screenContentRef.current,
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' }
        );
      }

      if (popupsContainerRef.current && showPopups) {
        const popCards = popupsContainerRef.current.querySelectorAll('.gsap-pop-card');
        gsap.fromTo(
          popCards,
          { opacity: 0, scale: 0.45, y: 22, rotateX: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            duration: 0.58,
            stagger: 0.09,
            ease: 'back.out(2)',
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeStage, showPopups]);

  const navTabs: { id: ScreenStageId; label: string; icon: React.ElementType }[] = [
    { id: 'feed', label: 'Feed', icon: Sparkles },
    { id: 'chats', label: 'Chats', icon: MessageCircle },
    { id: 'blinks', label: 'Blinks', icon: Flame },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'games', label: 'Clubs', icon: Gamepad2 },
  ];

  // Responsive chassis sizing so mobile sticky & 5-phone fan-out match desktop fidelity
  const sizeClasses = compact
    ? 'w-[186px] h-[382px] sm:w-[238px] sm:h-[488px]'
    : mobileSticky
    ? 'w-[232px] h-[466px] sm:w-[308px] sm:h-[610px]'
    : 'w-[268px] h-[542px] sm:w-[312px] sm:h-[616px]';

  return (
    <div className="relative mx-auto flex w-fit items-center justify-center select-none perspective-stage">
      {/* 3D POP-UP FLOATING UI CARDS AROUND THE PHONE (Active on both Mobile & Desktop) */}
      {showPopups && (
        <div
          ref={popupsContainerRef}
          className="pointer-events-none absolute inset-0 z-30 preserve-3d"
        >
          {activeStage === 'feed' && (
            <>
              <div className="gsap-pop-card absolute -left-8 sm:-left-24 top-8 sm:top-14 flex items-center gap-2 rounded-2xl border border-white/20 bg-[#0e111a]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-[#0095f6]/20 text-[#0095f6]">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[9.5px] sm:text-[11px] font-bold text-white leading-tight">
                    Verified Batchmate
                  </p>
                  <p className="text-[8px] sm:text-[9.5px] text-sky-400 font-mono">
                    @aanya.cse · iitb.ac.in
                  </p>
                </div>
              </div>

              <div className="gsap-pop-card absolute -right-8 sm:-right-24 bottom-16 sm:bottom-24 flex items-center gap-2 rounded-2xl border border-white/20 bg-[#0e111a]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[9.5px] sm:text-[11px] font-bold text-white leading-tight">
                    Live Campus Poll
                  </p>
                  <p className="text-[8px] sm:text-[9.5px] text-slate-400">
                    284 verified votes
                  </p>
                </div>
              </div>
            </>
          )}

          {activeStage === 'chats' && (
            <>
              <div className="gsap-pop-card absolute -right-8 sm:-right-24 top-10 sm:top-16 flex items-center gap-2 rounded-2xl border border-emerald-500/35 bg-[#0d1514]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[9.5px] sm:text-[11px] font-bold text-white leading-tight">
                    X25519 Encrypted
                  </p>
                  <p className="font-mono text-[8px] sm:text-[9.5px] text-emerald-400">
                    0x8f3a...e91c [E2E]
                  </p>
                </div>
              </div>

              <div className="gsap-pop-card absolute -left-8 sm:-left-24 bottom-16 sm:bottom-24 rounded-2xl border border-white/20 bg-[#0e111a]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <p className="text-[9.5px] sm:text-[10.5px] font-bold text-white">
                  Zero Phone Numbers
                </p>
                <p className="text-[8px] sm:text-[9.5px] text-slate-400">
                  Private @username DMs
                </p>
              </div>
            </>
          )}

          {activeStage === 'blinks' && (
            <>
              <div className="gsap-pop-card absolute -left-8 sm:-left-24 top-12 sm:top-20 flex items-center gap-2 rounded-2xl border border-violet-500/35 bg-[#140f24]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[9.5px] sm:text-[11px] font-bold text-white leading-tight">
                    1-Time View Only
                  </p>
                  <p className="text-[8px] sm:text-[9.5px] text-violet-300">
                    Vanishes once seen
                  </p>
                </div>
              </div>

              <div className="gsap-pop-card absolute -right-6 sm:-right-20 bottom-16 sm:bottom-24 flex items-center gap-1.5 rounded-full border border-rose-500/35 bg-rose-500/25 px-3 py-1.5 backdrop-blur-xl shadow-2xl">
                <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-rose-500 text-rose-500" />
                <span className="text-[9.5px] sm:text-[11px] font-bold text-white">
                  +48 Live Reactions
                </span>
              </div>
            </>
          )}

          {activeStage === 'events' && (
            <div className="gsap-pop-card absolute -right-8 sm:-right-28 top-14 sm:top-24 flex items-center gap-2.5 rounded-2xl border border-amber-500/35 bg-[#14120e]/95 p-2.5 sm:p-3 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div>
                <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-amber-400">
                  Gate Pass · #CV-26
                </span>
                <p className="text-[10px] sm:text-[11.5px] font-bold text-white">
                  TechFest ’26 VIP Ticket
                </p>
                <p className="text-[8px] sm:text-[9.5px] text-emerald-400 font-semibold">
                  ✓ Ready to scan at door
                </p>
              </div>
              <div className="border-l border-dashed border-white/20 pl-2.5">
                <div className="grid grid-cols-5 gap-[2px]">
                  {QR_BITS.map((b, i) => (
                    <span
                      key={i}
                      className={`h-[4px] w-[4px] sm:h-[5px] sm:w-[5px] rounded-[1px] ${
                        b ? 'bg-white' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStage === 'notes' && (
            <div className="gsap-pop-card absolute -left-8 sm:-left-28 top-14 sm:top-24 flex items-center gap-2 rounded-2xl border border-pink-500/35 bg-[#170f18]/95 px-2.5 py-2 sm:px-3.5 sm:py-3 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="text-[9.5px] sm:text-[11px] font-bold text-white">
                  OS_2025_Solved_Paper.pdf
                </p>
                <p className="text-[8px] sm:text-[9.5px] text-pink-300">
                  Aanya (4th Yr) · 1.2k downloads
                </p>
              </div>
            </div>
          )}

          {activeStage === 'games' && (
            <>
              <div className="gsap-pop-card absolute -right-6 sm:-right-20 top-8 sm:top-14 flex -rotate-6 items-center gap-1.5">
                <div className="flex h-14 w-10 sm:h-20 sm:w-14 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#0095f6] to-indigo-600 text-white shadow-2xl ring-2 ring-white/40">
                  <span className="font-display text-[14px] sm:text-[18px] font-extrabold">
                    +4
                  </span>
                  <span className="text-[6.5px] sm:text-[7.5px] font-bold uppercase">
                    Wild
                  </span>
                </div>
                <div className="flex h-14 w-10 sm:h-20 sm:w-14 rotate-12 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-2xl ring-2 ring-white/40">
                  <span className="font-display text-[14px] sm:text-[18px] font-extrabold">
                    7
                  </span>
                  <span className="text-[6.5px] sm:text-[7.5px] font-bold uppercase">
                    UNO
                  </span>
                </div>
              </div>

              <div className="gsap-pop-card absolute -left-8 sm:-left-24 bottom-16 sm:bottom-24 flex items-center gap-2 rounded-2xl border border-cyan-500/35 bg-[#0c151c]/95 px-2.5 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 shrink-0" />
                <div>
                  <p className="text-[9.5px] sm:text-[11px] font-bold text-white">
                    10/10 Chapter Backers
                  </p>
                  <p className="text-[8px] sm:text-[9.5px] text-cyan-300">
                    ✓ Faculty Approved
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* HARDWARE PHONE CHASSIS */}
      <div
        className={`relative rounded-[40px] sm:rounded-[50px] bg-[#1c1d22] p-[6px] sm:p-[8px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.92),inset_0_0_0_1.5px_rgba(255,255,255,0.16)] transition-all duration-300 ${sizeClasses}`}
      >
        {/* Side Hardware Buttons */}
        <span className="absolute -left-[2.5px] top-[80px] h-[20px] w-[3px] rounded-l-sm bg-[#2c2d35]" />
        <span className="absolute -left-[2.5px] top-[112px] h-[34px] w-[3px] rounded-l-sm bg-[#2c2d35]" />
        <span className="absolute -left-[2.5px] top-[154px] h-[34px] w-[3px] rounded-l-sm bg-[#2c2d35]" />
        <span className="absolute -right-[2.5px] top-[126px] h-[52px] w-[3px] rounded-r-sm bg-[#2c2d35]" />

        {/* Subtle Glass Reflection Overlay */}
        <div
          aria-hidden="true"
          className="phone-glass-reflection pointer-events-none absolute inset-[6px] sm:inset-[8px] z-20 rounded-[34px] sm:rounded-[42px]"
        />

        {/* Phone Inner Screen */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] sm:rounded-[42px] bg-[#090a0f] text-white">
          {/* Status Bar + Dynamic Island */}
          <div className="relative z-30 flex h-7 sm:h-9 shrink-0 items-center justify-between px-4 sm:px-5 pt-1 text-[9px] sm:text-[10px] font-semibold text-white/90">
            <span>9:41</span>
            <div className="flex h-[14px] sm:h-[16px] w-[58px] sm:w-[70px] items-center justify-between rounded-full bg-black px-2 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0095f6]" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[8.5px] sm:text-[9px] font-bold">5G</span>
          </div>

          {/* App Top Bar */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-3 py-1.5 sm:px-3.5 sm:py-2">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-[13px] sm:text-[15px] font-bold tracking-tight text-white">
                Clg<span className="text-[#0095f6]">Vibe</span>
              </span>
              <span className="rounded-full bg-[#0095f6]/15 px-1.5 py-0.5 text-[7.5px] sm:text-[8px] font-bold text-[#0095f6]">
                IITB
              </span>
            </div>
            <span className="flex items-center gap-1 text-[8.5px] sm:text-[9px] text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Verified
            </span>
          </div>

          {/* Animated Screen Stage Body */}
          <div
            ref={screenContentRef}
            className="flex-1 overflow-y-auto no-scrollbar p-2.5 sm:p-3 space-y-2"
          >
            {/* STAGE 1: FEED */}
            {activeStage === 'feed' && (
              <>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {[
                    { name: 'You', init: '+', ring: 'border border-dashed border-white/25' },
                    { name: 'Aanya', init: 'AS', ring: 'bg-gradient-to-tr from-[#0095f6] to-cyan-400 p-[1.5px]' },
                    { name: 'Rohan', init: 'RV', ring: 'bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[1.5px]' },
                    { name: 'Robotics', init: 'RB', ring: 'bg-gradient-to-tr from-amber-500 to-rose-500 p-[1.5px]' },
                  ].map((b) => (
                    <div key={b.name} className="flex flex-col items-center gap-0.5 shrink-0">
                      <div className={`rounded-full ${b.ring}`}>
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#13151f] text-[8.5px] sm:text-[9.5px] font-bold">
                          {b.init}
                        </div>
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] text-slate-400">
                        {b.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 sm:p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#0095f6] to-indigo-500 text-[8.5px] font-bold">
                        AS
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-[9.5px] sm:text-[10.5px] font-bold leading-none">
                          Aanya Sharma <CheckCircle2 className="h-2.5 w-2.5 text-[#0095f6]" />
                        </p>
                        <p className="text-[8px] text-slate-400">4th Yr CSE · 12m</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#0095f6]/15 px-1.5 py-0.5 text-[7.5px] font-semibold text-[#0095f6]">
                      Notes
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] leading-relaxed text-slate-200">
                    Uploaded my Operating Systems notes + solved 2025 paper!
                  </p>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.05] p-1.5 sm:p-2 border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText className="h-3 w-3 text-rose-400 shrink-0" />
                      <span className="truncate text-[8.5px] sm:text-[9.5px] font-medium">
                        CS302_OS_2025_Solved.pdf
                      </span>
                    </div>
                    <span className="rounded bg-[#0095f6] px-1.5 py-0.5 text-[7.5px] font-bold">
                      PDF
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 sm:p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-bold">
                      Rohan · 3rd Yr ECE
                    </span>
                    <span className="text-[7.5px] text-emerald-400 font-semibold">
                      Poll
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="rounded-lg bg-[#0095f6]/20 border border-[#0095f6]/40 px-2 py-1 text-[8.5px] flex justify-between">
                      <span>5:00 PM · Mech Lawn</span>
                      <span className="font-bold text-sky-300">68%</span>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] px-2 py-1 text-[8.5px] flex justify-between text-slate-400">
                      <span>7:30 PM · Seminar Hall</span>
                      <span>32%</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STAGE 2: ENCRYPTED CHATS */}
            {activeStage === 'chats' && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-1 px-2 text-[8.5px] font-medium text-emerald-300">
                  <Lock className="h-2.5 w-2.5" />
                  <span>End-to-end encrypted</span>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.08] p-2 text-[9px] sm:text-[10px] text-slate-200">
                    <p className="text-[7.5px] font-bold text-sky-400 mb-0.5">
                      Aanya · 4th Yr
                    </p>
                    notes for tomorrow’s OS exam?
                  </div>

                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#0095f6] p-2 text-[9px] sm:text-[10px] text-white">
                    sending them now! plus the 2025 solved paper 📄
                  </div>

                  <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white/[0.08] p-2 text-[9px] text-slate-200">
                    <div className="flex items-center gap-1.5 rounded-xl bg-black/30 p-1.5">
                      <FileText className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-[8.5px] font-semibold">
                          OS_Deadlocks_Revision.pdf
                        </p>
                        <p className="text-[7.5px] text-slate-400">
                          2.4 MB · Encrypted
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-[#0095f6] p-2 text-[9px] text-white">
                    Lifesaver 🙌 see you at Library @ 9?
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: BLINKS */}
            {activeStage === 'blinks' && (
              <div className="flex h-full min-h-[260px] flex-col justify-between rounded-2xl bg-gradient-to-b from-indigo-950 via-purple-950/80 to-black p-3 border border-white/10">
                <div className="space-y-1.5">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-1 rounded-full bg-white" />
                    <div className="h-1 rounded-full bg-white/70" />
                    <div className="h-1 rounded-full bg-white/20" />
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[9px] font-bold">
                      @rohan_v · Hostel 4
                    </span>
                    <span className="rounded-full bg-rose-500/20 border border-rose-400/30 px-1.5 py-0.5 text-[7.5px] font-bold text-rose-300">
                      1x View
                    </span>
                  </div>
                </div>

                <div className="my-3 rounded-2xl border border-white/15 bg-white/[0.07] p-3 text-center space-y-1.5 backdrop-blur-md">
                  <Flame className="mx-auto h-5 w-5 text-amber-400" />
                  <p className="font-display text-[11.5px] sm:text-[13px] font-bold">
                    Midnight Acoustic Jam before Fest ’26 🎸
                  </p>
                  <p className="text-[8.5px] text-white/65">
                    Disappears automatically once seen.
                  </p>
                </div>

                <div className="flex items-center justify-between text-[8.5px] text-white/70">
                  <span>Auto-vanishes on close</span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-bold text-white">
                    🔥 48
                  </span>
                </div>
              </div>
            )}

            {/* STAGE 4: EVENTS */}
            {activeStage === 'events' && (
              <div className="space-y-2">
                {[
                  {
                    month: 'MAR',
                    day: '14',
                    title: 'TechFest ’26 Hackathon',
                    place: 'Main Block · 10 AM',
                    going: '230 going',
                    bg: 'from-slate-900 via-indigo-950 to-slate-900',
                  },
                  {
                    month: 'MAR',
                    day: '18',
                    title: 'Open Mic Night',
                    place: 'Amphitheatre · 6 PM',
                    going: '96 going',
                    bg: 'from-[#0095f6] to-blue-700',
                  },
                ].map((ev) => (
                  <div
                    key={ev.title}
                    className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.03]"
                  >
                    <div
                      className={`relative flex h-12 sm:h-14 items-end bg-gradient-to-r ${ev.bg} p-2`}
                    >
                      <div className="absolute right-2 top-1.5 rounded-md bg-white px-1.5 py-0.5 text-center leading-none text-slate-900">
                        <span className="block text-[6px] font-extrabold text-[#0095f6]">
                          {ev.month}
                        </span>
                        <span className="block text-[9.5px] font-extrabold">
                          {ev.day}
                        </span>
                      </div>
                      <span className="font-display text-[11px] sm:text-[12px] font-bold">
                        {ev.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <p className="flex items-center gap-1 text-[8.5px] text-slate-400">
                          <MapPin className="h-2.5 w-2.5 text-[#0095f6]" />
                          {ev.place}
                        </p>
                        <p className="text-[8px] text-slate-500">{ev.going}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-[#0095f6] px-2 py-0.5 text-[8.5px] font-bold text-white">
                        <QrCode className="h-2.5 w-2.5" />
                        Ticket
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE 5: NOTES */}
            {activeStage === 'notes' && (
              <div className="space-y-1.5">
                {[
                  {
                    title: 'Operating Systems · 2025 Paper',
                    by: 'Shared by Rohan, 3rd year',
                    sem: 'Sem 4',
                  },
                  {
                    title: 'Data Structures · Sem 4 Notes',
                    by: 'Shared by Aanya, 4th year',
                    sem: 'Sem 4',
                  },
                  {
                    title: 'DBMS B+ Trees Cheat Sheet',
                    by: 'Shared by Kabir, 4th year',
                    sem: 'Sem 5',
                  },
                ].map((n) => (
                  <div
                    key={n.title}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2"
                  >
                    <div className="min-w-0">
                      <span className="rounded bg-[#0095f6]/15 px-1.5 py-0.5 text-[7px] font-bold text-[#0095f6]">
                        {n.sem}
                      </span>
                      <p className="mt-0.5 truncate text-[9.5px] sm:text-[10.5px] font-semibold">
                        {n.title}
                      </p>
                      <p className="text-[8px] text-slate-400">{n.by}</p>
                    </div>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#0095f6]">
                      <Download className="h-3 w-3" />
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE 6: GAMES & CHAPTERS */}
            {activeStage === 'games' && (
              <div className="space-y-2">
                <div className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0095f6] text-[10px] font-extrabold">
                        AI
                      </div>
                      <div>
                        <p className="text-[10px] font-bold">AI & Robotics Club</p>
                        <p className="text-[8px] text-slate-400">
                          8 of 10 backers to start
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[7.5px] font-bold text-emerald-400">
                      Advisor ✓
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-4/5 rounded-full bg-[#0095f6]" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-slate-900 to-indigo-950 p-2.5 text-center space-y-1.5">
                  <div className="flex items-center justify-between text-[8px]">
                    <span className="font-bold text-sky-400">BATCH UNO LOUNGE</span>
                    <span className="text-emerald-400">● 4 Playing</span>
                  </div>
                  <div className="flex justify-center gap-1.5 py-0.5">
                    {['+4', '7', 'Skip', 'Rev'].map((c, idx) => (
                      <div
                        key={c}
                        className={`flex h-12 w-9 items-center justify-center rounded-xl font-display text-[11px] font-extrabold text-white shadow-md ring-1 ring-white/30 ${
                          idx === 0
                            ? 'bg-[#0095f6]'
                            : idx === 1
                            ? 'bg-rose-500'
                            : idx === 2
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }`}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar inside Phone */}
          <div className="grid shrink-0 grid-cols-6 border-t border-white/[0.08] bg-[#090a0f]/95 px-1 pb-2.5 pt-1">
            {navTabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeStage === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectStage?.(t.id)}
                  className={`flex flex-col items-center gap-0.5 py-0.5 transition-colors ${
                    isSelected ? 'text-[#0095f6]' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span className="text-[7px] sm:text-[8px] font-semibold">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Home Bar */}
          <span className="pointer-events-none absolute bottom-[3px] left-1/2 z-30 h-[2.5px] w-[72px] -translate-x-1/2 rounded-full bg-white/75" />
        </div>
      </div>
    </div>
  );
};
