import { missionVision } from "@/data/mission-vision";
import { RawBadge } from "@/components/ui/RawBadge";

export function MissionVision() {
  const { mission, vision } = missionVision;

  return (
    <section className="border-t-[3px] border-[var(--color-void)] bg-[var(--color-off-white)] py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Mission &amp; Vision
        </p>
        <p className="mt-3 max-w-2xl text-body-md opacity-80">
          Where we are headed—and how we help enterprises get there with AI that
          ships, scales, and stays accountable.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          <article className="group relative flex flex-col overflow-hidden border-[3px] border-[var(--color-void)] border-l-8 border-l-white bg-[var(--color-accent)] text-white shadow-[var(--shadow-brutal-lg)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-void)]">
            <div className="border-b border-white/20 bg-black/10 px-5 py-3 md:px-6">
              <RawBadge className="border-white bg-transparent text-white">
                [{mission.badge}]
              </RawBadge>
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-8">
              <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                {mission.title}
              </h2>
              <p className="mt-4 flex-1 text-body-sm leading-relaxed text-white/90 md:text-body-md">
                {mission.body}
              </p>
            </div>
          </article>

          <article className="group relative flex flex-col overflow-hidden border-[3px] border-[var(--color-gray-600)] border-l-8 border-l-[var(--color-accent)] bg-[var(--color-gray-800)] text-[var(--color-off-white)] shadow-[var(--shadow-brutal-lg)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-void)] [html[data-theme='dark']_&]:border-[var(--color-gray-600)] [html[data-theme='dark']_&]:shadow-[var(--shadow-brutal-md)]">
            <div className="border-b border-white/10 bg-black/20 px-5 py-3 md:px-6">
              <RawBadge className="border-[var(--color-accent)] bg-transparent text-[#0047FF] [html[data-theme='dark']_&]:text-[var(--color-accent-light)]">
                [{vision.badge}]
              </RawBadge>
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-8">
              <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                {vision.title}
              </h2>
              <p className="mt-4 flex-1 text-body-sm leading-relaxed text-white/80 md:text-body-md">
                {vision.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
