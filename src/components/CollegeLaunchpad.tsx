import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  ArrowRight,
  X,
  Download,
  Share,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { COLLEGES_LIST } from '../data/campusData';

gsap.registerPlugin(ScrollTrigger);

interface CollegeLaunchpadProps {
  joinOpen: boolean;
  onCloseJoin: () => void;
  appOpen: boolean;
  onCloseApp: () => void;
  onOpenJoin: () => void;
  onOpenApp: () => void;
}

export const CollegeLaunchpad: React.FC<CollegeLaunchpadProps> = ({
  joinOpen,
  onCloseJoin,
  appOpen,
  onCloseApp,
  onOpenJoin,
  onOpenApp,
}) => {
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const [platform, setPlatform] = useState<'android' | 'ios'>('android');
  const [submitted, setSubmitted] = useState(false);
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: ctaCardRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* CAMPUS NETWORK TICKER + LAUNCH FINALE */}
      <section className="relative overflow-hidden bg-[#05060a] py-24 border-t border-white/[0.07]">
        {/* Campus Pills Grid */}
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-center text-[11.5px] font-bold uppercase tracking-widest text-slate-400">
            Verified Student Networks Across India
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {COLLEGES_LIST.map((c) => (
              <button
                key={c.short}
                type="button"
                onClick={onOpenJoin}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-slate-200 hover:border-[#0095f6] hover:bg-[#0095f6]/10 transition-all"
              >
                <span className="h-2 w-2 rounded-full bg-[#0095f6]" />
                <span className="font-semibold text-white">{c.short}</span>
                <span className="font-mono text-[11px] text-slate-400">
                  @{c.domain}
                </span>
              </button>
            ))}
          </div>

          {/* Scroll Pop-Up Launch Finale Card */}
          <div
            ref={ctaCardRef}
            className="relative mt-16 overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-b from-[#0e1424] via-[#0a0d18] to-[#07080f] p-10 sm:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -top-28 -translate-x-1/2 h-64 w-[520px] rounded-full bg-[#0095f6]/25 blur-[100px]"
            />

            <div className="relative z-10 mx-auto max-w-xl">
              <div className="mx-auto flex justify-center -space-x-2">
                {['AS', 'RV', 'KM', 'MS', 'NP'].map((init, i) => (
                  <span
                    key={init}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-[#0a0d18] ${
                      i % 2 === 0 ? 'bg-[#0095f6]' : 'bg-indigo-600'
                    }`}
                  >
                    {init}
                  </span>
                ))}
              </div>

              <h2 className="mt-6 font-display text-balance text-[34px] font-extrabold leading-tight tracking-tight text-white sm:text-[48px]">
                Find your people on campus.
              </h2>
              <p className="mt-3 text-[17px] text-slate-300">
                Free for students. Takes a minute to join.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenJoin}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0095f6] px-7 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(0,149,246,0.45)] hover:bg-[#0081d6] transition-all"
                >
                  <span>Join ClgVibe</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenApp}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 text-[15px] font-semibold text-white hover:bg-white/[0.12] transition-all"
                >
                  <Smartphone className="h-4 w-4 text-[#0095f6]" />
                  <span>Get the Android app</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL 1: JOIN CLGVIBE */}
      {joinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0f111a] p-6 sm:p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onCloseJoin();
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0095f6]/15 px-3 py-1 text-[11.5px] font-semibold text-[#0095f6]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Student Access
                </span>
                <h3 className="mt-3 font-display text-[22px] font-bold">
                  Join ClgVibe
                </h3>
                <p className="mt-1 text-[13.5px] text-slate-400">
                  Verify with your college email (.ac.in / .edu.in) or student ID.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-5 space-y-4"
                >
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-300">
                      Pick your @username
                    </label>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="aanya.cse"
                      className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 text-[14px] text-white focus:border-[#0095f6] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-300">
                      College Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.ac.in"
                      className="mt-1.5 h-11 w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 text-[14px] text-white focus:border-[#0095f6] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0095f6] text-[14.5px] font-bold text-white hover:bg-[#0081d6]"
                  >
                    <span>Continue to Verification</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-4 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h3 className="font-display text-[21px] font-bold">
                  Verification OTP Sent
                </h3>
                <p className="text-[13.5px] text-slate-300">
                  Sent to <span className="font-semibold text-white">{email}</span> for{' '}
                  <span className="font-mono text-[#0095f6]">@{handle}</span>.
                </p>
                <a
                  href="https://clgvibe.com/signup"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#0095f6] text-[13.5px] font-bold text-white"
                >
                  Open ClgVibe Web App →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: GET THE APP (ANDROID APK + IOS PWA) */}
      {appOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0f111a] p-6 sm:p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={onCloseApp}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-[21px] font-bold">
              Get ClgVibe on Your Phone
            </h3>
            <p className="mt-1 text-[13px] text-slate-400">
              Notifications for messages and Blinks, sharing from your gallery, and a home screen shortcut to everything.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-2xl bg-white/[0.06] p-1">
              <button
                type="button"
                onClick={() => setPlatform('android')}
                className={`rounded-xl py-2 text-[13px] font-semibold ${
                  platform === 'android'
                    ? 'bg-[#0095f6] text-white'
                    : 'text-slate-300'
                }`}
              >
                Android (.apk)
              </button>
              <button
                type="button"
                onClick={() => setPlatform('ios')}
                className={`rounded-xl py-2 text-[13px] font-semibold ${
                  platform === 'ios'
                    ? 'bg-[#0095f6] text-white'
                    : 'text-slate-300'
                }`}
              >
                iPhone (iOS)
              </button>
            </div>

            {platform === 'android' ? (
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white/[0.04] p-3.5 text-[12.5px] text-slate-300 space-y-1.5">
                  <p className="font-semibold text-white">1. Download ClgVibe.apk</p>
                  <p>2. Allow install from Chrome if prompted</p>
                  <p>3. Sign in with your verified college account</p>
                </div>
                <a
                  href="https://media.clgvibe.com/apk/ClgVibe.apk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0095f6] text-[14px] font-bold text-white hover:bg-[#0081d6]"
                >
                  <Download className="h-4 w-4" />
                  <span>Download for Android (Free)</span>
                </a>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-white/[0.04] p-4 space-y-2 text-[13px] text-slate-300">
                <div className="flex items-center gap-2 text-[#0095f6] font-bold">
                  <Share className="h-4 w-4" />
                  <span>On an iPhone?</span>
                </div>
                <p>
                  Open <strong>clgvibe.com</strong> in Safari, tap{' '}
                  <strong>Share</strong>, then tap{' '}
                  <strong>Add to Home Screen</strong>. It works like a native app.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

