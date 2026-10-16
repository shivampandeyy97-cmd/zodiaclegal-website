export const SITE_CONFIG = {
  name: 'Zodiac Legal',
  legalUnitNote: 'Advocates & Corporate Legal Consultancy (Associated with Shashwat Global Services)',
  tagline: 'Corporate, Commercial & Regulatory Counsel in Lucknow, Uttar Pradesh',
  url: 'https://zodiaclegal.com',
  locale: 'en-IN',
  nap: {
    firmName: 'Zodiac Legal',
    streetAddress: 'Vikas Nagar (Chamber details available upon appointment confirmation)',
    locality: 'Lucknow',
    region: 'Uttar Pradesh',
    postalCode: '226022',
    country: 'India',
    countryCode: 'IN',
    phoneDisplay: '+91 98390 10163',
    phoneE164: '+919839010163',
    whatsappNumber: '919839010163',
    email: 'contact@zodiaclegal.com',
    hours: 'Monday – Saturday: 10:00 AM – 7:00 PM IST (By Appointment)',
    geo: {
      latitude: 26.8986,
      longitude: 80.9639,
    },
  },
  descriptions: {
    short50:
      'Zodiac Legal is a corporate and commercial law practice in Vikas Nagar, Lucknow, Uttar Pradesh. We advise companies, startups, and individuals on corporate governance, commercial contracts, UP-RERA real estate matters, debt recovery (IBC/NCLT, DRT, Section 138 NI Act), intellectual property, employment law, and arbitration.',
    standard150:
      'Zodiac Legal is a corporate legal services and dispute resolution practice based in Vikas Nagar, Lucknow, Uttar Pradesh. Serving businesses, promoters, financial creditors, startups, and property owners across Uttar Pradesh, the firm combines transactional precision with structured representation before judicial and quasi-judicial forums. Our core practice encompasses entity incorporation and governance under the Companies Act 2013, commercial contract drafting and negotiation, startup and MSME regulatory compliance, domestic arbitration and commercial litigation, real estate title due diligence and UP-RERA proceedings, debt recovery under the Insolvency and Bankruptcy Code (NCLT Allahabad), SARFAESI proceedings (DRT Lucknow), and Section 138 Negotiable Instruments Act matters, alongside trademark protection, labour compliance, and consumer redressal. All legal work is approached with clear documentation checklists, statutory timelines, and plain-English risk assessment.',
  },
  jurisdictions: [
    'High Court of Judicature at Allahabad — Lucknow Bench',
    'Commercial Courts, Lucknow',
    'National Company Law Tribunal (NCLT) — Allahabad Bench',
    'Debts Recovery Tribunal (DRT), Lucknow',
    'Uttar Pradesh Real Estate Regulatory Authority (UP-RERA), Lucknow',
    'State & District Consumer Disputes Redressal Commissions, UP',
    'District & Sessions Courts, Lucknow',
    'Micro and Small Enterprises Facilitation Council (MSEFC), UP',
  ],
  bciDisclaimerShort:
    'Informational only; not legal advice or solicitation under Rule 36 of the Bar Council of India Rules.',
  bciDisclaimerFull:
    'Under Rule 36, Chapter II, Part VI of the Bar Council of India Rules framed under the Advocates Act, 1961, advocates in India are prohibited from soliciting work or advertising directly or indirectly. This website is maintained solely to provide factual information regarding Zodiac Legal, its areas of practice, and statutory updates upon the user’s specific request. Viewing this site or submitting an inquiry does not create an advocate-client relationship.',
} as const;

export const PRACTICE_AREAS_NAV = [
  {
    slug: 'corporate-commercial',
    title: 'Corporate & Commercial Law',
    shortDesc: 'Entity governance, board advisory, joint ventures, and Companies Act 2013 compliance.',
  },
  {
    slug: 'contracts-agreements',
    title: 'Contracts & Commercial Agreements',
    shortDesc: 'Drafting, vetting, and negotiation of MSAs, SLAs, NDAs, shareholder and vendor contracts.',
  },
  {
    slug: 'startups-compliance',
    title: 'Startups & Regulatory Compliance',
    shortDesc: 'Incorporation, founders’ agreements, DPIIT & MSME filings, and annual ROC compliance.',
  },
  {
    slug: 'dispute-resolution-arbitration',
    title: 'Dispute Resolution & Arbitration',
    shortDesc: 'Domestic arbitration under the 1996 Act, commercial court litigation, and civil recovery.',
  },
  {
    slug: 'real-estate-rera',
    title: 'Real Estate & UP-RERA',
    shortDesc: 'Title due diligence, conveyance deeds, commercial leases, and UP-RERA representation.',
  },
  {
    slug: 'banking-finance-nclt-drt',
    title: 'Banking, Finance, NCLT & DRT',
    shortDesc: 'IBC insolvency petitions, SARFAESI / DRT Lucknow matters, and Section 138 NI Act proceedings.',
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual Property (IP)',
    shortDesc: 'Trademark registration, objection replies, copyright protection, and IP licensing.',
  },
  {
    slug: 'employment-labour',
    title: 'Employment & Labour Law',
    shortDesc: 'Employment contracts, POSH compliance, UP Shops & Establishments Act, and HR policies.',
  },
  {
    slug: 'taxation-regulatory',
    title: 'Taxation, GST & Consumer Redressal',
    shortDesc: 'GST show-cause replies, regulatory appeals, and Consumer Protection Act 2019 proceedings.',
  },
] as const;
