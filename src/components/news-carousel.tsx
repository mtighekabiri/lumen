"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string;
};

export function NewsCarousel({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const total = posts.length;
  const VISIBLE = 3; // cards visible at once on desktop

  const goTo = useCallback((idx: number) => {
    setActive(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  // Scroll the track when active changes
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const cardW = card.offsetWidth + 16; // gap-4 = 16px
    el.scrollTo({ left: active * cardW, behavior: "smooth" });
  }, [active]);

  // Touch/mouse drag
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !trackRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current || !trackRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const card = trackRef.current.children[0] as HTMLElement | undefined;
    const cardW = (card?.offsetWidth ?? 300) + 16;

    if (Math.abs(dx) > 40) {
      goTo(active + (dx < 0 ? 1 : -1));
    } else {
      // Snap back
      trackRef.current.scrollTo({ left: active * cardW, behavior: "smooth" });
    }
    dragStart.current = null;
    setDragging(false);
  };

  return (
    <div className="relative">
      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-hidden cursor-grab select-none"
        style={{ scrollSnapType: "x mandatory", perspective: "1200px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {posts.map((post, i) => {
          const offset = i - active;
          // Convex rotation: cards curve away from center
          const rotateY = offset * -8;
          const scale = 1 - Math.abs(offset) * 0.04;
          const opacity = Math.abs(offset) > VISIBLE ? 0 : 1 - Math.abs(offset) * 0.15;

          return (
            <div
              key={post.id}
              className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(33.333%-11px)] transition-all duration-500 ease-out"
              style={{
                transform: `rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                scrollSnapAlign: "start",
              }}
            >
              <Link
                href={`/news/${post.slug}`}
                className="group block"
                onClick={(e) => { if (dragging) e.preventDefault(); }}
              >
                <article className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow border border-gray-100 h-full">
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
                  <div className="p-5">
                    <span className="text-xs font-medium text-[#01b3d4]">{post.category}</span>
                    <h3 className="mt-1.5 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-[#01b3d4] transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
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
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="p-2 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active >= total - 1}
            className="p-2 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next article"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#01b3d4]" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to article ${i + 1}`}
            />
          ))}
        </div>

        <Link href="/news">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
