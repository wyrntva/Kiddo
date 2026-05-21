import Button from '../../../components/ui/Button'

export default function CTABanner() {
  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-12 py-12 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)' }}
        >
          {/* Decorative stars */}
          <span className="absolute top-6 left-40 text-2xl opacity-60 animate-bounce">✨</span>
          <span className="absolute top-10 right-52 text-xl opacity-50">⭐</span>
          <span className="absolute bottom-8 left-64 text-lg opacity-40">🌟</span>
          <span className="absolute top-4 right-80 text-3xl opacity-30">✨</span>

          {/* Gift illustration */}
          <div className="text-8xl shrink-0 select-none">🎁</div>

          {/* Text content */}
          <div className="flex-1 text-center px-10">
            <h2 className="text-3xl font-black text-gray-800 mb-3 leading-tight">
              Bắt đầu hành trình tuyệt vời cùng KIDDO!
            </h2>
            <p className="text-gray-600 text-base mb-7">
              Đăng ký ngay để bé nhận những bài học thú vị
              <br />
              và phần thưởng hấp dẫn mỗi ngày.
            </p>
            <Button size="lg" className="px-10 shadow-lg shadow-orange-200">
              Tạo tài khoản miễn phí
            </Button>
          </div>

          {/* Otter mascot */}
          <div className="text-9xl shrink-0 select-none">🦦</div>
        </div>
      </div>
    </section>
  )
}
