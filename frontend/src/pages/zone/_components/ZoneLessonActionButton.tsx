import type { ZoneLessonStatus } from './zoneTypes'

const actionMap = {
  completed: { label: 'Học lại', className: 'bg-[#339e4a] border-2 border-white' },
  'in-progress': { label: 'Tiếp tục', className: 'bg-[#fea01f] border-2 border-white' },
  'not-started': { label: 'Học ngay', className: 'bg-[#0a7ad8]' },
} as const

export default function ZoneLessonActionButton({ status }: { status: ZoneLessonStatus }) {
  const action = actionMap[status]

  return (
    <div className={`flex w-full items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-[40px] shadow-sm transition-all duration-200 hover:brightness-105 active:scale-[0.98] ${action.className}`}>
      <span className="font-vietnam font-semibold text-[13px] sm:text-[14px] md:text-[15px] leading-snug text-white whitespace-nowrap">
        {action.label}
      </span>
    </div>
  )
}
