import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/sanity-api';

export const runtime = 'edge';

// Image metadata
export const alt = 'About Bimlesh Blog Post';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 128,
                        background: 'black',
                        color: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Post Not Found
                </div>
            ),
            {
                ...size,
            }
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #09090b, #1e1b4b, #0f172a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Header elements */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {post.categories && post.categories.length > 0 && (
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {post.categories.slice(0, 3).map((category: string, i: number) => (
                                    <div
                                        key={i}
                                        style={{
                                            color: '#d8b4fe',
                                            background: 'rgba(168, 85, 247, 0.1)',
                                            border: '1px solid rgba(168, 85, 247, 0.3)',
                                            padding: '8px 16px',
                                            borderRadius: '9999px',
                                            fontSize: 24,
                                            fontWeight: 600,
                                        }}
                                    >
                                        #{category}
                                    </div>
                                ))}
                            </div>
                        )}
                        <h1
                            style={{
                                fontSize: 84,
                                fontWeight: 800,
                                color: 'white',
                                lineHeight: 1.1,
                                margin: 0,
                                marginTop: 20,
                                maxWidth: '900px',
                            }}
                        >
                            {post.title}
                        </h1>
                        {post.brief && (
                            <p
                                style={{
                                    fontSize: 36,
                                    color: '#9ca3af',
                                    margin: 0,
                                    marginTop: 20,
                                    maxWidth: '900px',
                                    lineHeight: 1.4,
                                }}
                            >
                                {post.brief.slice(0, 150)}{post.brief.length > 150 ? '...' : ''}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer elements */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: 'white',
                                letterSpacing: '-0.05em',
                            }}
                        >
                            bimlesh.dev
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#9ca3af', gap: '24px' }}>
                        {post.readTimeInMinutes && <span>{post.readTimeInMinutes} min read</span>}
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
