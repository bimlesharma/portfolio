'use client';
import { useEffect, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';

interface BlogContentProps {
    html: string;
    className?: string;
}

export default function BlogContent({ html, className = '' }: BlogContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        // Find all pre > code blocks and enhance them
        const preElements = contentRef.current.querySelectorAll('pre');

        preElements.forEach((pre) => {
            const code = pre.querySelector('code');
            if (!code) return;

            // Extract language from class (e.g., "lang-javascript" or "language-javascript")
            const languageClass = code.className.match(/(?:lang|language)-(\w+)/);
            const language = languageClass ? languageClass[1] : undefined;

            // Get the code text
            const codeText = code.textContent || '';

            // Create a wrapper div for our React component
            const wrapper = document.createElement('div');
            pre.parentNode?.replaceChild(wrapper, pre);

            // We'll use a data attribute to pass props
            wrapper.setAttribute('data-code', codeText);
            wrapper.setAttribute('data-language', language || 'code');
            wrapper.className = 'code-block-wrapper';
        });

        // Now render CodeBlock components for each wrapper
        const wrappers = contentRef.current.querySelectorAll('.code-block-wrapper');
        wrappers.forEach((wrapper) => {
            const code = wrapper.getAttribute('data-code') || '';
            const language = wrapper.getAttribute('data-language') || undefined;

            // Create a container for React to render into
            const container = document.createElement('div');
            wrapper.appendChild(container);

            // Import and render dynamically
            import('react-dom/client').then(({ createRoot }) => {
                const root = createRoot(container);
                root.render(<CodeBlock code={code} language={language} />);
            });
        });
    }, [html]);

    return (
        <div
            ref={contentRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
