import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";

export async function LatestNews() {
  const posts = await getLatestPosts(4);

  if (posts.length === 0) {
    return (
      <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest from Lumen Research
          </p>
          <div className="py-12">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Check back soon for news and updates.</p>
          </div>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the latest from Lumen Research
          </p>
        </div>

        {/* Bento grid: large left card + 3 stacked right cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured (large) card */}
          <Link href={`/news/${featured.slug}`} className="group">
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 shadow-sm hover:shadow-lg transition-shadow">
              {featured.imageUrl ? (
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Newspaper className="h-24 w-24 text-[#01b3d4]/40" />
                </div>
              )}
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-block text-sm font-medium text-[#01b3d4] bg-white/90 px-3 py-1 rounded-full mb-3">
                  {featured.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white line-clamp-3 group-hover:text-[#01b3d4] transition-colors">
                  {featured.title}
                </h3>
                <p className="mt-2 text-sm text-white/80 line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                  <Calendar className="h-3 w-3" />
                  {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </Link>

          {/* Right column: 3 smaller cards stacked */}
          <div className="flex flex-col gap-6">
            {rest.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="group flex-1">
                <div className="relative flex h-full min-h-[120px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                  {/* Thumbnail */}
                  <div className="relative w-36 sm:w-44 shrink-0 bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Newspaper className="h-8 w-8 text-[#01b3d4]/40" />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col justify-center p-4 sm:p-5 min-w-0">
                    <span className="text-xs font-medium text-[#01b3d4] mb-1">
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-[#01b3d4] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1 hidden sm:block">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All link */}
        <div className="text-center mt-12">
          <Link href="/news">
            <Button variant="outline" size="lg">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
