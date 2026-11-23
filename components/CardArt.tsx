/* Playing card artwork drawn in SVG on a 250 x 350 face. */
import { useId } from 'react';

export type SuitKey = 'S' | 'H' | 'D' | 'C' | 'J';

export const INK = '#1b1a16';
export const RED = '#b8352a';
export const GOLD = '#c79a3f';
export const PAPER = '#f6f1e3';

export function suitColor(s: SuitKey) {
  return s === 'H' || s === 'D' ? RED : INK;
}

/** Suit glyph drawn in a 100 x 100 box, centered on (cx, cy), scaled to `size`. */
export function Suit({ s, cx, cy, size, flip, fill }: { s: SuitKey; cx: number; cy: number; size: number; flip?: boolean; fill?: string }) {
  const k = size / 100;
  const color = fill ?? suitColor(s);
  const t = `translate(${cx} ${cy}) ${flip ? 'rotate(180)' : ''} scale(${k}) translate(-50 -50)`;
  return (
    <g transform={t} fill={color}>
      {s === 'H' && <path d="M50 90 C22 68 4 50 4 31 C4 16 15 6 29 6 C39 6 46 12 50 21 C54 12 61 6 71 6 C85 6 96 16 96 31 C96 50 78 68 50 90 Z" />}
      {s === 'D' && <path d="M50 3 L87 50 L50 97 L13 50 Z" />}
      {s === 'S' && (
        <path d="M50 4 C61 22 94 40 94 62 C94 76 84 84 72 84 C64 84 57 80 53 74 C55 84 60 92 69 97 L31 97 C40 92 45 84 47 74 C43 80 36 84 28 84 C16 84 6 76 6 62 C6 40 39 22 50 4 Z" />
      )}
      {s === 'C' && (
        <>
          <circle cx="50" cy="27" r="21" />
          <circle cx="27" cy="58" r="21" />
          <circle cx="73" cy="58" r="21" />
          <circle cx="50" cy="52" r="12" />
          <path d="M45 58 C45 78 39 90 30 97 L70 97 C61 90 55 78 55 58 Z" />
        </>
      )}
      {s === 'J' && <path d="M50 2 L61 37 L98 38 L68 60 L79 96 L50 74 L21 96 L32 60 L2 38 L39 37 Z" />}
    </g>
  );
}

/** Standard pip layouts on the 250 x 350 face, inside the art area above the name ribbon. */
const L = 80, C = 125, R = 170;
const T = 66, B = 244, M = 155;
const Q1 = 125, Q3 = 185;
export const PIPS: Record<number, [number, number][]> = {
  2: [[C, T], [C, B]],
  3: [[C, T], [C, M], [C, B]],
  4: [[L, T], [R, T], [L, B], [R, B]],
  5: [[L, T], [R, T], [C, M], [L, B], [R, B]],
  6: [[L, T], [R, T], [L, M], [R, M], [L, B], [R, B]],
  7: [[L, T], [R, T], [C, 110], [L, M], [R, M], [L, B], [R, B]],
  8: [[L, T], [R, T], [C, 110], [L, M], [R, M], [C, 200], [L, B], [R, B]],
  9: [[L, T], [R, T], [L, Q1], [R, Q1], [C, M], [L, Q3], [R, Q3], [L, B], [R, B]],
  10: [[L, T], [R, T], [C, 96], [L, Q1], [R, Q1], [L, Q3], [R, Q3], [C, 214], [L, B], [R, B]],
};

function Paper({ id }: { id: string }) {
  return (
    <>
      <defs>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.25  0 0 0 0.09 0" />
        </filter>
      </defs>
      <rect width="250" height="350" fill={PAPER} />
      <rect width="250" height="350" filter={`url(#${id}-grain)`} />
    </>
  );
}

function Frame({ color }: { color: string }) {
  return (
    <g fill="none">
      <rect x="10" y="10" width="230" height="330" rx="10" stroke={color} strokeOpacity="0.35" strokeWidth="1.5" />
      <rect x="15" y="15" width="220" height="320" rx="7" stroke={color} strokeOpacity="0.18" strokeWidth="1" />
    </g>
  );
}

