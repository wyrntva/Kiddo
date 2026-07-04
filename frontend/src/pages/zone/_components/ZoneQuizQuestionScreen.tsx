import type { QuizLessonData, QuizQuestion } from '../quizData'
import { zoneQuizAssets } from '../quizData'
import ZoneQuizQuestionOption from './ZoneQuizQuestionOption'

interface ZoneQuizQuestionScreenProps {
  quiz: QuizQuestion
  quizLesson: QuizLessonData
  currentQuestionIndex: number
  selectedOptionId: number | null
  isChecked: boolean
  isCorrect: boolean
  isSpeaking: boolean
  onBack: () => void
  onSpeakQuestion: () => void
  onSelect: (optionId: number) => void
}

export default function ZoneQuizQuestionScreen({
  quiz,
  quizLesson,
  currentQuestionIndex,
  selectedOptionId,
  isChecked,
  isCorrect,
  isSpeaking,
  onBack,
  onSpeakQuestion,
  onSelect,
}: ZoneQuizQuestionScreenProps) {
  return (
    <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1200px] flex-col items-center justify-start gap-6 px-4 sm:px-6 py-6 md:gap-[40px] md:py-8">
      <div className="hidden lg:block fixed bottom-[220px] left-[32px] xl:left-[60px] z-10 w-[220px] xl:w-[310px] pointer-events-none">
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="origin-bottom-left pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="w-full justify-start md:flex">
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 rounded-[40px] border border-[#e83552] bg-white px-6 py-2.5 font-baloo text-[16px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 md:text-[18px]"
        >
          Quay lại
        </button>
      </div>

      <div className="flex w-full items-start sm:items-center justify-start gap-[16px] sm:gap-[24px] rounded-[32px] sm:rounded-[100px] border-[4px] border-[#339E4A] bg-white py-[20px] sm:py-[24px] px-[16px] sm:pl-[32px] sm:pr-[24px] shadow-sm">
        <button
          onClick={onSpeakQuestion}
          className={`flex shrink-0 items-center justify-center rounded-full bg-[#0a7ad8] p-3 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 ${
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

      <div className="grid w-full max-w-[900px] grid-cols-1 justify-center gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {quiz.options.map((option) => (
          <ZoneQuizQuestionOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            isChecked={isChecked}
            isCorrect={isCorrect}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="h-[32px]" />
    </div>
  )
}
