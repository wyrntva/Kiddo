import type { SkillZoneIsland } from './skillZoneData'

export default function SkillZoneDesktopCard({ island, className = '' }: { island: SkillZoneIsland; className?: string }) {
  return (
    <div className={`flex-1 min-w-0 flex flex-col h-[180px] md:h-[360px] lg:h-[360px] xl:h-[289px] items-center relative group ${className}`}>
      <div className="aspect-[2254/2254] overflow-clip relative w-full shrink-0 select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.03] filter drop-shadow-md">
        <div className="-translate-x-1/2 absolute left-1/2 top-0 overflow-hidden w-full max-w-[160px] md:max-w-[260px] lg:max-w-[280px] xl:max-w-[280px] aspect-square">
          <img
            src={island.islandImg}
            alt={`${island.nameLine1} ${island.nameLine2}`}
            className={island.cropClass}
            loading="lazy" decoding="async"
          />
        </div>
      </div>

      <div className={`absolute bottom-0 h-[96px] md:h-[142px] lg:h-[142px] xl:h-[142px] ${island.leftOffset} -translate-x-[50%] ${island.width} z-20 scale-[0.72] md:scale-100 lg:scale-100 xl:scale-100 origin-bottom`}>
        <div className="absolute left-[50%] -translate-x-[50%] size-[60px] top-[3px] select-none pointer-events-none drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
          <div className="absolute left-1/2 -translate-x-1/2 top-[8.33%] bottom-[8.33%] aspect-[14.4865/20]">
            <img loading="lazy" decoding="async" src={island.pinImg} alt="" className="w-full h-full object-contain" />
          </div>
          <img loading="lazy" decoding="async" src={island.dotImg} alt="" className="absolute left-[20px] top-[12.5px] size-[20px] object-contain" />
        </div>
        <div className="absolute bg-white flex flex-col items-center justify-center px-[20px] py-[12px] rounded-[100px] top-[54px] left-1/2 -translate-x-1/2 w-max min-w-[110px] max-w-[140px] border border-gray-100 shadow-md cursor-pointer select-none h-[88px]">
          <div className={`flex flex-col items-center justify-center font-baloo text-[16px] font-bold text-center leading-[22px] not-italic ${island.textColor}`}>
            <span className="whitespace-nowrap block">{island.nameLine1}</span>
            <span className="whitespace-nowrap block">{island.nameLine2}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
