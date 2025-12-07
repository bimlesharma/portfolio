import { headers } from 'next/headers';

/**
 * Get the base path for blog links based on the current hostname
 * Returns empty string for blog subdomain, '/blog' for main domain
 */
export async function getBlogBasePath(): Promise<string> {
    const headersList = await headers();
    const hostname = headersList.get('host') || '';

    // If on blog subdomain, don't add /blog prefix
    if (hostname.startsWith('blog.')) {
        return '';
    }

    // On main domain, use /blog prefix
    return '/blog';
}

/**
 * Generate a blog post URL
 */
export async function getBlogPostUrl(slug: string): Promise<string> {
    const basePath = await getBlogBasePath();
    return `${basePath}/${slug}`;
}

/**
 * Generate blog home URL
 */
export async function getBlogHomeUrl(): Promise<string> {
    const basePath = await getBlogBasePath();
    return basePath || '/';
}
