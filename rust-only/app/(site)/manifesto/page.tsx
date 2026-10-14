import { Hydrated } from "@/components/Hydrated";
import type { Metadata } from "next";
import { EnvelopeLetter } from "@/components/EnvelopeLetter";

export const metadata: Metadata = { title: "Manifesto" };

export default function ManifestoPage() {
  return (
    <div data-theme="light" className="bg-paper pt-14 text-ink">
      <Hydrated />
      <h1 className="sr-only">Manifesto: Room of Wonder</h1>
      <EnvelopeLetter />
    </div>
  );
}
