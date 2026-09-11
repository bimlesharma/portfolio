import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/studio/', '/admin/'],
            },
        ],
        sitemap: 'https://bimlesh.dev/sitemap.xml',
    };
}
