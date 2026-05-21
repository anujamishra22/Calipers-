import type { Metadata } from "next";
import { CompanyOverview } from "@/components/sections/about/CompanyOverview";
import { Leadership } from "@/components/sections/about/Leadership";
import { Timeline } from "@/components/sections/about/Timeline";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { WhyChooseUs } from "@/components/sections/about/WhyChooseUs";
import { Values } from "@/components/sections/about/Values";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mission, leadership, and timeline of Calipers — GenAI, AI, and software development.",
};

export default function AboutPage() {
  return (
    <>
      <CompanyOverview />
      <Leadership />
      <Timeline />
      <MissionVision />
      <WhyChooseUs />
      <Values />
    </>
  );
}
