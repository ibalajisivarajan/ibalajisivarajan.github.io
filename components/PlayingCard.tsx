/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { Card, Suit } from '@/data/cards';

const RANK: Record<string, string> = { A: 'ace', K: 'king', Q: 'queen', J: 'jack' };
const SUIT: Record<Exclude<Suit, 'J'>, string> = { S: 'spades', H: 'hearts', D: 'diamonds', C: 'clubs' };

/** File name of the public domain card face for a rank and suit. */
export function faceSrc(rank: string, suit: Suit, jokerColor: 'red' | 'black' = 'red') {
  if (suit === 'J') return `/cards/${jokerColor}_joker.webp`;
  return `/cards/${RANK[rank] ?? rank}_of_${SUIT[suit]}.webp`;
}

export function CardImage({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div
      className={cn(
        'relative aspect-[500/727] w-full select-none overflow-hidden rounded-[6%/4.2%] bg-white p-[4.5%] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_18px_36px_-14px_rgba(0,0,0,0.75)] ring-1 ring-black/5',
        className,
      )}
    >
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} className="h-full w-full object-contain" />
    </div>
  );
}

export function PlayingCard({ card, className, eager }: { card: Card; className?: string; eager?: boolean }) {
  return (
    <CardImage
      src={faceSrc(card.rank, card.suit, card.id === 'next' ? 'black' : 'red')}
      alt={`${card.suit === 'J' ? 'Joker' : card.rank} card: ${card.name}`}
      className={className}
      eager={eager}
    />
  );
}

export function CardBack({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-[500/727] w-full overflow-hidden rounded-[6%/4.2%] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)]', className)}>
      <img src="/cards/back.webp" alt="" aria-hidden="true" draggable={false} className="h-full w-full object-cover" />
    </div>
  );
}
