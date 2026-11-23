import { PlayingCard, CardBack } from '@/components/PlayingCard';
import { Card } from '@/data/cards';

/** A card with a real back and face. The inner layer is what gets flipped. */
export function FlipCard({ card }: { card: Card }) {
  return (
    <div className="[perspective:1200px]">
      <div data-flip className="relative [transform-style:preserve-3d] [transform:rotateY(0deg)]">
        <div className="[backface-visibility:hidden]">
          <PlayingCard card={card} />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBack />
        </div>
      </div>
    </div>
  );
}
