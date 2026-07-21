const imgBg = '/assets/bannerhome.png'
const imgHomepage21 = '/assets/c777ec5ebb4097e9ad8c6739be008020a6b0fd9d.webp'
const imgVuesaxBoldVideoCircle = '/assets/a8aa9c327c70d29bff93ebdafffee5038ef57062.svg'

export default function HeroSection() {
  const scrollToAdventureMap = () => {
    const el = document.getElementById('adventure-map')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="w-full">
      <div className="relative isolate w-full overflow-hidden rounded-[16px] bg-[#bfeaff] shadow-[0_6px_18px_rgba(0,76,110,0.12)] aspect-[1824/650] md:rounded-[20px]">
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 block h-full w-full object-cover object-center"
            {...({ fetchpriority: 'high' } as any)}
            loading="eager"
          />
        </div>

        <div
          className="absolute hidden sm:block select-none pointer-events-none z-10 w-[46%] h-auto aspect-[0.632] right-[2%] bottom-[4%] lg:w-[48.46%] lg:h-[76.62%]"
          style={{
            right: 'clamp(-16px, 1vw, 12px)',
            top: 'clamp(120px, 26%, 170px)',
            transform: 'translate(0, -40px)',
          }}
        >
          <img
            src={imgHomepage21}
            alt="OTTOPIA Hero Mascot"
            className="w-full h-full object-contain"
            {...({ fetchpriority: 'high' } as any)}
            loading="eager"
          />
        </div>

        <button
          onClick={scrollToAdventureMap}
          className="absolute hidden sm:flex bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] text-white items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-[14px] sm:py-[7px] lg:px-[28px] lg:py-[14px] rounded-[40px] border border-white border-solid shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer z-20"
          style={{
            left: 'calc(27% + 100px)',
            top: '78%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="size-3 sm:size-4 lg:size-[24px] relative shrink-0">
            <img alt="" className="block size-full" src={imgVuesaxBoldVideoCircle} />
          </div>
          <span className="font-baloo text-[9px] sm:text-[12px] lg:text-[18px] font-bold leading-none sm:leading-[24px] lg:leading-none select-none whitespace-nowrap">
            Bắt đầu hành trình
          </span>
        </button>
      </div>

    </section>
  )
}
