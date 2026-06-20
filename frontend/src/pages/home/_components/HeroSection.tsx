const imgBg = "/assets/home_cover_banner.png";
const imgHomepage21 = "/assets/c777ec5ebb4097e9ad8c6739be008020a6b0fd9d.png";
const imgVuesaxBoldVideoCircle = "/assets/a8aa9c327c70d29bff93ebdafffee5038ef57062.svg";

export default function HeroSection() {
  return (
    <section className="w-full" data-node-id="21:306">
      <div className="relative aspect-[1824/650] w-full overflow-hidden rounded-[24px] shadow-lg border border-gray-100 bg-[#f4fafd]">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src={imgBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
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
          data-node-id="138:3227"
        >
          <img
            src={imgHomepage21}
            alt="OTTOPIA Hero Mascot"
            className="w-full h-full object-contain"
          />
        </div>

        {/* absolute overlay button matching the x=534 y=444 w=232 h=56 position */}
        <button
          onClick={() => {
            const el = document.getElementById('adventure-map');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bg-gradient-to-r from-[#fd6907] to-[#fea01f] hover:from-[#ea580c] hover:to-[#f97316] text-white flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-[18px] sm:py-[9px] lg:px-[24px] lg:py-[12px] rounded-[40px] border border-white border-solid shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer z-20"
          style={{
            left: '35.64%',
            top: '72.62%',
            transform: 'translate(-50%, -50%)'
          }}
          data-node-id="21:251"
        >
          <div className="size-3.5 sm:size-5 lg:size-[24px] relative shrink-0">
            <img alt="" className="block size-full" src={imgVuesaxBoldVideoCircle} />
          </div>
          <span className="font-baloo text-[10px] sm:text-[14px] lg:text-[18px] font-bold leading-none sm:leading-[32px] select-none whitespace-nowrap">
            Bắt đầu hành trình
          </span>
        </button>
      </div>
    </section>
  );
}
