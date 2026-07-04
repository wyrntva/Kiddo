import type { ExploreZone } from './exploreZoneMapData'

interface ExploreZoneCardProps {
  zone: ExploreZone
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function ExploreZoneCard({ zone, isHovered, onHoverStart, onHoverEnd, onClick, className, style }: ExploreZoneCardProps) {
  return (
    <div
      className={`bg-white rounded-[20px] xl:rounded-[20px] flex gap-2.5 items-center p-3 xl:p-2.5 shrink-0 cursor-pointer hover:scale-[1.02] transition-all duration-200 ${className || 'w-[320px]'}`}
      style={{
        boxShadow: isHovered ? `0px 0px 18px ${zone.color}` : '0px 0px 5px rgba(0,76,110,0.6)',
        ...style,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      <div className="relative shrink-0 w-[82px] h-[82px] xl:w-[102px] xl:h-[102px] flex items-center justify-center">
        <img src={zone.img} alt="" className="w-full h-full object-contain pointer-events-none select-none" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="font-baloo text-[15px] leading-[20px] xl:text-[22px] xl:leading-[34px] font-bold whitespace-pre-line" style={{ color: zone.color }}>
          {zone.name}
        </p>
        <p className="font-vietnam text-[11px] leading-[15px] xl:text-[13px] xl:leading-[20px] text-[#37393e] line-clamp-2">{zone.desc}</p>
      </div>
      <div
        className="shrink-0 w-6 h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center transition-transform duration-200"
        style={{ backgroundColor: zone.color, transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-3 h-3 xl:w-4 xl:h-4">
          <path d="M6.23999 11.5302L9.75999 8.00015L6.23999 4.47015" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
