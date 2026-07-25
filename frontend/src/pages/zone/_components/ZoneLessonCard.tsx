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
      className={`kiddo-zone-card flex h-full w-full flex-row items-stretch justify-between gap-[1.6rem] md:gap-[2rem] xl:gap-[2.4rem] overflow-hidden rounded-[2rem] border bg-white p-[1.6rem] md:p-[2rem] xl:p-[2.4rem] transition-all duration-300 ease-out ${
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
      <div className="zone-card-img-wrapper relative mx-auto flex aspect-[4/3] h-full shrink-0 items-end justify-end rounded-[1.6rem] sm:mx-0">
        <div className="relative size-full rounded-[1.6rem] overflow-hidden">
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="absolute inset-0 size-full object-cover rounded-[1.6rem]"
            />
          ) : (
            <div className="relative size-full rounded-[1.6rem] bg-[#d2d2d2]" />
          )}
        </div>
        <div
          className="zone-card-badge-circle absolute border-[2.5px] border-white flex items-center justify-center rounded-full w-[4.2rem] h-[4.2rem] shrink-0 shadow-md z-10 -top-[1.8rem] -left-[1.8rem]"
          style={{ backgroundColor: theme.badgeBg }}
        >
          <span className="font-baloo text-[2rem] leading-none text-white text-center font-bold">
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-start justify-between gap-[0.8rem] self-stretch py-0.5">
        <div className="flex flex-col gap-[0.4rem] w-full text-left">
          <p className="zone-card-title-text font-baloo text-[1.6rem] md:text-[1.8rem] xl:text-[2rem] font-bold leading-tight text-[#37393E]">
            {lesson.title}
          </p>
          <p className="zone-card-desc-text line-clamp-2 overflow-hidden font-vietnam text-[1.3rem] md:text-[1.4rem] xl:text-[1.5rem] font-medium leading-snug text-[#575E70]">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-[0.8rem] w-full mt-auto">
          <div className="flex w-full items-center justify-between gap-[0.8rem]">
            <div className="shrink-0">
              <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
            </div>
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
