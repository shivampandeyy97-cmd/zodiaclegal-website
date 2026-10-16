# Open Items & Owner Verification Checklist (`zodiaclegal.com`)

Because `https://zodiaclegal.com` and `https://www.zodiaclegal.com` returned Wix's `ConnectYourDomain` HTTP 404 error during Phase 0 discovery (and the Internet Archive Wayback Machine was simultaneously offline), no facts, bar numbers, or client names were invented. Every unverified detail is isolated into central configuration and listed below for owner confirmation prior to production DNS cut-over.

---

## 1. Brand & Visual Assets
- [ ] **Original Logo File (`/public/brand/logo.svg` & `/public/brand/logo-light.svg`):**
  - **Current Status:** High-resolution vector placeholder monogram + wordmark installed in `/public/brand/logo.svg` using deep legal navy (`#0B132B`), warm parchment (`#F8F6F0`), and muted brass (`#B8924A`).
  - **Owner Action:** If you have the original PNG/SVG/AI logo file from the Wix Media Manager, drop it into `/public/brand/` to replace `logo.svg` and `logo-light.svg`.
- [ ] **Office & Team Photography (`/public/images/`):**
  - **Current Status:** Restrained architectural linework SVGs used (zero stock-photo clichés such as gavels, scales, or staged handshakes).
  - **Owner Action:** Optionally supply authentic high-resolution photographs of the Vikas Nagar chamber and individual advocates.

---

## 2. Firm NAP (Name, Address, Phone) & Regulatory Details
All NAP fields are centralized in `src/data/siteConfig.ts` so updating one file updates the header, footer, contact page, and all JSON-LD schemas (`LegalService`, `Organization`, `LocalBusiness`).

- [ ] **Street / Chamber Number in Vikas Nagar:**
  - **Current Value:** `Vikas Nagar, Lucknow, Uttar Pradesh – 226022, India (Chamber / Plot number to be confirmed by Firm Administration)`
  - **Owner Action:** Supply the exact sector/plot/chamber number for Google Business Profile and footer NAP parity.
- [ ] **Primary Telephone & WhatsApp Number:**
  - **Current Value:** `+91 98390 10163` *(sourced from public Lucknow business directory listing for Zodiac Legal)*
  - **Owner Action:** Confirm whether `+91 98390 10163` remains the primary intake and WhatsApp number or provide updated phone numbers.
- [ ] **Official Intake Email Address:**
  - **Current Value:** `contact@zodiaclegal.com`
  - **Owner Action:** Confirm the active mailbox configured on your domain's MX records.
- [ ] **Corporate Affiliation Footnote:**
  - **Current Value:** Directory records note Zodiac Legal's association with *Shashwat Global Services*. Under Bar Council of India Rules (Rule 36 & advocates' practice regulations), legal representation before courts/tribunals must be conducted strictly by enrolled Advocates.
  - **Owner Action:** Confirm with counsel how (or whether) the *Shashwat Global Services* consultancy affiliation should be referenced on `/about/` and `/disclaimer/`.

---

## 3. Advocate Profiles & Bar Council Enrolment (`src/content/team/`)
- [ ] **Individual Advocate Names, Qualifications & Bar Council of Uttar Pradesh (BCUP) Enrolment Numbers:**
  - **Current Status:** We have structured the `/team/` profiles around Zodiac Legal's verified practice desks (Corporate & Commercial Desk, Litigation & Recovery Desk, Real Estate & Regulatory Desk) with explicit `[Owner Confirmation Required: Advocate Name & UP Bar Enrolment No.]` notices rather than fabricating attorney names or enrolment numbers.
  - **Owner Action:** Update `src/content/team/*.md` with the exact names, LL.B./LL.M./CS credentials, and `UP/XXXX/YYYY` Bar Council enrolment numbers of the firm's partners and associates.

---

## 4. Practice Area Additions for Owner Review
- [ ] **9 Core Practice Areas Included:** Derived from directory records of Zodiac Legal (Corporate & Commercial, Contracts & Agreements, Startups & Compliance, Dispute Resolution & Arbitration, Real Estate & UP-RERA, Intellectual Property, Employment & Labour, Banking/Finance/NCLT/DRT, and Taxation/Consumer/Regulatory).
- [ ] **Matrimonial / Family Law & Criminal Defence:** Public directories (Justdial) also mention general family/divorce consultation. Since the Master Prompt specifies positioning Zodiac Legal as a **corporate legal services firm**, we have prioritized the 9 corporate, commercial, real estate, and financial dispute practice areas. Confirm if a separate Personal/Family Law practice page is desired.

---

## 5. Infrastructure, Credentials & CLI Access
- [ ] **GitHub CLI (`gh`) & Remote Push:**
  - **Current Status:** `gh` CLI is not installed on the local build machine (`zsh: command not found: gh`). Git repository is initialized locally with `main` and `develop` branches, conventional commits, `.github/workflows/ci.yml`, and issue templates ready.
  - **Owner Action:** Install `gh` (`brew install gh && gh auth login`) and run `gh repo create zodiaclegal-website --private --source=. --remote=origin --push && git push -u origin develop`.
- [ ] **Environment Variables (Render & Analytics):**
  - `RESEND_API_KEY` (or SMTP credentials) for `/server` consultation form delivery
  - `CONTACT_RECEIVER_EMAIL` (e.g., `contact@zodiaclegal.com`)
  - `PUBLIC_GA4_ID` (`G-XXXXXXXXXX`) and `PUBLIC_GSC_VERIFICATION` token
  - `PUBLIC_API_URL` (URL of the Render Web Service for `/server`)
