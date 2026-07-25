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
    <div className="zone-lesson-narrative relative z-10 flex min-h-full flex-1 flex-col overflow-hidden">
      <button
        onClick={onSpeak}
        className={`zone-lesson-speaker absolute right-3 top-3 z-30 rounded-full bg-[#0a7ad8] p-2.5 shadow-md transition-all hover:bg-[#0863b0] active:scale-95 sm:right-5 sm:top-5 sm:p-3 ${
          isSpeaking ? 'animate-pulse scale-105' : ''
        }`}
        title="Nghe hướng dẫn"
      >
        <img src={zoneQuizAssets.speaker} alt="Speak" className="w-6 h-6 select-none" />
      </button>

      <div className="mx-auto w-full max-w-[1400px] px-3 pt-14 sm:px-6 sm:pt-16">
        <div className="zone-lesson-bubble relative mx-auto w-full max-w-[900px] rounded-[28px] border-[3px] border-[#339E4A] bg-white px-4 py-5 text-center shadow-lg sm:rounded-[60px] sm:border-4 sm:px-10 sm:py-7">
          <p className="font-baloo text-[clamp(1.1rem,2.4vw,2.125rem)] font-bold leading-[1.5] text-[#001e2f]">
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

      <div className="zone-lesson-mascot flex min-h-[180px] flex-1 items-end justify-center overflow-hidden px-2">
        <img
          src={zoneQuizAssets.wavingMascot}
          alt="Mascot Waving"
          className="block h-auto w-auto max-w-none object-contain select-none"
          style={{
            maxHeight: 'min(850px, 105%)',
            maxWidth: 'min(1200px, 120vw)',
            transform: 'scale(1.06) translateY(4px)',
          }}
        />
      </div>
    </div>
  )
}
