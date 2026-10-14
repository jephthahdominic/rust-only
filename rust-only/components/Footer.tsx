"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { useNewsletter } from "./Newsletter";
import { footerLinks, socials } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>,
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />,
  X: <path d="M4 4l16 16M20 4 4 20" />,
};

export function Footer() {
  const { open } = useNewsletter();
  return (
    <footer data-theme="dark" className="gutter bg-ground pb-6 pt-24 text-ink md:pt-32">
      <div className="@container">
        <p className="flex items-center justify-between whitespace-nowrap font-display uppercase leading-[0.85] tracking-[-0.04em] text-ink-mark" style={{ fontSize: "17cqw" }}>
          <span className="sr-only">Rust Only</span>
          <span aria-hidden>Rust</span>
          <Logo className="h-[0.62em] w-[0.9em]" />
          <span aria-hidden>Only</span>
        </p>
      </div>
      <p className="t-h6 mt-8 text-center text-ink-soft md:mt-12">We author worlds meant to be kept</p>
      <hr className="my-10 border-rule" />
      <nav aria-label="Footer" className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {footerLinks.map((l, i) => (
            <li key={l.href} className="flex items-center gap-6 md:gap-10">
              {i > 0 && <span aria-hidden className="text-ink-dim">·</span>}
              <Link href={l.href} className="t-label-sm caps hover:opacity-60">{l.label}</Link>
            </li>
          ))}
        </ul>
        <Button onClick={open} className="h-10">Subscribe</Button>
      </nav>
      <div className="t-caption-xs caps mt-16 grid gap-6 text-ink-dim md:grid-cols-3 md:items-center">
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="mailto:hello@rustonly.com" className="inline-block py-1.5 hover:text-ink">hello@rustonly.com</a>
          {/* TODO(routes): legal pages */}
          <Link href="#" className="inline-block py-1.5 hover:text-ink">Privacy Policy</Link>
          <Link href="#" className="inline-block py-1.5 hover:text-ink">Terms and Conditions</Link>
        </p>
        <ul className="flex gap-5 md:justify-center">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label} className="grid h-6 w-6 place-items-center hover:text-ink">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">{icons[s.label]}</svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="md:text-right">© 2026 Rust Only. All rights reserved.</p>
      </div>
    </footer>
  );
}
