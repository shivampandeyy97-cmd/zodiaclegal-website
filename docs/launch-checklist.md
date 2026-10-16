# Render Deployment, GoDaddy DNS Cut-Over & Local SEO Runbook (`zodiaclegal.com`)

This runbook documents the live GitHub repository, 1-click **Render Blueprint** deployment, and the exact **GoDaddy DNS cut-over** steps from Wix (`ns14.wixdns.net` / `ns15.wixdns.net`) to Render (`216.24.57.1` & `zodiaclegal-web.onrender.com`).

---

## Part 1: Live GitHub Repository (Completed)

Both the `main` (production) and `develop` (staging) branches have been pushed to GitHub:

- **Repository URL:** `https://github.com/zodiaclegallucknow-prog/zodiaclegal-website`
- **Render Blueprint File:** [`render.yaml`](../render.yaml) (pre-configured with `zodiaclegal.com` and `www.zodiaclegal.com` custom domains, HSTS/CSP headers, 31 legacy Wix `301` redirects, and the `/server` Consultation API).

---

## Part 2: 1-Click Render Blueprint Deployment

1. Open the direct Render Blueprint launcher for your repository:
   - **1-Click Deploy URL:** `https://dashboard.render.com/blueprint/new?repo=https://github.com/zodiaclegallucknow-prog/zodiaclegal-website`
   - _(Or in [Render Dashboard](https://dashboard.render.com/), click **New +** → **Blueprint** → select `zodiaclegallucknow-prog/zodiaclegal-website`)._
2. Give the Blueprint a name (e.g., `zodiaclegal-production`) and click **Apply**.
3. Render will automatically provision and deploy both services defined in [`render.yaml`](../render.yaml):
   - **`zodiaclegal-web`** (Static Site — builds `./dist`, attaches custom domains `zodiaclegal.com` and `www.zodiaclegal.com`, and configures all 31 Wix `301` redirects).
   - **`zodiaclegal-api`** (Node Web Service — runs `node server/index.mjs` on port `8787` with `/healthz` health check).
4. _(Optional)_ Once your Resend email key or Google Analytics 4 ID are ready, add them under **Environment** in the Render Dashboard:
   - On `zodiaclegal-api`: `RESEND_API_KEY` (`re_...`)
   - On `zodiaclegal-web`: `PUBLIC_GA4_ID` (`G-...`) and `PUBLIC_GSC_VERIFICATION`

---

## Part 3: GoDaddy DNS Cut-Over (`zodiaclegal.com` — Wix → Render)

### Live DNS Audit Findings (`dig` / `whois` Snapshot)

- **Registrar:** GoDaddy.com, LLC (Expires `2029-07-29`)
- **Current Nameservers:** `NS14.WIXDNS.NET` and `NS15.WIXDNS.NET`
- **Current Root `A` Records (Wix):** `185.230.63.171`, `185.230.63.107`, `185.230.63.186`
- **Current `www` `CNAME` Record (Wix):** `cdn3.wixdns.net`
- **Current `MX` / `TXT` Records:** None detected on `zodiaclegal.com` (check your Wix DNS panel before switching if you ever added custom email records).

### Step 3.1 — Switch Nameservers from Wix to GoDaddy Default Nameservers

Because `zodiaclegal.com` currently uses Wix nameservers (`NS14.WIXDNS.NET` / `NS15.WIXDNS.NET`), GoDaddy disables DNS record editing until you switch back to GoDaddy's default nameservers:

1. Log in to your [GoDaddy Portfolio](https://dcc.godaddy.com/domains) and select **`zodiaclegal.com`**.
2. Go to **DNS** → **Nameservers** → click **Change Nameservers**.
3. Select **I'll use GoDaddy nameservers (Recommended)** and click **Save / Continue**.

### Step 3.2 — Add Render's `A` and `CNAME` Records in GoDaddy DNS

In GoDaddy → **DNS** → **DNS Records** for `zodiaclegal.com`, delete any parked `@` (`A`) or `www` (`CNAME`) records and set the exact records below:

| Type        | Name (Host) | Value (Points to)              | TTL                       |
| :---------- | :---------- | :----------------------------- | :------------------------ |
| **`A`**     | `@`         | `216.24.57.1`                  | 600 seconds (or 1/2 Hour) |
| **`CNAME`** | `www`       | `zodiaclegal-web.onrender.com` | 600 seconds (or 1/2 Hour) |

> **Important Note on Email (`MX` / `TXT`):**  
> If you use Google Workspace, Microsoft 365, or Zoho Mail for `@zodiaclegal.com`, keep your `MX`, `TXT` (`v=spf1 ...`), and `DKIM` records intact in GoDaddy DNS. Only the `@` (`A`) and `www` (`CNAME`) records should point to Render.

### Step 3.3 — Verify Custom Domain & SSL in Render

1. In [Render Dashboard](https://dashboard.render.com/) → **`zodiaclegal-web`** → **Settings** → **Custom Domains**, you will see `zodiaclegal.com` and `www.zodiaclegal.com` (automatically added by `render.yaml`).
2. Click **Verify** next to `zodiaclegal.com` and `www.zodiaclegal.com`.
3. Render will automatically issue and activate a free Let's Encrypt TLS/SSL certificate within 5–15 minutes once GoDaddy's nameserver change propagates.
4. Test locally from your terminal:
   ```bash
   dig zodiaclegal.com A +short
   # Expected output: 216.24.57.1

   dig www.zodiaclegal.com CNAME +short
   # Expected output: zodiaclegal-web.onrender.com.

   curl -I https://zodiaclegal.com
   # Expected output: HTTP/2 200
   ```

---

## Part 4: Post-Cutover SEO, Search Console & Google Business Profile Checklist

1. [ ] Verify domain ownership in **Google Search Console** (`https://zodiaclegal.com`) and **Bing Webmaster Tools**.
2. [ ] Submit `https://zodiaclegal.com/sitemap-index.xml`.
3. [ ] Request priority indexing in Google Search Console for `/`, `/about/`, `/team/`, `/practice-areas/`, and `/contact/` to clear Wix's old `404 ConnectYourDomain` cache from Google Search results.
4. [ ] Update the **Google Business Profile** for **Zodiac Legal** (Vikas Nagar, Lucknow `226022`) with `https://zodiaclegal.com/`.
