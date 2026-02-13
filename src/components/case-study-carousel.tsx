"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyCarouselProps =
  | { posts: BlogPost[]; caseStudies?: never }
  | { posts?: never; caseStudies: CaseStudy[] };

export function CaseStudyCarousel({ posts, caseStudies }: CaseStudyCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const itemCount = posts ? posts.length : caseStudies.length;
  const middleIndex = Math.floor(itemCount / 2);

  const markInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  // Track user interaction to stop the shake animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", markInteracted, { once: true });
    container.addEventListener("touchstart", markInteracted, { once: true });
    container.addEventListener("mousedown", markInteracted, { once: true });

    return () => {
      container.removeEventListener("scroll", markInteracted);
      container.removeEventListener("touchstart", markInteracted);
      container.removeEventListener("mousedown", markInteracted);
    };
  }, [markInteracted]);

  // Scroll to the middle card on mount so it's centered (important on mobile)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount < 2) return;

    requestAnimationFrame(() => {
      const cards = container.querySelectorAll<HTMLElement>("[data-carousel-card]");
      const middleCard = cards[middleIndex];
      if (middleCard) {
        const scrollLeft =
          middleCard.offsetLeft -
          (container.offsetWidth - middleCard.offsetWidth) / 2;
        container.scrollTo({ left: scrollLeft, behavior: "instant" });
      }
    });
  }, [itemCount, middleIndex]);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    markInteracted();
    const cardWidth = container.querySelector<HTMLElement>("[data-carousel-card]")?.offsetWidth ?? 0;
    container.scrollBy({
      left: direction === "left" ? -cardWidth - 24 : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/carousel">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-[#01b3d4] hover:border-[#01b3d4] transition-colors opacity-0 group-hover/carousel:opacity-100"
        aria-label="Previous card"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Carousel track */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 carousel-scrollbar-hide"
      >
        {posts
          ? posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                data-carousel-card
                className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[calc((100%-3rem)/3)] snap-center"
              >
                <Card
                  className={`overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group ${
                    index === middleIndex && !hasInteracted
                      ? "animate-card-shake"
                      : ""
                  }`}
                >
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
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))
          : caseStudies.map((study, index) => (
              <Link
                key={study.id}
                href={study.href}
                data-carousel-card
                className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[calc((100%-3rem)/3)] snap-center"
              >
                <Card
                  className={`overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group ${
                    index === middleIndex && !hasInteracted
                      ? "animate-card-shake"
                      : ""
                  }`}
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 flex items-center justify-center">
                    <Image
                      src={study.image}
                      alt={study.headline}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-[#01b3d4] transition-colors line-clamp-2">
                      {study.headline}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-[#01b3d4] hover:border-[#01b3d4] transition-colors opacity-0 group-hover/carousel:opacity-100"
        aria-label="Next card"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
