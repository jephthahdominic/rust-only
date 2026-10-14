"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { nav } from "@/content/site";
import { lockScroll, unlockScroll } from "@/lib/lenis";

export function Nav() {
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  // safety net: any route change closes the menu
  useEffect(() => { menu.current?.close(); }, [pathname]);
  const open = () => { menu.current?.showModal(); lockScroll(); };
  const close = () => { menu.current?.close(); };

  return (
    <header data-theme="dark" className="nav-fade gutter fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-ground-sink/85 text-ink-mark backdrop-blur-sm">
      <Link href="/" aria-label="Rust Only — home"><Logo className="h-7 w-10" /></Link>

      <nav aria-label="Primary" className="max-md:hidden">
        <ul className="flex items-center">
          {nav.map((n, i) => (
            <li key={n.href} className={`px-5 ${i > 0 ? "border-l border-rule" : ""} last:pr-0`}>
              <Link href={n.href} className="t-label-sm caps transition-opacity hover:opacity-60">{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={open} aria-haspopup="dialog" className="t-label-sm caps md:hidden">Menu</button>
      <dialog
        ref={menu}
        className="ro-dialog m-0 h-dvh w-screen"
        aria-label="Menu"
        onClose={unlockScroll}
      >
        <div data-theme="dark" className="flex h-full w-full flex-col bg-ground-sink px-5 py-4 text-ink-mark">
          <div className="flex h-6 items-center justify-between">
            <Logo className="h-7 w-10" />
            <button onClick={close} className="t-label-sm caps">Close</button>
          </div>
          <ul className="my-auto flex flex-col gap-6">
            {["Volume", "Spaces", "Manifesto"].map((label, i) => (
              <li key={label}>
                <Link href={nav[i].href} onClick={close} className="t-h3 block">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </header>
  );
}
