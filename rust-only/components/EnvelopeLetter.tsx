"use client";
import { Logo } from "./Logo";
import { useScrollScene } from "@/lib/useScrollScene";
import { letter } from "@/content/manifesto";

const T = 80; // px from the top of the viewport where the unfolded page begins
const paper = "bg-ground text-ink"; // inside a data-theme="light" wrapper → cream

function LetterBody({ full }: { full: boolean }) {
  return (
    <div className="flex flex-col gap-6 px-8 pb-16 pt-14 md:px-12">
      <h2 className="t-label-md caps text-left">{letter.title}</h2>
      {(full ? letter.paragraphs : letter.paragraphs.slice(0, 1)).map((p) => (
        <p key={p} className="t-caption-lg">{p}</p>
      ))}
      {full && (
        <>
          <p className="t-caption-lg">{letter.closing}</p>
          <p className="font-signature text-[28px] leading-none text-statement md:text-[32px]">{letter.signoff}</p>
        </>
      )}
    </div>
  );
}

/**
 * Pinned, scroll-scrubbed sequence: sealed envelope → flap opens → letter rises →
 * letter unfolds into a tall page. At the end the real (flow) letter takes over
 * at the exact same position, so scrolling continues through the text.
 * Without motion, only the final letter renders.
 */
export function EnvelopeLetter() {
  const ref = useScrollScene<HTMLDivElement>(({ root, gsap }) => {
    const q = gsap.utils.selector(root);
    const [stage] = q("[data-stage]");
    const [env] = q("[data-env]");
    const [flap] = q("[data-flap]");
    const [seal] = q("[data-seal]");
    const [cue] = q("[data-cue]");
    const [mini] = q("[data-mini]");
    const [flow] = q("[data-flow]");

    gsap.set(stage, { display: "block" });
    gsap.set(flap, { transformPerspective: 1100 });
    const vh = window.innerHeight;
    const e = env.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const W = Math.min(window.innerWidth * 0.92, 560);
    const cx = e.left - s.left + e.width / 2;
    const flowEl = flow as HTMLElement;
    // the flow letter's top must land on T at the end of the pin
    gsap.set(flowEl, { marginTop: -(vh - T), autoAlpha: 0 });
    gsap.set(mini, {
      left: cx, xPercent: -50, width: e.width * 0.88, height: e.height * 0.78,
      top: e.top - s.top + e.height * 0.14, zIndex: 2,
    });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage, start: "top top", end: "+=320%", pin: true, scrub: 1,
        onUpdate: (self) => gsap.set(flowEl, { autoAlpha: self.progress > 0.995 ? 1 : 0 }),
      },
    });
    tl.to(cue, { opacity: 0, duration: 0.3 }, 0)
      .to(seal, { scale: 0.7, opacity: 0, duration: 0.5 }, 0.1)
      .to(flap, { rotateX: 180, duration: 1, ease: "power2.inOut" }, 0.4)
      .set(flap, { zIndex: 1 }, 0.9)
      // letter rises out of the pocket
      .to(mini, { top: T, duration: 1.2, ease: "power2.inOut" }, 1.4)
      .set(mini, { zIndex: 6 }, 2.2)
      // unfolds into the tall page; envelope falls away
      .to(mini, { width: W, height: vh - T, duration: 1, ease: "power2.inOut" }, 2.6)
      // `top` not `yPercent`: a transform on the envelope would trap its parts in their own stacking context
      .to(env, { top: e.height * 0.6, opacity: 0, duration: 1 }, 2.6)
      .set(mini, { autoAlpha: 0 }, 3.6)
      .to({}, { duration: 0.3 }, 3.6);
  });

  return (
    <div ref={ref} className="bg-paper">
      <div data-stage className="relative hidden h-svh overflow-hidden">
        <div className="grid h-full place-items-center">
          <div data-env className="relative aspect-[3/2] w-[min(86vw,640px)]">
            <div className="absolute inset-0 bg-kraft shadow-[0_30px_60px_-30px_rgb(36_8_2/0.6)]" />
            <div
              className="absolute inset-0 z-[3] bg-kraft brightness-110"
              style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
            />
            <div
              data-flap
              className="absolute inset-x-0 top-0 z-[4] h-[55%] origin-top bg-kraft brightness-90"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
            <div
              data-seal
              className="absolute left-1/2 top-[55%] z-[5] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-statement shadow-lg md:h-20 md:w-20"
            >
              <Logo className="h-9 w-12" />
            </div>
          </div>
        </div>
        <div data-theme="light" data-mini aria-hidden className={`absolute overflow-hidden font-caption ${paper}`}>
          <LetterBody full={false} />
        </div>
        <p data-cue className="t-caption-xs caps absolute inset-x-0 bottom-28 text-center text-ink-soft">Scroll to open</p>
      </div>

      <article data-flow data-theme="light" aria-label={letter.title} className={`relative z-10 mx-auto w-[min(92vw,560px)] font-caption ${paper} shadow-[0_0_0_1px_var(--rule-soft)] md:my-[10vh] md:mt-[10vh]`}>
        <LetterBody full />
      </article>
      <div className="h-24 md:h-40" />
    </div>
  );
}
