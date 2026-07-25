import ZoneHeartIcon from './ZoneHeartIcon'
import type { ZoneTheme } from './zoneTypes'

const imgToro = '/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.webp'

export default function ZoneEncouragementCard({ theme }: { theme: ZoneTheme }) {
  return (
    <div
      className="kiddo-zone-card relative flex h-full w-full items-center overflow-clip rounded-[20px] p-[2.4rem] transition-all duration-300 ease-out hover:-translate-y-1.5"
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
      <div className="z-10 flex w-[58%] shrink-0 flex-col items-start justify-center text-left">
        <div className="flex flex-col gap-[12px] items-start w-full">
          <p
            className="whitespace-nowrap font-baloo text-[24px] font-bold leading-9 2xl:text-[24px] 2xl:leading-9 min-[1800px]:text-[28px] min-[1800px]:leading-[48px]"
            style={{ color: theme.encouragementTitleColor }}
          >
            Cố lên nhé!
          </p>
          <div className="flex items-center gap-1">
            <p className="font-vietnam text-[14px] font-bold leading-5 text-[#37393e] sm:text-[16px] sm:leading-6 2xl:text-[15px] 2xl:leading-5 min-[1800px]:text-[18px] min-[1800px]:leading-6">
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
