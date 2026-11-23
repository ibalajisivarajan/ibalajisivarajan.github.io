'use client';

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog';
import { Tilt } from '@/components/ui/tilt';
import { PlayingCard } from '@/components/PlayingCard';
import { Card, SUITS } from '@/data/cards';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from '@phosphor-icons/react';

const spring = { type: 'spring' as const, bounce: 0.05, duration: 0.5 };

function Text({ children }: { children: string }) {
  const parts = children.split(/(\{\{[^}]+\}\})/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('{{') ? (
          <span key={i} className="ph">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function CaseCard({ card, className }: { card: Card; className?: string }) {
  const s = SUITS[card.suit];
  return (
    <MorphingDialog transition={spring}>
      <MorphingDialogTrigger
        ariaLabel={`${card.rank} of ${s.name}: ${card.name}. Open the case study`}
        className={cn('block w-full rounded-2xl text-left', className)}
      >
        <Tilt rotationFactor={8} isRevese className="transition-transform duration-300 ease-weighted hover:-translate-y-1 active:scale-[0.98]">
          <PlayingCard card={card} />
        </Tilt>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative z-50 mx-4 max-h-[calc(100dvh-48px)] w-full max-w-xl overflow-y-auto rounded-3xl bg-ivory p-2 text-ink">
          <div className="flex flex-col gap-6 rounded-2xl border border-ivory-line p-6">
            <div className="flex flex-col gap-2 pr-12">
              <span className={cn('caption-3', s.red ? 'text-suit-red' : 'text-gold-ink')}>
                {card.rank} {s.glyph} · {s.name}
              </span>
              <MorphingDialogTitle className="heading-4 text-ink">{card.name}</MorphingDialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                <span className="body-5 text-ink/70">{card.role}</span>
                <span className="caption-4 rounded-full bg-panel px-2 py-0.5 text-ivory">
                  <Text>{card.status}</Text>
                </span>
              </div>
            </div>
            <p className="body-3">
              <Text>{card.what}</Text>
            </p>
            {card.pending ? (
              <div className="flex flex-col gap-2 rounded-xl border border-dashed border-gold p-4">
                <span className="caption-3 text-gold-ink">Outcomes being confirmed</span>
                <p className="body-6 text-ink/70">
                  I only show numbers I can explain in an interview, including how they were measured. This card fills in once they are confirmed.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {card.calls.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="caption-3 text-ink/60">My calls</span>
                    <ul className="flex flex-col gap-2">
                      {card.calls.map((c) => (
                        <li key={c} className="body-6 border-l-0 text-ink">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {card.proof.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="caption-3 text-ink/60">Evidence</span>
                    <ul className="flex flex-col gap-2">
                      {card.proof.map((c) => (
                        <li key={c} className="body-6 text-ink">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {card.link && (
              <a
                href={card.link.href}
                className="button-md inline-flex items-center gap-2 self-start rounded-lg bg-ink px-3 py-2 text-ivory transition-colors duration-300 ease-weighted hover:bg-raised active:translate-y-px"
              >
                {card.link.label}
                <ArrowUpRight size={16} weight="bold" />
              </a>
            )}
          </div>
          <MorphingDialogClose className="right-6 top-6 grid size-8 place-items-center rounded-lg text-ink hover:bg-ivory-line" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
