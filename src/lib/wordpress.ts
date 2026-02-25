import { BlogPost, BlogPostInput } from '@/types/blog';

// ---------- WordPress REST API response types ----------

interface WpPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  status: string;
  sticky: boolean;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ name: string }>;
  };
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  status: string;
}

interface WpCategory {
  id: number;
  name: string;
  slug: string;
}

// ---------- Configuration ----------

const WP_URL = process.env.WORDPRESS_URL || '';
const WP_USER = process.env.WORDPRESS_USERNAME || '';
const WP_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD || '';
const REVALIDATE_SECONDS = 60;
const FETCH_TIMEOUT_MS = 15_000; // 15-second timeout for WordPress API calls

// ---------- Helpers ----------

function getAuthHeaders(): Record<string, string> {
  if (!WP_USER || !WP_APP_PASSWORD) return {};
  const encoded = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
  return { Authorization: `Basic ${encoded}` };
}

async function wpFetch<T>(
  endpoint: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T> {
  if (!WP_URL) {
    // During build, return empty data instead of throwing so that
    // force-dynamic pages can pass the "collecting page data" phase.
    // At runtime the env var is expected to be present.
    console.warn('WORDPRESS_URL is not set – returning empty result for', endpoint);
    return [] as unknown as T;
  }

  const url = `${WP_URL}/wp-json/wp/v2${endpoint}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...(init?.headers as Record<string, string> | undefined),
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`WordPress API ${res.status}: ${res.statusText} – ${body}`);
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}

function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function mapWpPost(wp: WpPost): BlogPost {
  const categories = wp._embedded?.['wp:term']?.[0] || [];
  const tags = wp._embedded?.['wp:term']?.[1] || [];
  const author = wp._embedded?.author?.[0];
  const media = wp._embedded?.['wp:featuredmedia']?.[0];

  return {
    id: wp.id.toString(),
    slug: wp.slug,
    title: decodeHtmlEntities(stripHtmlTags(wp.title.rendered)),
    excerpt: decodeHtmlEntities(stripHtmlTags(wp.excerpt.rendered)),
    content: wp.content?.rendered ?? '',
    category: categories[0]?.name || 'Uncategorized',
    categoryIds: wp.categories || [],
    author: author?.name || 'Unknown',
    publishedAt: wp.date,
    updatedAt: wp.modified,
    featured: wp.sticky,
    imageUrl: media?.source_url,
    tags: tags.map(t => t.name),
    status: wp.status === 'publish' ? 'published' : 'draft',
  };
}

// Fields needed for listing pages (excludes heavy content field)
const LISTING_FIELDS = '_fields=id,slug,title,excerpt,date,modified,status,sticky,categories,tags,_links';

// ---------- Read operations (posts) ----------

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const wpPosts = await wpFetch<WpPost[]>(
      '/posts?per_page=100&_embed&status=any',
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.map(mapWpPost);
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const wpPosts = await wpFetch<WpPost[]>(
      `/posts?per_page=100&_embed&status=publish&orderby=date&order=desc&${LISTING_FIELDS}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.map(mapWpPost);
  } catch (error) {
    console.error('Failed to fetch published posts:', error);
    return [];
  }
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const wpPosts = await wpFetch<WpPost[]>(
      `/posts?per_page=${limit}&_embed&status=publish&orderby=date&order=desc&${LISTING_FIELDS}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.map(mapWpPost);
  } catch (error) {
    console.error('Failed to fetch latest posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const wpPosts = await wpFetch<WpPost[]>(
      `/posts?slug=${encodeURIComponent(slug)}&_embed&status=any`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.length > 0 ? mapWpPost(wpPosts[0]) : null;
  } catch (error) {
    console.error(`Failed to fetch post by slug "${slug}":`, error);
    return null;
  }
}

export async function getRelatedPosts(
  excludeId: string,
  categoryIds: number[],
  limit: number = 3,
): Promise<BlogPost[]> {
  if (categoryIds.length === 0) return [];
  try {
    const cats = categoryIds.join(',');
    const wpPosts = await wpFetch<WpPost[]>(
      `/posts?per_page=${limit + 1}&_embed&status=publish&categories=${cats}&exclude=${excludeId}&orderby=date&order=desc&${LISTING_FIELDS}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.slice(0, limit).map(mapWpPost);
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const wp = await wpFetch<WpPost>(
      `/posts/${id}?_embed`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return mapWpPost(wp);
  } catch {
    return null;
  }
}

// ---------- Write operations (posts) ----------

async function findOrCreateCategory(name: string): Promise<number> {
  const cats = await wpFetch<WpCategory[]>(
    `/categories?search=${encodeURIComponent(name)}&per_page=100`,
    { cache: 'no-store' },
  );
  const match = cats.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (match) return match.id;

  const newCat = await wpFetch<WpCategory>('/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
    cache: 'no-store',
  });
  return newCat.id;
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const categoryId = await findOrCreateCategory(input.category);

  const wpPost = await wpFetch<WpPost>('/posts?_embed', {
    method: 'POST',
    body: JSON.stringify({
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      status: input.status === 'published' ? 'publish' : 'draft',
      categories: [categoryId],
      sticky: input.featured || false,
    }),
    cache: 'no-store',
  });

  return mapWpPost(wpPost);
}

export async function updatePost(
  id: string,
  input: Partial<BlogPostInput>,
): Promise<BlogPost | null> {
  try {
    const body: Record<string, unknown> = {};
    if (input.title !== undefined) body.title = input.title;
    if (input.content !== undefined) body.content = input.content;
    if (input.excerpt !== undefined) body.excerpt = input.excerpt;
    if (input.status !== undefined) {
      body.status = input.status === 'published' ? 'publish' : 'draft';
    }
    if (input.featured !== undefined) body.sticky = input.featured;
    if (input.category !== undefined) {
      body.categories = [await findOrCreateCategory(input.category)];
    }

    const wpPost = await wpFetch<WpPost>(`/posts/${id}?_embed`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    return mapWpPost(wpPost);
  } catch {
    return null;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    await wpFetch<unknown>(`/posts/${id}?force=true`, {
      method: 'DELETE',
      cache: 'no-store',
    });
    return true;
  } catch {
    return false;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const wpPosts = await wpFetch<Array<{ slug: string }>>(
      '/posts?per_page=100&status=publish&_fields=slug',
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.map(p => p.slug);
  } catch (error) {
    console.error('Failed to fetch all slugs:', error);
    return [];
  }
}

// ---------- Posts by category ----------

export async function getPostsByCategory(
  categoryName: string,
  limit: number = 10,
): Promise<BlogPost[]> {
  try {
    // Look up the category ID by name
    const cats = await wpFetch<WpCategory[]>(
      `/categories?search=${encodeURIComponent(categoryName)}&per_page=10`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    const match = cats.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (!match) return [];

    const wpPosts = await wpFetch<WpPost[]>(
      `/posts?per_page=${limit}&_embed&status=publish&categories=${match.id}&orderby=date&order=desc&${LISTING_FIELDS}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return wpPosts.map(mapWpPost);
  } catch (error) {
    console.error(`Failed to fetch posts for category "${categoryName}":`, error);
    return [];
  }
}

// ---------- Pages ----------

export async function getAllPages(): Promise<WpPage[]> {
  try {
    return await wpFetch<WpPage[]>(
      '/pages?per_page=100&status=publish',
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
  } catch (error) {
    console.error('Failed to fetch all pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  try {
    const pages = await wpFetch<WpPage[]>(
      `/pages?slug=${encodeURIComponent(slug)}&status=publish`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Failed to fetch page by slug "${slug}":`, error);
    return null;
  }
}
