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
      className={`kiddo-zone-card flex h-full w-full flex-col items-stretch gap-3 rounded-[20px] border bg-white p-3.5 sm:flex-row sm:items-center sm:gap-4 md:p-5 transition-all duration-300 ease-out ${
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
      <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center rounded-[16px] sm:w-[42%] md:w-[44%] max-w-[200px] self-center sm:self-auto">
        <div className="relative size-full rounded-[16px] overflow-hidden">
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="absolute inset-0 size-full object-cover rounded-[16px]"
            />
          ) : (
            <div className="relative size-full rounded-[16px] bg-[#d2d2d2]" />
          )}
        </div>
        <div
          className="absolute border-[2px] sm:border-[2.5px] border-white flex items-center justify-center rounded-full w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] shrink-0 shadow-md z-10 -top-2 -left-2 sm:-top-2.5 sm:-left-2.5"
          style={{ backgroundColor: theme.badgeBg }}
        >
          <span className="font-baloo text-[15px] sm:text-[18px] leading-none text-white text-center font-bold">
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-between gap-2 self-stretch py-0.5">
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="font-baloo text-[16px] sm:text-[18px] lg:text-[19px] font-bold leading-tight text-[#37393E] line-clamp-1">
            {lesson.title}
          </p>
          <p className="line-clamp-2 overflow-hidden font-vietnam text-[12px] sm:text-[13px] lg:text-[14px] font-medium leading-relaxed text-[#575E70]">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full mt-auto">
          <div className="flex w-full items-center justify-between gap-1.5">
            <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
