import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

// Only two weights are used anywhere on the page (400 + 600) — see
// CLAUDE.md's "no more than two font weights per page" rule. Italic is a
// style, not a weight, and is loaded only for the single-accent-word motif.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

// Reserved for labels/eyebrows/buttons only (.label-text) — a distinct
// typeface, not a second weight of the body/display faces.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneVoice — one mind, one voice",
  description:
    "OneVoice is a community of friends leading reverent, honest gospel worship, and walking alongside one another in faith.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Header />
        <SmoothScrollProvider>
          {children}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
