'use client';

import { ReactNode } from 'react';
import { InView } from '@/components/ui/in-view';

export function Reveal({ children }: { children: ReactNode }) {
  return (
    <InView
      once
      viewOptions={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </InView>
  );
}
