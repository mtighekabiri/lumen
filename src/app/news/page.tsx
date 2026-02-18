import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { NewsFilter } from "@/components/news-filter";
import { getPublishedPosts } from "@/lib/blog";
import { CATEGORIES } from "@/types/blog";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const posts = await getPublishedPosts();

  // Only show categories that have at least one post
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

          <NewsFilter posts={posts} categories={[...categories]} />
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
