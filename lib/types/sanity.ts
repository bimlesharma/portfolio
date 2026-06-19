export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
    alt?: string;
    lqip?: string;
  };
  publishedAt: string;
  brief?: string;
  readTimeInMinutes?: number;
  categories?: string[];
  author?: string;
  authorName?: string;
  authorImage?: any;
  body?: any;
}
