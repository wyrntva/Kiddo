const imgBg = "/assets/home_cover_banner.webp";
const imgHomepage21 = "/assets/c777ec5ebb4097e9ad8c6739be008020a6b0fd9d.webp";
const imgVuesaxBoldVideoCircle = "/assets/a8aa9c327c70d29bff93ebdafffee5038ef57062.svg";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative aspect-[1824/650] w-full overflow-hidden rounded-[24px] shadow-lg border border-gray-100 bg-[#f4fafd]">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            {...({ fetchpriority: "high" } as any)}
            loading="eager"
          />
        </div>

        {/* Mascot Otter image on the right */}
        <div
          className="absolute select-none pointer-events-none z-10"
          style={{
            right: '-1.21%',
            top: '28%',
            width: '48.46%',
            height: '76.62%'
          }}
        >
          <img
            src={imgHomepage21}
            alt="OTTOPIA Hero Mascot"
            className="w-full h-full object-contain"
            {...({ fetchpriority: "high" } as any)}
            loading="eager"
          />
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('adventure-map');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] text-white flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-[14px] sm:py-[7px] lg:px-[20px] lg:py-[10px] rounded-[40px] border border-white border-solid shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer z-20"
          style={{
            left: '35.64%',
            top: '78%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="size-3 sm:size-4 lg:size-[20px] relative shrink-0">
            <img alt="" className="block size-full" src={imgVuesaxBoldVideoCircle} />
          </div>
          <span className="font-baloo text-[9px] sm:text-[12px] lg:text-[15px] font-bold leading-none sm:leading-[24px] select-none whitespace-nowrap">
            Bắt đầu hành trình
          </span>
        </button>
      </div>
    </section>
  );
}
