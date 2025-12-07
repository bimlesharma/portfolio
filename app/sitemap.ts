import { MetadataRoute } from 'next';
import { getHashnodePosts } from '@/lib/hashnode';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bimlesh.xyz';
    const blogBaseUrl = 'https://blog.bimlesh.xyz';

    // Fetch all blog posts
    const posts = await getHashnodePosts();

    // Generate blog post URLs
    const blogPosts = posts.map((post) => ({
        url: `${blogBaseUrl}/${post.slug}`,
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
            url: blogBaseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ];

    return [...staticPages, ...blogPosts];
}

export const revalidate = 3600; // Revalidate every hour
