"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { getBackendApiUrl } from "@/lib/api";

const interests = [
  "GenAI & agents",
  "AI Automation",
  "Analytics",
  "Software engineering",
  "Custom AI",
  "Cloud",
  "Consulting",
  "General Inquiry",
];

export function ContactForm() {
  const [local, setLocal] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    message: "",
    tags: [] as string[],
  });
  const [pending, setPending] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const payload = {
      name: local.name,
      email: local.email,
      company: local.company || undefined,
      size: local.size || undefined,
      message: local.message,
      interests: local.tags,
      website: honeypotRef.current?.value ?? "",
    };

    try {
      const apiRes = await fetch(`${getBackendApiUrl()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!apiRes.ok) {
        const err = (await apiRes.json().catch(() => null)) as {
          error?: { message?: string };
        } | null;
        throw new Error(err?.error?.message ?? "Could not save your message");
      }

      const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      if (formId) {
        const fd = new FormData();
        fd.append("name", local.name);
        fd.append("email", local.email);
        fd.append("company", local.company);
        fd.append("size", local.size);
        fd.append("message", local.message);
        fd.append("interests", local.tags.join(", "));
        await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        }).catch(() => undefined);
      }

      toast.success("✓ Message received. We'll respond within 24 hours.");
      setLocal({
        name: "",
        email: "",
        company: "",
        size: "",
        message: "",
        tags: [],
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not send your message";
      toast.error(`${msg} — try again or email hello@caliper.com`);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" suppressHydrationWarning>
      <Field label="Full Name">
        <input
          required
          suppressHydrationWarning
          className="input-brutal"
          value={local.name}
          onChange={(e) => setLocal({ ...local, name: e.target.value })}
        />
      </Field>
      <Field label="Work Email">
        <input
          required
          suppressHydrationWarning
          type="email"
          className="input-brutal"
          value={local.email}
          onChange={(e) => setLocal({ ...local, email: e.target.value })}
        />
      </Field>
      <Field label="Company Name">
        <input
          required
          suppressHydrationWarning
          className="input-brutal"
          value={local.company}
          onChange={(e) => setLocal({ ...local, company: e.target.value })}
        />
      </Field>
      <Field label="Company Size">
        <select
          required
          suppressHydrationWarning
          className="input-brutal"
          value={local.size}
          onChange={(e) => setLocal({ ...local, size: e.target.value })}
        >
          <option value="">Select</option>
          <option>1-50</option>
          <option>51-200</option>
          <option>201-1000</option>
          <option>1000+</option>
        </select>
      </Field>
      <fieldset>
        <legend className="text-mono-sm font-bold uppercase tracking-widest">
          What are you interested in?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((tag) => {
            const on = local.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                suppressHydrationWarning
                onClick={() =>
                  setLocal({
                    ...local,
                    tags: on
                      ? local.tags.filter((t) => t !== tag)
                      : [...local.tags, tag],
                  })
                }
                className={`border-2 border-[var(--color-void)] px-3 py-1 text-mono-sm uppercase ${
                  on ? "bg-[var(--color-accent)] text-white" : "bg-white"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Field label="Message">
        <textarea
          required
          suppressHydrationWarning
          rows={4}
          className="input-brutal"
          value={local.message}
          onChange={(e) => setLocal({ ...local, message: e.target.value })}
        />
      </Field>
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />

      <button
        type="submit"
        suppressHydrationWarning
        className="btn-brutal w-full md:w-auto"
        disabled={pending}
      >
        SEND MESSAGE →
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-mono-sm font-bold uppercase tracking-widest text-[var(--color-void)]">
        {label}
      </span>
      {children}
    </label>
  );
}
