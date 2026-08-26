export const site = {
  name: "Layton Patrick",
  url: "https://laytonpatrick.com",
  email: "Layton@laytonpatrick.com",
  navigation: [
    { label: "ABOUT", href: "/" },
    { label: "CONTACT", href: "/contact" },
  ],
  location: ["Based in Australia", "Working internationally"],
} as const;

export const aboutContent = {
  headline: ["Prestige cinema.", "Distinctive voices.", "Enduring work."],
  introduction:
    "Layton Patrick is an independent production company focused on elevated, filmmaker-driven feature films from Australia with an international outlook.",
  statement: {
    heading: "Selective by design.",
    body:
      "We partner with filmmakers whose vision is personal, ambitious and enduring. Our role is to nurture that vision through thoughtful development, inspired collaboration and precise execution—building films that travel internationally and leave a lasting cultural mark.",
  },
  approaches: [
    {
      number: "01",
      heading: "DEVELOPMENT",
      body:
        "Story-first. We develop projects with depth, clarity and long-term international potential.",
    },
    {
      number: "02",
      heading: "PACKAGING",
      body:
        "We assemble the right creative and executive team to unlock each project's full potential.",
    },
    {
      number: "03",
      heading: "PRODUCTION",
      body:
        "We champion a collaborative, disciplined process to deliver films of enduring quality.",
    },
  ],
  currentFocus:
    "Curated feature development. Full slate available on request.",
} as const;

export const contactContent = {
  introduction:
    "Layton Patrick welcomes select enquiries relating to development, partnerships, and production.",
  profileNote: "Company profile and project materials available on request.",
  privacy: [
    "We respect your privacy.",
    "Your details will never be shared.",
  ],
} as const;
