/** Real Rust Only loop mark (public/images/brand/rust-only-mark.png) used as a mask, so it takes currentColor. */
export function Logo({ className = "" }: { className?: string; strokeWidth?: number }) {
  const mask = "url(/images/brand/rust-only-mark.png) center / contain no-repeat";
  return <span aria-hidden className={`inline-block bg-current ${className}`} style={{ WebkitMask: mask, mask }} />;
}
