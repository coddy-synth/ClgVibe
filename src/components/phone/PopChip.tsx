import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type ChipPos = 'tl' | 'tr' | 'ml' | 'mr' | 'bl' | 'br';

const POS: Record<ChipPos, string> = {
  tl: '-left-6 top-[7%] sm:-left-16 lg:-left-[24%] lg:top-[10%]',
  tr: '-right-6 top-[16%] sm:-right-16 lg:-right-[22%] lg:top-[18%]',
  ml: '-left-7 top-[44%] sm:-left-16 lg:-left-[26%] lg:top-[44%]',
  mr: '-right-7 top-[46%] sm:-right-16 lg:-right-[24%] lg:top-[48%]',
  bl: '-left-6 bottom-[15%] sm:-left-16 lg:-left-[22%] lg:bottom-[16%]',
  br: '-right-6 bottom-[7%] sm:-right-16 lg:-right-[20%] lg:bottom-[8%]',
};

export interface ChipData {
  icon: LucideIcon;
  title: string;
  sub: string;
  pos: ChipPos;
  tone?: 'blue' | 'green' | 'amber' | 'violet' | 'rose';
}

const TONE: Record<NonNullable<ChipData['tone']>, string> = {
  blue: 'bg-sky-50 text-[#0095f6]',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-500',
};

/** Floating pop-up card that sits around the phone. */
export const PopChip: React.FC<ChipData & { delay?: number }> = ({
  icon: Icon,
  title,
  sub,
  pos,
  tone = 'blue',
  delay = 0,
}) => (
  <div data-chip className={`pointer-events-none absolute z-30 ${POS[pos]}`}>
    <div
      className="animate-floaty flex items-center gap-2 rounded-2xl bg-white/95 py-1.5 pl-1.5 pr-3 shadow-pop ring-1 ring-black/5 backdrop-blur lg:gap-2.5 lg:py-2 lg:pl-2 lg:pr-4"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl lg:h-9 lg:w-9 ${TONE[tone]}`}>
        <Icon className="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]" />
      </span>
      <span className="whitespace-nowrap leading-tight">
        <span className="block text-[10.5px] font-bold text-ink lg:text-[12.5px]">{title}</span>
        <span className="block text-[9px] text-ink/55 lg:text-[11px]">{sub}</span>
      </span>
    </div>
  </div>
);
