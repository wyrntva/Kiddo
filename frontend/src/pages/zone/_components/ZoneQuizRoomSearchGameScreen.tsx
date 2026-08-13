import { useEffect, useState } from 'react'
import { zoneQuizAssets } from '../quizData'
import { playPickupSound, playSuccessSound } from './soundEffects'

interface Props {
  gameChecked: boolean
  onBack: () => void
  onComplete: () => void
  onSpeakGuide: () => void
}

const objects = [
  { id: 'doll', image: '/assets/room-doll.png', label: 'Búp bê', x: 17.75, y: 61.7, w: 6.5, h: 8.5 },
  { id: 'rings', image: '/assets/room-rings.png', label: 'Tháp vòng', x: 41.6, y: 81.2, w: 6.0, h: 7.9 },
  { id: 'plane', image: '/assets/room-plane.png', label: 'Máy bay', x: 69.6, y: 37.85, w: 6.8, h: 5.8 },
  { id: 'horse', image: '/assets/room-horse.png', label: 'Ngựa gỗ', x: 53.25, y: 52.2, w: 7.4, h: 8.55 },
  { id: 'bunny', image: '/assets/room-bunny.png', label: 'Thỏ bông', x: 38.6, y: 37.7, w: 5.2, h: 6.65 },
  { id: 'truck', image: '/assets/room-truck.png', label: 'Xe cứu hỏa', x: 23.7, y: 18.85, w: 8.65, h: 7.25 },
  { id: 'drum', image: '/assets/room-drum.png', label: 'Trống', x: 81.18, y: 69.9, w: 7.9, h: 9.7 },
  { id: 'tea', image: '/assets/room-tea.png', label: 'Bộ ấm trà', x: 69.2, y: 47.2, w: 7.9, h: 7.9 },
  { id: 'xylophone', image: '/assets/room-xylophone.png', label: 'Đàn đồ chơi', x: 38.6, y: 32.2, w: 8.1, h: 5.8 },
  { id: 'blocks', image: '/assets/room-blocks.png', label: 'Khối xếp hình', x: 4.1, y: 63.4, w: 6.5, h: 8.0 },
] as const

