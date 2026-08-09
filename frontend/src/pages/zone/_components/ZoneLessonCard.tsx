import { useAuth } from '../../../context/AuthContext'
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
  hideDescription?: boolean
  hideStars?: boolean
}

export default function ZoneLessonCard({
  lesson,
  theme,
  onSelect,
  hideDescription = true,
  hideStars = true,
}: ZoneLessonCardProps) {
  const clickable = Boolean(onSelect)
  const { user } = useAuth()
  const isDev = lesson.lockStatus === 'DEV'
  const isPaidLocked = lesson.lockStatus === 'PAID' && (!user || !user.isPaid)
  const isLocked = isDev || isPaidLocked

  return (
    <div
      onClick={clickable ? () => onSelect?.(lesson) : undefined}
      className={`lesson-card kiddo-zone-card ${
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
      <div className="zone-card-img-wrapper relative rounded-[16px] overflow-visible">
        <div className="relative w-full h-full rounded-[16px] overflow-hidden">
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            />
          ) : (
            <div className="relative w-full h-full rounded-[16px] bg-[#d2d2d2]" />
          )}
        </div>
        {isLocked && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-1 z-10 rounded-[16px]">
            <div 
              style={{
                width: '32px',
                height: '32px',
                backgroundImage: 'url(/assets/lock_hand_drawn.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
              }}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded border border-white/20">
              {isDev ? 'Đang phát triển' : 'Gói Trả Phí'}
            </span>
          </div>
        )}
        <div
          className="zone-card-badge-circle"
          style={{ backgroundColor: theme.badgeBg }}
        >
          <span>
            {lesson.fallbackId ?? lesson.id}
          </span>
        </div>
      </div>

      <div className="lesson-card__content">
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="zone-card-title-text lesson-card__title lesson-title text-[#37393E]">
            {lesson.title}
          </p>
          {!hideDescription && (
            <p className="zone-card-desc-text lesson-card__desc line-clamp-2 overflow-hidden">
              {lesson.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full mt-3">
          <div className="flex w-full items-center justify-between gap-2">
            {!hideStars && (
              <div className="shrink-0">
                <ZoneStarRow filled={lesson.stars} filledIcon={imgStarFilledSm} emptyIcon={imgStarEmptySm} />
              </div>
            )}
            <ZoneLessonStatusTag status={lesson.status} />
          </div>
          <ZoneLessonActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}
