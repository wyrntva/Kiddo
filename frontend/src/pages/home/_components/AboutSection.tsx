
const imgHomepage31 = "/assets/cbdab55ce8a559feeeac047fab47be7bea7a4e42.png";
const imgFrame1171277269 = "/assets/0efb9f52d4771d1e14e9762e8930942aabd2a4e4.png";
const imgFrame1171277270 = "/assets/229c396df01f9764c78857f254f88705e41fedc8.png";
const imgFrame1171277271 = "/assets/6b9ae8c1cda52079dd7caa680c523cc63810d00c.png";
const imgLine3 = "/assets/2f2171b74e978a6fef8202f451396e2e4823ba99.svg";

export default function AboutSection() {
  return (
    <section className="w-full" data-node-id="21:647">
      <div className="bg-[#f4fafd] flex flex-col lg:flex-row gap-6 lg:gap-[48px] items-center p-[24px] rounded-[24px] w-full">
        {/* Left Side: Description Container */}
        <div className="flex-1 min-w-0 w-full" data-node-id="21:649">
          <div className="flex flex-col sm:flex-row gap-[16px] items-center w-full">
            {/* Mascot container */}
            <div className="h-[220px] relative shrink-0 w-[192px] overflow-hidden" data-node-id="24:1339">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[204px] top-1/2" data-node-id="138:3229">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Mascot Otter" className="absolute h-full left-[-38.89%] max-w-none top-0 w-[177.78%]" src={imgHomepage31} />
                </div>
              </div>
            </div>
            
            {/* Text content details */}
            <div className="flex-1 flex flex-col items-start min-w-0" data-node-id="21:690">
              <div className="pb-[8px]" data-node-id="21:653">
                <h2
                  className="font-baloo text-[28px] sm:text-[32px] text-[#004c6e] leading-[40px] sm:leading-[56px] font-bold text-center sm:text-left"
                  data-node-id="21:655"
                >
                  OTTOPIA là gì?
                </h2>
              </div>
              <div className="w-full" data-node-id="21:656">
                <p 
                  className="font-vietnam text-[16px] text-[#37393e] leading-[24px] font-normal text-justify sm:text-left"
                  data-node-id="21:657"
                >
                  OTTOPIA là nền tảng học kỹ năng sống bằng hình ảnh, tình huống thực tế và trò chơi tương tác, giúp trẻ phát triển toàn diện, tự tin và hạnh phúc hơn mỗi ngày.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Core Pillars */}
        <div className="flex-1 min-w-0 w-full" data-node-id="21:658">
          <div className="flex flex-col sm:flex-row gap-[24px] items-start w-full">
            
            {/* Pillar 1: Dễ hiểu */}
            <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:659">
              <div className="relative shrink-0 size-[64px]" data-node-id="138:3379">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Dễ hiểu" className="absolute h-[165.62%] left-[-97.22%] max-w-none top-[-29.69%] w-[294.44%]" src={imgFrame1171277269} />
                </div>
              </div>
              <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:791">
                Dễ hiểu
              </h3>
              <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:789">
                <p className="mb-0">Hình ảnh sinh</p>
                <p>động, gần gũi với trẻ</p>
              </div>
            </div>

            {/* Vertical separator */}
            <div className="hidden sm:flex h-[184px] items-center justify-center relative shrink-0 w-0">
              <div className="flex-none rotate-90">
                <div className="h-0 relative w-[184px]" data-node-id="24:731">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine3} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: An toàn */}
            <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:669">
              <div className="relative shrink-0 size-[64px]" data-node-id="138:3382">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="An toàn" className="absolute h-[165.62%] left-[-97.22%] max-w-none top-[-31.25%] w-[294.44%]" src={imgFrame1171277270} />
                </div>
              </div>
              <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:783">
                An toàn
              </h3>
              <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:781">
                <p className="mb-0">Nội dung chuẩn,</p>
                <p>lành mạnh</p>
              </div>
            </div>

            {/* Vertical separator */}
            <div className="hidden sm:flex h-[184px] items-center justify-center relative shrink-0 w-0">
              <div className="flex-none rotate-90">
                <div className="h-0 relative w-[184px]" data-node-id="24:729">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine3} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Hiệu quả */}
            <div className="flex-1 flex flex-col gap-[8px] items-center p-[24px] rounded-[32px] hover:bg-white/30 transition-colors duration-200" data-node-id="21:679">
              <div className="relative shrink-0 size-[64px]" data-node-id="138:3384">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="Hiệu quả" className="absolute h-[160.94%] left-[-93.06%] max-w-none top-[-28.12%] w-[286.11%]" src={imgFrame1171277271} />
                </div>
              </div>
              <h3 className="font-vietnam font-bold text-[18px] text-[#004c6e] leading-[24px] text-center" data-node-id="21:787">
                Hiệu quả
              </h3>
              <div className="font-vietnam text-[16px] text-[#37393e] leading-[24px] text-center" data-node-id="21:785">
                <p className="mb-0">Học mà chơi, nhớ</p>
                <p>lâu hơn</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
