import ZoneLessonActionButton from './ZoneLessonActionButton'
import ZoneLessonStatusTag from './ZoneLessonStatusTag'
import ZoneStarRow from './ZoneStarRow'
import type { ZoneLesson, ZoneTheme } from './zoneTypes'

const imgStarFilledSm = '/assets/5f4b469c66545c2ff1cf20ce7bbc09731bbbe55d.svg'
const imgStarEmptySm = '/assets/0a48ffb1b0c56300ebc704a0276a3f2cd07b495b.svg'

interface ZoneLessonCardProps {
  lesson: ZoneLesson
  theme: ZoneTheme
  onSelect?: (lesson: ZoneLesson) => void
}

export default function ZoneLessonCard({ lesson, theme, onSelect }: ZoneLessonCardProps) {
  const clickable = Boolean(onSelect)

  return (
    <div
      onClick={clickable ? () => onSelect?.(lesson) : undefined}
      className={`kiddo-zone-card flex h-full w-full flex-col items-start gap-3 overflow-hidden rounded-[16px] border bg-white p-3 transition-all duration-300 ease-out sm:flex-row sm:gap-4 sm:p-4 min-[1800px]:gap-6 min-[1800px]:p-6 ${
        clickable ? 'cursor-pointer hover:-translate-y-1.5 active:scale-[0.99]' : ''
      }`}
      style={{
        borderColor: theme.cardBorder,
        boxShadow: theme.cardShadow,
      }}
      onMouseEnter={(event) => {
        if (clickable) {
          event.currentTarget.style.boxShadow = theme.cardHoverShadow
        }
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = theme.cardShadow
      }}
    >
      <div className="relative mx-auto flex aspect-[16/10] w-full max-w-[420px] shrink-0 items-end justify-end gap-3 sm:mx-0 sm:aspect-[258/210] sm:h-full sm:w-[42%] 2xl:h-[181px] 2xl:w-[222px] min-[1800px]:h-[210px] min-[1800px]:w-[258px]">
        {lesson.image ? (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="absolute inset-0 size-full object-cover rounded-xl"
          />
        ) : (
          <div className="relative size-full rounded-xl bg-[#d2d2d2]" />
        )}
        <div
          className="absolute border-2 border-white flex items-center justify-center rounded-full w-10 h-10 shrink-0"
          style={{ left: -7, top: -9, backgroundColor: theme.badgeBg }}
        >
          <span className="font-baloo text-[18px] leading-[32px] text-white text-center">
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-between gap-2 self-stretch">
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="font-baloo text-[17px] font-bold leading-6 text-[#37393E] 2xl:text-[15px] 2xl:leading-[22px] min-[1800px]:text-[18px] min-[1800px]:leading-7">
            {lesson.title}
          </p>
          <p className="line-clamp-2 overflow-hidden font-vietnam text-[14px] font-normal leading-5 text-[#575E70] sm:line-clamp-3 2xl:h-[72px] 2xl:text-[13px] 2xl:leading-[18px] min-[1800px]:h-[88px] min-[1800px]:text-[16px] min-[1800px]:leading-[22px]">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full items-center justify-between gap-2 min-[1800px]:gap-[54px]">
            <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
