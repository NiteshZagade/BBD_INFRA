"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedStat({
  prefix = "",
  value,
  suffix = "",
  decimals = 0,
  duration = 1400,
  delayMs = 0,
  className,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delayMs?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          let frame: number;
          const run = () => {
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - t0) / duration, 1);
              setDisplay(parseFloat((p * value).toFixed(decimals)));
              if (p < 1) frame = requestAnimationFrame(tick);
              else setDisplay(value);
            };
            frame = requestAnimationFrame(tick);
          };
          if (delayMs > 0) setTimeout(run, delayMs);
          else run();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration, delayMs]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
