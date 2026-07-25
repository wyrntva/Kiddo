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
    <div className="zone-question-screen relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[75rem] flex-1 flex-col items-center justify-start gap-3 p-3 sm:gap-5 sm:p-6 lg:gap-6 overflow-hidden">
      {/* Toro mascot sitting cleanly on the left lawn grass with zero overlap */}
      <div className="hidden lg:block absolute bottom-3 left-3 xl:left-5 z-10 w-[140px] xl:w-[175px] 2xl:w-[205px] pointer-events-none">
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="origin-bottom-left pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex w-full shrink-0 items-center justify-between">
        <button
          onClick={onBack}
          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-[40px] border border-[#e83552] bg-white px-5 py-2 font-baloo text-[15px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 sm:px-6 sm:py-2.5 sm:text-[18px]"
        >
          Quay lại
        </button>

        {onRewatchVideo && (
          <button
            onClick={onRewatchVideo}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-[40px] border border-[#0A7AD8] bg-white px-5 py-2 font-baloo text-[15px] font-bold text-[#0A7AD8] shadow-sm transition-all hover:bg-blue-50 active:scale-95 sm:px-6 sm:py-2.5 sm:text-[18px]"
          >
            <span>Xem lại video</span>
          </button>
        )}
      </div>

      {/* Prominent, large, readable Question Prompt Box */}
      <div className="flex w-full shrink-0 items-center justify-start gap-4 rounded-[24px] border-[3px] border-[#339E4A] bg-white px-4 py-3 shadow-md sm:gap-5 sm:rounded-[60px] sm:border-4 sm:px-7 sm:py-4">
        <button
          onClick={onSpeakQuestion}
          className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-[#0a7ad8] p-2.5 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 sm:p-3.5 ${
            isSpeaking ? 'animate-pulse scale-105' : ''
          }`}
          title="Nghe câu hỏi"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="h-6 w-6 select-none sm:h-7 sm:w-7" />
        </button>
        <div className="flex min-w-0 flex-col gap-1 text-left">
          <span className="font-baloo text-[20px] font-bold leading-tight text-[#0a7ad8] sm:text-[23px] md:text-[26px]">
            Câu hỏi {currentQuestionIndex + 1}/{quizLesson.questions.length}:
          </span>
          <span className="font-vietnam text-[16px] font-bold leading-relaxed text-[#37393e] sm:text-[19px] md:text-[21px]">
            {quiz.prompt}
          </span>
        </div>
      </div>

      {/* Compact 4:3 Answer Options Grid */}
      <div className="zone-question-options grid w-full max-w-[55rem] grid-cols-3 items-center justify-center gap-4 sm:gap-6 mt-3 lg:mt-4 mb-auto py-1">
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
