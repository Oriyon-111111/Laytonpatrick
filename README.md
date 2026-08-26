# Layton Patrick

Production website for Layton Patrick, an independent Australian film production company. The launch site intentionally contains only the ABOUT/home route (`/`) and CONTACT route (`/contact`).

## Stack

- Next.js App Router, React, and strict TypeScript
- CSS Modules with central CSS design tokens
- `next/font` and `next/image`
- Zod validation, Resend transactional delivery, and Vercel BotID Basic
- ESLint and Playwright
- Vercel hosting with GoDaddy remaining the registrar and DNS provider

## Local development

Requirements: Node.js LTS and npm.

```powershell
cd C:\Users\layto\Laytonpatrick
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The static pages run without email credentials. A real contact submission requires the server-only variables documented below.

Quality commands:

```powershell
npm run lint
npm run build
npm run test:e2e
npm run test:visual
```

The retained full-page captures, asset hashes, manual comparison notes, accepted deviations, and explanation of intentional visual-test skips are documented in [Visual QA evidence](docs/visual-qa/README.md).

Install Playwright's Chromium binary once on a new machine:

```powershell
npx playwright install chromium
```

## Architecture

```text
src/
├── app/                  routes, metadata, and contact API
├── components/
│   ├── about/            ABOUT page sections
│   ├── contact/          CONTACT presentation and interactive form
│   ├── layout/           canonical SiteHeader and SiteFooter
│   └── ui/               small reusable presentation primitives
├── content/site.ts       authoritative public copy and site configuration
├── lib/
│   ├── validation.ts     input normalisation and Zod schema
│   └── email.ts          server-only Resend transport and email rendering
└── styles/               global tokens and layout utilities
```

Pages remain Server Components. Only the active navigation state and contact-form interaction use client components. The browser posts to `/api/contact`; it never contacts Resend directly.

## Production assets

The approved source assets are stored as:

```text
public/images/brand/layton-patrick-logo.svg    supplied vector, 900 × 300 viewBox
public/images/about/about-hero.jpg             2400 × 2400
public/images/contact/contact-studio.png        2400 × 800
```

Do not replace, recolour, regenerate, hotlink, or embed these assets. The supplied contact master is a PNG and is intentionally preserved in that format.

## Environment

Create `.env.local` from `.env.example`. Never commit it.

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=Layton@laytonpatrick.com
CONTACT_FROM_EMAIL=Layton Patrick Website <website@forms.laytonpatrick.com>
```

`RESEND_API_KEY` must remain server-only and must never use a `NEXT_PUBLIC_` prefix. The application does not require Microsoft 365, Outlook, GoDaddy, GitHub, or Vercel credentials.

## Contact delivery and email ownership

`Layton@laytonpatrick.com` is the permanent Microsoft 365 business mailbox. Website submissions are sent through Resend from `website@forms.laytonpatrick.com` to that mailbox, with the visitor's submitted address set as `Reply-To`. No visitor autoresponse is sent.

Resend must authenticate only `forms.laytonpatrick.com`. This isolates transactional SPF/DKIM records from Microsoft 365 records at the root domain.

> **Critical DNS warning:** `Layton@laytonpatrick.com` is hosted by Microsoft 365. Do not change the production Microsoft 365 MX, root SPF, Autodiscover, DKIM, DMARC, SRV, or other mail records while configuring Vercel or Resend unless explicitly authorised. Do not change GoDaddy nameservers merely to deploy this website.

## Deployment

1. Work on `codex/initial-build` and review the Vercel preview before merging into `main`.
2. Import `Oriyon-111111/Laytonpatrick` into Vercel as a Next.js project with `main` as the production branch.
3. Add the three environment variables in Vercel Project Settings.
4. Verify the preview, form states, accessibility, responsive layouts, and browser console.
5. Add `laytonpatrick.com` and `www.laytonpatrick.com` to the Vercel project.
6. At GoDaddy, add only the exact project-specific web DNS records Vercel displays. Keep GoDaddy authoritative nameservers.
7. Configure the permanent redirect from `www` to the apex domain; the application also includes a host-based redirect safeguard.
8. Add only Resend's generated DNS records beneath `forms.laytonpatrick.com` and verify SPF/DKIM in Resend.
9. Confirm HTTPS and retest Microsoft 365 inbound mail, outbound mail, and replies immediately after DNS changes.
10. Submit a production enquiry, confirm it reaches Microsoft 365, and confirm Outlook Reply targets the visitor.

Before any DNS change, capture or export the entire existing GoDaddy zone and verify Microsoft 365 can send and receive. Example IP addresses from tutorials are not deployment values; the current Vercel and Resend project dashboards are authoritative.

## Future DEVELOPMENT route

Do not expose `/development` at launch. It can later be added at:

```text
src/app/(site)/development/page.tsx
src/components/development/
```

It can reuse the existing site layout, navigation configuration, metadata pattern, design tokens, utilities, and media conventions without refactoring ABOUT or CONTACT. Only add the route, navigation entry, and sitemap entry after explicit approval.
