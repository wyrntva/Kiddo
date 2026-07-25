import { DiaryFeedbackColumns } from '../../diary/_components/DiaryFeedbackPanel'
import type { DiaryLesson } from '../../diary/types'

interface ZoneQuizSuccessModalProps {
  feedback: DiaryLesson['feedback']
  onResetGame: () => void
  onRestartLesson?: () => void
  onNextLesson: () => void
  onGoToDiary: () => void
}

export default function ZoneQuizSuccessModal({
  feedback,
  onResetGame,
  onRestartLesson,
  onNextLesson,
  onGoToDiary,
}: ZoneQuizSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
      <div className="zone-success-modal relative flex h-auto max-h-[calc(100dvh-16px)] w-full max-w-[1380px] flex-col overflow-y-auto overflow-x-hidden rounded-[20px] border border-[#BAE6FD] bg-white p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in duration-300 sm:max-h-[calc(100dvh-32px)] sm:rounded-[24px] sm:p-6 lg:h-[700px] lg:overflow-hidden lg:p-8">
        <div className="absolute inset-0 z-0 pointer-events-none rounded-[24px]">
          <img width="1457" height="720"
            alt="Sky Background"
            className="absolute h-full w-full max-w-none rounded-[24px] object-cover"
            src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.webp"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col items-center gap-5">
          <div className="grid min-h-0 w-full flex-1 grid-cols-1 gap-5 text-center lg:grid-cols-[minmax(0,1fr)_260px] lg:grid-rows-[170px_minmax(0,1fr)_auto] lg:gap-x-6 lg:text-left">
          <div className="flex w-full flex-col items-center gap-4 lg:col-start-1 lg:row-start-1 lg:flex-row lg:items-start lg:self-center">
            <div className="relative h-[72px] w-[72px] shrink-0 sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px]">
              <img
                src="/assets/achievement-medal.svg"
                alt="Huy chương hoàn thành bài học"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center pt-1">
              <span style={{ color: '#37393E' }} className="font-baloo text-[20px] sm:text-[24px] font-normal leading-[32px] sm:leading-[40px]">
                Chúc mừng bé vừa hoàn thành bài học
              </span>
              <h2 style={{ color: '#0A7AD8' }} className="font-baloo text-[30px] sm:text-[40px] xl:text-[48px] font-normal leading-[38px] sm:leading-[56px] xl:leading-[80px]">
                Con đang cảm thấy gì?
              </h2>
            </div>
          </div>

          <div className="zone-success-mascot relative order-last hidden size-[260px] shrink-0 overflow-hidden pointer-events-none lg:col-start-2 lg:row-start-1 lg:block">
            <img width="1920" height="1080"
              src="/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.webp"
              alt="Mascot Otter holding Trophy"
              className="absolute left-[-48.27%] top-[-5.19%] h-[110.51%] w-[196.55%] max-w-none"
            />
          </div>

          <DiaryFeedbackColumns
            feedback={feedback}
            className="relative z-20 lg:col-span-2 lg:row-start-2"
          />

          <div className="relative z-20 flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:col-span-2 lg:row-start-3 lg:flex-nowrap lg:justify-center lg:gap-6">
            <button
              onClick={onResetGame}
              className="flex h-[48px] min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[40px] border border-solid border-[#e83552] bg-white px-6 font-vietnam text-[16px] font-medium text-[#e83552] shadow-sm transition-all duration-200 hover:bg-red-50 active:scale-95"
            >
              <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.68M4 4v4.68h4.68" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Chơi lại lần nữa</span>
            </button>
            {onRestartLesson && (
              <button
                onClick={onRestartLesson}
                className="flex h-[48px] min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[40px] bg-[#8234E4] px-6 font-vietnam text-[16px] font-medium text-white shadow-md transition-all duration-200 hover:bg-[#6e28c7] active:scale-95"
              >
                <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12a8 8 0 1 0 2.34-5.66L4 8.68M4 4v4.68h4.68" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Học lại</span>
              </button>
            )}
            <button
              onClick={onNextLesson}
              className="flex h-[48px] min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[40px] bg-[#0a7ad8] px-6 font-vietnam text-[16px] font-medium text-white shadow-md transition-all duration-200 hover:bg-[#0862ae] active:scale-95"
            >
              <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 7.6a1 1 0 0 1 1.52-.85l6.25 4.4a1 1 0 0 1 0 1.7l-6.25 4.4A1 1 0 0 1 6.5 16.4V7.6ZM16.5 7a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Z"/></svg>
              <span>Mở bài mới nào</span>
            </button>
            <button
              onClick={onGoToDiary}
              className="flex h-[48px] min-w-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[40px] bg-[#339e4a] px-6 font-vietnam text-[16px] font-medium text-white shadow-md transition-all duration-200 hover:bg-[#2c883f] active:scale-95"
            >
              <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none"><path d="M6 4.5h11a1 1 0 0 1 1 1V20l-6.5-3.3L5 20V5.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 8h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <span>Về nhật ký của bé</span>
            </button>
            <button
              type="button"
              className="flex h-[48px] min-w-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[40px] bg-[#FEA01F] px-6 font-vietnam text-[16px] font-bold text-white shadow-md transition-all duration-200 hover:bg-[#e68e16] active:scale-95"
            >
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 animate-icon-zoom"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3C12 7.5 8.5 11 4 11C8.5 11 12 14.5 12 19C12 14.5 15.5 11 20 11C15.5 11 12 7.5 12 3Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M19 4v4M17 6h4" strokeWidth="1.8" />
                <circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span>AI STUDIO</span>
              <svg
                aria-hidden="true"
                className="size-5 shrink-0 animate-icon-zoom"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3C12 7.5 8.5 11 4 11C8.5 11 12 14.5 12 19C12 14.5 15.5 11 20 11C15.5 11 12 7.5 12 3Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M19 4v4M17 6h4" strokeWidth="1.8" />
                <circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
