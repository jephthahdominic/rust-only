import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Art } from "@/components/Art";
import { TopBar } from "@/components/TopBar";
import { chapters, pad, volume, volumeHref, getWork, getArtist, workLabel } from "@/content";

export const generateStaticParams = () => [{ slug: volume.slug }];
export const metadata: Metadata = { title: "Chapters — The Gathering" };

const tone = { 1: "bg-ch-1", 2: "bg-ch-2", 3: "bg-ch-3", 4: "bg-ch-4" } as const;

async function ChaptersPageContent({ params }: { params: Promise<{ slug: string }> }) {
  if ((await params).slug !== volume.slug) notFound();
  return (
    <>
      <TopBar title="Volume 01 — The Gathering" closeHref={volumeHref} />
      <Hydrated />
      <h1 className="sr-only">Chapters of The Gathering</h1>
      <div>
        {chapters.map((c) => {
          const work = getWork(c.featuredWork)!;
          return (
            <section
              key={c.slug}
              data-theme="dark"
              aria-labelledby={`ch-${c.number}`}
              className={`chapter-panel flex h-svh min-h-[640px] flex-col md:grid md:grid-cols-2 ${tone[c.tone]} text-ink`}
            >
              <div className="gutter flex flex-1 flex-col justify-center gap-5 py-8 md:gap-8">
                <p className="t-label-sm caps text-accent">Chapter {pad(c.number)}</p>
                <h2 id={`ch-${c.number}`} className="t-h2 max-w-[10ch]">{c.title}</h2>
                <p className="t-label-sm caps text-ink-soft">{c.keywords.join(" · ")}</p>
                <Link href={`${volumeHref}/chapters/${c.slug}`} className="t-label-sm caps link-u self-start">See details →</Link>
              </div>
              <figure className="relative h-[52%] max-md:order-first md:h-full">
                <Art slot={c.image} alt={work.alt} fill sizes="(min-width:768px) 50vw, 100vw" />
                <figcaption className="absolute bottom-5 left-5 flex flex-col gap-1 text-ink-mark">
                  <span className="t-label-sm caps">{getArtist(work.artist).name}</span>
                  <span className="t-caption-xs caps opacity-80">{workLabel(work)}</span>
                </figcaption>
              </figure>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default function ChaptersPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ground" />}>
      <ChaptersPageContent params={params} />
    </Suspense>
  );
}
