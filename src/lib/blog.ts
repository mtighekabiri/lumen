import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogPostInput } from '@/types/blog';
import {
  wpGetPublishedPosts,
  wpGetLatestPosts,
  wpGetFeaturedPosts,
  wpGetPostBySlug,
  wpGetPostsByCategory,
  wpGetAllSlugs,
  wpGetAllTags,
} from '@/lib/wordpress';

const DATA_FILE = path.join(process.cwd(), 'content', 'posts.json');

// --- Local JSON helpers (unchanged) ---

async function ensureDataFile(): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get all posts from local JSON
export async function getAllPosts(): Promise<BlogPost[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// --- Read functions: WordPress primary, JSON fallback ---

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const wpPosts = await wpGetPublishedPosts();
  if (wpPosts) return wpPosts;

  const posts = await getAllPosts();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const wpPosts = await wpGetFeaturedPosts(limit);
  if (wpPosts) return wpPosts;

  const posts = await getPublishedPosts();
  return posts.filter(post => post.featured).slice(0, limit);
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const wpPosts = await wpGetLatestPosts(limit);
  if (wpPosts) return wpPosts;

  const posts = await getPublishedPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const wpPost = await wpGetPostBySlug(slug);
  if (wpPost) return wpPost;

  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const wpPosts = await wpGetPostsByCategory(category);
  if (wpPosts) return wpPosts;

  const posts = await getPublishedPosts();
  return posts.filter(post => post.category === category);
}

export async function getAllTags(): Promise<string[]> {
  const wpTags = await wpGetAllTags();
  if (wpTags) return wpTags;

  const posts = await getPublishedPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

export async function getAllSlugs(): Promise<string[]> {
  const wpSlugs = await wpGetAllSlugs();
  if (wpSlugs) return wpSlugs;

  const posts = await getPublishedPosts();
  return posts.map(post => post.slug);
}

// --- Write functions: local JSON only ---

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  const posts = await getAllPosts();

  const now = new Date().toISOString();
  const newPost: BlogPost = {
    id: generateId(),
    slug: generateSlug(input.title),
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    category: input.category,
    author: input.author,
    publishedAt: now,
    updatedAt: now,
    featured: input.featured || false,
    imageUrl: input.imageUrl,
    tags: input.tags || [],
    status: input.status || 'draft',
  };

  let slugCounter = 1;
  while (posts.some(p => p.slug === newPost.slug)) {
    newPost.slug = `${generateSlug(input.title)}-${slugCounter}`;
    slugCounter++;
  }

  posts.push(newPost);
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));

  return newPost;
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) return null;

  const updatedPost: BlogPost = {
    ...posts[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (input.title && input.title !== posts[index].title) {
    let newSlug = generateSlug(input.title);
    let slugCounter = 1;
    while (posts.some((p, i) => i !== index && p.slug === newSlug)) {
      newSlug = `${generateSlug(input.title)}-${slugCounter}`;
      slugCounter++;
    }
    updatedPost.slug = newSlug;
  }

  posts[index] = updatedPost;
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));

  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) return false;

  posts.splice(index, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));

  return true;
}
