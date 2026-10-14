import { Marcellus, Inter, Syne_Mono, IBM_Plex_Mono, Mrs_Saint_Delafield } from "next/font/google";

// TODO(fonts): Memoir is not in /public/fonts. Marcellus (flared, Optima-like) stands in.
// When the files arrive, swap for next/font/local: localFont({ src: "../public/fonts/Memoir.woff2", variable: "--nf-display" })
export const display = Marcellus({ weight: "400", subsets: ["latin"], variable: "--nf-display", display: "swap" });
export const inter = Inter({ subsets: ["latin"], variable: "--nf-inter", display: "swap" });
export const syne = Syne_Mono({ weight: "400", subsets: ["latin"], variable: "--nf-syne", display: "swap" });
export const plex = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--nf-plex", display: "swap" });
// TODO(fonts): signature font name unconfirmed in Figma; placeholder script.
export const signature = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], variable: "--nf-signature", display: "swap" });

export const fontVars = [display, inter, syne, plex, signature].map((f) => f.variable).join(" ");