function Index({ rank, s, color }: { rank: string; s: SuitKey; color: string }) {
  const one = (
    <g>
      <text x="30" y="47" textAnchor="middle" fontSize={rank.length > 1 ? 26 : 30} fontWeight="700" fill={color} style={{ letterSpacing: rank.length > 1 ? '-0.06em' : 0 }}>
        {rank}
      </text>
      <Suit s={s} cx={30} cy={66} size={18} />
    </g>
  );
  return (
    <>
      {one}
      <g transform="rotate(180 125 175)">{one}</g>
    </>
  );
}

function wrap(title: string, max = 17): string[] {
  const words = title.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > 2) return [lines[0], lines.slice(1).join(' ').slice(0, max - 1) + '…'];
  return lines;
}

/** Notched banner carrying the card's title. */
function Ribbon({ color, title }: { color: string; title: string }) {
  const lines = wrap(title);
  const y0 = lines.length === 1 ? 291 : 283;
  return (
    <g>
      <path d="M40 262 L204 262 L194 285 L204 308 L40 308 L50 285 Z" fill="#efe6cf" stroke={color} strokeOpacity="0.55" strokeWidth="1.2" />
      <path d="M54 267 L190 267 M54 303 L190 303" stroke={color} strokeOpacity="0.25" strokeWidth="0.8" />
      {lines.map((l, i) => (
        <text key={i} x="122" y={y0 + i * 17} textAnchor="middle" fontSize="15" fontWeight="600" fill={INK} style={{ letterSpacing: '0.01em' }}>
          {l}
        </text>
      ))}
    </g>
  );
}

function Flourish({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const leaf = (a: number) => (
    <g key={a} transform={`rotate(${a} ${cx} ${cy})`}>
      <path d={`M${cx} ${cy - r - 4} C${cx - 9} ${cy - r - 14} ${cx - 4} ${cy - r - 24} ${cx} ${cy - r - 28} C${cx + 4} ${cy - r - 24} ${cx + 9} ${cy - r - 14} ${cx} ${cy - r - 4} Z`} fill={color} opacity="0.85" />
      <circle cx={cx} cy={cy - r - 34} r="2.2" fill={color} />
    </g>
  );
  return <g>{[0, 90, 180, 270].map(leaf)}</g>;
}

function AceArt({ s, special }: { s: SuitKey; special?: boolean }) {
  const color = suitColor(s);
  const cx = 125, cy = 150;
  return (
    <g>
      {special && (
        <g stroke={GOLD} strokeWidth="1" opacity="0.7">
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 36;
            return <line key={i} x1={cx + Math.cos(a) * 70} y1={cy + Math.sin(a) * 70} x2={cx + Math.cos(a) * (i % 2 ? 80 : 88)} y2={cy + Math.sin(a) * (i % 2 ? 80 : 88)} />;
          })}
        </g>
      )}
      <circle cx={cx} cy={cy} r="64" fill="none" stroke={special ? GOLD : color} strokeOpacity={special ? 1 : 0.45} strokeWidth={special ? 2.5 : 1.5} />
      <circle cx={cx} cy={cy} r="58" fill="none" stroke={special ? GOLD : color} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1.5 4" />
      <Flourish cx={cx} cy={cy} r={64} color={special ? GOLD : color} />
      <Suit s={s} cx={cx} cy={cy} size={special ? 84 : 78} />
      {special && <Suit s={s} cx={cx} cy={cy + 2} size={34} fill={GOLD} />}
    </g>
  );
}

