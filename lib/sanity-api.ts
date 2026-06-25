import { client } from '../sanity/lib/client';
import { postsQuery, postBySlugQuery } from '../sanity/lib/queries';
import { SanityPost } from './types/sanity';
import { draftMode } from 'next/headers';

async function getFetchClient() {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch (e) {
    // Not in request context
  }
  
  if (isDraftMode) {
    return client.withConfig({
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
      useCdn: false,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    });
  }
  return client;
}

export const getSanityPosts = async (): Promise<SanityPost[]> => {
  try {
    const fetchClient = await getFetchClient();
    const posts = await fetchClient.fetch(postsQuery, {}, { next: { revalidate: 60, tags: ['posts'] } });
    return posts || [];
  } catch (error) {
    console.error('Error fetching Sanity posts:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<SanityPost | null> => {
  try {
    const fetchClient = await getFetchClient();
    const post = await fetchClient.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60, tags: ['posts'] } });
    return post || null;
  } catch (error) {
    console.error('Error fetching Sanity post:', error);
    return null;
  }
};
