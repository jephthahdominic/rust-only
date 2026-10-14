"use client";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { useScrollScene, type SceneCtx } from "@/lib/useScrollScene";
import { subscribeHydrated, hydratedVersion } from "@/lib/hydration";
import { whenLoaderDone } from "@/lib/loader";
import { startLenis, destroyLenis, scrollTop } from "@/lib/lenis";

/** Generic reveals driven by [data-reveal="up|lines|image"] (+ optional data-delay). */
function reveals({ root, gsap, SplitText, ScrollTrigger }: SceneCtx) {
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const kind = el.dataset.reveal;
    const delay = Number(el.dataset.delay ?? 0);
    // fresh object per tween (GSAP mutates it). No `once: true`: a trigger that kills itself mid-refresh corrupts ScrollTrigger's trigger list.
    const st = () => ({ trigger: el, start: "top bottom-=40", toggleActions: "play none none none" });
    if (kind === "up") {
      if (el.hasAttribute("data-after-loader")) {
        // hero furniture: waits for the loader hand-off instead of scroll position
        const tw = gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: EASE.out, delay, paused: true });
        whenLoaderDone(() => tw.play());
      } else {
        gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: EASE.out, delay, scrollTrigger: st() });
      }
    } else if (kind === "lines") {
      gsap.set(el, { opacity: 1 });
      // The ScrollTrigger lives outside onSplit: autoSplit re-runs onSplit on resize / font load, and
      // creating triggers inside it throws. onSplit only (re)builds a paused tween for the current lines.
      let tween: gsap.core.Tween | undefined;
      let revealed = false;
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        aria: "none", // keep real text readable; avoids aria-label on <p>
        onSplit: (self) => {
          tween?.kill();
          tween = gsap.from(self.lines, { yPercent: 110, duration: 1.1, ease: EASE.out, stagger: 0.09, delay, paused: true });
          if (revealed) tween.progress(1);
        },
      });
      ScrollTrigger.create({ ...st(), onEnter: () => {
          revealed = true;
          if (el.hasAttribute("data-after-loader")) whenLoaderDone(() => tween?.play());
          else tween?.play();
        } });
    } else if (kind === "image") {
      const img = el.querySelector("img");
      const tl = gsap.timeline({ scrollTrigger: st(), delay });
      tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: EASE.expo });
      if (img) tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: EASE.expo }, 0);
    }
  });
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const hydrated = useSyncExternalStore(subscribeHydrated, hydratedVersion, () => 0);

  const root = useScrollScene<HTMLDivElement>((ctx) => {
    if (!hydrated) return; // wait for the page to hydrate before touching its DOM
    reveals(ctx);
    // pinned scenes in children were created first; recompute once layout settles
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, hydrated]);

  // Smooth scroll (off for reduced motion)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (mq.matches ? destroyLenis() : startLenis());
    sync();
    mq.addEventListener("change", sync);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("load", refresh);
      destroyLenis();
    };
  }, []);

  // Page transition: fade through ground-sink
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (mq.matches || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      e.preventDefault();
      e.stopPropagation();
      gsap.to(overlay.current, {
        opacity: 1, duration: 0.4, ease: EASE.out, pointerEvents: "auto",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    scrollTop();
    if (first.current) { first.current = false; return; }
    gsap.to(overlay.current, { opacity: 0, duration: 0.6, ease: EASE.out, delay: 0.1, pointerEvents: "none" });
  }, [pathname]);

  return (
    <>
      <div ref={root}>{children}</div>
      <div ref={overlay} aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-ground-sink opacity-0" />
    </>
  );
}
