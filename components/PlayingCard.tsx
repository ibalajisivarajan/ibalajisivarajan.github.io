import { Card } from '@/data/cards';
import { ModernBack, ModernCard } from '@/components/ModernCard';

export function PlayingCard({ card, className }: { card: Card; className?: string; eager?: boolean }) {
  return (
    <div role="img" aria-label={`${card.suit === 'J' ? 'Joker' : card.rank} card: ${card.name}`} className={className}>
      <ModernCard rank={card.rank} suit={card.suit} title={card.name} subtitle={card.role} />
    </div>
  );
}

export function CardBack({ className }: { className?: string }) {
  return <ModernBack className={className} />;
}
