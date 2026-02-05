import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, User, Tag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/lib/blog";
import { CATEGORIES } from "@/types/blog";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  // Group posts by category for filtering
  const categories = CATEGORIES.filter(cat =>
    posts.some(post => post.category === cat)
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              News & Insights
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest from Lumen Research. Industry news, case studies, research reports, and thought leadership.
            </p>
          </div>

          {/* Category Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#01b3d4] text-white">
              All Posts
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Check back soon for the latest news and insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="h-48 bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 flex items-center justify-center">
                      <Newspaper className="h-16 w-16 text-[#01b3d4]/60 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-[#01b3d4] font-medium">{post.category}</span>
                        {post.featured && (
                          <span className="text-xs bg-[#01b3d4]/10 text-[#01b3d4] px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#01b3d4] transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-3 flex-wrap">
                          <Tag className="h-3 w-3 text-gray-400" />
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-gray-500">
                              {tag}{post.tags.indexOf(tag) < Math.min(post.tags.length - 1, 2) ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Want to learn more about attention measurement?
          </h2>
          <p className="text-gray-600 mb-8">
            Get in touch with our team to see how Lumen can help optimize your advertising performance.
          </p>
          <Link href="/#contact">
            <Button size="lg">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
