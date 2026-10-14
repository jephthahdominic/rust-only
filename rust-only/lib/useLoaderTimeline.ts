"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "./gsap";
import { lockScroll, unlockScroll } from "./lenis";

type Inset = [number, number, number, number]; // top right bottom left, px
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpInset = (a: Inset, b: Inset, t: number) => a.map((v, i) => lerp(v, b[i], t)) as Inset;

/** Window keyframes derived from the viewport (measured from Figma at 1440×900 and 390×844). */
export function geometry(W: number, H: number) {
  const mobile = W < 768;
  const sw = W * (mobile ? 0.385 : 0.23); // small window width; aspect 1.6
  const sh = sw / 1.6;
  const sl = (W - sw) / 2;
  const st = (H - sh) / 2;
  const A: Inset = [H / 2, sl, H / 2, sl]; // zero-height line at the centre
  const B: Inset = [st, sl, st, sl]; // small window (B / C)
  const D: Inset = mobile
    ? [H * 0.155, W * 0.108, H * 0.155, W * 0.108] // 306×582 on 390×844
    : [H * 0.1345, W * 0.1345, H * 0.1345, W * 0.1345]; // 1052×658 on 1440×900
  const F: Inset = [0, 0, 0, 0]; // full-bleed = the Home hero
  return { A, B, D, F, sh, gap: mobile ? 22 : 23.5 };
}

type Keyframe = "A" | "B" | "C" | "D";
const FREEZE: Record<Keyframe, { w: number; p: number }> = {
  A: { w: 0, p: 0 }, B: { w: 1, p: 67 }, C: { w: 1, p: 100 }, D: { w: 2, p: 100 },
};

const MIN_PROGRESS_MS = 1400; // enforced minimum so the sequence is readable on fast connections
const A_HOLD_MS = 300;
const C_HOLD_MS = 350;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Drives the A → B → C → D → Home-hero loader.
 * `w` is the window stage: 0 = A (line), 1 = B/C (small), 2 = D (large inset), 3 = full-bleed.
 * Everything visual is a pure function of { w, p, fade } via render(), so the dev-only
 * `?loader=A|B|C|D` freeze is just "set state, render once".
 */
