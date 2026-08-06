import PlaceholderImage from "@/components/PlaceholderImage";

export default function LatestWork() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="relative h-[72vh] w-full overflow-hidden">
        <PlaceholderImage
          label="cover art — three friends, backlit, wide frame"
          variant={2}
          parallax
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
            new release &middot; out now
          </div>
          <h3
            data-reveal
            className="text-[40px] font-semibold leading-[0.95] text-off-white sm:text-[64px] lg:text-[88px]"
          >
            into the quiet
          </h3>
          <p data-reveal className="max-w-lg text-base leading-[1.6] text-off-white/70">
            eight songs written in the space between doubt and morning.
          </p>
          <div
            data-reveal
            className="mt-4 flex flex-wrap items-center gap-7"
          >
            <a
              href="#"
              className="flex items-center gap-2.5 rounded-full bg-warm-sage py-2 pl-2 pr-4.5 font-display text-sm font-semibold text-charcoal transition-opacity duration-200 hover:opacity-70"
            >
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <circle cx="15" cy="15" r="14" fill="#1A1A1A" />
                <path d="M12 10L20 15L12 20V10Z" fill="#BEB7A7" />
              </svg>
              play
            </a>
            <a href="#" className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70">
              spotify
            </a>
            <a href="#" className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70">
              apple music
            </a>
            <a href="#" className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70">
              youtube music
            </a>
            <span className="label-text ml-auto text-off-white/40">
              01 / 08
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
