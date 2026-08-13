import { useEffect, useState } from 'react'
import { zoneQuizAssets } from '../quizData'
import { playDropSound, playPickupSound } from './soundEffects'

interface Props {
  gameChecked: boolean
  onBack: () => void
  onComplete: () => void
  onSpeakGuide: () => void
}

const items = [
  { id: 'robot', image: '/assets/school-robot.png', label: 'Robot', correct: false },
  { id: 'notebook', image: '/assets/school-notebook.png', label: 'Vở', correct: false },
  { id: 'pencil-case', image: '/assets/school-pencil-case.png', label: 'Hộp bút', correct: true },
  { id: 'pencil', image: '/assets/school-pencil.png', label: 'Bút chì', correct: true },
  { id: 'ball', image: '/assets/school-ball.png', label: 'Quả bóng', correct: false },
  { id: 'teddy', image: '/assets/school-teddy.png', label: 'Gấu bông', correct: false },
  { id: 'book', image: '/assets/school-book.png', label: 'Sách', correct: true },
  { id: 'shorts', image: '/assets/school-shorts.png', label: 'Quần', correct: true },
  { id: 'bottle', image: '/assets/school-bottle.png', label: 'Bình nước', correct: true },
  { id: 'shirt', image: '/assets/school-shirt.png', label: 'Áo', correct: true },
] as const

