import { useEffect, useMemo, useRef, useState } from 'react'
import { gameCards, initialPlacedEmotions, quizDatabase } from './quizData'
import { playDropSound, playRemoveSound, playSuccessSound, playButtonSound } from './_components/soundEffects'
import { markLessonCompleted, markLessonInProgress, saveLessonFeedbackForAccount, clearLessonFeedbackForAccount, saveQuestionResultsForAccount, getSavedQuestionResultsForAccount } from '../../utils/lessonProgress'

export const DEFAULT_LESSON_EVALUATIONS = [
  {
    passedText: 'Bé đã nhận ra cảm xúc vui của nhân vật và bước đầu biết quan sát cảm xúc qua nét mặt, hành động.',
    failedText: 'Bé vẫn đang học cách nhận biết cảm xúc vui và cần thêm cơ hội để quan sát, gọi tên cảm xúc.',
    parentTip: 'Cùng bé quan sát khuôn mặt của các nhân vật trong truyện và hỏi: "Bạn ấy đang cảm thấy thế nào?"',
  },
  {
    passedText: 'Bé đã hiểu điều gì mang lại niềm vui cho nhân vật và bắt đầu liên hệ cảm xúc với những sự việc xảy ra xung quanh.',
    failedText: 'Bé đã nhận ra cảm xúc vui nhưng vẫn cần luyện tập thêm để hiểu nguyên nhân tạo ra cảm xúc đó.',
    parentTip: 'Hỏi bé: "Hôm nay điều gì làm con vui nhất?" và cùng lắng nghe câu trả lời của bé.',
  },
  {
    passedText: 'Bé đã nhận ra nhiều hoạt động quen thuộc có thể mang lại cảm xúc vui trong cuộc sống hằng ngày.',
    failedText: 'Bé cần thêm trải nghiệm để phân biệt rõ hơn những tình huống tạo ra cảm xúc vui và không vui.',
    parentTip: 'Cùng bé kể lại một khoảnh khắc vui trong ngày và trò chuyện về điều đã khiến bé vui.',
  },
  {
    passedText: 'Bé đã biết lựa chọn cách chia sẻ niềm vui với người khác một cách tích cực và thân thiện.',
    failedText: 'Bé còn khá dè dặt khi chia sẻ cảm xúc tích cực và cần được khuyến khích nhiều hơn.',
    parentTip: 'Khi bé có chuyện vui, hãy khuyến khích bé kể cho người thân hoặc bạn bè nghe.',
  },
]

const INTRO_TEXT =
  'Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!'
const GAME_GUIDE_TEXT =
  'Con hãy kéo thả các đám mây cảm xúc ở dưới vào đúng ô tròn của các bạn nhỏ nhé!'

