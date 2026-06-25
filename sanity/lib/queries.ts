import { groq } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage { ..., "lqip": asset->metadata.lqip },
  "publishedAt": coalesce(publishedAt, _createdAt),
  "brief": coalesce(brief, pt::text(body)[0..120] + "..."),
  "readTimeInMinutes": coalesce(readTimeInMinutes, round(length(pt::text(body)) / 5 / 180), 3),
  "categories": categories[]->title,
  "author": author->name
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage { ..., "lqip": asset->metadata.lqip },
  "publishedAt": coalesce(publishedAt, _createdAt),
  "brief": coalesce(brief, pt::text(body)[0..120] + "..."),
  "readTimeInMinutes": coalesce(readTimeInMinutes, round(length(pt::text(body)) / 5 / 180), 3),
  body,
  "categories": categories[]->title,
  "authorName": author->name,
  "authorImage": author->image
}`
