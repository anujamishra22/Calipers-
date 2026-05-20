import type { Metadata } from "next";
import { ResourcesContent } from "@/components/sections/resources/ResourcesContent";

export const metadata: Metadata = {
  title: "Resources",
  description: "E-books, webinars, AI readiness assessment, and ROI calculator.",
};

export default function ResourcesPage() {
  return (
    <div className="border-b-[3px] border-[var(--color-void)] bg-white">
      <div className="mx-auto max-w-[var(--container-max)] px-4 pt-16 md:px-[var(--container-padding)]">
        <h1 className="text-display-md">Resources</h1>
        <p className="mt-4 max-w-2xl text-body-lg opacity-80">
          Tools and briefings for executives and practitioners.
        </p>
      </div>
      <ResourcesContent />
    </div>
  );
}
