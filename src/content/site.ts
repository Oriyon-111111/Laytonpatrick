export const site = {
  name: "Layton Patrick",
  url: "https://laytonpatrick.com",
  email: "info@laytonpatrick.com",
  navigation: [
    { label: "ABOUT", href: "/" },
    { label: "CONTACT", href: "/contact" },
  ],
  location: ["Based in Australia", "Working internationally"],
} as const;

export const aboutContent = {
  headline: ["Original stories.", "Distinctive voices.", "Enduring work."],
  introduction:
    "Layton Patrick is an independent Australian production company developing original, story-led feature films with artistic conviction and an international outlook.",
  statement: {
    heading: "Selective by design.",
    body:
      "We develop original stories from within, guided by artistic instinct and the belief that great storytelling creates enduring value. We remain deeply involved from development through production, assembling the right creative voices around each project while protecting the integrity of the work at every stage.",
  },
  approaches: [
    {
      number: "01",
      heading: "DEVELOPMENT",
      body:
        "We develop original IP in-house from an art-first belief that enduring value begins with great storytelling and artistic conviction.",
    },
    {
      number: "02",
      heading: "PACKAGING",
      body:
        "We build each project around its needs, bringing together the specific creatives best suited to its voice and ambition.",
    },
    {
      number: "03",
      heading: "PRODUCTION",
      body:
        "We champion our own work with close creative oversight and deep integration across development, production and delivery.",
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
