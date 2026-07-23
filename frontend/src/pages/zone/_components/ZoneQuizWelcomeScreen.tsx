import { zoneQuizAssets } from '../quizData'

interface ZoneQuizWelcomeScreenProps {
  welcomeText: string
  isSpeaking: boolean
  onSpeak: () => void
  onStart: () => void
}

export default function ZoneQuizWelcomeScreen({
  welcomeText,
  isSpeaking,
  onSpeak,
  onStart,
}: ZoneQuizWelcomeScreenProps) {
  return (
    <div className="relative z-10 flex h-full flex-col overflow-hidden">
      {/* Speaker icon to read aloud the intro again */}
      <button
        onClick={onSpeak}
        className={`absolute right-4 top-4 md:right-8 md:top-8 bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-95 transition-all p-3 rounded-full shadow-md z-30 ${
          isSpeaking ? 'animate-pulse scale-105' : ''
        }`}
        title="Nghe hướng dẫn"
      >
        <img src={zoneQuizAssets.speaker} alt="Speak" className="w-6 h-6 select-none" />
      </button>

      {/* Welcome Speech Bubble */}
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 md:px-8 md:pt-12 relative z-20">
        <div className="relative mx-auto w-full max-w-[850px] rounded-[32px] md:rounded-[48px] border-4 border-[#339E4A] bg-white px-6 py-6 text-center shadow-lg md:px-12 md:py-8 flex flex-col items-center gap-5">
          <p className="font-baloo text-[18px] sm:text-[24px] md:text-[28px] font-bold leading-normal md:leading-[42px] text-[#001e2f]">
            {welcomeText}
          </p>
          <button
            onClick={onStart}
            className="px-10 py-3 bg-[#339E4A] hover:bg-[#28843e] hover:scale-105 active:scale-95 text-white font-baloo text-[22px] sm:text-[26px] font-bold rounded-full shadow-md border-b-4 border-[#206930] transition-all cursor-pointer animate-bounce duration-1000"
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
      <div className="flex min-h-0 flex-1 items-end justify-center overflow-visible px-4">
        <img
          src={zoneQuizAssets.wavingMascot}
          alt="Toro Waving"
          className="block h-auto w-auto max-w-none object-contain select-none z-10"
          style={{
            maxHeight: 'min(700px, calc(100% - 12px))',
            maxWidth: 'min(1080px, 108vw)',
            transform: 'translateY(0px)',
          }}
        />
      </div>
    </div>
  )
}
