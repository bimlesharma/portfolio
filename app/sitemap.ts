import { MetadataRoute } from 'next';
import { getSanityPosts } from '@/lib/sanity-api';
import { getAllWork, workHref, workIndexHref } from '@/lib/work';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bimlesh.dev';

    // Fetch all blog posts
    const posts = await getSanityPosts();

    // Generate blog post URLs
    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const workPages = [
        {
            url: `${baseUrl}${workIndexHref('product')}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}${workIndexHref('project')}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...getAllWork().map((item) => ({
            url: `${baseUrl}${workHref(item)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.75,
        })),
    ];

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ];

    return [...staticPages, ...workPages, ...blogPosts];
}

export const revalidate = 3600; // Revalidate every hour
