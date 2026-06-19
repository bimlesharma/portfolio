import { MetadataRoute } from 'next';
import { getSanityPosts } from '@/lib/sanity-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bimlesh.dev';
    const blogBaseUrl = 'https://blog.bimlesh.dev'; // or https://bimlesh.dev/blog

    // Fetch all blog posts
    const posts = await getSanityPosts();

    // Generate blog post URLs
    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

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

    return [...staticPages, ...blogPosts];
}

export const revalidate = 3600; // Revalidate every hour
