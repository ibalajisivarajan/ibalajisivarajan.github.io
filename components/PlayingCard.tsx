import { cn } from '@/lib/utils';
import { Card } from '@/data/cards';
import { CardBackArt, CardFaceArt } from '@/components/CardArt';

export function PlayingCard({ card, className }: { card: Card; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[5/7] w-full select-none overflow-hidden rounded-2xl bg-ivory shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_18px_36px_-14px_rgba(0,0,0,0.75)]',
        className,
      )}
    >
      <CardFaceArt rank={card.rank} s={card.suit} special={card.id === 'family-wealth'} title={card.name} />
      <span className="sr-only">
        {card.rank} of {card.suit}: {card.name}
      </span>
    </div>
  );
}

export function CardBack({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-[5/7] w-full overflow-hidden rounded-2xl bg-ivory shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)]', className)}>
      <CardBackArt />
    </div>
  );
}
