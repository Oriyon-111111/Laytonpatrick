import type { Metadata } from "next";

import { AboutStatement } from "@/components/about/AboutStatement";
import { ApproachGrid } from "@/components/about/ApproachGrid";
import { CurrentFocus } from "@/components/about/CurrentFocus";
import { Hero } from "@/components/about/Hero";

export const metadata: Metadata = {
  title: { absolute: "Layton Patrick | Independent Film Production" },
  description:
    "Layton Patrick is an independent Australian production company focused on elevated, filmmaker-driven feature films with an international outlook.",
  alternates: {
    canonical: "/",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <Hero />
      <AboutStatement />
      <ApproachGrid />
      <CurrentFocus />
    </main>
  );
}
