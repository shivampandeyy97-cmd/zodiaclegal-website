# Render Deployment, DNS Cut-Over & Local SEO Launch Checklist (`zodiaclegal.com`)

This runbook provides step-by-step instructions to deploy `zodiaclegal-website` to **Render**, preserve existing **email (MX/SPF/DKIM/DMARC)** records, switch DNS from Wix to Render with zero downtime, and complete post-launch Google Search Console & Google Business Profile verification.

---

## Part 1: Pre-Launch Owner Verification (Before Switching DNS)

Review [`docs/open-items.md`](open-items.md) and confirm:

1. [ ] **Exact Chamber / Plot Number in Vikas Nagar, Lucknow** is updated in [`src/data/siteConfig.ts`](../src/data/siteConfig.ts).
2. [ ] **Primary Phone & WhatsApp Number** (`+91 98390 10163`) and **Official Email** (`contact@zodiaclegal.com`) are verified in `src/data/siteConfig.ts`.
3. [ ] **Original Logo Asset** (if different from `/public/brand/logo.svg`) is placed in `/public/brand/`.
4. [ ] **Individual Advocate Names & Bar Council of UP Enrolment Numbers** are updated in `src/content/team/*.md`.

---

## Part 2: Push to Private GitHub Repository

If `gh` (GitHub CLI) was not yet authenticated on your workstation:

```bash
brew install gh
gh auth login
gh repo create zodiaclegal-website --private --source=. --remote=origin --push
git push -u origin develop
```

Configure branch protection on GitHub (`Settings → Branches → Add branch protection rule` for `main`):

- [ ] Require a pull request before merging
- [ ] Require status checks to pass before merging (`Quality, Unit Tests, E2E & Lighthouse CI`)

---

## Part 3: Deploy Blueprint on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Blueprint**.
3. Connect the private GitHub repository `zodiaclegal-website` (`main` branch).
4. Render will automatically detect [`render.yaml`](../render.yaml) and provision two services:
   - **`zodiaclegal-web`** (Static Site — publishes `./dist` with HSTS, CSP, immutable font/asset caching, and 301 redirects)
   - **`zodiaclegal-api`** (Node Web Service — runs `node server/index.mjs` with `/healthz` monitoring)
5. Populate the secret environment variables prompted by Render:
   - On `zodiaclegal-api`:
     - `RESEND_API_KEY`: Your Resend API key (`re_...`)
     - `CONTACT_RECEIVER_EMAIL`: `contact@zodiaclegal.com`
   - On `zodiaclegal-web`:
     - `PUBLIC_API_URL`: The `https://zodiaclegal-api.onrender.com` URL assigned by Render
     - `PUBLIC_GA4_ID`: Your GA4 Measurement ID (`G-...`)
     - `PUBLIC_GSC_VERIFICATION`: Your Google Search Console meta tag token
6. Verify the staging deployment on `https://zodiaclegal-web.onrender.com` and test `https://zodiaclegal-api.onrender.com/healthz`.

---

## Part 4: DNS Cut-Over Plan (Wix → Render) & Email Preservation

> **CRITICAL WARNING — PRESERVE EMAIL (MX / SPF / DKIM / DMARC) RECORDS:**  
> If your domain’s nameservers (`NS`) are currently pointed to Wix (`nsXX.wixdns.net`), **do NOT delete or overwrite your `MX`, `TXT` (`v=spf1 ...`), `DKIM` (`*._domainkey`), or `_dmarc` records** when moving DNS. Before making any DNS changes, export a full backup of your current DNS zone file.

### Step 4.1 — 24 Hours Before Cut-Over

- [ ] Log in to your domain registrar / DNS host for `zodiaclegal.com`.
- [ ] Screenshot and export all existing `A`, `CNAME`, `MX`, `TXT` (SPF/DKIM/DMARC/Google verification), and `SRV` records.
- [ ] Lower the **TTL** on the root `@` (`A` record) and `www` (`CNAME` record) to **300 seconds (5 minutes)**.

### Step 4.2 — Attach Custom Domain in Render

- [ ] In Render Dashboard → `zodiaclegal-web` → **Settings** → **Custom Domains**, click **Add Custom Domain**.
- [ ] Enter `zodiaclegal.com` (Render will automatically add `www.zodiaclegal.com` as a redirect alias).

### Step 4.3 — Update Only the Web `A` and `CNAME` Records

Update **only** the web traffic records (leaving all `MX` and email `TXT` records untouched):

| Record Type | Host / Name | Value / Target                                      | TTL |
| :---------- | :---------- | :-------------------------------------------------- | :-- |
| **`A`**     | `@` (root)  | `216.24.57.1` _(Render's anycast load balancer IP)_ | 300 |
| **`CNAME`** | `www`       | `zodiaclegal-web.onrender.com`                      | 300 |

- [ ] Click **Verify** in the Render Custom Domains panel.
- [ ] Wait 5–15 minutes for Render to automatically provision and activate the free Let’s Encrypt TLS/SSL certificate for both `zodiaclegal.com` and `www.zodiaclegal.com`.
- [ ] Keep any legacy Wix account active for 48 hours until global DNS propagation finishes, then raise TTL back to `3600`.

---

## Part 5: Post-Cutover SEO, Search Console & Google Business Profile Checklist

### 5.1 — Sitemap & Indexing Submission (Day 1)

- [ ] Verify domain ownership in **Google Search Console** (`https://zodiaclegal.com`) and **Bing Webmaster Tools**.
- [ ] Submit `https://zodiaclegal.com/sitemap-index.xml`.
- [ ] Use URL Inspection in Google Search Console to request priority re-indexing of `/`, `/about/`, `/practice-areas/`, and `/contact/` (which previously returned Wix's `404 ConnectYourDomain` error).
- [ ] Verify that legacy Wix paths (`/services`, `/about-us`, `/contact-us`, `/blog`) return `HTTP 301` to their new destinations:
  ```bash
  curl -I https://zodiaclegal.com/services
  ```
- _(Note: Do NOT use the Google Search Console "Change of Address" tool because the domain `zodiaclegal.com` remains unchanged.)_

### 5.2 — Google Business Profile (Local SEO — Lucknow)

- [ ] Claim/update the **Google Business Profile** for **Zodiac Legal** in Vikas Nagar, Lucknow (`226022`).
- [ ] Ensure exact character-for-character NAP parity between Google Business Profile, Justdial, IndiaMART, and `src/data/siteConfig.ts`.
- [ ] Set Primary Category to **Corporate Office / Legal Services / Law Firm** (as applicable) and Website URL to `https://zodiaclegal.com/`.
- [ ] Monitor Google Search Console Coverage & 404 reports weekly for the first 30 days.
