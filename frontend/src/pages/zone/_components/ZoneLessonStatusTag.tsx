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
      className={`flex items-center justify-center shrink-0 px-3 py-1.5 rounded-lg border ${value.bg} ${value.border}`}
    >
      <span className={`whitespace-nowrap font-vietnam font-normal text-[14px] leading-[20px] tracking-[0.28px] ${value.color}`}>
        {value.label}
      </span>
    </div>
  )
}
