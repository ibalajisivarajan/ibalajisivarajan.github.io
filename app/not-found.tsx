import Link from 'next/link';
import { PlayingCard } from '@/components/PlayingCard';
import { BY_ID } from '@/data/cards';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="w-40 rotate-6">
        <PlayingCard card={{ ...BY_ID['next'], name: 'Not in this deck' }} />
      </div>
      <h1 className="heading-4">That card is not in the deck</h1>
      <p className="body-3 text-muted">The page you opened does not exist. The rest of the deck is one tap away.</p>
      <Link href="/" className="button-md rounded-lg bg-gold px-3 py-2 text-ink">Back to the table</Link>
    </main>
  );
}
