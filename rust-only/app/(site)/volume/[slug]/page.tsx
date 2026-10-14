import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Art } from "@/components/Art";
import { PlainCaption } from "@/components/WorkCaption";
import { volume, volumeHref, objects, chapters, getWork } from "@/content";

export const generateStaticParams = () => [{ slug: volume.slug }];
export const metadata: Metadata = { title: "Volume I — The Gathering" };

async function VolumePageContent({ params }: { params: Promise<{ slug: string }> }) {
  if ((await params).slug !== volume.slug) notFound();
  const first = chapters[0];
  return (
    <>
      <Hydrated />
      <section data-theme="dark" className="relative h-svh min-h-[560px] overflow-hidden bg-ground-sink">
        <Art slot="volume-hero" alt="A room with three works hung on the wall" fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/80 via-transparent to-ground-sink/30" />
        <h1 data-reveal="lines" data-delay="0.2" className="t-h1 gutter absolute bottom-10 max-w-[14ch] text-ink-mark md:bottom-14">{volume.hero}</h1>
      </section>

      <section data-theme="dark" className="flex min-h-[80svh] items-center justify-center bg-ground px-6 py-24">
        <p data-reveal="lines" className="t-h5 max-w-[34ch] text-center">{volume.statement}</p>
      </section>

      <section data-theme="dark" aria-label="Volume I, The Gathering" className="relative overflow-hidden bg-ground-sink py-24 md:py-40">
        <div aria-hidden className="absolute inset-0 grid grid-cols-3 opacity-30">
          {(["volume-mosaic-01", "volume-mosaic-02", "volume-mosaic-03"] as const).map((s) => (
            <div key={s} className="relative"><Art slot={s} alt="" fill sizes="34vw" /></div>
          ))}
        </div>
        <div className="gutter relative flex items-center justify-center gap-6 text-ink-mark md:gap-10">
          <span className="t-label-md caps">Volume I</span>
          <span aria-hidden className="h-10 w-px bg-rule md:h-16" />
          <h2 className="t-h4">{volume.title}</h2>
        </div>
      </section>

      <section data-theme="light" className="grid gap-12 bg-ground py-20 text-ink md:grid-cols-2 md:gap-8 md:py-32">
        <div className="gutter flex flex-col gap-6 md:pr-[10%]">
          <h2 data-reveal="up" className="t-label-md caps">It begins before we arrive.</h2>
          {volume.intro.map((p) => (
            <p key={p} data-reveal="up" className="t-body-sm max-w-[48ch] text-ink-soft">{p}</p>
          ))}
          <Link href={`${volumeHref}/chapters`} className="t-label-sm caps link-u self-start">Chapters →</Link>
        </div>
        <Link href={`${volumeHref}/chapters`} className="gutter group block md:pl-0">
          <Art slot={first.image} alt={getWork(first.featuredWork)!.alt} sizes="(min-width:768px) 50vw, 100vw" reveal imgClassName="transition-transform duration-[1400ms] ease-slow group-hover:scale-[1.03]" />
          <p className="t-caption-xs caps mt-3 text-ink-soft">Chapter 01 · {first.title}</p>
        </Link>
      </section>

      {/* Proportions measured from the Figma reference: header block, full-width rule, then two equal
          top-aligned columns. Left frames ≈1.09:1, right frames ≈1.9:1, both cropped (object-cover). */}
      <section data-theme="dark" aria-labelledby="objects" className="bg-ground">
        <div className="flex flex-col gap-4 px-5 pb-12 pt-16 md:pb-[9vw] md:pl-[4.3%] md:pr-0 md:pt-[7.5vw]">
          <h2 id="objects" data-reveal="lines" className="t-h2">{volume.objectsTitle}</h2>
          <p data-reveal="up" className="t-body-md max-w-[48ch] leading-[1.7] text-ink-soft md:max-w-[38%]">{volume.objectsBody}</p>
        </div>
        <hr className="border-rule-soft" />
        <ul className="grid items-start px-5 gap-x-[3.9%] gap-y-12 pb-24 pt-12 md:grid-cols-2 md:gap-y-[4.5vw] md:pb-[10vw] md:pl-[4.3%] md:pr-[8.8%] md:pt-[7.5vw]">
          {objects.map((o, i) => (
            <li key={o.slug}>
              <Art slot={o.image} alt={o.alt} ratio={i % 2 === 0 ? "1.088 / 1" : "1.91 / 1"} sizes="(min-width:768px) 43vw, 100vw" reveal />
              <PlainCaption className="mt-3" label={o.title} meta={o.medium} caps={false} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function VolumePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ground" />}>
      <VolumePageContent params={params} />
    </Suspense>
  );
}
