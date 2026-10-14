"use client";
// Pages announce that they have hydrated; global GSAP reveals wait for it so
// they never mutate server HTML that React has not claimed yet.
let version = 0;
const subs = new Set<() => void>();
export const markHydrated = () => { version++; subs.forEach((f) => f()); };
export const subscribeHydrated = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
export const hydratedVersion = () => version;
