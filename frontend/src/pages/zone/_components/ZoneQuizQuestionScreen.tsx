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
    <div className="zone-question-screen relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-1 flex-col items-center justify-start gap-3 px-3 pb-3 pt-12 sm:gap-4 sm:px-5 sm:pb-5 sm:pt-12 lg:gap-4 overflow-visible">
      {/* Toro mascot reading book: ENLARGED & positioned nicely on left grass */}
      <div className="zone-desktop-mascot absolute bottom-[16px] left-[5%] lg:left-[7%] z-10 w-[200px] lg:w-[240px] 2xl:w-[285px] pointer-events-none">
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="origin-bottom-left pointer-events-none h-auto w-full select-none object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Shared Alignment Container for Top Buttons & Question Box: max-w-[1300px] */}
      <div className="zone-question-header-container flex w-full max-w-[1300px] shrink-0 flex-col gap-0">
        {/* Top Header Buttons: aligned to left & right edges of Question Box with 24px bottom margin */}
        <div className="flex w-full items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="cursor-pointer rounded-full border border-[#e83552] bg-white/90 px-6 py-2.5 font-baloo text-[18px] font-bold text-[#e83552] shadow-md transition-all hover:bg-[#ffe6e9] active:scale-95"
          >
            Quay lại
          </button>

          {onRewatchVideo && (
            <button
              onClick={onRewatchVideo}
              className="cursor-pointer rounded-full border border-[#0a7ad8] bg-white/90 px-6 py-2.5 font-baloo text-[18px] font-bold text-[#0a7ad8] shadow-md transition-all hover:bg-[#e6f6ff] active:scale-95"
            >
              Xem lại video
            </button>
          )}
        </div>

        {/* Question Prompt Box: max-w-[1300px] */}
        <div className="zone-question-prompt-box flex w-full items-center justify-start gap-4 rounded-[24px] border-[3px] border-[#339E4A] bg-white px-5 py-3.5 shadow-md sm:gap-5 sm:rounded-[60px] sm:border-4 sm:px-7 sm:py-4">
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
            <span className="zone-question-index-text font-baloo text-[20px] font-bold leading-tight text-[#0a7ad8] sm:text-[23px] md:text-[25px]">
              Câu hỏi {currentQuestionIndex + 1}/{quizLesson.questions.length}:
            </span>
            <span className="zone-question-prompt-text font-vietnam text-[15px] font-bold leading-relaxed text-[#37393e] sm:text-[18px] md:text-[20px]">
              {quiz.prompt}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Answer Option Cards Grid: EXACT SAME max-w-[1300px] as question box! */}
      <div className="zone-question-options grid w-full max-w-[1300px] grid-cols-1 sm:grid-cols-3 items-center justify-between gap-3 sm:gap-[min(2.4vw,24px)] mt-2 lg:mt-3 mb-auto py-1">
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

      {/* Mobile/Tablet Portrait Mascot: shown below answer options, sitting on the bottom grass */}
      <div className="zone-mobile-reading-mascot w-[220px] sm:w-[300px] md:w-[420px] mt-4 mb-[50px] shrink-0 pointer-events-none">
        <img
          src={zoneQuizAssets.mascot}
          alt="Mascot"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  )
}
