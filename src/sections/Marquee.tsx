import React from 'react';
import { ShieldCheck, Lock, Ban, PhoneOff, Gift, Smartphone, GraduationCap } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: 'Verified students only' },
  { icon: Lock, label: 'End-to-end encrypted chats' },
  { icon: Ban, label: 'No ads, no tracking' },
  { icon: PhoneOff, label: 'No phone numbers shared' },
  { icon: Gift, label: 'Free for students' },
  { icon: Smartphone, label: 'Android app + works on iPhone' },
  { icon: GraduationCap, label: 'Students only · 18+' },
];

export const Marquee: React.FC = () => (
  <div className="relative overflow-hidden border-y border-black/[0.06] bg-white py-4" aria-label="Highlights">
    <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
      {[...ITEMS, ...ITEMS].map(({ icon: Icon, label }, i) => (
        <span key={i} className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-ink/65">
          <Icon className="h-4 w-4 text-vibe" />
          {label}
          <span className="ml-8 h-1 w-1 rounded-full bg-black/20" />
        </span>
      ))}
    </div>
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
  </div>
);

