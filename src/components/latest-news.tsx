import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";

export async function LatestNews() {
  const posts = await getLatestPosts(3);

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest from Lumen Research
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Check back soon for news and updates.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="h-48 bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 flex items-center justify-center">
                      <Newspaper className="h-16 w-16 text-[#01b3d4]/60 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-[#01b3d4] font-medium">
                          {post.category}
                        </span>
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
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/news">
                <Button variant="outline" size="lg">
                  View All News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
