import {
  Bot,
  Cpu,
  ExternalLink,
  Layers,
  Play,
  Rocket,
  type LucideIcon,
} from "lucide-react";

type Video = {
  title: string;
  eyebrow: string;
  description: string;
  videoId: string;
  duration: string;
  highlight: string;
  icon: LucideIcon;
};

const videos: Video[] = [
  {
    title: "Calipers Product Walkthrough",
    eyebrow: "PRODUCT DEMO",
    description:
      "A guided tour of the platform layer for GenAI apps, workflow automation, model operations, and analytics.",
    videoId: "REPLACE_WITH_PRODUCT_DEMO_ID",
    duration: "04:18",
    highlight: "Unified product stack",
    icon: Layers,
  },
  {
    title: "From Prototype To Production",
    eyebrow: "CAPABILITIES",
    description:
      "How our team ships AI products with evaluation loops, release gates, observability, and governance built in.",
    videoId: "REPLACE_WITH_CAPABILITIES_ID",
    duration: "06:42",
    highlight: "Build, test, deploy",
    icon: Rocket,
  },
  {
    title: "Automation Workflows In Action",
    eyebrow: "LIVE USE CASE",
    description:
      "See how operators turn manual handoffs into reliable automated workflows powered by applied AI agents.",
    videoId: "REPLACE_WITH_WORKFLOWS_ID",
    duration: "03:55",
    highlight: "AI-powered operations",
    icon: Bot,
  },
  {
    title: "Inside The Calipers GenAI Stack",
    eyebrow: "ARCHITECTURE",
    description:
      "An engineering deep-dive into the retrieval, evaluation, observability, and safety layers powering customer deployments.",
    videoId: "REPLACE_WITH_ARCHITECTURE_ID",
    duration: "08:10",
    highlight: "Engineering deep-dive",
    icon: Cpu,
  },
];

const youtubeEmbed = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-off-white)] py-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--color-accent)] opacity-15 blur-3xl md:h-64 md:w-64" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-4">
          <div className="max-w-3xl">
            <p className="raw-badge border-[var(--color-void)] text-[var(--color-void)]">
              VIDEO LIBRARY
            </p>
            <h2
              className="mt-3 text-display-lg uppercase tracking-tight text-[var(--color-void)] md:mt-4"
              style={{ fontSize: "24px", lineHeight: 1.15 }}
            >
              See Calipers In Motion.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--color-gray-600)] md:text-[15px]">
            Embedded product and capability videos for teams evaluating how
            Calipers builds, ships, and operates production AI systems.
          </p>
        </div>

        <div className="grid gap-2 md:gap-3 lg:grid-cols-12">
          {videos.map((video, index) => {
            const HighlightIcon = video.icon;
            return (
            <article
              key={video.title}
              className={[
                "group self-start border-[var(--border-thick)] bg-white shadow-[4px_4px_0_var(--color-void)] transition-[transform,box-shadow] duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_var(--color-void)] motion-reduce:transition-none",
                index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5",
              ].join(" ")}
            >
              <div className="relative aspect-video overflow-hidden border-b-[var(--border-thick)] bg-[var(--color-gray-900)]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={youtubeEmbed(video.videoId)}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 bg-[var(--color-accent)] px-2 py-0.5 text-[11px] font-bold text-white shadow-[2px_2px_0_var(--color-void)] md:left-4 md:top-4 md:gap-2 md:px-2.5 md:py-1 md:text-mono-sm">
                  <Play className="h-3 w-3 fill-current md:h-3.5 md:w-3.5" />
                  {video.duration}
                </div>
              </div>

              <div className="p-3.5 sm:p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 md:mb-2.5 md:gap-2.5">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--color-accent)] md:text-mono-sm md:tracking-[0.18em]">
                    {video.eyebrow}
                  </p>
                  <span className="inline-flex items-center gap-1.5 border border-[var(--color-void)] px-1.5 py-0.5 text-[11px] text-[var(--color-void)] md:gap-2 md:px-2 md:py-1 md:text-mono-sm">
                    <HighlightIcon className="h-3 w-3 shrink-0 text-[var(--color-accent)] md:h-3.5 md:w-3.5" />
                    {video.highlight}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase leading-snug text-[var(--color-void)] sm:text-lg">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-600)] md:text-[15px]">
                  {video.description}
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-mono-sm font-bold uppercase tracking-widest text-[var(--color-void)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-3 md:mt-4 md:gap-2 md:underline-offset-4"
                >
                  Watch on YouTube
                  <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              </div>
            </article>
            );
          })}
        </div>

        <div className="mt-6 border-[var(--border-thick)] bg-[var(--color-void)] p-3.5 text-white shadow-[var(--shadow-brutal-accent)] md:mt-8 md:p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 md:text-mono-sm md:tracking-[0.18em]">
            Featured capability reel
          </p>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-white/80 md:mt-2 md:text-[15px]">
            Add your official YouTube video IDs in this component to publish
            product demos, customer walkthroughs, architecture explainers, and
            launch videos without changing the layout.
          </p>
        </div>
      </div>
    </section>
  );
}
