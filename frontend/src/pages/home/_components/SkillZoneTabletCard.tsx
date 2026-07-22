import type { SkillZoneIsland } from './skillZoneData'

export default function SkillZoneTabletCard({ island }: { island: SkillZoneIsland }) {
  return (
    <div className="relative flex flex-col items-center rounded-[24px] bg-white/84 backdrop-blur-sm border border-white/70 shadow-md px-4 py-5 min-h-[250px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/55 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center w-full max-w-[260px] aspect-square">
        <img
          src={island.islandImg}
          alt={`${island.nameLine1} ${island.nameLine2}`}
          className="w-full h-full object-contain drop-shadow-lg select-none pointer-events-none"
          loading="lazy" decoding="async"
        />
      </div>

      <div className="relative z-10 mt-[-10px] flex flex-col items-center">
        <div className="relative w-[52px] h-[60px] drop-shadow-sm">
          <img loading="lazy" decoding="async" src={island.pinImg} alt="" className="absolute inset-0 w-full h-full object-contain" />
          <img loading="lazy" decoding="async" src={island.dotImg} alt="" className="absolute left-[17px] top-[11px] size-[18px] object-contain" />
        </div>
        <div className="bg-white flex flex-col items-center justify-center px-5 py-2.5 rounded-[100px] border border-gray-100 shadow-md min-w-[126px] -mt-1">
          <div className={`flex flex-col items-center font-baloo text-[16px] font-bold text-center leading-[22px] ${island.textColor}`}>
            <span className="whitespace-nowrap">{island.nameLine1}</span>
            <span className="whitespace-nowrap">{island.nameLine2}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
