import { useState } from 'react'
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
  const [imgError, setImgError] = useState(false)

  let cardClass = 'bg-white border-2 border-transparent shadow-[0px_4px_10px_rgba(0,0,0,0.03)] transition-all duration-300'
  
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

  let imgSrc = option.sprite || option.img || ''
  if (imgSrc.startsWith('/uploads')) {
    const backendUrl = import.meta.env.VITE_API_URL || ''
    imgSrc = `${backendUrl}${imgSrc}`
  }
  const hasCustomStyle = option.style && Object.keys(option.style).length > 0
  const hasLabel = Boolean(option.label && option.label.trim())

  return (
    <button
      onClick={() => onSelect(option.id)}
      disabled={isChecked}
      className={`zone-question-option group relative flex min-h-0 h-full w-full flex-col items-center justify-center gap-1 rounded-[16px] p-1.5 transition-all duration-300 sm:gap-2 sm:rounded-[24px] sm:p-2.5 ${cardClass}`}
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

      <div className="zone-question-image relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[12px] border border-gray-100 bg-gray-50 sm:rounded-2xl">
        {imgError || !imgSrc ? (
          <div className="flex flex-col items-center justify-center gap-1.5 p-3 text-gray-400 bg-gray-100/90 w-full h-full rounded-2xl select-none">
            <svg className="w-8 h-8 text-gray-300 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] font-semibold text-gray-400 text-center sm:text-[12px]">Hình ảnh không khả dụng</span>
          </div>
        ) : hasCustomStyle ? (
          <div className="relative w-full h-full overflow-hidden rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
            <img 
              src={imgSrc} 
              alt={option.label || ''} 
              style={option.style} 
              onError={() => setImgError(true)}
              className="absolute max-w-none block select-none pointer-events-none" 
            />
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={option.label || ''}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-2xl select-none pointer-events-none transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {hasLabel && (
        <span
          className={`font-vietnam text-center text-[11px] font-bold leading-4 transition-colors shrink-0 sm:text-[15px] sm:leading-5 md:text-[16px] ${
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
