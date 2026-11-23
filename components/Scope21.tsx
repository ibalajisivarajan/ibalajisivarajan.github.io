'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, createSpring, eases } from 'animejs';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowsCounterClockwise, Hand, Plus } from '@phosphor-icons/react';
import { BACKLOG, BacklogCard, Call } from '@/data/backlog';
import { CardBack } from '@/components/PlayingCard';
import { cn } from '@/lib/utils';

const EASE = eases.cubicBezier(0.22, 1, 0.36, 1);
const BY = Object.fromEntries(BACKLOG.map((c) => [c.id, c]));
const CALL_STYLE: Record<Call, string> = {
  Build: 'bg-[#1f3a2a] text-[#9fe0b4]',
  Park: 'bg-[#3a3220] text-gold',
  Cut: 'bg-[#3a2020] text-[#f0a49a]',
};

type Phase = 'idle' | 'player' | 'done';

function shuffled() {
  const a = BACKLOG.map((c) => c.id);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const total = (ids: string[]) => ids.reduce((n, id) => n + BY[id].points, 0);

function Face({ card }: { card: BacklogCard }) {
  const red = card.product === 'Talelo';
  const glyph = red ? '♦' : '♣';
  return (
    <div className="aspect-[5/7] w-full rounded-xl bg-ivory p-1.5 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.7)]">
      <div className={cn('flex h-full flex-col rounded-md border border-ivory-line px-2 py-1.5', red ? 'text-suit-red' : 'text-ink')}>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold leading-7">{card.points}</span>
          <span className="text-base leading-4">{glyph}</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
          <span className="caption-4 text-ink">{card.name}</span>
        </div>
        <span className="caption-5 text-center text-ink/50">{card.product}</span>
      </div>
    </div>
  );
}

function GameCard({ id, hidden }: { id: string; hidden?: boolean }) {
  return (
    <div className="w-24 shrink-0 [perspective:1000px] sm:w-28">
      <div data-flip className="relative [transform-style:preserve-3d]" style={{ transform: hidden ? 'rotateY(180deg)' : undefined }}>
        <div className="[backface-visibility:hidden]">
          <Face card={BY[id]} />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBack className="rounded-xl p-1.5" />
        </div>
      </div>
    </div>
  );
}

export function Scope21() {
  const [deck, setDeck] = useState<string[]>([]);
  const [you, setYou] = useState<string[]>([]);
  const [bala, setBala] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [record, setRecord] = useState({ w: 0, l: 0, p: 0 });
  const [outcome, setOutcome] = useState<{ title: string; body: string } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const seen = useRef(new Set<string>());
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Animate any card that is new on the table: fly in from the deck, then flip face up.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('[data-gcard]').forEach((el) => {
      const key = el.dataset.key!;
      if (seen.current.has(key)) return;
      seen.current.add(key);
      if (reduced.current) return;
      animate(el, { translateY: { from: -140 }, translateX: { from: 60 }, rotate: { from: -14 }, opacity: { from: 0, duration: 150 }, duration: 600, ease: EASE });
      const flip = el.querySelector<HTMLElement>('[data-flip]');
      if (flip && el.dataset.hidden !== 'true') {
        flip.style.transform = 'rotateY(180deg)';
        animate(flip, { rotateY: { from: 180, to: 0 }, delay: 250, ease: createSpring({ stiffness: 150, damping: 14 }) });
      }
    });
  });

  const deal = useCallback(() => {
    const d = shuffled();
    seen.current.clear();
    setYou([d[0], d[2]]);
    setBala([d[1], d[3]]);
    setDeck(d.slice(4));
    setOutcome(null);
    setPhase('player');
  }, []);

  useEffect(() => {
    const onDeal = () => deal();
    window.addEventListener('deck:deal', onDeal);
    return () => window.removeEventListener('deck:deal', onDeal);
  }, [deal]);

  const finish = useCallback(
    (yours: string[], balas: string[], d: string[]) => {
      let b = [...balas];
      let rest = [...d];
      const y = total(yours);
      if (y <= 21) {
        while (total(b) < 17 && rest.length) {
          b = [...b, rest[0]];
          rest = rest.slice(1);
        }
      }
      const bt = total(b);
      let result: 'w' | 'l' | 'p';
      let title: string;
      let body: string;
      if (y > 21) {
        result = 'l';
        title = 'Scope creep. The launch slips.';
        body = `You took on ${y} points against a budget of 21.`;
      } else if (bt > 21) {
        result = 'w';
        title = 'Bala overbuilt this hand. You ship first.';
        body = `His hand went to ${bt} points. Yours shipped at ${y}.`;
      } else if (y > bt) {
        result = 'w';
        title = y === 21 ? 'Twenty one exactly. A full budget.' : 'You fit more scope inside the budget.';
        body = `You shipped ${y} points of scope. Bala stood on ${bt}.`;
      } else if (y < bt) {
        result = 'l';
        title = 'Bala fit more inside the budget.';
        body = `He stood on ${bt}. You stopped at ${y}.`;
      } else {
        result = 'p';
        title = 'Push. Same scope, same date.';
        body = `You both landed on ${y}.`;
      }
      setBala(b);
      setDeck(rest);
      setRecord((r) => ({ ...r, [result]: r[result] + 1 }));
      setOutcome({ title, body });
      setPhase('done');
      // Turn Bala's face down card over.
      requestAnimationFrame(() => {
        const hole = rootRef.current?.querySelector<HTMLElement>('[data-hole] [data-flip]');
        if (hole) {
          if (reduced.current) hole.style.transform = 'rotateY(0deg)';
          else animate(hole, { rotateY: { from: 180, to: 0 }, ease: createSpring({ stiffness: 150, damping: 14 }) });
        }
      });
    },
    [],
  );

  const hit = useCallback(() => {
    if (phase !== 'player' || !deck.length) return;
    const next = [...you, deck[0]];
    const rest = deck.slice(1);
    setYou(next);
    setDeck(rest);
    if (total(next) > 21) finish(next, bala, rest);
  }, [phase, deck, you, bala, finish]);

  const stand = useCallback(() => {
    if (phase === 'player') finish(you, bala, deck);
  }, [phase, you, bala, deck, finish]);

  const drawn = phase === 'done' ? [...you] : [];
  const tally = drawn.reduce((m, id) => ({ ...m, [BY[id].call]: (m[BY[id].call] || 0) + 1 }), {} as Record<Call, number>);

  return (
    <div id="game" ref={rootRef} className="scroll-mt-24 rounded-3xl border border-line bg-panel p-4 sm:p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex max-w-xl flex-col gap-2">
            <span className="caption-3 text-gold">Scope 21 · a blackjack game about MVPs</span>
            <p className="body-6 text-muted">
              Each card is a real backlog item from Talelo or Family Wealth, worth effort points. Get close to 21 without going over. Bala deals and stands on 17. After each hand, see the call he actually made on every card you drew.
            </p>
          </div>
          <span className="caption-4 text-muted tabular-nums">
            You {record.w} · Bala {record.l} · Push {record.p}
          </span>
        </div>

        {phase === 'idle' ? (
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-24 sm:w-28" style={{ transform: `rotate(${(i - 1) * 6}deg)` }}>
                  <CardBack className="rounded-xl p-1.5" />
                </div>
              ))}
            </div>
            <button onClick={deal} className="button-md inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-ink transition-colors duration-300 ease-weighted hover:bg-[#e2c178] active:translate-y-px">
              Deal the first hand
            </button>
          </div>
        ) : (
          <>
            <Row label="Bala" score={phase === 'done' ? total(bala) : BY[bala[0]].points} hideTotal={phase !== 'done'}>
              {bala.map((id, i) => (
                <div key={id} data-gcard data-key={`b-${id}`} data-hidden={i === 1 && phase !== 'done' ? 'true' : 'false'} {...(i === 1 ? { 'data-hole': true } : {})}>
                  <GameCard id={id} hidden={i === 1 && phase !== 'done'} />
                </div>
              ))}
            </Row>
            <Row label="You" score={total(you)} bust={total(you) > 21}>
              {you.map((id) => (
                <div key={id} data-gcard data-key={`y-${id}`}>
                  <GameCard id={id} />
                </div>
              ))}
            </Row>

            <div className="flex flex-wrap gap-3">
              {phase === 'player' ? (
                <>
                  <button onClick={hit} className="button-md inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-ink transition-colors duration-300 ease-weighted hover:bg-[#e2c178] active:translate-y-px">
                    <Plus size={18} weight="bold" /> Hit: add scope
                  </button>
                  <button onClick={stand} className="button-md inline-flex items-center gap-2 rounded-lg border border-line bg-raised px-3 py-2 text-white transition-colors duration-300 ease-weighted hover:bg-line active:translate-y-px">
                    <Hand size={18} weight="bold" /> Stand: ship it
                  </button>
                </>
              ) : (
                <button onClick={deal} className="button-md inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-2 text-ink transition-colors duration-300 ease-weighted hover:bg-[#e2c178] active:translate-y-px">
                  <ArrowsCounterClockwise size={18} weight="bold" /> Deal again
                </button>
              )}
            </div>

            <AnimatePresence>
              {phase === 'done' && outcome && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-6 rounded-2xl border border-line bg-raised p-6"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="heading-5">{outcome.title}</h3>
                    <p className="body-6 text-muted">{outcome.body}</p>
                    <p className="body-5 mt-2 text-gold">
                      {(tally.Build || 0) === drawn.length
                        ? 'And every card you kept is one Bala built. That is an MVP.'
                        : `But only ${tally.Build || 0} of your ${drawn.length} cards made Bala's MVP. Effort is not value.`}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="caption-3 text-muted">
                      Bala&apos;s real calls on your cards · {tally.Build || 0} built, {tally.Park || 0} parked, {tally.Cut || 0} cut
                    </span>
                    <ul className="flex flex-col gap-3">
                      {drawn.map((id) => (
                        <li key={id} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                          <span className={cn('caption-3 w-14 shrink-0 rounded-md px-2 py-0.5 text-center', CALL_STYLE[BY[id].call])}>{BY[id].call}</span>
                          <span className="body-5 text-white">{BY[id].name}</span>
                          <span className="body-6 text-muted">{BY[id].why}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="caption-5 text-muted">Effort points are game values. The calls and reasons come from my decision logs.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, score, children, bust, hideTotal }: { label: string; score: number; children: React.ReactNode; bust?: boolean; hideTotal?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="title-3">{label}</span>
        <span className={cn('caption-4 tabular-nums', bust ? 'text-suit-red' : 'text-muted')}>
          {hideTotal ? `${score} showing` : `${score} points${bust ? ', over budget' : ''}`}
        </span>
      </div>
      <div className="flex min-h-[136px] flex-wrap gap-3 sm:min-h-[160px]">{children}</div>
    </div>
  );
}
