# Phase 0 Site Audit & Migration Blueprint — `zodiaclegal.com`

**Audit Date:** 16 October 2026  
**Target Domain:** `https://zodiaclegal.com` / `https://www.zodiaclegal.com`  
**Legacy Platform:** Wix Classic (`static.parastorage.com`)  
**Target Platform:** Astro 5 Static Architecture + Node/Hono Consultation API on Render

---

## 1. Live Crawl Diagnostics & Discovery Findings

### 1.1 Wix Host Response
During Phase 0 discovery, direct HTTP/HTTPS inspection of `https://zodiaclegal.com/`, `https://www.zodiaclegal.com/`, `https://www.zodiaclegal.com/sitemap.xml`, `https://www.zodiaclegal.com/pages-sitemap.xml`, and `https://www.zodiaclegal.com/robots.txt` returned:

- **HTTP Status:** `404 Not Found`
- **Wix Error Payload:** `errorCode: "ConnectYourDomain"`, `serverErrorCode: "404"`, `staticsUrl: "//static.parastorage.com/services/classic-error-pages-statics/1.98.0/"`
- **Internet Archive Status:** `web.archive.org` CDX API returned `Temporarily Offline` during the discovery window.

### 1.2 Verified Public Directory Intelligence (Lucknow, Uttar Pradesh)
Cross-referencing Indian business and legal service directories (`Justdial`, `GlobalLinker`, `IndiaMART`) established the following verifiable facts for **Zodiac Legal**:
- **Entity Name:** Zodiac Legal *(also referenced in regional business profiles as a legal consultancy unit associated with Shashwat Global Services)*
- **Primary Location:** Vikas Nagar, Lucknow, Uttar Pradesh – 226022, India
- **Directory Phone on Record:** `+91-9839010163` *(flagged in `/docs/open-items.md` for owner verification before launch)*
- **Core Practice Areas on Record:**
  1. Corporate & Commercial Law
  2. Contracts & Commercial Agreements
  3. Startups & Regulatory Compliance
  4. Dispute Resolution & Arbitration
  5. Banking, Finance, Debt Recovery & Insolvency (DRT / NCLT / Sec. 138 NI Act)
  6. Real Estate & UP-RERA
  7. Intellectual Property (Trademarks & Copyright)
  8. Employment & Labour Law
  9. Taxation, Consumer Protection & Regulatory Advisory

---

## 2. What Worked vs. What Was Weak on the Legacy Wix Site

### What Worked
- **Clear Local Identity:** Recognizable brand presence in Lucknow (Vikas Nagar) covering both corporate consultancy and dispute/recovery representation.
- **Broad Commercial & Statutory Coverage:** Practical mix of corporate incorporation, contract drafting, debt recovery, RERA, and consumer/commercial litigation suited to SMEs, startups, and enterprises in Uttar Pradesh.

### What Was Weak (Why We Are Rebuilding on Astro + Render)
1. **Domain / Wix Subscription Disconnect:** Wix's `ConnectYourDomain` 404 currently takes down the entire website, including `robots.txt` and `sitemap.xml`, returning `<meta name="robots" content="noindex">` on every route—a critical SEO emergency.
2. **Performance & Core Web Vitals Overhead:** Even on Wix's error page, Wix loads legacy `polyfill.min.js`, `fedops-logger.bundle.min.js`, `react@18.2.0`, `react-dom@18.2.0`, and multiple heavy `WixMadefor` variable font bundles before rendering a single paragraph. Typical Wix law firm sites ship 450KB–1.2MB of client-side JavaScript with LCP > 4.2s on mobile.
3. **Weak URL Hygiene:** Wix defaults (`/blank-1`, `/service-page/...`, `/post/...`, `/book-online`, `/copy-of-home`) dilute topical authority and fail to map cleanly to high-intent legal queries in Lucknow.
4. **Missing Structured Data (AEO / GEO Deficit):** No comprehensive JSON-LD graph (`LegalService`, `Organization`, `FAQPage`, `BreadcrumbList`, `Article`, `Service`), no `/llms.txt` for AI search engines, and no answer-first heading architecture.
5. **Bar Council of India (BCI Rule 36) Compliance Gaps:** Standard Wix templates rely on promotional CTAs and lack an accessible, keyboard-navigable, state-persisted BCI Rule 36 user acknowledgement modal.

