import { useEffect, useRef, useState } from 'react'
import { gameCards, initialPlacedEmotions, quizDatabase } from './quizData'

const INTRO_TEXT =
  'Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!'
const GAME_GUIDE_TEXT =
  'Con hãy kéo thả các đám mây cảm xúc ở dưới vào đúng ô tròn của các bạn nhỏ nhé!'
const GAME_RETRY_TEXT =
  'Có câu trả lời chưa đúng rồi, bé hãy kiểm tra và thử lại nhé!'

export default function useZoneQuiz(initialLessonId: number) {
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
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

  const quizLesson = quizDatabase[currentLessonId] || quizDatabase[1]
  const quiz = quizLesson.questions[currentQuestionIndex] || quizLesson.questions[0]
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

  const handleSelect = (optionId: number) => {
    if (isChecked) return

    setSelectedOptionId(optionId)
    setIsCorrect(optionId === quiz.correctOptionId)
    setIsChecked(true)

    navigateTimeoutRef.current = setTimeout(() => {
      if (currentQuestionIndex < quizLesson.questions.length - 1) {
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
  }
}
