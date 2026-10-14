import type { Slot } from "./images";

export type Work = {
  slug: string;
  title: string;
  artist: string; // artist slug
  year: number | null;
  chapter: string; // chapter slug
  /** null = not in the Figma export yet; rendered as an em dash */
  medium: string | null;
  dimensions: string | null;
  availability: string;
  image: Slot;
  alt: string;
};

// TODO(copy): years, mediums and dimensions are only known for The Keeper of Tradition (from the brief)
// and the years in the Figma captions (Faces of the Ancestors 1994, Dance of the Greenshadows 2008).
// Chapter assignment of everything except the chapter plates is my grouping, not Figma's.
const base = { medium: null, dimensions: null, availability: "Inquire to acquire" } as const;

export const works: Work[] = [
  { slug: "the-keeper-of-tradition", title: "The Keeper of Tradition", artist: "jimoh-buraimoh", year: 2012, chapter: "those-who-came-before", ...base, medium: "Mixed media (oil, beads) on canvas", dimensions: "48 × 32 in (122 × 81 cm)", image: "the-keeper-of-tradition-buraimoh", alt: "The Keeper of Tradition" },
  { slug: "faces-of-the-ancestors", title: "Faces of the Ancestors", artist: "jimoh-buraimoh", year: 1994, chapter: "those-who-came-before", ...base, image: "faces-of-the-ancestors-buraimoh", alt: "Faces of the Ancestors" },
  { slug: "where-spirit-meets", title: "Where Spirit Meets", artist: "jimoh-buraimoh", year: null, chapter: "those-who-came-before", ...base, image: "where-spirit-meets-buraimoh", alt: "Where Spirit Meets" },
  { slug: "the-duo", title: "The Duo", artist: "jimoh-buraimoh", year: null, chapter: "those-who-came-before", ...base, image: "the-duo-buraimoh", alt: "The Duo" },
  { slug: "the-gathering-2", title: "The Gathering 2", artist: "rufus-ogundele", year: null, chapter: "those-who-gather", ...base, image: "the-gathering-2-ogundele", alt: "The Gathering 2" },
  { slug: "guardian-of-the-sacred-circle", title: "Guardian of the Sacred Circle", artist: "rufus-ogundele", year: null, chapter: "those-who-gather", ...base, image: "guardian-of-sacred-circle-ogundele", alt: "Guardian of the Sacred Circle" },
  { slug: "patterns-of-kin", title: "Patterns of Kin", artist: "wewe", year: null, chapter: "those-who-gather", ...base, image: "patterns-of-kin-wewe", alt: "Patterns of Kin" },
  { slug: "harmony-of-souls", title: "Harmony of Souls", artist: "wewe", year: null, chapter: "those-who-gather", ...base, image: "harmony-of-souls-wewe", alt: "Harmony of Souls" },
  { slug: "the-group", title: "The Group", artist: "onuoha", year: null, chapter: "those-who-gather", ...base, image: "the-group-onuoha", alt: "The Group" },
  { slug: "feast-at-canaan", title: "Feast at Canaan", artist: "bruce-onobrakpeya", year: null, chapter: "ritual", ...base, image: "feast-at-canaan-onobrakpeya", alt: "Feast at Canaan" },
  { slug: "dance-of-the-greenshadows", title: "Dance of the Greenshadows", artist: "bruce-onobrakpeya", year: 2008, chapter: "ritual", ...base, image: "dance-of-the-greenshadows-onobrakpeya-2008", alt: "Dance of the Greenshadows" },
  { slug: "palmwine-woman", title: "Palmwine Woman", artist: "bruce-onobrakpeya", year: null, chapter: "ritual", ...base, image: "palmwine-woman-onobrakpeya", alt: "Palmwine Woman" },
  { slug: "suffering-masses", title: "Suffering Masses", artist: "bruce-onobrakpeya", year: null, chapter: "ritual", ...base, image: "suffering-masses-onobrakpeya", alt: "Suffering Masses" },
  { slug: "the-procession", title: "The Procession", artist: "onuoha", year: null, chapter: "ritual", ...base, image: "the-procession-onuoha", alt: "The Procession" },
  { slug: "the-drummers", title: "The Drummers", artist: "godspower", year: null, chapter: "ritual", ...base, image: "the-drummers-godspower", alt: "The Drummers" },
  { slug: "vogue-and-style-i", title: "Vogue and Style I", artist: "godspower", year: null, chapter: "those-who-continue", ...base, image: "vogue-and-style-i-godspower", alt: "Vogue and Style I" },
  { slug: "vogue-and-style-ii", title: "Vogue and Style II", artist: "godspower", year: null, chapter: "those-who-continue", ...base, image: "vogue-and-style-ii-godspower", alt: "Vogue and Style II" },
  { slug: "beautiful-faces", title: "Beautiful Faces", artist: "marshal", year: null, chapter: "those-who-continue", ...base, image: "beautiful-faces-marshal", alt: "Beautiful Faces" },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
export const worksInChapter = (chapter: string) => works.filter((w) => w.chapter === chapter);
export const workLabel = (w: Pick<Work, "title" | "year">) => (w.year ? `${w.title}, ${w.year}` : w.title);
