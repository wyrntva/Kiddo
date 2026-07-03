const imgStar = '/assets/cde3881a9b58bf8553a83885dd1c801f88523421.svg'

interface ExploreZoneMapHeaderProps {
  compact?: boolean
}

export default function ExploreZoneMapHeader({ compact = false }: ExploreZoneMapHeaderProps) {
  const titleSize = compact ? 'text-[24px] leading-[36px]' : 'text-[32px] leading-[56px]'
  const starSize = compact ? 'w-6 h-6' : 'w-8 h-8'
  const textSize = compact ? 'text-[13px] leading-[18px]' : 'text-[16px] leading-[24px]'

  return (
    <div className="flex flex-col items-center justify-center text-center gap-1.5">
      <div className="flex items-center gap-2 md:gap-4">
        <img src={imgStar} alt="" className={`${starSize} animate-pulse`} loading="lazy" />
        <h1 className={`font-baloo font-bold text-[#004c6e] ${titleSize}`}>Khám phá 5 vùng đất</h1>
        <img src={imgStar} alt="" className={`${starSize} animate-pulse`} loading="lazy" />
      </div>
      <p className={`font-vietnam text-[#004c6e] ${textSize}`}>
        Mỗi vùng đất là một hành trình giúp bé học và trưởng thành hơn mỗi ngày
      </p>
    </div>
  )
}
