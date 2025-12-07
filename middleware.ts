import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';

    // Handle blog subdomain
    if (hostname.startsWith('blog.')) {
        const url = request.nextUrl.clone();

        // If already on /blog path, continue
        if (url.pathname.startsWith('/blog')) {
            return NextResponse.next();
        }

        // Rewrite root to /blog
        if (url.pathname === '/') {
            url.pathname = '/blog';
            return NextResponse.rewrite(url);
        }

        // Rewrite other paths to /blog/path
        url.pathname = `/blog${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
