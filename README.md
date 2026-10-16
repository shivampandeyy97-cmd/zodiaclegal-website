# Zodiac Legal — Official Website (`zodiaclegal.com`)

Fast, accessible, SEO- and AEO-optimised corporate legal services website for **Zodiac Legal** (Vikas Nagar, Lucknow, Uttar Pradesh, India), rebuilt off Wix using **Astro 5**, **Tailwind CSS**, **TypeScript**, and a **Node.js (Hono)** consultation microservice for **Render** deployment.

---

## Architecture & Tech Stack

- **Frontend Framework:** Astro 5 (`output: 'static'`, zero client-side JS frameworks on content pages, inline critical CSS)
- **Styling & Design System:** Tailwind CSS + CSS Custom Properties (`src/styles/tokens.css`, `src/styles/global.css`) with Light/Dark theme support and Windows High-Contrast (`forced-colors`) fallbacks
- **Typography:** Self-hosted Variable Fonts (`Newsreader Variable` for editorial headings + `Inter Variable` for UI/body copy) preloaded in `/public/fonts/`
- **Content Engine:** Astro Content Collections (`src/content/config.ts`) with strict Zod validation:
  - `practice-areas` (9 in-depth corporate, commercial, UP-RERA, and litigation practice pages)
  - `insights` (10 statutory guides targeting Uttar Pradesh & pan-India corporate/dispute queries)
  - `team` (3 specialized Lucknow practice desks with BCI Rule 36 disclosures)
  - `faqs` (Categorized AEO/GEO question bank)
  - `testimonials` (Anonymized representative mandates compliant with BCI Rule 36)
- **Consultation Microservice (`/server`):** Node.js + Hono API (`POST /api/consult`, `GET /healthz`) featuring strict payload validation, hidden honeypot spam protection, IP sliding-window rate limiting, Resend email delivery, and no-JS form fallback.
- **Compliance:** Built in strict adherence to **Rule 36 of the Bar Council of India Rules** (_Bar Council of India v. A.K. Balaji_) and the **Digital Personal Data Protection Act, 2023 (DPDP Act)**.

---

## Quick Start & Local Development

### Prerequisites

- **Node.js:** `v20.x` or `v22.x`
- **npm:** `v10+`

### 1. Install Dependencies

```bash
npm ci
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable                  | Description                                                         | Default / Example                                     |
| :------------------------ | :------------------------------------------------------------------ | :---------------------------------------------------- |
| `PUBLIC_SITE_URL`         | Canonical production URL                                            | `https://zodiaclegal.com`                             |
| `PUBLIC_API_URL`          | Base URL of the `/server` consultation API                          | `http://localhost:8787`                               |
| `PUBLIC_GA4_ID`           | Google Analytics 4 Measurement ID (loaded after BCI consent)        | `G-XXXXXXXXXX`                                        |
| `PUBLIC_GSC_VERIFICATION` | Google Search Console verification token                            | _(optional)_                                          |
| `PORT`                    | Port for the `/server` consultation microservice                    | `8787`                                                |
| `ALLOWED_ORIGINS`         | Comma-separated CORS origins for `/server`                          | `https://zodiaclegal.com,https://www.zodiaclegal.com` |
| `RESEND_API_KEY`          | Resend API key for email delivery (runs in dry-run mode if omitted) | `re_xxxxxxxxx`                                        |
| `CONTACT_RECEIVER_EMAIL`  | Destination email for consultation requests                         | `contact@zodiaclegal.com`                             |
| `CONTACT_SENDER_EMAIL`    | Verified sender address in Resend                                   | `notifications@zodiaclegal.com`                       |

### 3. Run Development Servers

```bash
# Start Astro frontend at http://localhost:4321
npm run dev

# In a second terminal, start the Hono consultation API at http://localhost:8787
npm run server:dev
```

---

## Scripts Reference

| Script              | Purpose                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------- |
| `npm run dev`       | Start local Astro dev server                                                              |
| `npm run build`     | Run `astro check` and build static production output into `./dist`                        |
| `npm run preview`   | Preview the production `./dist` build on `http://localhost:4321`                          |
| `npm run typecheck` | Run `astro check` and `tsc --noEmit`                                                      |
| `npm run lint`      | Run ESLint across JS/MJS modules                                                          |
| `npm run test:unit` | Run Vitest unit test suite for `/server` (`server/app.test.mjs`)                          |
| `npm run test:e2e`  | Run Playwright smoke, SEO, JSON-LD schema, and accessibility tests (`tests/site.spec.ts`) |
| `npm test`          | Run both unit tests and Playwright E2E tests                                              |

---

## Content Editing & NAP Configuration

- **Firm NAP (Name, Address, Phone, Hours, Jurisdictions):** Edit [`src/data/siteConfig.ts`](src/data/siteConfig.ts). All pages, headers, footers, and JSON-LD schemas read from this single source of truth.
- **Editorial & Content Guide:** See [`docs/content-guide.md`](docs/content-guide.md) for adding or updating Practice Areas, Legal Insights, and FAQs.
- **Audit & Open Verification Items:** See [`docs/site-audit.md`](docs/site-audit.md) and [`docs/open-items.md`](docs/open-items.md).
- **Render Cut-Over & DNS Launch Plan:** See [`docs/launch-checklist.md`](docs/launch-checklist.md).
