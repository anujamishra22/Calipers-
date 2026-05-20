import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Calipers for demos, sales, and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-[var(--section-padding)] md:px-[var(--container-padding)]">
      <h1 className="text-display-md">Contact</h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <ContactInfo />
      </div>
      <div className="mt-12 border-2 border-[var(--color-void)] bg-[var(--color-accent)] p-8 text-white">
        <h2 className="text-2xl font-bold">Prefer a call?</h2>
        <Link
          href="/contact"
          className="btn-brutal mt-4 inline-block !bg-white !text-black !shadow-[5px_5px_0_#000]"
        >
          BOOK 30-MIN DEMO
        </Link>
      </div>
    </div>
  );
}