export function useLoaderTimeline(onDone?: () => void) {
  const root = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLSpanElement>(null);
  const bot = useRef<HTMLSpanElement>(null);
  const ui = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const pathname = useRef(usePathname());
  const done = useRef(onDone);
  useEffect(() => { done.current = onDone; });

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("loader-on")) return;
    const els = { root: root.current!, win: win.current!, top: top.current!, bot: bot.current!, ui: ui.current!, fill: fill.current!, pct: pct.current!, status: status.current! };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const freezeKey = process.env.NODE_ENV !== "production" ? new URLSearchParams(location.search).get("loader") : null;
    const freeze = freezeKey && freezeKey in FREEZE ? (freezeKey as Keyframe) : null;

    const s = { w: 0, p: 0, fade: 0 };
    let lastQuarter = -1;

    const render = () => {
      const W = innerWidth, H = innerHeight;
      const g = geometry(W, H);
      // window (clip on the hero image; the image itself never moves)
      const k = s.w < 1 ? lerpInset(g.A, g.B, s.w) : s.w < 2 ? lerpInset(g.B, g.D, s.w - 1) : lerpInset(g.D, g.F, s.w - 2);
      els.win.style.clipPath = `inset(${k[0]}px ${k[1]}px ${k[2]}px ${k[3]}px)`;
      // words: pushed apart while the window opens (sep 0→1), then they stay put
      const sep = clamp(s.w, 0, 1);
      const dy = (g.sh / 2 + g.gap) * sep;
      const drift = 10 * s.fade;
      els.top.style.transform = `translateY(${-(dy + drift)}px)`;
      els.bot.style.transform = `translateY(${dy + drift}px)`;
      // colour: #F6EFE4 @10% (A) → @70.3% (B) → #FCE7D0 @100% (C/D), mixed by progress 67→100
      const mix = clamp((s.p - 67) / 33, 0, 1);
      const a = lerp(lerp(0.1, 0.703, sep), 1, mix);
      const c = `rgb(${lerp(246, 252, mix)} ${lerp(239, 231, mix)} ${lerp(228, 208, mix)} / ${a})`;
      els.top.style.color = els.bot.style.color = c;
      els.top.style.opacity = els.bot.style.opacity = String(1 - s.fade);
      // meter + label
      els.ui.style.opacity = String(1 - s.fade);
      els.fill.style.width = `${s.p}%`;
      els.pct.textContent = `${Math.round(s.p)}%`;
      const lw = els.pct.offsetWidth;
      els.pct.style.transform = `translateX(${clamp((s.p / 100) * W - lw / 2, 0, W - lw)}px)`;
      const q = Math.floor(s.p / 25);
      if (q !== lastQuarter) { lastQuarter = q; els.status.textContent = s.p >= 100 ? "Loaded" : `Loading ${q * 25}%`; }
    };
    render();
    addEventListener("resize", render);

    if (freeze) {
      Object.assign(s, FREEZE[freeze]);
      lockScroll();
      render();
      return () => removeEventListener("resize", render);
    }

    try { sessionStorage.setItem("ro-loader", "1"); } catch {}
    lockScroll();

    const finish = () => {
      html.classList.add("loader-skip");
      html.classList.remove("loader-on");
      unlockScroll();
      window.dispatchEvent(new Event("loader:done"));
      done.current?.();
    };

    // Real readiness: hero image + fonts. Display progress is the smoothed min(real, time).
    let ready = 0;
    const img = els.win.querySelector("img");
    const bump = () => { ready++; };
    if (img && !(img.complete && img.naturalWidth)) {
      img.addEventListener("load", bump, { once: true });
      img.addEventListener("error", bump, { once: true });
    } else bump();
    document.fonts.ready.then(bump);

    const minMs = reduced ? 900 : MIN_PROGRESS_MS;
    const t0 = performance.now() + A_HOLD_MS;
    let closing = false;
    let opened: Promise<void> = Promise.resolve();

    // A → B (starts with the progress)
    if (!reduced) {
      opened = new Promise<void>((res) => {
        gsap.to(s, { w: 1, duration: 0.9, delay: A_HOLD_MS / 1000, ease: "expo.inOut", onUpdate: render, onComplete: res });
      });
    }

    const close = async () => {
      await opened;
      await sleep(C_HOLD_MS); // C hold
      if (reduced) {
        await gsap.to(els.root, { opacity: 0, duration: 0.3, ease: "none" });
      } else {
        await gsap.to(s, { w: 2, duration: 0.9, ease: "power3.inOut", onUpdate: render }); // → D
        if (pathname.current === "/") {
          // D → Home hero: clip opens to full-bleed while words + meter fade
          gsap.to(s, { fade: 1, duration: 0.4, ease: "power2.out", onUpdate: render });
          await gsap.to(s, { w: 3, duration: 0.9, ease: "power3.inOut", onUpdate: render });
        } else {
          // other routes have a different hero: fade through instead of opening onto it
          await gsap.to(els.root, { opacity: 0, duration: 0.6, ease: "power2.out" });
        }
      }
      finish();
    };

    const tick = (_t: number, dt: number) => {
      const elapsed = performance.now() - t0;
      if (elapsed < 0) return;
      const timeCap = clamp(elapsed / minMs, 0, 1) * 100;
      const realCap = 100 * (ready >= 2 ? 1 : 0.2 + 0.4 * ready);
      const target = Math.min(timeCap, realCap);
      s.p += (target - s.p) * (1 - Math.exp(-(dt / 1000) * 14)); // lerp: never jumps
      if (target >= 100 && s.p > 99.5) s.p = 100;
      render();
      if (s.p >= 100 && !closing) { closing = true; gsap.ticker.remove(tick); close(); }
    };
    gsap.ticker.add(tick);

    return () => {
      removeEventListener("resize", render);
      gsap.ticker.remove(tick);
      gsap.killTweensOf([s, els.root]);
    };
  }, []);

  return { root, win, top, bot, ui, fill, pct, status };
}
