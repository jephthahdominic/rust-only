import Link from "next/link";
import { Art } from "./Art";
import type { Slot } from "@/content/images";

type Props = { title: string; subtitle: string; href: string; slot?: Slot; alt?: string; children?: React.ReactNode; className?: string };

/** Image card, Memoir title + label-sm subtitle bottom-left over a gradient. */
export function CurationFrame({ title, subtitle, href, slot, alt = "", children, className = "aspect-[4/5]" }: Props) {
  return (
    <Link href={href} className={`group relative block overflow-hidden ${className}`}>
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-slow group-hover:scale-[1.03]">
        {children ?? (slot && <Art slot={slot} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" />)}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ground-sink/85 via-ground-sink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-ink-mark md:p-6">
        <h3 className="t-h5">{title}</h3>
        <p className="t-label-sm caps">{subtitle}</p>
      </div>
    </Link>
  );
}

/** Volume set: 2×2 mosaic of artworks, used as the "Volume I" frame. */
export function VolumeSet({ title, subtitle, href, className }: Omit<Props, "slot" | "alt" | "children">) {
  const slots = ["faces-of-the-ancestors-buraimoh", "the-group-onuoha", "feast-at-canaan-onobrakpeya", "vogue-and-style-i-godspower"] as const;
  return (
    <CurationFrame title={title} subtitle={subtitle} href={href} className={className}>
      <div className="grid h-full grid-cols-2 gap-px bg-ground-sink">
        {slots.map((s, i) => (
          <div key={s} className="relative"><Art slot={s} alt={`Volume I artwork ${i + 1}`} fill sizes="20vw" /></div>
        ))}
      </div>
    </CurationFrame>
  );
}
