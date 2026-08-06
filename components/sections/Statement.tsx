import PlaceholderImage from "@/components/PlaceholderImage";

const STATEMENT = "some things don't need to shout to be true.";

export default function Statement() {
  return (
    <section
      id="about"
      data-pin-section
      className="relative flex min-h-screen items-center justify-center bg-bone px-6 py-24 sm:px-10 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <div data-reveal className="label-text mb-7 text-deep-brown">
            the statement
          </div>
          <h2
            data-split-heading
            className="max-w-xl text-[32px] font-semibold leading-[1.05] text-charcoal sm:text-[46px] lg:text-[58px]"
          >
            {STATEMENT.split("").map((ch, i) => (
              <span key={i} data-char className="inline-block whitespace-pre">
                {ch}
              </span>
            ))}
          </h2>
          <p
            data-reveal
            className="mt-8 max-w-md text-[17px] leading-[1.65] text-deep-brown/90"
          >
            we&rsquo;re three friends who happened to make an album. these
            are the songs that came out of long nights, longer prayers, and
            the kind of friendship that doesn&rsquo;t need an audience to be
            real.
          </p>
        </div>

        <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <PlaceholderImage
            label="the three of them, unposed"
            variant={1}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
