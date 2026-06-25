import BlogNavbar from '@/components/BlogNavbar';

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
