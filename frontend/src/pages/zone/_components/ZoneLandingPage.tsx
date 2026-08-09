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
  hideDescription?: boolean
  hideStars?: boolean
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
  hideDescription,
  hideStars,
}: ZoneLandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={title} noindex={true} />
      <Navbar />

      <main
        className="zone-landing-main emotion-page relative flex-1"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="page-container relative z-10 flex flex-col gap-6 py-6 md:gap-8 md:py-10">
          <div className="zone-landing-hero hero w-full">
            <div className="hero__illustration cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110">
              <img
                src={islandImage}
                alt={islandAlt}
                className="pointer-events-none select-none"
              />
            </div>

            <div className="flex flex-col items-start gap-2 justify-center text-left sm:items-center sm:text-center min-w-0">
              <h1
                className="page-title font-baloo font-bold leading-tight"
                style={{ color: theme.titleColor }}
              >
                {title}
              </h1>
              <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-center">
                <p className="page-subtitle font-vietnam font-medium text-[#37393E]">
                  {subtitle}
                </p>
                <div className="h-6 w-6 shrink-0 md:h-7 md:w-7">
                  <ZoneHeartIcon color={theme.heartColor} />
                </div>
              </div>
            </div>

            <div className="hero__progress flex w-full justify-center xl:justify-end">
              <ZoneProgressCard completed={completed} total={total} theme={theme} />
            </div>
          </div>

          <div className="zone-landing-grid lesson-grid w-full">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="zone-card-item-wrapper min-w-0">
                <ZoneLessonCard
                  lesson={lesson}
                  theme={theme}
                  onSelect={onLessonSelect}
                  hideDescription={hideDescription}
                  hideStars={hideStars}
                />
              </div>
            ))}

            <div className="zone-card-item-wrapper min-w-0">
              <ZoneEncouragementCard theme={theme} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
