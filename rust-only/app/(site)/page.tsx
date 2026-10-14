import { Hydrated } from "@/components/Hydrated";
import Link from "next/link";
import { Art } from "@/components/Art";
import { Marquee } from "@/components/Marquee";
import { StatementOne, StatementTwo } from "@/components/HomeScenes";
import { origin } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hydrated />
      <section data-theme="dark" className="relative h-svh min-h-[560px] overflow-hidden bg-ground-sink">
        <Art slot="room-panelled" alt="A wood-panelled room with an artwork on the wall" fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/80 via-transparent to-ground-sink/30" />
        <div className="gutter absolute inset-x-0 bottom-0 flex items-end justify-between pb-10 text-ink-mark md:pb-14">
          <h1 data-reveal="lines" data-after-loader data-delay="0.2" className="t-h1 max-w-[12ch]">Begin with art</h1>
          <a href="#statement" data-reveal="up" data-after-loader data-delay="0.5" className="flex flex-col items-center gap-3" aria-label="Scroll down">
            <span className="t-label-sm caps [writing-mode:vertical-rl]">Scroll</span>
            <span aria-hidden className="scroll-cue-line h-14 w-px bg-ink-mark" />
          </a>
        </div>
      </section>

      <div id="statement"><StatementOne /></div>
      <StatementTwo />
      <Marquee />

      <section data-theme="light" aria-labelledby="origin" className="grid bg-ground text-ink md:min-h-screen md:grid-cols-2">
        <div className="gutter flex flex-col justify-center gap-8 py-20 md:py-32 md:pr-[8%]">
          <h2 id="origin" data-reveal="lines" className="t-h4 max-w-[16ch]">{origin.title}</h2>
          <hr className="border-rule" />
          <p data-reveal="up" className="t-body-sm max-w-[48ch] text-ink-soft">{origin.body}</p>
          <Link href="/manifesto" className="t-label-sm caps link-u self-start">{origin.link} →</Link>
        </div>
        <figure className="relative min-h-[70svh] max-md:order-first md:min-h-full">
          <Art slot="the-keeper-of-tradition-buraimoh" alt="The Keeper of Tradition by Jimoh Buraimoh" fill sizes="(min-width:768px) 50vw, 100vw" />
          <figcaption className="absolute bottom-6 left-6 flex flex-col gap-1 text-ink-mark">
            <span className="t-label-sm caps">Jimoh Buraimoh</span>
            <span className="t-caption-xs caps opacity-80">The Keeper of Tradition, 2012</span>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
