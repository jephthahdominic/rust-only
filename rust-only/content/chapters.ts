import type { Slot } from "./images";

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  keywords: string[];
  /** Figma primitive used for the panel background */
  tone: 1 | 2 | 3 | 4;
  featuredWork: string; // work slug shown on the chapter panel + detail hero
  image: Slot;
};

// Plates per Figma: ch1 Faces of the Ancestors, ch2 The Gathering 2, ch3 Feast at Canaan, ch4 Vogue and Style I.
// TODO(copy): the brief names "Ade Odunowo" for chapter 4 but the Figma plate is Godspower's Vogue and Style I.
export const chapters: Chapter[] = [
  { slug: "those-who-came-before", number: 1, title: "Those who came before", keywords: ["Ancestors", "Lineage", "Inheritance"], tone: 1, featuredWork: "faces-of-the-ancestors", image: "faces-of-the-ancestors-buraimoh" },
  { slug: "those-who-gather", number: 2, title: "Those who gather", keywords: ["Family", "Kin", "Community", "Bonds"], tone: 2, featuredWork: "the-gathering-2", image: "the-gathering-2-ogundele" },
  { slug: "ritual", number: 3, title: "Ritual", keywords: ["Dance", "Music", "Feast", "Ceremony"], tone: 3, featuredWork: "feast-at-canaan", image: "feast-at-canaan-onobrakpeya" },
  { slug: "those-who-continue", number: 4, title: "Those who continue", keywords: ["Continuity", "Expression", "The Present"], tone: 4, featuredWork: "vogue-and-style-i", image: "vogue-and-style-i-godspower" },
];

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
export const pad = (n: number) => String(n).padStart(2, "0");
