"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { MagneticInit } from "@/components/ui/MagneticInit";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="flex flex-1 flex-col pt-16">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <MagneticInit />
    </>
  );
}
