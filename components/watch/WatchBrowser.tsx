"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { VideoSlide } from "@/lib/sanity/queries";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Pulls the video id out of a youtu.be/watch/embed/shorts url — null if it's not recognizable. */
function toYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.replace("/embed/", "");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.replace("/shorts/", "");
    }
    return null;
  } catch {
    return null;
  }
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

function VideoEmbed({ video }: { video: VideoSlide }) {
  const youTubeId = toYouTubeId(video.href);

  return (
    <div>
      <h3 className="display-md mb-4">
        {video.title} <span className="accent-word text-warm-sage">{video.accent}</span>
      </h3>
      {youTubeId ? (
        <div className="aspect-video w-full overflow-hidden bg-charcoal/40">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}`}
            title={`${video.title} ${video.accent}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        <a
          href={video.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline border-ink/25"
        >
          watch on youtube ↗
        </a>
      )}
      {video.credit ? <p className="mt-4 text-sm leading-relaxed text-muted">{video.credit}</p> : null}
    </div>
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
                    {v.title} {v.accent}
                  </MenuRow>
                ))
              : null}
          </div>
        ))}
      </nav>

      <div>
        {selectedVideo ? (
          <VideoEmbed video={selectedVideo} />
        ) : (
          <div className="space-y-16">
            {byYear.map(([year, yearVideos]) => (
              <div key={year}>
                <p className="label-text mb-6 text-muted">{year}</p>
                <div className="space-y-16">
                  {yearVideos.map((v) => (
                    <VideoEmbed key={v.title} video={v} />
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
