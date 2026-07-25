import ZoneHeartIcon from './ZoneHeartIcon'
import type { ZoneTheme } from './zoneTypes'

const imgToro = '/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.webp'

export default function ZoneEncouragementCard({ theme }: { theme: ZoneTheme }) {
  return (
    <div
      className="kiddo-zone-card relative flex h-full min-h-[17rem] w-full items-center overflow-clip rounded-[2rem] p-[1.6rem] md:p-[2rem] xl:p-[2.4rem] transition-all duration-300 ease-out hover:-translate-y-1.5"
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
      <div className="z-10 flex w-[60%] sm:w-[58%] shrink-0 flex-col items-start justify-center text-left">
        <div className="flex flex-col gap-[0.8rem] md:gap-[1.2rem] items-start w-full">
          <p
            className="whitespace-nowrap font-baloo text-[1.8rem] md:text-[2.2rem] xl:text-[2.6rem] font-bold leading-tight"
            style={{ color: theme.encouragementTitleColor }}
          >
            Cố lên nhé!
          </p>
          <div className="flex items-center gap-[0.4rem]">
            <p className="font-vietnam text-[1.3rem] md:text-[1.4rem] xl:text-[1.6rem] font-bold leading-snug text-[#37393e]">
              Toro tin bạn làm được!
            </p>
            <div className="w-[1.6rem] h-[1.6rem] shrink-0">
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
