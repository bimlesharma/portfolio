import type { Metadata } from 'next';

export const metadata: Metadata = {
    alternates: {
        types: {
            'application/rss+xml': 'https://bimlesh.dev/blog/feed.xml',
        },
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background pt-24">
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
