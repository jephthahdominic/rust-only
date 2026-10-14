import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import { Art } from "@/components/Art";
import { PlainCaption } from "@/components/WorkCaption";
import { projects } from "@/content";

export const metadata: Metadata = { title: "Spaces" };

export default function SpacesPage() {
  // Alternate: 2-up asymmetric row, then a full-width row.
  const rows: (typeof projects)[] = [];
  for (let i = 0; i < projects.length; ) {
    const take = rows.length % 2 === 0 ? 2 : 1;
    rows.push(projects.slice(i, i + take));
    i += take;
  }
  return (
    <>
      <Hydrated />
      <section data-theme="dark" className="relative h-svh min-h-[560px] overflow-hidden bg-ground-sink">
        <Art slot="sterling-house" alt="Sterling House, a private residence in Lagos" fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/80 via-transparent to-ground-sink/30" />
        <h1 data-reveal="lines" data-delay="0.2" className="t-h1 gutter absolute bottom-10 max-w-[14ch] text-ink-mark md:bottom-14">Authored worlds worth living in</h1>
      </section>

      <section data-theme="dark" className="flex min-h-[80svh] items-center justify-center bg-ground px-6 py-24">
        <p data-reveal="lines" className="t-h5 max-w-[30ch] text-center">Rust translates an authored world into spaces made to be inhabited.</p>
      </section>

      {/* Proportions measured from the Figma reference: 2-up equal columns (left 0.72:1, right 1.32:1,
          top-aligned), then a full-width 1.48:1 row, then 2-up again. All images are cropped (object-cover). */}
      <section data-theme="dark" aria-label="Projects" className="flex flex-col gap-12 bg-ground px-5 pb-16 pt-12 md:gap-[4.5vw] md:pb-[4vw] md:pl-[5.4%] md:pr-[4%] md:pt-[7vw]">
        {rows.map((row, r) => (
          <div key={r} className={row.length === 2 ? "grid items-start gap-x-[3.67%] gap-y-12 md:grid-cols-2" : ""}>
            {row.map((p, i) => (
              <article key={p.slug}>
                <Art
                  slot={p.image}
                  alt={p.alt}
                  ratio={row.length === 1 ? "1.48 / 1" : i === 0 ? "0.721 / 1" : "1.323 / 1"}
                  sizes={row.length === 1 ? "92vw" : "(min-width:768px) 45vw, 100vw"}
                  reveal
                />
                <PlainCaption className="mt-[18px]" label={p.name} meta={`${p.type} · ${p.city} · ${p.year}`} caps={false} />
              </article>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
