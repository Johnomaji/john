"use client";

import { useState } from "react";
import { Play } from "../icons";

/**
 * Click-to-load YouTube facade. Keeps the iframe (and ~1MB of YouTube JS) out
 * of the initial page so Lighthouse stays green — the thumbnail is just an img.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-paper-sunken ring-1 ring-line ring-inset"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static YouTube CDN thumbnail, no optimisation needed */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-paper/95 text-ink transition-all duration-400 group-hover:scale-110 group-hover:bg-ochre group-hover:text-[#17120a]">
          <Play className="size-7" />
        </span>
      </span>
    </button>
  );
}

/** Shown where a video id hasn't been filled in yet. */
export function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative grid aspect-video w-full place-items-center rounded-[var(--radius-card)] border border-dashed border-line-strong bg-paper-sunken px-6 text-center">
      <div>
        <Play className="mx-auto size-8 text-line-strong" />
        <p className="mt-3 font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
