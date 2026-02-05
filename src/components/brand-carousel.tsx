"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

interface BrandCarouselProps {
  brands: string[];
}

// Hook to safely detect client-side mounting
function useIsMounted() {
  const subscribe = () => () => {};
  const getSnapshot = () => true;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const mounted = useIsMounted();

  if (!mounted) {
    return null;
  }

  // If no brands provided, don't show the carousel
  if (brands.length === 0) {
    return null;
  }

  // Duplicate brands for seamless infinite scroll (need at least 3x for smooth loop)
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full overflow-hidden mt-16">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 mx-4 bg-gray-50 rounded-lg p-4 flex items-center justify-center h-16 w-32 border border-gray-200"
            >
              <Image
                src={`/brands/${brand}`}
                alt={brand.replace(/\.[^/.]+$/, "")}
                width={100}
                height={40}
                className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
