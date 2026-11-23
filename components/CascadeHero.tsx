'use client';

import { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';
import { HeroCopy } from '@/components/HeroCopy';
import { ModernBack, ModernCard } from '@/components/ModernCard';
import { BY_ID } from '@/data/cards';

/** Cards in the order they leave the deck. The first one flies highest. */
const FALL = [
  { id: 'family-wealth', x: 10, y: -560, r: -8, rx: 10 },
  { id: 'talelo', x: -95, y: -470, r: 16, rx: -8 },
  { id: 'war-beyond-heaven', x: 80, y: -400, r: -20, rx: 12 },
  { id: 'doomscroll', x: -40, y: -330, r: 9, rx: -10 },
  { id: 'carrierguard', x: 105, y: -265, r: 24, rx: 8 },
  { id: 'jetblue', x: -100, y: -205, r: -14, rx: -12 },
  { id: 'daily-pulse', x: 45, y: -150, r: -28, rx: 10 },
  { id: 'gmail-agent', x: -60, y: -100, r: 18, rx: -6 },
  { id: 'deal-me-in', x: 70, y: -55, r: -10, rx: 8 },
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function FallingCard({ i, p, cfg }: { i: number; p: MotionValue<number>; cfg: (typeof FALL)[number] }) {
  const start = 0.04 + i * 0.055;
  const t = useTransform(p, [start, start + 0.42], [0, 1], { clamp: true });
  const e = useTransform(t, ease);
  const x = useTransform(e, (v) => cfg.x * v);
  const y = useTransform(e, (v) => cfg.y * 0.78 * v);
  // Spin past the target and settle, like a card leaving a riffle.
  const rotate = useTransform(t, (v) => cfg.r * ease(v) + Math.sin(v * Math.PI) * (i % 2 ? 40 : -40));
  const rotateX = useTransform(t, (v) => cfg.rx * Math.sin(v * Math.PI * 0.9));
  const rotateY = useTransform(t, (v) => (i % 2 ? 1 : -1) * 28 * Math.sin(v * Math.PI));
  const scale = useTransform(e, [0, 1], [0.92, 1]);
  const card = BY_ID[cfg.id];
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 w-[var(--cw)] -translate-x-1/2 will-change-transform"
      style={{ x, y, rotate, rotateX, rotateY, scale, zIndex: FALL.length - i }}
    >
      <ModernCard rank={card.rank} suit={card.suit} title={card.name} subtitle={card.role} />
    </motion.div>
  );
}

export function CascadeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const still = useTransform(p, () => 1);
  const progress = reduce ? still : p;

  // Parallax: the copy drifts up and fades as the deck takes over.
  const copyY = useTransform(progress, [0, 0.7], [0, -120]);
  const copyOpacity = useTransform(progress, [0.45, 0.75], [1, 0.15]);
  const cueOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const stageY = useTransform(progress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative h-[300vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden [contain:paint]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-2 px-4 pt-16 sm:gap-8 lg:grid-cols-[1fr_440px] lg:pt-0">
          <motion.div style={{ y: copyY, opacity: copyOpacity }}>
            <HeroCopy />
          </motion.div>

          <motion.div
            style={{ y: stageY }}
            className="relative mx-auto h-[40vh] w-full max-w-[440px] [--cw:120px] [perspective:1400px] sm:[--cw:150px] lg:h-[80vh] lg:[--cw:164px]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-0 bottom-[4%] h-full origin-bottom scale-[0.6] lg:scale-100">
              {/* The deck the cards leave from */}
              <div className="absolute bottom-0 left-1/2 w-[var(--cw)] -translate-x-1/2">
                {[6, 5, 4, 3, 2, 1, 0].map((k) => (
                  <div key={k} className="absolute bottom-0 left-0 w-full" style={{ transform: `translate(${k * 1.2}px, ${k * 2.4}px)` }}>
                    <ModernBack />
                  </div>
                ))}
                <div className="invisible">
                  <ModernBack />
                </div>
              </div>
              {FALL.map((cfg, i) => (
                <FallingCard key={cfg.id} i={i} p={progress} cfg={cfg} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div style={{ opacity: cueOpacity }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col sm:flex items-center gap-1 text-muted">
          <span className="caption-4">Scroll to shuffle</span>
          <CaretDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
