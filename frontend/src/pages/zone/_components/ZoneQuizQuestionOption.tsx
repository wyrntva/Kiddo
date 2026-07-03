import type { QuizOption } from '../quizData'

interface ZoneQuizQuestionOptionProps {
  option: QuizOption
  isSelected: boolean
  isChecked: boolean
  isCorrect: boolean
  onSelect: (optionId: number) => void
}

export default function ZoneQuizQuestionOption({
  option,
  isSelected,
  isChecked,
  isCorrect,
  onSelect,
}: ZoneQuizQuestionOptionProps) {
  let cardClass = 'bg-white border-2 border-[#C3FFD0] shadow-[0px_4px_10px_rgba(0,0,0,0.03)]'
  if (isSelected) {
    cardClass = isChecked
      ? isCorrect
        ? 'bg-[#eefcf2] border-4 border-[#339e4a] shadow-[#339e4a]/10'
        : 'bg-[#fdf2f2] border-4 border-[#ef4444] shadow-[#ef4444]/10'
      : 'bg-[#eefcf2] border-4 border-[#339E4A] shadow-[#339E4A]/10'
  } else if (!isChecked) {
    cardClass += ' hover:bg-[#e5f2ff]'
  }

  return (
    <button
      onClick={() => onSelect(option.id)}
      disabled={isChecked}
      className={`flex flex-col items-center justify-center p-[48px] gap-[24px] rounded-[24px] transition-all duration-300 w-full group relative ${cardClass} active:scale-98 cursor-pointer`}
    >
      {isChecked && isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-bounce">
          {isCorrect ? (
            <div className="bg-[#339e4a] rounded-full p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="bg-[#ef4444] rounded-full p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
      )}
      <div className="w-full aspect-square rounded-2xl overflow-hidden relative flex items-center justify-center">
        <div className="relative w-[180px] h-[180px] overflow-hidden rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
          <img src={option.sprite} alt={option.label} style={option.style} className="absolute max-w-none block select-none pointer-events-none" />
        </div>
      </div>
      <span
        className={`font-vietnam font-bold text-[16px] md:text-[18px] text-center leading-[24px] transition-colors ${
          isSelected
            ? isChecked
              ? isCorrect
                ? 'text-[#339e4a]'
                : 'text-[#ef4444]'
              : 'text-[#339E4A]'
            : 'text-[#37393e] group-hover:text-[#339E4A]'
        }`}
      >
        {option.label}
      </span>
    </button>
  )
}
