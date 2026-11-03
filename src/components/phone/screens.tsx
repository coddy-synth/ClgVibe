import React from 'react';
import {
  Heart,
  Send,
  MessageCircle,
  Bookmark,
  Home,
  Compass,
  CalendarDays,
  BookOpen,
  Lock,
  ChevronLeft,
  Plus,
  Eye,
  Download,
  Search,
  FileText,
  MapPin,
  Users,
  Check,
} from 'lucide-react';
import { AVATARS } from '../../lib/links';
import { Wordmark } from '../Wordmark';

export type ScreenId = 'feed' | 'chats' | 'blinks' | 'events' | 'notes' | 'chapters' | 'games';

/* ---------- shared bits ---------- */

const StatusBar: React.FC<{ light?: boolean }> = ({ light }) => (
  <div
    className={`absolute inset-x-0 top-0 z-30 flex h-[44px] items-center justify-between px-[26px] pt-[6px] text-[11px] font-semibold ${
      light ? 'text-white' : 'text-black'
    }`}
  >
    <span>11:11</span>
    <span className="flex items-center gap-[5px]">
      <span className="flex items-end gap-[1.5px]">
        {[4, 6, 8, 10].map((h) => (
          <i key={h} className="block w-[2.5px] rounded-[1px] bg-current" style={{ height: h }} />
        ))}
      </span>
      <span className="relative h-[10px] w-[20px] rounded-[3px] border border-current opacity-90">
        <i className="absolute inset-[1.5px] right-[4px] rounded-[1px] bg-current" />
      </span>
    </span>
  </div>
);

const TabBar: React.FC<{ active?: 'home' | 'compass' | 'events' | 'notes' }> = ({ active = 'home' }) => {
  const items = [
    { id: 'home', Icon: Home },
    { id: 'compass', Icon: Compass },
    { id: 'events', Icon: CalendarDays },
    { id: 'notes', Icon: BookOpen },
  ] as const;
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex h-[62px] items-start justify-between border-t border-black/[0.06] bg-white/95 px-[22px] pt-[10px] backdrop-blur">
      {items.map(({ id, Icon }) => (
        <Icon
          key={id}
          className={`h-[22px] w-[22px] ${active === id ? 'text-ink' : 'text-ink/40'}`}
          strokeWidth={active === id ? 2.4 : 1.8}
        />
      ))}
      <img src={AVATARS.priya} alt="" className="h-[22px] w-[22px] rounded-full bg-sky-100 object-cover ring-1 ring-black/10" />
    </div>
  );
};

