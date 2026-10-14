import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Art } from "@/components/Art";
import { TopBar } from "@/components/TopBar";
import { WorkCaption } from "@/components/WorkCaption";
import { chapters, getChapter, getWork, worksInChapter, volume, volumeHref, slotSize, workLabel, type Work } from "@/content";

export const generateStaticParams = () => chapters.map((c) => ({ slug: volume.slug, chapter: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }): Promise<Metadata> {
  const c = getChapter((await params).chapter);
  return { title: c ? `${c.title} — The Gathering` : "Chapter" };
}

async function ChapterDetailContent({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const c = getChapter(chapter);
  if (slug !== volume.slug || !c) notFound();
  const list = worksInChapter(c.slug);

  // 2-up (tall + short), full-width, repeat
  const rows: Work[][] = [];
  for (let i = 0; i < list.length; ) {
    const take = rows.length % 2 === 0 ? 2 : 1;
    rows.push(list.slice(i, i + take));
    i += take;
  }

  return (
    <>
      <Hydrated />
      <TopBar title={`Volume 01 | ${c.title}`} closeHref={`${volumeHref}/chapters`} />
      <section data-theme="dark" className="relative h-svh min-h-[560px] overflow-hidden bg-ground-sink">
        <Art slot={c.image} alt={getWork(c.featuredWork)!.alt} fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/70 to-transparent" />
        <h1 data-reveal="lines" data-delay="0.2" className="t-h1 gutter absolute bottom-10 max-w-[12ch] text-ink-mark md:bottom-14">{c.title}</h1>
      </section>

      <section data-theme="dark" aria-label="Works" className="gutter flex flex-col gap-20 bg-ground py-20 md:py-32">
        {rows.map((row, r) => (
          <div key={r} className={row.length === 2 ? "grid items-end gap-20 md:grid-cols-12 md:gap-8" : ""}>
            {row.map((w, i) => {
              const { ratio } = slotSize(w.image);
              const span = row.length === 1 ? "" : i === 0 ? "md:col-span-6" : "md:col-span-4 md:col-start-9";
              return (
                <article key={w.slug} className={span}>
                  {/* natural aspect ratios: artworks are never cropped; a lone piece is capped to 80% of the viewport height */}
                  <Link href={`/works/${w.slug}`} className="mx-auto block" style={row.length === 1 ? { maxWidth: `calc(80svh * ${ratio})` } : undefined} aria-label={workLabel(w)}>
                    <Art slot={w.image} alt={w.alt} sizes={row.length === 1 ? "100vw" : "(min-width:768px) 50vw, 100vw"} reveal />
                  </Link>
                  <WorkCaption work={w} className="mt-3" />
                </article>
              );
            })}
          </div>
        ))}
      </section>
    </>
  );
}

export default function ChapterDetail({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ground" />}>
      <ChapterDetailContent params={params} />
    </Suspense>
  );
}
