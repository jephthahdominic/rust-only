import Image from "next/image";
import { slotSize, src, type Slot } from "@/content/images";

type Props = {
  slot: Slot;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** "fill" stretches to the parent (parent must be relative + sized); otherwise the slot's aspect ratio is used */
  fill?: boolean;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  reveal?: boolean;
  /** "contain" for transparent cut-outs (objects) */
  fit?: "cover" | "contain";
};

/** next/image wrapper for content slots. Sharp corners; cover-fit. */
export function Art({ slot, alt, sizes = "100vw", priority, fill, ratio, className = "", imgClassName = "", reveal, fit = "cover" }: Props) {
  const { width, height } = slotSize(slot);
  return (
    <div
      data-reveal={reveal ? "image" : undefined}
      className={`relative overflow-hidden ${fill ? "h-full w-full" : ""} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio ?? `${width} / ${height}` }}
    >
      <Image src={src(slot)} alt={alt} fill sizes={sizes} priority={priority} className={`${fit === "contain" ? "object-contain p-[8%]" : "object-cover"} ${imgClassName}`} />
    </div>
  );
}
