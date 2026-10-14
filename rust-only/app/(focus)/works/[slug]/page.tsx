import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Art } from "@/components/Art";
import { Carousel } from "@/components/Carousel";
import { TopBar } from "@/components/TopBar";
import { WorkCaption } from "@/components/WorkCaption";
import { works, getWork, getArtist, getChapter, pad, volumeHref, workLabel, slotSize, type Slot } from "@/content";

// left/top/width/height as % of the room photo
const FRAME = { left: "41.8%", top: "15.5%", width: "16.4%", height: "31.3%" } as const;

export const generateStaticParams = () => works.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWork((await params).slug);
  return { title: w ? `${w.title} — ${getArtist(w.artist).name}` : "Work" };
}

async function WorkPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const work = getWork((await params).slug);
  if (!work) notFound();
  const artist = getArtist(work.artist);
  const chapter = getChapter(work.chapter)!;
  const specs: [string, string][] = [
    ["Medium", work.medium ?? "—"],
    ["Dimensions", work.dimensions ?? "—"],
    ["Year", work.year ? String(work.year) : "—"],
    ["Chapter", `${pad(chapter.number)} · ${chapter.title}`],
    ["Availability", work.availability],
  ];
  const slides: { slot: Slot; alt: string }[] = [
    { slot: work.image, alt: work.alt },
  ];
  const more = works.filter((w) => w.slug !== work.slug).sort((a, b) => Number(b.chapter === work.chapter) - Number(a.chapter === work.chapter)).slice(0, 6);

  return (
    <>
      <Hydrated />
      <TopBar title="Volume 01 |" closeHref={`${volumeHref}/chapters/${chapter.slug}`} />
      <div data-theme="dark" className="bg-ground">
        {/* In-situ: the work composited into the empty 23×30 frame of the room photo.
            TODO(figma): frame box is eyeballed from the export; adjust FRAME below if the artwork drifts. */}
        <div className="relative mx-auto w-full" style={{ maxWidth: `calc(82svh * ${slotSize("space-frame-23x30").ratio})` }}>
          <Art slot="space-frame-23x30" alt={`${work.title} hung in a living room`} priority sizes="100vw" />
          <div className="absolute bg-paper" style={FRAME}>
            <Art slot={work.image} alt="" fill fit="contain" sizes="20vw" imgClassName="!p-[3%]" />
          </div>
        </div>

        <div className="gutter flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:justify-between md:py-14">
          <h1 data-reveal="lines" className="t-h5">{work.title}</h1>
          <p className="t-label-sm caps text-accent">{artist.name}{work.year ? ` · ${work.year}` : ""}</p>
        </div>

        <div className="gutter grid gap-16 pb-24 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-10 max-md:order-last">
            <dl className="t-caption-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-t border-rule-soft py-3">
                  <dt className="caps text-ink-dim">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <hr className="border-rule" />
            <div className="flex flex-col gap-5">
              <h2 className="t-label-sm caps text-accent">About the artist</h2>
              {artist.bio.map((p) => (
                <p key={p} className="t-body-sm max-w-[52ch] text-ink-soft">{p}</p>
              ))}
              {/* TODO(route): inquiry form / mailto */}
              <a href={`mailto:hello@rustonly.com?subject=Inquiry: ${encodeURIComponent(work.title)}`} className="t-label-sm caps link-u self-start">Inquire →</a>
            </div>
          </div>
          <Carousel items={slides} />
        </div>

        <section aria-labelledby="more" className="border-t border-rule-soft py-16 md:py-24">
          <h2 id="more" className="t-label-sm caps gutter mb-8 text-ink-dim">View more</h2>
          <ul className="gutter flex gap-6 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {more.map((w) => (
              <li key={w.slug} className="w-[62vw] shrink-0 md:w-[22vw]">
                <Link href={`/works/${w.slug}`} aria-label={workLabel(w)}>
                  <Art slot={w.image} alt={w.alt} ratio="4 / 5" sizes="(min-width:768px) 22vw, 62vw" />
                </Link>
                <WorkCaption work={w} className="mt-3" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ground" />}>
      <WorkPageContent params={params} />
    </Suspense>
  );
}
