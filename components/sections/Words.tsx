export default function Words() {
  return (
    <section className="relative flex justify-center bg-bone px-6 py-32 sm:px-10 lg:py-40">
      <div className="w-full max-w-3xl">
        <div data-reveal className="label-text mb-8 text-deep-brown/60">
          the word
        </div>
        <p
          data-reveal
          className="mb-6 text-[26px] font-semibold leading-[1.15] text-charcoal sm:text-[36px] lg:text-[44px]"
        >
          &ldquo;let the word of Christ dwell in you richly, teaching and
          admonishing one another in all wisdom,{" "}
          <span className="accent-word text-deep-brown">singing</span>{" "}
          psalms and hymns and spiritual songs, with thankfulness in your
          hearts to God.&rdquo;
        </p>
        <p data-reveal className="text-sm tracking-wide text-deep-brown/60">
          &mdash; colossians 3:16
        </p>
      </div>
    </section>
  );
}
