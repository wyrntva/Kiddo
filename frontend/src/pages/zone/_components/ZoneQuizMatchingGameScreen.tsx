import { useEffect, useMemo, useState } from 'react'
import { zoneQuizAssets } from '../quizData'
import { playPickupSound, playSuccessSound } from './soundEffects'

interface Props {
  gameChecked: boolean
  onBack: () => void
  onComplete: () => void
  onSpeakGuide: () => void
}

const emotions = [
  { type: 'happy', image: '/assets/emotion-match-happy.png', alt: 'Toro vui' },
  { type: 'sad', image: '/assets/emotion-match-sad.png', alt: 'Toro buồn' },
  { type: 'angry', image: '/assets/emotion-match-angry.png', alt: 'Toro tức giận' },
  { type: 'crying', image: '/assets/emotion-match-crying.png', alt: 'Toro khóc' },
] as const

export default function ZoneQuizMatchingGameScreen({ gameChecked, onBack, onComplete, onSpeakGuide }: Props) {
  const cards = useMemo(
    () => [emotions[0], emotions[1], emotions[2], emotions[3], emotions[2], emotions[0], emotions[1], emotions[3]]
      .map((emotion, index) => ({ ...emotion, id: `${emotion.type}-${index}` })),
    [],
  )
  const [selected, setSelected] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [locked, setLocked] = useState(false)
  const [isIncorrect, setIsIncorrect] = useState(false)

  useEffect(() => {
    if (!gameChecked) {
      setSelected([])
      setMatched([])
      setLocked(false)
      setIsIncorrect(false)
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

  const chooseCard = (id: string) => {
    if (locked || matched.includes(id)) return
    playPickupSound()

    if (selected.includes(id)) {
      setSelected((current) => current.filter((item) => item !== id))
      return
    }

    if (selected.length === 0) {
      setSelected([id])
    } else {
      const firstId = selected[0]
      const firstCard = cards.find((c) => c.id === firstId)!
      const secondCard = cards.find((c) => c.id === id)!

      setSelected([firstId, id])

      if (firstCard.type === secondCard.type) {
        playCorrectSound()
        const nextMatched = [...matched, firstId, id]
        setMatched(nextMatched)
        setSelected([])

        if (nextMatched.length === cards.length) {
          playSuccessSound()
          onComplete()
        }
      } else {
        setLocked(true)
        setIsIncorrect(true)
        playIncorrectSound()
        setTimeout(() => {
          setSelected([])
          setIsIncorrect(false)
          setLocked(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="zone-game-screen relative z-10 flex min-h-full w-full flex-col items-stretch justify-start gap-3 overflow-y-auto p-2.5 sm:p-4 lg:grid lg:h-full lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 lg:p-5 2xl:grid-cols-[300px_minmax(0,1fr)] 2xl:p-6">
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

      <aside className="hidden overflow-hidden rounded-[20px] border border-[#c4c9d4] bg-white p-3 shadow-[0_8px_24px_rgba(0,76,110,0.12)] lg:flex lg:min-h-0 lg:flex-col lg:rounded-[24px] lg:p-5">
        <button onClick={onSpeakGuide} className="flex min-h-11 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-4 py-2 font-vietnam text-[14px] font-bold text-white">
          <img src={zoneQuizAssets.speaker} alt="" className="size-6 brightness-0 invert" />
          HƯỚNG DẪN CHƠI
        </button>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 rounded-[12px] bg-[#e5f2ff] p-3">
          {[['1', 'Chọn hình bất kỳ', emotions[0]], ['2', 'Chọn hình thứ 2 giống hình đã chọn', emotions[1]], ['3', 'Nếu đúng, hai hình sẽ được ghép', emotions[1]]].map(([step, text, emotion], index) => (
            <div key={String(step)} className="flex min-h-0 flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${index === 0 ? 'bg-[#0a7ad8]' : index === 1 ? 'bg-[#fea01f]' : 'bg-[#339e4a]'}`}>{String(step)}</span>
                <span className="font-vietnam text-[12px] leading-4 text-[#37393e]">{String(text)}</span>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-[#7bc9ff] bg-white">
                <img src={(emotion as typeof emotions[number]).image} alt="" className="absolute left-1/2 top-1/2 h-[215%] w-[455%] max-w-none -translate-x-1/2 -translate-y-[43%] object-contain" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-[24px] border-2 border-[#7bc9ff] bg-white px-3 py-2 text-center font-vietnam text-[13px] leading-5 text-[#001e2f]">
          Hãy tìm các cặp hình giống nhau nhé!
        </p>
        <img src={zoneQuizAssets.wavingMascot} alt="" className="mx-auto -mb-5 mt-1 h-[120px] w-auto object-contain" />
      </aside>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col items-center gap-3 lg:gap-5">
        <header className="relative z-30 grid w-full shrink-0 grid-cols-[auto_1fr_auto] items-start gap-2 pb-1">
          <button onClick={onBack} className="z-10 flex min-h-10 items-center rounded-[40px] border-2 border-[#e83552] bg-white px-3 py-1.5 font-baloo text-[13px] font-bold text-[#e83552] shadow-sm transition active:scale-95 sm:px-5 sm:py-2 sm:text-[16px]">← Quay lại</button>
          <div className="flex min-w-0 flex-col items-center gap-1 text-center">
            <h1 style={{ WebkitTextStroke: '5px white', paintOrder: 'stroke fill' }} className="whitespace-nowrap font-baloo text-[clamp(1.15rem,4vw,2.625rem)] font-bold leading-tight text-[#fea01f]">TÌM HÌNH GIỐNG NHAU</h1>
            <div className="rounded-[1000px] border-2 border-[#339e4a] bg-[#f2fbef] p-1">
              <p className="rounded-[100px] border border-dashed border-[#02522b] px-3 py-1 font-baloo text-[clamp(0.75rem,2vw,1.15rem)] font-bold text-[#418457] sm:px-5">Tìm các cặp hình giống nhau nhé</p>
            </div>
          </div>
          <div className="invisible min-h-10 px-3 py-1.5 sm:px-5 sm:py-2 font-baloo text-[13px] sm:text-[16px]" aria-hidden="true">← Quay lại</div>
        </header>

        <div className="w-full rounded-[16px] bg-white/90 p-2 text-center font-vietnam text-[12px] text-[#37393e] shadow-sm lg:hidden">
          Chọn các cặp hình giống nhau.
        </div>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center pt-1 lg:pt-2">
          <div className="zone-game-board grid w-full max-w-[780px] grid-cols-2 gap-2 rounded-[20px] bg-white p-2.5 sm:grid-cols-4 sm:gap-3 sm:rounded-[24px] sm:p-4 lg:max-w-[58rem] lg:gap-3.5 lg:p-4 2xl:max-w-[62rem] 2xl:gap-4 2xl:p-5" style={{ boxShadow: '0 0 10px rgba(0,76,110,.6)' }}>
            {cards.map((card) => {
              const active = selected.includes(card.id)
              const isMatched = matched.includes(card.id)
              const isWrong = isIncorrect && active

              return (
                <button
                  key={card.id}
                  onClick={() => chooseCard(card.id)}
                  aria-pressed={active}
                  disabled={isMatched}
                  className={`relative aspect-[1/1.05] min-h-0 overflow-hidden rounded-[18px] border-4 bg-gradient-to-b from-[#fef9ed] via-[#fff4bf] to-[#fef9ed] transition duration-150 sm:rounded-[24px] lg:aspect-square ${
                    isMatched
                      ? 'border-[#339e4a] opacity-80 cursor-default shadow-sm animate-correct'
                      : isWrong
                      ? 'border-[#e83552] shadow-[0_0_0_2px_rgba(232,53,82,.15)] animate-shake'
                      : active
                      ? 'border-[#0a7ad8] shadow-[0_0_0_2px_rgba(10,122,216,.15)]'
                      : 'border-white hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  <img src={card.image} alt={card.alt} className="absolute left-1/2 top-1/2 h-[210%] w-[445%] max-w-none -translate-x-1/2 -translate-y-[43%] object-contain" draggable={false} />
                  {isMatched && (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#339e4a] text-sm font-bold text-white shadow-md">
                      ✓
                    </span>
                  )}
                  {isWrong && (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#e83552] text-sm font-bold text-white shadow-md">
                      ✗
                    </span>
                  )}
                  {active && !isWrong && (
                    <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-[#0a7ad8] text-sm font-bold text-white shadow-md">
                      ?
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

