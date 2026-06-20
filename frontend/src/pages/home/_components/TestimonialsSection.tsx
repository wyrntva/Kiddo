
const imgStarIcon = "/assets/5f4b469c66545c2ff1cf20ce7bbc09731bbbe55d.svg";
const imgChatIcon = "/assets/d78c2a8c52144ca76ea446add669df592e9b4b4c.svg";
const imgAvatar1 = "/assets/205fa380cb4171bfc62248112a13bb04baf89faf.png";
const imgAvatar2 = "/assets/1d3531ebbdf29ffb4b1b2a8dc19c2a786b56f79c.png";
const imgAvatar3 = "/assets/567c1f8e1a376373c8c7749b158426dd62cb60c2.png";
const imgHeartIcon = "/assets/78affb73ec67abd0242caa47381a11d269130d32.svg";

// Summary card pile avatar images
const imgAb61 = "/assets/2d4090f5a3dfdc73e6d6822edb1857551f1a2dd3.png";
const imgAb62 = "/assets/39cb2fc85b2b92c5dedad754f46d9e20d74d645b.png";
const imgAb63 = "/assets/9dfe6f54ab64e739a5bacc9103dc072a3c9a524e.png";
const imgAb64 = "/assets/36c8e26f47327fcce7f0abc579ed2a50e622eec8.png";

type RateProps = {
  className?: string;
};

function Rate({ className }: RateProps) {
  return (
    <div className={className || "flex gap-[4px] items-start w-[96px] shrink-0"}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="relative shrink-0 size-[16px]">
          <div className="absolute inset-[10.42%_8.34%]">
            <img alt="" className="absolute block inset-0 max-w-none size-full scale-120" src={imgStarIcon} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full font-vietnam">
      <div 
        className="content-stretch flex flex-col gap-[24px] items-start w-full border border-purple-50/50 p-6 rounded-[24px]"
        data-node-id="22:439"
      >
        {/* Header */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-node-id="22:440">
          <h2
            className="font-baloo text-[22px] sm:text-[32px] text-[#0a7ad8] text-center leading-[36px] sm:leading-[56px] font-bold"
            data-node-id="22:442"
          >
            Phụ huynh nói gì về OTTOPIA?
          </h2>
          <div className="relative shrink-0 size-[32px] flex items-center justify-center" data-node-id="24:1592">
            <img alt="" className="size-6 block max-w-none" src={imgChatIcon} />
          </div>
        </div>

        {/* Testimonial cards container */}
        <div className="content-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] relative shrink-0 w-full" data-node-id="22:445">
          
          {/* Card 1: Chị Minh Thư */}
          <div className="bg-[#f2fbef] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200" data-node-id="22:446">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden" data-node-id="22:554">
              <img alt="Chị Minh Thư" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar1} />
            </div>
            <div className="flex-1 min-w-0" data-node-id="22:556">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full" data-node-id="22:451">
                  <span className="font-bold text-[48px] text-[#339e4a] leading-[30px] select-none h-6">“</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium" data-node-id="24:1198">
                    OTTOPIA giúp bé nhà mình tự tin hơn hẳn, biết nói cảm xúc thay vì khóc hay gắt gỏng. Mình rất yên tâm!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full" data-node-id="22:453">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]" data-node-id="22:587">Chị Minh Thư</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]" data-node-id="22:585">Mẹ bé Bin, 4 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Chị Hoài An */}
          <div className="bg-[#fef9ed] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200" data-node-id="22:469">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden" data-node-id="22:558">
              <img alt="Chị Hoài An" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar2} />
            </div>
            <div className="flex-1 min-w-0" data-node-id="22:557">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full" data-node-id="24:1205">
                  <span className="font-bold text-[48px] text-[#fdd444] leading-[30px] select-none h-6">“</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium" data-node-id="22:475">
                    &quot;Bài học ngắn gọn, hình ảnh dễ thương và đặc biệt là bé học mỗi ngày mà không hề chán!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full" data-node-id="22:476">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]" data-node-id="22:582">Chị Hoài An</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]" data-node-id="22:580">Mẹ bé Sữa, 3 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Anh Quân Bảo */}
          <div className="bg-[#f4fafd] content-stretch flex flex-col sm:flex-row gap-[12px] items-start p-[24px] rounded-[12px] hover:shadow-md transition-shadow duration-200" data-node-id="22:492">
            <div className="border-2 border-[#d1ecfa] relative rounded-[100px] shrink-0 size-[100px] overflow-hidden" data-node-id="22:561">
              <img alt="Anh Quân Bảo" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar3} />
            </div>
            <div className="flex-1 min-w-0" data-node-id="22:560">
              <div className="content-stretch flex flex-col gap-[12px] items-start w-full">
                <div className="content-stretch flex flex-col items-start w-full" data-node-id="24:1206">
                  <span className="font-bold text-[48px] text-[#0a7ad8] leading-[30px] select-none h-6">“</span>
                  <p className="text-[16px] text-[#37393e] leading-[24px] font-medium" data-node-id="24:1208">
                    &quot;Mình thích nhất là các tình huống thực tế rất gần gũi với cuộc sống hằng ngày của con. Rất thực tế!&quot;
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start w-full" data-node-id="22:499">
                  <h4 className="font-bold text-[18px] text-[#004c6e] leading-[24px]" data-node-id="22:577">Anh Quân Bảo</h4>
                  <p className="text-[14px] text-[#575e70] tracking-[0.28px] leading-[20px]" data-node-id="22:575">Ba bé Kem, 5 tuổi</p>
                  <Rate className="flex gap-[4px] items-start w-[96px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Summary Card */}
          <div 
            className="bg-[#f2f0fe] content-stretch flex flex-col gap-[12px] items-center p-[24px] rounded-[12px] text-center justify-center relative overflow-hidden shadow-[0px_10px_30px_-10px_rgba(0,101,142,0.3)] hover:-translate-y-0.5 transition-transform duration-200" 
            data-node-id="22:515"
          >
            {/* Top icon */}
            <div className="relative shrink-0 size-[48px] z-10" data-node-id="24:1197">
              <img alt="Heart" className="absolute block inset-0 size-full" src={imgHeartIcon} />
            </div>
            
            {/* Text info */}
            <h3 
              className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] z-10 px-1"
              data-node-id="22:727"
            >
              <p className="mb-0">Hơn 10.000+ phụ huynh</p>
              <p className="mb-0">tin tưởng và đồng hành</p>
              <p>cùng OTTOPIA</p>
            </h3>
            
            {/* Facepile avatars container */}
            <div className="relative shrink-0 h-10 w-[136px] z-10" data-node-id="22:563">
              <div className="flex items-start justify-center relative size-full">
                
                {/* Face 1 */}
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-10 shadow-sm" data-node-id="22:564">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb61} />
                </div>
                
                {/* Face 2 */}
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-20 shadow-sm" data-node-id="22:566">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb62} />
                </div>
                
                {/* Face 3 */}
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-30 shadow-sm" data-node-id="22:568">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb63} />
                </div>
                
                {/* Face 4 */}
                <div className="border-2 border-solid border-white relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden -mr-4 z-40 shadow-sm" data-node-id="22:570">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgAb64} />
                </div>
                
                {/* Plus badge */}
                <div 
                  className="bg-[#27a4e0] border-2 border-solid border-white flex items-center justify-center rounded-[9999px] shrink-0 size-[40px] z-50 shadow-sm" 
                  data-node-id="22:572"
                >
                  <span 
                    className="font-vietnam font-semibold text-[#00364e] text-[12px] leading-none" 
                    data-node-id="22:573"
                  >
                    +10k
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
