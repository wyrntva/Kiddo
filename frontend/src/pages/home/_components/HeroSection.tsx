const imgVuesaxBoldVideoCircle = "http://localhost:3845/assets/a8aa9c327c70d29bff93ebdafffee5038ef57062.svg"

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="relative aspect-[1824/650] w-full overflow-hidden rounded-[24px] shadow-lg border border-gray-100">
          {/* Main banner image baked in Figma with illustration, title and otter */}
          <img
            src="http://localhost:3845/assets/574edb3e221252f09156e087a3ff5fbe0ce98ac1.png"
            alt="OTTOPIA Hero Banner"
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* absolute overlay button matching the x=155 y=509 w=249 h=60 position */}
          <button
            onClick={() => {
              const el = document.getElementById('adventure-map');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] text-white flex items-center justify-center gap-2 px-[24px] py-[12px] rounded-[40px] border border-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            style={{
              left: '8.5%',
              top: '78.3%',
            }}
          >
            <div className="size-[24px] relative shrink-0">
              <img alt="" className="block size-full" src={imgVuesaxBoldVideoCircle} />
            </div>
            <span className="font-baloo text-xs sm:text-sm md:text-[20px] font-bold leading-[36px] select-none whitespace-nowrap">
              Bắt đầu hành trình
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
