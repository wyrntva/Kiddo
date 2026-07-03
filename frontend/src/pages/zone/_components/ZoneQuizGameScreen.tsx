import EmotionGameCard from './EmotionGameCard'
import ZoneQuizEmotionPicker from './ZoneQuizEmotionPicker'
import ZoneQuizGameSidebar from './ZoneQuizGameSidebar'
import ZoneQuizSlotOutline from './ZoneQuizSlotOutline'
import { emotionsList, gameCards } from '../quizData'

interface ZoneQuizGameScreenProps {
  allPlaced: boolean
  placedEmotions: Record<string, string | null>
  selectedEmotionId: string | null
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
  selectedEmotionId,
  gameChecked,
  onBack,
  onCheckAnswers,
  onSpeakGuide,
  onSelectEmotion,
  onDrop,
  onSlotClick,
}: ZoneQuizGameScreenProps) {
  return (
    <div className="relative z-10 w-full h-full flex flex-row gap-[32px] items-stretch justify-center p-[32px]">
      <ZoneQuizGameSidebar onSpeakGuide={onSpeakGuide} />

      <div className="flex-1 h-full flex flex-col items-center relative min-w-0 gap-6">
        <button
          onClick={onBack}
          className="absolute left-0 top-0 z-30 bg-white hover:bg-red-50 active:scale-95 transition-all border border-[#e83552] text-[#e83552] font-baloo text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-sm"
        >
          Quay lại
        </button>
        {allPlaced && (
          <button
            onClick={onCheckAnswers}
            className="absolute right-0 top-0 z-30 bg-[#339e4a] hover:bg-[#2c883f] active:scale-95 transition-all border border-white text-white font-baloo text-[18px] font-bold rounded-[40px] px-6 py-2.5 shadow-md"
          >
            Hoàn thành
          </button>
        )}

        <div className="flex flex-col items-center gap-2 text-center shrink-0 mb-4 z-20">
          <h1
            style={{ WebkitTextStrokeWidth: '8px', WebkitTextStrokeColor: '#FFF', paintOrder: 'stroke fill' }}
            className="font-baloo font-bold text-[48px] text-[#fea01f] leading-[60px] select-none"
          >
            Kéo thả cảm xúc
          </h1>
          <div className="bg-[#f2fbef] border-4 border-[#339e4a] flex items-center justify-center p-[8px] rounded-[1000px] shadow-sm -mt-3">
            <div className="border-2 border-[#02522b] border-dashed px-[24px] py-[8px] rounded-[100px]">
              <span className="font-baloo text-[24px] text-[#418457] leading-[40px] font-bold whitespace-nowrap">
                Con đang cảm thấy gì
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center gap-6 min-h-0">
          <div
            className="bg-white rounded-[24px] p-[24px] w-full max-w-[1100px] flex flex-row gap-[24px] items-start justify-center shrink-0 h-fit z-20"
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
            emotions={emotionsList}
            placedEmotions={placedEmotions}
            selectedEmotionId={selectedEmotionId}
            onSelectEmotion={onSelectEmotion}
          />
        </div>
      </div>
    </div>
  )
}
