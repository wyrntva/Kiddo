import { useEffect, useRef, useState } from 'react'
import { gameCards, initialPlacedEmotions, quizDatabase } from './quizData'

const INTRO_TEXT =
  'Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!'
const GAME_GUIDE_TEXT =
  'Con hãy kéo thả các đám mây cảm xúc ở dưới vào đúng ô tròn của các bạn nhỏ nhé!'
const GAME_RETRY_TEXT =
  'Có câu trả lời chưa đúng rồi, bé hãy kiểm tra và thử lại nhé!'

export default function useZoneQuiz(initialLessonId: string | number) {
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [placedEmotions, setPlacedEmotions] =
    useState<Record<string, string | null>>(initialPlacedEmotions)
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(null)
  const [gameChecked, setGameChecked] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // API states
  const [questions, setQuestions] = useState<any[]>([])
  const [lessonTitle, setLessonTitle] = useState('')
  const [zoneKey, setZoneKey] = useState('emotion')
  const [lessonsList, setLessonsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const ZONE_PATHS: Record<string, string> = {
    emotion: '/zone/emotions',
    friendship: '/zone/friends',
    communication: '/zone/communication',
    independence: '/zone/independence',
    situation: '/zone/situations',
  }

  const backPath = ZONE_PATHS[zoneKey] || '/zone/emotions'

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const token = localStorage.getItem('accessToken')

      try {
        // 1. Fetch lesson metadata
        const lessonRes = await fetch(`${API_URL}/api/lessons/${currentLessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!lessonRes.ok) throw new Error('Failed to fetch lesson')
        const lessonData = await lessonRes.json()
        const title = lessonData?.title || ''
        const key = lessonData?.zone?.key || 'emotion'
        setLessonTitle(title)
        setZoneKey(key)

        // 2. Fetch all lessons in this zone to determine next lesson
        if (lessonData?.zoneId) {
          const zonesRes = await fetch(`${API_URL}/api/zones`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (zonesRes.ok) {
            const zonesJson = await zonesRes.json()
            const currentZone = zonesJson.data?.find((z: any) => z.id === lessonData.zoneId)
            if (currentZone && Array.isArray(currentZone.lessons)) {
              setLessonsList(currentZone.lessons)
            }
          }
        }

        // 3. Fetch quiz questions
        const quizRes = await fetch(`${API_URL}/api/lessons/${currentLessonId}/quiz`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const quizJson = await quizRes.json()
        const quizQuestions = quizJson?.data || []

        if (quizQuestions.length > 0) {
          const formattedQuestions = quizQuestions.map((q: any) => ({
            ...q,
            options: q.options.map((opt: any) => ({
              ...opt,
              sprite: opt.sprite?.startsWith('/uploads/') ? `${API_URL}${opt.sprite}` : opt.sprite
            }))
          }))
          setQuestions(formattedQuestions)
        } else {
          // Fallback by title comparison
          const staticQuiz = Object.values(quizDatabase).find(
            (q) => q.lessonTitle.toLowerCase() === title.toLowerCase()
          )
          if (staticQuiz) {
            setQuestions(staticQuiz.questions)
          } else {
            const numericId = typeof currentLessonId === 'number' ? currentLessonId : parseInt(currentLessonId, 10)
            const fallbackQuiz = quizDatabase[numericId] || quizDatabase[1]
            setQuestions(fallbackQuiz.questions)
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải câu hỏi:', err)
        // Fallback to static quiz
        const numericId = typeof currentLessonId === 'number' ? currentLessonId : parseInt(currentLessonId, 10)
        const fallbackQuiz = quizDatabase[numericId] || quizDatabase[1]
        setQuestions(fallbackQuiz.questions)
      } finally {
        setLoading(false)
      }
    }

    if (currentLessonId) {
      fetchQuizData()
    }
  }, [currentLessonId])

  const quizLesson = {
    lessonId: currentLessonId,
    lessonTitle: lessonTitle || 'Bài học',
    questions: questions,
  }

  const quiz = questions[currentQuestionIndex] || {
    id: 1,
    prompt: 'Đang tải câu hỏi...',
    options: [],
    correctOptionId: 1
  }

  const allPlaced = gameCards.every((card) => Boolean(placedEmotions[card.id]))

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    setIsSpeaking(true)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'vi-VN'
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const resetQuestionState = () => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
  }

  const resetLessonState = () => {
    setCurrentQuestionIndex(0)
    resetQuestionState()
    setShowIntro(false)
    setShowGame(false)
    setGameChecked(false)
    setShowSuccessModal(false)
    setPlacedEmotions(initialPlacedEmotions)
    setSelectedEmotionId(null)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setIsSpeaking(false)

    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
  }

  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflowY
    document.documentElement.style.overflowY = 'hidden'

    return () => {
      document.documentElement.style.overflowY = originalOverflow
    }
  }, [])

  useEffect(() => {
    resetLessonState()
  }, [currentLessonId])

  useEffect(() => {
    if (!showIntro) return

    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }

    navigateTimeoutRef.current = setTimeout(() => {
      setShowIntro(false)
      setShowGame(true)
    }, 5000)
  }, [showIntro])

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (optionId: string | number) => {
    if (isChecked) return

    setSelectedOptionId(optionId)
    setIsCorrect(optionId === quiz.correctOptionId)
    setIsChecked(true)

    navigateTimeoutRef.current = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        resetQuestionState()
        setCurrentQuestionIndex((value) => value + 1)
      } else {
        setShowIntro(true)
      }
    }, 1000)
  }

  const placeEmotion = (cardId: string, emotionId: string) => {
    setPlacedEmotions((previous) => {
      const next = { ...previous }

      for (const key in next) {
        if (next[key] === emotionId) {
          next[key] = null
        }
      }

      next[cardId] = emotionId
      return next
    })

    setGameChecked(false)
  }

  const handleDrop = (event: React.DragEvent, cardId: string) => {
    event.preventDefault()
    const emotionId = event.dataTransfer.getData('text/plain')

    if (emotionId) {
      placeEmotion(cardId, emotionId)
    }
  }

  const handleSlotClick = (cardId: string) => {
    if (selectedEmotionId) {
      placeEmotion(cardId, selectedEmotionId)
      setSelectedEmotionId(null)
      return
    }

    if (placedEmotions[cardId]) {
      setPlacedEmotions((previous) => ({ ...previous, [cardId]: null }))
      setGameChecked(false)
    }
  }

  const handleCheckAnswers = () => {
    const isAllCorrect = gameCards.every(
      (card) => placedEmotions[card.id] === card.correctEmotion,
    )
    setGameChecked(true)

    if (isAllCorrect) {
      setShowSuccessModal(true)
      return
    }

    speakText(GAME_RETRY_TEXT)
  }

  const handleResetGame = () => {
    setPlacedEmotions(initialPlacedEmotions)
    setGameChecked(false)
    setSelectedEmotionId(null)
    setShowSuccessModal(false)
  }

  return {
    quiz,
    quizLesson,
    currentLessonId,
    currentQuestionIndex,
    setCurrentLessonId,
    selectedOptionId,
    isChecked,
    isCorrect,
    isSpeaking,
    showIntro,
    showGame,
    placedEmotions,
    selectedEmotionId,
    setSelectedEmotionId,
    gameChecked,
    showSuccessModal,
    allPlaced,
    introText: INTRO_TEXT,
    gameGuideText: GAME_GUIDE_TEXT,
    speakText,
    handleSelect,
    handleDrop,
    handleSlotClick,
    handleCheckAnswers,
    handleResetGame,
    loading,
    lessonsList,
    backPath,
  }
}
