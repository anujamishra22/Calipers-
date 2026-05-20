import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/sections/case-studies/CaseStudyGrid";
import { CaseStudyDetail } from "@/components/sections/case-studies/CaseStudyDetail";
import { CaseStudyHashScroll } from "@/components/sections/case-studies/CaseStudyHashScroll";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Enterprise outcomes across BFSI, manufacturing, e-commerce, and more.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudyHashScroll />
      <section className="pb-[var(--section-padding)] pt-[calc(var(--section-padding)*0.6)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
          <CaseStudyGrid />
        </div>
      </section>
      <CaseStudyDetail />
    </>
  );
}
