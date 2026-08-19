import type { ReactNode } from "react";
import DuotonePhoto, { HERO_FILTER } from "@/components/DuotonePhoto";

type PageHeroProps = {
  overline: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  /** Override the lead's measure — e.g. to hold a short lead on one line. */
  leadClassName?: string;
  children?: ReactNode;
};

export default function PageHero({
  overline,
  title,
  lead,
  image,
  imageAlt = "",
  objectPosition,
  leadClassName = "max-w-xl",
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[68svh] items-end overflow-hidden bg-charcoal pt-32">
      {image ? (
        <div className="absolute inset-0">
          <DuotonePhoto
            src={image}
            alt={imageAlt}
            priority
            objectPosition={objectPosition}
            filter={HERO_FILTER}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/75" />
        </div>
      ) : null}
      <div className="grain" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-shell px-5 pb-16 sm:px-8 sm:pb-20">
        <p data-reveal className="label-text text-warm-sage">
          {overline}
        </p>
        <h1 data-reveal className="display-xl mt-6 max-w-4xl text-off-white">
          {title}
        </h1>
        {lead ? (
          <p data-reveal className={`mt-7 leading-relaxed text-off-white/70 ${leadClassName}`}>
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
