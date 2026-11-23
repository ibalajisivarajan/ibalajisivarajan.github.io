'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, createSpring, createTimeline, eases, stagger } from 'animejs';
import { motion } from 'motion/react';
import { BorderTrail } from '@/components/ui/border-trail';
import { Shuffle, Spade } from '@phosphor-icons/react';
import { CaseCard } from '@/components/CaseCard';
import { CardBack } from '@/components/PlayingCard';
import { BY_ID, CARDS, handLabel } from '@/data/cards';

const EASE = eases.cubicBezier(0.22, 1, 0.36, 1);
const ALL = CARDS.map((c) => c.id);

function shuffled(ids: string[]) {
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const START_HAND = ['family-wealth', 'talelo', 'war-beyond-heaven', 'doomscroll', 'jetblue'];

export function DeckTable() {
  const [deck, setDeck] = useState<string[]>(ALL.filter((id) => !START_HAND.includes(id)));
  const [hand, setHand] = useState<string[]>(START_HAND);
  const [dealId, setDealId] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useLayoutEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = handRef.current;
    if (!el || reduced.current) return;
    el.querySelectorAll<HTMLElement>('[data-dealt]').forEach((c) => (c.style.opacity = '0'));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDealId((n) => n + 1);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onDeal = () => deal();
    window.addEventListener('deck:deal', onDeal);
    return () => window.removeEventListener('deck:deal', onDeal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!dealId || !handRef.current || !stackRef.current) return;
    const cards = Array.from(handRef.current.querySelectorAll<HTMLElement>('[data-dealt]'));
    if (reduced.current) {
      animate(cards, { opacity: [0, 1], duration: 300, ease: EASE });
      return;
    }
    const s = stackRef.current.getBoundingClientRect();
    cards.forEach((el) => {
      const r = el.getBoundingClientRect();
      const hidden = s.width === 0;
      el.dataset.dx = String(hidden ? -(r.left + r.width) : s.left + s.width / 2 - (r.left + r.width / 2));
      el.dataset.dy = String(hidden ? 0 : s.top + s.height / 2 - (r.top + r.height / 2));
    });
    const flips = cards.map((c) => c.querySelector<HTMLElement>('[data-flip]')).filter(Boolean) as HTMLElement[];
    flips.forEach((f) => (f.style.transform = 'rotateY(180deg)'));
    const tl = createTimeline({ defaults: { ease: EASE } });
    tl.add(cards, {
      translateX: { from: (el) => Number((el as HTMLElement).dataset.dx), to: 0 },
      translateY: { from: (el) => Number((el as HTMLElement).dataset.dy), to: 0 },
      rotate: { from: () => -24 + Math.random() * 14, to: 0 },
      scale: { from: 0.8, to: 1 },
      opacity: { from: 0, to: 1, duration: 150 },
      delay: stagger(110),
      duration: 650,
    }).add(
      flips,
      { rotateY: { from: 180, to: 0 }, ease: createSpring({ stiffness: 140, damping: 13 }), delay: stagger(110) },
      '-=250',
    );
  }, [dealId]);

  const deal = useCallback(() => {
    setDeck((d) => {
      let pool = d.length >= 5 ? d : shuffled(ALL);
      const next = pool.slice(0, 5);
      pool = pool.slice(5);
      setHand(next);
      setDealId((n) => n + 1);
      return pool;
    });
  }, []);

  const shuffle = useCallback(() => {
    setDeck(shuffled(ALL.filter((id) => !hand.includes(id))));
    if (reduced.current || !stackRef.current) return;
    const backs = Array.from(stackRef.current.querySelectorAll<HTMLElement>('[data-back]'));
    const tl = createTimeline({ defaults: { ease: EASE } });
    for (let i = 0; i < 3; i++) {
      const t = i * 560;
      backs.forEach((el, k) => {
        const side = k % 2 === 0 ? -1 : 1;
        tl.add(el, { translateX: side * 72, translateY: -18, rotate: side * 14, duration: 280 }, t + k * 30)
          .add(el, { translateX: 0, translateY: 0, rotate: 0, duration: 280 }, t + 280 + k * 30);
      });
    }
  }, [hand]);

  const showAce = useCallback(() => {
    const rest = shuffled(ALL.filter((id) => id !== 'family-wealth'));
    setHand(['family-wealth', ...rest.slice(0, 4)]);
    setDeck(rest.slice(4));
    setDealId((n) => n + 1);
  }, []);

  return (
    <div id="table" className="relative scroll-mt-24 rounded-3xl border border-line bg-panel p-4 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <BorderTrail size={120} className="bg-gradient-to-l from-gold via-[#f6f1e3] to-gold/0" transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="caption-3 text-muted">Your hand</span>
            <span className="heading-6 text-gold" aria-live="polite">
              {handLabel(hand)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={shuffle}
              className="button-sm inline-flex items-center gap-2 rounded-lg border border-line bg-raised px-3 py-2 text-white transition-colors duration-300 ease-weighted hover:bg-line active:translate-y-px"
            >
              <Shuffle size={16} weight="bold" /> Shuffle
            </button>
            <button
              onClick={showAce}
              className="button-sm inline-flex items-center gap-2 rounded-lg border border-line bg-raised px-3 py-2 text-white transition-colors duration-300 ease-weighted hover:bg-line active:translate-y-px"
            >
              <Spade size={16} weight="fill" /> Show me the Ace
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[112px_minmax(0,1fr)]">
          <div className="hidden flex-col items-center gap-3 md:flex">
            <div ref={stackRef} className="relative w-28">
              <CardBack className="absolute left-1.5 top-1.5 opacity-60" />
              <div data-back className="absolute inset-0"><CardBack /></div>
              <div data-back className="absolute inset-0"><CardBack /></div>
              <div data-back className="absolute inset-0"><CardBack /></div>
              <div data-back className="relative"><CardBack /></div>
            </div>
            <span className="caption-5 text-muted">{deck.length} left in the deck</span>
          </div>

          <div
            ref={handRef}
            className="relative -mx-4 flex min-w-0 snap-x [contain:paint] md:[contain:none] snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0"
          >
            {hand.map((id, i) => (
              <div key={`${dealId}-${id}`} data-dealt className="w-40 shrink-0 snap-start md:w-auto">
                <motion.div
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileDrag={{ scale: 1.06, rotate: i % 2 ? 6 : -6, zIndex: 20 }}
                  dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
                  className="relative touch-pan-x"
                >
                  <CaseCard card={BY_ID[id]} flip />
                </motion.div>
                <span className="sr-only">Card {i + 1} of 5</span>
              </div>
            ))}
          </div>
        </div>
        <p className="caption-5 text-muted">Tap a card to read the case study. Drag one and let go.</p>
      </div>
    </div>
  );
}
