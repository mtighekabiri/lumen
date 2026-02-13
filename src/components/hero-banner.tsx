interface HeroBannerProps {
  children?: React.ReactNode;
}

export function HeroBanner({ children }: HeroBannerProps) {
  return (
    <div className="relative w-full pt-16">
      {/* Video container: 16:9 on desktop, 9:16 on mobile */}
      <div className="relative w-full aspect-[9/16] md:aspect-video overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-banner.mp4" type="video/mp4" />
        </video>

        {/* Overlay content */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center pb-[12%]">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
