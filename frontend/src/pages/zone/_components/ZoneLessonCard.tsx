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
      className={`kiddo-zone-card flex h-full w-full flex-col items-start gap-[2.4rem] overflow-hidden rounded-[20px] border bg-white p-[2.4rem] transition-all duration-300 ease-out sm:flex-row ${
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
      <div className="relative mx-auto flex aspect-[4/3] h-full shrink-0 items-end justify-end rounded-[16px] sm:mx-0">
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
          className="absolute border-[2.5px] border-white flex items-center justify-center rounded-full w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] shrink-0 shadow-md z-10 -top-5 -left-5"
          style={{ backgroundColor: theme.badgeBg }}
        >
          <span className="font-baloo text-[17px] sm:text-[20px] leading-none text-white text-center font-bold">
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-between gap-2 self-stretch py-0.5">
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="font-baloo text-[19px] sm:text-[20px] font-bold leading-6 text-[#37393E]">
            {lesson.title}
          </p>
          <p className="line-clamp-2 overflow-hidden font-vietnam text-[14px] sm:text-[15px] font-medium leading-5 text-[#575E70]">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full mt-auto">
          <div className="flex w-full items-center justify-between gap-2">
            <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
