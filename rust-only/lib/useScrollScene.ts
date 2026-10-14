"use client";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "./gsap";

export type SceneCtx = {
  root: HTMLElement;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  SplitText: typeof SplitText;
  /** ≥ 768px */
  desktop: boolean;
};

/**
 * The single entry point for scroll choreography.
 *
 * - Runs `scene` only when the user has NOT asked for reduced motion. Markup is
 *   authored in its resolved state, so with reduced motion nothing is pinned or
 *   transformed and the final state shows.
 * - Re-runs when crossing the 768px breakpoint; everything created inside
 *   (tweens, ScrollTriggers, inline styles) is reverted automatically.
 */
export function useScrollScene<T extends HTMLElement = HTMLElement>(
  scene: (ctx: SceneCtx) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" },
      (c) => {
        if (!c.conditions?.motion) return;
        scene({ root, gsap, ScrollTrigger, SplitText, desktop: !!c.conditions.desktop });
      },
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
