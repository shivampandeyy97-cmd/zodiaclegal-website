import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../data/siteConfig';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const insights = (await getCollection('insights')).sort((a, b) =>
    b.data.publishDate.localeCompare(a.data.publishDate)
  );

  return rss({
    title: `${SITE_CONFIG.name} — Statutory Insights & Legal Guides`,
    description: SITE_CONFIG.descriptions.short50,
    site: context.site ?? SITE_CONFIG.url,
    items: insights.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishDate),
      description: post.data.directAnswer,
      link: `/insights/${post.slug}/`,
      categories: [post.data.category],
    })),
    customData: `<language>en-in</language>`,
  });
}
