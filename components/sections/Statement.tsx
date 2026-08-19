import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

const WORDS = "one mind. one voice.".split(" ");
const ACCENT_INDEX = WORDS.length - 1;

export default function Statement() {
  return (
    <section
      id="about"
      data-pin-section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bone px-6 py-24 sm:px-10 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <div data-reveal className="label-text mb-7 text-deep-brown">
            the statement
          </div>
          <h2
            data-split-heading
            className="max-w-xl text-[32px] font-semibold leading-[1.05] text-charcoal sm:text-[46px] lg:text-[58px]"
          >
            {WORDS.flatMap((word, wi) => {
              const isAccent = wi === ACCENT_INDEX;
              const wordSpan = (
                <span
                  key={`w-${wi}`}
                  className={`inline-block whitespace-nowrap ${
                    isAccent ? "accent-word text-deep-brown" : ""
                  }`}
                >
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
            established in 2023, we&rsquo;re about ten friends united by
            one purpose: that with one mind and one voice, we might
            glorify God. rooted in Christ, we lead worship at churches
            and events, wherever we&rsquo;re asked — through faith,
            fellowship, and friendship.
          </p>
          <Link
            href="/about"
            data-reveal
            className="mt-8 inline-flex items-center gap-2 border-b border-deep-brown pb-1 text-[14px] font-semibold text-deep-brown transition-opacity duration-200 hover:opacity-70"
          >
            read the full story &rarr;
          </Link>
        </div>

        <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <DuotonePhoto
            src="/images/MNFD6096-.jpg"
            alt="The One Voice collective"
            objectPosition="50% 15%"
            sizes="(min-width: 768px) 480px, 100vw"
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
