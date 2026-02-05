import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/blog';
import { BlogPostInput } from '@/types/blog';

// GET /api/posts - Get all posts
export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body: BlogPostInput = await request.json();

    // Validate required fields
    if (!body.title || !body.excerpt || !body.content || !body.category || !body.author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, category, author' },
        { status: 400 }
      );
    }

    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
