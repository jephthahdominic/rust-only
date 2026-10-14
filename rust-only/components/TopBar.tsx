import Link from "next/link";

/** Focus-view bar for chapter / work pages (replaces the main nav). */
export function TopBar({ title, closeHref, light }: { title: string; closeHref: string; light?: boolean }) {
  return (
    <header
      data-theme={light ? "light" : "dark"}
      className="gutter fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-ground-sink/60 text-ink-mark backdrop-blur-sm"
    >
      <p className="t-label-sm caps">{title}</p>
      <Link href={closeHref} className="t-label-sm caps hover:opacity-70">Close</Link>
    </header>
  );
}
