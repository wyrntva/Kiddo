import Button from '../../../components/ui/Button'

export default function DailyChallengeCard() {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-5 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-black text-gray-800 text-base">Thử thách mỗi ngày</h3>
        <span className="text-2xl">🌟</span>
      </div>

      <p className="text-gray-700 text-sm font-semibold mb-1 leading-snug">
        Hôm nay, bé hãy giúp mẹ tưới cây nhé!
      </p>

      <div className="inline-flex items-center gap-1.5 bg-blue-100 rounded-full px-3 py-1 mb-4 w-fit">
        <span className="text-xs text-blue-400">🤝</span>
        <span className="text-xs text-blue-500 font-semibold">Toàn tổ chúng</span>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center gap-1.5 bg-yellow-100 border border-yellow-200 px-3 py-1.5 rounded-full">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="font-black text-gray-700 text-sm">+10</span>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
          <span className="text-sm">🎁</span>
          <span className="font-black text-gray-700 text-sm">+1</span>
        </div>
      </div>

      <Button className="w-full mt-auto" size="md">
        Tham gia ngay
      </Button>

      {/* Decorative otter */}
      <div className="absolute -right-3 -bottom-3 text-6xl opacity-70 select-none pointer-events-none rotate-12">
        🦦
      </div>
    </div>
  )
}
