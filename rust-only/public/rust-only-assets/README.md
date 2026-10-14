# Rust Only: real image assets (replace placeholders)

Exported from Figma "Rust Only_Team → Website Design Final". These are the ORIGINAL uploaded image fills: uncropped, with no text baked in. Crop them in code with object-fit / object-position (or next/image fill + sizes). Do not pre-crop the files.

## Instructions for Claude Code

1. Copy the `images/` folder in this zip to `public/images/` (keep the subfolders: artworks/, rooms/, spaces/, objects/, brand/).
2. Find every placeholder image the project currently uses. Search for: `/images/`, `placeholder`, `picsum`, `unsplash`, `placehold`, `via.placeholder`, `.svg` used as photo stand-ins, and the `/content` data files.
3. Swap each placeholder for the real file using the table below. `manifest.json` lists each file's title, artist, pixel size and every Figma layer it fills (`figma_usages` / `slots_by_figma_layer`).
4. Update width/height (or aspect ratios) in next/image to the real dimensions from manifest.json.
5. Update the /content data (works, artists, objects, spaces) so titles and artists match the manifest.
6. Delete placeholders that are no longer referenced. Then run the site and check every page at 390 and 1440 widths.
7. Write anything that didn't map cleanly into TODO.md.

## Where each image goes

| Page / section | File(s) |
|---|---|
| Loader window (states B–D) + Home hero "BEGIN WITH ART" + Mobile nav bg | rooms/room-panelled.jpg |
| Home, statement 1, three cards: 01 ART / 02 SPACE / 03 OBJECT | artworks/dance-of-the-greenshadows-onobrakpeya-2008.jpg / spaces/residential.jpg / objects/object-001.png (transparent PNG) |
| Home, statement 2, curation: THE GATHERING 2 | artworks/the-gathering-2-ogundele.jpg |
| Home, curation: VOLUME I (2×2 mosaic) | artworks/faces-of-the-ancestors-buraimoh.jpg, the-group-onuoha.jpg, feast-at-canaan-onobrakpeya.jpg, vogue-and-style-i-godspower.jpg |
| Home, curation: RESIDENTIAL | spaces/residential-portrait.jpg (+ artworks/patterns-of-kin-wewe.jpg hung in it) |
| Home, marquee "HOVER TO SEE" (tiles 1–9) | see slots "Home page › tile 1…9" in manifest.json (faces-of-the-ancestors, guardian-of-sacred-circle, the-gathering-2, marquee-tile-04, the-procession, feast-at-canaan, object-001, the-drummers, beautiful-faces) |
| Home, origin section (cream, right column) | artworks/the-keeper-of-tradition-buraimoh.jpg |
| Volume, hero "OBJECTS MEANT TO BE KEPT" | rooms/volume-hero.jpg |
| Volume, "VOLUME I / THE GATHERING" mosaic band | artworks/volume-mosaic-01/02/03.jpg + other artworks (see "Volumes › work" slots) |
| Volume, chapter thumbnail (Chapter 01) | artworks/faces-of-the-ancestors-buraimoh.jpg |
| Volume, OBJECTS grid | objects/ancestral-vase-tall.jpg, ancestral-plate.jpg, ancestral-vase-round.jpg, ancestral-box.jpg |
| Chapters 1–4 (right-hand plate) | see slots "chapter 1 › plate" … "Chpter 4 › plate" |
| Chapter details, hero + gallery | see slots "Chapter details Page › Frame 19 / Rectangle 23/24/25" |
| Work detail, in-room hero | rooms/work-detail-in-situ.png (check it has no baked-in UI text; if it does, crop or use rooms/space-frame-23x30.jpg with the artwork composited in CSS) |
| Work detail, main image + carousel + VIEW MORE | artworks/the-keeper-of-tradition-buraimoh, guardian-of-sacred-circle-ogundele, where-spirit-meets-buraimoh, suffering-masses-onobrakpeya, palmwine-woman-onobrakpeya, the-duo-buraimoh |
| Mobile work detail "hung" mockup | rooms/space-frame-23x30.jpg (empty frame; place the artwork inside it with CSS) |
| Spaces, hero + Sterling House | spaces/sterling-house.jpg |
| Spaces, Osborne Studio (commercial) | spaces/osborne-studio.jpg |
| Spaces, other residential projects | spaces/residential.jpg, spaces/residential-portrait.jpg |
| Logo mark (nav, footer ∞, manifesto wax seal) | brand/rust-only-mark.png (raster; recreate as inline SVG for crispness if possible) |

## Notes
- Sizes are mostly 1000–1900px on the long edge. That's fine for cards. Full-bleed heroes (room-panelled, volume-hero, sterling-house) will be soft above about 1200px, so ask the designer for higher-res originals.
- Some captions in the design differ from the file names (e.g. card "01 — ART: Ancestral Gaze · Onuoha · 2025"). Keep the design's caption text, but use these files.
- Optional: convert to AVIF/WebP at build time (next/image does this automatically).
