"use client";

import Image from "next/image";
import { useState } from "react";

interface PolaroidStackProps {
  photos: { src: string; caption?: string }[];
}

const rotations = [
  "-rotate-6 -translate-x-4 translate-y-2",
  "rotate-3 translate-x-3 -translate-y-1",
  "-rotate-2 -translate-x-1 translate-y-3",
  "rotate-5 translate-x-2 -translate-y-2",
  "-rotate-4 translate-x-1 translate-y-1",
];

export function PolaroidStack({ photos }: PolaroidStackProps) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));

  const bringToFront = (idx: number) => {
    setOrder((prev) => {
      const without = prev.filter((i) => i !== idx);
      return [...without, idx];
    });
  };

  return (
    <div className="relative w-72 h-80 sm:w-80 sm:h-96 mx-auto">
      {order.map((photoIdx, stackPos) => {
        const photo = photos[photoIdx];
        const rotation = rotations[photoIdx % rotations.length];
        return (
          <button
            key={photoIdx}
            type="button"
            onClick={() => bringToFront(photoIdx)}
            className={`absolute inset-0 bg-white rounded-sm p-3 pb-14 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${rotation}`}
            style={{ zIndex: stackPos }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-sm bg-gray-100">
              <Image
                src={photo.src}
                alt={photo.caption || `Team photo ${photoIdx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 288px, 320px"
              />
            </div>
            {photo.caption && (
              <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-600 font-handwriting">
                {photo.caption}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
