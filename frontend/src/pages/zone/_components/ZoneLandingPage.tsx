import Footer from '../../../components/common/Footer'
import Navbar from '../../../components/common/Navbar'
import SEO from '../../../components/common/SEO'
import ZoneEncouragementCard from './ZoneEncouragementCard'
import ZoneHeartIcon from './ZoneHeartIcon'
import ZoneLessonCard from './ZoneLessonCard'
import ZoneProgressCard from './ZoneProgressCard'
import type { ZoneLesson, ZoneTheme } from './zoneTypes'

interface ZoneLandingPageProps {
  backgroundImage: string
  islandImage: string
  islandAlt: string
  title: string
  subtitle: string
  lessons: ZoneLesson[]
  completed: number
  total: number
  theme: ZoneTheme
  onLessonSelect?: (lesson: ZoneLesson) => void
}

export default function ZoneLandingPage({
  backgroundImage,
  islandImage,
  islandAlt,
  title,
  subtitle,
  lessons,
  completed,
  total,
  theme,
  onLessonSelect,
}: ZoneLandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={title} noindex={true} />
      <Navbar />

      <main className="flex-1 min-h-[calc(100vh-64px)] relative">
        <img
          src={backgroundImage}
          alt=""
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-6 xl:px-[48px] pt-[24px] md:pt-[36px] xl:pt-[48px] pb-[36px] xl:pb-[48px] flex flex-col gap-[32px] xl:gap-[48px]">
          <div className="flex flex-col xl:flex-row gap-[20px] xl:gap-[16px] items-center justify-between w-full">
            <div className="w-full xl:w-[350px] flex justify-center xl:justify-start shrink-0">
              <div className="relative shrink-0 w-[150px] sm:w-[170px] xl:w-[240px] aspect-square -my-[10px] xl:-my-[25px] hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer">
                <img
                  src={islandImage}
                  alt={islandAlt}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[4px] items-center justify-center text-center min-w-0">
              <p
                className="font-baloo text-[34px] sm:text-[44px] md:text-[56px] xl:text-[60px] font-bold leading-[42px] sm:leading-[56px] md:leading-[72px] xl:leading-[90px] whitespace-normal"
                style={{ color: theme.titleColor }}
              >
                {title}
              </p>
              <div className="flex flex-wrap gap-[6px] justify-center items-center shrink-0">
                <p className="font-vietnam font-bold text-[16px] md:text-[22px] leading-[24px] md:leading-[28px] text-[#37393E]">
                  {subtitle}
                </p>
                <div className="w-6 h-6 md:w-7 md:h-7 shrink-0">
                  <ZoneHeartIcon color={theme.heartColor} />
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[350px] flex justify-center xl:justify-end shrink-0">
              <ZoneProgressCard completed={completed} total={total} theme={theme} />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2 xl:gap-[24px] 2xl:grid-cols-3">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="h-auto min-w-0 xl:h-[260px] 2xl:h-[221px] min-[1800px]:h-[258px]">
                <ZoneLessonCard
                  lesson={lesson}
                  theme={theme}
                  onSelect={onLessonSelect}
                />
              </div>
            ))}

            <div className="h-[320px] sm:h-[360px] min-w-0 xl:h-[260px] 2xl:h-[221px] min-[1800px]:h-[258px]">
              <ZoneEncouragementCard theme={theme} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
