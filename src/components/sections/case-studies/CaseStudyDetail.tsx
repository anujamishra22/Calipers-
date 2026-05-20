import { featuredCaseStudies } from "@/data/case-studies";

export function CaseStudyDetail() {
  return (
    <section className="space-y-20 bg-[var(--color-off-white)] py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Featured studies
        </p>
        {featuredCaseStudies.map((cs) => (
          <article
            key={cs.slug}
            id={cs.slug}
            className="scroll-mt-24 mt-16 border-2 border-[var(--color-void)] bg-white p-8"
          >
            <h2 className="text-display-sm">{cs.headline}</h2>
            <p className="mt-2 text-mono-sm opacity-70">{cs.client}</p>
            <p className="mt-6 text-body-lg">{cs.challenge}</p>
            {cs.solution ? (
              <p className="mt-4 text-body-md opacity-90">{cs.solution}</p>
            ) : null}
            {cs.implementation ? (
              <ol className="mt-8 list-decimal space-y-2 pl-6 text-body-sm">
                {cs.implementation.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : null}
            {cs.results ? (
              <dl className="mt-8 grid gap-4 border-t border-[var(--color-void)] pt-6 sm:grid-cols-2">
                {Object.entries(cs.results).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-mono-sm uppercase opacity-60">{k}</dt>
                    <dd className="text-2xl font-bold text-[var(--color-accent)]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
