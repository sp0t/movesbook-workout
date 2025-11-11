"use client";

import { AppFooter } from "../layout/AppFooter";
import { HeroSection } from "./HeroSection";
import { HighlightsGrid } from "./HighlightsGrid";
import { CallToAction } from "./CallToAction";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(120deg,rgba(0,140,69,0.1)_0%,rgba(255,255,255,0.95)_50%,rgba(205,33,42,0.12)_100%)]">
      <header className="px-6 py-8 sm:px-10 lg:px-16">
        <HeroSection />
      </header>

      <main className="flex flex-1 flex-col gap-20 pb-20">
        <section className="bg-white/80 py-16 backdrop-blur">
          <div className="px-6 sm:px-10 lg:px-16">
            <div className="space-y-16">
              <HighlightsGrid />
              <CallToAction />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/85 backdrop-blur px-6 py-6 sm:px-10 lg:px-16">
        <AppFooter />
      </footer>
    </div>
  );
}

