import { Fragment, useRef } from 'react'
import { useChromaKey } from '../../../hooks/useChromaKey'

const imgStep1 = "/assets/c827c73baac50d8df16489379745e566717cd732.webp";
const imgStep2 = "/assets/c4c145bdc92e82b499f0d001cecefebd8aafba1a.webp";
const imgStep3 = "/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.webp";
const imgStep4 = "/assets/495e9096e9f0604fa22b069fe71439a9f48058af.webp";
const imgIconBookOpen = "/assets/51b5c0f4bc021efcf8e7d4d1e261510ef9e0740d.svg";
const imgIconCircleRightFilled = "/assets/307df52bf95db3f8214fe9c0404892bc2b4f690d.svg";

const steps = [
  {
    stepNum: '1',
    title: 'Xem tình huống',
    desc: 'Trẻ xem video tình huống gần gũi trong cuộc sống',
    bgColor: 'bg-[#e5f2ff] border-[#c9e6ff]',
    textColor: 'text-[#004c6e]',
    badgeBg: 'bg-[#0a7ad8]',
    img: imgStep1,
    cropClass: 'absolute h-[141.67%] left-[-75.93%] max-w-none top-[-16.67%] w-[251.85%]'
  },
  {
    stepNum: '2',
    title: 'Chọn phản ứng',
    desc: 'Bé chọn cách xử lý phù hợp cho từng tình huống',
    bgColor: 'bg-[#f2fbef] border-[#c3ffd0]',
    textColor: 'text-[#02522b]',
    badgeBg: 'bg-[#339e4a]',
    img: imgStep2,
    cropClass: 'absolute h-[133.95%] left-[-69.07%] max-w-none top-[-3.12%] w-[238.13%]'
  },
  {
    stepNum: '3',
    title: 'Chơi mini game',
    desc: 'Bé học qua trò chơi tương tác vui nhộn và bổ ích',
    bgColor: 'bg-[#fef9ed] border-[#fff4bf]',
    textColor: 'text-[#895026]',
    badgeBg: 'bg-[#fdd444]',
    img: imgStep3,
    cropClass: 'absolute h-[140%] left-[-74.44%] max-w-none top-[-13.77%] w-[248.89%]'
  },
  {
    stepNum: '4',
    title: 'Nhận thưởng',
    desc: 'Bé nhận được sao, huy hiệu và phần thưởng đáng yêu',
    bgColor: 'bg-[#f2f0fe] border-[#e9d8ff]',
    textColor: 'text-[#6c04ee]',
    badgeBg: 'bg-[#9560d8]',
    img: imgStep4,
    cropClass: 'absolute h-[156.67%] left-[-89.26%] max-w-none top-[-20.72%] w-[278.52%]'
  },
]

export default function JourneySection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 2x Retina resolution for the 370x370 bounding box
  useChromaKey(videoRef, canvasRef, { width: 740, height: 740 });

  return (
    <section className="w-full">
      <div className="bg-[#f4fafd] content-stretch flex flex-col gap-[24px] items-start relative w-full border border-[#c9e6ff] p-6 rounded-[24px]">
        {/* Header */}
        <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
          <div className="relative shrink-0 size-[32px]">
            <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBookOpen} loading="lazy" decoding="async" />
            </div>
          </div>
          <h2 className="font-baloo text-[22px] sm:text-[32px] text-[#004c6e] text-center leading-[36px] sm:leading-[56px] font-bold">
            Hành trình học tập cùng OTTOPIA
          </h2>
          <div className="relative shrink-0 size-[32px]">
            <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBookOpen} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {/* Steps + Mascot container */}
        <div className="content-stretch flex flex-col xl:flex-row gap-[24px] items-start relative shrink-0 w-full xl:pr-[394px]">
          {/* Steps grid */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-4">
            {steps.map((step, idx) => (
              <Fragment key={idx}>
                {/* Step card */}
                <div className="flex flex-col gap-[12px] items-center relative w-full">
                  {/* Background */}
                  <div className={`${step.bgColor} border border-solid flex items-center justify-center relative rounded-[16px] shrink-0 w-full h-[138px]`}>
                    <div className="relative shrink-0 size-[120px] overflow-hidden pointer-events-none">
                      <img
                        src={step.img}
                        alt=""
                        className={step.cropClass}
                        loading="lazy" decoding="async"
                      />
                    </div>
                  </div>

                  {/* Step label info */}
                  <div className="content-stretch flex flex-col gap-[12px] items-center px-[12px] text-center w-full">
                    <h3 className={`font-vietnam font-bold text-[18px] ${step.textColor} leading-[24px]`}>
                      {step.title}
                    </h3>
                    <p className="font-vietnam text-[16px] text-[#37393e] leading-[24px] max-w-[256px]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Badge */}
                  <div className={`absolute ${step.badgeBg} flex items-center justify-center left-[12px] top-[12px] w-[36px] h-[36px] rounded-full`}>
                    <span className="font-baloo text-[16px] text-center text-white leading-none font-bold">
                      {step.stepNum}
                    </span>
                  </div>
                </div>

                {/* Arrow separator */}
                {idx < steps.length - 1 && (
                  <div className="hidden xl:flex h-[138px] items-center justify-center shrink-0 w-[40px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="block max-w-none size-10">
                      <path d="M22.4495 14.2173C21.9613 13.7291 21.9613 12.9376 22.4495 12.4495C22.9376 11.9613 23.7291 11.9613 24.2172 12.4495L30.8839 19.1162C31.372 19.6043 31.372 20.3958 30.8839 20.8839L24.2172 27.5506C23.7291 28.0387 22.9376 28.0387 22.4495 27.5506C21.9613 27.0624 21.9613 26.271 22.4495 25.7828L26.9822 21.25H10.8333C10.143 21.25 9.58334 20.6904 9.58334 20C9.58334 19.3097 10.143 18.75 10.8333 18.75H26.9822L22.4495 14.2173Z" fill="#004C6E"/>
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Mascot Otter Trophy on right */}
          <div className="w-full max-w-[280px] h-[280px] overflow-hidden mx-auto xl:overflow-visible xl:absolute xl:right-0 xl:top-[50%] xl:-translate-y-1/2 xl:w-[370px] xl:h-[370px] shrink-0 pointer-events-none z-10 relative">
            <video ref={videoRef} autoPlay loop muted playsInline className="hidden">
              <source src="/yeah.webm" type="video/webm" />
              <source src="/yeah.mp4" type="video/mp4" />
            </video>
            <canvas
              ref={canvasRef}
              width={740}
              height={740}
              className="absolute h-full left-[-38.89%] max-w-none top-0 w-[177.78%] pointer-events-none"
            />
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full mt-6">
          <button
            onClick={() => {
              const el = document.getElementById('adventure-map');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-98 transition-all duration-150 flex gap-[8px] items-center justify-center w-full max-w-[240px] h-[56px] rounded-[40px] border border-transparent shadow-md cursor-pointer group"
          >
            <span className="font-baloo text-[18px] text-white whitespace-nowrap leading-[32px] font-bold">
              Khám phá khóa học
            </span>
            <div className="relative shrink-0 size-[24px] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <img
                alt="Arrow circle right"
                className="block max-w-none size-6"
                src={imgIconCircleRightFilled}
                loading="lazy" decoding="async"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
