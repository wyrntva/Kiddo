import type { ZoneLessonStatus } from './zoneTypes'

const actionMap = {
  completed: { label: 'Học lại', className: 'bg-[#339e4a] border-2 border-white' },
  'in-progress': { label: 'Tiếp tục', className: 'bg-[#fea01f] border-2 border-white' },
  'not-started': { label: 'Học ngay', className: 'bg-[#0a7ad8]' },
} as const

export default function ZoneLessonActionButton({ status }: { status: ZoneLessonStatus }) {
  const action = actionMap[status]

  return (
    <div className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] ${action.className}`}>
      <span className="font-vietnam font-medium text-base leading-6 text-white whitespace-nowrap">
        {action.label}
      </span>
    </div>
  )
}
