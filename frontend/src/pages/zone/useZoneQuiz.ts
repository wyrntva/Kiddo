import { useEffect, useRef, useState } from 'react'
import { gameCards, initialPlacedEmotions, quizDatabase } from './quizData'
import { playDropSound, playRemoveSound, playSuccessSound, playButtonSound } from './_components/soundEffects'

const INTRO_TEXT =
  'Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!'
const GAME_GUIDE_TEXT =
  'Con hãy kéo thả các đám mây cảm xúc ở dưới vào đúng ô tròn của các bạn nhỏ nhé!'
const GAME_RETRY_TEXT =
  'Có câu trả lời chưa đúng rồi, bé hãy kiểm tra và thử lại nhé!'

const getFullMediaUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('/uploads/')) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    return `${API_URL}${url}`
  }
  return url
}

export default function useZoneQuiz(initialLessonId: string | number) {
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showPreVideo, setShowPreVideo] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showPostVideo, setShowPostVideo] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [placedEmotions, setPlacedEmotions] =
    useState<Record<string, string | null>>(initialPlacedEmotions)
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(null)
  const [gameChecked, setGameChecked] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // API states
  const [questions, setQuestions] = useState<any[]>([])
  const [lessonTitle, setLessonTitle] = useState('')
  const [zoneKey, setZoneKey] = useState('emotion')
  const [lessonsList, setLessonsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [welcomeText, setWelcomeText] = useState('')
  const [preVideoText, setPreVideoText] = useState('')
  const [postVideoText, setPostVideoText] = useState('')
  const [postQuestionText, setPostQuestionText] = useState('')
  const [welcomeAudio, setWelcomeAudio] = useState('')
  const [preVideoAudio, setPreVideoAudio] = useState('')
  const [postVideoAudio, setPostVideoAudio] = useState('')
  const [postQuestionAudio, setPostQuestionAudio] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

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

        if (lessonData?.welcomeText) setWelcomeText(lessonData.welcomeText)
        if (lessonData?.preVideoText) setPreVideoText(lessonData.preVideoText)
        if (lessonData?.postVideoText) setPostVideoText(lessonData.postVideoText)
        if (lessonData?.postQuestionText) setPostQuestionText(lessonData.postQuestionText)

        if (lessonData?.welcomeAudio) setWelcomeAudio(getFullMediaUrl(lessonData.welcomeAudio))
        if (lessonData?.preVideoAudio) setPreVideoAudio(getFullMediaUrl(lessonData.preVideoAudio))
        if (lessonData?.postVideoAudio) setPostVideoAudio(getFullMediaUrl(lessonData.postVideoAudio))
        if (lessonData?.postQuestionAudio) setPostQuestionAudio(getFullMediaUrl(lessonData.postQuestionAudio))
        if (lessonData?.videoUrl) setVideoUrl(getFullMediaUrl(lessonData.videoUrl))

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
            voiceUrl: getFullMediaUrl(q.voiceUrl),
            options: (q.options || []).map((opt: any) => {
              const rawImg = opt.img || opt.sprite || ''
              const formattedImg = getFullMediaUrl(rawImg)
              return {
                ...opt,
                label: opt.label || opt.text || opt.title || '',
                sprite: formattedImg,
                img: formattedImg,
              }
            })
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

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsSpeaking(false)
  }

  const speakText = (_text: string) => {
    stopAudio()
    // TTS (speechSynthesis) is disabled.
  };

  const playWelcomeAudio = () => {
    stopAudio()
    if (!welcomeAudio) return
    setIsSpeaking(true)

    const audio = new Audio(welcomeAudio)
    audioRef.current = audio
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }
    audio.play().catch((err) => {
      setIsSpeaking(false)
      audioRef.current = null
      if (err?.name !== 'NotAllowedError') {
        console.error('Audio play failed:', err)
      }
    })
  }

  const speakWelcome = () => {
    playWelcomeAudio()
  }

  const playPreVideoAudio = () => {
    stopAudio()
    if (!preVideoAudio) return
    setIsSpeaking(true)

    const audio = new Audio(preVideoAudio)
    audioRef.current = audio
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
      
      // Wait 2 seconds and then automatically transition
      navigateTimeoutRef.current = setTimeout(() => {
        setShowPreVideo(false)
        const isNiEmVui = lessonTitle.toLowerCase().includes('niềm vui')
        if (isNiEmVui) {
          setShowVideo(true)
        }
      }, 2000)
    }

    const handleFallback = (err?: any) => {
      setIsSpeaking(false)
      audioRef.current = null
      if (err?.name === 'NotAllowedError') return
      navigateTimeoutRef.current = setTimeout(() => {
        setShowPreVideo(false)
      }, 5000)
    }

    audio.onerror = () => handleFallback()
    audio.play().catch((err) => {
      if (err?.name !== 'NotAllowedError') {
        console.error('Audio play failed:', err)
      }
      handleFallback(err)
    })
  }

  const speakPreVideo = () => {
    playPreVideoAudio()
  }

  const playPostVideoAudio = () => {
    stopAudio()
    if (!postVideoAudio) return
    setIsSpeaking(true)

    const audio = new Audio(postVideoAudio)
    audioRef.current = audio
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
      
      // Wait 2 seconds and automatically transition to questions
      navigateTimeoutRef.current = setTimeout(() => {
        setShowPostVideo(false)
      }, 2000)
    }

    const handleFallback = (err?: any) => {
      setIsSpeaking(false)
      audioRef.current = null
      if (err?.name === 'NotAllowedError') return
      navigateTimeoutRef.current = setTimeout(() => {
        setShowPostVideo(false)
      }, 5000)
    }

    audio.onerror = () => handleFallback()
    audio.play().catch((err) => {
      if (err?.name !== 'NotAllowedError') {
        console.error('Audio play failed:', err)
      }
      handleFallback(err)
    })
  }

  const speakPostVideo = () => {
    playPostVideoAudio()
  }

  const playPostQuestionAudio = () => {
    stopAudio()
    if (!postQuestionAudio) {
      navigateTimeoutRef.current = setTimeout(() => {
        setShowIntro(false)
        setShowGame(true)
      }, 5000)
      return
    }

    setIsSpeaking(true)

    const audio = new Audio(postQuestionAudio)
    audioRef.current = audio
    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
      navigateTimeoutRef.current = setTimeout(() => {
        setShowIntro(false)
        setShowGame(true)
      }, 1500)
    }

    const handleFallback = () => {
      setIsSpeaking(false)
      audioRef.current = null
      navigateTimeoutRef.current = setTimeout(() => {
        setShowIntro(false)
        setShowGame(true)
      }, 5000)
    }

    audio.onerror = handleFallback
    audio.play().catch((err) => {
      if (err?.name !== 'NotAllowedError') {
        console.error('Audio play failed:', err)
      }
      handleFallback()
    })
  }

  const speakPostQuestion = () => {
    playPostQuestionAudio()
  }

  const playQuestionAudio = () => {
    stopAudio()
    const currentQ = questions[currentQuestionIndex]
    if (!currentQ) return

    if (currentQ.voiceUrl) {
      setIsSpeaking(true)
      const audio = new Audio(getFullMediaUrl(currentQ.voiceUrl))
      audioRef.current = audio
      audio.onended = () => {
        setIsSpeaking(false)
        audioRef.current = null
      }
      audio.onerror = () => {
        setIsSpeaking(false)
        audioRef.current = null
        speakText(currentQ.prompt || '')
      }
      audio.play().catch((err) => {
        setIsSpeaking(false)
        audioRef.current = null
        if (err?.name !== 'NotAllowedError') {
          console.error('Question audio play failed:', err)
        }
        speakText(currentQ.prompt || '')
      })
    } else if (currentQ.prompt) {
      speakText(currentQ.prompt)
    }
  }

  const speakQuestion = () => {
    playQuestionAudio()
  }

  const resetQuestionState = () => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
  }

  const resetLessonState = () => {
    setCurrentQuestionIndex(0)
    resetQuestionState()
    setShowWelcome(true)
    setShowPreVideo(false)
    setShowVideo(false)
    setShowPostVideo(false)
    setShowIntro(false)
    setShowGame(false)
    setGameChecked(false)
    setShowSuccessModal(false)
    setPlacedEmotions(initialPlacedEmotions)
    setSelectedEmotionId(null)
    setWelcomeText('')
    setPreVideoText('')
    setPostVideoText('')
    setPostQuestionText('')
    setWelcomeAudio('')
    setPreVideoAudio('')
    setPostVideoAudio('')
    setPostQuestionAudio('')
    setVideoUrl('')

    stopAudio()

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
    if (!lessonTitle) return
    
    setWelcomeText(current => current || `Xin chào bé, Toro đây. Hôm nay Toro sẽ cùng bé học về "${lessonTitle}". Bé đã sẵn sàng chưa nhỉ? Hãy chạm vào nút bắt đầu bên dưới để đi cùng Toro nào`)
    
    setPreVideoText(current => {
      if (current) return current
      let txt = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ cảm thấy thế nào nha!`
      if (lessonTitle.toLowerCase().includes('vui')) {
        txt = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã vui vì những điều gì nha!`
      } else if (lessonTitle.toLowerCase().includes('buồn')) {
        txt = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã buồn vì những điều gì nha!`
      } else if (lessonTitle.toLowerCase().includes('giận')) {
        txt = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã tức giận vì những điều gì nha!`
      } else if (lessonTitle.toLowerCase().includes('sợ')) {
        txt = `Bây giờ mình cùng xem một đoạn phim hoạt hình thật thú vị nhé! Trong lúc xem, bé hãy quan sát thật kỹ để xem các bạn nhỏ đã sợ hãi vì những điều gì nha!`
      }
      return txt
    })
    
    setPostVideoText(current => current || 'Mình vừa xem xong câu chuyện rồi! Bé có thích câu chuyện không nào? Bây giờ, Toro có vài câu hỏi dành cho bé đây. Bé hãy lắng nghe thật kỹ và chọn đáp án đúng nhé!')
    setPostQuestionText(current => current || INTRO_TEXT)
    
    setWelcomeAudio(current => current || getFullMediaUrl('/uploads/voices/gioi_thieu.mp3'))
    setPreVideoAudio(current => current || getFullMediaUrl('/uploads/voices/truoc_video.mp3'))
    setPostVideoAudio(current => current || getFullMediaUrl('/uploads/voices/sau_video.mp3'))
    setVideoUrl(current => current || getFullMediaUrl('/uploads/videos/videobai1.mov'))
  }, [lessonTitle])

  useEffect(() => {
    if (showWelcome && welcomeText && !loading) {
      const timer = setTimeout(() => {
        speakWelcome()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showWelcome, welcomeText, loading])

  useEffect(() => {
    if (showPreVideo && preVideoText && !loading) {
      const timer = setTimeout(() => {
        speakPreVideo()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showPreVideo, preVideoText, loading])

  useEffect(() => {
    if (showPostVideo && postVideoText && !loading) {
      const timer = setTimeout(() => {
        speakPostVideo()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showPostVideo, postVideoText, loading])

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        speakPostQuestion()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  useEffect(() => {
    return () => {
      stopAudio()
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (optionId: string | number) => {
    if (isChecked) return

    setSelectedOptionId(optionId)
    const correct = optionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)

    try {
      const audio = new Audio(correct ? '/assets/correct.mp3' : '/assets/incorrect.mp3')
      audio.play().catch((err) => console.warn('Audio play failed:', err))
    } catch (err) {
      console.warn('Audio creation failed:', err)
    }

    const delay = correct ? 1500 : 2500

    navigateTimeoutRef.current = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        resetQuestionState()
        setCurrentQuestionIndex((value) => value + 1)
      } else {
        setShowIntro(true)
      }
    }, delay)
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

    playDropSound()
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
      playRemoveSound()
      setPlacedEmotions((previous) => ({ ...previous, [cardId]: null }))
      setGameChecked(false)
    }
  }

  const handleCheckAnswers = () => {
    playButtonSound()
    const isAllCorrect = gameCards.every(
      (card) => placedEmotions[card.id] === card.correctEmotion,
    )
    setGameChecked(true)

    if (isAllCorrect) {
      setTimeout(() => playSuccessSound(), 300)
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
    showWelcome,
    setShowWelcome,
    showPreVideo,
    setShowPreVideo,
    showVideo,
    setShowVideo,
    showPostVideo,
    setShowPostVideo,
    showIntro,
    showGame,
    placedEmotions,
    selectedEmotionId,
    setSelectedEmotionId,
    gameChecked,
    showSuccessModal,
    allPlaced,
    introText: postQuestionText || INTRO_TEXT,
    welcomeText,
    preVideoText,
    postVideoText,
    postQuestionText,
    videoUrl,
    gameGuideText: GAME_GUIDE_TEXT,
    speakText,
    speakWelcome,
    speakPreVideo,
    speakPostVideo,
    speakPostQuestion,
    speakQuestion,
    stopAudio,
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
