export function HeroBanner() {
  return (
    <div className="w-full pt-16">
      {/* Desktop video - hidden on mobile */}
      <video
        className="hidden md:block w-full"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-banner-desktop.mp4" type="video/mp4" />
      </video>

      {/* Mobile video - hidden on desktop */}
      <video
        className="block md:hidden w-full"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-banner-mobile.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
