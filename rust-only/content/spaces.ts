import type { Slot } from "./images";

export type Project = { slug: string; name: string; type: string; city: string; year: number; image: Slot; alt: string };

// Names/meta read from the Figma Spaces reference screenshot.
// TODO(copy): confirm project years/types against Figma; project detail pages don't exist.
export const projects: Project[] = [
  { slug: "sterling-house", name: "Sterling House", type: "Private Residence", city: "Lagos", year: 2026, image: "sterling-house", alt: "Sterling House, a private residence in Lagos" },
  { slug: "osborne-studio", name: "Osborne Studio", type: "Commercial", city: "Lagos", year: 2026, image: "osborne-studio", alt: "Osborne Studio, a commercial space in Lagos" },
  { slug: "glover-pavilion", name: "Glover Pavilion", type: "Private Residence", city: "Lagos", year: 2023, image: "room-panelled", alt: "Glover Pavilion: a wood-panelled room with a painting" },
  { slug: "bourdillon-retreat", name: "Bourdillon Retreat", type: "Private Residence", city: "Lagos", year: 2024, image: "residential-portrait", alt: "Bourdillon Retreat: an empty frame above a console" },
  { slug: "alexander-villa", name: "Alexander Villa", type: "Private Residence", city: "Lagos", year: 2024, image: "residential", alt: "Alexander Villa: a living room with an empty frame" },
];
