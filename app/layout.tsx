import type { Metadata } from "next";
import { Instrument_Sans, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";

// Only two weights are used anywhere on the page (400 + 600) — see
// CLAUDE.md's "no more than two font weights per page" rule.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Voice — three friends, one mission",
  description:
    "One Voice is a gospel music collective making honest music and visuals. Three friends, no noise — just what's true.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrument.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
