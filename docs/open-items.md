# Open Items & Owner Verification Checklist (`zodiaclegal.com`)

Because `https://zodiaclegal.com` and `https://www.zodiaclegal.com` returned Wix's `ConnectYourDomain` HTTP 404 error during Phase 0 discovery, all verified assets supplied by the owner have been integrated directly, and remaining administrative confirmations are listed below prior to production DNS cut-over.

---

## 1. Brand & Visual Assets (Integrated ✅)

- [x] **Official Logo File (`/public/brand/logo.png`):**
  - **Status:** Integrated verbatim without alteration from the owner-supplied Zodiac Legal logo (`538x270` PNG featuring the calligraphic orange `Z` + `odiac`, carbon black `Legal`, and balanced scales).
- [x] **Team Portraits (`/public/images/team/`):**
  - **Status:** Extracted at full resolution from the owner-supplied Team visual:
    - **Shalini Pandey** — Head (`/images/team/shalini-pandey.png`)
    - **Sakshi Pandey** — Legal Assistant (`/images/team/sakshi-pandey.png`)
    - **Shiv Kumar Pandey** — Principal Advisor (`/images/team/shiv-kumar-pandey.png`)

---

## 2. Firm NAP (Name, Address, Phone) & Regulatory Details

All NAP fields are centralized in [`src/data/siteConfig.ts`](../src/data/siteConfig.ts) so updating one file updates the header, footer, contact page, and all JSON-LD schemas (`LegalService`, `Organization`, `LocalBusiness`).

- [ ] **Street / Chamber Number in Vikas Nagar:**
  - **Current Value:** `Vikas Nagar, Lucknow, Uttar Pradesh – 226022, India (Chamber / Plot number to be confirmed by Firm Administration)`
  - **Owner Action:** Supply the exact sector/plot/chamber number for Google Business Profile and footer NAP parity.
- [ ] **Primary Telephone & WhatsApp Number:**
  - **Current Value:** `+91 98390 10163` _(sourced from public Lucknow business directory listing for Zodiac Legal)_
  - **Owner Action:** Confirm whether `+91 98390 10163` remains the primary intake and WhatsApp number or provide updated phone numbers.
- [ ] **Official Intake Email Address:**
  - **Current Value:** `contact@zodiaclegal.com`
  - **Owner Action:** Confirm the active mailbox configured on your domain's MX records.

---

## 3. Infrastructure, Credentials & CLI Access

- [ ] **GitHub CLI (`gh`) & Remote Push:**
  - **Current Status:** `gh` CLI is not installed on the local build machine (`zsh: command not found: gh`). Git repository is initialized locally with `main` and `develop` branches, conventional commits, `.github/workflows/ci.yml`, and issue templates ready.
  - **Owner Action:** Install `gh` (`brew install gh && gh auth login`) and run `gh repo create zodiaclegal-website --private --source=. --remote=origin --push && git push -u origin develop`.
- [ ] **Environment Variables (Render & Analytics):**
  - `RESEND_API_KEY` (or SMTP credentials) for `/server` consultation form delivery
  - `CONTACT_RECEIVER_EMAIL` (e.g., `contact@zodiaclegal.com`)
  - `PUBLIC_GA4_ID` (`G-XXXXXXXXXX`) and `PUBLIC_GSC_VERIFICATION` token
  - `PUBLIC_API_URL` (URL of the Render Web Service for `/server`)
