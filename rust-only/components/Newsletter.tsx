"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "./Button";
import { lockScroll, unlockScroll } from "@/lib/lenis";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useNewsletter = () => useContext(Ctx);

/**
 * Light-mode modal built on a native <dialog>: showModal() gives us a real focus
 * trap, inert background, Escape-to-close and focus restoration for free.
 * Form state only; no backend (TODO).
 */
export function NewsletterProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [form, setForm] = useState({ name: "", email: "" });

  const open = useCallback(() => {
    setStatus("idle");
    dialog.current?.showModal();
    lockScroll();
  }, []);
  const close = () => dialog.current?.close();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => unlockScroll();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // TODO(backend): post to the newsletter provider.
    setStatus("done");
  };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        className="ro-dialog m-auto max-md:h-dvh max-md:w-screen"
        aria-labelledby="nl-title"
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div data-theme="light" className="relative flex w-full flex-col gap-8 bg-ground p-6 text-ink max-md:h-full max-md:overflow-auto max-md:pt-16 md:w-[560px] md:p-12">
          <button onClick={close} aria-label="Close newsletter" className="absolute right-4 top-4 h-10 w-10 text-3xl leading-none hover:opacity-60 md:right-6 md:top-6">×</button>
          <header className="flex flex-col gap-2">
            <h2 id="nl-title" className="t-h4">Newsletter</h2>
            <p className="t-label-sm caps text-ink-dim">Discover Rust World</p>
          </header>
          {status === "done" ? (
            <p role="status" className="t-body-md">Thank you. You are on the list.</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-8">
              {(
                [
                  ["name", "Name", "text", "Your name"],
                  ["email", "Email", "email", "yourname@domain.com"],
                ] as const
              ).map(([k, label, type, ph]) => (
                <label key={k} className="flex flex-col gap-2">
                  <span className="t-label-sm caps">{label}</span>
                  <input
                    required name={k} type={type} placeholder={ph} autoComplete={k}
                    value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    className="t-body-md border-0 border-b border-rule bg-transparent pb-2 text-ink outline-none placeholder:text-ink-dim focus-visible:border-accent"
                  />
                </label>
              ))}
              {/* TODO(copy): exact legal paragraphs from Figma */}
              <div className="t-caption-xs flex flex-col gap-3 text-ink-dim">
                <p>By subscribing you agree to receive occasional letters from Rust Only about new volumes, works and spaces.</p>
                <p>You can unsubscribe at any time using the link in every email.</p>
              </div>
              <Button type="submit" variant="solid" className="w-full">Subscribe</Button>
            </form>
          )}
        </div>
      </dialog>
    </Ctx.Provider>
  );
}
