import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const imgHeroBg = "/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png"
const imgMascot = "/assets/97290b237f2446d77cc4e59dc42ddb50825fb101.png"
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
    question: "Bạn Roto mong muốn nhận được món quà nào?",
    correctOptionId: 3,
    options: [
      {
        id: 1,
        label: "Hộp quà",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
      },
      {
        id: 2,
        label: "Máy chơi game",
        sprite: sprite2,
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
      },
      {
        id: 3,
        label: "Bóng đá",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
      },
      {
        id: 4,
        label: "Cây kem",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-241.97%', top: '-10.97%' }
      }
    ]
  },
  2: {
    lessonId: 2,
    lessonTitle: "Nỗi buồn bé nhỏ",
    question: "Khi bạn Roto cảm thấy buồn và mệt mỏi, món tráng miệng mát lạnh nào giúp bạn ấy thấy thoải mái hơn?",
    correctOptionId: 4,
    options: [
      {
        id: 1,
        label: "Hộp quà",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
      },
      {
        id: 2,
        label: "Máy chơi game",
        sprite: sprite2,
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
      },
      {
        id: 3,
        label: "Bóng đá",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
      },
      {
        id: 4,
        label: "Cây kem",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-241.97%', top: '-10.97%' }
      }
    ]
  },
  3: {
    lessonId: 3,
    lessonTitle: "Cơn giận đang tới",
    question: "Khi tức giận, Roto muốn ra sân để vận động mạnh xua tan cơn giận, bạn ấy cần dùng dụng cụ nào?",
    correctOptionId: 3,
    options: [
      {
        id: 1,
        label: "Hộp quà",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
      },
      {
        id: 2,
        label: "Máy chơi game",
        sprite: sprite2,
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
      },
      {
        id: 3,
        label: "Bóng đá",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
      },
      {
        id: 4,
        label: "Cây kem",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-241.97%', top: '-10.97%' }
      }
    ]
  },
  4: {
    lessonId: 4,
    lessonTitle: "Khi con thấy sợ",
    question: "Để vượt qua nỗi sợ bóng tối, Roto nhận được một phần quà bất ngờ giúp cổ vũ tinh thần, đó là vật nào?",
    correctOptionId: 1,
    options: [
      {
        id: 1,
        label: "Hộp quà",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
      },
      {
        id: 2,
        label: "Máy chơi game",
        sprite: sprite2,
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
      },
      {
        id: 3,
        label: "Bóng đá",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
      },
      {
        id: 4,
        label: "Cây kem",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-241.97%', top: '-10.97%' }
      }
    ]
  },
  5: {
    lessonId: 5,
    lessonTitle: "Nói ra cảm xúc của mình",
    question: "Khi muốn chia sẻ câu chuyện vui vẻ cùng bạn bè qua trò chơi điện tử, Roto sẽ sử dụng thiết bị nào?",
    correctOptionId: 2,
    options: [
      {
        id: 1,
        label: "Hộp quà",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' }
      },
      {
        id: 2,
        label: "Máy chơi game",
        sprite: sprite2,
        style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' }
      },
      {
        id: 3,
        label: "Bóng đá",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' }
      },
      {
        id: 4,
        label: "Cây kem",
        sprite: sprite1,
        style: { height: '110.75%', width: '320.4%', left: '-241.97%', top: '-10.97%' }
      }
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

  // Reset page state when lessonId changes
  useEffect(() => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [lessonId])

  const handleSelect = (optionId: number) => {
    if (isChecked) return // lock after check
    setSelectedOptionId(optionId)
    // Auto-check immediately
    const correct = optionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)
  }

  const handleCheck = () => {
    if (selectedOptionId === null) return
    const correct = selectedOptionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full justify-center">
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
                    <span className={`font-vietnam font-bold text-[16px] leading-[24px] transition-colors ${isSelected ? (isChecked ? (isCorrect ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#0a7ad8]') : 'text-[#37393e] group-hover:text-[#0a7ad8]'}`}>
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Action Bar (Check Answer / Next question buttons) */}
            <div className="w-full flex justify-center items-center h-16">
              {!isChecked ? (
                <button
                  onClick={handleCheck}
                  disabled={selectedOptionId === null}
                  className={`flex items-center justify-center gap-[8px] rounded-[40px] px-[24px] py-[12px] font-vietnam font-bold text-[16px] border border-solid transition-all transform duration-150 ${selectedOptionId === null ? 'bg-[#cbd5e1] text-[#94a3b8] border-white/50 cursor-not-allowed shadow-none' : 'bg-[#339E4A] text-white border-white hover:scale-105 active:scale-95 shadow-md'}`}
                >
                  Câu hỏi tiếp theo
                </button>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <span className={`font-vietnam font-bold text-lg ${isCorrect ? 'text-[#339e4a]' : 'text-[#ef4444]'}`}>
                    {isCorrect ? '🎉 Tuyệt vời! Bé đã trả lời đúng rồi!' : '💪 Chưa đúng rồi, bé thử chọn lại nhé!'}
                  </span>
                  <div className="flex gap-3">
                    {!isCorrect && (
                      <button
                        onClick={() => {
                          setIsChecked(false)
                          setSelectedOptionId(null)
                        }}
                        className="px-6 py-2 bg-white text-[#575e70] border border-[#cbd5e1] hover:bg-slate-50 font-vietnam font-bold rounded-full text-[15px] shadow-sm transition-all"
                      >
                        Thử lại
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (lessonId < 5) {
                          navigate(`/zone/cam-xuc/lesson/${lessonId + 1}`)
                        } else {
                          navigate('/zone/cam-xuc')
                        }
                      }}
                      className="px-6 py-2 bg-[#0a7ad8] hover:bg-[#0863b0] text-white font-vietnam font-bold rounded-full text-[15px] shadow-sm transition-all hover:scale-105"
                    >
                      {lessonId < 5 ? 'Bài tiếp theo' : 'Hoàn thành chủ đề'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
      </main>

      <Footer />
    </div>
  )
}
