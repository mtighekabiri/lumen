"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CaseStudy } from "@/data/case-studies";

interface CaseStudyCarouselProps {
  caseStudies: CaseStudy[];
}

export function CaseStudyCarousel({ caseStudies }: CaseStudyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const total = caseStudies.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Touch / pointer handling for swipe
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.clientX - touchStartX.current;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
  }, [prev, next]);

  /**
   * Compute the offset of each card relative to the active card,
   * wrapping around so the carousel feels infinite.
   */
  function getOffset(index: number) {
    let offset = index - activeIndex;
    // Wrap so cards loop around
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  }

  return (
    <div
      className="relative w-full select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* 3D stage */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ perspective: "1200px", height: 420 }}
      >
        {caseStudies.map((study, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);

          // Only render cards within visible range
          if (absOffset > 3) return null;

          const rotateY = offset * -30;
          const translateX = offset * 220;
          const translateZ = -absOffset * 120;
          const scale = 1 - absOffset * 0.1;
          const opacity = 1 - absOffset * 0.35;
          const zIndex = 10 - absOffset;

          return (
            <div
              key={study.id}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                opacity: Math.max(opacity, 0),
                zIndex,
                pointerEvents: absOffset === 0 ? "auto" : "none",
              }}
              onClick={() => {
                if (offset !== 0) goTo(index);
              }}
            >
              <div className="w-[300px] rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100">
                {/* Image – top 50% */}
                <div className="relative h-[200px] bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/40 overflow-hidden">
                  <Image
                    src={`/case-studies/${study.image}`}
                    alt={study.headline}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Hide broken image, the gradient bg remains as placeholder
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Content – bottom 50% */}
                <div className="p-5 h-[200px] flex flex-col justify-between">
                  <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-3">
                    {study.headline}
                  </h3>
                  <Link href={study.href} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full border-[#01b3d4] text-[#01b3d4] hover:bg-[#01b3d4] hover:text-white"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous case study"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={next}
        aria-label="Next case study"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to case study ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-[#01b3d4]"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
