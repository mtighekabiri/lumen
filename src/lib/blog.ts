import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, BlogPostInput } from '@/types/blog';

const DATA_FILE = path.join(process.cwd(), 'content', 'posts.json');

// Ensure the content directory and file exist
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

// Generate a URL-friendly slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Generate a unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Get published posts only (sorted by date, newest first)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Get featured posts
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.featured).slice(0, limit);
}

// Get latest posts
export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.slice(0, limit);
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get a single post by ID
export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.category === category);
}

// Create a new post
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

  // Ensure unique slug
  let slugCounter = 1;
  while (posts.some(p => p.slug === newPost.slug)) {
    newPost.slug = `${generateSlug(input.title)}-${slugCounter}`;
    slugCounter++;
  }

  posts.push(newPost);
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));

  return newPost;
}

// Update a post
export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) return null;

  const updatedPost: BlogPost = {
    ...posts[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  // Update slug if title changed
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

// Delete a post
export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) return false;

  posts.splice(index, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));

  return true;
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

// Get all slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map(post => post.slug);
}
