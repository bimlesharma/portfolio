import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

type WebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      console.error('SANITY_REVALIDATE_SECRET is not set');
      return NextResponse.json(
        { message: 'Revalidation is not configured' },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    if (body._type === 'post') {
      revalidateTag('posts', 'max');
      revalidatePath('/blog');
      revalidatePath('/blog/explore');
      revalidatePath('/blog/feed.xml');
      revalidatePath('/sitemap.xml');

      const slug =
        typeof body.slug === 'string'
          ? body.slug
          : body.slug?.current;

      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }

      return NextResponse.json({
        message: 'Revalidated posts',
        slug: slug ?? null,
      });
    }

    return NextResponse.json({
      message: 'No revalidation required for this type',
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 },
    );
  }
}
