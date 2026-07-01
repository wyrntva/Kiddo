import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const imgHeroBg = "/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png"
const imgMascot = "/assets/97290b237f2446d77cc4e59dc42ddb50825fb101.png"
const imgSpeaker = "/assets/269beb2cefee3d683dbf75f695c386d5b76b5edd.svg"

interface Option {
  id: number;
  label: string;
}

interface QuizData {
  lessonId: number;
  lessonTitle: string;
  question: string;
  options: Option[];
  correctOptionId: number;
}

const quizDatabase: Record<number, QuizData> = {
  1: {
    lessonId: 1,
    lessonTitle: "Niềm vui của con",
    question: "Theo con, lúc này Toro đang cảm thấy thế nào?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Vui" },
      { id: 2, label: "Buồn" },
      { id: 3, label: "Sợ hãi" }
    ]
  },
  2: {
    lessonId: 2,
    lessonTitle: "Nỗi buồn bé nhỏ",
    question: "Điều gì khiến Toro cảm thấy vui?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Được cô giáo khen bức tranh" },
      { id: 2, label: "Làm rơi hộp bút màu" },
      { id: 3, label: "Bị bạn làm rách tranh" }
    ]
  },
  3: {
    lessonId: 3,
    lessonTitle: "Cơn giận đang tới",
    question: "Việc nào dưới đây thường khiến các bạn nhỏ cảm thấy vui?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Chơi cùng bạn bè" },
      { id: 2, label: "Bị giành đồ chơi" },
      { id: 3, label: "Làm hỏng món đồ yêu thích" }
    ]
  },
  4: {
    lessonId: 4,
    lessonTitle: "Khi con thấy sợ",
    question: "Nếu là Toro, con sẽ làm gì tiếp theo?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Kể cho Bunny nghe niềm vui của mình" },
      { id: 2, label: "Giấu bức tranh đi" },
      { id: 3, label: "Chê tranh của bạn khác" }
    ]
  }
}

export default function ZoneQuizPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const lessonId = id ? parseInt(id, 10) : 1
  const quiz = quizDatabase[lessonId] || quizDatabase[1]

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const navigateTimeoutRef = useRef<any>(null)

  // Reset page state when lessonId changes
  useEffect(() => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
  }, [lessonId])

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (optionId: number) => {
    if (isChecked) return // lock after check
    setSelectedOptionId(optionId)
    // Auto-check immediately
    const correct = optionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)

    // Auto-navigate after 2.5 seconds
    navigateTimeoutRef.current = setTimeout(() => {
      if (lessonId < 4) {
        navigate(`/zone/cam-xuc/lesson/${lessonId + 1}`)
      } else {
        navigate('/zone/cam-xuc')
      }
    }, 2500)
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(quiz.question)
      utterance.lang = 'vi-VN'
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 min-h-[calc(100vh-64px)] relative flex items-center justify-center py-[48px] px-4 md:px-[48px] overflow-hidden">
        {/* Full-section background matching the rest of kiddo, sharp and clear */}
        <img
          src={imgHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Mascot floating in the bottom-left corner */}
        <div className="absolute left-4 bottom-0 w-[180px] md:w-[280px] lg:w-[350px] xl:w-[400px] pointer-events-none z-0">
          <img
            src={imgMascot}
            alt="Mascot"
            className="w-full h-auto object-contain select-none pointer-events-none transform origin-bottom-left hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Centered Quiz Content Container */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-[48px] items-center justify-center min-h-[600px] py-8">
          
            {/* Header / Breadcrumb */}
            <div className="w-full flex justify-start items-center">
              <button
                onClick={() => navigate('/zone/cam-xuc')}
                className="w-[147px] h-[56px] flex items-center justify-center gap-[8px] bg-white border border-solid border-[#e83552] rounded-[40px] text-[#e83552] font-baloo font-bold text-[18px] leading-[32px] cursor-pointer hover:scale-105 hover:bg-[#fff5f6] active:scale-95 transition-all duration-150 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" fill="#E83552"/>
                </svg>
                <span>Quay lại</span>
              </button>
            </div>

            {/* Question Bubble */}
            <div className="w-full bg-white border-[4px] border-[#339E4A] rounded-[1000px] flex items-center justify-start pl-[40px] pr-[24px] py-[24px] gap-[24px]">
              {/* Speaker Button */}
              <button
                onClick={handleSpeak}
                className={`bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-95 transition-all p-3 rounded-full flex items-center justify-center shrink-0 shadow-md ${isSpeaking ? 'animate-pulse scale-105' : ''}`}
                title="Nghe câu hỏi"
              >
                <img src={imgSpeaker} alt="Speak" className="w-6 h-6 select-none" />
              </button>

              {/* Question Texts */}
              <div className="flex flex-col text-left gap-1">
                <span className="font-baloo text-[#0a7ad8] text-[20px] md:text-[24px] font-bold leading-normal">
                  Câu hỏi {quiz.lessonId}:
                </span>
                <span className="font-vietnam font-bold text-[16px] md:text-[18px] leading-relaxed text-[#37393e]">
                  {quiz.question}
                </span>
              </div>
            </div>

            {/* Answer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[900px] justify-center">
              {quiz.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id
                let cardClass = "bg-white border-2 border-[#C3FFD0] shadow-[0px_4px_10px_rgba(0,0,0,0.03)]"

                if (isSelected) {
                  if (isChecked) {
                    cardClass = isCorrect ? "bg-[#eefcf2] border-4 border-[#339e4a] shadow-[#339e4a]/10" : "bg-[#fdf2f2] border-4 border-[#ef4444] shadow-[#ef4444]/10"
                  } else {
                    cardClass = "bg-[#eefcf2] border-4 border-[#339E4A] shadow-[#339E4A]/10"
                  }
                } else if (!isChecked) {
                  cardClass += " hover:bg-[#e5f2ff]"
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    disabled={isChecked}
                    className={`flex flex-col items-center justify-center p-[32px] md:p-[40px] gap-[16px] rounded-[24px] transition-all duration-300 w-full group relative ${cardClass} active:scale-98`}
                  >
                    {/* Visual Indicator icons for validation */}
                    {isChecked && isSelected && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-bounce">
                        {isCorrect ? (
                          <div className="bg-[#339e4a] rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        ) : (
                          <div className="bg-[#ef4444] rounded-full p-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Circle icon with colored circles: green, blue, orange */}
                    <div className="w-full flex items-center justify-center py-[24px]">
                      <div className={`w-[110px] h-[110px] rounded-full flex items-center justify-center text-[44px] shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                        opt.id === 1 ? 'bg-[#eefcf2]' : opt.id === 2 ? 'bg-[#e5f2ff]' : 'bg-[#fff5eb]'
                      }`}>
                        {opt.id === 1 ? '🟢' : opt.id === 2 ? '🔵' : '🟠'}
                      </div>
                    </div>

                    {/* Text Label */}
                    <span className={`font-vietnam font-bold text-[16px] md:text-[18px] text-center leading-[24px] transition-colors ${isSelected ? (isChecked ? (isCorrect ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#339E4A]') : 'text-[#37393e] group-hover:text-[#339E4A]'}`}>
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Spacing to balance the layout */}
            <div className="h-[32px]"></div>

          </div>
      </main>

      <Footer />
    </div>
  )
}
