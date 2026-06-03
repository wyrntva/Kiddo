import { Fragment } from 'react'

const imgTrophyMascot = "http://localhost:3845/assets/c78066bc662e6c83f3a797f14cf9eb0b875b8637.png";
const imgIconBookOpen = "http://localhost:3845/assets/51b5c0f4bc021efcf8e7d4d1e261510ef9e0740d.svg";
const imgGroupStep1 = "http://localhost:3845/assets/b28ac7f68d25f2c2fc92b0ccdee1bb6d3e2b0659.svg";
const imgArrowRight = "http://localhost:3845/assets/d80f752fefa7907f9ee7fe2b8b35ccb522b28767.svg";
const imgGroupStep2 = "http://localhost:3845/assets/a6a435dcad36d4444aadc30e405b90caf5ac2e6c.svg";
const imgStep2Vector = "http://localhost:3845/assets/adbb60fe5489840e09cc474ca9456292e9f7d2fe.svg";
const imgStep2Vector1 = "http://localhost:3845/assets/6a4512ac5bf77d6f8346efa3a716b5a844197025.svg";
const imgStep2Group2 = "http://localhost:3845/assets/6373ce52ea161e4c72af500c9a42635571e87273.svg";
const imgStep2Group3 = "http://localhost:3845/assets/784a83a4df5cdec1df505173d068b6bed917468b.svg";
const imgStep2Group4 = "http://localhost:3845/assets/742625c2a375b9d86373a587a8a2f68b9f847993.svg";
const imgStep2Group5 = "http://localhost:3845/assets/19cc6d6720d70ae8b322d7c46d4e9a3cfeeff572.svg";
const imgStep2Group6 = "http://localhost:3845/assets/07b3bfe75c0f7c30b41d1281314a86cd66f41782.svg";
const imgStep2Group7 = "http://localhost:3845/assets/13ce33132608116439fe291b59dd986c05b94dca.svg";
const imgStep2Group8 = "http://localhost:3845/assets/fa327d9060a5677f9f0749f648c8969a67055f48.svg";
const imgStep2Group9 = "http://localhost:3845/assets/a48b8725869e9972a5946b0abb6f3d2f0e99cbc8.svg";
const imgStep2Group10 = "http://localhost:3845/assets/2e5f63884e753b34f7f79884225b5a430c961817.svg";
const imgStep2Group11 = "http://localhost:3845/assets/e94261c2444cab55f92686e2f4695573cce2af1e.svg";
const imgStep2Group12 = "http://localhost:3845/assets/3cc11bd83fe3946276466462988a461f394feec5.svg";
const imgStep2Group13 = "http://localhost:3845/assets/4b3cc35e10a04148b0aeac777e3da1a6b57f2655.svg";
const imgStep2Group14 = "http://localhost:3845/assets/4660f89e323e950ae9ac77808cdf993fb886439d.svg";
const imgStep2Group15 = "http://localhost:3845/assets/104ab6ce5905780b6cba0e3b6516e6866938ab54.svg";
const imgStep2Group16 = "http://localhost:3845/assets/634bdd755b52a24c034e3e0ce0c23afad425e1ad.svg";
const imgStep2Group17 = "http://localhost:3845/assets/fffed6839dbd00d8e99c94ea5af3f1f6370dd18a.svg";
const imgStep2Vector2 = "http://localhost:3845/assets/3fd87a234ee3f09756c7408b82a9f48385308a5a.svg";
const imgStep3Main = "http://localhost:3845/assets/fd4767d27246114b92a8a0a330f7a61c339086d8.svg";
const imgStep4Main = "http://localhost:3845/assets/a17023ede886bd65585ed2e497ef6730082859ae.svg";
const imgIconCircleRightFilled = "http://localhost:3845/assets/307df52bf95db3f8214fe9c0404892bc2b4f690d.svg";

