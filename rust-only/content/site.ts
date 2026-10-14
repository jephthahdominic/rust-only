import type { Slot } from "./images";

export const nav = [
  { label: "Volume", href: "/volume/the-gathering" },
  { label: "Space", href: "/spaces" },
  { label: "Manifesto", href: "/manifesto" },
] as const;

export const footerLinks = [
  { label: "Volume", href: "/volume/the-gathering" },
  { label: "Spaces", href: "/spaces" },
  { label: "Manifesto", href: "/manifesto" },
] as const;

// TODO(copy): social URLs
export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
] as const;

export const origin = {
  title: "RUST WORLD BEGINS WITH ORIGINAL WORKS OF ART.",
  body: "In the 16th century, long before museums became the custodians of art and history, some people believed that the world could be understood through careful acts of keeping. They devoted entire rooms of their homes to what would become known as the Wunderkammer.",
  link: "TO THOSE WHO KEEP",
};

// Tile order per Figma "Home page › tile 1…9"
export const marquee: { slot: Slot; alt: string; fit?: "contain" }[] = [
  { slot: "faces-of-the-ancestors-buraimoh", alt: "Faces of the Ancestors" },
  { slot: "guardian-of-sacred-circle-ogundele", alt: "Guardian of the Sacred Circle" },
  { slot: "the-gathering-2-ogundele", alt: "The Gathering 2" },
  { slot: "marquee-tile-04", alt: "Untitled artwork" },
  { slot: "the-procession-onuoha", alt: "The Procession" },
  { slot: "feast-at-canaan-onobrakpeya", alt: "Feast at Canaan" },
  { slot: "object-001", alt: "The Gathering, Object 001", fit: "contain" },
  { slot: "the-drummers-godspower", alt: "The Drummers" },
  { slot: "beautiful-faces-marshal", alt: "Beautiful Faces" },
];
