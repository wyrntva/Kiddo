interface DiaryProfileCardProps {
  babyAvatar: string
  babyName: string
  babyAge: string
}

export default function DiaryProfileCard({ babyAvatar, babyName, babyAge }: DiaryProfileCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] border border-[#edeef2] bg-white p-4 text-left shadow-[0px_0px_5px_rgba(0,0,0,0.1)] sm:gap-6 sm:rounded-[24px] sm:p-6">
      <div className="relative size-16 shrink-0 overflow-clip rounded-full bg-[#D9D9D9] sm:size-20">
        <img alt="Avatar" className="absolute inset-0 w-full h-full object-cover" src={babyAvatar} loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-col gap-[12px] min-w-0">
        <h2 className="break-words font-baloo text-[20px] font-bold leading-7 text-[#37393e] sm:text-[24px] sm:leading-10">Bé: {babyName}</h2>
        <div className="flex items-center gap-2">
          <div className="relative shrink-0 size-[24px]">
            <img width="24" height="24" src="/assets/28c32429c5e658195e650777f7ed9b810af8e278.svg" alt="Cake Candles" className="absolute block inset-0 size-full object-contain" loading="lazy" decoding="async" />
          </div>
          <span className="font-vietnam text-[16px] font-medium text-[#37393e] leading-[24px]">{babyAge}</span>
        </div>
      </div>
    </div>
  )
}
