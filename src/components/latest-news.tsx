import { Newspaper } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";
import { T } from "@/components/t";
import { NewsCarousel } from "@/components/news-carousel";

export async function LatestNews() {
  const posts = await getLatestPosts(8);

  if (posts.length === 0) {
    return (
      <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-[#01b3d4]/[0.04] to-gray-50 animate-gradient-drift">
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
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-[#01b3d4]/[0.04] to-gray-50 animate-gradient-drift">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4]">
            <T id="home.latestNews" />
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl">
            <T id="news.stayUpdated" />
          </h2>
        </div>

        <NewsCarousel posts={posts.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          imageUrl: p.imageUrl ?? null,
          publishedAt: p.publishedAt,
        }))} />
      </div>
    </section>
  );
}
