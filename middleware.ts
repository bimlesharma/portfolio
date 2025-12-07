import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const { pathname } = request.nextUrl;

    // If on main domain and accessing /blog, redirect to subdomain
    if (!hostname.startsWith('blog.') && pathname.startsWith('/blog')) {
        const url = new URL(request.url);
        url.host = `blog.${url.host}`;
        // Remove /blog from the path
        url.pathname = pathname.replace('/blog', '') || '/';
        return NextResponse.redirect(url, 301);
    }

    // If on blog subdomain, rewrite to /blog path internally
    if (hostname.startsWith('blog.')) {
        const url = request.nextUrl.clone();

        // Root path on subdomain -> /blog
        if (pathname === '/') {
            url.pathname = '/blog';
            return NextResponse.rewrite(url);
        }

        // Other paths on subdomain -> /blog/path (if not already prefixed)
        if (!pathname.startsWith('/blog')) {
            url.pathname = `/blog${pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
