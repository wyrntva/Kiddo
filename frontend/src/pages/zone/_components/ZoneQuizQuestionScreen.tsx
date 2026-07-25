import type { QuizLessonData, QuizQuestion } from '../quizData'
import { zoneQuizAssets } from '../quizData'
import ZoneQuizQuestionOption from './ZoneQuizQuestionOption'

interface ZoneQuizQuestionScreenProps {
  quiz: QuizQuestion
  quizLesson: QuizLessonData
  currentQuestionIndex: number
  selectedOptionId: number | string | null
  isChecked: boolean
  isSpeaking: boolean
  onBack: () => void
  onRewatchVideo?: () => void
  onSpeakQuestion: () => void
  onSelect: (optionId: string | number) => void
}

export default function ZoneQuizQuestionScreen({
  quiz,
  quizLesson,
  currentQuestionIndex,
  selectedOptionId,
  isChecked,
  isSpeaking,
  onBack,
  onRewatchVideo,
  onSpeakQuestion,
  onSelect,
}: ZoneQuizQuestionScreenProps) {
  return (
    <div className="zone-question-screen relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-1 flex-col items-center justify-start gap-3 p-3 sm:gap-4 sm:p-5 lg:gap-4 overflow-hidden">
      {/* Toro mascot reading book: ENLARGED & positioned nicely on left grass */}
      <div className="hidden lg:block absolute bottom-[16px] left-[5%] xl:left-[7%] z-10 w-[200px] xl:w-[240px] 2xl:w-[285px] pointer-events-none">
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="origin-bottom-left pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Shared Alignment Container for Top Buttons & Question Box: max-w-[min(90vw,860px)] */}
      <div className="flex w-full max-w-[min(90vw,860px)] shrink-0 flex-col gap-2.5 sm:gap-3">
        {/* Top Header Buttons: aligned to left & right edges of Question Box */}
        <div className="flex w-full items-center justify-between">
          <button
            onClick={onBack}
            className="flex min-h-9 cursor-pointer items-center gap-2 rounded-[40px] border border-[#e83552] bg-white px-5 py-1.5 font-baloo text-[15px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 sm:px-6 sm:py-2 sm:text-[17px]"
          >
            Quay lại
          </button>

          {onRewatchVideo && (
            <button
              onClick={onRewatchVideo}
              className="flex min-h-9 cursor-pointer items-center gap-2 rounded-[40px] border border-[#0A7AD8] bg-white px-5 py-1.5 font-baloo text-[15px] font-bold text-[#0A7AD8] shadow-sm transition-all hover:bg-blue-50 active:scale-95 sm:px-6 sm:py-2 sm:text-[17px]"
            >
              <span>Xem lại video</span>
            </button>
          )}
        </div>

        {/* Question Prompt Box: max-w-[min(90vw,860px)] */}
        <div className="flex w-full items-center justify-start gap-4 rounded-[24px] border-[3px] border-[#339E4A] bg-white px-5 py-3.5 shadow-md sm:gap-5 sm:rounded-[60px] sm:border-4 sm:px-7 sm:py-4">
          <button
            onClick={onSpeakQuestion}
            className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-[#0a7ad8] p-3 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 ${
              isSpeaking ? 'animate-pulse scale-105' : ''
            }`}
            title="Nghe câu hỏi"
          >
            <img src={zoneQuizAssets.speaker} alt="Speak" className="h-6 w-6 select-none sm:h-7 sm:w-7" />
          </button>
          <div className="flex min-w-0 flex-col gap-1 text-left">
            <span className="font-baloo text-[20px] font-bold leading-tight text-[#0a7ad8] sm:text-[23px] md:text-[25px]">
              Câu hỏi {currentQuestionIndex + 1}/{quizLesson.questions.length}:
            </span>
            <span className="font-vietnam text-[15px] font-bold leading-relaxed text-[#37393e] sm:text-[18px] md:text-[20px]">
              {quiz.prompt}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Answer Option Cards Grid: EXACT SAME max-w-[min(90vw,860px)] as question box! */}
      <div className="zone-question-options grid w-full max-w-[min(90vw,860px)] grid-cols-3 items-stretch justify-between gap-[min(2.4vw,24px)] mt-2 lg:mt-3 mb-auto py-1">
        {quiz.options.map((option) => (
          <ZoneQuizQuestionOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            isChecked={isChecked}
            isCorrectOption={option.id === quiz.correctOptionId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
