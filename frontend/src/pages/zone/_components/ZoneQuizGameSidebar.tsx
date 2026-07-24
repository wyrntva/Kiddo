import { zoneQuizAssets } from '../quizData'

interface ZoneQuizGameSidebarProps {
  onSpeakGuide: () => void
}

export default function ZoneQuizGameSidebar({ onSpeakGuide }: ZoneQuizGameSidebarProps) {
  return (
    <div className="w-full lg:w-[320px] bg-white border border-[#c4c9d4] flex flex-col sm:flex-row lg:flex-col items-center justify-between p-4 sm:p-5 lg:pt-[20px] lg:px-[24px] lg:pb-[12px] rounded-[24px] shrink-0 gap-4 overflow-hidden">
      <div className="flex flex-col gap-[24px] items-center w-full sm:w-auto lg:w-full">
        <button
          onClick={onSpeakGuide}
          className="bg-[#fea01f] hover:bg-[#e08b15] active:scale-95 transition-all px-[16px] py-[8px] rounded-[40px] flex items-center gap-[8px] text-white font-vietnam font-medium text-[16px] shadow-sm shrink-0"
        >
          <img src={zoneQuizAssets.speaker} alt="Speak" className="w-[24px] h-[24px] invert brightness-0" />
          <span>HƯỚNG DẪN CHƠI</span>
        </button>
        <div className="hidden lg:flex bg-[#e5f2ff] rounded-[12px] p-[16px] flex-col items-center w-full shrink-0">
          <div className="flex flex-col gap-[12px] items-start w-full">
            <div className="flex gap-[12px] items-center w-full">
              <div className="bg-[#0a7ad8] rounded-[100px] flex items-center justify-center p-[4px] shrink-0 size-[24px]">
                <span className="font-baloo text-[16px] text-white leading-[28px]">1</span>
              </div>
              <span className="font-vietnam font-medium text-[#37393e] text-[16px] leading-[24px]">Chọn cảm xúc</span>
            </div>
            <div className="border border-[#0a7ad8] h-[120px] relative rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
              <img src={zoneQuizAssets.stepPreview1} alt="" className="absolute max-w-none object-contain rounded-[12px] size-full" />
            </div>
          </div>
          <div className="flex gap-[10px] items-center p-[8px] rounded-[6px] shrink-0">
            <img src={zoneQuizAssets.downIcon} alt="" className="w-[24px] h-[24px] object-contain pointer-events-none select-none" />
          </div>
          <div className="flex flex-col gap-[12px] items-start w-full">
            <div className="flex gap-[12px] items-center w-full">
              <div className="bg-[#fea01f] rounded-[100px] flex items-center justify-center p-[4px] shrink-0 size-[24px]">
                <span className="font-baloo text-[16px] text-white leading-[28px]">2</span>
              </div>
              <span className="font-vietnam font-medium text-[#37393e] text-[16px] leading-[24px]">Kéo vào ô đúng</span>
            </div>
            <div className="border border-[#fea01f] h-[120px] relative rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
              <img src={zoneQuizAssets.stepPreview2} alt="" className="absolute max-w-none object-contain rounded-[12px] size-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full sm:flex-1 lg:w-full gap-2">
        <div className="drop-shadow-[0px_4px_5px_rgba(0,0,0,0.1)] flex flex-col items-end w-full">
          <div className="bg-white border-2 border-[#7bc9ff] flex items-center justify-center px-[24px] py-[12px] rounded-[1000px] w-full">
            <span className="font-vietnam text-[#001e2f] text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-center w-full">
              Chọn cảm xúc rồi kéo vào ô đúng nhé!
            </span>
          </div>
          <div className="hidden lg:block h-[25px] relative shrink-0 w-full">
            <div className="absolute h-[20px] left-1/2 top-[1.8px] w-[23.7px] -translate-x-1/2">
              <img src={zoneQuizAssets.tailBase} alt="" className="absolute inset-[-9%_-20%_-9%_-11%] block max-w-none size-full" />
            </div>
            <div className="absolute h-[22px] left-1/2 top-0 w-[24px] -translate-x-1/2">
              <img src={zoneQuizAssets.tailOutline} alt="" className="absolute block inset-0 max-w-none size-full" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block h-[175px] relative shrink-0 w-[278px] overflow-hidden pointer-events-none mb-[-12px]">
          <img src={zoneQuizAssets.wavingMascot} alt="" className="absolute h-[119%] left-[-8%] top-[0%] w-[116%] object-contain max-w-none" />
        </div>
      </div>
    </div>
  )
}
