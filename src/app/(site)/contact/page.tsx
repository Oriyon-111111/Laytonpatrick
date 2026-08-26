import type { Metadata } from "next";

import { ContactBody } from "@/components/contact/ContactBody";
import { ContactImage } from "@/components/contact/ContactImage";
import { ContactIntro } from "@/components/contact/ContactIntro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Layton Patrick regarding development, partnerships and film production.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactIntro />
      <ContactBody />
      <ContactImage />
    </main>
  );
}
