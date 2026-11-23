'use client';

import { Magnetic } from '@/components/ui/magnetic';
import { Cards } from '@phosphor-icons/react';

export function DealButton() {
  return (
    <Magnetic intensity={0.2} springOptions={{ bounce: 0.1 }} actionArea="self" range={80}>
      <button
        onClick={() => {
          document.getElementById('table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.dispatchEvent(new Event('deck:deal'));
        }}
        className="button-md inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-ink transition-colors duration-300 ease-weighted hover:bg-[#e2c178] active:translate-y-px"
      >
        <Cards size={20} weight="fill" />
        Deal me a hand
      </button>
    </Magnetic>
  );
}
