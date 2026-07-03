import ZoneStarRow from './ZoneStarRow'
import type { ZoneTheme } from './zoneTypes'

const imgStarFilled = '/assets/81ba9f1daf2ecf4c10992f3055635021acbe778b.svg'
const imgStarEmpty = '/assets/7ec1bdd71358bad87dabead01d04537ca3db6722.svg'

interface ZoneProgressCardProps {
  completed: number
  total: number
  theme: ZoneTheme
}

export default function ZoneProgressCard({ completed, total, theme }: ZoneProgressCardProps) {
  const progressWidth = total > 0 ? `calc(${(completed / total) * 100}% - 12px)` : '0px'

  return (
    <div
      className="bg-white flex flex-col gap-3 items-start p-4 rounded-[24px] w-full xl:w-[350px] transition-all duration-300 ease-out hover:-translate-y-0.5"
      style={{
        border: `1px solid ${theme.progressBorder}`,
        boxShadow: theme.progressShadow,
      }}
    >
      <div className="flex gap-3 items-center w-full">
        <div className="flex flex-[1_0_0] min-w-px">
          <p className="font-baloo text-[16px] font-bold leading-[28px] text-[#37393E]">Tiến độ chủ đề</p>
        </div>
        <div className="flex gap-2 items-center shrink-0">
          <span className="font-baloo text-[24px] font-bold leading-[40px]" style={{ color: theme.progressAccent }}>
            {completed}/{total}
          </span>
          <span className="font-vietnam text-base leading-6 text-[#37393e]">bài</span>
        </div>
      </div>

      <div className="flex flex-col w-full" style={{ gap: '9.33px' }}>
        <ZoneStarRow filled={completed} filledIcon={imgStarFilled} emptyIcon={imgStarEmpty} size="large" />
        <div
          className="bg-[#f7f6f8] h-[19px] overflow-clip relative rounded-full w-full"
          style={{ border: '1.042px solid white' }}
        >
          <div
            className="absolute bg-[#fdd444] h-[19px] rounded-full transition-all duration-300"
            style={{ left: '6px', top: '-1.04px', width: progressWidth }}
          />
        </div>
      </div>
    </div>
  )
}
