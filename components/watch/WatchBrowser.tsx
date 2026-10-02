"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOV_YOUTUBE_CHANNEL_URL, YOUTUBE_CHANNEL_URL } from "@/lib/links";
import type { VideoSlide } from "@/lib/sanity/queries";

type Channel = VideoSlide["channel"];

const CHANNELS: { value: Channel; label: string; url: string }[] = [
  { value: "onevoice", label: "OneVoice", url: YOUTUBE_CHANNEL_URL },
  { value: "lov", label: "Lift Our Voices", url: LOV_YOUTUBE_CHANNEL_URL },
];

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

  const initialSlug = searchParams.get("video");
  const initialVideo = videos.find((v) => slugify(v.title) === initialSlug) ?? null;
  const initialChannel: Channel =
    (searchParams.get("channel") as Channel | null) ?? initialVideo?.channel ?? videos[0]?.channel ?? "onevoice";

  const [selectedChannel, setSelectedChannel] = useState<Channel>(initialChannel);
  const [selectedVideo, setSelectedVideo] = useState<VideoSlide | null>(initialVideo);
  const [expandedYear, setExpandedYear] = useState<number | null>(initialVideo?.year ?? null);

  const channelVideos = useMemo(
    () => videos.filter((v) => v.channel === selectedChannel),
    [videos, selectedChannel],
  );

  const byYear = useMemo(() => {
    const years = new Map<number, VideoSlide[]>();
    for (const v of channelVideos) {
      if (!years.has(v.year)) years.set(v.year, []);
      years.get(v.year)!.push(v);
    }
    return [...years.entries()].sort(([a], [b]) => b - a);
  }, [channelVideos]);

  const selectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setSelectedVideo(null);
    setExpandedYear(null);
    router.replace(`/watch?channel=${channel}`, { scroll: false });
  };

  const select = (video: VideoSlide) => {
    setSelectedVideo(video);
    router.replace(`/watch?channel=${selectedChannel}&video=${slugify(video.title)}`, { scroll: false });
  };

  const showAll = () => {
    setSelectedVideo(null);
    router.replace(`/watch?channel=${selectedChannel}`, { scroll: false });
  };

  const toggleYear = (year: number) => {
    setExpandedYear((current) => (current === year ? null : year));
  };

  const activeChannelUrl = CHANNELS.find((c) => c.value === selectedChannel)?.url;

  return (
    <div>
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-ink/15">
        <div className="flex gap-8">
          {CHANNELS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => selectChannel(c.value)}
              className={`label-text -mb-px border-b-2 pb-4 transition-colors duration-200 ease-brand ${
                selectedChannel === c.value
                  ? "border-warm-sage text-warm-sage"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        {activeChannelUrl ? (
          <a
            href={activeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-text hidden pb-4 text-muted transition-colors duration-200 ease-brand hover:text-ink sm:inline"
          >
            visit channel ↗
          </a>
        ) : null}
      </div>

      {channelVideos.length === 0 ? (
        <p className="text-muted">No videos here yet — check back soon.</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <nav className="h-fit border border-ink/15 lg:sticky lg:top-24">
            <MenuRow active={selectedVideo === null} onClick={showAll}>
              all
            </MenuRow>
            {byYear.map(([year, yearVideos]) => (
              <div key={`${selectedChannel}-${year}`}>
                <MenuRow onClick={() => toggleYear(year)} chevron={expandedYear === year}>
                  {year}
                </MenuRow>
                {expandedYear === year
                  ? yearVideos.map((v) => (
                      <MenuRow
                        key={v.href}
                        indent
                        active={selectedVideo?.href === v.href}
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
                  <div key={`${selectedChannel}-${year}`}>
                    <p className="label-text mb-6 text-muted">{year}</p>
                    <div className="space-y-16">
                      {yearVideos.map((v) => (
                        <VideoEmbed key={v.href} video={v} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
