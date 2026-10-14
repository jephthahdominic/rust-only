"use client";
import { useEffect } from "react";
import { markHydrated } from "@/lib/hydration";

/** Render once at the top of every page. */
export function Hydrated() {
  useEffect(() => { markHydrated(); }, []);
  return null;
}
