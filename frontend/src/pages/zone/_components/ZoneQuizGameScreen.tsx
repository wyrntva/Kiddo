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
  allPlaced?: boolean
  placedEmotions: Record<string, string | null>
  gameChecked: boolean
  onBack: () => void
  onRewatchVideo?: () => void
  onCheckAnswers?: () => void
  onSpeakGuide: () => void
  onSelectEmotion: (emotionId: string) => void
  onDrop: (event: React.DragEvent, cardId: string) => void
  onSlotClick: (cardId: string) => void
}

export default function ZoneQuizGameScreen({
  allPlaced: _allPlaced,
  placedEmotions,
  gameChecked,
  onBack,
  onRewatchVideo: _onRewatchVideo,
  onCheckAnswers: _onCheckAnswers,
  onSpeakGuide,
  onSelectEmotion,
  onDrop,
  onSlotClick,
}: ZoneQuizGameScreenProps) {
  const [shuffledEmotions] = useState(() => shuffleArray(emotionsList))
  return (
    <div className="zone-game-screen relative z-10 flex min-h-full w-full flex-col items-stretch justify-start gap-3 overflow-y-auto p-2.5 sm:p-4 xl:grid xl:h-full xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-6 xl:p-5 2xl:grid-cols-[300px_minmax(0,1fr)] 2xl:p-6">
      {/* Sidebar - Side on XL screens, compact top/bottom on smaller screens */}
      <ZoneQuizGameSidebar onSpeakGuide={onSpeakGuide} />

      {/* Main Board Area */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col items-center gap-3 xl:gap-5">
        {/* Top Header Bar */}
        <div className="relative grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-center gap-1.5 px-0.5 sm:gap-3">
          <div className="z-30 flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex min-h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition-all hover:bg-red-50 active:scale-95 sm:px-5 sm:py-2 sm:text-[16px]"
            >
              Quay lại
            </button>
          </div>

          <div className="z-20 flex min-w-0 flex-col items-center gap-1 text-center">
            <h1
              style={{ WebkitTextStrokeWidth: '6px', WebkitTextStrokeColor: '#FFF', paintOrder: 'stroke fill' }}
              className="select-none font-baloo text-[clamp(1.1rem,4vw,2.625rem)] font-bold leading-tight text-[#fea01f]"
            >
              Kéo thả cảm xúc
            </h1>
            <div className="hidden items-center justify-center rounded-[1000px] border-2 border-[#339e4a] bg-[#f2fbef] p-1 shadow-sm min-[430px]:flex sm:p-1.5">
              <div className="border border-[#02522b] border-dashed px-[12px] sm:px-[20px] py-[3px] sm:py-[6px] rounded-[100px]">
                <span className="font-baloo text-[14px] sm:text-[18px] xl:text-[20px] text-[#418457] font-bold text-center">
                  Con đang cảm thấy gì
                </span>
              </div>
            </div>
          </div>

          <div className="flex min-w-[42px] shrink-0 justify-end sm:min-w-[110px]" />
        </div>

        {/* Center Cards & Emotion Picker Area */}
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-3 xl:gap-5 2xl:gap-6">
          <div
            className="zone-game-board z-20 grid w-full max-w-[950px] grid-cols-2 items-stretch justify-center gap-2 rounded-[20px] bg-white p-2.5 sm:gap-3 sm:rounded-[24px] sm:p-4 md:grid-cols-4 xl:max-w-[1080px] xl:gap-4 xl:p-5 2xl:max-w-[1160px] 2xl:p-6"
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

          <div className="flex w-full max-w-[950px] justify-center xl:max-w-[1080px] 2xl:max-w-[1160px]">
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
