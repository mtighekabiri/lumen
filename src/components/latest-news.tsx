import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";
import { T } from "@/components/t";

export async function LatestNews() {
  const posts = await getLatestPosts(4);

  if (posts.length === 0) {
    return (
      <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4]">
            <T id="home.latestNews" />
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-3xl mx-auto">
            <T id="news.stayUpdated" />
          </h2>
          <div className="py-12">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600"><T id="news.checkBack" /></p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header: small eyebrow label + large heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4]">
            <T id="home.latestNews" />
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl">
            <T id="news.stayUpdated" />
          </h2>
        </div>

        {/* Compact grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/news/${post.slug}`} className="group">
              <article className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                {/* 16:9 thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/30">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Newspaper className="h-10 w-10 text-[#01b3d4]/30" />
                    </div>
                  )}
                </div>
                {/* Card body */}
                <div className="p-4">
                  <span className="text-xs font-medium text-[#01b3d4]">
                    {post.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#01b3d4] transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All link */}
        <div className="text-center mt-10">
          <Link href="/news">
            <Button variant="outline" size="lg">
              <T id="news.viewAll" />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
