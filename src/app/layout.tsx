import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";

import { site } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Layton Patrick | Independent Film Production",
    template: "%s | Layton Patrick",
  },
  description:
    "Layton Patrick is an independent Australian production company focused on elevated, filmmaker-driven feature films with an international outlook.",
  applicationName: site.name,
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: site.url,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${interTight.variable} ${barlowCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