function CourtArt({ rank, s, id }: { rank: string; s: SuitKey; id: string }) {
  const color = suitColor(s);
  const x0 = 48, y0 = 58, w = 154, h = 196;
  const half = (
    <g>
      {/* Emblem: crown for King, tiara for Queen, plume for Jack */}
      {rank === 'K' && (
        <path d="M92 116 L96 86 L110 102 L125 80 L140 102 L154 86 L158 116 Z" fill={GOLD} stroke={INK} strokeWidth="1.2" />
      )}
      {rank === 'Q' && (
        <g fill={GOLD} stroke={INK} strokeWidth="1.2">
          <path d="M94 116 C98 98 110 92 125 92 C140 92 152 98 156 116 Z" />
          <circle cx="125" cy="86" r="6" />
          <circle cx="104" cy="96" r="4" />
          <circle cx="146" cy="96" r="4" />
        </g>
      )}
      {rank === 'J' && (
        <g stroke={INK} strokeWidth="1.2">
          <path d="M100 116 L150 116 L146 104 L104 104 Z" fill={GOLD} />
          <path d="M140 104 C150 88 146 72 130 66 C138 78 134 92 124 104 Z" fill={color} />
        </g>
      )}
      <rect x="96" y="120" width="58" height="6" fill={color} opacity="0.85" />
      <Suit s={s} cx={125} cy={134} size={26} />
      <Suit s={s} cx={70} cy={80} size={16} />
    </g>
  );
  return (
    <g>
      <defs>
        <clipPath id={`${id}-panel`}>
          <rect x={x0} y={y0} width={w} height={h} rx="4" />
        </clipPath>
        <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1" fill={color} opacity="0.18" />
        </pattern>
      </defs>
      <rect x={x0} y={y0} width={w} height={h} rx="4" fill="#efe6cf" />
      <rect x={x0} y={y0} width={w} height={h} rx="4" fill={`url(#${id}-dots)`} />
      <g clipPath={`url(#${id}-panel)`}>
        {half}
        <g transform="rotate(180 125 156)">{half}</g>
        <line x1={x0} y1={y0 + h} x2={x0 + w} y2={y0} stroke={GOLD} strokeWidth="1.2" />
      </g>
      <rect x={x0} y={y0} width={w} height={h} rx="4" fill="none" stroke={GOLD} strokeWidth="2" />
      <rect x={x0 + 4} y={y0 + 4} width={w - 8} height={h - 8} rx="2" fill="none" stroke={color} strokeOpacity="0.4" strokeWidth="0.8" />
    </g>
  );
}

function JokerArt() {
  const cx = 125, cy = 152;
  return (
    <g>
      <g stroke={GOLD} strokeWidth="1" opacity="0.6">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          return <line key={i} x1={cx + Math.cos(a) * 30} y1={cy + Math.sin(a) * 30} x2={cx + Math.cos(a) * 92} y2={cy + Math.sin(a) * 92} />;
        })}
      </g>
      {/* Jester cap: three points with bells */}
      <path d="M78 170 C80 130 70 112 58 100 C82 104 98 120 104 140 C108 110 116 92 125 80 C134 92 142 110 146 140 C152 120 168 104 192 100 C180 112 170 130 172 170 Z" fill={RED} stroke={INK} strokeWidth="1.4" />
      <path d="M104 140 C110 150 140 150 146 140 L146 170 L104 170 Z" fill={INK} opacity="0.85" />
      <circle cx="58" cy="100" r="7" fill={GOLD} stroke={INK} strokeWidth="1.2" />
      <circle cx="125" cy="78" r="7" fill={GOLD} stroke={INK} strokeWidth="1.2" />
      <circle cx="192" cy="100" r="7" fill={GOLD} stroke={INK} strokeWidth="1.2" />
      <rect x="74" y="170" width="102" height="14" rx="3" fill={GOLD} stroke={INK} strokeWidth="1.2" />
      <Suit s="J" cx={125} cy={214} size={30} fill={GOLD} />
    </g>
  );
}

function JokerIndex() {
  const col = (
    <g>
      {'JOKER'.split('').map((ch, i) => (
        <text key={i} x="30" y={40 + i * 19} textAnchor="middle" fontSize="17" fontWeight="700" fill={RED}>
          {ch}
        </text>
      ))}
    </g>
  );
  return (
    <>
      {col}
      <g transform="rotate(180 125 175)">{col}</g>
    </>
  );
}

