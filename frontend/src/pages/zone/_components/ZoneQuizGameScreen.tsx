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
    <div className="relative z-10 w-full h-full flex flex-col lg:flex-row gap-5 lg:gap-[32px] items-stretch justify-start lg:justify-center p-4 sm:p-6 lg:p-[24px] overflow-y-auto">
      <ZoneQuizGameSidebar onSpeakGuide={onSpeakGuide} />

      <div className="flex-1 min-h-0 flex flex-col items-center relative min-w-0 gap-5 lg:gap-6">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:block">
          <button
            onClick={onBack}
            className="lg:absolute lg:left-0 lg:top-0 z-30 bg-white hover:bg-red-50 active:scale-95 transition-all border border-[#e83552] text-[#e83552] font-baloo text-[16px] sm:text-[18px] font-bold rounded-[40px] px-5 sm:px-6 py-2.5 flex items-center gap-2 shadow-sm self-start"
          >
            Quay lại
          </button>
          {allPlaced && (
            <button
              onClick={onCheckAnswers}
              className="lg:absolute lg:right-0 lg:top-0 z-30 bg-gradient-to-r from-[#339e4a] to-[#45c25e] hover:from-[#2c883f] hover:to-[#3db452] active:scale-95 transition-all border-2 border-white text-white font-baloo text-[16px] sm:text-[18px] font-bold rounded-[40px] px-5 sm:px-6 py-2.5 shadow-lg self-end animate-[pulseGlow_2s_ease-in-out_infinite] hover:shadow-[0_0_20px_rgba(51,158,74,0.5)]"
            >
              ✨ Hoàn thành
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-center shrink-0 z-20 px-2">
          <h1
            style={{ WebkitTextStrokeWidth: '8px', WebkitTextStrokeColor: '#FFF', paintOrder: 'stroke fill' }}
            className="font-baloo font-bold text-[32px] sm:text-[40px] xl:text-[48px] text-[#fea01f] leading-[40px] sm:leading-[52px] xl:leading-[60px] select-none"
          >
            Kéo thả cảm xúc
          </h1>
          <div className="bg-[#f2fbef] border-4 border-[#339e4a] flex items-center justify-center p-[8px] rounded-[1000px] shadow-sm">
            <div className="border-2 border-[#02522b] border-dashed px-[16px] sm:px-[24px] py-[8px] rounded-[100px]">
              <span className="font-baloo text-[18px] sm:text-[22px] xl:text-[24px] text-[#418457] leading-[28px] sm:leading-[36px] xl:leading-[40px] font-bold text-center">
                Con đang cảm thấy gì
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-start lg:justify-center gap-5 lg:gap-6 min-h-0">
          <div
            className="bg-white rounded-[24px] p-[16px] sm:p-[20px] lg:p-[24px] w-full max-w-[1100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] lg:gap-[24px] items-stretch justify-center shrink-0 h-fit z-20"
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

          <ZoneQuizEmotionPicker
            emotions={shuffledEmotions}
            placedEmotions={placedEmotions}
            onSelectEmotion={onSelectEmotion}
          />
        </div>
      </div>
    </div>
  )
}
