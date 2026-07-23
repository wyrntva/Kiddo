import ZoneHeartIcon from './ZoneHeartIcon'
import type { ZoneTheme } from './zoneTypes'

const imgToro = '/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.webp'

export default function ZoneEncouragementCard({ theme }: { theme: ZoneTheme }) {
  return (
    <div
      className="rounded-[12px] flex flex-col xl:flex-row items-center overflow-clip relative w-full h-full kiddo-zone-card transition-all duration-300 ease-out hover:-translate-y-1.5"
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
      <div className="flex w-full shrink-0 flex-col items-center justify-center p-5 text-center xl:w-[44%] xl:items-start xl:self-stretch xl:text-left min-[1800px]:w-[279px] min-[1800px]:p-6">
        <div className="flex flex-col gap-[12px] items-start w-full">
          <p
            className="font-baloo font-bold text-[28px] 2xl:text-[24px] min-[1800px]:text-[28px] leading-[48px] 2xl:leading-[36px] min-[1800px]:leading-[48px] whitespace-nowrap"
            style={{ color: theme.encouragementTitleColor }}
          >
            Cố lên nhé!
          </p>
          <div className="flex gap-[4px] items-center">
            <p className="font-vietnam font-bold text-[18px] 2xl:text-[15px] min-[1800px]:text-[18px] leading-[24px] 2xl:leading-[20px] min-[1800px]:leading-[24px] text-[#37393e] whitespace-nowrap">
              Toro tin bạn làm được!
            </p>
            <div className="w-4 h-4 shrink-0">
              <ZoneHeartIcon color={theme.heartColor} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 w-full flex-1 self-stretch overflow-hidden">
        <img
          src={imgToro}
          alt="Toro"
          className="absolute h-[127.2%] w-[160.25%] max-w-none left-[-30.13%] top-0 object-contain object-bottom"
        />
      </div>
    </div>
  )
}
