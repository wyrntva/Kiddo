import { zoneQuizAssets } from '../quizData'

interface ZoneQuizIntroScreenProps {
  introText: string
  isSpeaking: boolean
  onSpeak: () => void
}

export default function ZoneQuizIntroScreen({
  introText,
  isSpeaking,
  onSpeak,
}: ZoneQuizIntroScreenProps) {
  return (
    <div className="relative z-10 flex h-full flex-col overflow-hidden">
      <button
        onClick={onSpeak}
        className={`absolute right-4 top-4 md:right-8 md:top-8 bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-95 transition-all p-3 rounded-full shadow-md z-30 ${
          isSpeaking ? 'animate-pulse scale-105' : ''
        }`}
        title="Nghe hướng dẫn"
      >
        <img src={zoneQuizAssets.speaker} alt="Speak" className="w-6 h-6 select-none" />
      </button>

      <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 md:px-8 md:pt-12">
        <div className="relative mx-auto w-full max-w-[900px] rounded-[100px] border-4 border-[#339E4A] bg-white px-8 py-6 text-center shadow-lg md:px-16 md:py-8">
          <p className="font-baloo text-[20px] font-bold leading-snug text-[#001e2f] sm:text-[26px] md:text-[34px] md:leading-[52px]">
            {introText}
          </p>
          <div className="pointer-events-none absolute -bottom-[28px] left-1/2 h-[32px] w-[48px] -translate-x-1/2">
            <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M0 0 C10 15 15 28 15 32 C18 28 25 15 35 0" stroke="#339E4A" strokeWidth="4" fill="white" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 0 C10 12 15 24 15 29 C18 24 25 12 33 0 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-end justify-center overflow-visible px-4">
        <img
          src={zoneQuizAssets.wavingMascot}
          alt="Mascot Waving"
          className="block h-auto w-auto max-w-none object-contain select-none"
          style={{
            maxHeight: 'min(800px, calc(100% - 12px))',
            maxWidth: 'min(1180px, 118vw)',
            transform: 'translateY(10px)',
          }}
        />
      </div>
    </div>
  )
}
