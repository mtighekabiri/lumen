import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Newspaper } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found - Lumen Research' };
  }

  return {
    title: `${post.title} - Lumen Research`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Article Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center text-sm text-[#01b3d4] hover:text-[#019bb8] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to News
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-[#01b3d4] font-medium bg-[#01b3d4]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            {post.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className="h-4 w-4" />
                {post.tags.map((tag, index) => (
                  <span key={tag} className="text-gray-500">
                    {tag}{index < post.tags.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-4xl prose-custom"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/news/${relatedPost.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="h-32 bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 flex items-center justify-center">
                      <Newspaper className="h-10 w-10 text-[#01b3d4]/60 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardHeader>
                      <span className="text-sm text-[#01b3d4] font-medium">{relatedPost.category}</span>
                      <CardTitle className="text-base group-hover:text-[#01b3d4] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to optimize your advertising with attention metrics?
          </h2>
          <p className="text-gray-600 mb-8">
            Contact our team to learn how Lumen can help improve your campaign performance.
          </p>
          <Link href="/#contact">
            <Button size="lg">
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
