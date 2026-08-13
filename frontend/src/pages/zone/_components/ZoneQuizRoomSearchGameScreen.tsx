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
  { id: 'doll', image: '/assets/room-doll.png', label: 'Búp bê', x: 17.5, y: 58.0, w: 9.0, h: 12.0 },
  { id: 'rings', image: '/assets/room-rings.png', label: 'Tháp vòng', x: 40.0, y: 74.0, w: 9.0, h: 12.0 },
  { id: 'plane', image: '/assets/room-plane.png', label: 'Máy bay', x: 66.5, y: 35.0, w: 10.0, h: 9.0 },
  { id: 'horse', image: '/assets/room-horse.png', label: 'Ngựa gỗ', x: 51.5, y: 48.0, w: 10.0, h: 12.0 },
  { id: 'bunny', image: '/assets/room-bunny.png', label: 'Thỏ bông', x: 36.5, y: 34.0, w: 10.0, h: 12.0 },
  { id: 'truck', image: '/assets/room-truck.png', label: 'Xe cứu hỏa', x: 23.5, y: 17.0, w: 10.0, h: 9.0 },
  { id: 'drum', image: '/assets/room-drum.png', label: 'Trống', x: 77.5, y: 63.0, w: 10.0, h: 12.0 },
  { id: 'tea', image: '/assets/room-tea.png', label: 'Bộ ấm trà', x: 65.5, y: 43.0, w: 11.0, h: 11.0 },
  { id: 'xylophone', image: '/assets/room-xylophone.png', label: 'Đàn đồ chơi', x: 37.5, y: 30.5, w: 11.0, h: 8.0 },
  { id: 'blocks', image: '/assets/room-blocks.png', label: 'Khối xếp hình', x: 4.5, y: 57.5, w: 7.0, h: 12.0 },
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

      <aside className="hidden overflow-hidden rounded-[24px] border border-[#c4c9d4] bg-white p-4 shadow-[0_8px_24px_rgba(0,76,110,.12)] lg:flex lg:min-h-0 lg:flex-col">
        <button onClick={onSpeakGuide} className="flex min-h-11 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-4 py-2 font-vietnam text-sm font-bold text-white"><img src={zoneQuizAssets.speaker} alt="" className="size-6 brightness-0 invert" /> HƯỚNG DẪN CHƠI</button>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-[#e5f2ff] p-3">
          <p className="font-vietnam text-xs"><b className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-[#0a7ad8] text-white">1</b>Tìm kiếm đồ vật</p>
          <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#0a7ad8] bg-[#fff4df]"><img src="/assets/room-guide-2.png" alt="Minh họa dùng kính lúp tìm đồ vật" className="h-full w-full object-cover" /></div>
          <span className="-my-1 text-center text-2xl font-bold leading-none text-[#0a7ad8]">↓</span>
          <p className="font-vietnam text-xs"><b className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-[#fea01f] text-white">2</b>Chọn đồ vật tương tự</p>
          <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#fea01f] bg-[#fff4df]"><img src="/assets/room-guide-5.png" alt="Minh họa chọn gấu bông tương tự" className="h-full w-full object-cover" /></div>
          <span className="-my-1 text-center text-2xl font-bold leading-none text-[#0a7ad8]">↓</span>
          <p className="font-vietnam text-xs leading-4"><b className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-[#339e4a] text-white">3</b>Hoàn thành tìm kiếm 9 đồ vật theo yêu cầu</p>
          <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#339e4a] bg-[#fff4df]"><img src="/assets/room-guide-6.png" alt="Bảng tiến độ tìm đồ vật" className="h-full w-full object-cover" /></div>
        </div>
        <p className="mt-3 rounded-[24px] border-2 border-[#7bc9ff] px-3 py-2 text-center font-vietnam text-[12px] leading-4">Hãy tìm các vật dụng theo yêu cầu, giúp Toro dọn phòng thật ngăn nắp nhé!</p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-5 h-[110px] w-auto object-contain" />
      </aside>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col items-center justify-start gap-2.5 sm:gap-3.5 overflow-y-auto">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 mb-1 sm:mb-2">
          <button onClick={onBack} className="min-h-10 rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition hover:bg-[#fff0f2] active:scale-95 sm:px-5 sm:text-base">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '4px white', paintOrder: 'stroke fill' }} className="whitespace-nowrap font-baloo text-[clamp(1.15rem,3.5vw,2.5rem)] font-bold leading-tight text-[#0a7ad8]">PHÒNG XINH GỌN GÀNG</h1>
            <div className="rounded-full border-2 border-[#fdd444] bg-[#fef9ed] px-3 py-1 sm:px-4 sm:py-1 shadow-sm">
              <p className="rounded-full border border-dashed border-[#895026] px-3 py-0.5 font-baloo text-[clamp(.75rem,1.4vw,1.05rem)] font-bold text-[#fea01f]">Tìm đồ vật giúp Toro dọn phòng ngăn nắp</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:text-base" aria-hidden="true">← Quay lại</div>
        </header>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center py-0.5">
          <div 
            className="relative aspect-[1248/864] max-h-[46vh] max-w-full overflow-hidden rounded-[20px] border-4 sm:border-[8px] border-white bg-white shadow-xl"
          >
            <img src="/assets/room-scene.png" alt="Căn phòng của Toro" className="h-full w-full object-cover select-none pointer-events-none" />
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
                  className={`absolute rounded-full transition ${
                    isFound
                      ? 'border-transparent animate-correct'
                      : isWrong
                      ? 'border-2 border-[#e83552] bg-[#e83552]/20 animate-shake'
                      : isSelected
                      ? 'border-2 animate-pulse border-[#fea01f]/70 bg-[#fea01f]/10'
                      : 'border-2 border-transparent'
                  }`}
                >
                  {isFound && (
                    <span className="absolute inset-0 m-auto flex size-6 items-center justify-center rounded-full bg-[#339e4a] font-bold text-white shadow-md animate-bounce">
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="absolute inset-0 m-auto flex size-6 items-center justify-center rounded-full bg-[#e83552] font-bold text-white shadow-md">
                      ✗
                    </span>
                  )}
                </button>
              )
            })}
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-baloo font-bold text-[#004c6e] shadow-md border border-[#c4c9d4] text-xs sm:text-sm">Đã tìm: {found.length}/10</span>
          </div>
        </div>

        <div className="grid w-full max-w-[980px] shrink-0 grid-cols-5 gap-1.5 rounded-[18px] border border-[#c4c9d4] bg-[#e5f2ff] p-2 shadow-md sm:grid-cols-10 sm:gap-2 sm:p-2.5">
          {objects.map((item) => {
            const done = found.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => choose(item.id)}
                disabled={done}
                title={item.label}
                className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 bg-white transition ${
                  selected === item.id ? '-translate-y-1 border-[#fea01f] shadow-md' : 'border-white shadow-sm'
                } ${done ? 'opacity-35' : 'hover:-translate-y-0.5 hover:border-[#7bc9ff]'}`}
              >
                <img src={item.image} alt={item.label} className="size-full object-contain p-1 pointer-events-none select-none" />
                {done && (
                  <span className="absolute right-1 top-1 flex size-4.5 items-center justify-center rounded-full bg-[#339e4a] text-[10px] font-bold text-white shadow">
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
