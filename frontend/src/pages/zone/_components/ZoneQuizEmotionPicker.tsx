import { useState } from 'react'
import type { EmotionOption } from '../quizData'
import { playPickupSound } from './soundEffects'

interface ZoneQuizEmotionPickerProps {
  emotions: EmotionOption[]
  placedEmotions: Record<string, string | null>
  onSelectEmotion: (emotionId: string) => void
}

export default function ZoneQuizEmotionPicker({
  emotions,
  placedEmotions,
  onSelectEmotion,
}: ZoneQuizEmotionPickerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleSelect = (emotionId: string) => {
    playPickupSound()
    setActiveId(emotionId)
    onSelectEmotion(emotionId)
    setTimeout(() => setActiveId(null), 300)
  }

  return (
    <div className="bg-white border border-[#c4c9d4] rounded-[24px] pt-[20px] pb-[16px] px-[16px] sm:px-[20px] lg:px-[24px] flex flex-wrap sm:flex-nowrap gap-[16px] sm:gap-[20px] lg:gap-[24px] items-start justify-center sm:justify-between w-full max-w-[656px] z-20 shrink-0">
      {emotions.map((emotion) => {
        const isPlaced = Object.values(placedEmotions).includes(emotion.id)
        const isActive = activeId === emotion.id

        return (
          <div
            key={emotion.id}
            draggable={!isPlaced}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', emotion.id)
              playPickupSound()
            }}
            onClick={() => !isPlaced && handleSelect(emotion.id)}
            className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 relative w-[calc(50%_-_8px)] sm:w-auto ${
              isPlaced
                ? 'opacity-40 cursor-not-allowed scale-90'
                : isActive
                  ? 'scale-110 -translate-y-1'
                  : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className={`w-[96px] h-[78px] sm:w-[108px] sm:h-[88px] lg:w-[120px] lg:h-[98px] flex items-center justify-center rounded-[16px] transition-all duration-200 ${
              isActive ? 'drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
            }`}>
              <img src={emotion.cloudImage} alt={emotion.label} className="w-full h-full object-contain" />
            </div>
            <span className="font-baloo text-[18px] sm:text-[20px] font-bold text-center" style={{ color: emotion.textColor }}>
              {emotion.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
