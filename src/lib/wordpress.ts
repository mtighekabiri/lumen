import type { BlogPost } from '@/types/blog';
import type { CaseStudy } from '@/data/case-studies';

const WP_API_URL = process.env.WORDPRESS_API_URL;

interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  sticky: boolean;
  _embedded?: {
    author?: Array<{ name: string }>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim();
}

function mapWPPostToBlogPost(wp: WPPost): BlogPost {
  const embedded = wp._embedded;
  const categories = embedded?.['wp:term']?.[0] ?? [];
  const tags = embedded?.['wp:term']?.[1] ?? [];
  const author = embedded?.author?.[0]?.name ?? 'Lumen Research';
  const imageUrl = embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
    id: wp.id.toString(),
    slug: wp.slug,
    title: stripHtml(wp.title.rendered),
    excerpt: stripHtml(wp.excerpt.rendered),
    content: wp.content.rendered,
    category: categories[0]?.name ?? 'Uncategorised',
    author,
    publishedAt: wp.date,
    updatedAt: wp.modified,
    featured: wp.sticky,
    imageUrl,
    tags: tags.map((t) => t.name),
    status: wp.status === 'publish' ? 'published' : 'draft',
  };
}

function mapWPPostToCaseStudy(wp: WPPost): CaseStudy {
  const imageUrl =
    wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

  return {
    id: wp.slug,
    headline: stripHtml(wp.title.rendered),
    image: imageUrl,
    href: `/news/${wp.slug}`,
  };
}

async function wpFetch<T>(endpoint: string): Promise<T | null> {
  if (!WP_API_URL) return null;

  const url = `${WP_API_URL}/wp-json/wp/v2${endpoint}`;
  const separator = endpoint.includes('?') ? '&' : '?';
  const fetchUrl = `${url}${separator}_embed`;

  try {
    const res = await fetch(fetchUrl, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function wpGetPublishedPosts(): Promise<BlogPost[] | null> {
  const posts = await wpFetch<WPPost[]>('/posts?status=publish&per_page=100&orderby=date&order=desc');
  return posts?.map(mapWPPostToBlogPost) ?? null;
}

export async function wpGetLatestPosts(limit: number): Promise<BlogPost[] | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?status=publish&per_page=${limit}&orderby=date&order=desc`);
  return posts?.map(mapWPPostToBlogPost) ?? null;
}

export async function wpGetFeaturedPosts(limit: number): Promise<BlogPost[] | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?status=publish&sticky=true&per_page=${limit}&orderby=date&order=desc`);
  return posts?.map(mapWPPostToBlogPost) ?? null;
}

export async function wpGetPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&status=publish`);
  if (!posts || posts.length === 0) return null;
  return mapWPPostToBlogPost(posts[0]);
}

export async function wpGetPostsByCategory(category: string): Promise<BlogPost[] | null> {
  // First resolve the category slug/name to an ID
  const categories = await wpFetch<Array<{ id: number; name: string; slug: string }>>(
    `/categories?search=${encodeURIComponent(category)}&per_page=1`
  );
  if (!categories || categories.length === 0) return null;

  const posts = await wpFetch<WPPost[]>(
    `/posts?status=publish&categories=${categories[0].id}&per_page=100&orderby=date&order=desc`
  );
  return posts?.map(mapWPPostToBlogPost) ?? null;
}

export async function wpGetAllSlugs(): Promise<string[] | null> {
  // Fetch all published post slugs (fields filter to reduce payload)
  const posts = await wpFetch<Array<{ slug: string }>>(
    '/posts?status=publish&per_page=100&_fields=slug'
  );
  return posts?.map((p) => p.slug) ?? null;
}

export async function wpGetAllTags(): Promise<string[] | null> {
  const tags = await wpFetch<Array<{ name: string }>>(
    '/tags?per_page=100&orderby=name&order=asc'
  );
  return tags?.map((t) => t.name) ?? null;
}

export async function wpGetCaseStudies(): Promise<CaseStudy[] | null> {
  // Fetch posts in the "Case Study" category
  const categories = await wpFetch<Array<{ id: number }>>(
    '/categories?slug=case-study&per_page=1'
  );
  if (!categories || categories.length === 0) {
    // Try alternative slug formats
    const altCategories = await wpFetch<Array<{ id: number }>>(
      '/categories?search=Case+Study&per_page=1'
    );
    if (!altCategories || altCategories.length === 0) return null;
    const posts = await wpFetch<WPPost[]>(
      `/posts?status=publish&categories=${altCategories[0].id}&per_page=20&orderby=date&order=desc`
    );
    return posts?.map(mapWPPostToCaseStudy) ?? null;
  }

  const posts = await wpFetch<WPPost[]>(
    `/posts?status=publish&categories=${categories[0].id}&per_page=20&orderby=date&order=desc`
  );
  return posts?.map(mapWPPostToCaseStudy) ?? null;
}

export function isWordPressConfigured(): boolean {
  return !!WP_API_URL;
}
