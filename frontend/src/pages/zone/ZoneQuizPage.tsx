import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const imgHeroBg = "/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png"
const imgMascot = "/assets/97290b237f2446d77cc4e59dc42ddb50825fb101.png"
const imgWavingMascot = "/assets/5c8508f0584418b762ec0cf80207df8624c6d362.png"
const imgSpeaker = "/assets/269beb2cefee3d683dbf75f695c386d5b76b5edd.svg"

const sprite1 = "/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png"
const sprite2 = "/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png"

interface Option {
  id: number;
  label: string;
  sprite: string;
  style: React.CSSProperties;
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
      { id: 1, label: "Vui", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
      { id: 2, label: "Buồn", sprite: sprite2, style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
      { id: 3, label: "Sợ hãi", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
    ]
  },
  2: {
    lessonId: 2,
    lessonTitle: "Nỗi buồn bé nhỏ",
    question: "Điều gì khiến Toro cảm thấy vui?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Được cô giáo khen bức tranh", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
      { id: 2, label: "Làm rơi hộp bút màu", sprite: sprite2, style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
      { id: 3, label: "Bị bạn làm rách tranh", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
    ]
  },
  3: {
    lessonId: 3,
    lessonTitle: "Cơn giận đang tới",
    question: "Việc nào dưới đây thường khiến các bạn nhỏ cảm thấy vui?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Chơi cùng bạn bè", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
      { id: 2, label: "Bị giành đồ chơi", sprite: sprite2, style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
      { id: 3, label: "Làm hỏng món đồ yêu thích", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
    ]
  },
  4: {
    lessonId: 4,
    lessonTitle: "Khi con thấy sợ",
    question: "Nếu là Toro, con sẽ làm gì tiếp theo?",
    correctOptionId: 1,
    options: [
      { id: 1, label: "Kể cho Bunny nghe niềm vui của mình", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' } },
      { id: 2, label: "Giấu bức tranh đi", sprite: sprite2, style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' } },
      { id: 3, label: "Chê tranh của bạn khác", sprite: sprite1, style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' } }
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
  const [showIntro, setShowIntro] = useState(false)
  const navigateTimeoutRef = useRef<any>(null)

  const introText = "Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!"

  // Reset page state when lessonId changes
  useEffect(() => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
    setShowIntro(false)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
  }, [lessonId])

  // Handle auto-navigation from intro view
  useEffect(() => {
    if (showIntro) {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
      navigateTimeoutRef.current = setTimeout(() => {
        navigate('/zone/cam-xuc')
      }, 5000)
    }
  }, [showIntro, navigate])

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
        setShowIntro(true)
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
        {/* Full-section background landscape image, always visible */}
        <img
          src={imgHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {showIntro ? (
          /* Render the Game Intro View full-screen styled */
          <div 
            onClick={() => navigate('/zone/cam-xuc')}
            className="absolute inset-0 cursor-pointer z-10 flex items-center justify-center"
          >
            {/* Speaker Button in Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel()
                  setIsSpeaking(true)
                  const utterance = new SpeechSynthesisUtterance(introText)
                  utterance.lang = 'vi-VN'
                  utterance.onend = () => setIsSpeaking(false)
                  utterance.onerror = () => setIsSpeaking(false)
                  window.speechSynthesis.speak(utterance)
                }
              }}
              className={`absolute right-[48px] top-8 bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-95 transition-all p-3 rounded-full flex items-center justify-center shadow-md z-20 ${isSpeaking ? 'animate-pulse scale-105' : ''}`}
              title="Nghe hướng dẫn"
            >
              <img src={imgSpeaker} alt="Speak" className="w-6 h-6 select-none" />
            </button>

            {/* Speech Bubble */}
            <div className="absolute left-1/2 top-[10%] md:top-[12%] -translate-x-1/2 w-[90%] max-w-[760px] bg-white border-4 border-[#7bc9ff] rounded-[100px] px-6 py-4 md:px-12 md:py-6 shadow-lg flex flex-col items-center justify-center text-center z-15 relative">
              <p className="font-baloo font-bold text-[18px] sm:text-[22px] md:text-[28px] text-[#001e2f] leading-snug md:leading-[44px]">
                {introText}
              </p>
              {/* Custom Waving Curved Tail pointing down-left */}
              <div className="absolute -bottom-[28px] left-[42%] w-[48px] h-[32px] pointer-events-none">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M0 0 C10 15 15 28 15 32 C18 28 25 15 35 0" stroke="#7bc9ff" strokeWidth="4" fill="white" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 0 C10 12 15 24 15 29 C18 24 25 12 33 0 Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Mascot Waving Otter at Bottom Center */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[480px] xl:w-[580px] pointer-events-none z-10">
              <img
                src={imgWavingMascot}
                alt="Mascot Waving"
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>
        ) : (
          /* Render the standard Quiz Content */
          <>
            {/* Mascot floating in the bottom-left corner */}
            <div className="absolute left-4 bottom-0 w-[180px] md:w-[280px] lg:w-[350px] xl:w-[400px] pointer-events-none z-10">
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
                        className={`flex flex-col items-center justify-center p-[48px] gap-[24px] rounded-[24px] transition-all duration-300 w-full group relative ${cardClass} active:scale-98`}
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

                        {/* Image Box */}
                        <div className="w-full aspect-square rounded-2xl overflow-hidden relative flex items-center justify-center">
                          <div className="relative w-[180px] h-[180px] overflow-hidden rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                            <img
                              src={opt.sprite}
                              alt={opt.label}
                              style={opt.style}
                              className="absolute max-w-none block select-none pointer-events-none"
                            />
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
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
