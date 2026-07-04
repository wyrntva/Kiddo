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

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, cardId)}
      className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all h-fit min-w-0 ${borderClass}`}
      style={{ borderColor: gameChecked ? undefined : emptyBorder }}
    >
      <div
        className="border-4 border-white border-solid w-full flex flex-col gap-[10px] items-center py-[18px] px-3 relative rounded-[24px] justify-start"
        style={{ background }}
      >
        <div
          onClick={() => onSlotClick(cardId)}
          className="w-[72px] sm:w-[90px] md:w-[108px] h-[64px] sm:h-[80px] md:h-[96px] relative flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 cloud-slot-container"
        >
          {placedEmotion ? (
            <img src={cloudImage} alt="" className="w-full h-full object-contain pointer-events-none scale-[1.62]" />
          ) : (
            renderSlotOutline(emptyBorder)
          )}
        </div>

        <div className="relative w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] md:w-[130px] md:h-[130px] xl:w-[185px] xl:h-[185px] shrink-0 overflow-hidden pointer-events-none rounded-[20px] mascot-container">
          <img src={image} alt={alt} className={imageClassName} />
        </div>

        {gameChecked && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
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
