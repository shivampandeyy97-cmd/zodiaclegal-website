import { defineCollection, z } from 'astro:content';

const practiceAreas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(65),
    metaDescription: z.string().max(160),
    order: z.number(),
    category: z.enum(['Transactional & Advisory', 'Disputes & Recovery', 'Regulatory & IP']),
    summary: z.string(),
    directAnswer: z.string(),
    statutesCovered: z.array(z.string()),
    forumsCovered: z.array(z.string()),
    typicalSituations: z.array(z.string()),
    processSteps: z.array(
      z.object({
        step: z.string(),
        detail: z.string(),
      })
    ),
    documentsNeeded: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    relatedInsights: z.array(z.string()),
    lastReviewed: z.string(),
    reviewedBy: z.string(),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(65),
    metaDescription: z.string().max(160),
    publishDate: z.string(),
    lastReviewed: z.string(),
    author: z.string(),
    reviewedBy: z.string(),
    category: z.string(),
    practiceAreaSlug: z.string(),
    readingTime: z.string(),
    directAnswer: z.string(),
    keyTakeaways: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    desk: z.string(),
    order: z.number(),
    image: z.string(),
    qualifications: z.array(z.string()),
    barEnrolmentNote: z.string(),
    practiceFocus: z.array(z.string()),
    forums: z.array(z.string()),
    languages: z.array(z.string()),
    summary: z.string(),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.string(),
    order: z.number(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    clientLabel: z.string(),
    sector: z.string(),
    matterType: z.string(),
    engagementNote: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  'practice-areas': practiceAreas,
  insights,
  team,
  faqs,
  testimonials,
};
