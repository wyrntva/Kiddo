import { useRef } from 'react'
import Footer from '../../../components/common/Footer'
import { useChromaKey } from '../../../hooks/useChromaKey'

interface AuthShellProps {
  title: string
  subtitle: string
  cardTitle: string
  cardDescription: React.ReactNode
  cardClassName?: string
  children: React.ReactNode
}

export default function AuthShell({
  title,
  subtitle,
  cardTitle,
  cardDescription,
  cardClassName = '',
  children,
}: AuthShellProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useChromaKey(videoRef, canvasRef, { width: 1280, height: 720 })

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-white font-vietnam select-none overflow-x-hidden">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <div className="hidden lg:block absolute inset-0">
          <img
            alt=""
            className="absolute h-[162.9%] left-[-61.41%] max-w-none top-[-16.44%] w-[163.54%] -translate-y-[200px]"
            src="/assets/121f63ceef1e389d2946ff30bafb9c25e7246752.webp"
          />
        </div>
        <div className="lg:hidden absolute inset-0">
          <img
            alt=""
            className="absolute h-[175%] w-auto max-w-none top-[-37.5%] left-[50%] -translate-x-[68%] -translate-y-[200px] opacity-80"
            src="/assets/121f63ceef1e389d2946ff30bafb9c25e7246752.webp"
          />
        </div>
      </div>

      <div className="z-10 shrink-0 flex flex-col items-center w-full px-4 sm:px-6 pt-6 md:pt-8 lg:pt-8 lg:h-8">
        <div className="lg:hidden flex flex-col items-center gap-2 text-center">
          <img src="/assets/logo_ottopia.webp" alt="OTTOPIA" className="h-16 w-auto object-contain animate-float" />
          <p className="font-vietnam text-[14px] font-bold text-[#575e70] max-w-[280px]">
            Cùng bé học hỏi, trưởng thành và khám phá mỗi ngày
          </p>
        </div>
      </div>

      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 md:gap-10 lg:gap-12 z-10 flex-1 py-6 md:py-8 lg:py-6">
        <div className="hidden lg:flex flex-col items-center justify-center h-auto lg:h-[698px] w-full lg:w-[min(42vw,600px)] shrink-0 select-none">
          <div className="flex flex-col items-center leading-none text-center w-full mb-6 lg:mb-0">
            <h1 className="font-baloo text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#004c6e] leading-tight lg:leading-[80px] whitespace-normal lg:whitespace-nowrap">
              {title}
            </h1>
            <p className="font-vietnam text-[16px] md:text-[20px] lg:text-[24px] font-bold text-[#37393e] leading-normal lg:leading-[32px] max-w-[600px] lg:max-w-none lg:whitespace-nowrap">
              {subtitle}
            </p>
          </div>

          <div className="hidden lg:block h-[520px] xl:h-[586px] relative shrink-0 w-[360px] xl:w-[412px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <video ref={videoRef} autoPlay loop muted playsInline className="hidden">
                <source src="/login.webm" type="video/webm" />
                <source src="/login.mp4" type="video/mp4" />
              </video>
              <canvas ref={canvasRef} width={1280} height={720} className="absolute w-full h-full object-cover pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto min-w-0">
          <div className={`bg-white/90 backdrop-blur-md border border-[#e6f4fe] lg:border-[#8690a7] shadow-xl lg:shadow-md flex flex-col items-center max-w-[600px] rounded-[24px] shrink-0 w-full lg:w-[min(44vw,600px)] transition-all duration-300 ${cardClassName}`}>
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="font-baloo text-[28px] md:text-[32px] text-[#001e2f] leading-tight lg:leading-[56px] font-bold">
                {cardTitle}
              </h2>
              <div className="font-vietnam text-[14px] md:text-[16px] text-[#575e70] leading-[24px] text-center max-w-[400px]">
                {cardDescription}
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  )
}
