import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";
import {
  YOUTUBE_VIDEO_URL,
  YOUTUBE_CHANNEL_URL,
  INSTAGRAM_URL,
  SPOTIFY_URL,
  isExternal,
} from "@/lib/links";

// "watch" goes to the set itself; these go to the profiles.
const SOCIALS = [
  { label: "youtube", href: YOUTUBE_CHANNEL_URL },
  { label: "instagram", href: INSTAGRAM_URL },
  { label: "spotify", href: SPOTIFY_URL },
];

export default function LatestWork() {
  return (
    <section
      id="music"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <DuotonePhoto
          src="/images/lov-youtube-cover.jpg"
          alt="OneVoice — praise & worship mashup, live at Lift Our Voices 2026"
          parallax
          objectPosition="50% 40%"
          className="absolute inset-x-0 -top-[25%] h-[150%] w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.94) 0%, rgba(71,50,55,0.55) 38%, rgba(26,26,26,0.25) 68%, rgba(26,26,26,0.45) 100%)",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-20 pt-28 sm:px-8 sm:pb-28">
        <p data-reveal className="label-text text-warm-sage">
          watch us · lift our voices 2026
        </p>
        <h2 data-reveal className="display-lg mt-6 max-w-2xl text-off-white">
          Praise &amp; <span className="accent-word text-warm-sage">worship</span> mashup.
        </h2>
        <p data-reveal className="mt-7 max-w-lg leading-relaxed text-off-white/70">
          Holy Forever. King of Heaven. That Great Name. To Our God.
          Baruch HaShem Adonai. Good Good Father.
        </p>
        <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={YOUTUBE_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid"
          >
            watch ↗
          </a>
          {SOCIALS.map((s) =>
            isExternal(s.href) ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-off-white/30 text-off-white"
              >
                {s.label} ↗
              </a>
            ) : (
              <Link
                key={s.label}
                href={s.href}
                className="btn-outline border-off-white/30 text-off-white"
              >
                {s.label} ↗
              </Link>
            )
          )}
          <span className="label-text ml-auto text-off-white/40">30 min</span>
        </div>
      </div>
    </section>
  );
}
