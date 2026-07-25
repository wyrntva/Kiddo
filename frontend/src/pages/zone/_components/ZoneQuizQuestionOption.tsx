import type { QuizOption } from '../quizData'

interface ZoneQuizQuestionOptionProps {
  option: QuizOption
  isSelected: boolean
  isChecked: boolean
  isCorrectOption: boolean
  onSelect: (optionId: string | number) => void
}

export default function ZoneQuizQuestionOption({
  option,
  isSelected,
  isChecked,
  isCorrectOption,
  onSelect,
}: ZoneQuizQuestionOptionProps) {
  let cardClass = 'bg-white border-2 border-[#C3FFD0] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] transition-all duration-300'
  
  if (isChecked) {
    if (isSelected) {
      if (isCorrectOption) {
        cardClass = 'bg-[#339e4a] border-4 border-[#247034] shadow-[0_0_30px_rgba(51,158,74,0.6)] scale-105 z-20 pointer-events-none'
      } else {
        cardClass = 'bg-[#ef4444] border-4 border-[#b91c1c] shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-95 pointer-events-none animate-shake z-20'
      }
    } else {
      cardClass = 'bg-white border-2 border-gray-200 opacity-30 scale-95 pointer-events-none'
    }
  } else {
    cardClass += ' hover:bg-[#e5f2ff] hover:border-[#83dca0] active:scale-98 cursor-pointer'
    if (isSelected) {
      cardClass = 'bg-[#eefcf2] border-4 border-[#339E4A] shadow-[#339E4A]/10 active:scale-98 cursor-pointer'
    }
  }

  const imgSrc = option.sprite || option.img || ''
  const hasCustomStyle = option.style && Object.keys(option.style).length > 0
  const hasLabel = Boolean(option.label && option.label.trim())

  return (
    <button
      onClick={() => onSelect(option.id)}
      disabled={isChecked}
      className={`zone-question-option group relative flex min-w-0 w-full flex-col items-center justify-center gap-1.5 rounded-[16px] p-1.5 transition-all duration-300 sm:gap-3 sm:rounded-[24px] sm:p-4 ${cardClass}`}
    >
      {isChecked && isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-30 animate-bounce">
          {isCorrectOption ? (
            <div className="bg-[#339e4a] rounded-full p-1.5 w-full h-full flex items-center justify-center border-2 border-white">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="bg-[#ef4444] rounded-full p-1.5 w-full h-full flex items-center justify-center border-2 border-white">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
      )}

      <div className="zone-question-image relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[12px] border border-gray-100 bg-gray-50 sm:aspect-square sm:rounded-2xl">
        {hasCustomStyle ? (
          <div className="relative w-full h-full overflow-hidden rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
            <img src={imgSrc} alt={option.label || ''} style={option.style} className="absolute max-w-none block select-none pointer-events-none" />
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={option.label || ''}
            className="w-full h-full object-cover rounded-2xl select-none pointer-events-none transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {hasLabel && (
        <span
          className={`font-vietnam text-center text-[11px] font-bold leading-4 transition-colors sm:text-[16px] sm:leading-6 md:text-[18px] ${
            isChecked
              ? isSelected
                ? 'text-white'
                : 'text-gray-400'
              : 'text-[#37393e] group-hover:text-[#339E4A]'
          }`}
        >
          {option.label}
        </span>
      )}
    </button>
  )
}
