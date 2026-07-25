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
    <div className="zone-question-screen relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[75rem] flex-1 flex-col items-center justify-between gap-2 p-3 sm:p-4 lg:gap-3 overflow-hidden">
      <div
        className="hidden lg:block absolute bottom-[20px] left-[20px] xl:left-[40px] z-10 w-[200px] xl:w-[280px] pointer-events-none"
        style={{ transform: 'translate(-300px, -200px)' }}
      >
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="origin-bottom-left pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex w-full shrink-0 items-center justify-between">
        <button
          onClick={onBack}
          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-[40px] border border-[#e83552] bg-white px-4 py-1.5 font-baloo text-[14px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 sm:px-6 sm:py-2 sm:text-[18px]"
        >
          Quay lại
        </button>

        {onRewatchVideo && (
          <button
            onClick={onRewatchVideo}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-[40px] border border-[#0A7AD8] bg-white px-4 py-1.5 font-baloo text-[15px] font-bold text-[#0A7AD8] shadow-sm transition-all hover:bg-blue-50 active:scale-95 sm:px-6 sm:py-2 sm:text-[18px]"
          >
            <span>Xem lại video</span>
          </button>
        )}
      </div>

      <div className="flex w-full shrink-0 items-center justify-start gap-3 rounded-[20px] border-[3px] border-[#339E4A] bg-white px-3 py-2.5 shadow-sm sm:gap-4 sm:rounded-[60px] sm:border-4 sm:px-5 sm:py-3">
        <button
          onClick={onSpeakQuestion}
          className={`flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-[#0a7ad8] p-2 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 sm:p-2.5 ${
            isSpeaking ? 'animate-pulse scale-105' : ''
          }`}
          title="Nghe câu hỏi"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="h-5 w-5 select-none sm:h-6 sm:w-6" />
        </button>
        <div className="flex min-w-0 flex-col gap-0.5 text-left">
          <span className="font-baloo text-[17px] font-bold leading-tight text-[#0a7ad8] sm:text-[20px] md:text-[22px]">
            Câu hỏi {currentQuestionIndex + 1}/{quizLesson.questions.length}:
          </span>
          <span className="font-vietnam text-[14px] font-bold leading-snug text-[#37393e] sm:text-[16px] md:text-[17px]">
            {quiz.prompt}
          </span>
        </div>
      </div>

      <div className="zone-question-options grid min-h-0 w-full max-w-[65.625rem] flex-1 grid-cols-3 items-stretch justify-center gap-2 sm:gap-4">
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
