const imgHero = "/assets/377651128d24e7eb79bd46db361e99329c29b8e0.png"

export default function ParentsHeroSection() {
  return (
    <div className="relative w-full shrink-0 overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: '2509/416', minHeight: 180 }}>
        <img
          alt="Chào mừng ba mẹ đến với OTTOPIA"
          className="absolute inset-0 w-full h-full object-cover"
          src={imgHero}
        />
      </div>
    </div>
  )
}
