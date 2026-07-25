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

      <main className="zone-landing-main relative min-h-[calc(100dvh-56px)] flex-1 md:min-h-[calc(100dvh-64px)]">
        <img
          src={backgroundImage}
          alt=""
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        <div className="relative z-10 mx-auto flex max-w-[1920px] flex-col gap-5 px-3 pb-8 pt-4 sm:px-5 md:gap-7 md:px-6 md:pb-10 md:pt-6 xl:gap-9 xl:px-12 xl:pb-12 xl:pt-8">
          <div className="zone-landing-hero grid w-full grid-cols-[auto_1fr] items-center gap-x-3 gap-y-4 sm:gap-x-5 xl:grid-cols-[300px_1fr_300px] xl:gap-4">
            <div className="flex shrink-0 justify-center xl:justify-start">
              <div className="relative -my-2 aspect-square w-[88px] shrink-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 sm:w-[120px] md:w-[150px] xl:-my-5 xl:w-[220px]">
                <img
                  src={islandImage}
                  alt={islandAlt}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 text-left sm:items-center sm:text-center">
              <p
                className="font-baloo text-[clamp(1.75rem,5vw,3.75rem)] font-bold leading-[1.15]"
                style={{ color: theme.titleColor }}
              >
                {title}
              </p>
              <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-center">
                <p className="font-vietnam text-[13px] font-bold leading-5 text-[#37393E] sm:text-[16px] sm:leading-6 md:text-[20px] md:leading-7">
                  {subtitle}
                </p>
                <div className="h-5 w-5 shrink-0 md:h-7 md:w-7">
                  <ZoneHeartIcon color={theme.heartColor} />
                </div>
              </div>
            </div>

            <div className="col-span-2 flex w-full shrink-0 justify-center xl:col-span-1 xl:justify-end">
              <ZoneProgressCard completed={completed} total={total} theme={theme} />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-[2.4rem] md:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="h-[280px] min-w-0">
                <ZoneLessonCard
                  lesson={lesson}
                  theme={theme}
                  onSelect={onLessonSelect}
                />
              </div>
            ))}

            <div className="h-[280px] min-w-0">
              <ZoneEncouragementCard theme={theme} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
