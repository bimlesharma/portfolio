'use client';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import CodeBlock from '@/components/CodeBlock';
import ClickableImage from '@/components/ClickableImage';
import { urlForImage } from '@/sanity/lib/image';

interface BlogContentProps {
    value: any[];
    className?: string;
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            const imgUrl = urlForImage(value).url();
            return (
                <div className="my-8">
                    <ClickableImage src={imgUrl} alt={value.alt || 'Blog image'} />
                    {value.caption && (
                        <p className="text-center text-xs text-neutral-500 mt-2 font-mono">{value.caption}</p>
                    )}
                </div>
            );
        },
        code: ({ value }) => {
            return <CodeBlock code={value.code} language={value.language} />;
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
        h2: ({ children, value }) => {
            const text = value.children?.map((c: any) => c.text).join('') || '';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return <h2 id={id} className="text-3xl font-bold mt-10 mb-5 scroll-mt-24">{children}</h2>;
        },
        h3: ({ children, value }) => {
            const text = value.children?.map((c: any) => c.text).join('') || '';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return <h3 id={id} className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">{children}</h3>;
        },
        h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
        normal: ({ children }) => <p className="text-neutral-300 leading-relaxed mb-6">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 pl-6 my-8 italic text-neutral-400 bg-purple-500/5 py-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside mb-6 text-neutral-300 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-6 text-neutral-300 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-500 transition-all"
            >
                {children}
            </a>
        ),
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-neutral-400">{children}</em>,
    },
};

export default function BlogContent({ value, className = '' }: BlogContentProps) {
    if (!value) return null;
    
    return (
        <div className={className}>
            <PortableText value={value} components={components} />
        </div>
    );
}
