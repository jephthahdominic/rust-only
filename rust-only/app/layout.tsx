import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import { MotionProvider } from "@/components/MotionProvider";
import { NewsletterProvider } from "@/components/Newsletter";
import { Loader } from "@/components/Loader";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Rust Only", template: "%s — Rust Only" },
  description: "Rust Only is an authored house that brings together one-of-one works of art.",
};

// Runs before paint. motion-ok: JS + no reduced-motion (enables reveal initial states).
// loader-on: first visit this session (loader shows, scroll locked); loader-skip otherwise.
// In dev, ?loader=replay plays it again, and ?loader=A|B|C|D freezes a keyframe (both bypass the session flag).
const dev = process.env.NODE_ENV !== "production";
const bootstrap = `(function(){var d=document.documentElement;try{
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-ok');
var seen=sessionStorage.getItem('ro-loader')${dev ? "&&!/[?&]loader=(replay|[ABCD])/.test(location.search)" : ""};
d.classList.add(seen?'loader-skip':'loader-on');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVars} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;clip-path:none!important}`}</style></noscript>
      </head>
      <body>
        <NewsletterProvider>
          <Loader />
          <MotionProvider>{children}</MotionProvider>
        </NewsletterProvider>
      </body>
    </html>
  );
}