const shuffleArray = <T,>(array: readonly T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function ZoneQuizBackpackGameScreen({ gameChecked, onBack, onComplete, onSpeakGuide }: Props) {
  const [packed, setPacked] = useState<string[]>([])
  const [shuffledItems, setShuffledItems] = useState<typeof items[number][]>(() => shuffleArray(items))

  useEffect(() => {
    if (!gameChecked) {
      setPacked([])
      setShuffledItems(shuffleArray(items))
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

  const checkAutoFinish = (currentPacked: string[]) => {
    if (currentPacked.length === 6) {
      const allCorrect = currentPacked.every((id) => items.find((item) => item.id === id)?.correct)
      if (allCorrect) {
        playCorrectSound()
      } else {
        playIncorrectSound()
      }
      onComplete()
    }
  }

  const toggleItem = (id: string) => {
    setPacked((current) => {
      const isRemoving = current.includes(id)
      if (isRemoving) {
        playPickupSound()
        return current.filter((item) => item !== id)
      } else {
        if (current.length >= 6) return current

        playPickupSound()
        const next = [...current, id]
        checkAutoFinish(next)
        return next
      }
    })
  }

  const dropIntoBag = (event: React.DragEvent) => {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/plain')
    if (id && !packed.includes(id) && packed.length < 6) {
      playDropSound()
      setPacked((current) => {
        const next = [...current, id]
        checkAutoFinish(next)
        return next
      })
    }
  }

  return (
    <div className="zone-game-screen relative z-10 flex min-h-full w-full flex-col gap-3 overflow-y-auto p-2.5 sm:p-4 lg:grid lg:h-full lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-5 lg:p-4 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-6 xl:p-6">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      {/* Left Instruction Sidebar */}
      <aside className="hidden overflow-hidden rounded-[24px] border border-[#c4c9d4] bg-white p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,76,110,.12)] lg:flex lg:min-h-0 lg:flex-col lg:justify-between">
        <button onClick={onSpeakGuide} className="flex min-h-9 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-3 py-1.5 font-vietnam text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#e89018] active:scale-95">
          <img src={zoneQuizAssets.speaker} alt="" className="size-5 brightness-0 invert select-none pointer-events-none" /> HƯỚNG DẪN CHƠI
        </button>
        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[#e5f2ff] p-2.5">
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#0a7ad8] text-[11px] text-white shrink-0">1</b>Chọn 1 đồ vật</p>
          <div className="relative min-h-0 max-h-[75px] sm:max-h-[90px] flex-1 overflow-hidden rounded-lg border border-[#0a7ad8] bg-white flex items-center justify-center p-1.5"><img src="/assets/school-notebook.png" alt="" className="h-full w-full object-contain select-none pointer-events-none" /></div>
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#fea01f] text-[11px] text-white shrink-0">2</b>Di chuyển vào balo</p>
          <div className="relative min-h-0 max-h-[75px] sm:max-h-[90px] flex-1 overflow-hidden rounded-lg border border-[#fea01f] bg-white flex items-center justify-center p-1.5"><img src="/assets/backpack.png" alt="" className="h-full w-full object-contain select-none pointer-events-none" /></div>
        </div>
        <p className="mt-2 rounded-full border-2 border-[#7bc9ff] px-3 py-1 text-center font-vietnam text-[11px] sm:text-[12px] font-medium text-[#001e2f]">Hãy kéo đồ dùng cần thiết vào balo nhé!</p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-3 h-[75px] sm:h-[85px] w-auto object-contain select-none pointer-events-none" />
      </aside>

      {/* Main Game Section */}
      <section className="relative flex h-full max-h-full min-h-0 flex-1 flex-col items-center justify-between gap-2 overflow-hidden">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 mb-0.5">
          <button onClick={onBack} className="min-h-10 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition hover:bg-[#fff0f2] active:scale-95 sm:px-5 sm:text-base">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill' }} className="inline-block whitespace-nowrap font-baloo text-[clamp(1.15rem,3.2vw,2.3rem)] font-bold leading-normal text-[#004c6e] py-1 px-2">XẾP BALO CHO TORO</h1>
            <div className="flex items-center justify-center rounded-[1000px] border-3 sm:border-4 border-[#fdd444] bg-[#fef9ed] px-3 py-1 sm:px-4 sm:py-1.5 shadow-sm">
              <p className="whitespace-nowrap rounded-[100px] border-2 border-dashed border-[#895026] px-3 py-0.5 font-baloo text-[clamp(.75rem,1.3vw,1.15rem)] font-bold text-[#fea01f]">Chuẩn bị 6 món đồ đi học cho Toro</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:text-base" aria-hidden="true">← Quay lại</div>
        </header>

        {/* Room Scene Stage (Aspect ratio locked to 16/9 for precision across display scales) */}
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={dropIntoBag}
          className="relative aspect-[16/9] w-full max-w-[820px] max-h-[40vh] sm:max-h-[42vh] shrink-0 overflow-hidden rounded-[20px] border-4 sm:border-[8px] border-white bg-white shadow-xl lg:max-w-[840px]"
        >
          <img src="/assets/backpack-scene-overlay.png" alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none" />
          <img 
            src="/assets/backpack.png" 
            alt="Balo của Toro" 
            className="absolute drop-shadow-2xl pointer-events-none select-none object-contain transition-all" 
            style={{ left: '46.5%', top: '3.0%', width: '36.0%', height: '94.0%' }}
          />

          {/* Locked Grid for Items inside Enlarged Backpack */}
          <div 
            className="absolute grid grid-cols-3 grid-rows-2 items-center justify-items-center gap-1.5 p-0.5 z-20"
            style={{ left: '56.4%', top: '31.0%', width: '15.6%', height: '35.0%' }}
          >
            {packed.map((id) => {
              const item = items.find((entry) => entry.id === id)!
              const isCorrect = item.correct
              const showResults = packed.length === 6
              return (
                <button
                  key={id}
                  onClick={() => toggleItem(id)}
                  title={`Bỏ ${item.label} ra`}
                  className={`relative flex aspect-square w-full h-full items-center justify-center bg-transparent transition hover:scale-125 hover:z-30 ${
                    showResults && !isCorrect ? 'animate-shake' : ''
                  }`}
                >
                  <img src={item.image} alt={item.label} className="size-full object-contain pointer-events-none select-none drop-shadow-xl scale-[1.85] p-0.5" />
                  {showResults && (
                    isCorrect ? (
                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#339e4a] text-xs font-bold text-white shadow-md animate-bounce z-40">
                        ✓
                      </span>
                    ) : (
                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#e83552] text-xs font-bold text-white shadow-md z-40">
                        ✗
                      </span>
                    )
                  )}
                </button>
              )
            })}
          </div>

          <div className="absolute left-3 top-3 z-30 rounded-full bg-white/95 px-3 py-1 font-vietnam text-xs font-bold text-[#004c6e] shadow-md border border-[#c4c9d4]">
            Đã xếp: {packed.length}/6
          </div>
        </div>

        {/* Bottom Item Selector Bar */}
        <div className="grid w-full max-w-[840px] shrink-0 grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2 rounded-[18px] border border-[#c4c9d4] bg-[#e5f2ff] p-1.5 sm:p-2 shadow-md">
          {shuffledItems.map((item) => {
            const active = packed.includes(item.id)
            return (
              <button
                key={item.id}
                draggable={!active}
                onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
                onClick={() => toggleItem(item.id)}
                disabled={(!active && packed.length >= 6) || packed.length === 6}
                aria-pressed={active}
                title={item.label}
                className={`relative flex aspect-square items-center justify-center rounded-xl border-2 transition hover:-translate-y-0.5 disabled:cursor-not-allowed ${
                  active
                    ? 'border-dashed border-gray-300 bg-white/40 opacity-30'
                    : 'border-white bg-white shadow-sm hover:border-[#7bc9ff] active:scale-95'
                }`}
              >
                {!active && (
                  <img src={item.image} alt={item.label} className="size-full object-contain p-1 pointer-events-none select-none" />
                )}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
