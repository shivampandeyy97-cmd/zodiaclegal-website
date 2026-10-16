# Content Editing & Statutory Publishing Guide (`zodiaclegal.com`)

All structured content on `zodiaclegal.com` is managed via **Astro Content Collections** in `src/content/` and validated at build time by [`src/content/config.ts`](../src/content/config.ts). If any required field is missing or exceeds SEO character limits, `npm run build` will fail with a clear error message.

---

## 1. Updating Firm Contact Details (NAP)

Edit [`src/data/siteConfig.ts`](../src/data/siteConfig.ts) to update:

- Street/Chamber address in Vikas Nagar, Lucknow
- Primary telephone and WhatsApp numbers (`phoneDisplay`, `phoneE164`, `whatsappNumber`)
- Official intake email (`email`)
- Consultation hours (`hours`)

Changes in `siteConfig.ts` automatically propagate to the Header, Footer, Contact Page, Mobile Call Bar, and all `LegalService` / `LocalBusiness` JSON-LD schemas.

---

## 2. Adding or Editing a Legal Insight (`src/content/insights/*.md`)

Create a new `.md` file in `src/content/insights/` with the following frontmatter:

```yaml
---
title: 'Clear, Specific Statutory Title'
seoTitle: 'Title <= 60 chars | Zodiac Legal'
metaDescription: 'Concise summary <= 155 chars explaining the statutory process.'
publishDate: '2026-10-16'
lastReviewed: '2026-10-16'
author: 'Zodiac Legal Corporate & Regulatory Desk'
reviewedBy: 'Senior Practice Desk, Zodiac Legal (Lucknow)'
category: 'Corporate Law'
practiceAreaSlug: 'corporate-commercial'
readingTime: '7 min read'
directAnswer: '45-60 word answer-first summary that directly answers the core legal question.'
keyTakeaways:
  - 'First actionable statutory takeaway'
  - 'Second takeaway with section citation'
faqs:
  - question: 'Specific procedural question?'
    answer: 'Direct, accurate statutory answer.'
---
```

### Editorial Standards for Legal Insights

1. **Answer-First Structure (AEO / GEO):** Use question-style H2 headings (`## What is the limitation period for...?`) and place a 40–60 word direct answer in the very first paragraph below the heading before expanding into procedural depth.
2. **Statutory Precision:** Cite exact sections and enactments (e.g., _Section 138 of the Negotiable Instruments Act, 1881_, _Section 18 of the RERA Act, 2016_, _Section 12A of the Commercial Courts Act, 2015_) and note local Lucknow/UP forum practice where relevant.
3. **Mandatory Footnote:** Conclude every article body with `*Informational only; not legal advice.*`

---

## 3. Editing Practice Areas (`src/content/practice-areas/*.md`)

Each practice area file in `src/content/practice-areas/` includes:

- `seoTitle` (`<= 65` chars) and `metaDescription` (`<= 160` chars)
- `directAnswer` (displayed in the highlighted callout box at the top of the page)
- `statutesCovered` & `forumsCovered` (rendered in the right-hand statutory sidebar)
- `typicalSituations`, `processSteps`, `documentsNeeded`, and `faqs` (automatically rendered into structured checklists and a `FAQPage` JSON-LD accordion)
- `relatedInsights` (array of slugs from `src/content/insights/`).
