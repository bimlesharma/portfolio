import { getSanityPosts } from '@/lib/sanity-api';
import type { SanityPost } from '@/lib/types/sanity';

export const revalidate = 3600;

export async function GET() {
    const posts = await getSanityPosts();
    const baseUrl = 'https://bimlesh.dev';

    const items = posts
        .map((post: SanityPost) => {
            const url = `${baseUrl}/blog/${post.slug.current}`;
            const pubDate = new Date(post.publishedAt).toUTCString();
            const categories = (post.categories || [])
                .map((c: string) => `<category>${escapeXml(c)}</category>`)
                .join('');

            return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.brief || '')}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.authorName ? `<author>${escapeXml(post.authorName)}</author>` : ''}
      ${categories}
    </item>`;
        })
        .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bimlesh's Digital Garden</title>
    <link>${baseUrl}/blog</link>
    <description>Deep dives into software engineering, artificial intelligence, and building polished products.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
