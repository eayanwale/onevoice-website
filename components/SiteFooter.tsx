import Image from "next/image";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

const PAGE_LINKS = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/gallery", label: "gallery" },
  { href: "/store", label: "store" },
  { href: "/connect", label: "connect" },
  { href: "/invite", label: "invite us" },
];

const SOCIAL_LINKS = [
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
                      className="text-sm text-off-white/70 transition-colors duration-200 hover:text-off-white"
                    >
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

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-off-white/15 pt-8">
          <Image
            src="/logo/one-voice-lockup-light-trimmed.png"
            alt="One Voice — est. 2023, USA"
            width={981}
            height={405}
            className="h-6 w-auto object-contain"
          />
          <p className="label-text text-off-white/45">
            &copy; 2026 one voice &middot; one mind. one voice.
          </p>
        </div>
      </div>
    </footer>
  );
}
