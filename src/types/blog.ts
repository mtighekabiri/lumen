export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  imageUrl?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featured?: boolean;
  imageUrl?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export const CATEGORIES = [
  'Industry News',
  'Case Study',
  'Research',
  'Company Updates',
  'Thought Leadership',
  'Product Updates',
] as const;

export type Category = typeof CATEGORIES[number];
