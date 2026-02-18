"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types/blog";

export function CaseStudy3DCarousel({
  posts,
}: {
  posts: BlogPost[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = posts.length;

  const prev = () =>
    setActiveIndex((i) => (i - 1 + total) % total);
  const next = () =>
    setActiveIndex((i) => (i + 1) % total);

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400">
        <Newspaper className="h-12 w-12 mr-3" />
        <span>No case studies available yet.</span>
      </div>
    );
  }

  return (
    <div className="relative w-full select-none">
      {/* Carousel container with perspective */}
      <div
        className="relative w-full overflow-hidden"
        style={{ perspective: "1200px", height: "440px" }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {posts.map((post, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);

            // Only render cards within 2 positions of center
            if (absOffset > 2) return null;

            // Convex curve: center closest, sides recede and angle inward
            const rotateY = -offset * 22;
            const translateX = offset * 230;
            const translateZ = -(absOffset * absOffset) * 50;
            const opacity = 1 - absOffset * 0.3;
            const scale = 1 - absOffset * 0.08;
            const zIndex = 10 - absOffset;

            return (
              <div
                key={post.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  width: "280px",
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  {/* Image — top 50% */}
                  <div className="relative w-full bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 flex items-center justify-center" style={{ height: "190px" }}>
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Newspaper className="h-12 w-12 text-[#01b3d4]/60" />
                    )}
                  </div>
                  {/* Content — bottom 50% */}
                  <div
                    className="p-5 flex flex-col justify-between"
                    style={{ height: "190px" }}
                  >
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                    <Link href={`/news/${post.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          type="button"
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-[#01b3d4] hover:border-[#01b3d4] transition-colors"
          aria-label="Previous case study"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 text-gray-600 hover:text-[#01b3d4] hover:border-[#01b3d4] transition-colors"
          aria-label="Next case study"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
