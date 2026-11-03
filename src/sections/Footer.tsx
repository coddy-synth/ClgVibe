import React from 'react';
import { Wordmark } from '../components/Wordmark';
import { LINKS } from '../lib/links';

interface FooterProps {
  onGetApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGetApp }) => (
  <footer className="border-t border-black/[0.06] bg-white pb-10 pt-14">
    <div className="mx-auto max-w-6xl px-5">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Wordmark size={32} />
          <p className="mt-3 max-w-[16rem] text-[14px] text-ink/60">Your campus, in one app. Students only · 18+.</p>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink/45">ClgVibe</h4>
          <ul className="mt-4 space-y-2.5 text-[14.5px] text-ink/75">
            <li><a href="#features" className="hover:text-vibe">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-vibe">How it works</a></li>
            <li><a href="#safety" className="hover:text-vibe">Safety</a></li>
            <li>
              <button type="button" onClick={onGetApp} className="hover:text-vibe">
                Get the app
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink/45">Legal</h4>
          <ul className="mt-4 space-y-2.5 text-[14.5px] text-ink/75">
            <li><a href={LINKS.privacy} className="hover:text-vibe">Privacy Policy</a></li>
            <li><a href={LINKS.terms} className="hover:text-vibe">Terms of Service</a></li>
            <li><a href={LINKS.rules} className="hover:text-vibe">Community Rules</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink/45">Talk to us</h4>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
            Questions, safety reports, or trouble with your account? Write to us and a person will read it.
          </p>
          <a href={LINKS.support} className="mt-2 inline-block text-[14.5px] font-semibold text-vibe hover:underline">
            support@clgvibe.com
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-black/[0.06] pt-6 text-[12.5px] leading-relaxed text-ink/45">
        <p>© {new Date().getFullYear()} ClgVibe. All rights reserved.</p>
        <p className="mt-1 max-w-3xl">
          ClgVibe is an independent student platform. It is not affiliated with, endorsed by, or sponsored by any college,
          university, or examination body. Institution names are used only so students can say where they study.
        </p>
      </div>
    </div>
  </footer>
);

