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
      className={`bg-white border rounded-[16px] w-full h-full kiddo-zone-card flex flex-col sm:flex-row items-start gap-6 p-6 transition-all duration-300 ease-out ${
        clickable ? 'cursor-pointer hover:-translate-y-1.5 active:scale-[0.99]' : ''
      }`}
      style={{
        minHeight: '224px',
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
      <div className="flex sm:flex-[1_0_0] h-[120px] sm:h-auto gap-3 items-end justify-end min-w-px relative self-stretch">
        <div className="bg-[#d2d2d2] w-full h-full relative rounded-xl" />
        <div
          className="absolute border-2 border-white flex items-center justify-center rounded-full w-10 h-10 shrink-0"
          style={{ left: -7, top: -9, backgroundColor: theme.badgeBg }}
        >
          <span className="font-baloo text-[18px] leading-[32px] text-white text-center">
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="flex flex-[1_0_0] flex-col gap-2 justify-between items-start min-w-[150px] w-full self-stretch">
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="font-baloo text-[18px] font-bold leading-[28px] text-[#37393E]">
            {lesson.title}
          </p>
          <p className="font-vietnam font-normal text-[16px] leading-[22px] text-[#575E70] line-clamp-4 min-h-[88px]">
            {lesson.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-[24px] sm:gap-[54px] items-center justify-between sm:justify-start w-full">
            <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
