const imgHero = "/assets/377651128d24e7eb79bd46db361e99329c29b8e0.webp"

export default function ParentsHeroSection() {
  return (
    <div className="relative w-full shrink-0 overflow-hidden">
      {/* Mobile & Tablet banner */}
      <div className="block md:hidden relative w-full aspect-[2509/416] min-h-[140px] sm:min-h-[180px]">
        <img
          alt="Chào mừng ba mẹ đến với OTTOPIA"
          className="absolute inset-0 w-full h-full object-cover object-[32%_center]"
          src={imgHero}
        />
      </div>
      {/* Desktop banner */}
      <div className="hidden md:block relative w-full aspect-[2509/416]">
        <img
          alt="Chào mừng ba mẹ đến với OTTOPIA"
          className="absolute inset-0 w-full h-full object-cover"
          src={imgHero}
        />
      </div>
    </div>
  )
}
