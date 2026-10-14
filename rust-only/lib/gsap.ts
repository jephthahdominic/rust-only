"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

/** Shared house easing: slow, weighted, never bouncy. */
export const EASE = { out: "power3.out", expo: "expo.out" } as const;
export const DUR = { base: 1, slow: 1.2 } as const;

export { gsap, ScrollTrigger, SplitText };
