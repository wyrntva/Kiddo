
const imgStarIcon = "/assets/5f4b469c66545c2ff1cf20ce7bbc09731bbbe55d.svg";
const imgChatIcon = "/assets/d78c2a8c52144ca76ea446add669df592e9b4b4c.svg";
const imgAvatar1 = "/assets/205fa380cb4171bfc62248112a13bb04baf89faf.webp";
const imgAvatar2 = "/assets/1d3531ebbdf29ffb4b1b2a8dc19c2a786b56f79c.webp";
const imgAvatar3 = "/assets/567c1f8e1a376373c8c7749b158426dd62cb60c2.webp";
const imgHeartIcon = "/assets/78affb73ec67abd0242caa47381a11d269130d32.svg";

const imgAb61 = "/assets/2d4090f5a3dfdc73e6d6822edb1857551f1a2dd3.webp";
const imgAb62 = "/assets/39cb2fc85b2b92c5dedad754f46d9e20d74d645b.webp";
const imgAb63 = "/assets/9dfe6f54ab64e739a5bacc9103dc072a3c9a524e.webp";
const imgAb64 = "/assets/36c8e26f47327fcce7f0abc579ed2a50e622eec8.webp";

type RateProps = {
  className?: string;
};

function Rate({ className }: RateProps) {
  return (
    <div className={className || "flex gap-[4px] items-start w-[96px] shrink-0"}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="relative shrink-0 size-[16px]">
          <div className="absolute inset-[10.42%_8.34%]">
            <img alt="" className="absolute block inset-0 max-w-none size-full scale-120" src={imgStarIcon} loading="lazy" decoding="async" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full font-vietnam">
      <div className="content-stretch flex flex-col gap-[24px] items-start w-full border border-purple-50/50 p-6 rounded-[24px]">
        {/* Header */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
          <h2 className="font-baloo text-[22px] sm:text-[32px] text-[#0a7ad8] text-center leading-[36px] sm:leading-[56px] font-bold">
            Phụ huynh nói gì về OTTOPIA?
          </h2>
          <div className="relative shrink-0 size-[32px] flex items-center justify-center">
            <img alt="" className="size-6 block max-w-none" src={imgChatIcon} loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Testimonial cards container */}
        <div className="content-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] relative shrink-0 w-full">

          {/* Card 1: Chị Minh Thư */}
          <div className="bg-[#f2fbef] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden">
              <img alt="Chị Minh Thư" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar1} loading="lazy" decoding="async" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full">
                  <span className="font-bold text-[48px] text-[#339e4a] leading-[30px] select-none h-6">"</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium">
                    OTTOPIA giúp bé nhà mình tự tin hơn hẳn, biết nói cảm xúc thay vì khóc hay gắt gỏng. Mình rất yên tâm!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]">Chị Minh Thư</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]">Mẹ bé Bin, 4 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Chị Hoài An */}
          <div className="bg-[#fef9ed] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden">
              <img alt="Chị Hoài An" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar2} loading="lazy" decoding="async" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full">
                  <span className="font-bold text-[48px] text-[#fdd444] leading-[30px] select-none h-6">"</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium">
                    &quot;Bài học ngắn gọn, hình ảnh dễ thương và đặc biệt là bé học mỗi ngày mà không hề chán!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]">Chị Hoài An</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]">Mẹ bé Sữa, 3 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Anh Quân Bảo */}
          <div className="bg-[#f4fafd] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden">
              <img alt="Anh Quân Bảo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar3} loading="lazy" decoding="async" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full">
                  <span className="font-bold text-[48px] text-[#0a7ad8] leading-[30px] select-none h-6">"</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium">
                    &quot;Mình thích nhất là các tình huống thực tế rất gần gũi với cuộc sống hằng ngày của con. Rất thực tế!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]">Anh Quân Bảo</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]">Ba bé Kem, 5 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Summary Card */}
          <div className="bg-[#f2f0fe] content-stretch flex flex-col gap-[12px] items-center p-[24px] rounded-[12px] text-center justify-center relative overflow-hidden shadow-[0px_10px_30px_-10px_rgba(0,101,142,0.3)] hover:-translate-y-0.5 transition-transform duration-200">
            {/* Top icon */}
            <div className="relative shrink-0 size-[48px] z-10">
              <img alt="Heart" className="absolute block inset-0 size-full" src={imgHeartIcon} loading="lazy" decoding="async" />
            </div>

            {/* Text info */}
            <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] z-10 px-1">
              <p className="mb-0">Hơn 10.000+ phụ huynh</p>
              <p className="mb-0">tin tưởng và đồng hành</p>
              <p>cùng OTTOPIA</p>
            </h3>

            {/* Facepile avatars */}
            <div className="relative shrink-0 h-10 w-[136px] z-10">
              <div className="flex items-start justify-center relative size-full">
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-10 shadow-sm">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb61} loading="lazy" decoding="async" />
                </div>
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-20 shadow-sm">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb62} loading="lazy" decoding="async" />
                </div>
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-30 shadow-sm">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb63} loading="lazy" decoding="async" />
                </div>
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-40 shadow-sm">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb64} loading="lazy" decoding="async" />
                </div>
                <div className="bg-[#27a4e0] border-2 border-solid border-white flex items-center justify-center rounded-[9999px] shrink-0 size-[40px] z-50 shadow-sm">
                  <span className="font-vietnam font-semibold text-[#00364e] text-[12px] leading-none">+10k</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
