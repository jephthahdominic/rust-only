import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", variant = "outline", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "solid" }) {
  const v =
    variant === "solid"
      ? "bg-statement text-ink-mark hover:opacity-90"
      : "border border-ink text-ink hover:bg-ink hover:text-ground";
  return (
    <button
      {...p}
      className={`t-label-sm caps inline-flex h-12 items-center justify-center px-8 transition-[background,color,opacity] duration-700 ease-slow ${v} ${className}`}
    />
  );
}
