import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, markLessonInProgress } from '../../utils/lessonProgress'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'

const fallbackLessons: ZoneLesson[] = [
  {
    id: 1,
    title: 'Niềm vui của con',
    description:
      '- Trẻ nhận biết cảm xúc vui của bản thân.\n- Trẻ biết cách chia sẻ niềm vui với người khác.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_1.jpg',
  },
  {
    id: 2,
    title: 'Nỗi buồn bé nhỏ',
    description:
      '- Biết rằng buồn không phải là điều xấu và có thể nói ra nỗi buồn để được lắng nghe, an ủi.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_2.jpg',
  },
  {
    id: 3,
    title: 'Cơn giận đang tới',
    description:
      '- Trẻ nhận biết cảm xúc tức giận và biết lựa chọn cách bình tĩnh phù hợp.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_3.jpg',
  },
  {
    id: 4,
    title: 'Khi con thấy sợ',
    description:
      '- Trẻ nhận biết cảm xúc sợ hãi và biết tìm kiếm sự giúp đỡ khi cần.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_4.jpg',
  },
  {
    id: 5,
    title: 'Nói ra cảm xúc của mình',
    description:
      '- Trẻ học cách gọi tên cảm xúc và chia sẻ với người lớn hoặc bạn bè khi cần.',
    status: 'not-started',
    stars: 0,
    image: '/assets/emotions_lesson_5.jpg',
  },
]

const theme: ZoneTheme = {
  titleColor: '#339E4A',
  heartColor: '#339e4a',
  progressAccent: '#418457',
  progressBorder: '#c3ffd0',
  progressShadow: '0px 0px 10px rgba(51,158,74,0.2)',
  cardBorder: '#C3FFD0',
  cardShadow: '0px 0px 10px rgba(51,158,74,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(51,158,74,0.6)',
  badgeBg: '#339e4a',
  encouragementBg: '#f2fbef',
  encouragementBorder: '#c3ffd0',
  encouragementShadow: '0px 0px 10px rgba(51,158,74,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(51,158,74,0.6)',
  encouragementTitleColor: '#418457',
}

export default function ZoneCamXucPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [lessons, setLessons] = useState<ZoneLesson[]>(fallbackLessons)

  useEffect(() => {
    setLessons(fallbackLessons.map((l, index) => {
      const status = getLessonStatusForAccount(l.id, index, user?.id, l.title)
      return {
        ...l,
        status,
        stars: status === 'completed' ? 5 : 0,
      }
    }))
  }, [user?.id])

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
        const currentZone = json.data?.find((z: any) => z.key === 'emotion')
        if (currentZone) {
          const zLock = currentZone.lockStatus || 'UNLOCKED'
          if (zLock === 'DEV') {
            alert('Hòn đảo này đang trong quá trình phát triển, vui lòng quay lại sau!')
            navigate('/explore')
            return
          }
          if (zLock === 'PAID' && (!user || !user.isPaid)) {
            alert('Hòn đảo này dành cho tài khoản trả phí. Vui lòng đăng ký gói để mở khóa!')
            navigate('/courses')
            return
          }

          if (Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
            const desiredTitles = ['niềm vui', 'nỗi buồn', 'cơn giận', 'sợ', 'nói ra']
            const sortedLessons = [...currentZone.lessons].sort((a: any, b: any) => {
              const idxA = desiredTitles.findIndex(t => a.title.toLowerCase().includes(t))
              const idxB = desiredTitles.findIndex(t => b.title.toLowerCase().includes(t))
              if (idxA !== -1 && idxB !== -1) return idxA - idxB
              return 0
            })

            const dbLessons = sortedLessons.map((l: any, index: number) => {
              const fallbackId = (index % 5) + 1
              const isDev = l.lockStatus === 'DEV'
              const isPaidLocked = l.lockStatus === 'PAID' && (!user || !user.isPaid)
              const isLocked = isDev || isPaidLocked

              const status = isLocked ? 'not-started' : getLessonStatusForAccount(l.id, index, user?.id, l.title)
              return {
                id: l.id,
                fallbackId,
                title: l.title,
                description: l.description || '',
                status,
                stars: status === 'completed' ? 5 : 0,
                image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : `/assets/emotions_lesson_${fallbackId}.jpg`,
                lockStatus: l.lockStatus || 'UNLOCKED',
              }
            })
            setLessons(dbLessons)
          }
        }
      })
      .catch(err => console.error('Lỗi khi tải bài học:', err))
  }, [user?.id, user?.isPaid, navigate])

  const completedCount = lessons.filter(l => l.status === 'completed').length

  return (
    <ZoneLandingPage
      backgroundImage="/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.webp"
      islandImage="/assets/vung_dat_cam_xuc_island.webp"
      islandAlt="Vùng đất cảm xúc"
      title="Vùng đất cảm xúc"
      subtitle="Cùng Toro học cách nhận biết, chia sẻ và gọi tên cảm xúc nhé!"
      lessons={lessons}
      completed={completedCount}
      total={lessons.length}
      theme={theme}
      onLessonSelect={(lesson) => {
        if (lesson.lockStatus === 'DEV') {
          return
        }
        if (lesson.lockStatus === 'PAID') {
          if (!user || !user.isPaid) {
            return
          }
        }
        markLessonInProgress(lesson.id, user?.id, lesson.title)
        navigate(`/zone/emotions/lesson/${lesson.id}`)
      }}
    />
  )
}
