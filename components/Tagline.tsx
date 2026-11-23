'use client';

import { useEffect, useRef } from 'react';

export function Tagline({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const words = Array.from(ref.current?.querySelectorAll<HTMLElement>('.tagline-word') ?? []);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('is-on'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-on')),
      { rootMargin: '0px 0px -38% 0px', threshold: 1 },
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);
  return (
    <h2 ref={ref} className="heading-2 max-w-[680px]">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((w, i) => (
            <span key={i} className="tagline-word">
              {w}{' '}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
