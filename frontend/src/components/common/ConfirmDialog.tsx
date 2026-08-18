
interface ConfirmDialogProps {
  isOpen: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  isOpen,
  title = 'Xác nhận',
  message,
  confirmText = 'Đồng ý',
  cancelText = 'Hủy bỏ',
  variant = 'warning',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconBg: 'bg-red-100 text-red-600',
          btnBg: 'bg-red-600 hover:bg-red-700 text-white',
          icon: (
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
        }
      case 'info':
        return {
          iconBg: 'bg-blue-100 text-[#0a7ad8]',
          btnBg: 'bg-[#0a7ad8] hover:bg-[#0863b3] text-white',
          icon: (
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        }
      case 'warning':
      default:
        return {
          iconBg: 'bg-amber-100 text-amber-600',
          btnBg: 'bg-[#0a7ad8] hover:bg-[#0863b3] text-white',
          icon: (
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        }
    }
  }

  const { iconBg, btnBg, icon } = getVariantStyles()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-6 shadow-2xl border border-[#c9e6ff] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-center text-center">
          <div className={`mb-4 flex size-14 items-center justify-center rounded-full ${iconBg}`}>
            {icon}
          </div>

          <h3 className="font-baloo text-xl font-bold text-[#37393e] mb-2">{title}</h3>
          <p className="text-[14px] leading-relaxed text-[#667085] mb-6">{message}</p>

          <div className="flex w-full gap-3">
            {cancelText && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-full border border-[#d2e5f5] bg-[#f4fafd] py-2.5 text-sm font-semibold text-[#475467] transition-all hover:bg-[#e4f2fe] active:scale-95"
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold shadow-md transition-all active:scale-95 ${btnBg}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
