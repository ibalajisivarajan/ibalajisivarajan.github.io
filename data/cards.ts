export type Suit = 'S' | 'H' | 'D' | 'C' | 'J';

export type Card = {
  id: string;
  rank: string;
  suit: Suit;
  name: string;
  role: string;
  status: string;
  what: string;
  calls: string[];
  proof: string[];
  link?: { href: string; label: string };
  pending?: boolean;
};

export const SUITS: Record<Suit, { glyph: string; name: string; red: boolean }> = {
  S: { glyph: '♠', name: 'Products', red: false },
  H: { glyph: '♥', name: 'AI and agent systems', red: true },
  D: { glyph: '♦', name: 'Research and data', red: true },
  C: { glyph: '♣', name: 'Enterprise programs', red: false },
  J: { glyph: '★', name: 'Jokers', red: false },
};

export const CARDS: Card[] = [
  {
    id: 'family-wealth', rank: 'A', suit: 'S', name: 'Family Wealth', role: 'Owner, PM, TPM at the start', status: 'Private, demo coming',
    what: 'A private finance portal for two people across the USA, Canada and India: assets, cash flow, retirement by country and an AI news layer.',
    calls: [
      'No background jobs. We log in about once a week, so data refreshes on login.',
      'AI never writes data. It reads and suggests, and a person approves.',
      'Froze the UI as a prototype before any code was written.',
    ],
    proof: ['12 milestones run through a decisions log', 'About 19K lines of TypeScript and SQL', '51 test files and 5 CI workflows, live on Vercel'],
  },
  {
    id: 'talelo', rank: 'K', suit: 'S', name: 'Talelo', role: 'Founder and PM', status: 'Live',
    what: 'A storytelling network. Type a few words, pick one of three directions, get a finished short story. Readers find stories in a feed ranked by what people finish.',
    calls: [
      'Wrote 8 hypotheses and 4 proof gates before production code.',
      'Froze scope on Oct 3. Every later change is a dated amendment.',
      'Opened public access with 3 sparks per browser and a one switch rollback.',
    ],
    proof: [
      '52% reader completion against a 45% gate',
      '61% opened a second spark against a 20% gate',
      'About $0.0033 model cost per finished spark',
      'Caveats: hand written reader catalogue, small and partly warm sample, 7 day return not measured',
    ],
    link: { href: 'https://talelo.app', label: 'Open talelo.app' },
  },
  {
    id: 'carrierguard', rank: 'Q', suit: 'S', name: 'CarrierGuard', role: 'Owner and PM', status: 'Near MVP launch',
    what: 'Continuous carrier vetting for small US freight brokers, with a timestamped vetting packet per carrier as proof of due diligence.',
    calls: [
      'Track insurance from the uploaded certificate, because the regulator publishes no live insurance feed.',
      'Server rendered pages with no frontend build step.',
    ],
    proof: ['Live FMCSA data with daily and weekly monitoring', 'PDF vetting packets, Stripe billing, Render deploy', '20 test files'],
  },
  {
    id: 'jp-house', rank: 'J', suit: 'S', name: 'JP House of Arts', role: 'Builder', status: 'Live site',
    what: 'An enquiry only website for a Langley art studio.',
    calls: [
      'No cart and no payments. Every product opens a WhatsApp chat with its name filled in.',
      'An admin portal so the owner changes every word, product and photo without code.',
    ],
    proof: ['Next.js, Supabase and Vercel, all on free tiers'],
  },
  {
    id: 'brainpick', rank: '10', suit: 'S', name: 'BrainPick', role: 'Founder and PM', status: 'Pilot closed',
    what: 'A pilot marketplace that connects builders with people who know a job from the inside.',
    calls: ['Ran it as a pilot with a clear end date, then closed it.', 'Built the two sided prototype on synthetic data only.'],
    proof: ['Static frontend, serverless functions, Postgres'],
  },
  {
    id: 'war-beyond-heaven', rank: 'A', suit: 'H', name: 'War Beyond Heaven', role: 'Owner and system designer', status: 'Built, not live',
    what: 'An automated video production system for a YouTube channel: a stateless worker, n8n as conductor, Postgres as the source of truth.',
    calls: ['A hard spend cap per episode, enforced by a request ledger.', 'Every human approval is a single use, versioned token.'],
    proof: [
      'State machine, leased jobs, hash chained audit log, transactional outbox',
      'Five AI providers behind one interface',
      'About 13.5K lines of Python, 45 test files',
      'Providers are still mocked. It goes live when keys are added.',
    ],
  },
  {
    id: 'gmail-agent', rank: 'K', suit: 'H', name: 'Gmail Calendar Agent', role: 'Owner and builder', status: 'Private',
    what: 'Reads Gmail every two hours and turns emails into calendar events. When I delete an event it made, it learns from the mistake.',
    calls: [
      'Email never leaves Google infrastructure.',
      'It may rewrite its own prompt only when an efficiency score improves.',
      'A 60 turn safety cap on every tool loop.',
    ],
    proof: ['Cloud Run, Gemini function calling, Firestore', '10 test files'],
  },
  {
    id: 'daily-pulse', rank: 'Q', suit: 'H', name: 'Daily Pulse v2', role: 'Builder', status: 'Public repo',
    what: 'A full screen vertical news feed that refreshes itself every two hours at zero monthly cost.',
    calls: ['Built my own MCP server instead of hard coding news sources.'],
    proof: ['17 news tools in one MCP server', 'Agent script plus a Cloudflare Worker', 'GitHub Actions schedule, GitHub Pages hosting'],
    link: { href: 'https://github.com/ibalajisivarajan/daily-pulse-v2', label: 'View the repo' },
  },
  {
    id: 'linkedin-agent', rank: 'J', suit: 'H', name: 'LinkedIn Post Agent', role: 'Builder', status: 'Private',
    what: 'Finds trending topics, drafts posts with visuals and sends them to me on Telegram for approval.',
    calls: ['Posting stays manual. No LinkedIn API, and I approve every draft.'],
    proof: ['Scheduled runs three times a week', 'Gemini drafts, Supabase records'],
  },
  {
    id: 'mirenspace', rank: '10', suit: 'H', name: 'MirenSpace Factory', role: 'Builder', status: 'Private',
    what: 'The daily runner for a Shorts channel: claim a brief, render, run quality gates, log the result.',
    calls: ['Nothing posts unless a kill switch is turned on after a go live decision.'],
    proof: [
      'Quality gates on duration, audio and file size',
      'Subtitle timing fix that realigns words to the script',
      'Built on the open source MoneyPrinterTurbo. My code is the factory layer.',
    ],
  },
  {
    id: 'doomscroll', rank: 'A', suit: 'D', name: 'Doomscroll Bias Study', role: 'Sole author', status: 'Under review',
    what: 'A preregistered audit of how two open weight LLMs assign blame in relationship conflicts when only gender and name cues change.',
    calls: [
      'Locked the protocol in a config file before any results came in.',
      'Reported a result as inconclusive when two human raters disagreed.',
    ],
    proof: ['7,200 scored responses across two models', 'Findings and code held until peer review finishes'],
  },
  {
    id: 'idea-loop', rank: 'K', suit: 'D', name: 'Business Idea Loop', role: 'Builder', status: 'Private',
    what: 'Five agents on a schedule that find, stress test and plan business ideas, then stop when three pass.',
    calls: ['Three hard constraints checked before any idea is saved.', 'Every rejected idea goes on a blacklist so it never comes back.'],
    proof: ['GitHub Actions on a free tier', '19 test files, 9 workflows'],
  },
  {
    id: 'problem-hunter', rank: 'Q', suit: 'D', name: 'Problem Hunter', role: 'Builder', status: 'Private',
    what: 'One agent loop that finds problems buyers already pay a bad solution for, checks price and complaints with live search, and logs the result.',
    calls: [
      'Moved off a free model tier after hitting a quota wall. Now about $25 to $30 a month.',
      'A hard pass or fail gate on every problem.',
    ],
    proof: ['Live web search grounding, Notion log'],
  },
  {
    id: 'jetblue', rank: 'A', suit: 'C', name: 'JetBlue', role: 'Technical Program Manager', status: 'Apr 2023 to present', pending: true,
    what: 'Flight operations platforms.', calls: [], proof: [],
  },
  {
    id: 'csaa', rank: 'K', suit: 'C', name: 'CSAA', role: 'Technical Program Manager', status: 'Apr 2021 to Apr 2023', pending: true,
    what: 'Details being confirmed.', calls: [], proof: [],
  },
  {
    id: 'wisconsin', rank: 'Q', suit: 'C', name: 'Wisconsin Dept. of Revenue', role: 'Technical Project Manager', status: 'Earlier role', pending: true,
    what: 'Tax and audit platforms for a state agency.', calls: [], proof: [],
  },
  {
    id: 'mattel', rank: 'J', suit: 'C', name: 'Mattel, AmericanGirl.com', role: 'Technical Project Manager', status: 'Earlier role', pending: true,
    what: 'eCommerce for AmericanGirl.com, including the Create Your Doll experience.', calls: [], proof: [],
  },
  {
    id: 'cuna', rank: '10', suit: 'C', name: 'CUNA Mutual, TruStage', role: 'Technical Project Manager', status: 'Earlier role', pending: true,
    what: 'eCommerce for TruStage.com.', calls: [], proof: [],
  },
  {
    id: 'chubb', rank: '9', suit: 'C', name: 'CHUBB', role: 'Software Engineer, Test', status: 'Earlier role', pending: true,
    what: 'Migration of legacy workflow systems to one platform, across global teams.', calls: [], proof: [],
  },
  {
    id: 'next', rank: '★', suit: 'J', name: 'Building next', role: 'Joker', status: 'In progress',
    what: 'The Talelo production build, and a public Family Wealth demo with synthetic data.',
    calls: ['Production work on Talelo starts after the infrastructure decision gate.'], proof: [],
  },
  {
    id: 'deal-me-in', rank: '★', suit: 'J', name: 'Deal me in', role: 'Joker', status: 'Open to roles',
    what: 'If a card caught your eye, let us talk. I am looking for AI and technical product manager roles, remote Canada and Vancouver first.',
    calls: [], proof: [],
    link: { href: 'https://www.linkedin.com/in/balaji-sivarajan-08-08/', label: 'Message me on LinkedIn' },
  },
];

export const BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c]));

export function handLabel(ids: string[]): string {
  if (!ids.length) return 'Five cards, face up. Tap one to read it.';
  const cards = ids.map((i) => BY_ID[i]);
  if (ids.includes('family-wealth')) return 'You drew the Ace of Spades';
  const aces = cards.filter((c) => c.rank === 'A').length;
  if (aces >= 2) return `${aces} Aces. The deep end`;
  const counts: Record<string, number> = {};
  cards.filter((c) => c.suit !== 'J').forEach((c) => (counts[c.suit] = (counts[c.suit] || 0) + 1));
  const n = Object.values(counts).sort((a, b) => b - a);
  if (n[0] === 5) return 'Flush. One lane, all the way down';
  if (n[0] === 3 && n[1] === 2) return 'Full house. Two lanes, deep';
  if (Object.keys(counts).length === 4) return 'Full range. All four suits';
  if (cards.some((c) => c.suit === 'J')) return 'A wild card in hand';
  return `${Object.keys(counts).length} lanes in one hand`;
}
