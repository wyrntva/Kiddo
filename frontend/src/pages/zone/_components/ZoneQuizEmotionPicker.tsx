import type { EmotionOption } from '../quizData'

interface ZoneQuizEmotionPickerProps {
  emotions: EmotionOption[]
  placedEmotions: Record<string, string | null>
  selectedEmotionId: string | null
  onSelectEmotion: (emotionId: string) => void
}

export default function ZoneQuizEmotionPicker({
  emotions,
  placedEmotions,
  selectedEmotionId,
  onSelectEmotion,
}: ZoneQuizEmotionPickerProps) {
  return (
    <div className="bg-white border border-[#c4c9d4] rounded-[24px] pt-[24px] pb-[16px] px-[24px] flex flex-row gap-[24px] items-start justify-between w-[656px] h-[196px] max-w-full z-20 shrink-0">
      {emotions.map((emotion) => {
        const isPlaced = Object.values(placedEmotions).includes(emotion.id)
        const isSelected = selectedEmotionId === emotion.id

        return (
          <div
            key={emotion.id}
            draggable={!isPlaced}
            onDragStart={(event) => event.dataTransfer.setData('text/plain', emotion.id)}
            onClick={() => !isPlaced && onSelectEmotion(emotion.id)}
            className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 relative ${
              isPlaced ? 'opacity-40 cursor-not-allowed' : isSelected ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div className={`w-[120px] h-[98px] flex items-center justify-center rounded-[16px] ${isSelected ? 'ring-4 ring-[#0a7ad8]/30' : ''}`}>
              <img src={emotion.cloudImage} alt={emotion.label} className="w-full h-full object-contain" />
            </div>
            <span className="font-baloo text-[20px] font-bold" style={{ color: emotion.textColor }}>
              {emotion.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
