"use client";

import Image from "next/image";

interface BrandCarouselProps {
  id?: string;
  brands: string[];
}

export function BrandCarousel({ id, brands }: BrandCarouselProps) {
  if (brands.length === 0) {
    return null;
  }

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div id={id} className="w-full overflow-hidden py-10 bg-white scroll-mt-16">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex items-center animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center h-12"
            >
              <Image
                src={`/brands/${brand}`}
                alt={brand.replace(/\.[^/.]+$/, "")}
                width={120}
                height={48}
                className="max-h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
