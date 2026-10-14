"use client";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let instance: Lenis | null = null;

export function startLenis() {
  if (instance) return instance;
  instance = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  instance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return instance;
}
const tick = (t: number) => instance?.raf(t * 1000);

export function destroyLenis() {
  if (!instance) return;
  gsap.ticker.remove(tick);
  instance.destroy();
  instance = null;
}
export const lockScroll = () => {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
};
export const unlockScroll = () => {
  instance?.start();
  document.documentElement.style.overflow = "";
};
export const scrollTop = () => (instance ? instance.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0));
