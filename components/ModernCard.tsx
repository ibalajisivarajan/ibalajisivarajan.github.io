import { cn } from '@/lib/utils';

export type SuitKey = 'S' | 'H' | 'D' | 'C' | 'J';

const PATHS: Record<SuitKey, React.ReactNode> = {
  H: <path d="M50 90 C22 68 4 50 4 31 C4 16 15 6 29 6 C39 6 46 12 50 21 C54 12 61 6 71 6 C85 6 96 16 96 31 C96 50 78 68 50 90 Z" />,
  D: <path d="M50 3 L87 50 L50 97 L13 50 Z" />,
  S: (
    <path d="M50 4 C61 22 94 40 94 62 C94 76 84 84 72 84 C64 84 57 80 53 74 C55 84 60 92 69 97 L31 97 C40 92 45 84 47 74 C43 80 36 84 28 84 C16 84 6 76 6 62 C6 40 39 22 50 4 Z" />
  ),
  C: (
    <>
      <circle cx="50" cy="27" r="21" />
      <circle cx="27" cy="58" r="21" />
      <circle cx="73" cy="58" r="21" />
      <circle cx="50" cy="52" r="12" />
      <path d="M45 58 C45 78 39 90 30 97 L70 97 C61 90 55 78 55 58 Z" />
    </>
  ),
  J: <path d="M50 2 L61 37 L98 38 L68 60 L79 96 L50 74 L21 96 L32 60 L2 38 L39 37 Z" />,
};

export function SuitIcon({ s, className }: { s: SuitKey; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      {PATHS[s]}
    </svg>
  );
}

type Variant = 'light' | 'dark' | 'gold';

/**
 * A modern playing card: oversized rank, a cropped suit mark, and the title set in type.
 * Every size is in container units, so the card scales cleanly from 96px to 280px wide.
 */
export function ModernCard({
  rank,
  suit,
  title,
  subtitle,
  variant,
  className,
}: {
  rank: string;
  suit: SuitKey;
  title?: string;
  subtitle?: string;
  variant?: Variant;
  className?: string;
}) {
  const red = suit === 'H' || suit === 'D';
  const v: Variant = variant ?? (suit === 'J' ? 'gold' : rank === 'A' ? 'dark' : 'light');
  const surface = {
    light: 'bg-[#f4efe3] text-[#1b1a16]',
    dark: 'bg-[#141310] text-[#f4efe3]',
    gold: 'bg-[#d4af5a] text-[#1b1a16]',
  }[v];
  const suitTone = v === 'dark' ? 'text-[#d4af5a]' : v === 'gold' ? 'text-[#1b1a16]' : red ? 'text-[#c2412f]' : 'text-[#1b1a16]';
  const isNumber = /^\d+$/.test(rank);

  return (
    <div className={cn('@container w-full', className)}>
    <div
      className={cn(
        'relative aspect-[5/7] w-full select-none overflow-hidden rounded-[7cqw] shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_24px_48px_-20px_rgba(0,0,0,0.85)]',
        surface,
      )}
    >
      {/* Hairline inner frame */}
      <div
        className={cn(
          'pointer-events-none absolute inset-[3.5cqw] rounded-[4cqw] border',
          v === 'dark' ? 'border-[#d4af5a]/35' : 'border-black/10',
        )}
      />

      {/* Oversized suit mark, cropped by the card edge */}
      {rank !== 'A' && suit !== 'J' && (
        <SuitIcon s={suit} className={cn('absolute -right-[22cqw] top-[30cqw] w-[92cqw]', suitTone, 'opacity-[0.09]')} />
      )}

      {/* Ace: one centered mark inside two rings */}
      {rank === 'A' && (
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
          <div className={cn('grid size-[56cqw] place-items-center rounded-full border', v === 'dark' ? 'border-[#d4af5a]/50' : 'border-current/20')}>
            <div className={cn('grid size-[46cqw] place-items-center rounded-full border border-dashed', v === 'dark' ? 'border-[#d4af5a]/30' : 'border-current/15')}>
              <SuitIcon s={suit} className={cn('w-[26cqw]', suitTone)} />
            </div>
          </div>
        </div>
      )}

      {/* Joker: star and wordmark */}
      {suit === 'J' && (
        <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[3cqw]">
          <SuitIcon s="J" className="w-[34cqw]" />
          <span className="text-[6cqw] font-semibold uppercase tracking-[0.4em]">Joker</span>
        </div>
      )}

      {/* Court cards: the letter itself is the artwork */}
      {['K', 'Q', 'J'].includes(rank) && suit !== 'J' && (
        <span className={cn('absolute left-[9cqw] top-[24cqw] text-[62cqw] font-semibold leading-none tracking-[-0.06em] opacity-[0.92]', suitTone)}>
          {rank}
        </span>
      )}

      {/* Number cards: the numeral is the artwork */}
      {isNumber && (
        <span className={cn('absolute left-[9cqw] top-[24cqw] text-[56cqw] font-semibold leading-none tracking-[-0.07em]', suitTone)}>
          {rank}
        </span>
      )}

      {/* Top index */}
      <div className="absolute left-[8cqw] top-[7cqw] flex items-center gap-[2cqw]">
        {suit !== 'J' && <span className="text-[11cqw] font-semibold leading-none tracking-[-0.04em]">{rank}</span>}
        <SuitIcon s={suit} className={cn('w-[7cqw]', suitTone)} />
      </div>
      <span className="absolute right-[8cqw] top-[8cqw] text-[4.2cqw] font-medium uppercase tracking-[0.2em] opacity-50">BS</span>

      {/* Title block */}
      {title && (
        <div className="absolute inset-x-[8cqw] bottom-[8cqw] flex flex-col gap-[1.5cqw]">
          <span className={cn('h-px w-[14cqw]', v === 'dark' ? 'bg-[#d4af5a]' : 'bg-current opacity-30')} />
          <span className="line-clamp-2 text-[8cqw] font-semibold leading-[1.1] tracking-[-0.01em]">{title}</span>
          {subtitle && <span className="line-clamp-1 text-[5cqw] font-medium leading-tight opacity-60">{subtitle}</span>}
        </div>
      )}
      {!title && (
        <div className="absolute bottom-[7cqw] right-[8cqw] flex rotate-180 items-center gap-[2cqw]">
          <span className="text-[11cqw] font-semibold leading-none tracking-[-0.04em]">{rank}</span>
          <SuitIcon s={suit} className={cn('w-[7cqw]', suitTone)} />
        </div>
      )}
    </div>
    </div>
  );
}

export function ModernBack({ className }: { className?: string }) {
  return (
    <div className={cn('@container w-full', className)}>
    <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[7cqw] bg-[#141310] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.85)]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="mb-lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#d4af5a" strokeOpacity="0.14" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mb-lines)" />
      </svg>
      <div className="absolute inset-[3.5cqw] rounded-[4cqw] border border-[#d4af5a]/45" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-[3cqw] rounded-full bg-[#141310] px-[6cqw] py-[5cqw]">
          <SuitIcon s="S" className="w-[14cqw] text-[#d4af5a]" />
          <span className="text-[7cqw] font-semibold tracking-[0.35em] text-[#d4af5a]">BS</span>
        </div>
      </div>
    </div>
    </div>
  );
}
