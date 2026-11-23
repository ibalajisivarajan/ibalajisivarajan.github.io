'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { animate, createTimeline, eases, stagger } from 'animejs';
import { PlayingCard } from '@/components/PlayingCard';
import { GlowEffect } from '@/components/ui/glow-effect';
import { BY_ID } from '@/data/cards';

const EASE = eases.cubicBezier(0.22, 1, 0.36, 1);
const FAN = [
  { id: 'doomscroll', rot: -16, x: -120, y: 28 },
  { id: 'war-beyond-heaven', rot: 16, x: 120, y: 28 },
  { id: 'family-wealth', rot: 0, x: 0, y: 0 },
];

export function HeroFan() {
  const root = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotX = useTransform(sy, [-1, 1], [10, -10]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = el.querySelectorAll<HTMLElement>('[data-fan]');
    if (reduced) return;
    const tl = createTimeline({ defaults: { ease: EASE } });
    tl.add(cards, {
      translateY: { from: 260 },
      rotate: { from: 0 },
      translateX: { from: 0 },
      opacity: { from: 0, to: 1, duration: 300 },
      duration: 1100,
      delay: stagger(120, { start: 300 }),
    });
    const float = animate(el.querySelectorAll('[data-float]'), {
      translateY: [-6, 6],
      duration: 2600,
      delay: stagger(400),
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      tl.pause();
      float.pause();
    };
  }, [mx, my]);

  return (
    <div ref={root} aria-hidden="true" className="relative hidden h-[400px] w-[440px] shrink-0 [perspective:1400px] lg:block">
      <motion.div style={{ rotateY: rotY, rotateX: rotX }} className="relative h-full w-full [transform-style:preserve-3d]">
        {FAN.map(({ id, rot, x, y }) => (
          <div
            key={id}
            data-fan
            className="absolute left-1/2 top-6 -ml-24 w-48 origin-bottom"
            style={{ transform: `translateX(${x}px) translateY(${y}px) rotate(${rot}deg)` }}
          >
            <div data-float className="relative">
              {id === 'family-wealth' && (
                <GlowEffect
                  colors={['#d4af5a', '#f6f1e3', '#b88a2e', '#d4af5a']}
                  mode="breathe"
                  blur="strongest"
                  duration={4}
                  scale={0.95}
                  className="rounded-2xl opacity-60"
                />
              )}
              <div className="relative">
                <PlayingCard card={BY_ID[id]} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