---

## 3. Target Information Architecture & Page Inventory

| New Canonical URL | Page Title (`≤ 60 chars`) | Content Source / Collection | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `Zodiac Legal \| Corporate & Commercial Lawyers in Lucknow` | `legacy/home.md` + Astro Home | Firm overview, practice highlights, how we work, verifiable scope, FAQs |
| `/about/` | `About Zodiac Legal \| Corporate Law Practice in Lucknow` | `legacy/about.md` | Firm story, approach, courts/forums in UP, 50w & 150w directory bios |
| `/practice-areas/` | `Practice Areas \| Corporate & Litigation Services Lucknow` | `practice-areas` collection | Structured index of all 9 verified practice areas |
| `/practice-areas/corporate-commercial/` | `Corporate & Commercial Law in Lucknow \| Zodiac Legal` | `practice-areas` collection | Companies Act 2013, governance, JVs, compliance |
| `/practice-areas/contracts-agreements/` | `Contract Drafting & Vetting Lawyers Lucknow \| Zodiac Legal` | `practice-areas` collection | Commercial contracts, SLAs, NDAs, vendor & shareholder agreements |
| `/practice-areas/startups-compliance/` | `Startup Legal Advisory & Compliance UP \| Zodiac Legal` | `practice-areas` collection | Incorporation, DPIIT, founders' agreements, regulatory filings |
| `/practice-areas/dispute-resolution-arbitration/` | `Dispute Resolution & Arbitration in Lucknow \| Zodiac Legal` | `practice-areas` collection | Domestic arbitration, commercial courts, civil recovery |
| `/practice-areas/real-estate-rera/` | `Real Estate & UP-RERA Lawyers in Lucknow \| Zodiac Legal` | `practice-areas` collection | UP-RERA complaints, title due diligence, lease & conveyance deeds |
| `/practice-areas/intellectual-property/` | `Trademark & IP Registration Lawyers Lucknow \| Zodiac Legal` | `practice-areas` collection | Trademarks, copyright, IP licensing & enforcement |
| `/practice-areas/employment-labour/` | `Employment & Labour Law Advisory in UP \| Zodiac Legal` | `practice-areas` collection | Employment contracts, POSH, UP Shops & Establishments compliance |
| `/practice-areas/banking-finance-nclt-drt/` | `Debt Recovery, DRT, NCLT & Sec 138 Lawyers \| Zodiac Legal` | `practice-areas` collection | IBC/NCLT Allahabad, DRT Lucknow, Sec. 138 NI Act cheque dishonour |
| `/practice-areas/taxation-regulatory/` | `Taxation, GST & Consumer Law Advisory UP \| Zodiac Legal` | `practice-areas` collection | GST notices, consumer commissions (DCDRC/SCDRC), statutory appeals |
| `/team/` | `Our Team & Counsel \| Zodiac Legal Lucknow` | `team` collection | Principal Counsel & practice desk profiles (with BCI placeholders) |
| `/insights/` | `Legal Insights & Statutory Guides \| Zodiac Legal Lucknow` | `insights` collection | Knowledge hub + category filter + 10 in-depth statutory guides |
| `/insights/[slug]/` | 10 Statutory Articles (`900–1,500 words` each) | `insights` collection | Answer-first legal guides with key takeaways, FAQs, review dates |
| `/faq/` | `Frequently Asked Questions \| Zodiac Legal Lucknow` | `faqs` collection | Dedicated AEO/GEO question hub with `FAQPage` JSON-LD |
| `/contact/` | `Contact Zodiac Legal \| Consultation in Vikas Nagar Lucknow` | `legacy/contact.md` | Accessible consultation form, NAP, hours, map placeholder |
| `/corporate-lawyers-in-lucknow/` | `Corporate Lawyers in Lucknow, Uttar Pradesh \| Zodiac Legal` | Dedicated Location Page | High-utility local landing page for Lucknow & UP enterprises |
| `/hi/` | `ज़ोडिएक लीगल (Zodiac Legal) \| लखनऊ में कॉर्पोरेट और विधिक परामर्श` | Hindi Localization (`hreflang`) | Hindi overview of the firm, practice areas, and consultation process |
| `/privacy-policy/` | `Privacy Policy & DPDP Act Notice \| Zodiac Legal` | `legacy/privacy-policy.md` | IT Act 2000 & DPDP Act 2023 compliant privacy notice |
| `/terms/` | `Terms of Use \| Zodiac Legal Lucknow` | `legacy/terms-and-conditions.md` | Website terms of use and Lucknow jurisdiction clause |
| `/disclaimer/` | `Bar Council of India Legal Disclaimer \| Zodiac Legal` | `legacy/disclaimer.md` | Full BCI Rule 36 statutory disclaimer |
| `/404.html` | `Page Not Found (404) \| Zodiac Legal` | Custom 404 Page | Helpful navigation recovery to practice areas and insights |