const steps = [
  {
    stepNum: '1',
    title: 'Xem tình huống',
    desc: 'Trẻ xem video tình huống gần gũi trong cuộc sống',
    bgColor: 'bg-[#e5f2ff] border-[#c9e6ff]',
    textColor: 'text-[#004c6e]',
    badgeBg: 'bg-[#0a7ad8]',
    renderIcon: () => (
      <div className="relative shrink-0 size-[60px]" data-name="9542833 1">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[9.12%_2.94%]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroupStep1} />
          </div>
        </div>
      </div>
    )
  },
  {
    stepNum: '2',
    title: 'Chọn phản ứng',
    desc: 'Bé chọn cách xử lý phù hợp cho từng tình huống',
    bgColor: 'bg-[#f2fbef] border-[#c3ffd0]',
    textColor: 'text-[#02522b]',
    badgeBg: 'bg-[#339e4a]',
    renderIcon: () => (
      <div className="relative shrink-0 size-[60px]" data-name="13140518 1">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute inset-[21.19%_0] w-full h-full">
            <div className="absolute inset-[62.72%_59.8%_21.19%_19.8%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStep2Vector} />
            </div>
            <div className="absolute inset-[62.72%_19.8%_21.19%_59.8%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStep2Vector1} />
            </div>
            <div className="absolute inset-[71.73%_20%_21.19%_60%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroupStep2} />
            </div>
            <div className="absolute inset-0 size-full">
              <img alt="" className="absolute block inset-[21.19%_33.33%_45.48%_33.33%] size-full" src={imgStep2Group2} />
              <img alt="" className="absolute block inset-[21.19%_66.67%_45.48%_0] size-full" src={imgStep2Group3} />
              <img alt="" className="absolute block inset-[21.19%_0_45.48%_66.67%] size-full" src={imgStep2Group4} />
              <img alt="" className="absolute block inset-[21.85%_0_45.48%_72.94%] size-full" src={imgStep2Group5} />
              <img alt="" className="absolute block inset-[62.72%_80%_21.19%_0] size-full" src={imgStep2Group6} />
              <img alt="" className="absolute block inset-[62.72%_40%_21.19%_40%] size-full" src={imgStep2Group7} />
              <img alt="" className="absolute block inset-[62.72%_0_21.19%_80%] size-full" src={imgStep2Group8} />
              <img alt="" className="absolute block inset-[71.73%_80%_21.19%_0.06%] size-full" src={imgStep2Group9} />
              <img alt="" className="absolute block inset-[71.73%_60%_21.19%_20%] size-full" src={imgStep2Group10} />
              <img alt="" className="absolute block inset-[71.73%_40%_21.19%_40%] size-full" src={imgStep2Group11} />
              <img alt="" className="absolute block inset-[62.76%_0_21.19%_80%] size-full" src={imgStep2Group12} />
            </div>
            <img alt="" className="absolute block inset-[21.85%_33.33%_45.48%_39.61%] size-full" src={imgStep2Group13} />
            <img alt="" className="absolute block inset-[21.85%_66.67%_45.48%_6.28%] size-full" src={imgStep2Group14} />
            <img alt="" className="absolute block inset-[32.43%_42.24%_53.77%_42.24%] size-full" src={imgStep2Group15} />
            <img alt="" className="absolute block inset-[30.67%_72.65%_51.81%_5.98%] size-full" src={imgStep2Group16} />
            <img alt="" className="absolute block inset-[30.22%_6.8%_51.34%_73.47%] size-full" src={imgStep2Group17} />
          </div>
          <div className="absolute bottom-0 h-[32px] left-[34.8%] right-[34.2%]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStep2Vector2} />
          </div>
        </div>
      </div>
    )
  },
  {
    stepNum: '3',
    title: 'Chơi mini game',
    desc: 'Bé học qua trò chơi tương tác vui nhộn và bổ ích',
    bgColor: 'bg-[#fef9ed] border-[#fff4bf]',
    textColor: 'text-[#895026]',
    badgeBg: 'bg-[#fdd444]',
    renderIcon: () => (
      <div className="relative shrink-0 size-[60px]" data-name="1694712 1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStep3Main} />
      </div>
    )
  },
  {
    stepNum: '4',
    title: 'Nhận thưởng',
    desc: 'Bé nhận được sao, huy hiệu và phần thưởng đáng yêu',
    bgColor: 'bg-[#f2f0fe] border-[#e9d8ff]',
    textColor: 'text-[#6c04ee]',
    badgeBg: 'bg-[#9560d8]',
    renderIcon: () => (
      <div className="relative shrink-0 size-[60px]" data-name="1139982 1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStep4Main} />
      </div>
    )
  },
]

