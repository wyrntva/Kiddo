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
    ? 'w-[50px] h-[50px]'
    : 'w-4 h-4 2xl:w-[14px] 2xl:h-[14px] min-[1800px]:w-4 min-[1800px]:h-4'

  return (
    <div className="flex flex-[1_0_0] gap-[4px] items-start min-w-px">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className={`overflow-clip relative shrink-0 ${dimensions}`}>
          <div className="absolute" style={{ inset: '10.42% 8.34%' }}>
            <img
              src={index < filled ? filledIcon : emptyIcon}
              alt=""
              className="absolute block inset-0 w-full h-full max-w-none"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
