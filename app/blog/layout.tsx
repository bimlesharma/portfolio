import type { Metadata } from 'next';
import BlogNavbar from '@/components/BlogNavbar';

export const metadata: Metadata = {
    alternates: {
        types: {
            'application/rss+xml': 'https://bimlesh.dev/blog/feed.xml',
        },
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex flex-col bg-[#0a0a0a]">
            <BlogNavbar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
