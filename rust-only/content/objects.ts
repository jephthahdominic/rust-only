import type { Slot } from "./images";

export type SpaceObject = { slug: string; title: string; medium: string; image: Slot; alt: string };

// Titles from the Figma asset names (Ancestral vase / plate / box, all Acrylic).
export const objects: SpaceObject[] = [
  { slug: "ancestral-vase", title: "Ancestral vase", medium: "Acrylic", image: "ancestral-vase-tall", alt: "Ancestral vase" },
  { slug: "ancestral-plate", title: "Ancestral plate", medium: "Acrylic", image: "ancestral-plate", alt: "Ancestral plate" },
  { slug: "ancestral-vase-round", title: "Ancestral vase", medium: "Acrylic", image: "ancestral-vase-round", alt: "Ancestral vase, round form" },
  { slug: "ancestral-box", title: "Ancestral box", medium: "Acrylic", image: "ancestral-box", alt: "Ancestral box" },
];
