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
    <div className="zone-question-screen relative z-10 mx-auto flex min-h-full w-full max-w-[1200px] flex-col items-center justify-start gap-4 px-3 py-4 sm:px-5 sm:py-5 lg:gap-6">
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

      <div className="flex w-full items-center justify-between">
        <button
          onClick={onBack}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[40px] border border-[#e83552] bg-white px-5 py-2 font-baloo text-[15px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 sm:px-6 sm:text-[18px]"
        >
          Quay lại
        </button>

        {onRewatchVideo && (
          <button
            onClick={onRewatchVideo}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[40px] border border-[#0A7AD8] bg-white px-5 py-2 font-baloo text-[15px] font-bold text-[#0A7AD8] shadow-sm transition-all hover:bg-blue-50 active:scale-95 sm:px-6 sm:text-[18px]"
          >
            <span>Xem lại video</span>
          </button>
        )}
      </div>

      <div className="flex w-full items-start justify-start gap-3 rounded-[24px] border-[3px] border-[#339E4A] bg-white px-3 py-4 shadow-sm sm:items-center sm:gap-5 sm:rounded-[60px] sm:border-4 sm:px-6 sm:py-5">
        <button
          onClick={onSpeakQuestion}
          className={`flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-[#0a7ad8] p-2.5 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 sm:p-3 ${
            isSpeaking ? 'animate-pulse scale-105' : ''
          }`}
          title="Nghe câu hỏi"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="h-6 w-6 select-none" />
        </button>
        <div className="flex flex-col gap-1 text-left min-w-0">
          <span className="font-baloo text-[20px] font-bold leading-normal text-[#0a7ad8] md:text-[24px]">
            Câu hỏi {currentQuestionIndex + 1}/{quizLesson.questions.length}:
          </span>
          <span className="font-vietnam text-[16px] font-bold leading-relaxed text-[#37393e] md:text-[18px]">
            {quiz.prompt}
          </span>
        </div>
      </div>

      <div className="zone-question-options grid w-full max-w-[1050px] grid-cols-3 justify-center gap-2 sm:gap-4">
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

      <div className="h-2 shrink-0 sm:h-4" />
    </div>
  )
}
