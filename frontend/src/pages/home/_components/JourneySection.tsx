import { Fragment, useEffect, useRef } from 'react'

const imgStep1 = "/assets/c827c73baac50d8df16489379745e566717cd732.png";
const imgStep2 = "/assets/c4c145bdc92e82b499f0d001cecefebd8aafba1a.png";
const imgStep3 = "/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png";
const imgStep4 = "/assets/495e9096e9f0604fa22b069fe71439a9f48058af.png";
const imgIconBookOpen = "/assets/51b5c0f4bc021efcf8e7d4d1e261510ef9e0740d.svg";
const imgArrowRight = "/assets/d80f752fefa7907f9ee7fe2b8b35ccb522b28767.svg";
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

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animationFrameId: number;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 2x Retina resolution for the 370x370 bounding box
    const width = 740;
    const height = 740;

    const render = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        const tMin = 4;
        const tMax = 16;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const maxRB = r > b ? r : b;
          const greenness = g - maxRB;

          // Despilling
          if (greenness > 0) {
            data[i + 1] = maxRB;
          }

          // Soft green-screen keying
          if (greenness > tMin) {
            if (greenness > tMax) {
              data[i + 3] = 0;
            } else {
              const alphaFactor = (tMax - greenness) / (tMax - tMin);
              data[i + 3] = Math.round(data[i + 3] * alphaFactor);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    video.play().catch(err => console.log("Video play failed:", err));
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full">
      <div 
        className="bg-[#f4fafd] content-stretch flex flex-col gap-[24px] items-start relative w-full border border-[#c9e6ff] p-6 rounded-[24px]"
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
            className="font-baloo text-[22px] sm:text-[32px] text-[#004c6e] text-center leading-[36px] sm:leading-[56px] font-bold"
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
                  <div className={`${step.bgColor} border border-solid flex items-center justify-center relative rounded-[16px] shrink-0 w-full h-[138px]`}>
                    <div className="relative shrink-0 size-[120px] overflow-hidden pointer-events-none">
                      <img
                        src={step.img}
                        alt=""
                        className={step.cropClass}
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
                  <div className="hidden md:flex h-[138px] items-center justify-center shrink-0 w-[40px]">
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
            className="w-full max-w-[280px] h-[280px] overflow-hidden mx-auto lg:overflow-visible lg:absolute lg:right-0 lg:top-[50%] lg:-translate-y-1/2 lg:w-[370px] lg:h-[370px] shrink-0 pointer-events-none z-10 relative"
            data-node-id="36:6482"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="hidden"
            >
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

        {/* Bottom CTA Button Container */}
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full mt-6" data-node-id="36:6469">
          <button 
            onClick={() => {
              const el = document.getElementById('adventure-map');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-98 transition-all duration-150 flex gap-[8px] items-center justify-center w-[240px] h-[56px] rounded-[40px] border border-transparent shadow-md cursor-pointer group" 
            data-node-id="36:6470"
          >
            <span className="font-baloo text-[18px] text-white whitespace-nowrap leading-[32px] font-bold">
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
    </section>
  )
}
