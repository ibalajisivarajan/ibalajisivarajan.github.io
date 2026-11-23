import { CaretDown, CheckCircle, Cards, Eye, Scales, Stack, Shuffle, HandTap, ArrowsClockwise, SealCheck } from '@phosphor-icons/react/dist/ssr';
import { DeckTable } from '@/components/DeckTable';
import { DealButton } from '@/components/DealButton';
import { Tagline } from '@/components/Tagline';
import { Reveal } from '@/components/Reveal';
import { CaseCard } from '@/components/CaseCard';
import { HeroFan } from '@/components/HeroFan';
import { CARDS, SUITS, Suit } from '@/data/cards';

const BENEFITS = [
  { icon: Eye, title: 'See the call, not just the output', body: 'Every card names the decision I made and the reason behind it.' },
  { icon: SealCheck, title: 'Check the evidence', body: 'Tests, CI, validation gates and live links sit beside each claim.' },
  { icon: Stack, title: 'Range in one hand', body: 'Products, AI systems, research and fifteen years of enterprise programs.' },
  { icon: Scales, title: 'Numbers you can trust', body: 'Every metric carries its caveat. Anything unconfirmed stays off the card.' },
];

const STEPS = [
  { icon: Shuffle, title: 'Shuffle', body: 'Mix the deck of 21 cards. Four suits, two Jokers.' },
  { icon: Cards, title: 'Deal five', body: 'Get a hand. Aces are the most complex work in each suit.' },
  { icon: HandTap, title: 'Flip to read', body: 'Tap a card and it opens into the full case study.' },
];

const FAQ = [
  { q: 'Which roles are you looking for?', a: 'AI and technical product manager roles: platforms, developer tools and internal AI tools. Remote Canada and Vancouver first.' },
  { q: 'What did AI agents do, and what did you do?', a: 'Agents wrote most of the code. I set the scope, the constraints and the milestones, reviewed the work and accepted it on the live site. The table below shows who played which role on Family Wealth.' },
  { q: 'Can I see the code?', a: 'Daily Pulse v2 and my program management toolkits are public on GitHub. Talelo is a live startup and stays private. I am happy to walk through any card on a call.' },
  { q: 'Why do some cards have no numbers?', a: 'I only show numbers I can explain in an interview, including how they were measured. Enterprise outcomes appear once I have confirmed them.' },
  { q: 'Why is the research card under review?', a: 'The study is in peer review, so its findings and code stay private until the decision. The method is on the card.' },
  { q: 'Where are you based?', a: 'Vancouver, BC. {{work authorization line}}' },
];

const ROLES = [
  ['Founder', 'Bala', 'Vision, money and final calls'],
  ['Product manager', 'Bala', 'What gets built and why, deciding with Claude'],
  ['Program manager', 'Bala, then Boost', 'Coordination and verification handed to an agent once connectors were live'],
  ['Design', 'Bala and Claude', 'Prototype frozen before any code'],
  ['Engineering', 'Claude Code, Codex', 'First milestones, then later batches and fixes'],
  ['QA', 'Codex, Boost, Bala', 'Tests in build runs, CI gating, acceptance on the live site'],
  ['DevOps', 'Bala, Boost', 'Accounts and deploy pipeline; migrations and deploy checks'],
];

