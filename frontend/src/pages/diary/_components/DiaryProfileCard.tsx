interface DiaryProfileCardProps {
  babyAvatar: string
  babyName: string
  babyAge: string
}

export default function DiaryProfileCard({ babyAvatar, babyName, babyAge }: DiaryProfileCardProps) {
  return (
    <div className="bg-white rounded-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] border border-[#edeef2] p-[16px] sm:p-[24px] flex flex-col sm:flex-row items-center gap-[16px] sm:gap-[24px] text-center sm:text-left">
      <div className="bg-[#D9D9D9] overflow-clip relative rounded-full shrink-0 w-20 h-20">
        <img alt="Avatar" className="absolute inset-0 w-full h-full object-cover" src={babyAvatar} loading="lazy" />
      </div>
      <div className="flex flex-col gap-[12px] min-w-0">
        <h2 className="font-baloo text-[24px] font-bold text-[#37393e] leading-[40px]">Bé: {babyName}</h2>
        <div className="flex items-center justify-center sm:justify-start gap-[8px]">
          <div className="relative shrink-0 size-[24px]">
            <img src="/assets/28c32429c5e658195e650777f7ed9b810af8e278.svg" alt="Cake Candles" className="absolute block inset-0 size-full object-contain" loading="lazy" />
          </div>
          <span className="font-vietnam text-[16px] font-medium text-[#37393e] leading-[24px]">{babyAge}</span>
        </div>
      </div>
    </div>
  )
}
