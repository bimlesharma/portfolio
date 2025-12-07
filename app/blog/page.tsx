import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getHashnodePosts } from '@/lib/hashnode';
import type { HashnodePost, HashnodeTag } from '@/lib/types/hashnode';
import { IoMdTime, IoMdTrendingUp, IoMdGlobe } from "react-icons/io";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import FallbackCover from '@/components/FallbackCover';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Thoughts, tutorials, and insights on development, design, and everything in between.',
    openGraph: {
        title: 'Blog | Bimlesh',
        description: 'Thoughts, tutorials, and insights on development, design, and everything in between.',
        type: 'website',
    },
};

export const revalidate = 3600;

const BlogPage = async () => {
    const posts = await getHashnodePosts();
    const [featuredPost, ...otherPosts] = posts;

    // Check if we're on blog subdomain
    const headersList = await headers();
    const hostname = headersList.get('host') || '';
    const isSubdomain = hostname.startsWith('blog.');
    const basePath = isSubdomain ? '' : '/blog';

    return (
        <main className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Hero Section */}
            <section className="relative">
                <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
                    {/* Hero Content */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-6">
                            <IoMdTrendingUp className="text-lg" />
                            <span>Welcome to my blog</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                                Thoughts, Code
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                                & Everything Dev
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Exploring the intersection of development, design, and innovation.
                            Join me on my journey through code, creativity, and continuous learning.
                        </p>

                        {/* CTA Button */}
                        <div className="mb-8">
                            <Link
                                href={`${basePath}/explore`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white font-medium"
                            >
                                <span>Explore All Topics</span>
                                <span className="text-purple-400">→</span>
                            </Link>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <a
                                href="https://bimlesh.xyz"
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-500 hover:to-blue-500 transition-all font-medium shadow-lg shadow-purple-500/25"
                            >
                                <IoMdGlobe className="text-lg" />
                                <span>Portfolio</span>
                            </a>
                            <a
                                href="https://github.com/bimlesh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                href="https://twitter.com/bimlesh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                            <a
                                href="https://linkedin.com/in/bimlesh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 md:gap-12">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                                    {posts.length}+
                                </div>
                                <div className="text-sm text-neutral-500 mt-1">Articles</div>
                            </div>
                            <div className="w-px h-12 bg-neutral-800" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                                    {posts.reduce((acc, post) => acc + (post.readTimeInMinutes || 0), 0)}+
                                </div>
                                <div className="text-sm text-neutral-500 mt-1">Min Read</div>
                            </div>
                            <div className="w-px h-12 bg-neutral-800" />
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                                    {new Set(posts.flatMap(post => post.tags?.map(tag => tag.name) || [])).size}+
                                </div>
                                <div className="text-sm text-neutral-500 mt-1">Topics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-3xl font-bold text-white">Latest Article</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </div>

                    <Link
                        href={`${basePath}/${featuredPost.slug}`}
                        className="group block"
                    >
                        <div className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:shadow-[0_0_80px_-12px_rgba(168,85,247,0.6)]">
                            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                                <div className="flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 mb-4 uppercase tracking-wider">
                                        <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">Featured</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-neutral-400 text-lg mb-6 line-clamp-3">
                                        {featuredPost.brief}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <IoMdTime />
                                            {featuredPost.readTimeInMinutes} min read
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-6">
                                            {featuredPost.tags.slice(0, 3).map((tag: HashnodeTag, idx: number) => (
                                                <span key={idx} className="px-3 py-1 text-xs bg-neutral-800/50 border border-neutral-700 rounded-full text-neutral-300">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden">
                                    {featuredPost.coverImage?.url ? (
                                        <Image
                                            src={featuredPost.coverImage.url}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <FallbackCover title={featuredPost.title} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Recent Posts Grid */}
            {otherPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-3xl font-bold text-white">Recent Articles</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map((post: HashnodePost) => (
                            <Link
                                href={`${basePath}/${post.slug}`}
                                key={post.id}
                                className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    {post.coverImage?.url ? (
                                        <Image
                                            src={post.coverImage.url}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <FallbackCover title={post.title} />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                                </div>

                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                                        {post.brief}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <IoMdTime />
                                            {post.readTimeInMinutes} min
                                        </span>
                                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(0, 2).map((tag: HashnodeTag, idx: number) => (
                                                <span key={idx} className="px-2 py-1 text-xs bg-neutral-800/50 border border-neutral-700 rounded-full text-neutral-400">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {posts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-neutral-500">No posts found</p>
                </div>
            )}
        </main>
    );
};

export default BlogPage;