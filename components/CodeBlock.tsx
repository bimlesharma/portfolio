'use client';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Custom dark theme based on your design
    const customStyle = {
        ...oneDark,
        'pre[class*="language-"]': {
            ...oneDark['pre[class*="language-"]'],
            background: '#0d1117',
            margin: 0,
            padding: '1rem',
            borderRadius: '0 0 0.5rem 0.5rem',
        },
        'code[class*="language-"]': {
            ...oneDark['code[class*="language-"]'],
            background: 'transparent',
        },
    };

    return (
        <div className="group relative my-6 overflow-hidden rounded-none border border-zinc-800">
            {/* Language label and copy button */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
                <span className="font-mono text-xs font-semibold text-zinc-400 uppercase">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="size-3.5 text-green-400" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="size-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Syntax highlighted code */}
            <SyntaxHighlighter
                language={language}
                style={customStyle}
                customStyle={{
                    margin: 0,
                    background: '#0d1117',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                }}
                showLineNumbers={false}
                wrapLines={true}
                wrapLongLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
