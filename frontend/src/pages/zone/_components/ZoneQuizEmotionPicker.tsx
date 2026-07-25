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
    <div className="zone-emotion-picker z-20 grid w-full max-w-[656px] shrink-0 grid-cols-4 items-start justify-center gap-1.5 rounded-[20px] border border-[#c4c9d4] bg-white px-2 py-2.5 shadow-[0_8px_24px_rgba(0,76,110,0.14)] sm:gap-3 sm:rounded-[24px] sm:px-4 sm:py-4 xl:max-w-[840px] xl:px-6 xl:py-5 2xl:max-w-[920px] 2xl:px-8">
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
            className={`relative flex min-w-0 cursor-pointer flex-col items-center gap-1 transition-all duration-300 sm:gap-2 ${
              isPlaced
                ? 'opacity-40 cursor-not-allowed scale-90'
                : isActive
                  ? 'scale-110 -translate-y-1'
                  : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className={`flex aspect-[1.22/1] w-full max-w-[120px] items-center justify-center rounded-[16px] transition-all duration-200 xl:max-w-[140px] 2xl:max-w-[150px] ${
              isActive ? 'drop-shadow-[0_8px_12px_rgba(0,0,0,0.2)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
            }`}>
              <img src={emotion.cloudImage} alt={emotion.label} className="w-full h-full object-contain" />
            </div>
            <span className="text-center font-baloo text-[12px] font-bold sm:text-[17px] lg:text-[20px] xl:text-[22px]" style={{ color: emotion.textColor }}>
              {emotion.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
