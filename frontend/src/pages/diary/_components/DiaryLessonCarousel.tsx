import type { DiaryLesson } from '../types'

interface DiaryLessonCarouselProps {
  lessons: DiaryLesson[]
  selectedLesson: DiaryLesson
  onSelectLesson: (lesson: DiaryLesson) => void
}

function LessonStatusButton({ lesson }: { lesson: DiaryLesson }) {
  if (lesson.status === 'locked') {
    return (
      <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#757e95] text-[#757e95] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-[#f0f2f4]">
        <div className="relative shrink-0 size-[24px]">
          <div className="absolute inset-[8.33%_20.83%]">
            <img width="14" height="20" src="/assets/cfbbb7b1e9e9f60ab7b5d78cf3396285d4ff7e75.svg" alt="Lock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" decoding="async" />
          </div>
        </div>
        <span className="leading-[20px]">{lesson.statusLabel}</span>
      </div>
    )
  }

  if (lesson.status === 'learning') {
    return (
      <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#fdd444] text-[#fea01f] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-white hover:bg-[#FEA01F]/5 transition-colors">
        <div className="relative shrink-0 size-[24px]">
          <div className="absolute inset-[14.58%]">
            <img width="17" height="17" src="/assets/d701165fd92f8f0911b84de6d50d64b8c17335d7.svg" alt="Clock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" decoding="async" />
          </div>
        </div>
        <span className="leading-[20px]">{lesson.statusLabel}</span>
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#418457] text-[#418457] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-white hover:bg-[#418457]/5 transition-colors">
      <div className="relative shrink-0 size-[24px]">
        <div className="absolute inset-[14.58%]">
          <img width="17" height="17" src="/assets/503f657f6c193f24dfa03bfb41d21c410490385e.svg" alt="Check Clock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" decoding="async" />
        </div>
      </div>
      <span className="leading-[20px]">{lesson.statusLabel}</span>
    </div>
  )
}

export default function DiaryLessonCarousel({
  lessons,
  selectedLesson,
  onSelectLesson,
}: DiaryLessonCarouselProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-[12px] items-start relative shrink-0 w-full">
        <div className="bg-[#c3ffd0] flex gap-[10px] items-center p-[8px] relative rounded-[100px] shrink-0">
          <div className="relative shrink-0 size-[24px]">
            <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
              <img width="21" height="19" src="/assets/9acfa3ffa817d27da5068ef459f020ca126d7621.svg" alt="Book Open Icon" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center leading-none">
          <h3 className="font-baloo text-[18px] font-bold text-[#339e4a] leading-[32px]">Xem lại các bài khác</h3>
          <p className="font-vietnam text-[16px] text-[#575e70] leading-[24px] mt-0.5">
            Chọn một bài để xem feedback chi tiết của bài đó
          </p>
        </div>
      </div>

      <div className="w-full flex items-center">
        <div className="w-full flex gap-[12px] xl:gap-[16px] pb-4 overflow-x-auto scrollbar-none snap-x snap-mandatory">
          {lessons.map((lesson) => {
            const isSelected = selectedLesson.id === lesson.id
            const isLocked = lesson.status === 'locked'

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`w-[220px] sm:w-[240px] lg:w-[260px] xl:flex-1 xl:w-auto xl:min-w-0 shrink-0 snap-start rounded-[16px] border-2 flex flex-col overflow-hidden h-fit transition-all duration-200 relative ${
                  isLocked ? 'cursor-not-allowed border-[#e2e2ea] bg-white' : 'cursor-pointer hover:shadow-md'
                } ${isSelected ? 'bg-[#f4fafd] border-[#0a7ad8]' : 'bg-white border-[#e2e2ea]'}`}
              >
                <div className="w-full bg-[#d2d2d2] relative shrink-0 rounded-t-[14px] overflow-hidden" style={{ aspectRatio: '260 / 176' }}>
                  {lesson.isCompleted && (
                    <div className="absolute left-0 top-0 p-[10px] flex items-center">
                      <div className="bg-[#339e4a] p-[8px] rounded-full shrink-0 flex items-center justify-center text-white">
                        <div className="relative shrink-0 w-6 h-6">
                          <div className="absolute inset-[20.83%_6.25%_16.67%_6.25%]">
                            <img width="21" height="15" src="/assets/36ad9f1432da45db964bbac8d805b994e5cf282a.svg" alt="Check" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" decoding="async" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute right-0 top-0 p-[10px] flex items-center">
                      <div className="bg-[#e5f2ff] border border-[#0a7ad8] text-[#0a7ad8] text-[14px] font-medium px-[8px] py-[4px] rounded-[8px] shrink-0">
                        Đang xem
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between pt-[8px] pb-[12px] px-[8px] xl:px-[12px] gap-[8px]">
                  <div className="flex items-center justify-center w-full">
                    <h4 className="font-baloo text-[16px] xl:text-[18px] font-bold text-[#37393e] leading-[24px] text-center line-clamp-1 w-full">
                      {lesson.title}
                    </h4>
                  </div>

                  <LessonStatusButton lesson={lesson} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
