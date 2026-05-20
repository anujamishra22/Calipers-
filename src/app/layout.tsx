import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Calipers — GenAI, AI & Software Development",
    template: "%s | Calipers",
  },
  description:
    "Calipers builds GenAI, applied AI, and production software — from assistants and agents to full-stack products and MLOps.",
  keywords: [
    "generative AI",
    "enterprise AI",
    "AI automation",
    "software development",
    "LLM",
    "MLOps",
    "AI platform",
  ],
  authors: [{ name: "Calipers" }],
  creator: "Calipers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://caliper.com",
    siteName: "Calipers",
    title: "Calipers — GenAI, AI & Software",
    description:
      "Ship intelligent products faster with a partner focused on models, applications, and reliable delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calipers",
    description: "GenAI, AI & software development for modern product teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="flex min-h-screen flex-col antialiased"
        style={
          {
            ["--font-display" as string]: `"Space Grotesk", "Helvetica Neue", Arial, sans-serif`,
            ["--font-mono" as string]: `"JetBrains Mono", "Fira Code", "Courier New", monospace`,
            ["--font-body" as string]: `"Inter", "Helvetica Neue", Arial, sans-serif`,
          } as React.CSSProperties
        }
      >
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
