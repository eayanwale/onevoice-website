"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toLightroomEmbedUrl, type GalleryEvent } from "@/lib/sanity/queries";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ease-brand ${open ? "rotate-90" : ""}`}
    >
      <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuRow({
  active,
  indent,
  onClick,
  children,
  chevron,
}: {
  active?: boolean;
  indent?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  chevron?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label-text flex w-full items-center justify-between gap-3 border-b border-ink/15 px-5 py-4 text-left transition-colors duration-200 last:border-b-0 hover:bg-ink/5 ${
        indent ? "pl-10 text-muted" : ""
      } ${active ? "text-warm-sage" : ""}`}
    >
      <span>{children}</span>
      {chevron !== undefined ? <Chevron open={chevron} /> : null}
    </button>
  );
}

function EventEmbed({ event }: { event: GalleryEvent }) {
  return (
    <div>
      <p className="display-md mb-4">{event.name}</p>
      <div className="relative h-0 w-full overflow-hidden pb-[50%]">
        <iframe
          src={toLightroomEmbedUrl(event.lightroomUrl)}
          title={`${event.name} — Lightroom slideshow`}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <a
        href={event.lightroomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-label mt-4 inline-block text-muted"
      >
        open full gallery ↗
      </a>
    </div>
  );
}

export default function GalleryBrowser({ events }: { events: GalleryEvent[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const initialSlug = searchParams.get("event");
  const initialEvent = events.find((e) => e.slug === initialSlug) ?? null;

  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(initialEvent);
  const [expandedYear, setExpandedYear] = useState<number | null>(initialEvent?.year ?? null);

  const select = (event: GalleryEvent) => {
    setSelectedEvent(event);
    router.replace(`/gallery?event=${event.slug}`, { scroll: false });
  };

  const showAll = () => {
    setSelectedEvent(null);
    router.replace("/gallery", { scroll: false });
  };

  const toggleYear = (year: number) => {
    setExpandedYear((current) => (current === year ? null : year));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
      <nav className="h-fit border border-ink/15 lg:sticky lg:top-24">
        <MenuRow active={selectedEvent === null} onClick={showAll}>
          all
        </MenuRow>
        {evergreen.map((e) => (
          <MenuRow key={e.slug} active={selectedEvent?.slug === e.slug} onClick={() => select(e)}>
            {e.name}
          </MenuRow>
        ))}
        {byYear.map(([year, yearEvents]) => (
          <div key={year}>
            <MenuRow onClick={() => toggleYear(year)} chevron={expandedYear === year}>
              {year}
            </MenuRow>
            {expandedYear === year
              ? yearEvents.map((e) => (
                  <MenuRow
                    key={e.slug}
                    indent
                    active={selectedEvent?.slug === e.slug}
                    onClick={() => select(e)}
                  >
                    {e.name}
                  </MenuRow>
                ))
              : null}
          </div>
        ))}
      </nav>

      <div>
        {selectedEvent ? (
          <EventEmbed event={selectedEvent} />
        ) : (
          <div className="space-y-16">
            {evergreen.map((e) => (
              <EventEmbed key={e.slug} event={e} />
            ))}
            {byYear.map(([year, yearEvents]) => (
              <div key={year}>
                <p className="label-text mb-6 text-muted">{year}</p>
                <div className="space-y-16">
                  {yearEvents.map((e) => (
                    <EventEmbed key={e.slug} event={e} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
