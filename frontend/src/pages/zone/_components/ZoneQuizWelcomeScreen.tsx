import { zoneQuizAssets } from '../quizData'

interface ZoneQuizWelcomeScreenProps {
  welcomeText: string
  isSpeaking: boolean
  onSpeak: () => void
  onStart: () => void
  onSkip?: () => void
}

export default function ZoneQuizWelcomeScreen({
  welcomeText,
  isSpeaking,
  onSpeak,
  onStart,
  onSkip,
}: ZoneQuizWelcomeScreenProps) {
  return (
    <div className="zone-lesson-narrative relative z-10 flex min-h-full flex-1 flex-col overflow-hidden">
      {/* Top action buttons */}
      <div className="absolute right-[48px] top-[48px] z-30 flex items-center gap-3">
        {onSkip && (
          <button
            onClick={onSkip}
            className="cursor-pointer rounded-full border border-[#0a7ad8] bg-white/90 px-6 py-2.5 font-baloo text-[18px] font-bold text-[#0a7ad8] shadow-md transition-all hover:bg-[#e6f6ff] active:scale-95"
          >
            Bỏ qua ➔
          </button>
        )}
        <button
          onClick={onSpeak}
          className={`zone-lesson-speaker rounded-full bg-[#0a7ad8] p-3.5 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 ${
            isSpeaking ? 'animate-pulse scale-105' : ''
          }`}
          title="Nghe hướng dẫn"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="w-8 h-8 select-none" />
        </button>
      </div>

      {/* Welcome Speech Bubble */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-3 pt-14 sm:px-6 sm:pt-16">
        <div className="zone-lesson-bubble relative mx-auto flex w-full max-w-[850px] flex-col items-center gap-3 rounded-[28px] border-[3px] border-[#339E4A] bg-white px-4 py-4 text-center shadow-lg sm:gap-4 sm:rounded-[40px] sm:border-4 sm:px-8 sm:py-6 lg:px-12">
          <p className="font-baloo text-[20px] font-bold leading-[1.45] text-[#001e2f]">
            {welcomeText}
          </p>
          <button
            onClick={onStart}
            className="cursor-pointer rounded-full border-b-4 border-[#206930] bg-[#339E4A] px-7 py-2 font-baloo text-[18px] font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-[#28843e] active:scale-95 sm:px-10 sm:py-3 sm:text-[24px]"
          >
            Bắt đầu
          </button>
          
          {/* Bubble Arrow pointing down at Toro */}
          <div className="pointer-events-none absolute -bottom-[28px] left-1/2 h-[32px] w-[48px] -translate-x-1/2">
            <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M0 0 C10 15 15 28 15 32 C18 28 25 15 35 0" stroke="#339E4A" strokeWidth="4" fill="white" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 0 C10 12 15 24 15 29 C18 24 25 12 33 0 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Toro Character waving */}
      <div className="zone-lesson-mascot flex min-h-[180px] flex-1 items-end justify-center overflow-visible px-2">
        <img
          src={zoneQuizAssets.wavingMascot}
          alt="Toro Waving"
          className="block h-auto w-auto max-w-none object-contain select-none z-10"
        />
      </div>
    </div>
  )
}
