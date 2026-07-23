import { Link } from 'react-router-dom'
import type { SkillZoneIsland } from './skillZoneData'

export default function SkillZoneMobileSlide({ island }: { island: SkillZoneIsland }) {
  return (
    <Link
      to="/explore"
      aria-label={`Khám phá ${island.nameLine1} ${island.nameLine2}`}
      className="w-full flex-shrink-0 flex flex-col items-center snap-center px-4 sm:px-6 md:px-8 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-2xl"
    >
      <div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] aspect-square relative overflow-hidden filter drop-shadow-lg">
        <img
          src={island.islandImg}
          alt={`${island.nameLine1} ${island.nameLine2}`}
          className={`${island.cropClass} select-none pointer-events-none`}
          loading="lazy" decoding="async"
        />
      </div>

      <div className="flex flex-col items-center -mt-3">
        <div className="relative w-[52px] h-[60px] drop-shadow-sm">
          <img loading="lazy" decoding="async" src={island.pinImg} alt="" className="absolute inset-0 w-full h-full object-contain" />
          <img loading="lazy" decoding="async" src={island.dotImg} alt="" className="absolute left-[17px] top-[11px] size-[18px] object-contain" />
        </div>
        <div className="bg-white flex flex-col items-center justify-center px-[22px] py-[10px] rounded-[100px] border border-gray-100 shadow-md cursor-pointer select-none min-w-[120px] -mt-1">
          <div className={`flex flex-col items-center font-baloo text-[15px] font-bold text-center leading-[21px] ${island.textColor}`}>
            <span className="whitespace-nowrap">{island.nameLine1}</span>
            <span className="whitespace-nowrap">{island.nameLine2}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
