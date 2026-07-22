import otterMascot from '../../../assets/otter-mascot.webp'
import Button from '../../../components/ui/Button'

export default function DailyChallengeCard() {
  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 rounded-2xl overflow-hidden relative flex flex-col">
      {/* Otter image at top */}
      <div className="relative h-44 flex items-end justify-center bg-gradient-to-b from-sky-100 to-blue-100 overflow-hidden">
        <img loading="lazy" decoding="async"
          src={otterMascot}
          alt="OTTOPIA mascot"
          className="h-full w-auto object-contain object-bottom select-none pointer-events-none drop-shadow-lg"
        />
        {/* Floating stars */}
        <span className="absolute top-3 left-4 text-xl animate-bounce select-none">⭐</span>
        <span className="absolute top-5 right-5 text-lg opacity-70 select-none">✨</span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-black text-gray-800 text-base">Thử thách mỗi ngày</h3>

        <p className="text-gray-600 text-sm leading-snug">
          Hôm nay, bé hãy giúp mẹ tưới cây nhé!
        </p>

        <div className="inline-flex items-center gap-1.5 bg-white/70 border border-blue-100 rounded-full px-3 py-1 w-fit">
          <span className="text-xs">🤝</span>
          <span className="text-xs text-blue-500 font-semibold">Kỹ năng tự lập</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-yellow-100 border border-yellow-200 px-3 py-1.5 rounded-full">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="font-black text-gray-700 text-sm">+10</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
            <span className="text-sm">🎁</span>
            <span className="font-black text-gray-700 text-sm">+1</span>
          </div>
        </div>

        <Button className="w-full" size="md">
          Tham gia ngay
        </Button>
      </div>
    </div>
  )
}