const Avatar: React.FC<{ src: string; size: number; ring?: boolean; className?: string }> = ({
  src,
  size,
  ring,
  className = '',
}) => (
  <span
    className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${
      ring ? 'bg-gradient-to-tr from-[#0095f6] via-[#5ca9ff] to-[#9099fc] p-[2px]' : ''
    } ${className}`}
    style={{ width: size, height: size }}
  >
    <img
      src={src}
      alt=""
      className={`h-full w-full rounded-full bg-sky-100 object-cover ${ring ? 'border-2 border-white' : ''}`}
    />
  </span>
);

const Screen: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = 'bg-white text-ink',
}) => <div className={`absolute inset-0 overflow-hidden ${className}`}>{children}</div>;

/* ---------- screens ---------- */

export const FeedScreen: React.FC = () => (
  <Screen>
    <StatusBar />
    <div className="absolute inset-x-0 top-[44px] flex items-center justify-between px-[16px]">
      <Wordmark size={22} />
      <div className="flex items-center gap-[12px] text-ink">
        <Heart className="h-[20px] w-[20px]" strokeWidth={1.9} />
        <Send className="h-[20px] w-[20px]" strokeWidth={1.9} />
      </div>
    </div>

    {/* Blinks row */}
    <div className="absolute inset-x-0 top-[84px] flex gap-[11px] border-b border-black/[0.06] px-[14px] pb-[10px]">
      {[
        { n: 'Your Blink', a: AVATARS.priya, you: true },
        { n: 'aanya', a: AVATARS.aanya },
        { n: 'rohan', a: AVATARS.rohan },
        { n: 'priya', a: AVATARS.meera },
        { n: 'kabir', a: AVATARS.kabir },
      ].map((s) => (
        <div key={s.n} className="flex w-[46px] flex-col items-center gap-[3px]">
          <span className="relative">
            <Avatar src={s.a} size={44} ring={!s.you} />
            {s.you && (
              <span className="absolute -bottom-[1px] -right-[1px] flex h-[16px] w-[16px] items-center justify-center rounded-full border-2 border-white bg-[#0095f6] text-white">
                <Plus className="h-[10px] w-[10px]" strokeWidth={3.4} />
              </span>
            )}
          </span>
          <span className="w-full truncate text-center text-[8.5px] text-ink/60">{s.n}</span>
        </div>
      ))}
    </div>

    {/* Post */}
    <div className="absolute inset-x-0 top-[158px]">
      <div className="flex items-center gap-[8px] px-[12px] py-[8px]">
        <Avatar src={AVATARS.robo} size={30} />
        <div className="leading-tight">
          <p className="text-[11px] font-semibold">Robotics Club</p>
          <p className="text-[9px] text-ink/50">@robotics · 2h</p>
        </div>
        <span className="ml-auto text-[14px] tracking-widest text-ink/40">···</span>
      </div>
      <p className="px-[12px] pb-[8px] text-[11px] leading-snug">
        Demo day is Friday. Come see what we built this semester.
      </p>
      <div className="relative mx-0 flex h-[216px] flex-col justify-end bg-gradient-to-br from-[#0095f6] to-[#0a6fd6] px-[14px] pb-[14px] text-white">
        <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/80">Robotics Club presents</p>
        <p className="font-display text-[30px] font-bold leading-none">Demo Day</p>
        <p className="mt-[5px] text-[9px] text-white/85">Friday · 4 PM · Main Auditorium</p>
        <div className="absolute right-[14px] top-[14px] rounded-full bg-white/20 px-[8px] py-[3px] text-[8px] font-semibold backdrop-blur">
          Event
        </div>
      </div>
      <div className="flex items-center gap-[12px] px-[12px] pt-[9px]">
        <Heart className="h-[19px] w-[19px] fill-[#ff3b5c] text-[#ff3b5c]" />
        <MessageCircle className="h-[19px] w-[19px]" strokeWidth={1.9} />
        <Send className="h-[19px] w-[19px]" strokeWidth={1.9} />
        <Bookmark className="ml-auto h-[19px] w-[19px]" strokeWidth={1.9} />
      </div>
      <p className="px-[12px] pt-[5px] text-[10px] font-semibold">128 likes</p>
      <p className="px-[12px] text-[10px] leading-snug">
        <b>robotics</b> Bring your friends. The line-following bot race starts at 4:30.
      </p>
    </div>
    <TabBar active="home" />
  </Screen>
);

export const ChatsScreen: React.FC = () => (
  <Screen className="bg-[#f6f7f9] text-ink">
    <StatusBar />
    <div className="absolute inset-x-0 top-[44px] flex items-center gap-[8px] border-b border-black/[0.06] bg-white px-[10px] pb-[9px]">
      <ChevronLeft className="h-[22px] w-[22px] text-[#0095f6]" />
      <Avatar src={AVATARS.aanya} size={32} />
      <div className="leading-tight">
        <p className="text-[12px] font-semibold">Aanya</p>
        <p className="text-[9px] text-emerald-600">● online</p>
      </div>
      <span className="ml-auto inline-flex items-center gap-[3px] rounded-full bg-emerald-50 px-[7px] py-[3px] text-[8px] font-semibold text-emerald-700">
        <Lock className="h-[9px] w-[9px]" /> E2E
      </span>
    </div>

    <div className="absolute inset-x-0 top-[100px] flex flex-col gap-[8px] px-[12px]">
      <div className="mx-auto mb-[2px] flex items-center gap-[5px] rounded-full bg-white px-[10px] py-[5px] text-[8.5px] font-medium text-ink/60 shadow-sm ring-1 ring-black/5">
        <Lock className="h-[9px] w-[9px] text-emerald-600" />
        Messages are end-to-end encrypted
      </div>
      <div className="max-w-[75%] self-start rounded-[16px] rounded-bl-[4px] bg-white px-[11px] py-[8px] text-[11px] shadow-sm ring-1 ring-black/5">
        notes for tomorrow?
      </div>
      <div className="max-w-[75%] self-end rounded-[16px] rounded-br-[4px] bg-[#0095f6] px-[11px] py-[8px] text-[11px] text-white">
        sending them now
      </div>
      <div className="flex max-w-[78%] items-center gap-[8px] self-end rounded-[14px] bg-white px-[9px] py-[8px] shadow-sm ring-1 ring-black/5">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-rose-50 text-rose-500">
          <FileText className="h-[15px] w-[15px]" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold">OS_Unit4_Notes.pdf</p>
          <p className="text-[8.5px] text-ink/50">2.4 MB · encrypted</p>
        </div>
      </div>
      <div className="max-w-[75%] self-start rounded-[16px] rounded-bl-[4px] bg-white px-[11px] py-[8px] text-[11px] shadow-sm ring-1 ring-black/5">
        you&apos;re a lifesaver 🙏
      </div>
      <div className="max-w-[78%] self-end rounded-[16px] rounded-br-[4px] bg-[#0095f6] px-[11px] py-[8px] text-[11px] text-white">
        see you at the library @ 9?
      </div>
      <div className="flex items-center gap-[3px] self-start rounded-full bg-white px-[10px] py-[8px] shadow-sm ring-1 ring-black/5">
        {[0, 1, 2].map((i) => (
          <i key={i} className="block h-[5px] w-[5px] animate-pulse rounded-full bg-ink/40" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-[22px] flex items-center gap-[8px] px-[12px]">
      <div className="flex h-[34px] flex-1 items-center rounded-full bg-white px-[14px] text-[10.5px] text-ink/40 ring-1 ring-black/10">
        Message @aanya
      </div>
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#0095f6] text-white">
        <Send className="h-[15px] w-[15px]" />
      </span>
    </div>
  </Screen>
);

export const BlinksScreen: React.FC = () => (
  <Screen className="bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,#ffb86b_0%,#ff6fa5_38%,#6a5cff_75%,#1d1b4f_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />
    <StatusBar light />
    <div className="absolute inset-x-[12px] top-[46px] z-20 flex gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-[2.5px] flex-1 rounded-full bg-white/35">
          <i className={`block h-full rounded-full bg-white ${i === 0 ? 'w-full' : i === 1 ? 'w-[55%]' : 'w-0'}`} />
        </span>
      ))}
    </div>
    <div className="absolute inset-x-[12px] top-[58px] z-20 flex items-center gap-[8px] text-white">
      <Avatar src={AVATARS.zoya} size={30} />
      <div className="leading-tight">
        <p className="text-[11px] font-semibold">zoya.codes</p>
        <p className="text-[8.5px] text-white/75">just now</p>
      </div>
      <span className="ml-auto flex items-center gap-[4px] rounded-full bg-black/35 px-[8px] py-[3px] text-[8.5px] font-semibold backdrop-blur">
        <Eye className="h-[10px] w-[10px]" /> 1 view
      </span>
    </div>

    <div className="absolute inset-x-0 top-[146px] flex flex-col items-center text-white">
      <div className="relative flex h-[136px] w-[136px] flex-col items-center justify-center rounded-full border border-white/35 bg-white/15 backdrop-blur-md shadow-xl">
        <span className="absolute inset-[-7px] rounded-full border-2 border-dashed border-white/65" />
        <BookOpen className="h-[38px] w-[38px] text-white drop-shadow" strokeWidth={1.8} />
        <span className="mt-1.5 rounded-full bg-black/30 px-2.5 py-0.5 font-mono text-[8.5px] font-semibold tracking-wider text-white/95">
          01:42 AM · CENTRAL LIB
        </span>
      </div>
      <p className="mt-[18px] font-display text-[19px] font-semibold drop-shadow">library at midnight</p>
      <p className="mt-[3px] text-[10px] text-white/80">Gone the moment you&apos;ve seen it</p>
    </div>

    <div className="absolute inset-x-[12px] bottom-[26px] z-20 flex items-center gap-[8px]">
      <div className="flex h-[36px] flex-1 items-center rounded-full border border-white/40 bg-white/10 px-[14px] text-[10.5px] text-white/80 backdrop-blur">
        Send a reply…
      </div>
      <Heart className="h-[22px] w-[22px] text-white" />
      <Send className="h-[22px] w-[22px] text-white" />
    </div>
  </Screen>
);

const QR = [
  1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1,
  1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
];

export const EventsScreen: React.FC = () => (
  <Screen className="bg-[#f6f7f9] text-ink">
    <StatusBar />
    <div className="absolute inset-x-0 top-[44px] px-[16px]">
      <p className="font-display text-[20px] font-bold">Events</p>
      <div className="mt-[8px] flex gap-[6px]">
        {['All', 'Fests', 'Workshops', 'Meetups'].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-[10px] py-[4px] text-[9.5px] font-semibold ${
              i === 0 ? 'bg-ink text-white' : 'bg-white text-ink/60 ring-1 ring-black/10'
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute inset-x-[14px] top-[122px] overflow-hidden rounded-[20px] bg-white shadow-card ring-1 ring-black/5">
      <div className="flex gap-[10px] p-[12px]">
        <div className="flex h-[44px] w-[40px] shrink-0 flex-col items-center justify-center rounded-[11px] bg-[#e8f4ff] text-[#0077c2]">
          <span className="text-[8px] font-bold uppercase">Mar</span>
          <span className="font-display text-[18px] font-bold leading-none">14</span>
        </div>
        <div className="leading-tight">
          <p className="text-[9px] font-semibold text-[#0095f6]">Mar 14 · 10 AM</p>
          <p className="font-display text-[13.5px] font-bold">TechFest ’26 Hackathon</p>
          <p className="mt-[2px] flex items-center gap-[3px] text-[9px] text-ink/55">
            <MapPin className="h-[9px] w-[9px]" /> Main Block · 1 ticket
          </p>
        </div>
      </div>
      {/* perforation */}
      <div className="relative h-[14px]">
        <span className="absolute -left-[7px] top-0 h-[14px] w-[14px] rounded-full bg-[#f6f7f9]" />
        <span className="absolute -right-[7px] top-0 h-[14px] w-[14px] rounded-full bg-[#f6f7f9]" />
        <span className="absolute inset-x-[10px] top-[6px] border-t border-dashed border-black/20" />
      </div>
      <div className="flex items-center gap-[12px] p-[12px] pt-[6px]">
        <div className="grid h-[88px] w-[88px] shrink-0 grid-cols-7 gap-[2px] rounded-[10px] bg-white p-[6px] ring-1 ring-black/10">
          {QR.slice(0, 49).map((b, i) => (
            <i key={i} className={`block rounded-[1.5px] ${b ? 'bg-ink' : 'bg-transparent'}`} />
          ))}
        </div>
        <div className="leading-tight">
          <p className="text-[8.5px] font-bold uppercase tracking-wider text-ink/45">Entry pass</p>
          <p className="font-display text-[14px] font-bold">#CV-26</p>
          <p className="mt-[4px] inline-flex items-center gap-[3px] rounded-full bg-emerald-50 px-[7px] py-[3px] text-[8.5px] font-semibold text-emerald-700">
            <Check className="h-[9px] w-[9px]" strokeWidth={3} /> Scan at the door
          </p>
        </div>
      </div>
    </div>

    <div className="absolute inset-x-[14px] top-[352px] flex items-center gap-[10px] rounded-[16px] bg-white p-[10px] shadow-card ring-1 ring-black/5">
      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-amber-50 text-[16px]">🎤</div>
      <div className="leading-tight">
        <p className="text-[11px] font-semibold">Open Mic Night</p>
        <p className="text-[9px] text-ink/50">Fri · 7 PM · Amphitheatre</p>
      </div>
      <span className="ml-auto rounded-full bg-[#0095f6] px-[9px] py-[4px] text-[9px] font-bold text-white">Get pass</span>
    </div>
    <div className="absolute inset-x-[14px] top-[412px] flex items-center gap-[10px] rounded-[16px] bg-white p-[10px] shadow-card ring-1 ring-black/5">
      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-violet-50 text-[16px]">🛠️</div>
      <div className="leading-tight">
        <p className="text-[11px] font-semibold">Git &amp; GitHub Workshop</p>
        <p className="text-[9px] text-ink/50">Sat · 11 AM · Lab 3</p>
      </div>
      <span className="ml-auto rounded-full bg-ink/5 px-[9px] py-[4px] text-[9px] font-bold text-ink/70">Going</span>
    </div>
    <TabBar active="events" />
  </Screen>
);

export const NotesScreen: React.FC = () => (
  <Screen className="bg-[#f6f7f9] text-ink">
    <StatusBar />
    <div className="absolute inset-x-0 top-[44px] px-[16px]">
      <p className="font-display text-[20px] font-bold">Notes &amp; papers</p>
      <div className="mt-[8px] flex h-[34px] items-center gap-[7px] rounded-full bg-white px-[12px] text-[10.5px] text-ink/40 ring-1 ring-black/10">
        <Search className="h-[13px] w-[13px]" /> Search subject, unit, year
      </div>
      <div className="mt-[8px] flex gap-[6px]">
        {['DBMS', 'OS', 'CN', 'DSA'].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-[10px] py-[4px] text-[9.5px] font-semibold ${
              i === 0 ? 'bg-[#0095f6] text-white' : 'bg-white text-ink/60 ring-1 ring-black/10'
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute inset-x-[14px] top-[168px] flex flex-col gap-[9px]">
      {[
        { t: 'DBMS · Unit 3 notes', by: 'Shared by Aanya, 4th year', a: AVATARS.aanya, tag: 'Notes', c: 'bg-sky-50 text-sky-600' },
        { t: 'Operating Systems · 2025 paper', by: 'Shared by Rohan, 3rd year', a: AVATARS.rohan, tag: 'Solved', c: 'bg-rose-50 text-rose-500' },
        { t: 'Computer Networks · Lab manual', by: 'Shared by Priya, 4th year', a: AVATARS.meera, tag: 'Manual', c: 'bg-amber-50 text-amber-600' },
        { t: 'DSA · Mid-sem PYQs', by: 'Shared by Kabir, 3rd year', a: AVATARS.kabir, tag: 'PYQ', c: 'bg-violet-50 text-violet-600' },
      ].map((n) => (
        <div key={n.t} className="flex items-center gap-[9px] rounded-[16px] bg-white p-[10px] shadow-card ring-1 ring-black/5">
          <span className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] ${n.c}`}>
            <FileText className="h-[17px] w-[17px]" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[10.5px] font-semibold">{n.t}</p>
            <p className="mt-[2px] flex items-center gap-[4px] text-[8.5px] text-ink/50">
              <Avatar src={n.a} size={11} /> {n.by}
            </p>
          </div>
          <span className={`rounded-full px-[7px] py-[2px] text-[8px] font-bold ${n.c}`}>{n.tag}</span>
          <Download className="h-[14px] w-[14px] text-ink/45" />
        </div>
      ))}
    </div>
    <TabBar active="notes" />
  </Screen>
);

