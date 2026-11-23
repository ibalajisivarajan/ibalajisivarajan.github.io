import { cn } from '@/lib/utils';
import { Card, SUITS } from '@/data/cards';

const FACE = new Set(['K', 'Q', 'J']);

export function PlayingCard({ card, className }: { card: Card; className?: string }) {
  const s = SUITS[card.suit];
  const tone = s.red ? 'text-suit-red' : 'text-ink';
  const isAce = card.rank === 'A';
  const isJoker = card.suit === 'J';
  return (
    <div
      className={cn(
        'relative aspect-[5/7] w-full select-none rounded-2xl bg-ivory p-2 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_16px_32px_-12px_rgba(0,0,0,0.7)]',
        className,
      )}
    >
      <div className={cn('relative flex h-full flex-col rounded-lg border border-ivory-line', tone)}>
        <Index rank={card.rank} glyph={s.glyph} />
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2 text-center">
          {isAce && <span className="text-7xl leading-none">{s.glyph}</span>}
          {isJoker && <span className="caption-3 text-gold-ink">Joker</span>}
          {FACE.has(card.rank) && (
            <span className="grid size-12 place-items-center rounded-lg border border-gold/60 text-3xl leading-none">{s.glyph}</span>
          )}
          {!isAce && !isJoker && !FACE.has(card.rank) && <span className="text-5xl leading-none">{s.glyph}</span>}
          <span className="body-5 font-semibold text-ink">{card.name}</span>
        </div>
        <Index rank={card.rank} glyph={s.glyph} flip />
      </div>
    </div>
  );
}

function Index({ rank, glyph, flip }: { rank: string; glyph: string; flip?: boolean }) {
  return (
    <div className={cn('flex w-8 flex-col items-center pt-2', flip ? 'rotate-180 self-end pb-0' : 'self-start')}>
      <span className="text-xl font-semibold leading-7">{rank}</span>
      <span className="text-base leading-4">{glyph}</span>
    </div>
  );
}

export function CardBack({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-[5/7] w-full rounded-2xl bg-ivory p-2 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)]', className)}>
      <div className="relative h-full overflow-hidden rounded-lg bg-panel">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="spades" width="16" height="16" patternUnits="userSpaceOnUse">
              <text x="4" y="12" fontSize="9" fill="#d4af5a" opacity="0.35">♠</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#spades)" />
        </svg>
        <div className="absolute inset-2 grid place-items-center rounded border border-gold/70">
          <span className="grid size-12 place-items-center rounded-full border border-gold bg-panel text-base font-semibold text-gold">BS</span>
        </div>
      </div>
    </div>
  );
}
