import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Download, Share, X, Smartphone, Check } from 'lucide-react';
import { LINKS } from '../lib/links';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState<'android' | 'ios'>('android');
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(
      panelRef.current,
      { y: 40, scale: 0.94, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }
    );
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Get the ClgVibe app">
      <div ref={backdropRef} className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-t-[28px] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink/70 hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vibe-soft text-vibe">
          <Smartphone className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-[22px] font-bold">Get ClgVibe on your phone</h3>
        <p className="mt-1 text-[14px] text-ink/60">
          Notifications for messages and Blinks, sharing from your gallery, and a home screen shortcut to everything.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-black/[0.05] p-1">
          {(['android', 'ios'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-xl py-2.5 text-[13.5px] font-semibold transition ${
                tab === t ? 'bg-white text-ink shadow-sm' : 'text-ink/55'
              }`}
            >
              {t === 'android' ? 'Android' : 'iPhone'}
            </button>
          ))}
        </div>

        {tab === 'android' ? (
          <div className="mt-5">
            <ol className="space-y-2.5 text-[14px] text-ink/75">
              {['Download the ClgVibe app file', 'Allow install from your browser if asked', 'Sign in with your verified college account'].map(
                (s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vibe text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                )
              )}
            </ol>
            <a
              href={LINKS.apk}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-vibe text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,149,246,0.9)] transition hover:bg-vibe-dark"
            >
              <Download className="h-4 w-4" /> Download for Android
            </a>
          </div>
        ) : (
          <div className="mt-5">
            <ol className="space-y-2.5 text-[14px] text-ink/75">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vibe text-[11px] font-bold text-white">1</span>
                Open <b>clgvibe.com</b> in Safari
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vibe text-[11px] font-bold text-white">2</span>
                <span className="inline-flex flex-wrap items-center gap-1">
                  Tap <Share className="inline h-4 w-4 text-vibe" /> <b>Share</b>, then <b>Add to Home Screen</b>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vibe text-[11px] font-bold text-white">3</span>
                It opens full screen, just like a native app
              </li>
            </ol>
            <a
              href={LINKS.site}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-semibold text-white transition hover:bg-black"
            >
              <Check className="h-4 w-4" /> Open clgvibe.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