export const ChaptersScreen: React.FC = () => (
  <Screen className="bg-[#f6f7f9] text-ink">
    <StatusBar />
    <div className="absolute inset-x-0 top-[44px] px-[16px]">
      <p className="font-display text-[20px] font-bold">Chapters</p>
      <p className="text-[10px] text-ink/50">Clubs started by students, for students</p>
    </div>

    <div className="absolute inset-x-[14px] top-[106px] rounded-[22px] bg-white p-[14px] shadow-card ring-1 ring-black/5">
      <div className="flex items-center gap-[10px]">
        <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#0095f6] to-[#9099fc] font-display text-[16px] font-bold text-white">
          RC
        </span>
        <div className="leading-tight">
          <p className="font-display text-[14px] font-bold">Robotics Club</p>
          <p className="text-[9px] text-ink/50">Proposed by 3 students</p>
        </div>
      </div>
      <div className="mt-[12px] flex items-center justify-between text-[10px] font-semibold">
        <span>8 of 10 backers to start</span>
        <span className="text-[#0095f6]">80%</span>
      </div>
      <div className="mt-[5px] h-[7px] overflow-hidden rounded-full bg-ink/[0.07]">
        <i className="block h-full w-[80%] rounded-full bg-gradient-to-r from-[#0095f6] to-[#5ca9ff]" />
      </div>
      <div className="mt-[11px] flex items-center">
        {[AVATARS.aanya, AVATARS.rohan, AVATARS.meera, AVATARS.kabir, AVATARS.dev].map((a, i) => (
          <Avatar key={a} src={a} size={24} className={`ring-2 ring-white ${i ? '-ml-[7px]' : ''}`} />
        ))}
        <span className="ml-[6px] text-[9px] text-ink/50">+3</span>
        <span className="ml-auto rounded-full bg-[#0095f6] px-[12px] py-[6px] text-[10px] font-bold text-white">Back it</span>
      </div>
    </div>

    <p className="absolute inset-x-[16px] top-[308px] text-[10px] font-semibold uppercase tracking-wider text-ink/45">Live chapters</p>
    <div className="absolute inset-x-[14px] top-[330px] flex flex-col gap-[8px]">
      {[
        { n: 'Photography Club', m: '124 members', e: '📷', c: 'bg-amber-50' },
        { n: 'Debate Society', m: '86 members', e: '🎙️', c: 'bg-violet-50' },
        { n: 'Cricket XI', m: '61 members', e: '🏏', c: 'bg-emerald-50' },
      ].map((c) => (
        <div key={c.n} className="flex items-center gap-[10px] rounded-[15px] bg-white p-[9px] shadow-card ring-1 ring-black/5">
          <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-[11px] text-[16px] ${c.c}`}>{c.e}</span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold">{c.n}</p>
            <p className="flex items-center gap-[3px] text-[8.5px] text-ink/50">
              <Users className="h-[9px] w-[9px]" /> {c.m}
            </p>
          </div>
          <span className="ml-auto rounded-full bg-ink/5 px-[9px] py-[4px] text-[9px] font-bold text-ink/70">Joined</span>
        </div>
      ))}
    </div>
    <TabBar active="compass" />
  </Screen>
);

const UnoCard: React.FC<{ c: string; v: string; r: number; x: number; z: number }> = ({ c, v, r, x, z }) => (
  <div
    className={`absolute bottom-0 flex h-[104px] w-[70px] items-center justify-center rounded-[12px] border-[3px] border-white font-display text-[30px] font-bold text-white shadow-lg ${c}`}
    style={{ left: x, transform: `rotate(${r}deg)`, transformOrigin: 'bottom center', zIndex: z }}
  >
    <span className="absolute inset-x-[8px] inset-y-[10px] -rotate-[25deg] rounded-[50%] bg-white/25" />
    <span className="relative">{v}</span>
  </div>
);

export const GamesScreen: React.FC = () => (
  <Screen className="bg-[#101a2e] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(0,149,246,0.45),transparent)]" />
    <StatusBar light />
    <div className="absolute inset-x-0 top-[44px] px-[16px]">
      <p className="font-display text-[20px] font-bold">Games</p>
      <p className="text-[10px] text-white/60">UNO &amp; party games with your batch</p>
    </div>

    <div className="absolute inset-x-[14px] top-[112px] flex items-center gap-[10px] rounded-[18px] bg-white/10 p-[11px] ring-1 ring-white/15 backdrop-blur">
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-[#ff4d4d] font-display text-[13px] font-bold">UNO</span>
      <div className="leading-tight">
        <p className="text-[11.5px] font-semibold">Room 4B · CSE Batch</p>
        <p className="text-[9px] text-emerald-300">● 3 of 4 players ready</p>
      </div>
      <span className="ml-auto rounded-full bg-white px-[11px] py-[5px] text-[10px] font-bold text-[#0d1b33]">Join</span>
    </div>

    <div className="absolute inset-x-0 top-[196px] flex justify-center -space-x-[10px]">
      {[AVATARS.aanya, AVATARS.rohan, AVATARS.kabir, AVATARS.meera].map((a, i) => (
        <Avatar key={a} src={a} size={34} className={`ring-2 ring-[#101a2e] ${i === 3 ? 'opacity-40' : ''}`} />
      ))}
    </div>

    <div className="absolute inset-x-0 top-[262px] flex justify-center gap-[14px]">
      <div className="flex h-[96px] w-[66px] items-center justify-center rounded-[12px] border-[3px] border-white bg-[#16233d] font-display text-[11px] font-bold text-white/80 shadow-lg">
        DRAW
      </div>
      <div className="flex h-[96px] w-[66px] rotate-6 items-center justify-center rounded-[12px] border-[3px] border-white bg-[#ffb020] font-display text-[30px] font-bold shadow-lg">
        7
      </div>
    </div>

    <p className="absolute inset-x-0 top-[378px] text-center text-[10px] font-semibold text-white/70">Your hand · play +2 to stack</p>
    <div className="absolute inset-x-0 bottom-[34px] mx-auto h-[110px] w-[210px]">
      <UnoCard c="bg-[#ff4d4d]" v="5" r={-24} x={0} z={1} />
      <UnoCard c="bg-[#2f80ff]" v="+2" r={-8} x={36} z={2} />
      <UnoCard c="bg-[#17b26a]" v="9" r={8} x={72} z={3} />
      <UnoCard c="bg-[#ffb020]" v="⇄" r={24} x={108} z={4} />
    </div>
  </Screen>
);

export const SCREEN_MAP: Record<ScreenId, React.FC> = {
  feed: FeedScreen,
  chats: ChatsScreen,
  blinks: BlinksScreen,
  events: EventsScreen,
  notes: NotesScreen,
  chapters: ChaptersScreen,
  games: GamesScreen,
};

