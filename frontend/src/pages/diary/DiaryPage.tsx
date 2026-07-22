import { useEffect, useRef, useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { useAuth } from '../../context/AuthContext'
import DiaryFeedbackPanel from './_components/DiaryFeedbackPanel'
import DiaryLessonCarousel from './_components/DiaryLessonCarousel'
import DiaryProfileCard from './_components/DiaryProfileCard'
import DiaryProgressSidebar from './_components/DiaryProgressSidebar'
import { ISLAND_LESSONS, ISLANDS } from './diaryData'
import type { DiaryLesson as Lesson } from './types'

const DEFAULT_ISLAND = ISLANDS[0]?.name || ''

export default function DiaryPage() {
  const { user } = useAuth()
  const [expandedIsland, setExpandedIsland] = useState<string>(DEFAULT_ISLAND)
  const currentLessons = ISLAND_LESSONS[expandedIsland] || []
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(currentLessons[0])
  const accordionScrollRef = useRef<HTMLDivElement>(null)
  const islandRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const lessonsForIsland = ISLAND_LESSONS[expandedIsland] || []
    if (lessonsForIsland.length > 0) {
      setSelectedLesson(lessonsForIsland[0])
    }
  }, [expandedIsland])

  useEffect(() => {
    const cardElement = islandRefs.current[expandedIsland]
    const containerElement = accordionScrollRef.current
    if (!expandedIsland || !cardElement || !containerElement) return

    const timer = setTimeout(() => {
      containerElement.scrollTo({
        top: cardElement.offsetTop,
        behavior: 'smooth',
      })
    }, 150)

    return () => clearTimeout(timer)
  }, [expandedIsland])

  const babyName = user?.name || 'An Hoang Duong'
  const babyAge = '4 tuổi'
  const babyAvatar = user?.avatar || '/assets/dda751c0cf7a1aed55f732ffba2b65dc1e21acf3.webp'

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      setSelectedLesson(lesson)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F9FC] font-vietnam flex flex-col">
      <SEO title="Nhật ký học tập" noindex={true} />
      <Navbar />

      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 md:px-6 xl:px-[48px] py-[20px] md:py-[24px] flex flex-col 2xl:flex-row gap-6 xl:gap-[24px]">
        <div className="w-full 2xl:w-[564px] shrink-0 bg-[#fef9ed] rounded-[24px] p-[16px] sm:p-[20px] xl:p-[24px] pb-[80px] xl:pb-[24px] relative flex flex-col gap-[20px] xl:gap-[24px] overflow-hidden">
          <DiaryProfileCard babyAvatar={babyAvatar} babyName={babyName} babyAge={babyAge} />
          <DiaryProgressSidebar
            islands={ISLANDS}
            expandedIsland={expandedIsland}
            setExpandedIsland={setExpandedIsland}
            accordionScrollRef={accordionScrollRef}
            islandRefs={islandRefs}
          />

          <div className="absolute bottom-0 left-0 right-0 h-[62px] pointer-events-none z-10">
            <img width="1080" height="124"
              src="/assets/e6d6816d50b03ad893cebe7baab05e61452035d1.webp"
              alt="Grass decoration"
              className="w-full h-full object-cover rounded-b-[24px] xl:rounded-none"
              loading="lazy" decoding="async"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[16px] min-w-0">
          <DiaryLessonCarousel lessons={currentLessons} selectedLesson={selectedLesson} onSelectLesson={handleSelectLesson} />
          <DiaryFeedbackPanel lesson={selectedLesson} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
