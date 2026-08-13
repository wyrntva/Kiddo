import { useEffect, useState } from 'react'
import { zoneQuizAssets } from '../quizData'
import { playPickupSound, playSuccessSound } from './soundEffects'

interface Props {
  gameChecked: boolean
  onBack: () => void
  onComplete: () => void
  onSpeakGuide: () => void
}

const pairImages = [
  { type: 'flower', image: '/assets/memory-card-layer-3.png', label: 'Toro cầm bông hoa' },
  { type: 'bottle', image: '/assets/memory-card-layer-1.png', label: 'Toro cầm bình nước' },
  { type: 'ball', image: '/assets/memory-card-layer-5.png', label: 'Toro ôm quả bóng' },
  { type: 'pencil', image: '/assets/memory-card-layer-6.png', label: 'Toro cầm bút chì' },
] as const

const createDeck = () => {
  const cards = pairImages.flatMap((card) => [0, 1].map((copy) => ({ ...card, id: `${card.type}-${copy}` })))
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

export default function ZoneQuizMemoryGameScreen({ gameChecked, onBack, onComplete, onSpeakGuide }: Props) {
  const [cards, setCards] = useState(() => createDeck())
  const [open, setOpen] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [locked, setLocked] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)

  useEffect(() => {
    if (!gameChecked) {
      setOpen([])
      setMatched([])
      setLocked(false)
      setIsIncorrect(false)
      setCards(createDeck())
    }
  }, [gameChecked])

  const playCorrectSound = () => {
    try {
      const audio = new Audio('/assets/correct.mp3')
      audio.play().catch(() => {})
    } catch {}
  }

  const playIncorrectSound = () => {
    try {
      const audio = new Audio('/assets/incorrect.mp3')
      audio.play().catch(() => {})
    } catch {}
  }

  const flipCard = (id: string) => {
    if (locked || open.includes(id) || matched.includes(id)) return
    playPickupSound()

    if (open.length === 0) {
      setOpen([id])
      return
    }

    const first = cards.find((card) => card.id === open[0])!
    const second = cards.find((card) => card.id === id)!
    const nextOpen = [open[0], id]
    setOpen(nextOpen)

    if (first.type === second.type) {
      playCorrectSound()
      const nextMatched = [...matched, ...nextOpen]
      setMatched((current) => [...current, ...nextOpen])
      setOpen([])

      if (nextMatched.length === cards.length) {
        playSuccessSound()
        onComplete()
      }
      return
    }

    setLocked(true)
    setIsIncorrect(true)
    playIncorrectSound()
    window.setTimeout(() => {
      setOpen([])
      setIsIncorrect(false)
      setLocked(false)
    }, 1000)
  }

  return (
    <div className="zone-game-screen relative z-10 flex h-full max-h-full min-h-0 w-full flex-col gap-3 overflow-hidden p-2.5 sm:p-4 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-5 lg:p-4 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-6 xl:p-5">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes bounce-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-correct {
          animation: bounce-scale 0.4s ease-out;
        }
      `}</style>

      <aside className="hidden overflow-hidden rounded-[24px] border border-[#c4c9d4] bg-white p-4 shadow-[0_8px_24px_rgba(0,76,110,.12)] lg:flex lg:min-h-0 lg:flex-col">
        <button onClick={onSpeakGuide} className="flex min-h-11 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-4 py-2 font-vietnam text-sm font-bold text-white shadow-sm transition hover:bg-[#e89018] active:scale-95">
          <img src={zoneQuizAssets.speaker} alt="" className="size-6 brightness-0 invert select-none pointer-events-none" /> HƯỚNG DẪN CHƠI
        </button>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[#e5f2ff] p-3">
          {[
            ['1', 'Chọn 1 thẻ bài để lật', '/assets/memory-guide-2.png'],
            ['2', 'Chọn tiếp 1 thẻ khác', '/assets/memory-guide-2.png'],
            ['3', 'Chọn 2 hình giống nhau', '/assets/memory-guide-7.png'],
          ].map(([step, text, image], index) => (
            <div key={step} className="flex min-h-0 flex-1 flex-col gap-1">
              <p className="font-vietnam text-[12px] leading-4 text-[#37393e] flex items-center gap-1.5"><b className={`flex size-5 items-center justify-center rounded-full text-white text-[11px] shrink-0 ${index === 0 ? 'bg-[#0a7ad8]' : index === 1 ? 'bg-[#fea01f]' : 'bg-[#339e4a]'}`}>{step}</b>{text}</p>
              <div className={`relative min-h-0 flex-1 overflow-hidden rounded-lg bg-white ${index === 0 ? 'border border-[#7bc9ff]' : index === 1 ? 'border border-[#fea01f]' : 'border border-[#339e4a]'}`}><img src={image} alt="" className="absolute inset-0 h-full w-full object-contain p-1 select-none pointer-events-none" /></div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-full border-2 border-[#7bc9ff] px-4 py-2 text-center font-vietnam text-[13px] font-medium text-[#001e2f]">Hãy tìm hình ảnh giống nhau</p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-5 h-[110px] w-auto object-contain select-none pointer-events-none" />
      </aside>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col items-center justify-start gap-2 overflow-hidden">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 mb-1">
          <button onClick={onBack} className="min-h-10 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition hover:bg-[#fff0f2] active:scale-95 sm:px-5 sm:text-base">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill' }} className="inline-block whitespace-nowrap font-baloo text-[clamp(1.15rem,3.5vw,2.5rem)] font-bold leading-normal text-[#004c6e] py-1 px-2">TÌM CẶP GIỐNG NHAU</h1>
            <div className="rounded-full border-2 border-[#fea01f] bg-[#fef9ed] px-3 py-1 sm:px-4 sm:py-1 shadow-sm">
              <p className="rounded-full border border-dashed border-[#fea01f] px-3 py-0.5 font-baloo text-[clamp(.75rem,1.4vw,1.1rem)] font-bold text-[#fea01f]">Tìm 4 cặp có 2 hình giống nhau</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:text-base" aria-hidden="true">← Quay lại</div>
        </header>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center pb-3 sm:pb-5 pt-1 px-2 overflow-hidden">
          <div className="grid w-full max-w-[600px] sm:max-w-[680px] [@media(min-height:820px)]:max-w-[840px] max-h-full grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 [@media(min-height:820px)]:gap-4.5 rounded-[24px] bg-white p-2.5 sm:p-3.5 [@media(min-height:820px)]:p-5 shadow-2xl overflow-hidden justify-center items-center">
            {cards.map((card) => {
              const isOpen = open.includes(card.id)
              const isMatched = matched.includes(card.id)
              const visible = isOpen || isMatched
              const isWrong = isIncorrect && isOpen

              return (
                <button
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  aria-label={visible ? card.label : 'Thẻ đang úp'}
                  className={`relative aspect-[3/4] w-full max-w-[110px] sm:max-w-[125px] [@media(min-height:820px)]:max-w-[160px] max-h-[23vh] sm:max-h-[25vh] [@media(min-height:820px)]:max-h-[34vh] mx-auto overflow-hidden rounded-[14px] border-[3px] transition sm:rounded-[18px] [@media(min-height:820px)]:rounded-[20px] ${
                    isMatched
                      ? 'border-[#339e4a] bg-white animate-correct shadow-sm'
                      : isWrong
                      ? 'border-[#e83552] bg-white shadow-[0_0_0_2px_rgba(232,53,82,.15)] animate-shake'
                      : isOpen
                      ? 'border-[#0a7ad8] bg-white shadow-[0_0_0_2px_rgba(10,122,216,.15)]'
                      : 'border-white bg-[#82c8ff] hover:scale-[1.03] hover:shadow-md'
                  }`}
                >
                  <img
                    src={visible ? card.image : '/assets/memory-layer-2.png'}
                    alt={visible ? card.label : ''}
                    className="absolute inset-0 size-full object-cover select-none pointer-events-none rounded-[11px] sm:rounded-[15px] [@media(min-height:820px)]:rounded-[17px]"
                    draggable={false}
                  />
                  {isMatched && (
                    <span className="absolute right-1.5 top-1.5 z-20 flex size-5 [@media(min-height:820px)]:size-6 items-center justify-center rounded-full bg-[#339e4a] text-xs font-bold text-white shadow-md animate-bounce">
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="absolute right-1.5 top-1.5 z-20 flex size-5 [@media(min-height:820px)]:size-6 items-center justify-center rounded-full bg-[#e83552] text-xs font-bold text-white shadow-md">
                      ✗
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
