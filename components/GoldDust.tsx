'use client';

import { useEffect, useRef } from 'react';

/** Sparse gold dust drifting upward. Canvas, capped count, pauses off screen. */
export function GoldDust({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.6,
      v: 0.00012 + Math.random() * 0.00035, drift: (Math.random() - 0.5) * 0.0002,
      a: 0.15 + Math.random() * 0.55, tw: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.v * 16; d.x += d.drift * 16;
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
        const alpha = d.a * (0.6 + 0.4 * Math.sin(t / 700 + d.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(212,175,90,${alpha})`;
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); io.observe(canvas);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [count]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
