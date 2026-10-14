export type Artist = { slug: string; name: string; bio: string[]; stub?: boolean };

// TODO(copy): artist bios come from Figma. Only the facts named in the brief are used for Buraimoh.
export const artists: Artist[] = [
  {
    slug: "jimoh-buraimoh",
    name: "Jimoh Buraimoh",
    bio: [
      "Jimoh Buraimoh is a leading figure of the Osogbo School, known for bead painting: a practice that sets glass beads and oil into canvas to build images of ritual, community and ancestry.",
      "His work is held in public collections including the Smithsonian National Museum of African Art.",
    ],
    stub: true,
  },
  { slug: "rufus-ogundele", name: "Rufus Ogundele", bio: ["Biography to come from Figma."], stub: true },
  { slug: "bruce-onobrakpeya", name: "Bruce Onobrakpeya", bio: ["Biography to come from Figma."], stub: true },
  // TODO(copy): given name
  { slug: "onuoha", name: "Onuoha", bio: ["Biography to come from Figma."], stub: true },
  // TODO(copy): given name
  { slug: "godspower", name: "Godspower", bio: ["Biography to come from Figma."], stub: true },
  { slug: "wewe", name: "Wewe", bio: ["Biography to come from Figma."], stub: true },
  { slug: "marshal", name: "Marshal", bio: ["Biography to come from Figma."], stub: true },
];

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug)!;