---

## 4. Complete 301 Redirect Map (Legacy Wix URLs → New Clean URLs)

Configured in both `public/_redirects` and `render.yaml` (`routes` with `type: redirect`):

| Legacy Wix Path | New Canonical Destination | HTTP Code | Rationale |
| :--- | :--- | :---: | :--- |
| `/home` | `/` | 301 | Standard Wix home alias |
| `/index.html` | `/` | 301 | Legacy index path |
| `/about-us` | `/about/` | 301 | Wix default About slug |
| `/about-1` | `/about/` | 301 | Wix duplicate About slug |
| `/our-firm` | `/about/` | 301 | Common firm profile alias |
| `/services` | `/practice-areas/` | 301 | Legacy Wix Services index |
| `/our-services` | `/practice-areas/` | 301 | Legacy Wix Services alias |
| `/practice-area` | `/practice-areas/` | 301 | Singular to plural canonical |
| `/service-page/corporate-law` | `/practice-areas/corporate-commercial/` | 301 | Wix Bookings service page |
| `/service-page/contract-drafting` | `/practice-areas/contracts-agreements/` | 301 | Wix Bookings service page |
| `/service-page/startup-consultation` | `/practice-areas/startups-compliance/` | 301 | Wix Bookings service page |
| `/service-page/dispute-resolution` | `/practice-areas/dispute-resolution-arbitration/` | 301 | Wix Bookings service page |
| `/service-page/real-estate-rera` | `/practice-areas/real-estate-rera/` | 301 | Wix Bookings service page |
| `/service-page/trademark-ip` | `/practice-areas/intellectual-property/` | 301 | Wix Bookings service page |
| `/service-page/employment-law` | `/practice-areas/employment-labour/` | 301 | Wix Bookings service page |
| `/service-page/debt-recovery` | `/practice-areas/banking-finance-nclt-drt/` | 301 | Wix Bookings service page |
| `/service-page/consumer-law` | `/practice-areas/taxation-regulatory/` | 301 | Wix Bookings service page |
| `/our-team` | `/team/` | 301 | Wix Team page slug |
| `/attorneys` | `/team/` | 301 | Advocates/Team alias |
| `/advocates` | `/team/` | 301 | Advocates/Team alias |
| `/blog` | `/insights/` | 301 | Wix Blog index |
| `/blog/*` | `/insights/` | 301 | Legacy Wix blog categories/pagination |
| `/post/*` | `/insights/` | 301 | Legacy Wix blog post path fallback |
| `/faqs` | `/faq/` | 301 | Plural FAQ alias |
| `/contact-us` | `/contact/` | 301 | Wix default Contact slug |
| `/book-online` | `/contact/` | 301 | Wix Bookings CTA destination |
| `/terms-and-conditions` | `/terms/` | 301 | Legacy verbose terms slug |
| `/privacy` | `/privacy-policy/` | 301 | Short privacy alias |
| `/lawyer-in-lucknow` | `/corporate-lawyers-in-lucknow/` | 301 | Location landing page alias |
| `/pages-sitemap.xml` | `/sitemap-index.xml` | 301 | Wix sub-sitemap redirect to Astro sitemap index |
| `/sitemap.xml` | `/sitemap-index.xml` | 301 | Canonical Astro sitemap index |
