'use client';

import BackgroundPaths from '@/components/ui/background-paths';
import { GoldDust } from '@/components/GoldDust';

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-auto absolute inset-x-0 top-0 -z-0 h-[760px]">
      <BackgroundPaths
        className="absolute inset-0 min-h-0 bg-transparent text-gold dark:bg-transparent dark:text-gold"
        count={42}
        spread={0.9}
        angle={-10}
        speed={0.6}
      >
        {null}
      </BackgroundPaths>
      <GoldDust />
    </div>
  );
}
