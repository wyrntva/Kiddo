import { useState } from 'react'

interface EmotionGameCardProps {
  cardId: string
  alt: string
  image: string
  imageClassName: string
  emptyBorder: string
  gradient: string
  placedEmotion: string | null
  correctEmotion: string
  gameChecked: boolean
  cloudImage: string
  onDragOver: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent, cardId: string) => void
  onSlotClick: (cardId: string) => void
  renderSlotOutline: (color: string) => React.ReactNode
}

export default function EmotionGameCard({
  cardId,
  alt,
  image,
  imageClassName,
  emptyBorder,
  gradient,
  placedEmotion,
  correctEmotion,
  gameChecked,
  cloudImage,
  onDragOver,
  onDrop,
  onSlotClick,
  renderSlotOutline,
}: EmotionGameCardProps) {
  const isCorrect = placedEmotion === correctEmotion
  const borderClass = gameChecked ? (isCorrect ? 'border-[#339e4a]' : 'border-[#ef4444]') : ''
  const background = gameChecked ? (isCorrect ? '#eefcf2' : '#fdf2f2') : gradient

  const [justPlaced, setJustPlaced] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (event: React.DragEvent) => {
    setIsDragOver(false)
    setJustPlaced(true)
    onDrop(event, cardId)
    setTimeout(() => setJustPlaced(false), 500)
  }

  const handleDragOver = (event: React.DragEvent) => {
    onDragOver(event)
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleSlotClick = () => {
    if (!placedEmotion) {
      setJustPlaced(true)
      setTimeout(() => setJustPlaced(false), 500)
    }
    onSlotClick(cardId)
  }

  return (
    <div
      data-card-id={cardId}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all duration-300 h-fit min-w-0 ${borderClass} ${
        isDragOver ? 'scale-105 shadow-[0_0_20px_rgba(51,158,74,0.4)] ring-2 ring-[#339e4a]/50' : ''
      } ${gameChecked && isCorrect ? 'animate-[celebrateCard_0.5s_ease-in-out]' : ''} ${
        gameChecked && !isCorrect ? 'animate-[shakeCard_0.4s_ease-in-out]' : ''
      }`}
      style={{ borderColor: gameChecked ? undefined : emptyBorder }}
    >
      <div
        className="zone-game-card-inner relative flex w-full flex-col items-center justify-start gap-1.5 rounded-[22px] border-[3px] border-white border-solid px-1.5 py-2 sm:gap-2 sm:px-2 sm:py-3 lg:border-4"
        style={{ background }}
      >
        <div
          onClick={handleSlotClick}
          className={`cloud-slot-container relative flex aspect-[1.125/1] w-[50%] max-w-[8.125rem] cursor-pointer items-center justify-center transition-transform active:scale-95 ${
            isDragOver && !placedEmotion ? 'animate-pulse scale-110' : ''
          }`}
        >
          {placedEmotion ? (
            <img
              src={cloudImage}
              alt=""
              className={`w-full h-full object-contain pointer-events-none scale-[1.62] transition-all duration-300 ${
                justPlaced ? 'animate-[bounceIn_0.5s_ease-out]' : ''
              }`}
            />
          ) : (
            <div className={`transition-transform duration-200 ${isDragOver ? 'scale-125' : ''}`}>
              {renderSlotOutline(emptyBorder)}
            </div>
          )}
        </div>

        <div className="mascot-container pointer-events-none relative aspect-square w-[60%] max-w-[9.5rem] overflow-hidden rounded-[16px]">
          <img src={image} alt={alt} className={imageClassName} />
        </div>

        {gameChecked && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-[popIn_0.3s_ease-out]">
            {isCorrect ? (
              <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
            ) : (
              <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
