import React from 'react';

interface WordmarkProps {
  className?: string;
  size?: number;
  light?: boolean;
}

/** ClgVibe script wordmark with the animated "ı" strands. */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', size = 28, light = false }) => (
  <span
    role="img"
    aria-label="ClgVibe"
    className={`font-brand inline-flex select-none items-center leading-none ${
      light ? 'text-white' : 'text-ink'
    } ${className}`}
    style={{ fontSize: size }}
  >
    ClgV
    <span className="relative inline-block leading-none">
      {'\u0131'}
      <svg
        viewBox="0 0 20 30"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[0.56em] left-1/2 w-[0.36em] -translate-x-[15%] overflow-visible"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      >
        <circle cx="6" cy="25" r="4" stroke="none" />
        <line className="brand-strand brand-strand-a" x1="7.6" y1="19.2" x2="13" y2="5" />
        <line className="brand-strand brand-strand-b" x1="11.2" y1="20.9" x2="16.9" y2="6.6" />
      </svg>
    </span>
    be
  </span>
);

