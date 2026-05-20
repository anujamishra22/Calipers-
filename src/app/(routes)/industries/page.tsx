import type { Metadata } from "next";
import { IndustryGrid } from "@/components/sections/industries/IndustryGrid";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Banking, healthcare, SaaS, manufacturing, and e-commerce programs from Calipers.",
};

export default function IndustriesPage() {
  return <IndustryGrid />;
}
