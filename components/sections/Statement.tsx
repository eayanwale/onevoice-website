import DuotonePhoto from "@/components/DuotonePhoto";

const WORDS = "some things don't need to shout to be true.".split(" ");

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
            {WORDS.flatMap((word, wi) => {
              const wordSpan = (
                <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
                  {word.split("").map((ch, ci) => (
                    <span key={ci} data-char className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              );
              return wi < WORDS.length - 1 ? [wordSpan, " "] : [wordSpan];
            })}
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
          <DuotonePhoto
            src="/images/MNFD6096-.jpg"
            alt="The One Voice collective"
            objectPosition="50% 15%"
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
