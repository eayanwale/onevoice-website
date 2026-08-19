import type { ReactNode } from "react";
import DuotonePhoto from "@/components/DuotonePhoto";

type PageHeroProps = {
  overline: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
  children?: ReactNode;
};

export default function PageHero({
  overline,
  title,
  lead,
  image,
  imageAlt = "",
  objectPosition,
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-charcoal pt-32">
      {image ? (
        <div className="absolute inset-0">
          <DuotonePhoto
            src={image}
            alt={imageAlt}
            priority
            objectPosition={objectPosition}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/75" />
        </div>
      ) : (
        <div className="grain" aria-hidden="true" />
      )}
      <div className="relative w-full px-6 pb-16 sm:px-10 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="label-text text-warm-sage">
            {overline}
          </div>
          <h1
            data-reveal
            className="mt-6 max-w-3xl text-[34px] font-semibold leading-[1.05] text-off-white sm:text-[50px] lg:text-[58px]"
          >
            {title}
          </h1>
          {lead ? (
            <p data-reveal className="mt-7 max-w-xl text-[16px] leading-[1.6] text-off-white/70">
              {lead}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
