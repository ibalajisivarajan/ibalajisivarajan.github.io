'use client';

import { GoldDust } from '@/components/GoldDust';

/** Sparse gold dust behind the hero. The flowing ribbon was removed for a calmer stage. */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[100vh]">
      <GoldDust count={36} />
    </div>
  );
}
