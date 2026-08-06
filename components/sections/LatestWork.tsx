import DuotonePhoto from "@/components/DuotonePhoto";

const YOUTUBE_URL = "https://youtu.be/MdD71CNCSEw";

export default function LatestWork() {
  return (
    <section id="music" className="relative overflow-hidden bg-charcoal scroll-mt-16 sm:scroll-mt-[76px]">
      <div className="relative h-[72vh] w-full overflow-hidden">
        <DuotonePhoto
          src="/images/lov-youtube-cover.jpg"
          alt="One Voice — praise &amp; worship mashup, live at Lift Our Voices"
          parallax
          objectPosition="50% 40%"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.86) 0%, rgba(71,50,55,0.35) 45%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-20 pt-14 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <div data-reveal className="label-text text-warm-sage">
            on youtube &middot; lift our voices 2026
          </div>
          <h3
            data-reveal
            className="text-[40px] font-semibold leading-[0.95] text-off-white sm:text-[64px] lg:text-[88px]"
          >
            praise &amp; worship mashup
          </h3>
          <p data-reveal className="max-w-lg text-base leading-[1.6] text-off-white/70">
            six songs, sung together, live: holy forever, king of heaven,
            that great name, to our god, baruch hashem adonai, and good good
            father.
          </p>
          <div
            data-reveal
            className="mt-4 flex flex-wrap items-center gap-7"
          >
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-warm-sage py-2 pl-2 pr-6 font-display text-sm font-semibold text-charcoal transition-opacity duration-200 hover:opacity-70"
            >
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <circle cx="15" cy="15" r="14" fill="#1A1A1A" />
                <path d="M12 10L20 15L12 20V10Z" fill="#BEB7A7" />
              </svg>
              watch
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70"
            >
              youtube
            </a>
            <a href="#" className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70">
              instagram
            </a>
            <span className="label-text ml-auto text-off-white/40">
              30 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
