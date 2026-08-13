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
  { id: 'toothbrush', label: 'Bàn chải đánh răng', image: '/assets/clean-toothbrush.png' },
  { id: 'tissue', label: 'Giấy vệ sinh', image: '/assets/clean-tissue.png' },
  { id: 'towel', label: 'Khăn mặt', image: '/assets/clean-towel.png' },
  { id: 'soap', label: 'Xà phòng', image: '/assets/clean-soap.png' },
  { id: 'car', label: 'Xe đồ chơi', image: '/assets/clean-car.png' },
  { id: 'teddy', label: 'Gấu bông', image: '/assets/clean-teddy.png' },
] as const

const situations = [
  { id: 'hands', image: '/assets/clean-scene-1.png', answer: 'soap', label: 'Toro cần rửa tay' },
  { id: 'teeth', image: '/assets/clean-scene-2.png', answer: 'toothbrush', label: 'Toro cần đánh răng' },
  { id: 'face', image: '/assets/clean-scene-3.png', answer: 'towel', label: 'Toro cần lau mặt' },
  { id: 'toilet', image: '/assets/clean-scene-4.png', answer: 'tissue', label: 'Toro đi vệ sinh' },
] as const

export default function ZoneQuizCleanGameScreen({ gameChecked, onBack, onComplete, onSpeakGuide }: Props) {
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (!gameChecked) {
      setPlaced({})
      setSelected(null)
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

  const checkAutoFinish = (currentPlaced: Record<string, string>) => {
    if (Object.keys(currentPlaced).length === situations.length) {
      const allCorrect = situations.every((situation) => currentPlaced[situation.id] === situation.answer)
      if (allCorrect) {
        playCorrectSound()
      } else {
        playIncorrectSound()
      }
      onComplete()
    }
  }

  const usedItems = Object.values(placed)

  const chooseItem = (id: string) => {
    if (usedItems.includes(id)) return
    playPickupSound()
    setSelected((current) => (current === id ? null : id))
  }

  const putInto = (situationId: string, itemId: string) => {
    if (!items.some((item) => item.id === itemId)) return
    playDropSound()
    setPlaced((current) => {
      const next = { ...current }
      for (const key of Object.keys(next)) if (next[key] === itemId) delete next[key]
      next[situationId] = itemId
      checkAutoFinish(next)
      return next
    })
    setSelected(null)
  }

  const removeFrom = (situationId: string) => {
    playPickupSound()
    setPlaced((current) => {
      const next = { ...current }
      delete next[situationId]
      return next
    })
  }

  return (
    <div className="zone-game-screen relative z-10 flex min-h-full w-full flex-col gap-3 overflow-y-auto p-2.5 sm:p-4 lg:grid lg:h-full lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 lg:p-5 2xl:grid-cols-[300px_minmax(0,1fr)] 2xl:p-6">
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

      <aside className="hidden overflow-hidden rounded-[24px] border border-[#c4c9d4] bg-white p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,76,110,.12)] lg:flex lg:min-h-0 lg:flex-col lg:justify-between">
        <button onClick={onSpeakGuide} className="flex min-h-9 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-3 py-1.5 font-vietnam text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#e89018] active:scale-95"><img src={zoneQuizAssets.speaker} alt="" className="size-5 brightness-0 invert select-none pointer-events-none" /> HƯỚNG DẪN CHƠI</button>
        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5 rounded-xl bg-[#e5f2ff] p-2.5">
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#0a7ad8] text-[11px] text-white shrink-0">1</b>Chọn vật dụng</p>
          <div className="relative min-h-0 max-h-[50px] sm:max-h-[62px] flex-1 overflow-hidden rounded-lg border border-[#7bc9ff] bg-white"><img src="/assets/clean-soap.png" alt="" className="h-full w-full object-contain p-1" /></div>
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#fea01f] text-[11px] text-white shrink-0">2</b>Kéo thả vào ô bên phải</p>
          <div className="flex min-h-0 max-h-[50px] sm:max-h-[62px] flex-1 items-center gap-1.5 rounded-lg border border-[#fea01f] bg-white p-1"><img src="/assets/clean-soap.png" alt="" className="h-full min-w-0 flex-1 object-contain" /><span className="text-xl font-bold text-[#0a7ad8]">→</span><span className="h-[70%] min-w-0 flex-1 rounded-lg border-2 border-dashed border-[#7bc9ff]" /></div>
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#339e4a] text-[11px] text-white shrink-0">3</b>Hoàn thành 4 tình huống</p>
          <div className="grid min-h-0 max-h-[50px] sm:max-h-[62px] flex-1 grid-cols-2 gap-1 rounded-lg border border-[#339e4a] bg-white p-1.5">{Array.from({ length: 4 }).map((_, index) => <span key={index} className="rounded border-2 border-dashed border-[#7bc9ff]" />)}</div>
        </div>
        <p className="mt-2 rounded-[24px] border-2 border-[#7bc9ff] px-2.5 py-1 text-center font-vietnam text-[11px] sm:text-[12px] leading-4 text-[#001e2f]">Hãy tìm các vật dụng phù hợp giúp Toro trở nên sạch sẽ hơn nhé!</p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-3 h-[75px] sm:h-[85px] w-auto object-contain select-none pointer-events-none" />
      </aside>

      <section className="relative flex h-full max-h-full min-h-0 flex-1 flex-col items-center justify-between gap-2 overflow-hidden">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 mb-0.5">
          <button onClick={onBack} className="min-h-10 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition hover:bg-[#fff0f2] active:scale-95 sm:px-5 sm:text-base">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill' }} className="inline-block whitespace-nowrap font-baloo text-[clamp(1.15rem,3.2vw,2.3rem)] font-bold leading-normal text-[#0a7ad8] py-1 px-2">TORO SẠCH BONG</h1>
            <div className="rounded-full border-2 border-[#fdd444] bg-[#fef9ed] px-3 py-0.5 sm:px-4 sm:py-1 shadow-sm">
              <p className="rounded-full border border-dashed border-[#895026] px-3 py-0.5 font-baloo text-[clamp(.75rem,1.3vw,1.05rem)] font-bold text-[#fea01f]">Tìm vật dụng giúp Toro sạch sẽ hơn</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:text-base" aria-hidden="true">← Quay lại</div>
        </header>

        <div className="grid w-full max-w-[980px] min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3 sm:gap-4 rounded-[24px] bg-white p-3 sm:p-4 shadow-xl overflow-hidden">
          {situations.map((situation, index) => {
            const itemId = placed[situation.id]
            const item = items.find((entry) => entry.id === itemId)
            const showResults = Object.keys(placed).length === situations.length
            const isCorrect = itemId === situation.answer

            return (
              <div 
                key={situation.id} 
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  const droppedId = event.dataTransfer.getData('text/plain')
                  if (droppedId) putInto(situation.id, droppedId)
                }}
                className="flex h-full min-h-0 w-full items-center justify-between gap-2.5 sm:gap-3 rounded-[20px] bg-[#fef9ed] border-2 border-[#f0f6ff] p-2 sm:p-2.5 shadow-sm overflow-hidden"
              >
                {/* Situation Image (Left side) */}
                <div className="relative h-full aspect-[4/3] shrink-0 overflow-hidden rounded-[16px] shadow-sm">
                  <img src={situation.image} alt={situation.label} className="h-full w-full object-cover select-none pointer-events-none" />
                  <span className="absolute left-2 top-2 z-10 flex size-6.5 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#0a7ad8] font-baloo text-xs font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                </div>

                {/* Target Drop Box (Right side - Matching Image 2 reference pixel-for-pixel!) */}
                <button
                  onClick={() => (item ? removeFrom(situation.id) : selected && putInto(situation.id, selected))}
                  className={`relative flex-1 h-full min-w-0 aspect-[4/3] sm:aspect-square overflow-hidden rounded-[18px] border-4 transition flex items-center justify-center p-2 ${
                    showResults
                      ? isCorrect
                        ? 'border-[#339e4a] bg-green-50/90 shadow-md'
                        : 'border-[#e83552] bg-red-50/90 animate-shake shadow-md'
                      : item
                      ? 'border-[#0a7ad8] bg-white shadow-md'
                      : 'border-dashed border-[#64b3e8] bg-transparent hover:border-[#0a7ad8] hover:bg-white/50'
                  }`}
                >
                  {item && (
                    <img src={item.image} alt={item.label} className="size-full object-contain p-1 select-none pointer-events-none" />
                  )}

                  {showResults && (
                    isCorrect ? (
                      <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#339e4a] text-xs font-bold text-white shadow-md animate-bounce z-20">
                        ✓
                      </span>
                    ) : (
                      <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#e83552] text-xs font-bold text-white shadow-md z-20">
                        ✗
                      </span>
                    )
                  )}
                </button>
              </div>
            )
          })}
        </div>

        <div className="grid w-full max-w-[980px] shrink-0 grid-cols-6 gap-2 sm:gap-2.5 rounded-[18px] border border-[#c4c9d4] bg-[#e5f2ff] p-2 sm:p-2.5 shadow-md">
          {items.map((item) => {
            const used = usedItems.includes(item.id)
            const active = selected === item.id
            const showResults = Object.keys(placed).length === situations.length
            return (
              <button
                key={item.id}
                draggable={!used && !showResults}
                onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)}
                onClick={() => chooseItem(item.id)}
                aria-pressed={active}
                disabled={showResults}
                className={`overflow-hidden rounded-xl border-2 bg-white py-1 transition flex flex-col items-center justify-center ${
                  active ? 'border-[#fea01f] -translate-y-1 shadow-md' : 'border-transparent hover:border-[#7bc9ff]'
                } ${used ? 'opacity-35' : ''}`}
              >
                <img src={item.image} alt={item.label} className="mx-auto h-[44px] sm:h-[54px] w-full object-contain p-0.5" />
                <span className="font-baloo text-[10px] font-bold text-[#004c6e] sm:text-[11px] truncate max-w-full px-1">{item.label}</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
