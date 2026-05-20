import { Hero } from "@/components/sections/home/Hero";
import { TrustedBy } from "@/components/sections/home/TrustedBy";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { CoreSolutions } from "@/components/sections/home/CoreSolutions";
import { ImpactMetrics } from "@/components/sections/home/ImpactMetrics";
import { UseCases } from "@/components/sections/home/UseCases";
import { CustomerVoices } from "@/components/sections/home/CustomerVoices";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { HomeCTA } from "@/components/sections/home/HomeCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <CoreSolutions />
      <ImpactMetrics />
      <UseCases />
      <CustomerVoices />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
