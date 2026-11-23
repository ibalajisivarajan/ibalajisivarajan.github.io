import { PlayingCard } from '@/components/PlayingCard';
import { BY_ID } from '@/data/cards';

const FAN = [
  { id: 'doomscroll', r: '-rotate-[14deg] -translate-x-24 translate-y-6 group-hover:-translate-x-32' },
  { id: 'war-beyond-heaven', r: 'rotate-[14deg] translate-x-24 translate-y-6 group-hover:translate-x-32' },
  { id: 'family-wealth', r: 'rotate-0 -translate-y-2 group-hover:-translate-y-6' },
];

export function HeroFan() {
  return (
    <div aria-hidden="true" className="group relative hidden h-[360px] w-[420px] shrink-0 lg:block">
      {FAN.map(({ id, r }) => (
        <div
          key={id}
          className={`absolute left-1/2 top-4 w-48 -ml-24 origin-bottom transition-transform duration-500 ease-weighted ${r}`}
        >
          <PlayingCard card={BY_ID[id]} />
        </div>
      ))}
    </div>
  );
}
