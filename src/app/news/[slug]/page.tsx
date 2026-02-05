import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Newspaper } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getPostBySlug, getPublishedPosts, getAllSlugs } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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

// Simple markdown-to-HTML converter for basic formatting
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-[#01b3d4] pl-4 py-2 my-6 text-gray-700 italic bg-gray-50 rounded-r">$1</blockquote>')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc text-gray-600 mb-2">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal text-gray-600 mb-2">$1</li>')
    // Horizontal rules
    .replace(/^---$/gim, '<hr class="my-8 border-gray-200" />')
    // Tables (basic support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim());
      if (cells.every(cell => cell.trim().match(/^-+$/))) {
        return ''; // Skip separator rows
      }
      const isHeader = cells.some(cell => cell.includes('---'));
      const cellTag = isHeader ? 'th' : 'td';
      const cellClass = isHeader ? 'border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left' : 'border border-gray-200 px-4 py-2';
      return `<tr>${cells.map(cell => `<${cellTag} class="${cellClass}">${cell.trim()}</${cellTag}>`).join('')}</tr>`;
    })
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-[#01b3d4] px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Paragraphs (lines that don't match other patterns)
    .replace(/^(?!<[hl]|<li|<block|<hr|<pre|<tr)(.+)$/gim, '<p class="text-gray-600 leading-relaxed mb-4">$1</p>')
    // Wrap tables
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full border-collapse my-6">$1</table>')
    // Clean up empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '');
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
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
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
