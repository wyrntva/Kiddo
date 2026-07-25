import ZoneHeartIcon from './ZoneHeartIcon'
import type { ZoneTheme } from './zoneTypes'

const imgToro = '/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.webp'

export default function ZoneEncouragementCard({ theme }: { theme: ZoneTheme }) {
  return (
    <div
      className="encouragement-card kiddo-zone-card"
      style={{
        backgroundColor: theme.encouragementBg,
        borderColor: theme.encouragementBorder,
        boxShadow: theme.encouragementShadow,
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = theme.encouragementHoverShadow
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = theme.encouragementShadow
      }}
    >
      <div className="z-10 flex flex-col items-start justify-center text-left w-full pr-2">
        <div className="flex flex-col gap-2 items-start w-full">
          <p
            className="page-subtitle font-baloo font-bold leading-tight"
            style={{ color: theme.encouragementTitleColor }}
          >
            Cố lên nhé!
          </p>
          <div className="flex items-center gap-1 flex-wrap">
            <p className="font-vietnam text-[13px] sm:text-[14px] md:text-[15px] font-bold leading-snug text-[#37393e]">
              Toro tin bạn làm được!
            </p>
            <div className="w-4 h-4 shrink-0">
              <ZoneHeartIcon color={theme.heartColor} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 self-stretch overflow-hidden">
        <img
          src={imgToro}
          alt="Toro"
          className="absolute h-[127.2%] w-[160.25%] max-w-none left-[-30.13%] top-0 object-contain object-bottom"
        />
      </div>
    </div>
  )
}
