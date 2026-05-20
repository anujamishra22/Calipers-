import type { Metadata } from "next";
import { ServiceCategories } from "@/components/sections/services/ServiceCategories";
import { ServiceBlocks } from "@/components/sections/services/ServiceBlocks";
import { HowItWorks } from "@/components/sections/services/HowItWorks";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven services spanning GenAI, AI automation, analytics, software engineering, and cloud.",
};

export default function ServicesPage() {
  return (
    <>
      <ServiceCategories />
      <ServiceBlocks />
      <HowItWorks />
      <ServicesCTA />
    </>
  );
}
