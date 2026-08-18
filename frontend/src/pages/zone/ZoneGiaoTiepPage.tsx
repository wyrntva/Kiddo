import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getLessonStatusForAccount, markLessonInProgress } from '../../utils/lessonProgress'
import ZoneLandingPage from './_components/ZoneLandingPage'
import type { ZoneLesson, ZoneTheme } from './_components/zoneTypes'
import AlertDialog from '../../components/common/AlertDialog'

const fallbackLessons: ZoneLesson[] = [
  { id: 1, title: 'Lời chào lễ phép', description: '- Trẻ học cách chào hỏi người lớn và bạn bè đúng cách.', status: 'not-started', stars: 0 },
  { id: 2, title: 'Cảm ơn và xin lỗi', description: '- Trẻ học cách chủ động nói lời cảm ơn và xin lỗi chân thành.', status: 'not-started', stars: 0 },
  { id: 3, title: 'Giao tiếp mắt & Lắng nghe', description: '- Trẻ học cách nhìn vào mắt người đối diện và tập trung lắng nghe khi trò chuyện.', status: 'not-started', stars: 0 },
  { id: 4, title: 'Bày tỏ ý kiến lịch sự', description: '- Trẻ học cách trình bày mong muốn của mình một cách rõ ràng, không hờn dỗi.', status: 'not-started', stars: 0 },
  { id: 5, title: 'Tự tin trước đám đông', description: '- Trẻ rèn luyện sự tự tin khi nói chuyện hoặc phát biểu trước nhiều người.', status: 'not-started', stars: 0 },
]

const theme: ZoneTheme = {
  titleColor: '#0a7ad8',
  heartColor: '#0a7ad8',
  progressAccent: '#0a7ad8',
  progressBorder: '#c9e6ff',
  progressShadow: '0px 0px 10px rgba(10,122,216,0.2)',
  cardBorder: '#c9e6ff',
  cardShadow: '0px 0px 10px rgba(10,122,216,0.4)',
  cardHoverShadow: '0px 8px 20px rgba(10,122,216,0.6)',
  badgeBg: '#0a7ad8',
  encouragementBg: '#f0f8ff',
  encouragementBorder: '#c9e6ff',
  encouragementShadow: '0px 0px 10px rgba(10,122,216,0.4)',
  encouragementHoverShadow: '0px 8px 20px rgba(10,122,216,0.6)',
  encouragementTitleColor: '#0a7ad8',
}

export default function ZoneGiaoTiepPage() {
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
        const currentZone = json.data?.find((z: any) => z.key === 'communication')
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
        backgroundImage="/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.webp"
        islandImage="/assets/vung_dat_giao_tiep_island.webp"
        islandAlt="Vùng đất giao tiếp"
        title="Vùng đất giao tiếp"
        subtitle="Cùng Toro tự tin trò chuyện, lắng nghe và kết nối nhé!"
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
          navigate(`/zone/communication/lesson/${lesson.id}`)
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
