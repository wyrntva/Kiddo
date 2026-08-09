import { useEffect, useRef, useState } from 'react'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, getSavedQuestionResultsForAccount, syncProgressFromAPI } from '../../utils/lessonProgress'
import { DEFAULT_LESSON_EVALUATIONS } from '../zone/useZoneQuiz'
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
  const [, setSyncCount] = useState(0)
  const [dbZones, setDbZones] = useState<any[]>([])

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
    const token = localStorage.getItem('accessToken')

    fetch(`${API_URL}/api/zones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json && Array.isArray(json.data)) {
          setDbZones(json.data)
        }
      })
      .catch(err => console.error('Lỗi khi tải nhật ký vùng đất:', err))
  }, [user?.id])

  const keyMap: Record<string, string> = {
    'Vùng đất cảm xúc': 'emotion',
    'Thành phố giao tiếp': 'communication',
    'Ngôi làng tự lập': 'independence',
    'Khu vườn bạn bè': 'friendship',
    'Hành tinh tình huống': 'situation',
  }

  const zoneKey = keyMap[expandedIsland]
  const dbZone = dbZones.find(z => z.key === zoneKey)

  const rawLessons = dbZone && Array.isArray(dbZone.lessons) && dbZone.lessons.length > 0
    ? (() => {
        let sorted = [...dbZone.lessons]
        if (zoneKey === 'emotion') {
          const desiredTitles = ['niềm vui', 'nỗi buồn', 'cơn giận', 'sợ', 'nói ra']
          sorted.sort((a: any, b: any) => {
            const idxA = desiredTitles.findIndex(t => a.title.toLowerCase().includes(t))
            const idxB = desiredTitles.findIndex(t => b.title.toLowerCase().includes(t))
            if (idxA !== -1 && idxB !== -1) return idxA - idxB
            return 0
          })
        }
        const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
        return sorted.map((l: any) => {
          const staticLessons = ISLAND_LESSONS[expandedIsland] || []
          const staticL = staticLessons.find((sl: any) => sl.id === l.id || sl.title.toLowerCase() === l.title.toLowerCase())
          return {
            id: l.id,
            title: l.title,
            image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : staticL?.image,
            feedback: staticL?.feedback || {
              title: 'Con đang cảm thấy gì?',
              strengths: ['Con đã hoàn thành bài học xuất sắc!'],
              practice: [],
              tips: ['Động viên bé thực hành các kỹ năng đã học trong cuộc sống hàng ngày.'],
            }
          }
        })
      })()
    : ISLAND_LESSONS[expandedIsland] || []

  const dynamicIslands = ISLANDS.map((island) => {
    const islandZoneKey = keyMap[island.name]
    const matchingDbZone = dbZones.find(z => z.key === islandZoneKey)

    if (matchingDbZone && Array.isArray(matchingDbZone.lessons) && matchingDbZone.lessons.length > 0) {
      let sortedLessons = [...matchingDbZone.lessons]
      if (islandZoneKey === 'emotion') {
        const desiredTitles = ['niềm vui', 'nỗi buồn', 'cơn giận', 'sợ', 'nói ra']
        sortedLessons.sort((a: any, b: any) => {
          const idxA = desiredTitles.findIndex(t => a.title.toLowerCase().includes(t))
          const idxB = desiredTitles.findIndex(t => b.title.toLowerCase().includes(t))
          if (idxA !== -1 && idxB !== -1) return idxA - idxB
          return 0
        })
      }


       const skills = sortedLessons.map((l: any, index: number) => {
        const status = getLessonStatusForAccount(l.id, index, user?.id, l.title)
        
        // Calculate progress dynamically based on actual question correctness
        const qResults = getSavedQuestionResultsForAccount(l.id, user?.id, l.title, index)
        const answeredKeys = Object.keys(qResults)
        const totalQuestions = answeredKeys.length > 0 ? answeredKeys.length : 5
        const correctCount = Object.values(qResults).filter(val => val === true).length
        
        let progress = 0
        if (status === 'completed') {
          progress = answeredKeys.length > 0 
            ? Math.round((correctCount / totalQuestions) * 100) 
            : 100
        } else if (status === 'in-progress') {
          progress = answeredKeys.length > 0 
            ? Math.round((correctCount / totalQuestions) * 100) 
            : 80
        } else {
          progress = 0
        }

        const colorPalette = ['#339E4A', '#FEA01F', '#0A7AD8', '#8234E4', '#ff4d4d']
        const color = colorPalette[index % colorPalette.length]

        const hasCustomIconPath = l.title.toLowerCase().includes('buồn') ? '/assets/sad_sad.png' : undefined

        return {
          label: l.title,
          progress,
          color,
          customIcon: hasCustomIconPath,
          spriteOffset: island.skills[index]?.spriteOffset || '-3.85%',
        }
      })

      return {
        ...island,
        skills,
      }
    }

    return island
  })

  useEffect(() => {
    void syncProgressFromAPI(user?.id).then((ok) => {
      if (ok) setSyncCount((c) => c + 1)
    })
  }, [user?.id])

  const currentLessons: Lesson[] = rawLessons.map((lesson, index) => {
    const accStatus = getLessonStatusForAccount(lesson.id, index, user?.id, lesson.title)
    const status: Lesson['status'] = accStatus === 'completed' ? 'completed' : accStatus === 'in-progress' ? 'learning' : 'locked'
    const statusLabel = status === 'completed' ? 'Hoàn thành' : status === 'learning' ? 'Đang học' : 'Chưa học'
    const isCompleted = status === 'completed'

    // Compute feedback dynamically from actual per-question results
    const savedResults = getSavedQuestionResultsForAccount(lesson.id, user?.id, lesson.title, index)
    const answeredKeys = Object.keys(savedResults)
    let feedback = null

    if (answeredKeys.length > 0) {
      const strengths: string[] = []
      const practice: string[] = []
      const tips: string[] = []
      for (const key of answeredKeys) {
        const qIndex = parseInt(key)
        const isCorrect = savedResults[qIndex]
        const evalItem = DEFAULT_LESSON_EVALUATIONS[qIndex] || DEFAULT_LESSON_EVALUATIONS[0]
        tips.push(evalItem.parentTip)
        if (isCorrect) {
          strengths.push(evalItem.passedText)
        } else {
          practice.push(evalItem.failedText)
        }
      }
      feedback = { title: lesson.title, strengths, practice, tips }
    } else if (isCompleted) {
      feedback = lesson.feedback
    }

    return {
      ...lesson,
      status,
      statusLabel,
      isCompleted,
      feedback,
    }
  })

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const selectedLesson = currentLessons[selectedIndex] || currentLessons[0]
  const accordionScrollRef = useRef<HTMLDivElement>(null)
  const islandRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    setSelectedIndex(0)
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
    const idx = currentLessons.findIndex((l) => l.id === lesson.id)
    if (idx !== -1) {
      setSelectedIndex(idx)
    }
  }

  const handleSelectIsland = (islandName: string) => {
    setExpandedIsland(islandName)
  }

  return (
    <div className="min-h-screen bg-[#F3F9FC] font-vietnam flex flex-col xl:min-h-dvh xl:h-auto diary-page-container">
      <SEO title="Nhật ký học tập" noindex={true} />
      <Navbar />

      <main className="mx-auto flex min-h-0 w-full max-w-[1920px] flex-1 flex-col gap-4 px-3 py-4 sm:gap-5 sm:px-4 md:px-6 md:py-6 xl:flex-row xl:gap-5 xl:px-6 xl:py-4 2xl:gap-6 2xl:px-12 2xl:py-4">
        <div className="relative flex w-full shrink-0 flex-col gap-4 overflow-hidden rounded-[20px] bg-[#fef9ed] p-3 pb-[72px] sm:gap-5 sm:rounded-[24px] sm:p-5 sm:pb-[80px] xl:w-[340px] xl:gap-5 xl:p-4 xl:pb-6 2xl:w-[414px] 2xl:gap-6 2xl:p-5 diary-sidebar-card">
          <DiaryProfileCard babyAvatar={babyAvatar} babyName={babyName} babyAge={babyAge} />
          <DiaryProgressSidebar
            islands={dynamicIslands}
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

      <div className="diary-footer-wrapper">
        <Footer />
      </div>
    </div>
  )
}
