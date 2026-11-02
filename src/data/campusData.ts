export type ScreenStageId = 'feed' | 'chats' | 'blinks' | 'events' | 'notes' | 'games';

export interface FeatureStage {
  id: ScreenStageId;
  number: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  accentColor: string;
  glowClass: string;
  bullets: string[];
  metricLabel: string;
  metricValue: string;
}

export const FEATURE_STAGES: FeatureStage[] = [
  {
    id: 'feed',
    number: '01',
    badge: 'Campus Pulse & Feed',
    title: 'Your entire college,',
    highlight: 'live in one verified feed.',
    description:
      'Real names, real batchmates. See campus polls, festival announcements, club updates, and senior resource drops — exclusively from verified students of your college.',
    accentColor: '#0095f6',
    glowClass: 'from-[#0095f6]/35 via-sky-500/20 to-blue-600/10',
    bullets: [
      'Strict .ac.in email & Student ID verification gate',
      'Interactive batch polls, discussion threads & bookmarks',
      'Zero outsiders, zero bots, zero random spam forwards',
    ],
    metricLabel: 'Verification Standard',
    metricValue: '100% College Verified',
  },
  {
    id: 'chats',
    number: '02',
    badge: 'Zero-Knowledge Messaging',
    title: 'Chats and groups,',
    highlight: 'end-to-end encrypted.',
    description:
      'Message seniors, project teammates, or your whole branch without ever exposing your personal phone number. Encrypted on your device so nobody else can read a word.',
    accentColor: '#10b981',
    glowClass: 'from-emerald-500/35 via-teal-500/20 to-cyan-600/10',
    bullets: [
      'Client-side X25519 + AES-GCM end-to-end encryption',
      'Connect by @username — your phone number stays private',
      'Instant PDF, note & event link sharing inside batch groups',
    ],
    metricLabel: 'Encryption Protocol',
    metricValue: 'Device-to-Device E2E',
  },
  {
    id: 'blinks',
    number: '03',
    badge: 'Ephemeral Campus Stories',
    title: 'Blinks that vanish',
    highlight: 'the moment they’re seen.',
    description:
      'Share raw, unfiltered moments from late-night hostel study sessions, jam rooms, or lecture halls. Once your friends view a Blink, it disappears automatically.',
    accentColor: '#8b5cf6',
    glowClass: 'from-violet-500/35 via-purple-500/20 to-fuchsia-600/10',
    bullets: [
      'One-time view photos & videos with live campus rings',
      'No permanent profile clutter or social pressure',
      'Instant emoji bursts & encrypted replies',
    ],
    metricLabel: 'Lifespan After View',
    metricValue: '0 Seconds · Auto-Vanish',
  },
  {
    id: 'events',
    number: '04',
    badge: 'Fests, Hackathons & Passes',
    title: 'Campus events with',
    highlight: 'instant QR door tickets.',
    description:
      'Discover cultural fests, 24-hour hackathons, open mics, and workshops happening across your college. Claim your pass in one tap and scan your QR stub at the gate.',
    accentColor: '#f59e0b',
    glowClass: 'from-amber-500/35 via-orange-500/20 to-rose-600/10',
    bullets: [
      'Perforated digital QR tickets with instant door check-in',
      'See which friends and batchmates are attending live',
      'Interactive campus venue pins & reminder alerts',
    ],
    metricLabel: 'Gate Check-In Speed',
    metricValue: '< 1.2s QR Scan',
  },
  {
    id: 'notes',
    number: '05',
    badge: 'Senior Knowledge Vault',
    title: 'Notes and past papers,',
    highlight: 'passed down by seniors.',
    description:
      'Stop begging across ten WhatsApp groups at 2 AM before an exam. Every topper note, lab manual, and solved previous year paper is sorted by subject and semester.',
    accentColor: '#ec4899',
    glowClass: 'from-pink-500/35 via-rose-500/20 to-purple-600/10',
    bullets: [
      'Indexed by branch, semester, subject code & professor',
      'Instant PDF preview and one-tap offline download',
      'Attributed to the verified seniors who uploaded them',
    ],
    metricLabel: 'Exam Night Readiness',
    metricValue: 'Sorted by Subject & Sem',
  },
  {
    id: 'games',
    number: '06',
    badge: 'Chapters & Batch Lounge',
    title: 'Clubs you start &',
    highlight: 'UNO between lectures.',
    description:
      'Rally 10 backers and a faculty advisor to launch an official campus Chapter, or jump into a live multiplayer UNO & Ludo room with your batchmates between classes.',
    accentColor: '#06b6d4',
    glowClass: 'from-cyan-500/35 via-[#0095f6]/20 to-indigo-600/10',
    bullets: [
      'Launch student Chapters with 10 backers & faculty sign-off',
      'Real-time 4-player UNO & party rooms with live reactions',
      'Hostel & batch leaderboards across your campus',
    ],
    metricLabel: 'Club Launch Threshold',
    metricValue: '10 Backers + Advisor',
  },
];

export const COLLEGES_LIST = [
  { short: 'IIT Bombay', domain: 'iitb.ac.in', students: '4,820+', tag: '#MoodIndigo26' },
  { short: 'IIT Delhi', domain: 'iitd.ac.in', students: '4,510+', tag: '#Rendezvous' },
  { short: 'BITS Pilani', domain: 'bits-pilani.ac.in', students: '5,190+', tag: '#Oasis26' },
  { short: 'DTU Delhi', domain: 'dtu.ac.in', students: '6,120+', tag: '#Engifest26' },
  { short: 'VIT Vellore', domain: 'vitstudent.ac.in', students: '8,940+', tag: '#Riviera' },
  { short: 'NIT Trichy', domain: 'nitt.edu', students: '3,890+', tag: '#Pragyan26' },
  { short: 'MIT Manipal', domain: 'manipal.edu', students: '5,640+', tag: '#TechTatva' },
  { short: 'Delhi University', domain: 'du.ac.in', students: '9,450+', tag: '#Crossroads' },
  { short: 'IIIT Hyderabad', domain: 'iiit.ac.in', students: '2,410+', tag: '#Felicity' },
];

