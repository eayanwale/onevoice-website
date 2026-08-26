"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DuotonePhoto from "@/components/DuotonePhoto";
import type { VideoSlide } from "@/lib/sanity/queries";

const THUMB_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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

function VideoCard({ video }: { video: VideoSlide }) {
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      className="group relative block overflow-hidden"
    >
      <DuotonePhoto
        src={video.image}
        alt={`OneVoice — ${video.title} ${video.accent}`}
        sizes={THUMB_SIZES}
        objectPosition={video.objectPosition}
        className="aspect-video w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <h3 className="display-md text-off-white">
          {video.title} <span className="accent-word text-warm-sage">{video.accent}</span>
        </h3>
        {video.duration ? (
          <span className="label-text mt-2 block text-off-white/60">{video.duration}</span>
        ) : null}
      </div>
    </a>
  );
}

export default function WatchBrowser({ videos }: { videos: VideoSlide[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const byYear = useMemo(() => {
    const years = new Map<number, VideoSlide[]>();
    for (const v of videos) {
      if (!years.has(v.year)) years.set(v.year, []);
      years.get(v.year)!.push(v);
    }
    return [...years.entries()].sort(([a], [b]) => b - a);
  }, [videos]);

  const initialSlug = searchParams.get("video");
  const initialVideo = videos.find((v) => slugify(v.title) === initialSlug) ?? null;

  const [selectedVideo, setSelectedVideo] = useState<VideoSlide | null>(initialVideo);
  const [expandedYear, setExpandedYear] = useState<number | null>(initialVideo?.year ?? null);

  const select = (video: VideoSlide) => {
    setSelectedVideo(video);
    router.replace(`/watch?video=${slugify(video.title)}`, { scroll: false });
  };

  const showAll = () => {
    setSelectedVideo(null);
    router.replace("/watch", { scroll: false });
  };

  const toggleYear = (year: number) => {
    setExpandedYear((current) => (current === year ? null : year));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
      <nav className="h-fit border border-ink/15 lg:sticky lg:top-24">
        <MenuRow active={selectedVideo === null} onClick={showAll}>
          all
        </MenuRow>
        {byYear.map(([year, yearVideos]) => (
          <div key={year}>
            <MenuRow onClick={() => toggleYear(year)} chevron={expandedYear === year}>
              {year}
            </MenuRow>
            {expandedYear === year
              ? yearVideos.map((v) => (
                  <MenuRow
                    key={v.title}
                    indent
                    active={selectedVideo?.title === v.title}
                    onClick={() => select(v)}
                  >
                    {v.title}
                  </MenuRow>
                ))
              : null}
          </div>
        ))}
      </nav>

      <div>
        {selectedVideo ? (
          <div className="max-w-md">
            <VideoCard video={selectedVideo} />
          </div>
        ) : (
          <div className="space-y-12">
            {byYear.map(([year, yearVideos]) => (
              <div key={year}>
                <p className="label-text mb-4 text-muted">{year}</p>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {yearVideos.map((v) => (
                    <VideoCard key={v.title} video={v} />
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
