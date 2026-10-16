import { SITE_CONFIG } from '../data/siteConfig';

export function buildOrganizationAndLegalServiceSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['LegalService', 'LocalBusiness', 'Organization'],
      '@id': `${SITE_CONFIG.url}/#legalservice`,
      name: SITE_CONFIG.name,
      alternateName: 'Zodiac Legal Lucknow',
      description: SITE_CONFIG.descriptions.standard150,
      url: `${SITE_CONFIG.url}/`,
      logo: `${SITE_CONFIG.url}/brand/logo.png`,
      image: `${SITE_CONFIG.url}/brand/logo.png`,
      telephone: SITE_CONFIG.nap.phoneE164,
      email: SITE_CONFIG.nap.email,
      priceRange: '$$',
      member: [
        {
          '@type': 'Person',
          name: 'Shalini Pandey',
          jobTitle: 'Head',
          image: `${SITE_CONFIG.url}/images/team/shalini-pandey.png`,
        },
        {
          '@type': 'Person',
          name: 'Sakshi Pandey',
          jobTitle: 'Legal Assistant',
          image: `${SITE_CONFIG.url}/images/team/sakshi-pandey.png`,
        },
        {
          '@type': 'Person',
          name: 'Shiv Kumar Pandey',
          jobTitle: 'Principal Advisor',
          image: `${SITE_CONFIG.url}/images/team/shiv-kumar-pandey.png`,
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.nap.streetAddress,
        addressLocality: SITE_CONFIG.nap.locality,
        addressRegion: SITE_CONFIG.nap.region,
        postalCode: SITE_CONFIG.nap.postalCode,
        addressCountry: SITE_CONFIG.nap.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.nap.geo.latitude,
        longitude: SITE_CONFIG.nap.geo.longitude,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Lucknow',
        },
        {
          '@type': 'State',
          name: 'Uttar Pradesh',
        },
        {
          '@type': 'Country',
          name: 'India',
        },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
      ],
      knowsLanguage: ['en-IN', 'hi-IN'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/#website`,
      url: `${SITE_CONFIG.url}/`,
      name: SITE_CONFIG.name,
      publisher: {
        '@id': `${SITE_CONFIG.url}/#legalservice`,
      },
      inLanguage: ['en-IN', 'hi-IN'],
    },
  ];
}

export function buildWebPageSchema(params: {
  title: string;
  description: string;
  url: string;
  lastReviewed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${params.url}#webpage`,
    url: params.url,
    name: params.title,
    description: params.description,
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/#website`,
    },
    about: {
      '@id': `${SITE_CONFIG.url}/#legalservice`,
    },
    ...(params.lastReviewed ? { lastReviewed: params.lastReviewed } : {}),
  };
}

export function buildFaqSchema(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildServiceSchema(params: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: 'Legal Consultation & Representation',
    provider: {
      '@id': `${SITE_CONFIG.url}/#legalservice`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Lucknow, Uttar Pradesh, India',
    },
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  publishDate: string;
  lastReviewed: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    mainEntityOfPage: params.url,
    datePublished: params.publishDate,
    dateModified: params.lastReviewed,
    author: {
      '@type': 'Organization',
      name: params.author,
      url: `${SITE_CONFIG.url}/team/`,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#legalservice`,
    },
  };
}
