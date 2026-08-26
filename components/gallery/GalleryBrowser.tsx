"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toLightroomEmbedUrl, type GalleryEvent } from "@/lib/sanity/queries";

function OptionLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="group block text-left">
      <span className="display-md inline-block transition-colors duration-200 ease-brand group-hover:text-warm-sage">
        {children}
      </span>
    </button>
  );
}

function BackLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="link-label mb-8 text-muted">
      {children}
    </button>
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

  const [selectedYear, setSelectedYear] = useState<number | null>(initialEvent?.year ?? null);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(initialEvent);

  const chooseEvent = (event: GalleryEvent) => {
    setSelectedEvent(event);
    router.replace(`/gallery?event=${event.slug}`, { scroll: false });
  };

  const backToTop = () => {
    setSelectedYear(null);
    setSelectedEvent(null);
    router.replace("/gallery", { scroll: false });
  };

  const backToYear = () => {
    setSelectedEvent(null);
    router.replace("/gallery", { scroll: false });
  };

  if (selectedEvent) {
    return (
      <div>
        <BackLink onClick={selectedEvent.year === undefined ? backToTop : backToYear}>
          ← back
        </BackLink>
        <h3 className="display-md mb-8">{selectedEvent.name}</h3>
        <div className="relative w-full overflow-hidden bg-charcoal/40">
          <iframe
            src={toLightroomEmbedUrl(selectedEvent.lightroomUrl)}
            title={`${selectedEvent.name} — Lightroom gallery`}
            loading="lazy"
            allow="fullscreen"
            className="h-[500px] w-full border-0 sm:h-[650px] lg:h-[750px]"
          />
        </div>
        <a
          href={selectedEvent.lightroomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-label mt-6 inline-block text-muted"
        >
          open full gallery ↗
        </a>
      </div>
    );
  }

  if (selectedYear !== null) {
    const yearEvents = byYear.find(([y]) => y === selectedYear)?.[1] ?? [];
    return (
      <div>
        <BackLink onClick={backToTop}>← all years</BackLink>
        <div className="flex flex-col gap-3">
          {yearEvents.map((e) => (
            <OptionLink key={e.slug} onClick={() => chooseEvent(e)}>
              {e.name}
            </OptionLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {evergreen.map((e) => (
        <OptionLink key={e.slug} onClick={() => chooseEvent(e)}>
          {e.name}
        </OptionLink>
      ))}
      {byYear.map(([year]) => (
        <OptionLink key={year} onClick={() => setSelectedYear(year)}>
          {year}
        </OptionLink>
      ))}
    </div>
  );
}
