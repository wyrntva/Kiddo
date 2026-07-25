import ZoneHeartIcon from './ZoneHeartIcon'
import type { ZoneTheme } from './zoneTypes'

const imgToro = '/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.webp'

export default function ZoneEncouragementCard({ theme }: { theme: ZoneTheme }) {
  return (
    <div
      className="kiddo-zone-card relative flex h-full w-full items-center overflow-clip rounded-[20px] p-4 sm:p-5 md:p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 min-h-[160px] sm:min-h-[180px]"
      style={{
        backgroundColor: theme.encouragementBg,
        border: `1px solid ${theme.encouragementBorder}`,
        boxShadow: theme.encouragementShadow,
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = theme.encouragementHoverShadow
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = theme.encouragementShadow
      }}
    >
      <div className="z-10 flex w-[60%] shrink-0 flex-col items-start justify-center text-left">
        <div className="flex flex-col gap-1.5 sm:gap-2 items-start w-full">
          <p
            className="whitespace-nowrap font-baloo text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] font-bold leading-tight"
            style={{ color: theme.encouragementTitleColor }}
          >
            Cố lên nhé!
          </p>
          <div className="flex items-center gap-1">
            <p className="font-vietnam text-[13px] sm:text-[14px] lg:text-[15px] font-bold leading-snug text-[#37393e]">
              Toro tin bạn làm được!
            </p>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
              <ZoneHeartIcon color={theme.heartColor} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 self-stretch overflow-hidden">
        <img
          src={imgToro}
          alt="Toro"
          className="absolute h-[125%] w-[150%] max-w-none left-[-25%] top-0 object-contain object-bottom"
        />
      </div>
    </div>
  )
}
