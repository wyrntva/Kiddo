import { useEffect, useRef, useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, getSavedLessonFeedbackForAccount } from '../../utils/lessonProgress'
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
  const rawLessons = ISLAND_LESSONS[expandedIsland] || []

  const currentLessons: Lesson[] = rawLessons.map((lesson, index) => {
    const accStatus = getLessonStatusForAccount(lesson.id, index, user?.id)
    const status: Lesson['status'] = accStatus === 'completed' ? 'completed' : accStatus === 'in-progress' ? 'learning' : 'locked'
    const statusLabel = status === 'completed' ? 'Hoàn thành' : status === 'learning' ? 'Đang học' : 'Chưa học'
    const isCompleted = status === 'completed'

    const savedFeedback = getSavedLessonFeedbackForAccount(lesson.id, user?.id, lesson.title)
    const feedback = savedFeedback || lesson.feedback

    return {
      ...lesson,
      status,
      statusLabel,
      isCompleted,
      feedback,
    }
  })

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(currentLessons[0])
  const accordionScrollRef = useRef<HTMLDivElement>(null)
  const islandRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (currentLessons.length > 0) {
      setSelectedLesson(currentLessons[0])
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
    setSelectedLesson(lesson)
  }

  const handleSelectIsland = (islandName: string) => {
    setExpandedIsland(islandName)
  }

  return (
    <div className="min-h-screen bg-[#F3F9FC] font-vietnam flex flex-col 2xl:h-[100dvh] 2xl:overflow-hidden">
      <SEO title="Nhật ký học tập" noindex={true} />
      <Navbar />

      <main className="mx-auto flex min-h-0 w-full max-w-[1920px] flex-1 flex-col gap-4 px-3 py-4 sm:gap-5 sm:px-4 md:px-6 md:py-6 xl:flex-row xl:gap-6 xl:px-8 2xl:px-12 2xl:py-4">
        <div className="relative flex w-full shrink-0 flex-col gap-4 overflow-hidden rounded-[20px] bg-[#fef9ed] p-3 pb-[72px] sm:gap-5 sm:rounded-[24px] sm:p-5 sm:pb-[80px] xl:w-[380px] xl:gap-6 xl:p-5 xl:pb-6 2xl:h-full 2xl:w-[414px] 2xl:p-5">
          <DiaryProfileCard babyAvatar={babyAvatar} babyName={babyName} babyAge={babyAge} />
          <DiaryProgressSidebar
            islands={ISLANDS}
            expandedIsland={expandedIsland}
            onSelectIsland={handleSelectIsland}
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

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
          <DiaryLessonCarousel lessons={currentLessons} selectedLesson={selectedLesson} onSelectLesson={handleSelectLesson} />
          <DiaryFeedbackPanel lesson={selectedLesson} />
        </div>
      </main>

      <div className="2xl:hidden">
        <Footer />
      </div>
    </div>
  )
}