/** Full card face. `rank` is A, K, Q, J, a number 2 to 10, or ★ for a Joker. */
export function CardFaceArt({ rank, s, special, title }: { rank: string; s: SuitKey; special?: boolean; title?: string }) {
  const id = useId().replace(/:/g, '');
  const color = suitColor(s);
  const n = Number(rank);
  return (
    <svg viewBox="0 0 250 350" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Paper id={id} />
      <Frame color={s === 'J' ? GOLD : color} />
      {s === 'J' ? <JokerIndex /> : <Index rank={rank} s={s} color={color} />}
      {s === 'J' && <JokerArt />}
      {rank === 'A' && <AceArt s={s} special={special} />}
      {['K', 'Q', 'J'].includes(rank) && s !== 'J' && <CourtArt rank={rank} s={s} id={id} />}
      {n >= 2 &&
        n <= 10 &&
        PIPS[n].map(([x, y], i) => {
          // Without a title ribbon, the pips spread over the full face like a standard card.
          const yy = title ? y : 66 + ((y - 66) * 218) / 178;
          return <Suit key={i} s={s} cx={x} cy={yy} size={n >= 9 ? 30 : 34} flip={y > M} />;
        })}
      {title && <Ribbon color={s === 'J' ? GOLD : color} title={title} />}
    </svg>
  );
}

/** Ornate card back: gold lattice, double border and a monogram medallion. */
export function CardBackArt() {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 250 350" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`${id}-lattice`} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="20" height="20" fill="#1c1b17" />
          <path d="M0 10 H20 M10 0 V20" stroke={GOLD} strokeOpacity="0.28" strokeWidth="0.8" />
          <circle cx="10" cy="10" r="1.6" fill={GOLD} fillOpacity="0.55" />
        </pattern>
      </defs>
      <rect width="250" height="350" fill={PAPER} />
      <rect x="10" y="10" width="230" height="330" rx="10" fill={`url(#${id}-lattice)`} />
      <rect x="10" y="10" width="230" height="330" rx="10" fill="none" stroke={GOLD} strokeWidth="2" />
      <rect x="18" y="18" width="214" height="314" rx="6" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1" />
      {[
        [30, 30],
        [220, 30],
        [30, 320],
        [220, 320],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7} L${x - 7} ${y} Z`} fill={GOLD} />
      ))}
      <g>
        {Array.from({ length: 14 }).map((_, i) => {
          const a = Math.PI * 0.62 + (i / 13) * Math.PI * 0.76;
          return (
            <g key={i}>
              <ellipse cx={125 + Math.cos(a) * 52} cy={175 + Math.sin(a) * 52} rx="3" ry="6.5" fill={GOLD} opacity="0.8" transform={`rotate(${(a * 180) / Math.PI + 90} ${125 + Math.cos(a) * 52} ${175 + Math.sin(a) * 52})`} />
              <ellipse cx={125 - Math.cos(a) * 52} cy={175 + Math.sin(a) * 52} rx="3" ry="6.5" fill={GOLD} opacity="0.8" transform={`rotate(${-(a * 180) / Math.PI - 90} ${125 - Math.cos(a) * 52} ${175 + Math.sin(a) * 52})`} />
            </g>
          );
        })}
      </g>
      <circle cx="125" cy="175" r="42" fill="#1c1b17" stroke={GOLD} strokeWidth="2" />
      <circle cx="125" cy="175" r="36" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
      <text x="125" y="185" textAnchor="middle" fontSize="28" fontWeight="700" fill={GOLD} style={{ letterSpacing: '0.04em' }}>
        BS
      </text>
      <Suit s="S" cx={125} cy={110} size={20} fill={GOLD} />
      <Suit s="S" cx={125} cy={240} size={20} fill={GOLD} flip />
    </svg>
  );
}
