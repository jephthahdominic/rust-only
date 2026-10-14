import Link from "next/link";
import type { Work } from "@/content/works";
import { workLabel } from "@/content/works";
import { getArtist } from "@/content/artists";

export function WorkCaption({ work, className = "" }: { work: Work; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="t-label-sm caps text-ink">{getArtist(work.artist).name}</p>
      <p className="t-caption-xs caps text-ink-dim">
        <Link href={`/works/${work.slug}`} className="hover:text-ink">{workLabel(work)}</Link>
      </p>
    </div>
  );
}

/** Caption for non-work items (objects, free text) */
export function PlainCaption({ label, meta, className = "", caps = true }: { label: string; meta: string; className?: string; caps?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className={`t-label-sm text-ink ${caps ? "caps" : ""}`}>{label}</p>
      <p className={`${caps ? "t-caption-xs caps" : "t-caption-sm"} text-ink-dim`}>{meta}</p>
    </div>
  );
}
