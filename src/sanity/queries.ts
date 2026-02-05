import { groq } from 'next-sanity';

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    heroHeadline,
    heroSubheadline,
    rotatingWords,
    contactEmail,
    stats,
    socialLinks
  }
`;

// Blog Posts
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    publishedAt,
    featured,
    tags
  }
`;

export const publishedPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    publishedAt,
    featured,
    tags
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    publishedAt,
    featured,
    tags
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    publishedAt,
    featured,
    tags
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author,
    content,
    publishedAt,
    featured,
    tags
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post"].slug.current
`;

// Pages
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    seo
  }
`;

// FAQs
export const allFaqsQuery = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;
