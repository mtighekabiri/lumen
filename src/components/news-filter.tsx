"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper, Calendar, User, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";

interface NewsFilterProps {
  posts: BlogPost[];
  categories: string[];
}

export function NewsFilter({ posts, categories }: NewsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <>
      {/* Category Pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-[#01b3d4] text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4]"
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-[#01b3d4] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Check back soon for the latest news and insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
    </>
  );
}
