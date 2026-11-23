export type Call = 'Build' | 'Park' | 'Cut';

export type BacklogCard = {
  id: string;
  product: 'Talelo' | 'Family Wealth';
  name: string;
  points: number;
  call: Call;
  why: string;
};

/**
 * Real backlog decisions from Talelo's MVP plan and Family Wealth's decisions log.
 * Effort points are illustrative game values, not measured estimates.
 */
export const BACKLOG: BacklogCard[] = [
  { id: 'create', product: 'Talelo', name: 'Three story directions from a few words', points: 5, call: 'Build', why: 'The creation half of the bet. A real choice makes the story feel like yours.' },
  { id: 'reader', product: 'Talelo', name: 'Finished story opens in a reader', points: 4, call: 'Build', why: 'The creator meets the story as a reader first, not in an editor.' },
  { id: 'seed', product: 'Talelo', name: 'Feed seeded with 30 to 50 stories', points: 5, call: 'Build', why: 'The reader half of the bet. An empty network proves nothing.' },
  { id: 'signal', product: 'Talelo', name: 'Readers, finishes, saves, follows', points: 2, call: 'Build', why: 'Tests one thing: does a visible audience make a creator write story two?' },
  { id: 'import', product: 'Talelo', name: 'Bring your own story', points: 3, call: 'Build', why: 'Makes Talelo a storytelling network, not only a generator, for one small flow.' },
  { id: 'studio', product: 'Talelo', name: 'Nine stage AI Story Studio', points: 9, call: 'Park', why: 'Slow and costly. A blind benchmark decides first; validation used a simple engine.' },
  { id: 'audio', product: 'Talelo', name: 'Narration for every story', points: 7, call: 'Park', why: 'Cost before text retention is proven. Later, a small curated set first.' },
  { id: 'comments', product: 'Talelo', name: 'Comments', points: 4, call: 'Park', why: 'Held until moderation and real readership exist.' },
  { id: 'coins', product: 'Talelo', name: 'Creator coins and tips', points: 6, call: 'Park', why: 'Monetization must not distort validation. Readers first.' },
  { id: 'controls', product: 'Talelo', name: 'Length and intensity sliders', points: 2, call: 'Cut', why: 'More settings, no more ownership. Every story builds at one default.' },
  { id: 'editor', product: 'Talelo', name: 'Full rich text editor', points: 8, call: 'Cut', why: 'Talelo is not a document editor. Light fixes only.' },
  { id: 'dms', product: 'Talelo', name: 'Direct messages', points: 3, call: 'Cut', why: 'Safety cost with no link to any proof gate.' },
  { id: 'freeze', product: 'Family Wealth', name: 'Freeze the UI before any code', points: 3, call: 'Build', why: 'One frozen prototype means agents build to a target, not to taste.' },
  { id: 'backup', product: 'Family Wealth', name: 'Backup every three days', points: 2, call: 'Build', why: 'Real database activity, so it also keeps the free tier awake. No other cron.' },
  { id: 'cron', product: 'Family Wealth', name: 'Nightly background jobs', points: 6, call: 'Cut', why: 'We log in about once a week. Refresh on login instead.' },
  { id: 'aiwrite', product: 'Family Wealth', name: 'Let AI write to the database', points: 4, call: 'Cut', why: 'AI reads and suggests. A person approves every change.' },
];
