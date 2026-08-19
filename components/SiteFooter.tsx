import Image from "next/image";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import SocialIcon, { type Platform } from "@/components/SocialIcon";

const PAGE_LINKS = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/gallery", label: "gallery" },
  { href: "/store", label: "store" },
  { href: "/connect", label: "connect" },
  { href: "/invite", label: "invite us" },
];

const SOCIAL_LINKS: { href: string; label: Platform }[] = [
  { href: "#", label: "instagram" },
  { href: "#", label: "youtube" },
  { href: "#", label: "spotify" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-off-white">
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-shell px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="label-text text-off-white/50">stay connected</p>
            <h2 className="display-lg mt-5 max-w-lg">
              new music, moments, and where we&rsquo;re singing next.
            </h2>
            <div className="mt-8 max-w-md">
              <EmailSignup />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label-text text-off-white/50">pages</p>
              <ul className="mt-5 space-y-3">
                {PAGE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-off-white/70 transition-colors duration-200 hover:text-off-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-text text-off-white/50">elsewhere</p>
              <ul className="mt-5 space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-off-white/70 transition-colors duration-200 hover:text-off-white"
                    >
                      <SocialIcon platform={link.label} />
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:hello@onev.live"
                    className="text-sm text-off-white/70 transition-colors duration-200 hover:text-off-white"
                  >
                    hello@onev.live
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* three-up bottom bar: copyright left, logo centered, socials right.
            the outer columns share a basis so the logo lands on the true
            center of the bar rather than the center of the leftover space. */}
        <div className="mt-16 flex flex-col items-center gap-6 border-t border-off-white/15 pt-8 sm:flex-row sm:justify-between">
          <p className="label-text order-2 text-off-white/45 sm:order-1 sm:flex-1">
            &copy; 2026 one voice
          </p>

          <Link
            href="/"
            aria-label="One Voice — home"
            className="order-1 shrink-0 transition-opacity duration-200 hover:opacity-80 sm:order-2"
          >
            <Image
              src="/logo/one-voice-lockup-light-trimmed.png"
              alt="One Voice — est. 2023, USA"
              width={981}
              height={405}
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

          <div className="order-3 flex justify-center gap-3 sm:flex-1 sm:justify-end">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex size-11 items-center justify-center rounded-sm border border-off-white/25 text-off-white/70 transition-colors duration-200 hover:bg-off-white/10 hover:text-off-white"
              >
                <SocialIcon platform={link.label} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
