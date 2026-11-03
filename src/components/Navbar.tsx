import React, { useEffect, useState } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { LINKS } from '../lib/links';

interface NavbarProps {
  onGetApp: () => void;
}

const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#safety', label: 'Safety' },
];

export const Navbar: React.FC<NavbarProps> = ({ onGetApp }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-black/[0.06] bg-white/80 shadow-[0_8px_30px_-18px_rgba(0,40,90,0.35)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-9">
          <a href="#top" aria-label="ClgVibe home" onClick={() => setOpen(false)}>
            <Wordmark size={30} />
          </a>
          <nav className="hidden items-center gap-7 text-[14px] font-medium text-ink/70 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
            <button type="button" onClick={onGetApp} className="transition-colors hover:text-ink">
              Get the app
            </button>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href={LINKS.login} className="px-3 text-[14px] font-semibold text-ink/80 transition-colors hover:text-ink">
            Log in
          </a>
          <a
            href={LINKS.signup}
            className="inline-flex h-10 items-center rounded-full bg-vibe px-5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,149,246,0.9)] transition hover:bg-vibe-dark"
          >
            Join ClgVibe
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={LINKS.signup}
            className="inline-flex h-10 items-center rounded-full bg-vibe px-4 text-[14px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(0,149,246,0.9)]"
          >
            Join
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.06] px-5 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col text-[17px] font-semibold">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/[0.05] py-3.5 text-ink/85"
              >
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onGetApp();
              }}
              className="flex items-center gap-2 border-b border-black/[0.05] py-3.5 text-left text-ink/85"
            >
              <Smartphone className="h-4 w-4 text-vibe" /> Get the app
            </button>
          </nav>
          <div className="mt-5 flex gap-3">
            <a
              href={LINKS.login}
              className="flex h-12 flex-1 items-center justify-center rounded-full border border-black/15 text-[15px] font-semibold"
            >
              Log in
            </a>
            <a
              href={LINKS.signup}
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-vibe text-[15px] font-semibold text-white"
            >
              Join ClgVibe
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