export default function JourneySection() {
  return (
    <section className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div 
          className="bg-white content-stretch flex flex-col gap-[24px] items-start relative w-full border border-purple-50 p-6 rounded-[24px]"
          data-node-id="36:6316"
        >
          {/* Header */}
          <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full" data-node-id="36:6317">
            <div className="relative shrink-0 size-[32px]" data-node-id="36:6318">
              <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBookOpen} />
              </div>
            </div>
            <h2 
              className="font-baloo text-[32px] text-[#004c6e] text-center leading-[56px] font-bold" 
              data-node-id="36:6319"
            >
              Hành trình học tập cùng OTTOPIA
            </h2>
            <div className="relative shrink-0 size-[32px]" data-node-id="36:6320">
              <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBookOpen} />
              </div>
            </div>
          </div>

          {/* Steps + Mascot container (pr-[394px] to reserve space for mascot) */}
          <div 
            className="content-stretch flex flex-col lg:flex-row gap-[24px] items-start relative shrink-0 w-full lg:pr-[394px]" 
            data-node-id="36:6321"
          >
            {/* Steps grid */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-4">
              
              {steps.map((step, idx) => (
                <Fragment key={idx}>
                  
                  {/* Step card */}
                  <div className="flex flex-col gap-[12px] items-center relative w-full" data-node-id={idx === 0 ? "36:6322" : undefined}>
                    
                    {/* Background */}
                    <div className={`${step.bgColor} border border-solid content-stretch flex items-center justify-center p-[25px] relative rounded-[16px] shrink-0 w-full aspect-[279.5/110] max-h-[110px]`}>
                      {step.renderIcon()}
                    </div>

                    {/* Step label info */}
                    <div className="content-stretch flex flex-col gap-[12px] items-center px-[12px] text-center w-full">
                      <h3 className={`font-vietnam font-bold text-[18px] ${step.textColor} leading-[24px]`}>
                        {step.title}
                      </h3>
                      <p className="font-vietnam text-[16px] text-[#37393e] leading-[24px] max-w-[220px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Badge */}
                    <div className={`absolute ${step.badgeBg} content-stretch flex items-center justify-center left-[12px] top-[12px] size-[36px] rounded-full`}>
                      <span className="font-baloo text-[16px] text-center text-white leading-none font-bold">
                        {step.stepNum}
                      </span>
                    </div>

                  </div>

                  {/* Arrow separator */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex h-[110px] items-center justify-center shrink-0 w-[40px]">
                      <img 
                        alt="Next" 
                        className="block max-w-none size-10" 
                        src={imgArrowRight} 
                      />
                    </div>
                  )}

                </Fragment>
              ))}

            </div>

            {/* Mascot Otter Trophy on right (absolute on large screens to overlap correctly) */}
            <div 
              className="w-full max-w-[300px] mx-auto lg:absolute lg:right-0 lg:top-[50%] lg:-translate-y-1/2 lg:w-[370px] lg:h-[370px] shrink-0 pointer-events-none z-10 flex items-center justify-center"
              data-node-id="36:6482"
            >
              <img 
                alt="Trophy Mascot" 
                className="w-full h-full object-contain pointer-events-none" 
                src={imgTrophyMascot} 
              />
            </div>

          </div>

          {/* Bottom CTA Button Container */}
          <div className="content-stretch flex items-center justify-center relative shrink-0 w-full mt-6" data-node-id="36:6469">
            <button 
              onClick={() => {
                const el = document.getElementById('adventure-map');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-98 transition-all duration-150 content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative rounded-[40px] shrink-0 border border-transparent shadow-md cursor-pointer group" 
              data-node-id="36:6470"
            >
              <span className="font-baloo text-[20px] text-white whitespace-nowrap leading-[36px] font-bold">
                Khám phá khóa học
              </span>
              <div className="relative shrink-0 size-[24px] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <img 
                  alt="Arrow circle right" 
                  className="block max-w-none size-6" 
                  src={imgIconCircleRightFilled} 
                />
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
