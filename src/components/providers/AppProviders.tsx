"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--color-gray-900)",
              color: "var(--color-off-white)",
              fontFamily: "var(--font-mono)",
              border: "var(--border-medium)",
            },
          }}
        />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
