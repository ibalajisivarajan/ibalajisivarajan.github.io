'use client';

import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { CaseCard } from '@/components/CaseCard';
import { CARDS } from '@/data/cards';

const A = CARDS.filter((_, i) => i % 2 === 0);
const B = CARDS.filter((_, i) => i % 2 === 1);

export function DeckRiver() {
  return (
    <div className="relative -mx-4 flex flex-col gap-6 overflow-hidden py-6 [contain:paint] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] sm:mx-0">
      <InfiniteSlider gap={24} speed={40} speedOnHover={8}>
        {A.map((c) => (
          <div key={c.id} className="w-36 -rotate-2 sm:w-40">
            <CaseCard card={c} />
          </div>
        ))}
      </InfiniteSlider>
      <InfiniteSlider gap={24} speed={32} speedOnHover={8} reverse>
        {B.map((c) => (
          <div key={c.id} className="w-36 rotate-2 sm:w-40">
            <CaseCard card={c} />
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-40" direction="left" blurIntensity={1} />
      <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-40" direction="right" blurIntensity={1} />
    </div>
  );
}
