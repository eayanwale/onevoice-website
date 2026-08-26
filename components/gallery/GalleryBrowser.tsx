"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DuotonePhoto from "@/components/DuotonePhoto";
import type { GalleryEvent, GalleryPhoto } from "@/lib/sanity/queries";

const PHOTO_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label-text rounded-sm border px-4 py-2 transition-colors duration-200 ${
        active
          ? "border-warm-sage bg-warm-sage text-charcoal"
          : "border-ink/25 text-ink/70 hover:border-warm-sage hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function GalleryBrowser({
  events,
  photos,
}: {
  events: GalleryEvent[];
  photos: GalleryPhoto[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get("event") ?? "all");

  const evergreen = useMemo(() => events.filter((e) => e.year === undefined), [events]);
  const byYear = useMemo(() => {
    const years = new Map<number, GalleryEvent[]>();
    for (const e of events) {
      if (e.year === undefined) continue;
      if (!years.has(e.year)) years.set(e.year, []);
      years.get(e.year)!.push(e);
    }
    return [...years.entries()].sort(([a], [b]) => a - b);
  }, [events]);

  const select = (slug: string) => {
    setActive(slug);
    router.replace(slug === "all" ? "/gallery" : `/gallery?event=${slug}`, { scroll: false });
  };

  const visiblePhotos = active === "all" ? photos : photos.filter((p) => p.eventSlug === active);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={active === "all"} onClick={() => select("all")}>
            all
          </FilterChip>
          {evergreen.map((e) => (
            <FilterChip key={e.slug} active={active === e.slug} onClick={() => select(e.slug)}>
              {e.name}
            </FilterChip>
          ))}
        </div>
        {byYear.map(([year, yearEvents]) => (
          <div key={year} className="flex flex-wrap items-center gap-2">
            <span className="label-text mr-1 text-ink/45">{year}</span>
            {yearEvents.map((e) => (
              <FilterChip key={e.slug} active={active === e.slug} onClick={() => select(e.slug)}>
                {e.name}
              </FilterChip>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visiblePhotos.map((photo) => (
          <div
            key={photo.src}
            data-reveal
            className="group relative break-inside-avoid overflow-hidden"
          >
            <DuotonePhoto
              src={photo.src}
              alt={photo.alt}
              sizes={PHOTO_SIZES}
              className={`w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03] ${
                photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
