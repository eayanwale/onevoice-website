"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { GalleryEvent } from "@/lib/sanity/queries";

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

function EventCard({ event }: { event: GalleryEvent }) {
  return (
    <a
      href={event.lightroomUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-ink/15 p-6 transition-colors duration-200 hover:border-warm-sage"
    >
      <span className="display-md block transition-colors duration-200 group-hover:text-warm-sage">
        {event.name}
      </span>
      <span className="link-label mt-4 inline-block text-muted">view gallery ↗</span>
    </a>
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
      <nav className="h-fit border border-ink/15">
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
          <div className="max-w-md">
            <EventCard event={selectedEvent} />
          </div>
        ) : (
          <div className="space-y-12">
            {evergreen.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {evergreen.map((e) => (
                  <EventCard key={e.slug} event={e} />
                ))}
              </div>
            ) : null}
            {byYear.map(([year, yearEvents]) => (
              <div key={year}>
                <p className="label-text mb-4 text-muted">{year}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {yearEvents.map((e) => (
                    <EventCard key={e.slug} event={e} />
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
