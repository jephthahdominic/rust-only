"use client";
import { useRef, useState } from "react";
import { Art } from "./Art";
import type { Slot } from "@/content/images";

/** Scroll-snap carousel: swipeable natively on touch, arrows + dots on desktop. */
export function Carousel({ items }: { items: { slot: Slot; alt: string }[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [i, setI] = useState(0);
  const go = (n: number) => {
    const t = track.current;
    if (!t) return;
    const idx = Math.max(0, Math.min(items.length - 1, n));
    t.scrollTo({ left: idx * t.clientWidth, behavior: "smooth" });
  };
  const arrow = "t-label-lg grid h-10 w-10 place-items-center border border-rule text-ink hover:bg-ink hover:text-ground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";
  return (
    <div role="region" aria-roledescription="carousel" aria-label="Artwork images" className="flex flex-col gap-4">
      <ul
        ref={track}
        onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, n) => (
          <li key={n} aria-label={`${n + 1} of ${items.length}`} className="w-full shrink-0 snap-center">
            <Art slot={it.slot} alt={it.alt} sizes="(min-width:768px) 50vw, 100vw" priority={n === 0} />
          </li>
        ))}
      </ul>
      {items.length > 1 && <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className={arrow} onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous image">←</button>
          <button className={arrow} onClick={() => go(i + 1)} disabled={i === items.length - 1} aria-label="Next image">→</button>
        </div>
        <p className="t-caption-xs caps text-ink-dim md:hidden">Swipe to see more</p>
        <div className="flex gap-2" aria-hidden>
          {items.map((_, n) => (
            <span key={n} className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${n === i ? "bg-ink" : "bg-rule"}`} />
          ))}
        </div>
      </div>}
    </div>
  );
}
