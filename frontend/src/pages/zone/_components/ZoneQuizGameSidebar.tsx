import { zoneQuizAssets } from '../quizData'

interface ZoneQuizGameSidebarProps {
  onSpeakGuide: () => void
}

export default function ZoneQuizGameSidebar({ onSpeakGuide }: ZoneQuizGameSidebarProps) {
  return (
    <div className="zone-game-sidebar flex w-full shrink-0 flex-col items-stretch gap-3 overflow-hidden rounded-[20px] border border-[#c4c9d4] bg-white p-3 shadow-[0_8px_24px_rgba(0,76,110,0.12)] sm:p-4 lg:h-full lg:w-full lg:flex-col lg:rounded-[24px] lg:px-5 lg:pb-3 lg:pt-5">
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-between lg:flex-col lg:gap-5">
        <button
          onClick={onSpeakGuide}
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[40px] bg-[#fea01f] px-4 py-2 font-vietnam text-[13px] font-bold text-white shadow-sm transition-all hover:bg-[#e08b15] active:scale-95 sm:text-[14px] lg:text-[16px] w-full sm:w-auto lg:w-full"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="w-[24px] h-[24px] invert brightness-0" />
          <span>HƯỚNG DẪN CHƠI</span>
        </button>
        <div className="flex w-full flex-1 min-w-0 flex-row items-center justify-center gap-2 rounded-[12px] bg-[#e5f2ff] p-2.5 sm:gap-4 sm:p-4 lg:flex-col lg:gap-3">
          <div className="flex flex-col gap-[6px] items-center w-full max-w-[120px] sm:max-w-[160px] lg:max-w-none lg:items-start">
            <div className="flex gap-[6px] sm:gap-[10px] items-center justify-center lg:justify-start w-full">
              <div className="bg-[#0a7ad8] rounded-[100px] flex items-center justify-center shrink-0 size-[20px] sm:size-[24px]">
                <span className="font-baloo text-[12px] sm:text-[16px] text-white leading-none">1</span>
              </div>
              <span className="font-vietnam font-medium text-[#37393e] text-[11px] sm:text-[15px] leading-tight text-center lg:text-left">Chọn cảm xúc</span>
            </div>
            <div className="zone-step-preview border border-[#0a7ad8] h-[65px] sm:h-[95px] lg:h-[120px] relative rounded-[8px] sm:rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
              <img src={zoneQuizAssets.stepPreview1} alt="" className="absolute max-w-none object-contain size-full" />
            </div>
          </div>
          <div className="flex items-center justify-center shrink-0 p-1">
            <img src={zoneQuizAssets.downIcon} alt="" className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] object-contain pointer-events-none select-none -rotate-90 lg:rotate-0" />
          </div>
          <div className="flex flex-col gap-[6px] items-center w-full max-w-[120px] sm:max-w-[160px] lg:max-w-none lg:items-start">
            <div className="flex gap-[6px] sm:gap-[10px] items-center justify-center lg:justify-start w-full">
              <div className="bg-[#fea01f] rounded-[100px] flex items-center justify-center shrink-0 size-[20px] sm:size-[24px]">
                <span className="font-baloo text-[12px] sm:text-[16px] text-white leading-none">2</span>
              </div>
              <span className="font-vietnam font-medium text-[#37393e] text-[11px] sm:text-[15px] leading-tight text-center lg:text-left">Kéo vào ô đúng</span>
            </div>
            <div className="zone-step-preview border border-[#fea01f] h-[65px] sm:h-[95px] lg:h-[120px] relative rounded-[8px] sm:rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
              <img src={zoneQuizAssets.stepPreview2} alt="" className="absolute max-w-none object-contain size-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex min-w-0 flex-1 flex-col items-center gap-2 lg:w-full">
        <div className="zone-sidebar-bubble drop-shadow-[0px_4px_5px_rgba(0,0,0,0.1)] flex flex-col items-end w-full">
          <div className="flex w-full items-center justify-center rounded-[24px] border-2 border-[#7bc9ff] bg-white px-3 py-2 sm:rounded-[1000px] sm:px-5 sm:py-3">
            <span className="font-vietnam text-[#001e2f] text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-center w-full">
              Chọn cảm xúc rồi kéo vào ô đúng nhé!
            </span>
          </div>
          <div className="relative hidden h-[25px] w-full shrink-0 lg:block">
            <div className="absolute h-[20px] left-1/2 top-[1.8px] w-[23.7px] -translate-x-1/2">
              <img src={zoneQuizAssets.tailBase} alt="" className="absolute inset-[-9%_-20%_-9%_-11%] block max-w-none size-full" />
            </div>
            <div className="absolute h-[22px] left-1/2 top-0 w-[24px] -translate-x-1/2">
              <img src={zoneQuizAssets.tailOutline} alt="" className="absolute block inset-0 max-w-none size-full" />
            </div>
          </div>
        </div>
        <div className="zone-sidebar-mascot relative mb-[-12px] hidden h-[175px] w-[278px] shrink-0 overflow-hidden pointer-events-none lg:block">
          <img src={zoneQuizAssets.wavingMascot} alt="" className="absolute h-[119%] left-[-8%] top-[0%] w-[116%] object-contain max-w-none" />
        </div>
      </div>
    </div>
  )
}
