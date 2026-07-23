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
      className={`flex flex-[1_0_0] items-center justify-center min-w-px px-2 py-1 rounded-lg border ${value.bg} ${value.border}`}
    >
      <span className={`font-vietnam text-sm 2xl:text-[12px] min-[1800px]:text-sm tracking-[0.28px] leading-5 2xl:leading-4 min-[1800px]:leading-5 ${value.color}`}>
        {value.label}
      </span>
    </div>
  )
}