const getFullMediaUrl = (url: string) => {
  if (!url) return ''
  if (url.startsWith('/uploads/')) {
    const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
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
  const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({})
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRewatchingVideo, setIsRewatchingVideo] = useState(false)
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
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
      const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
      const token = localStorage.getItem('accessToken')

      try {
        // 1. Fetch lesson metadata
        let activeLessonId = currentLessonId
        let lessonRes = await fetch(`${API_URL}/api/lessons/${activeLessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        // Fallback: If lesson ID is invalid or 404 (e.g. stale URL), auto-fetch valid active lesson from DB
        if (!lessonRes.ok) {
          const fallbackRes = await fetch(`${API_URL}/api/lessons`)
          if (fallbackRes.ok) {
            const allLessons = await fallbackRes.json()
            if (Array.isArray(allLessons) && allLessons.length > 0) {
              const matched = allLessons.find((l: any) => l.title === 'Niềm vui của con') || allLessons[0]
              activeLessonId = matched.id
              setCurrentLessonId(matched.id)
              lessonRes = await fetch(`${API_URL}/api/lessons/${matched.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              })
            }
          }
        }

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

  const speakText = (text: string) => {
    stopAudio()
    if (!text || typeof window === 'undefined') return

    setIsSpeaking(true)
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi&client=tw-ob`
    const audio = new Audio(ttsUrl)
    audioRef.current = audio

    const fallbackToSpeechSynthesis = () => {
      if (!('speechSynthesis' in window)) {
        setIsSpeaking(false)
        audioRef.current = null
        return
      }
      try {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'vi-VN'
        utterance.rate = 0.95

        const voices = window.speechSynthesis.getVoices()
        const viVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().includes('vi') ||
            v.name.toLowerCase().includes('vietnam') ||
            v.name.toLowerCase().includes('hoaimy') ||
            v.name.toLowerCase().includes('linh')
        )
        if (viVoice) utterance.voice = viVoice

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => {
          setIsSpeaking(false)
          audioRef.current = null
        }
        utterance.onerror = () => {
          setIsSpeaking(false)
          audioRef.current = null
        }
        window.speechSynthesis.speak(utterance)
      } catch {
        setIsSpeaking(false)
        audioRef.current = null
      }
    }

    audio.onended = () => {
      setIsSpeaking(false)
      audioRef.current = null
    }

    audio.onerror = () => {
      fallbackToSpeechSynthesis()
    }

    audio.play().catch(() => {
      fallbackToSpeechSynthesis()
    })
  }

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

  const startVideoNow = () => {
    stopAudio()
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
    setShowPreVideo(false)
    setShowVideo(true)
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
        if (currentQ.prompt) {
          speakText(currentQ.prompt)
        }
      }
      audio.play().catch((err) => {
        setIsSpeaking(false)
        audioRef.current = null
        if (err?.name !== 'NotAllowedError') {
          console.error('Question audio play failed:', err)
        }
        if (currentQ.prompt) {
          speakText(currentQ.prompt)
        }
      })
    } else if (currentQ.prompt) {
      // Fallback: If no pre-recorded audio file exists, automatically read using Web Speech API (vi-VN)
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
    setQuestionResults({})
    setIsRewatchingVideo(false)
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
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
      completionTimeoutRef.current = null
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
    setVideoUrl(current => current || getFullMediaUrl('/uploads/videos/videobai1.mp4'))
  }, [lessonTitle])

  // Resume in-progress lesson: if questions were already answered, jump straight to the unanswered question
  useEffect(() => {
    if (loading || !currentLessonId) return
    let userId: string | undefined
    try {
      const stored = localStorage.getItem('user')
      if (stored) userId = JSON.parse(stored)?.id
    } catch {}

    const savedResults = getSavedQuestionResultsForAccount(currentLessonId, userId, lessonTitle)
    const answeredKeys = Object.keys(savedResults).map(Number)

    if (answeredKeys.length > 0) {
      setQuestionResults(savedResults)

      const totalQ = questions.length || 4
      let firstUnanswered = 0
      for (let i = 0; i < totalQ; i++) {
        if (savedResults[i] === undefined) {
          firstUnanswered = i
          break
        }
      }

      // If all questions in range are already answered, default to the last question or first
      if (savedResults[firstUnanswered] !== undefined) {
        firstUnanswered = Math.min(answeredKeys.length, totalQ - 1)
      }

      setCurrentQuestionIndex(firstUnanswered)
      setShowWelcome(false)
      setShowPreVideo(false)
      setShowVideo(false)
      setShowPostVideo(false)
      setShowIntro(false)
      setShowGame(false)
    }
  }, [currentLessonId, lessonTitle, loading, questions.length])

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
    const isQuestionScreenVisible =
      !showWelcome &&
      !showPreVideo &&
      !showVideo &&
      !showPostVideo &&
      !showIntro &&
      !showGame &&
      !loading

    if (isQuestionScreenVisible && questions.length > 0) {
      const timer = setTimeout(() => {
        speakQuestion()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [
    showWelcome,
    showPreVideo,
    showVideo,
    showPostVideo,
    showIntro,
    showGame,
    loading,
    currentQuestionIndex,
    questions,
  ])

  useEffect(() => {
    return () => {
      stopAudio()
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (optionId: string | number) => {
    if (isChecked) return

    setSelectedOptionId(optionId)
    const correct = optionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)
    const newResults = { ...questionResults, [currentQuestionIndex]: correct }
    setQuestionResults(newResults)

    // Persist question results to localStorage immediately
    if (currentLessonId) {
      let userId: string | undefined
      try {
        const stored = localStorage.getItem('user')
        if (stored) userId = JSON.parse(stored)?.id
      } catch {}
      saveQuestionResultsForAccount(currentLessonId, newResults, userId, lessonTitle || quizLesson.lessonTitle)
    }

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

  const calculatedFeedback = useMemo(() => {
    const strengths: string[] = []
    const practice: string[] = []
    const tips: string[] = []

    const qCount = questions.length > 0 ? questions.length : 4

    for (let i = 0; i < qCount; i++) {
      const isQCorrect = questionResults[i]
      if (isQCorrect === undefined) {
        // Skip unanswered questions so they don't show up in feedback before being answered
        continue
      }

      const evalItem = DEFAULT_LESSON_EVALUATIONS[i] || DEFAULT_LESSON_EVALUATIONS[0]
      tips.push(evalItem.parentTip)

      if (isQCorrect === true) {
        strengths.push(evalItem.passedText)
      } else if (isQCorrect === false) {
        practice.push(evalItem.failedText)
      }
    }

    return {
      title: lessonTitle || quizLesson.lessonTitle || 'Con đang cảm thấy gì?',
      strengths,
      practice,
      tips,
    }
  }, [questions, questionResults, lessonTitle, quizLesson.lessonTitle])

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

  useEffect(() => {
    if (currentLessonId) {
      let userId: string | undefined
      try {
        const stored = localStorage.getItem('user')
        if (stored) userId = JSON.parse(stored)?.id
      } catch {}
      markLessonInProgress(currentLessonId, userId, lessonTitle || quizLesson.lessonTitle)
      // Clear old feedback when starting/resuming a lesson so stale full-feedback doesn't persist
      clearLessonFeedbackForAccount(currentLessonId, userId, lessonTitle || quizLesson.lessonTitle)
    }
  }, [currentLessonId, lessonTitle, quizLesson.lessonTitle])

  useEffect(() => {
    if (
      calculatedFeedback &&
      currentLessonId &&
      (calculatedFeedback.strengths.length > 0 || calculatedFeedback.practice.length > 0)
    ) {
      let userId: string | undefined
      try {
        const stored = localStorage.getItem('user')
        if (stored) userId = JSON.parse(stored)?.id
      } catch {}

      saveLessonFeedbackForAccount(
        currentLessonId,
        calculatedFeedback,
        userId,
        lessonTitle || quizLesson.lessonTitle
      )
    }
  }, [calculatedFeedback, currentLessonId, lessonTitle, quizLesson.lessonTitle])

  useEffect(() => {
    if (showGame && allPlaced && !gameChecked) {
      handleCheckAnswers()
    }
  }, [showGame, allPlaced, gameChecked])

  const handleCheckAnswers = () => {
    playButtonSound()
    const isAllCorrect = gameCards.every(
      (card) => placedEmotions[card.id] === card.correctEmotion,
    )
    setGameChecked(true)

    if (isAllCorrect) {
      setTimeout(() => playSuccessSound(), 300)
    }

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
    }

    completionTimeoutRef.current = setTimeout(() => {
      let userId: string | undefined
      try {
        const stored = localStorage.getItem('user')
        if (stored) userId = JSON.parse(stored)?.id
      } catch {}

      const currentIndex = lessonsList.findIndex((l) => l.id === currentLessonId)
      const nextLesson = currentIndex !== -1 && currentIndex < lessonsList.length - 1 ? lessonsList[currentIndex + 1] : null
      markLessonCompleted(currentLessonId, nextLesson?.id, userId)
      saveLessonFeedbackForAccount(currentLessonId, calculatedFeedback, userId, lessonTitle || quizLesson.lessonTitle)

      setShowSuccessModal(true)
      completionTimeoutRef.current = null
    }, 3000)
  }

  const handleResetGame = () => {
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
      completionTimeoutRef.current = null
    }
    setPlacedEmotions({})
    setGameChecked(false)
    setSelectedEmotionId(null)
    setShowSuccessModal(false)
  }

  const handleRestartLesson = () => {
    stopAudio()
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
      completionTimeoutRef.current = null
    }
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
      navigateTimeoutRef.current = null
    }
    setShowSuccessModal(false)
    setGameChecked(false)
    setPlacedEmotions({})
    setSelectedEmotionId(null)
    setCurrentQuestionIndex(0)
    setQuestionResults({})
    setShowVideo(false)
    setShowPreVideo(false)
    setShowPostVideo(false)
    setShowIntro(false)
    setShowGame(false)
    setIsRewatchingVideo(false)
    setShowWelcome(true)
  }

  const handleRewatchVideo = () => {
    stopAudio()
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
    setIsRewatchingVideo(true)
    setShowWelcome(false)
    setShowPreVideo(false)
    setShowPostVideo(false)
    setShowIntro(false)
    setShowGame(false)
    setShowVideo(true)
  }

  const handleVideoEnded = () => {
    setShowVideo(false)
    if (isRewatchingVideo) {
      setIsRewatchingVideo(false)
    } else {
      setShowPostVideo(true)
    }
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
    questionResults,
    calculatedFeedback,
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
    startVideoNow,
    speakPostVideo,
    speakPostQuestion,
    speakQuestion,
    stopAudio,
    handleSelect,
    handleDrop,
    handleSlotClick,
    handleCheckAnswers,
    handleResetGame,
    handleRestartLesson,
    handleRewatchVideo,
    handleVideoEnded,
    loading,
    lessonsList,
    backPath,
  }
}
