import type { Metadata } from "next";
import { Certifications } from "@/components/sections/compliance/Certifications";
import { DeliveryPractices } from "@/components/sections/compliance/DeliveryPractices";

export const metadata: Metadata = {
  title: "Trust & privacy",
  description:
    "How Calipers approaches data privacy, responsible AI, and reliable software delivery.",
};

export default function CompliancePage() {
  return (
    <>
      <section className="border-b-[3px] border-[var(--color-void)] bg-white py-16">
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
          <h1 className="text-display-md">Trust & privacy</h1>
          <p className="mt-4 max-w-2xl text-body-lg opacity-80">
            We focus on GenAI, applied AI, and software development—with clear
            commitments on data handling and how we ship.
          </p>
        </div>
      </section>
      <Certifications />
      <DeliveryPractices />
    </>
  );
}
