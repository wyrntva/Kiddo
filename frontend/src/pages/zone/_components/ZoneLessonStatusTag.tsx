import type { ZoneLessonStatus } from './zoneTypes'

const statusMap = {
  completed: { bg: 'bg-[#c3ffd0]', border: 'border-[#418457]', color: 'text-[#418457]', label: 'Đã học' },
  'in-progress': { bg: 'bg-[#fff4bf]', border: 'border-[#fea01f]', color: 'text-[#fea01f]', label: 'Đang học' },
  'not-started': { bg: 'bg-[#f0f2f4]', border: 'border-[#757e95]', color: 'text-[#757e95]', label: 'Chưa học' },
} as const

export default function ZoneLessonStatusTag({ status }: { status: ZoneLessonStatus }) {
  const value = statusMap[status]

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border px-2 py-0.5 sm:px-2.5 sm:py-1 ${value.bg} ${value.border}`}
    >
      <span className={`whitespace-nowrap font-vietnam font-semibold text-[11px] sm:text-[12px] md:text-[13px] leading-tight tracking-wide ${value.color}`}>
        {value.label}
      </span>
    </div>
  )
}
