"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";

interface Award {
  title: string;
  placement: string;
  year: string;
  image: string;
  organisation?: string;
  imageSrc: string | null;
}

/** Colour mapping for placement badges */
function placementStyle(placement: string): { bg: string; text: string } {
  const p = placement.toLowerCase();
  if (["winner", "gold", "1st"].includes(p))
    return { bg: "bg-amber-100 text-amber-800", text: "text-amber-800" };
  if (["silver", "runner-up", "2nd"].includes(p))
    return { bg: "bg-gray-200 text-gray-700", text: "text-gray-700" };
  if (["bronze", "3rd"].includes(p))
    return { bg: "bg-orange-100 text-orange-800", text: "text-orange-800" };
  if (["finalist", "shortlisted", "highly commended"].includes(p))
    return { bg: "bg-[#01b3d4]/10 text-[#01b3d4]", text: "text-[#01b3d4]" };
  return { bg: "bg-gray-100 text-gray-600", text: "text-gray-600" };
}

export function AwardsMosaic() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/awards")
      .then((r) => r.json())
      .then((data: Award[]) => {
        setAwards(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-2xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (awards.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {awards.map((award, i) => {
        const style = placementStyle(award.placement);

        return (
          <div
            key={`${award.title}-${i}`}
            className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-[#01b3d4]/[0.06] hover:border-[#01b3d4]/20 transition-all duration-300"
          >
            {/* Image area or trophy fallback */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
              {award.imageSrc ? (
                <Image
                  src={award.imageSrc}
                  alt={award.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-12 w-12 text-[#01b3d4]/40" />
                </div>
              )}
            </div>

            {/* Info area */}
            <div className="flex flex-col gap-2 p-4 sm:p-5 flex-1">
              {/* Placement badge + year */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${style.bg}`}
                >
                  {award.placement}
                </span>
                {award.year && (
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                    {award.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {award.title}
              </p>

              {/* Organisation */}
              {award.organisation && (
                <p className="text-xs text-gray-500">{award.organisation}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
