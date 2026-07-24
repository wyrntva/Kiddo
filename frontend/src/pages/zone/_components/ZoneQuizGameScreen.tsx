import { useState } from 'react'
import EmotionGameCard from './EmotionGameCard'
import ZoneQuizEmotionPicker from './ZoneQuizEmotionPicker'
import ZoneQuizGameSidebar from './ZoneQuizGameSidebar'
import ZoneQuizSlotOutline from './ZoneQuizSlotOutline'
import { emotionsList, gameCards } from '../quizData'

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

interface ZoneQuizGameScreenProps {
  allPlaced: boolean
  placedEmotions: Record<string, string | null>
  gameChecked: boolean
  onBack: () => void
  onCheckAnswers: () => void
  onSpeakGuide: () => void
  onSelectEmotion: (emotionId: string) => void
  onDrop: (event: React.DragEvent, cardId: string) => void
  onSlotClick: (cardId: string) => void
}

export default function ZoneQuizGameScreen({
  allPlaced,
  placedEmotions,
  gameChecked,
  onBack,
  onCheckAnswers,
  onSpeakGuide,
  onSelectEmotion,
  onDrop,
  onSlotClick,
}: ZoneQuizGameScreenProps) {
  const [shuffledEmotions] = useState(() => shuffleArray(emotionsList))
  return (
    <div className="relative z-10 w-full h-full flex flex-col xl:flex-row gap-4 xl:gap-6 items-stretch justify-start xl:justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto">
      {/* Sidebar - Side on XL screens, compact top/bottom on smaller screens */}
      <ZoneQuizGameSidebar onSpeakGuide={onSpeakGuide} />

      {/* Main Board Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-between relative min-w-0 gap-4 xl:gap-6">
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4 relative px-1">
          <button
            onClick={onBack}
            className="z-30 bg-white hover:bg-red-50 active:scale-95 transition-all border-2 border-[#e83552] text-[#e83552] font-baloo text-[14px] sm:text-[16px] md:text-[18px] font-bold rounded-[40px] px-4 sm:px-6 py-2 flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
          >
            Quay lại
          </button>

          <div className="flex flex-col items-center gap-1 text-center shrink-0 z-20">
            <h1
              style={{ WebkitTextStrokeWidth: '6px', WebkitTextStrokeColor: '#FFF', paintOrder: 'stroke fill' }}
              className="font-baloo font-bold text-[24px] sm:text-[34px] xl:text-[42px] text-[#fea01f] leading-tight select-none"
            >
              Kéo thả cảm xúc
            </h1>
            <div className="bg-[#f2fbef] border-2 border-[#339e4a] flex items-center justify-center p-[4px] sm:p-[6px] rounded-[1000px] shadow-sm">
              <div className="border border-[#02522b] border-dashed px-[12px] sm:px-[20px] py-[3px] sm:py-[6px] rounded-[100px]">
                <span className="font-baloo text-[14px] sm:text-[18px] xl:text-[20px] text-[#418457] font-bold text-center">
                  Con đang cảm thấy gì
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 min-w-[90px] sm:min-w-[120px] flex justify-end">
            {allPlaced ? (
              <button
                onClick={onCheckAnswers}
                className="z-30 bg-gradient-to-r from-[#339e4a] to-[#45c25e] hover:from-[#2c883f] hover:to-[#3db452] active:scale-95 transition-all border-2 border-white text-white font-baloo text-[14px] sm:text-[16px] md:text-[18px] font-bold rounded-[40px] px-4 sm:px-6 py-2 shadow-lg animate-[pulseGlow_2s_ease-in-out_infinite]"
              >
                ✨ Hoàn thành
              </button>
            ) : (
              <div className="w-10 sm:w-16 h-1" />
            )}
          </div>
        </div>

        {/* Center Cards & Emotion Picker Area */}
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 xl:gap-5 min-h-0">
          <div
            className="bg-white rounded-[24px] p-3 sm:p-5 w-full max-w-[950px] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch justify-center shrink-0 z-20"
            style={{ boxShadow: '0 0 10px 0 rgba(0, 76, 110, 0.60)' }}
          >
            {gameCards.map((card) => (
              <EmotionGameCard
                key={card.id}
                cardId={card.id}
                alt={card.alt}
                image={card.image}
                imageClassName={card.imageClassName}
                emptyBorder={card.emptyBorder}
                gradient={card.gradient}
                placedEmotion={placedEmotions[card.id]}
                correctEmotion={card.correctEmotion}
                gameChecked={gameChecked}
                cloudImage={emotionsList.find((emotion) => emotion.id === placedEmotions[card.id])?.cloudImage || ''}
                onDragOver={(event) => event.preventDefault()}
                onDrop={onDrop}
                onSlotClick={onSlotClick}
                renderSlotOutline={(color) => <ZoneQuizSlotOutline color={color} />}
              />
            ))}
          </div>

          <div className="w-full max-w-[950px] flex justify-center">
            <ZoneQuizEmotionPicker
              emotions={shuffledEmotions}
              placedEmotions={placedEmotions}
              onSelectEmotion={onSelectEmotion}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
