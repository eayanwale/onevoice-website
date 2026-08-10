export default function Words() {
  return (
    <section className="relative flex justify-center bg-bone px-6 py-32 sm:px-10 lg:py-40">
      <div className="w-full max-w-3xl">
        <div data-reveal className="label-text mb-8 text-deep-brown/60">
          field notes &middot; entry 04
        </div>
        <p
          data-reveal
          className="mb-10 text-[26px] font-semibold leading-[1.15] text-charcoal sm:text-[36px] lg:text-[44px]"
        >
          &ldquo;we didn&rsquo;t set out to sound like anything in
          particular. we just kept showing up — same room, same songs,
          until they started sounding like us.&rdquo;
        </p>
        <p data-reveal className="mb-8 text-[17px] leading-[1.7] text-deep-brown/90">
          most of what we do starts in a living room or a church hallway —
          someone humming a harmony, someone else finding the right key.
          we don&rsquo;t rehearse to perform. we rehearse because it&rsquo;s
          how we spend time together. most nights the truest thing
          wasn&rsquo;t a lyric — it was just that we showed up, tired, and
          sang anyway.
        </p>
        <a
          href="#"
          data-reveal
          className="inline-flex items-center gap-2.5 border-b border-charcoal pb-1 text-sm font-semibold text-charcoal transition-opacity duration-200 hover:opacity-70"
        >
          continue reading &rarr;
        </a>
      </div>
    </section>
  );
}
