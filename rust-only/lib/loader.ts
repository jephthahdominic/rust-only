"use client";
/** True while the session loader is on screen (set by the head bootstrap script). */
export const loaderActive = () => document.documentElement.classList.contains("loader-on");

/** Run `fn` now if the loader is finished/skipped, otherwise when it fires `loader:done`. */
export function whenLoaderDone(fn: () => void) {
  if (!loaderActive()) return fn();
  window.addEventListener("loader:done", fn, { once: true });
}
