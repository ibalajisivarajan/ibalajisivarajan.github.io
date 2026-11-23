'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { animate, eases, stagger } from 'animejs';
import { Cards, CaretUp } from '@phosphor-icons/react';
import { CaseCard } from '@/components/CaseCard';
import { CardBack } from '@/components/PlayingCard';
import { BY_ID, CARDS, SUITS, Suit } from '@/data/cards';

const EASE = eases.cubicBezier(0.22, 1, 0.36, 1);
const TOP = ['family-wealth', 'talelo', 'doomscroll', 'jetblue'];

export function ThePack() {
  const [open, setOpen] = useState(false);
  const packRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!open || !packRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = Array.from(packRef.current.querySelectorAll<HTMLElement>('[data-pack]'));
    const b = btnRef.current?.getBoundingClientRect();
    cards.forEach((el) => {
      const r = el.getBoundingClientRect();
      el.dataset.dx = String(b ? b.left + b.width / 2 - (r.left + r.width / 2) : 0);
      el.dataset.dy = String(b ? b.top - (r.top + r.height / 2) : -200);
    });
    animate(cards, {
      translateX: { from: (el) => Number((el as HTMLElement).dataset.dx) },
      translateY: { from: (el) => Number((el as HTMLElement).dataset.dy) },
      rotate: { from: () => -30 + Math.random() * 60 },
      scale: { from: 0.6 },
      opacity: { from: 0, duration: 200 },
      delay: stagger(45),
      duration: 800,
      ease: EASE,
    });
  }, [open]);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {TOP.map((id, i) => (
          <div key={id} className={i % 2 ? 'md:translate-y-6' : ''}>
            <CaseCard card={BY_ID[id]} />
          </div>
        ))}
      </div>

      {!open ? (
        <div className="flex items-center gap-6">
          <div className="relative w-16 shrink-0" aria-hidden="true">
            <CardBack className="absolute left-1 top-1 opacity-60" />
            <CardBack className="relative" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <button
              ref={btnRef}
              onClick={() => setOpen(true)}
              className="button-md inline-flex items-center gap-2 rounded-lg border border-gold/60 bg-raised px-3 py-2 text-white transition-colors duration-300 ease-weighted hover:bg-line active:translate-y-px"
            >
              <Cards size={18} weight="fill" className="text-gold" /> Show all 21 cards
            </button>
            <span className="caption-5 text-muted">Four suits, two Jokers. Aces are the deepest work.</span>
          </div>
        </div>
      ) : (
        <div ref={packRef} className="flex flex-col gap-12">
          {(['S', 'H', 'D', 'C', 'J'] as Suit[]).map((s) => {
            const list = CARDS.filter((c) => c.suit === s);
            return (
              <div key={s} className="flex flex-col gap-4">
                <h3 className="title-1 flex items-baseline gap-2">
                  <span className={SUITS[s].red ? 'text-suit-red' : 'text-white'}>{SUITS[s].glyph}</span>
                  {SUITS[s].name}
                  <span className="caption-5 text-muted">{list.length} cards</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                  {list.map((c) => (
                    <div key={c.id} data-pack>
                      <CaseCard card={c} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <button
            onClick={() => setOpen(false)}
            className="button-sm inline-flex items-center gap-2 self-start rounded-lg border border-line px-3 py-2 text-muted transition-colors duration-300 ease-weighted hover:text-white"
          >
            <CaretUp size={16} /> Put the pack away
          </button>
        </div>
      )}
    </div>
  );
}
