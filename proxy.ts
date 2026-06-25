import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const { pathname, search } = request.nextUrl;

    // If a user hits the old blog subdomain (e.g. blog.bimlesh.dev or blog.localhost:3000)
    if (hostname.startsWith('blog.')) {
        // Strip the 'blog.' prefix
        const newHost = hostname.replace('blog.', '');
        
        // Ensure the path starts with /blog
        let newPath = pathname;
        if (!pathname.startsWith('/blog')) {
            newPath = pathname === '/' ? '/blog' : `/blog${pathname}`;
        }
        
        // Construct the final URL manually
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const finalUrl = `${protocol}://${newHost}${newPath}${search}`;
        
        return NextResponse.redirect(finalUrl, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