function Placeholder({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{\{[^}]+\}\})/g).map((p, i) => (p.startsWith('{{') ? <span key={i} className="ph">{p}</span> : <span key={i}>{p}</span>))}
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="flex max-w-[680px] flex-col gap-3">
      <span className="caption-3 text-gold">{eyebrow}</span>
      <h2 className="heading-3">{title}</h2>
      {sub && <p className="body-3 text-muted">{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="button-sm sr-only rounded-lg bg-ivory px-3 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">
        Skip to content
      </a>

      <nav aria-label="Main" className="fixed inset-x-0 top-4 z-30 flex justify-center px-4">
        <div className="flex items-center gap-4 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur-xl sm:gap-6">
          <span className="button-sm text-white"><span className="sm:hidden">Bala</span><span className="hidden sm:inline">Balaji Sivarajan</span></span>
          <div className="flex items-center gap-4">
            <a href="#table" aria-current="true" className="title-4 text-white">Deal</a>
            <a href="#deck" className="title-4 text-muted transition-colors duration-300 ease-weighted hover:text-white">Deck</a>
            <a href="#faq" className="title-4 text-muted transition-colors duration-300 ease-weighted hover:text-white">FAQ</a>
          </div>
        </div>
      </nav>

      <main id="main" className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-16 pt-32 sm:gap-32">
        {/* Hero */}
        <section className="flex flex-col gap-12">
          <div className="flex items-center justify-between gap-12">
          <div className="flex flex-col gap-6">
            <span className="caption-3 text-gold">Product builder · Vancouver, BC</span>
            <h1 className="heading-1 hero-gradient max-w-[680px]">
              Fifteen years of shipping software,
              <br />
              dealt as 21 cards.
            </h1>
            <p className="title-2 max-w-[680px] text-muted">
              I am Bala. Every card is a product, AI system or program I ran, with the call I made and the evidence behind it.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <DealButton />
              <div className="flex flex-wrap gap-4 text-muted">
                {['40 repos', '15 years', '4 suits', '21 cards'].map((p) => (
                  <span key={p} className="body-5">{p}</span>
                ))}
              </div>
            </div>
          </div>
          <HeroFan />
          </div>
          <DeckTable />
        </section>

        {/* Tagline reveal */}
        <section className="py-16">
          <Tagline lines={['Every card is something I shipped,', 'ran or stopped on purpose.', 'The Aces are where I went deepest.']} />
        </section>

        {/* Problem to solution */}
        <Reveal>
          <section className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-3xl border border-line bg-panel p-8">
              <span className="caption-3 text-muted">The problem</span>
              <h2 className="heading-4">A resume says what I worked on. It rarely shows who made the call.</h2>
              <p className="body-3 text-muted">Titles and bullets tell you a program shipped. They do not show the trade offs, what got cut, or how the result was measured.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-3xl border border-gold/40 bg-panel p-8">
              <span className="caption-3 text-gold">This deck</span>
              <h2 className="heading-4">Each card names the decision, the reason and the proof.</h2>
              <p className="body-3 text-muted">Flip any card to read the case study: my role, my calls, the evidence you can check, and the caveats I would mention in an interview.</p>
            </div>
          </section>
        </Reveal>

        {/* Benefits */}
        <Reveal>
          <section className="flex flex-col gap-12">
            <SectionHead eyebrow="What you get" title="Read a hand in two minutes, not a resume in ten" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
                  <span className="grid size-10 place-items-center rounded-lg bg-raised text-gold">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <h3 className="title-2">{title}</h3>
                  <p className="body-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* How it works */}
        <Reveal>
          <section className="flex flex-col gap-12">
            <SectionHead eyebrow="How it works" title="Three moves, no rules to learn" />
            <ol className="grid gap-4 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-lg bg-raised text-gold">
                      <Icon size={20} weight="duotone" />
                    </span>
                    <span className="caption-3 text-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="title-1">{title}</h3>
                  <p className="body-6 text-muted">{body}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* Full deck */}
        <section id="deck" className="flex scroll-mt-24 flex-col gap-12">
          <Reveal>
            <SectionHead eyebrow="The full deck" title="All 21 cards, face up" sub="For anyone who would rather read than play. Tap any card for its case study." />
          </Reveal>
          {(['S', 'H', 'D', 'C', 'J'] as Suit[]).map((s) => {
            const list = CARDS.filter((c) => c.suit === s);
            return (
              <Reveal key={s}>
                <div className="flex flex-col gap-4">
                  <h3 className="title-1 flex items-baseline gap-2">
                    <span className={SUITS[s].red ? 'text-suit-red' : 'text-white'}>{SUITS[s].glyph}</span>
                    {SUITS[s].name}
                    <span className="caption-5 text-muted">{list.length} cards</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                    {list.map((c) => (
                      <CaseCard key={c.id} card={c} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>

        {/* Roles */}
        <Reveal>
          <section className="flex flex-col gap-12">
            <SectionHead eyebrow="How I build now" title="One person, a full product team" sub="Who played each role on Family Wealth, the Ace of Spades." />
            <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="border-b border-line">
                    {['Role', 'Played by', 'What that meant'].map((h) => (
                      <th key={h} className="caption-3 px-6 py-4 text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map(([role, who, what]) => (
                    <tr key={role} className="border-b border-line last:border-0">
                      <td className="title-4 px-6 py-4 text-white">{role}</td>
                      <td className="body-6 px-6 py-4">
                        <span className={who.startsWith('Bala') ? 'rounded-md bg-ivory px-2 py-0.5 text-ink' : 'rounded-md bg-raised px-2 py-0.5 text-gold'}>{who}</span>
                      </td>
                      <td className="body-6 px-6 py-4 text-muted">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section id="faq" className="flex scroll-mt-24 flex-col gap-12">
            <SectionHead eyebrow="Questions" title="What people ask me" />
            <div className="flex max-w-3xl flex-col gap-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group rounded-2xl border border-line bg-panel p-6">
                  <summary className="title-3 flex cursor-pointer list-none items-center justify-between gap-4">
                    {q}
                    <CaretDown size={16} className="shrink-0 text-muted transition-transform duration-300 ease-weighted group-open:rotate-180" />
                  </summary>
                  <p className="body-6 mt-3 text-muted">
                    <Placeholder text={a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Risk reversal + final CTA */}
        <Reveal>
          <section className="flex flex-col items-start gap-8 rounded-3xl border border-line bg-panel p-8 sm:p-12">
            <div className="flex items-center gap-2 text-gold">
              <CheckCircle size={20} weight="fill" />
              <span className="body-5">Every number has a source and a caveat. Unconfirmed numbers stay off.</span>
            </div>
            <h2 className="heading-3 max-w-[680px]">One more hand?</h2>
            <DealButton />
          </section>
        </Reveal>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-8 text-muted">
        <span className="body-6">Balaji Sivarajan · Vancouver, BC</span>
        <div className="body-6 flex flex-wrap items-center gap-4">
          <a className="transition-colors duration-300 ease-weighted hover:text-white" href="https://www.linkedin.com/in/balaji-sivarajan-08-08/">LinkedIn</a>
          <a className="transition-colors duration-300 ease-weighted hover:text-white" href="https://github.com/ibalajisivarajan">GitHub</a>
          <span className="ph">{'{{email}}'}</span>
          <span className="inline-flex items-center gap-1"><ArrowsClockwise size={14} /> No cookies, no tracking</span>
        </div>
      </footer>
    </>
  );
}
