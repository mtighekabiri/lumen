import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/blog";
import { CaseStudyCarousel } from "@/components/case-study-carousel";

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
            <CaseStudyCarousel posts={posts} />

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
