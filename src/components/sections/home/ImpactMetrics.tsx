import Image from "next/image";
import {
  Lightbulb,
  Zap,
  Cpu,
  LineChart,
  Database,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { impactMetrics } from "@/data/metrics";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { cn } from "@/lib/utils";

const SECONDARY_ICONS = {
  database: Database,
  shield: ShieldCheck,
  zap: Zap,
} as const;

const PRIMARY_ICONS = [Lightbulb, Zap, Cpu, LineChart] as const;

export function ImpactMetrics() {
  return (
    <section className="relative bg-[var(--color-off-white)] py-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.18]" />
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="grid min-w-0 grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
              {impactMetrics.primary.map((m, i) => {
                const Icon = PRIMARY_ICONS[i] ?? Lightbulb;
                return (
                  <div
                    key={m.label}
                    className="flex min-h-[140px] flex-col overflow-hidden rounded-xl border border-[var(--color-gray-200)] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow duration-200 [container-type:inline-size] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] sm:min-h-[160px] [html[data-theme='dark']_&]:border-white/12 [html[data-theme='dark']_&]:bg-[var(--color-gray-900)]"
                  >
                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
                        style={{
                          background:
                            "color-mix(in srgb, var(--color-accent-light) 88%, white 12%)",
                        }}
                      >
                        <Icon
                          className="h-4 w-4 text-[var(--color-accent)] sm:h-4.5 sm:w-4.5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </div>

                      <p className="mt-2.5 max-w-full font-bold leading-[0.95] tracking-tight text-[var(--color-accent)] [font-size:clamp(1.4rem,13cqi,2.25rem)]">
                        <MetricCounter
                          end={m.value}
                          suffix={m.suffix}
                          duration={1.5}
                          decimals={m.suffix.includes(".") ? 1 : 0}
                        />
                      </p>

                      <p className="mt-2 max-w-[14ch] text-[11px] font-bold uppercase leading-snug tracking-[0.06em] text-[var(--color-void)] sm:max-w-none sm:text-xs [html[data-theme='dark']_&]:text-white">
                        {m.label}
                      </p>

                      <p className="mt-1 text-[11px] font-normal leading-snug text-[var(--color-gray-500)] [html[data-theme='dark']_&]:text-[var(--color-gray-400)]">
                        {m.sublabel}
                      </p>

                      <div className="mt-auto pt-3 -mb-3.5 sm:-mb-4">
                        <div
                          className="-mx-3.5 h-1 bg-[var(--color-accent)] sm:-mx-4"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 grid auto-rows-fr gap-2.5 md:grid-cols-3">
              {impactMetrics.secondary.map((s) => {
                const Icon = SECONDARY_ICONS[s.icon];
                const hasDeco = Boolean(s.decoImage);
                const isGrowth = s.icon === "zap";
                const isDataVolume = s.icon === "database";
                const decoQuery =
                  isGrowth ? "v=2" : isDataVolume ? "v=3" : "v=1";
                return (
                  <div
                    key={s.label}
                    className={cn(
                      "relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-gray-200)] bg-white p-3.5 text-left shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.12)] sm:p-4 [html[data-theme='dark']_&]:border-white/12 [html[data-theme='dark']_&]:bg-[var(--color-gray-900)]",
                      hasDeco &&
                        (isGrowth
                          ? "min-h-[170px] sm:min-h-[200px]"
                          : isDataVolume
                            ? "min-h-[170px] sm:min-h-[190px]"
                            : "min-h-[160px] sm:min-h-[180px]"),
                    )}
                  >
                    {isGrowth ? (
                      <svg
                        className="pointer-events-none absolute right-0 top-0 z-0 h-28 w-32 text-[var(--color-accent)] opacity-[0.14]"
                        viewBox="0 0 120 100"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M108 8 C72 32 88 72 112 92"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : isDataVolume ? (
                      <svg
                        className="pointer-events-none absolute right-0 top-0 z-0 h-24 w-28 text-[var(--color-accent)] opacity-[0.1]"
                        viewBox="0 0 120 100"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M100 12 C68 28 76 64 96 88"
                          stroke="currentColor"
                          strokeWidth="1.15"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : null}

                    <div className="relative z-[2] flex shrink-0 items-start gap-3">
                      <div
                        className={cn(
                          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10",
                          isDataVolume && "isolate",
                        )}
                        style={{
                          background:
                            "color-mix(in srgb, var(--color-accent-light) 88%, white 12%)",
                        }}
                      >
                        <Icon
                          className="h-4 w-4 text-[var(--color-accent)] sm:h-5 sm:w-5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        {isDataVolume ? (
                          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-gray-200)] bg-white shadow-sm [html[data-theme='dark']_&]:border-white/15 [html[data-theme='dark']_&]:bg-[var(--color-gray-800)]">
                            <Clock
                              className="h-2 w-2 text-[var(--color-accent)]"
                              strokeWidth={2}
                              aria-hidden
                            />
                          </span>
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-2xl font-bold leading-none tracking-tight text-[var(--color-accent)] sm:text-3xl">
                          {s.value}
                        </p>
                        <p
                          className={cn(
                            "mt-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-void)] sm:text-xs [html[data-theme='dark']_&]:text-white",
                            isGrowth &&
                              "max-w-[10ch] leading-snug sm:max-w-[11ch]",
                            isDataVolume &&
                              "max-w-[12ch] leading-snug sm:max-w-[13ch]",
                          )}
                        >
                          {s.label}
                        </p>
                      </div>
                    </div>

                    {hasDeco && s.decoImage ? (
                      <div
                        className={cn(
                          "relative z-[1] mt-3 flex flex-1 flex-col items-center justify-end",
                          isGrowth
                            ? "min-h-[90px] sm:min-h-[110px]"
                            : "min-h-[80px] sm:min-h-[100px]",
                        )}
                      >
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent [html[data-theme='dark']_&]:via-transparent",
                            isGrowth
                              ? "top-[12%] from-[color-mix(in_srgb,var(--color-accent-light)_85%,white)] via-[color-mix(in_srgb,var(--color-accent-light)_40%,transparent)] [html[data-theme='dark']_&]:from-[color-mix(in_srgb,var(--color-accent)_24%,transparent)]"
                              : "top-[18%] from-[color-mix(in_srgb,var(--color-accent-light)_70%,white)] via-[color-mix(in_srgb,var(--color-accent-light)_28%,transparent)] [html[data-theme='dark']_&]:from-[color-mix(in_srgb,var(--color-accent)_18%,transparent)]",
                          )}
                          aria-hidden
                        />
                        <Image
                          src={`${s.decoImage}?${decoQuery}`}
                          alt=""
                          width={480}
                          height={280}
                          unoptimized
                          draggable={false}
                          className={cn(
                            "relative z-[2] h-auto w-full object-contain object-bottom drop-shadow-[0_10px_28px_rgba(0,71,255,0.18)]",
                            isGrowth
                              ? "max-h-[110px] max-w-[200px] sm:max-h-[130px]"
                              : isDataVolume
                                ? "max-h-[100px] max-w-[min(100%,210px)] sm:max-h-[120px]"
                                : "max-h-[100px] max-w-[190px]",
                          )}
                        />
                      </div>
                    ) : null}

                    <div className="relative z-[3] mt-auto pt-3 -mb-3.5 sm:-mb-4">
                      <div
                        className="-mx-3.5 h-1 bg-[var(--color-accent)] sm:-mx-4"
                        aria-hidden
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-[var(--color-gray-200)] bg-gradient-to-br from-white via-[color-mix(in_srgb,var(--color-accent-light)_35%,white)] to-[var(--color-gray-100)] sm:min-h-[260px] lg:col-span-5 lg:min-h-0 [html[data-theme='dark']_&]:border-white/15 [html[data-theme='dark']_&]:from-[var(--color-gray-900)] [html[data-theme='dark']_&]:via-[var(--color-gray-900)] [html[data-theme='dark']_&]:to-[var(--color-gray-800)]">
            <div className="absolute inset-0">
              <div className="relative h-full w-full">
                <Image
                  src="/images/globe.png"
                  alt="Global AI scale and enterprise impact"
                  fill
                  unoptimized
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