export default function ZoneQuizRoomSearchGameScreen({ gameChecked, onBack, onComplete, onSpeakGuide }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [found, setFound] = useState<string[]>([])
  const [wrongId, setWrongId] = useState<string | null>(null)

  useEffect(() => {
    if (!gameChecked) {
      setSelected(null)
      setFound([])
      setWrongId(null)
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

  const checkAutoFinish = (currentFound: string[]) => {
    if (currentFound.length === objects.length) {
      playSuccessSound()
      onComplete()
    }
  }

  const choose = (id: string) => {
    if (found.includes(id)) return
    playPickupSound()
    setSelected(id)
  }

  const discover = (id: string) => {
    if (found.includes(id)) return
    if (selected && selected !== id) {
      playIncorrectSound()
      setWrongId(id)
      setTimeout(() => setWrongId(null), 1000)
      return
    }
    playCorrectSound()
    setFound((current) => {
      const next = [...current, id]
      checkAutoFinish(next)
      return next
    })
    setSelected(null)
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
        @keyframes bounce-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-correct {
          animation: bounce-scale 0.4s ease-out;
        }
      `}</style>

      <aside className="hidden overflow-hidden rounded-[24px] border border-[#c4c9d4] bg-white p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(0,76,110,.12)] lg:flex lg:min-h-0 lg:flex-col lg:justify-between">
        <button onClick={onSpeakGuide} className="flex min-h-9 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-3 py-1.5 font-vietnam text-xs sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#e89018] active:scale-95"><img src={zoneQuizAssets.speaker} alt="" className="size-5 brightness-0 invert select-none pointer-events-none" /> HƯỚNG DẪN CHƠI</button>
        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1 rounded-xl bg-[#e5f2ff] p-2">
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#0a7ad8] text-[11px] text-white shrink-0">1</b>Tìm kiếm đồ vật</p>
          <div className="min-h-0 max-h-[46px] sm:max-h-[56px] flex-1 overflow-hidden rounded-lg border border-[#0a7ad8] bg-[#fff4df]"><img src="/assets/room-guide-2.png" alt="" className="h-full w-full object-contain p-0.5" /></div>
          <span className="-my-1 text-center text-lg font-bold leading-none text-[#0a7ad8]">↓</span>
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#fea01f] text-[11px] text-white shrink-0">2</b>Chọn đồ vật tương tự</p>
          <div className="min-h-0 max-h-[46px] sm:max-h-[56px] flex-1 overflow-hidden rounded-lg border border-[#fea01f] bg-[#fff4df]"><img src="/assets/room-guide-5.png" alt="" className="h-full w-full object-contain p-0.5" /></div>
          <span className="-my-1 text-center text-lg font-bold leading-none text-[#0a7ad8]">↓</span>
          <p className="font-vietnam text-xs text-[#37393e] flex items-center gap-1.5"><b className="flex size-5 items-center justify-center rounded-full bg-[#339e4a] text-[11px] text-white shrink-0">3</b>Hoàn thành tìm 9 đồ vật</p>
          <div className="min-h-0 max-h-[46px] sm:max-h-[56px] flex-1 overflow-hidden rounded-lg border border-[#339e4a] bg-[#fff4df]"><img src="/assets/room-guide-6.png" alt="" className="h-full w-full object-contain p-0.5" /></div>
        </div>
        <p className="mt-2 rounded-[24px] border-2 border-[#7bc9ff] px-2.5 py-1 text-center font-vietnam text-[11px] sm:text-[12px] leading-4 text-[#001e2f]">Hãy tìm các vật dụng theo yêu cầu, giúp Toro dọn phòng thật ngăn nắp nhé!</p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-3 h-[75px] sm:h-[85px] w-auto object-contain select-none pointer-events-none" />
      </aside>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col items-center justify-start gap-2.5 sm:gap-3.5 overflow-y-auto">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 mb-1 sm:mb-2">
          <button onClick={onBack} className="min-h-10 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition hover:bg-[#fff0f2] active:scale-95 sm:px-5 sm:text-base">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill' }} className="inline-block whitespace-nowrap font-baloo text-[clamp(1.15rem,3.5vw,2.5rem)] font-bold leading-normal text-[#0a7ad8] py-1 px-2">PHÒNG XINH GỌN GÀNG</h1>
            <div className="rounded-full border-2 border-[#fdd444] bg-[#fef9ed] px-3 py-1 sm:px-4 sm:py-1 shadow-sm">
              <p className="rounded-full border border-dashed border-[#895026] px-3 py-0.5 font-baloo text-[clamp(.75rem,1.4vw,1.05rem)] font-bold text-[#fea01f]">Tìm đồ vật giúp Toro dọn phòng ngăn nắp</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:text-base" aria-hidden="true">← Quay lại</div>
        </header>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center py-1">
          <div 
            className="relative aspect-[1248/864] max-h-[40vh] sm:max-h-[42vh] [@media(min-height:820px)]:max-h-[50vh] max-w-full overflow-hidden rounded-[20px] border-4 sm:border-[8px] border-white bg-white shadow-xl"
          >
            <img src="/assets/room-scene.png" alt="Căn phòng của Toro" className="h-full w-full object-fill select-none pointer-events-none" />
            {objects.map((item) => {
              const isFound = found.includes(item.id)
              const isSelected = selected === item.id
              const isWrong = wrongId === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => discover(item.id)}
                  aria-label={`Tìm ${item.label}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.w}%`, height: `${item.h}%` }}
                  className={`absolute rounded-full transition-all ${
                    isFound
                      ? 'border-2 border-[#339e4a] bg-[#339e4a]/15 shadow-[0_0_8px_rgba(51,158,74,0.4)] pointer-events-none animate-correct'
                      : isWrong
                      ? 'border-2 border-[#e83552] bg-[#e83552]/20 animate-shake'
                      : isSelected
                      ? 'border-2 animate-pulse border-[#fea01f] bg-[#fea01f]/20 ring-2 ring-[#fea01f]/40'
                      : 'border-2 border-transparent cursor-pointer'
                  }`}
                >
                  {isFound && (
                    <span className="absolute -top-1 -right-1 flex size-3.5 sm:size-4 items-center justify-center rounded-full bg-[#339e4a] text-[9px] sm:text-[10px] font-bold text-white shadow-sm animate-bounce z-20 border border-white">
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="absolute -top-1 -right-1 flex size-3.5 sm:size-4 items-center justify-center rounded-full bg-[#e83552] text-[9px] sm:text-[10px] font-bold text-white shadow-sm z-20 border border-white">
                      ✗
                    </span>
                  )}
                </button>
              )
            })}
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-baloo font-bold text-[#004c6e] shadow-md border border-[#c4c9d4] text-xs sm:text-sm">Đã tìm: {found.length}/10</span>
          </div>
        </div>

        {/* Bottom Item Selector Bar (Slim & compact on 125% scale) */}
        <div className="grid w-full max-w-[740px] sm:max-w-[780px] [@media(min-height:820px)]:max-w-[860px] shrink-0 grid-cols-5 gap-1.5 sm:gap-2 rounded-[16px] sm:rounded-[18px] border border-[#c4c9d4] bg-[#e5f2ff] p-1.5 sm:p-2 shadow-md sm:grid-cols-10 mb-1">
          {objects.map((item) => {
            const done = found.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => choose(item.id)}
                disabled={done}
                title={item.label}
                className={`relative flex aspect-square w-full items-center justify-center rounded-[10px] sm:rounded-[12px] border-2 bg-white p-[2px] sm:p-1 transition ${
                  done
                    ? 'border-[#339e4a] bg-green-50 opacity-80'
                    : selected === item.id
                    ? 'border-[#0a7ad8] ring-2 ring-[#0a7ad8]/40 scale-105 shadow-md'
                    : 'border-[#d0d7de] hover:border-[#0a7ad8] hover:scale-105 shadow-sm'
                }`}
              >
                <img src={item.image} alt={item.label} className="size-full object-contain p-0.5 scale-105 select-none pointer-events-none" />
                {done && (
                  <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-[#339e4a] text-[10px] sm:text-xs font-bold text-white shadow-md z-20 border border-white">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
