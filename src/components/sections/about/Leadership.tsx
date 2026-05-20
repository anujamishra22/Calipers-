import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { leadership } from "@/data/team";

export function Leadership() {
  return (
    <section className="py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Leadership
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {leadership.map((m) => (
            <article
              key={m.name}
              className="bento-card border bg-white transition hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-void)]"
            >
              <div className="relative h-56 border-b border-[var(--color-void)] bg-[var(--color-bone)] sm:h-64">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {m.role}
                </p>
                {m.bio ? (
                  <p className="mt-3 text-body-sm opacity-80">{m.bio}</p>
                ) : null}
                <a
                  href={m.linkedin}
                  {...(m.linkedin.startsWith("http")
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="mt-4 inline-flex border border-[var(--color-void)] p-2 hover:bg-[var(--color-void)] hover:text-white"
                  aria-label={`${m.name} LinkedIn`}
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
