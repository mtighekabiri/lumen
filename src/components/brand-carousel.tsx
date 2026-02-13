"use client";

interface BrandCarouselProps {
  brands: string[];
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
  if (brands.length === 0) {
    return null;
  }

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full overflow-hidden">
      <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
        Trusted by leading brands
      </p>
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex-shrink-0 mx-4 bg-gray-50 rounded-lg px-8 py-4 flex items-center justify-center h-16 border border-gray-200"
            >
              <span className="text-base font-semibold text-gray-400 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
