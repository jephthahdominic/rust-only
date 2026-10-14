"use client";
import { Art } from "./Art";
import { CurationFrame, VolumeSet } from "./CurationFrame";
import { useScrollScene } from "@/lib/useScrollScene";

const cardBase = "max-md:w-[62%] md:absolute";

/** Statement 1 — pinned. Three cards arrive from off-screen and settle around the text. */
export function StatementOne() {
  const ref = useScrollScene<HTMLElement>(({ root, gsap, desktop }) => {
    const q = gsap.utils.selector(root);
    const [art, space, object] = q("[data-card]");
    const text = q("[data-statement]")[0];

    if (desktop) {
      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 1 } })
        .from(art, { xPercent: -260, opacity: 0, duration: 1 }, 0)
        .from(space, { xPercent: 220, yPercent: -140, opacity: 0, duration: 1 }, 0.25)
        .from(object, { xPercent: 160, yPercent: 220, opacity: 0, duration: 1 }, 0.5)
        .from(text, { opacity: 0.4, duration: 1 }, 0);
    } else {
      // mobile: cards travel up past the pinned text (AT REST → TRAVELLING)
      gsap.set(root, { height: "100svh", overflow: "hidden" });
      gsap.set(q("[data-cards]"), { position: "absolute", inset: 0 });
      const lefts = ["8%", "30%", "14%"];
      [art, space, object].forEach((c, i) => gsap.set(c, { position: "absolute", top: "100%", left: lefts[i], marginTop: i * 40 }));
      gsap.to([art, space, object], {
        y: () => -(window.innerHeight + 520), stagger: 0.18, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "+=260%", pin: true, scrub: 1 },
      });
    }
  });

  return (
    <section ref={ref} data-theme="dark" aria-labelledby="st1" className="relative bg-ground md:h-screen md:min-h-[720px] md:overflow-hidden">
      <div data-statement className="flex min-h-[70svh] items-center justify-center px-6 md:absolute md:inset-0 md:min-h-0">
        <h2 id="st1" data-reveal="lines" className="t-h5 max-w-[26ch] text-center md:max-w-[21ch]">
          Rust Only is an authored house that brings together one-of-one works of art.
        </h2>
      </div>
      <div data-cards className="gutter flex flex-col gap-16 pb-24 md:contents">
        <figure data-card className={`${cardBase} md:left-[7%] md:top-[13%] md:w-[22vw]`}>
          <Art slot="dance-of-the-greenshadows-onobrakpeya-2008" alt="Dance of the Greenshadows by Bruce Onobrakpeya" sizes="(min-width:768px) 22vw, 62vw" />
          <figcaption className="mt-3 flex flex-col gap-1">
            <span className="t-label-sm caps text-accent">01 — Art</span>
            <span className="t-caption-xs caps text-ink-dim">Ancestral Gaze · Onuoha · 2025 · Volume 01</span>
          </figcaption>
        </figure>
        <figure data-card className={`${cardBase} max-md:self-end md:right-[8%] md:top-[9%] md:w-[28vw]`}>
          <Art slot="residential" alt="A residential interior with an empty frame" sizes="(min-width:768px) 28vw, 62vw" />
          <figcaption className="mt-3"><span className="t-label-sm caps text-accent">02 — Space</span></figcaption>
        </figure>
        <figure data-card className={`${cardBase} md:bottom-[7%] md:right-[12%] md:w-[16vw]`}>
          <Art slot="object-001" alt="The Gathering, Object 001, a vase" fit="contain" sizes="(min-width:768px) 17vw, 62vw" />
          <figcaption className="mt-3 flex flex-col gap-1">
            <span className="t-label-sm caps text-accent">03 — Object</span>
            <span className="t-caption-xs caps text-ink-dim">The Gathering · Object 001 · Volume 01</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Statement 2 — pinned. Dashed placeholders resolve into curation frames. */
export function StatementTwo() {
  const ref = useScrollScene<HTMLElement>(({ root, gsap, desktop }) => {
    const q = gsap.utils.selector(root);
    const frames = q("[data-frame]");
    const dashes = q("[data-dash]");
    gsap.set(dashes, { opacity: 1 });
    gsap.set(frames, { clipPath: "inset(100% 0 0 0)" });
    const resolve = (tl: gsap.core.Timeline) =>
      tl.to(frames, { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.out", stagger: 0.25 })
        .to(dashes, { opacity: 0, duration: 0.6, stagger: 0.25 }, 0.5);
    if (desktop) {
      resolve(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=120%", pin: true, scrub: 1 } }));
    } else {
      resolve(gsap.timeline({ scrollTrigger: { trigger: q("[data-frames]")[0], start: "top 80%", toggleActions: "play none none none" } }));
    }
  });

  const items = [
    { t: "The Gathering 2", s: "Rufus Ogundele", href: "/works/the-gathering-2", slot: "the-gathering-2-ogundele" as const, alt: "The Gathering 2 by Rufus Ogundele" },
    { t: "Volume I", s: "Rust Only", href: "/volume/the-gathering" },
    { t: "Residential", s: "Rust Spaces", href: "/spaces", slot: "residential-portrait" as const, alt: "A residential interior" },
  ];
  return (
    <section ref={ref} data-theme="dark" aria-labelledby="st2" className="gutter flex flex-col justify-center gap-12 bg-ground py-24 md:min-h-screen md:py-0">
      <h2 id="st2" data-reveal="lines" className="t-h5 mx-auto max-w-[28ch] text-center md:max-w-[34ch]">
        Through careful curation, they extend into collectible art and spaces.
      </h2>
      <div data-frames className="grid gap-6 md:grid-cols-3 md:gap-8">
        {items.map((it) => (
          <div key={it.t} className="relative">
            <div data-dash aria-hidden className="pointer-events-none absolute inset-0 z-10 border border-dashed border-ink-dim opacity-0" />
            <div data-frame>
              {it.slot ? (
                <CurationFrame title={it.t} subtitle={it.s} href={it.href} slot={it.slot} alt={it.alt} className="aspect-[4/5] md:aspect-auto md:h-[56vh]" />
              ) : (
                <VolumeSet title={it.t} subtitle={it.s} href={it.href} className="aspect-[4/5] md:aspect-auto md:h-[56vh]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
