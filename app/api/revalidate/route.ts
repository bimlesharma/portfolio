import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // In a real app, you should verify the Sanity webhook signature here
        // using the parseBody function from next-sanity/webhook

        if (body._type === 'post') {
            revalidatePath('/blog');
            revalidatePath('/blog/explore');
            if (body.slug && body.slug.current) {
                revalidatePath(`/blog/${body.slug.current}`);
            }
            return NextResponse.json({ message: 'Revalidated successfully' });
        }

        return NextResponse.json({ message: 'No revalidation required for this type' });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 });
    }
}
