import { content, videos } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { ButtonLink } from "../ui/button";
import { VideoPlaceholder, YouTubeEmbed } from "../ui/youtube-embed";
import { ArrowUpRight } from "../icons";

export function Content() {
  if (videos.length === 0) return null;

  return (
    <Section
      id="content"
      index={sectionIndex.content}
      eyebrow={content.eyebrow}
      tone="sunken"
      title={content.title}
      intro={content.intro}
      action={
        content.channelHref ? (
          <a
            href={content.channelHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-ochre-ink"
          >
            {content.ctaLabel}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null
      }
    >
      <ul className="grid gap-7 md:grid-cols-3">
        {videos.map((video, i) => (
          <Reveal as="li" key={video.id} delay={i * 0.08}>
            <article className="group">
              {video.youtubeId ? (
                <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} />
              ) : (
                <VideoPlaceholder label="Add a YouTube id" />
              )}
              <h3 className="mt-5 text-lg leading-snug transition-colors duration-300 group-hover:text-ochre-ink">
                {video.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {video.description}
              </p>
              {video.duration && (
                <p className="mt-3 font-mono text-xs text-muted">
                  {video.duration}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </ul>

      {content.channelHref && (
        <Reveal>
          <div className="mt-12 flex justify-center sm:hidden">
            <ButtonLink href={content.channelHref} variant="outline" size="lg">
              {content.ctaLabel}
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
