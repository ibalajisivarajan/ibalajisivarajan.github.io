'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { TextScramble } from '@/components/ui/text-scramble';
import { DealButton } from '@/components/DealButton';

const EASE = [0.22, 1, 0.36, 1] as const;
const LINES = ['Fifteen years of', 'shipping software,', 'dealt as 21 cards.'];
const STATS = [
  { n: 41, label: 'repos' },
  { n: 15, label: 'years' },
  { n: 4, label: 'suits' },
  { n: 21, label: 'cards' },
];

export function HeroCopy() {
  const [go, setGo] = useState(false);
  const [scramble, setScramble] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 500);
    const s = setTimeout(() => setScramble(true), 1300);
    return () => {
      clearTimeout(t);
      clearTimeout(s);
    };
  }, []);
  return (
    <div ref={ref} className="relative flex flex-col gap-4 sm:gap-6">
      <TextShimmer className="caption-3 [--base-color:#d4af5a] [--base-gradient-color:#f6f1e3]" duration={2.4}>
        Product builder · Vancouver, BC
      </TextShimmer>
      <h1 className="heading-1 max-w-[680px] max-sm:!text-4xl max-sm:!leading-10">
        {LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-1">
            <motion.span
              className="hero-gradient block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
            >
              {i === 2 ? (
                <>
                  dealt as{' '}
                  <TextScramble as="span" trigger={scramble} duration={1.1} characterSet="♠♥♦♣AKQJ1098765432">
                    21 cards.
                  </TextScramble>
                </>
              ) : (
                line
              )}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p
        className="title-2 max-w-[680px] text-muted max-sm:!text-[length:16px] max-sm:!leading-6"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
      >
        I am Bala. Every card is a product, AI system or program I ran, with the call I made and the evidence behind it.
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
      >
        <DealButton />
        <div className="flex flex-wrap gap-6">
          {STATS.map(({ n, label }) => (
            <span key={label} className="flex items-baseline gap-1">
              <AnimatedNumber value={go ? n : 0} springOptions={{ bounce: 0, duration: 1800 }} className="heading-6 tabular-nums text-white" />
              <span className="body-5 text-muted">{label}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
