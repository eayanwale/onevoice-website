import Image from "next/image";
import DuotonePhoto from "@/components/DuotonePhoto";

const YOUTUBE_URL = "https://youtu.be/MdD71CNCSEw";

const SOCIALS = [
  { label: "youtube", href: YOUTUBE_URL },
  { label: "instagram", href: "#" },
  { label: "spotify", href: "#" },
];

export default function LatestWork() {
  return (
    <section
      id="music"
      className="relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <Image
        src="/images/grass.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/85 to-charcoal" />
      <div className="grain" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-shell items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal className="relative aspect-square w-full overflow-hidden">
          <DuotonePhoto
            src="/images/lov-youtube-cover.jpg"
            alt="One Voice — praise & worship mashup, live at Lift Our Voices 2026"
            objectPosition="50% 40%"
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-full w-full"
          />
        </div>

        <div>
          <p data-reveal className="label-text text-warm-sage">
            the latest sound · lift our voices 2026
          </p>
          <h2 data-reveal className="display-lg mt-6 max-w-lg">
            praise &amp; <span className="accent-word text-warm-sage">worship</span> mashup.
          </h2>
          <p data-reveal className="mt-7 max-w-lg leading-relaxed text-muted">
            six songs, sung together, live: holy forever, king of heaven, that
            great name, to our god, baruch hashem adonai, and good good father.
            new music lands on the platforms below first.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
            >
              watch ↗
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-off-white"
              >
                {s.label} ↗
              </a>
            ))}
            <span className="label-text ml-auto text-off-white/40">30 min</span>
          </div>
        </div>
      </div>
    </section>
  );
}
