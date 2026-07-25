interface ZoneStarRowProps {
  filled: number
  filledIcon: string
  emptyIcon: string
  size?: 'small' | 'large'
}

export default function ZoneStarRow({
  filled,
  filledIcon,
  emptyIcon,
  size = 'small',
}: ZoneStarRowProps) {
  const dimensions = size === 'large'
    ? 'w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]'
    : 'w-[15px] h-[15px] sm:w-[17px] sm:h-[17px]'

  return (
    <div className={`flex shrink-0 items-center ${size === 'large' ? 'gap-1' : 'gap-0.5 sm:gap-1'}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className={`relative shrink-0 overflow-hidden ${dimensions}`}>
          <img
            src={index < filled ? filledIcon : emptyIcon}
            alt=""
            className="block size-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}
