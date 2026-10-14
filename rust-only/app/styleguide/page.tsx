import type { Metadata } from "next";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const colors = ["ground", "surface", "ink", "ink-soft", "ink-dim", "ink-deep", "ink-mark", "accent", "statement", "rule", "rule-soft", "ground-sink"] as const;
const swatch: Record<(typeof colors)[number], string> = {
  ground: "bg-ground", surface: "bg-surface", ink: "bg-ink", "ink-soft": "bg-ink-soft", "ink-dim": "bg-ink-dim",
  "ink-deep": "bg-ink-deep", "ink-mark": "bg-ink-mark", accent: "bg-accent", statement: "bg-statement",
  rule: "bg-rule", "rule-soft": "bg-rule-soft", "ground-sink": "bg-ground-sink",
};
const chapterTones = [["ch-1", "bg-ch-1", "#240802"], ["ch-2", "bg-ch-2", "#3C1E01"], ["ch-3", "bg-ch-3", "#2B1301"], ["ch-4", "bg-ch-4", "#1D140D"], ["paper", "bg-paper", "#ECE7DC (confirm)"]];

const types: [string, string, string, string][] = [
  ["display-lg", "Memoir*", "120 / 36 · 100% · -4%", "Rust Only"],
  ["display-md", "Memoir*", "80 / 44 · 100% · -4%", "Rust Only"],
  ["display-sm", "Memoir*", "52 / 52 · 100% · -4%", "Rust Only"],
  ["h1", "Memoir*", "72 / 28 · 112% · -4%", "Begin with art"],
  ["h2", "Memoir*", "60 / 28 · 110% · -4%", "Those who gather"],
  ["h3", "Memoir*", "48 / 22 · 110% · -4%", "Volume · Spaces"],
  ["h4", "Memoir*", "44 / 32 · 110% · -4%", "Objects meant to be kept"],
  ["h5", "Memoir*", "32 / 22 · 120% · -4%", "Rust Only is an authored house"],
  ["h6", "Memoir*", "24 / 18 · 120% · -2%", "We author worlds meant to be kept"],
  ["body-lg", "Inter", "20 / 20 · 160% · -3%", "Long before museums became the custodians of art and history."],
  ["body-md", "Inter", "16 / 16 · 160% · -2%", "Long before museums became the custodians of art and history."],
  ["body-sm", "Inter", "14 / 14 · 170% · -2%", "Long before museums became the custodians of art and history."],
  ["label-xl", "Syne Mono", "24 / 18 · 135%", "Jimoh Buraimoh"],
  ["label-lg", "Syne Mono", "16 / 16 · 160%", "Jimoh Buraimoh"],
  ["label-md", "Syne Mono", "14 / 14 · 160%", "Jimoh Buraimoh"],
  ["label-sm", "Syne Mono", "12 / 12 · 160%", "Jimoh Buraimoh"],
  ["caption-lg", "IBM Plex Mono", "14 / 16 · 170%", "The Keeper of Tradition, 2012"],
  ["caption-sm", "IBM Plex Mono", "12 / 12 · 160%", "The Keeper of Tradition, 2012"],
  ["caption-xs", "IBM Plex Mono", "10 / 10 · 160%", "The Keeper of Tradition, 2012"],
];

function Palette({ mode }: { mode: "dark" | "light" }) {
  return (
    <section data-theme={mode} className="bg-ground p-6 text-ink md:p-12">
      <h2 className="t-h5 mb-8">{mode} mode</h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {colors.map((c) => (
          <li key={c} className="flex flex-col gap-2">
            <div className={`h-20 border border-rule ${swatch[c]}`} />
            <p className="t-caption-sm">{c}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-2">
        <p className="t-body-md text-ink">ink · The quick brown fox</p>
        <p className="t-body-md text-ink-soft">ink-soft · The quick brown fox</p>
        <p className="t-body-md text-ink-dim">ink-dim · The quick brown fox</p>
        <p className="t-body-md text-ink-deep">ink-deep · The quick brown fox</p>
        <p className="t-body-md text-accent">accent · The quick brown fox</p>
      </div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <main className="bg-ground">
      <header data-theme="dark" className="gutter py-12">
        <h1 className="t-h3">Styleguide</h1>
        <p className="t-caption-sm mt-2 text-ink-dim">Compare against Figma → Foundations: Type scale. *Memoir not installed: Marcellus stands in.</p>
      </header>
      <Palette mode="dark" />
      <Palette mode="light" />
      <section data-theme="dark" className="gutter py-12">
        <h2 className="t-h5 mb-6">Primitives</h2>
        <ul className="flex flex-wrap gap-4">
          {chapterTones.map(([n, cls, hex]) => (
            <li key={n}><div className={`h-20 w-32 border border-rule ${cls}`} /><p className="t-caption-sm mt-2">{n}</p><p className="t-caption-xs text-ink-dim">{hex}</p></li>
          ))}
        </ul>
      </section>
      <section data-theme="dark" className="gutter py-12">
        <h2 className="t-h5 mb-6">Type</h2>
        <ul>
          {types.map(([cls, font, spec, sample]) => (
            <li key={cls} className="grid gap-2 border-t border-rule-soft py-6 md:grid-cols-[14rem_1fr] md:gap-8">
              <div>
                <p className="t-caption-sm text-accent">{cls}</p>
                <p className="t-caption-xs text-ink-dim">{font}</p>
                <p className="t-caption-xs text-ink-dim">{spec}</p>
              </div>
              <div className="space-y-2">
                <p className={`t-${cls}`}>{sample}</p>
                {(cls.startsWith("label") || cls.startsWith("caption")) && <p className={`t-${cls} caps`}>{sample} (caps +16%)</p>}
              </div>
            </li>
          ))}
          <li className="grid gap-2 border-t border-rule-soft py-6 md:grid-cols-[14rem_1fr] md:gap-8">
            <div><p className="t-caption-sm text-accent">signature</p><p className="t-caption-xs text-ink-dim">32 / 18 (font TBC)</p></div>
            <p className="font-signature text-[32px]">With love, Rust Only</p>
          </li>
        </ul>
      </section>
    </main>
  );
}
