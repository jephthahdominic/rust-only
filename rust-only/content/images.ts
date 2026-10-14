// Generated from public/rust-only-assets/manifest.json (real Figma exports).
// slot = file name without extension. Dimensions are the real pixel sizes.
export const images = {
  "feast-at-canaan-onobrakpeya": { file: "artworks/feast-at-canaan-onobrakpeya.jpg", width: 1000, height: 663 },
  "object-001": { file: "objects/object-001.png", width: 750, height: 1000 },
  "the-drummers-godspower": { file: "artworks/the-drummers-godspower.jpg", width: 1000, height: 975 },
  "beautiful-faces-marshal": { file: "artworks/beautiful-faces-marshal.jpg", width: 1000, height: 655 },
  "the-keeper-of-tradition-buraimoh": { file: "artworks/the-keeper-of-tradition-buraimoh.jpg", width: 723, height: 1000 },
  "the-gathering-2-ogundele": { file: "artworks/the-gathering-2-ogundele.jpg", width: 838, height: 1000 },
  "faces-of-the-ancestors-buraimoh": { file: "artworks/faces-of-the-ancestors-buraimoh.jpg", width: 1000, height: 889 },
  "the-group-onuoha": { file: "artworks/the-group-onuoha.jpg", width: 964, height: 1000 },
  "vogue-and-style-i-godspower": { file: "artworks/vogue-and-style-i-godspower.jpg", width: 1000, height: 921 },
  "residential-portrait": { file: "spaces/residential-portrait.jpg", width: 1000, height: 558 },
  "patterns-of-kin-wewe": { file: "artworks/patterns-of-kin-wewe.jpg", width: 722, height: 1000 },
  "the-procession-onuoha": { file: "artworks/the-procession-onuoha.jpg", width: 1000, height: 646 },
  "room-panelled": { file: "rooms/room-panelled.jpg", width: 1000, height: 457 },
  "dance-of-the-greenshadows-onobrakpeya-2008": { file: "artworks/dance-of-the-greenshadows-onobrakpeya-2008.jpg", width: 750, height: 1000 },
  "harmony-of-souls-wewe": { file: "artworks/harmony-of-souls-wewe.jpg", width: 1201, height: 997 },
  "residential": { file: "spaces/residential.jpg", width: 1000, height: 558 },
  "vogue-and-style-ii-godspower": { file: "artworks/vogue-and-style-ii-godspower.jpg", width: 1000, height: 780 },
  "volume-hero": { file: "rooms/volume-hero.jpg", width: 1000, height: 558 },
  "ancestral-vase-tall": { file: "objects/ancestral-vase-tall.jpg", width: 768, height: 1376 },
  "ancestral-plate": { file: "objects/ancestral-plate.jpg", width: 1376, height: 768 },
  "sterling-house": { file: "spaces/sterling-house.jpg", width: 1100, height: 614 },
  "osborne-studio": { file: "spaces/osborne-studio.jpg", width: 1100, height: 614 },
  "rust-only-mark": { file: "brand/rust-only-mark.png", width: 1000, height: 683 },
  "space-frame-23x30": { file: "rooms/space-frame-23x30.jpg", width: 1376, height: 768 },
  "the-duo-buraimoh": { file: "artworks/the-duo-buraimoh.jpg", width: 832, height: 1000 },
  "suffering-masses-onobrakpeya": { file: "artworks/suffering-masses-onobrakpeya.jpg", width: 1107, height: 1535 },
  "guardian-of-sacred-circle-ogundele": { file: "artworks/guardian-of-sacred-circle-ogundele.jpg", width: 1000, height: 854 },
  "where-spirit-meets-buraimoh": { file: "artworks/where-spirit-meets-buraimoh.jpg", width: 860, height: 1000 },
  "marquee-tile-04": { file: "artworks/marquee-tile-04.jpg", width: 1000, height: 811 },
  "ancestral-vase-round": { file: "objects/ancestral-vase-round.jpg", width: 1200, height: 896 },
  "ancestral-box": { file: "objects/ancestral-box.jpg", width: 1200, height: 896 },
  "work-detail-in-situ": { file: "rooms/work-detail-in-situ.png", width: 1906, height: 1087 },
  "palmwine-woman-onobrakpeya": { file: "artworks/palmwine-woman-onobrakpeya.jpg", width: 1000, height: 760 },
  "volume-mosaic-01": { file: "artworks/volume-mosaic-01.jpg", width: 771, height: 1000 },
  "volume-mosaic-02": { file: "artworks/volume-mosaic-02.jpg", width: 1000, height: 685 },
  "volume-mosaic-03": { file: "artworks/volume-mosaic-03.jpg", width: 1000, height: 738 },
} as const;

export type Slot = keyof typeof images;

/** Intrinsic size of an image (real pixel dimensions). */
export function slotSize(slot: Slot) {
  const { width, height } = images[slot];
  return { width, height, ratio: width / height };
}

export const src = (slot: Slot) => `/images/${images[slot].file}`;
