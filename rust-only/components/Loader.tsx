"use client";
import { Art } from "./Art";
import { useLoaderTimeline } from "@/lib/useLoaderTimeline";

/**
 * Session loader. The "window" is a clip-path on the hero image (same image, same cover crop and same
 * gradient as the Home hero), so when the clip reaches the full viewport the hand-off is seamless.
 * State A is plain CSS (see .load in globals.css) so it is in the server HTML with no flash.
 * Visibility is driven by <html class="loader-on"> from the head bootstrap script.
 */
export function Loader({ onDone }: { onDone?: () => void }) {
  const { root, win, top, bot, ui, fill, pct, status } = useLoaderTimeline(onDone);
  return (
    <div id="loader" ref={root} className="load" data-theme="dark" role="status">
      <span ref={status} className="sr-only" aria-live="polite">Loading</span>
      <div ref={win} className="load__window" aria-hidden>
        <Art slot="room-panelled" alt="" fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/80 via-transparent to-ground-sink/30" />
      </div>
      <div aria-hidden>
        <span ref={top} className="load__word load__word--top">Rust</span>
        <span ref={bot} className="load__word load__word--bot">Only</span>
      </div>
      <div ref={ui} className="load__ui" aria-hidden>
        <div className="load__meter"><div ref={fill} className="load__fill" /></div>
        <span ref={pct} className="load__pct">0%</span>
      </div>
    </div>
  );
}
