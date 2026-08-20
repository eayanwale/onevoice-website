import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

const HEADING = "We’d rather be one unified voice than ten separate ones.";

export default function Statement() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="mx-auto grid max-w-shell items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div data-reveal className="relative aspect-[4/5] w-full overflow-hidden">
          <DuotonePhoto
            src="/images/MNFD6096-.jpg"
            alt="The One Voice collective"
            objectPosition="50% 15%"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="h-full w-full"
          />
        </div>

        <div>
          <p data-reveal className="label-text text-warm-sage">
            est. 2023
          </p>
          <h2 data-split-heading className="display-lg mt-6 max-w-xl">
            {HEADING.split(" ").flatMap((word, wi, arr) => {
              const wordSpan = (
                <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
                  {word.split("").map((ch, ci) => (
                    <span key={ci} data-char className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              );
              return wi < arr.length - 1 ? [wordSpan, " "] : [wordSpan];
            })}
          </h2>
          <p data-reveal className="mt-8 max-w-xl leading-relaxed text-muted">
            Honestly, ten voices is a lot of opinions. We rehearse, we
            disagree, we get easily sidetracked &mdash; yet somewhere in all
            of that comes something singular and true. That&rsquo;s the part
            we love most, and the part we especially want to share with you.
          </p>
          <Link href="/about" data-reveal className="link-label mt-9">
            read the full story ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
