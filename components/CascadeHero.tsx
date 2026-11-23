'use client';

import { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';
import { HeroCopy } from '@/components/HeroCopy';
import { ModernCard } from '@/components/ModernCard';
import { BY_ID } from '@/data/cards';

/**
 * Three beats, all driven by scroll position (no springs, so nothing lags behind the hand):
 * 1. Cards fall in from above, alternating left and right, and riffle into one neat stack.
 * 2. The stack fans open into a hand, pivoting from a point below the cards.
 * 3. The hand lifts away with depth parallax as the copy exits.
 */
const HAND = ['jetblue', 'doomscroll', 'war-beyond-heaven', 'family-wealth', 'talelo', 'carrierguard', 'daily-pulse'];
const N = HAND.length;
const SPREAD = 13; // degrees between neighbours in the fan

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const outBack = (t: number) => {
  const c1 = 1.2, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function HandCard({ i, p }: { i: number; p: MotionValue<number> }) {
  const side = i % 2 === 0 ? -1 : 1;
  const fallStart = 0.02 + i * 0.045;
  const fallEnd = fallStart + 0.2;
  const angle = (i - (N - 1) / 2) * SPREAD;
  const depth = Math.abs(i - (N - 1) / 2); // centre card is closest

  const y = useTransform(p, (v) => {
    const f = outCubic(seg(v, fallStart, fallEnd));
    const fall = -760 * (1 - f) - i * 1.6 * f; // lands on the stack, each card a hair higher
    const exit = inOutCubic(seg(v, 0.76, 1)) * -(90 + depth * 26);
    return fall + exit;
  });
  const x = useTransform(p, (v) => {
    const f = outCubic(seg(v, fallStart, fallEnd));
    return side * 150 * (1 - f) + i * 0.6 * f;
  });
  const rotate = useTransform(p, (v) => {
    const f = seg(v, fallStart, fallEnd);
    const fan = outBack(seg(v, 0.44, 0.7));
    return side * 18 * (1 - outCubic(f)) + angle * fan;
  });
  const opacity = useTransform(p, (v) => clamp(seg(v, fallStart, fallStart + 0.05) * 1.5));
  const scale = useTransform(p, (v) => 1 + 0.04 * Math.sin(Math.PI * seg(v, fallStart, fallEnd)) - 0.06 * inOutCubic(seg(v, 0.76, 1)));
  const shadow = useTransform(p, (v) => {
    const lift = Math.sin(Math.PI * seg(v, fallStart, fallEnd));
    return `drop-shadow(0 ${10 + lift * 30}px ${18 + lift * 30}px rgba(0,0,0,${0.45 + lift * 0.2}))`;
  });

  const card = BY_ID[HAND[i]];
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -ml-[calc(var(--cw)/2)] w-[var(--cw)] origin-[50%_135%] will-change-transform"
      style={{ x, y, rotate, opacity, scale, filter: shadow, zIndex: 20 - depth * 2 + (i > (N - 1) / 2 ? 1 : 0) }}
    >
      <ModernCard rank={card.rank} suit={card.suit} title={card.name} subtitle={card.role} />
    </motion.div>
  );
}

export function CascadeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const settled = useTransform(scrollYProgress, () => 0.7);
  const p = reduce ? settled : scrollYProgress;

  const copyY = useTransform(p, [0.72, 1], [0, -140]);
  const copyOpacity = useTransform(p, [0.78, 0.98], [1, 0]);
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0]);
  const cueVis = useTransform(p, (v) => (v > 0.06 ? 'hidden' : 'visible'));
  const stageY = useTransform(p, [0, 1], [30, -30]);
  const caption = useTransform(p, [0.5, 0.62, 0.76, 0.84], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden [contain:paint]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-2 px-4 pt-16 sm:gap-8 lg:grid-cols-[1fr_520px] lg:pt-0">
          <motion.div style={{ y: copyY, opacity: copyOpacity }}>
            <HeroCopy />
          </motion.div>

          <motion.div style={{ y: stageY }} className="relative mx-auto h-[42vh] w-full max-w-[520px] [--cw:116px] sm:[--cw:140px] lg:h-[70vh] lg:[--cw:168px]" aria-hidden="true">
            <div className="absolute inset-x-0 bottom-[14%] top-0">
              {HAND.map((id, i) => (
                <HandCard key={id} i={i} p={p} />
              ))}
            </div>
            <motion.p style={{ opacity: caption }} className="caption-4 absolute inset-x-0 bottom-0 text-center text-muted">
              Seven of twenty one. The Ace of Spades leads.
            </motion.p>
          </motion.div>
        </div>

        <motion.div style={{ opacity: cueOpacity, visibility: cueVis }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted sm:flex">
          <span className="caption-4">Scroll to deal</span>
          <CaretDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
