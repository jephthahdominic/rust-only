import Link from "next/link";
import { Art } from "./Art";
import { marquee } from "@/content/site";

export function Marquee() {
  const tiles = (hidden: boolean) =>
    marquee.map((m, i) => (
      <li key={`${hidden}-${i}`} aria-hidden={hidden || undefined}>
        <Link href="/volume/the-gathering" tabIndex={hidden ? -1 : 0} className="marquee-tile block h-[220px] w-[170px] md:h-[340px] md:w-[260px]">
          <Art slot={m.slot} alt={hidden ? "" : m.alt} fill sizes="260px" fit={m.fit} />
        </Link>
      </li>
    ));
  return (
    <section aria-label="Selected works" className="border-y border-rule-soft py-8 md:py-12">
      <p className="t-caption-xs caps gutter mb-6 text-ink-dim">Hover to see</p>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex gap-3 md:gap-4">
          {tiles(false)}
          {tiles(true)}
        </ul>
      </div>
    </section>
  );
}
