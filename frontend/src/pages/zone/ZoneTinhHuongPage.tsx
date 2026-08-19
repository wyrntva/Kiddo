import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, markLessonInProgress } from '../../utils/lessonProgress'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'
import AlertDialog from '../../components/common/AlertDialog'

const fallbackLessons: ZoneLesson[] = [
  { id: 1, title: 'Khi bị lạc đường', description: '- Trẻ học cách giữ bình tĩnh, đứng nguyên vị trí và tìm kiếm sự trợ giúp an toàn.', status: 'not-started', stars: 0 },
  { id: 2, title: 'Gặp người lạ nói chuyện', description: '- Trẻ học nguyên tắc an toàn khi giao tiếp với người lạ và từ chối lời mời nguy hiểm.', status: 'not-started', stars: 0 },
  { id: 3, title: 'Ứng phó khi xảy ra hỏa hoạn', description: '- Trẻ học kỹ năng thoát hiểm cơ bản: bò thấp người, dùng khăn ướt và gọi 114.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Sử dụng thiết bị điện an toàn', description: '- Trẻ nhận biết mối nguy hiểm từ ổ điện, dây điện và nguyên tắc an toàn khi dùng thiết bị điện.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Gọi điện số khẩn cấp', description: '- Trẻ ghi nhớ và tập luyện cách gọi các số 113, 114, 115 khi gặp sự cố khẩn cấp.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#F2F0FE',
  subtitleColor: '#F2F0FE',
  heartColor: '#F2F0FE',
  progressAccent: '#8E44AD',
  progressBorder: '#E8DAEF',
  progressShadow: '0px 0px 10px rgba(142,68,173,0.2)',
  cardBorder: '#E8DAEF',
  cardShadow: '0px 0px 10px rgba(142,68,173,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(142,68,173,0.6)',
  badgeBg: '#8E44AD',
  encouragementBg: '#F5EEF8',
  encouragementBorder: '#E8DAEF',
  encouragementShadow: '0px 0px 10px rgba(142,68,173,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(142,68,173,0.6)',
  encouragementTitleColor: '#8E44AD',
}

export default function ZoneTinhHuongPage() {
  const navigate = useNavigate()
  const { user, syncProfile } = useAuth()
  const [lessons, setLessons] = useState<ZoneLesson[]>(fallbackLessons)
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean
    title?: string
    message: string
    type?: 'info' | 'warning' | 'success' | 'lock'
    buttonText?: string
    onConfirm?: () => void
  }>({ isOpen: false, message: '' })

  useEffect(() => {
    syncProfile?.()
  }, [syncProfile])

  useEffect(() => {
    setLessons(fallbackLessons.map((l, index) => {
      const status = getLessonStatusForAccount(l.id, index, user?.id)
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
        const currentZone = json.data?.find((z: any) => z.key === 'situation')
        if (currentZone) {
          const zLock = currentZone.lockStatus || 'UNLOCKED'
          if (zLock === 'DEV') {
            setAlertDialog({
              isOpen: true,
              title: 'Thông báo',
              message: 'Hòn đảo này đang trong quá trình phát triển, vui lòng quay lại sau!',
              type: 'warning',
              onConfirm: () => navigate('/explore'),
            })
            return
          }
          if (zLock === 'PAID' && (!user || !user.isPaid)) {
            setAlertDialog({
              isOpen: true,
              title: 'Nội dung trả phí',
              message: 'Hòn đảo này dành cho tài khoản trả phí. Vui lòng đăng ký gói để mở khóa!',
              type: 'lock',
              buttonText: 'Xem gói học',
              onConfirm: () => navigate('/courses'),
            })
            return
          }

          if (Array.isArray(currentZone.lessons) && currentZone.lessons.length > 0) {
            const dbLessons = currentZone.lessons.map((l: any, index: number) => {
              const isDev = l.lockStatus === 'DEV'
              const isPaidLocked = l.lockStatus === 'PAID' && (!user || !user.isPaid)
              const isLocked = isDev || isPaidLocked

              const status = isLocked ? 'not-started' : getLessonStatusForAccount(l.id, index, user?.id)
              return {
                id: l.id,
                fallbackId: (index % 5) + 1,
                title: l.title,
                description: l.description || '',
                status,
                stars: status === 'completed' ? 5 : 0,
                image: l.img ? (l.img.startsWith('http') ? l.img : `${API_URL}${l.img}`) : undefined,
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
    <>
      <ZoneLandingPage
        backgroundImage="/assets/131500a5eda7eb53e290d9d7a3da955581279cdd.webp"
        islandImage="/assets/hanh_tinh_tinh_huong_island.webp"
        islandAlt="Hành tinh tình huống"
        title="Hành tinh tình huống"
        subtitle="Cùng Toro học kỹ năng an toàn và xử lý tình huống khẩn cấp!"
        lessons={lessons}
        completed={completedCount}
        total={lessons.length}
        theme={theme}
        onLessonSelect={(lesson) => {
          if (lesson.lockStatus === 'DEV') {
            setAlertDialog({
              isOpen: true,
              title: 'Thông báo',
              message: 'Bài học này đang trong quá trình phát triển, vui lòng quay lại sau!',
              type: 'warning',
            })
            return
          }
          if (lesson.lockStatus === 'PAID') {
            if (!user || !user.isPaid) {
              setAlertDialog({
                isOpen: true,
                title: 'Nội dung trả phí',
                message: 'Bài học này dành cho tài khoản trả phí. Vui lòng đăng ký gói để mở khóa!',
                type: 'lock',
                buttonText: 'Xem gói học',
                onConfirm: () => navigate('/courses'),
              })
              return
            }
          }
          markLessonInProgress(lesson.id, user?.id, lesson.title)
          navigate(`/zone/situations/lesson/${lesson.id}`)
        }}
      />

      <AlertDialog
        isOpen={alertDialog.isOpen}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
        buttonText={alertDialog.buttonText}
        onClose={() => setAlertDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={alertDialog.onConfirm}
      />
    </>
  )
}
