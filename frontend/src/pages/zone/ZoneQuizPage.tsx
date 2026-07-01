import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

// Assets
const imgHeroBg = "/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png"
const imgMascot = "/assets/97290b237f2446d77cc4e59dc42ddb50825fb101.png"
const imgWavingMascot = "/assets/5c8508f0584418b762ec0cf80207df8624c6d362.png"
const imgSpeaker = "/assets/269beb2cefee3d683dbf75f695c386d5b76b5edd.svg"

// Game Characters Assets
const imgGame1Cd1B151 = "/assets/6c7bc526bd362b47a11aa9c7d746f4389b8c46f8.png" // Fox Toro
const imgGame1Cd1B152 = "/assets/e52feebface7c6bbd4a20aeb2aef85471db4bee7.png" // Bunny
const imgGame1Cd1B153 = "/assets/dc0e309bb4af16fb90296bca4637bb14f3d35198.png" // Bear Lu
const imgGame1Cd1B154 = "/assets/63925aee87c850a6113be59e33393056ca99178b.png" // Turtle

// Cloud Slots Assets
const imgVectorSlotPurple = "/assets/1ce341ee1fe0272a9d1a7133811c3fa06fc94975.svg" // Dotted Purple
const imgVectorSlotOrange = "/assets/84d543ff31b420e1961485eb4b46cfca878ca41e.svg" // Dotted Orange
const imgVectorSlotRed = "/assets/8b45b44124fca2b65ef4a268b418ccf0dfaae740.svg"    // Dotted Red
const imgVectorSlotBlue = "/assets/5baa015f94540c645b07d1a5abfe41a901abec02.svg"   // Dotted Blue

// Cloud Draggables Assets
const imgCloudYellow = "/assets/a22cb2f9edc52b52cd16b51dcc742598104e1e5e.png" // Yellow Cloud
const imgCloudBlue = "/assets/3e9edb9d1e8de4aa2416bf99d25bc8fe79a49589.png"   // Blue Cloud
const imgCloudRed = "/assets/4a0bc8ca4cd8ff855e9199aa605a764c279653b6.png"    // Red Cloud
const imgCloudPurple = "/assets/6531d04afb1a13034e11ba68f888ee80f43200bf.png" // Purple Cloud

// Sidebar assets
const imgDao11 = "/assets/78cf394c6936fb3cee36951b4f171158844bf106.png" // Step 1 preview
const imgDao12 = "/assets/1188aec46cc4437e1d55068374629cd872cc6644.png" // Step 2 preview

// General UI SVGs
const imgCheckIcon = "/assets/e033de24e910c9292c8e115cadfe468032a594fb.svg" // check outline
const imgBackIcon = "/assets/055350b03616ab321b656165a521bc60bd02c4b7.svg"  // back arrow

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

const emotionsList = [
  { id: 'vui', label: 'Vui', textColor: '#fea01f', cloudImage: imgCloudYellow },
  { id: 'buon', label: 'Buồn', textColor: '#0a7ad8', cloudImage: imgCloudBlue },
  { id: 'gian', label: 'Giận', textColor: '#e71c3d', cloudImage: imgCloudRed },
  { id: 'so', label: 'Sợ', textColor: '#8234e4', cloudImage: imgCloudPurple }
]

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
  const [showGame, setShowGame] = useState(false)
  const navigateTimeoutRef = useRef<any>(null)

  const introText = "Chúc mừng bé đã hoàn thành các câu hỏi! Giờ chúng ta hãy cùng nhau chơi game nhé!"

  // Game States
  const [placedEmotions, setPlacedEmotions] = useState<Record<string, string | null>>({
    bunny: null,
    fox: null,
    bear: null,
    turtle: null
  })
  const [selectedEmotionId, setSelectedEmotionId] = useState<string | null>(null)
  const [gameChecked, setGameChecked] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Reset page state when lessonId changes
  useEffect(() => {
    setSelectedOptionId(null)
    setIsChecked(false)
    setIsCorrect(false)
    setShowIntro(false)
    setShowGame(false)
    setGameChecked(false)
    setShowSuccessModal(false)
    setPlacedEmotions({
      bunny: null,
      fox: null,
      bear: null,
      turtle: null
    })
    setSelectedEmotionId(null)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current)
    }
  }, [lessonId])

  // Handle transition from intro view to game
  useEffect(() => {
    if (showIntro) {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current)
      }
      navigateTimeoutRef.current = setTimeout(() => {
        setShowIntro(false)
        setShowGame(true)
      }, 5000)
    }
  }, [showIntro])

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
    const correct = optionId === quiz.correctOptionId
    setIsCorrect(correct)
    setIsChecked(true)

    // Auto-navigate to next or to intro after 2.5 seconds
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

  // Game Logic Handlers
  const handleDragStart = (e: React.DragEvent, emotionId: string) => {
    e.dataTransfer.setData("text/plain", emotionId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, cardId: string) => {
    e.preventDefault()
    const emotionId = e.dataTransfer.getData("text/plain")
    if (emotionId) {
      placeEmotion(cardId, emotionId)
    }
  }

  const placeEmotion = (cardId: string, emotionId: string) => {
    setPlacedEmotions(prev => {
      const next = { ...prev }
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

  const handleSelectEmotion = (emotionId: string) => {
    setSelectedEmotionId(emotionId)
  }

  const handleSlotClick = (cardId: string) => {
    if (selectedEmotionId) {
      placeEmotion(cardId, selectedEmotionId)
      setSelectedEmotionId(null)
    } else if (placedEmotions[cardId]) {
      setPlacedEmotions(prev => ({ ...prev, [cardId]: null }))
      setGameChecked(false)
    }
  }

  const handleCheckAnswers = () => {
    const isAllCorrect = 
      placedEmotions.bunny === 'vui' &&
      placedEmotions.fox === 'buon' &&
      placedEmotions.bear === 'gian' &&
      placedEmotions.turtle === 'so'

    setGameChecked(true)
    if (isAllCorrect) {
      setShowSuccessModal(true)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance("Chúc mừng bé đã trả lời đúng toàn bộ cảm xúc!")
        utterance.lang = 'vi-VN'
        window.speechSynthesis.speak(utterance)
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance("Có câu trả lời chưa đúng rồi, bé hãy kiểm tra và thử lại nhé!")
        utterance.lang = 'vi-VN'
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const handleSpeakInstruction = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance("Con hãy kéo thả các đám mây cảm xúc ở dưới vào đúng ô tròn của các bạn nhỏ nhé!")
      utterance.lang = 'vi-VN'
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const getCloudImage = (emotionId: string) => {
    switch (emotionId) {
      case 'vui': return imgCloudYellow
      case 'buon': return imgCloudBlue
      case 'gian': return imgCloudRed
      case 'so': return imgCloudPurple
      default: return ''
    }
  }

  const getEmotionLabel = (emotionId: string) => {
    switch (emotionId) {
      case 'vui': return 'Vui'
      case 'buon': return 'Buồn'
      case 'gian': return 'Giận'
      case 'so': return 'Sợ'
      default: return ''
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

        {showGame ? (
          /* Render the Drag-and-Drop Game View */
          <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center px-4 md:px-8 py-4 animate-in fade-in duration-500">
            
            {/* Sidebar Instructions (Left) */}
            <div className="w-full lg:w-[320px] bg-white rounded-[24px] shadow-lg border border-gray-100 flex flex-col items-center justify-between p-6 shrink-0 relative gap-6">
              
              {/* How to Play Title Speaker Button */}
              <button
                onClick={handleSpeakInstruction}
                className="bg-[#fea01f] hover:bg-[#e08b15] active:scale-95 transition-all px-6 py-2.5 rounded-[40px] flex items-center gap-2 text-white font-vietnam font-bold text-[16px] shadow-md cursor-pointer"
              >
                <img src={imgSpeaker} alt="Speak" className="w-5 h-5 invert brightness-0" />
                <span>HƯỚNG DẪN CHƠI</span>
              </button>

              {/* Step 1 & 2 Box */}
              <div className="bg-[#e5f2ff] rounded-[12px] p-4 flex flex-col gap-4 w-full items-center">
                
                {/* Step 1 */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2 items-center">
                    <span className="bg-[#0a7ad8] rounded-full text-white text-[14px] font-bold w-6 h-6 flex items-center justify-center">1</span>
                    <span className="font-vietnam font-bold text-[#37393e] text-[15px]">Chọn cảm xúc</span>
                  </div>
                  <div className="w-full h-[110px] bg-white rounded-[12px] overflow-hidden border border-blue-100 flex items-center justify-center p-2">
                    <img src={imgDao11} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                {/* Down Arrow */}
                <svg className="w-6 h-6 text-[#0a7ad8] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
                </svg>

                {/* Step 2 */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2 items-center">
                    <span className="bg-[#fea01f] rounded-full text-white text-[14px] font-bold w-6 h-6 flex items-center justify-center">2</span>
                    <span className="font-vietnam font-bold text-[#37393e] text-[15px]">Kéo vào ô đúng</span>
                  </div>
                  <div className="w-full h-[110px] bg-white rounded-[12px] overflow-hidden border border-orange-100 flex items-center justify-center p-2">
                    <img src={imgDao12} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

              </div>

              {/* Speech Bubble */}
              <div className="bg-white border-2 border-[#7bc9ff] rounded-[24px] p-4 shadow-sm relative w-full text-center">
                <span className="font-vietnam text-[#001e2f] text-[15px] font-bold leading-relaxed">
                  Chọn cảm xúc rồi kéo vào ô đúng nhé!
                </span>
                {/* Bubble Tail */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#7bc9ff]"></div>
                <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white"></div>
              </div>

              {/* Side Mascot Waving */}
              <div className="w-[180px] h-[180px] flex items-center justify-center overflow-hidden">
                <img src={imgWavingMascot} alt="" className="max-h-full object-contain" />
              </div>

            </div>

            {/* Game Workspace (Right) */}
            <div className="flex-1 flex flex-col gap-6 items-center w-full relative">
              
              {/* Header Action Bar */}
              <div className="w-full flex items-center justify-between z-20">
                <button
                  onClick={() => navigate('/zone/cam-xuc')}
                  className="bg-white hover:bg-red-50 active:scale-95 transition-all border border-[#e83552] text-[#e83552] font-baloo text-[16px] md:text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <img src={imgBackIcon} alt="" className="w-5 h-5" />
                  <span>Quay lại</span>
                </button>

                <button
                  onClick={handleCheckAnswers}
                  className="bg-[#339e4a] hover:bg-[#2c883f] active:scale-95 transition-all border border-white text-white font-baloo text-[16px] md:text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <img src={imgCheckIcon} alt="" className="w-5 h-5 invert brightness-0" />
                  <span>Hoàn thành</span>
                </button>
              </div>

              {/* Main Title Banner */}
              <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="font-baloo font-bold text-[36px] md:text-[48px] text-[#fea01f] leading-none drop-shadow-sm select-none">
                  Kéo thả cảm xúc
                </h1>
                
                {/* Heading Capsule with Dotted Border */}
                <div className="bg-[#f2fbef] border-4 border-[#339e4a] rounded-[1000px] p-1 flex items-center justify-center shadow-sm">
                  <div className="border-2 border-[#02522b] border-dashed rounded-[100px] px-6 py-1.5 flex items-center justify-center">
                    <span className="font-baloo text-[18px] md:text-[24px] text-[#418457] font-bold leading-normal">
                      Con đang cảm thấy gì ?
                    </span>
                  </div>
                </div>
              </div>

              {/* Row of 4 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1100px] justify-center mt-2">
                
                {/* Card 1: Bunny (Vui) */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'bunny')}
                  className={`border-[3px] rounded-[24px] p-6 flex flex-col items-center gap-4 text-center select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-all ${
                    gameChecked 
                      ? (placedEmotions.bunny === 'vui' ? 'border-[#339e4a] bg-[#eefcf2]' : 'border-[#ef4444] bg-[#fdf2f2]')
                      : 'border-[#8234e4] bg-gradient-to-b from-[#f2f0fe] via-[#e9d8ff] to-[#f2f0fe]'
                  }`}
                  style={!gameChecked ? { backgroundImage: 'linear-gradient(181deg, rgb(242, 240, 254) 23%, rgb(233, 216, 255) 88%, rgb(242, 240, 254) 108%)' } : undefined}
                >
                  <div 
                    onClick={() => handleSlotClick('bunny')}
                    className="w-[134px] h-[120px] border-[3px] border-white rounded-[24px] relative flex items-center justify-center overflow-hidden cursor-pointer shadow-inner bg-white/40 hover:bg-white/60 transition-colors"
                  >
                    {placedEmotions.bunny ? (
                      <img src={getCloudImage(placedEmotions.bunny)} alt="" className="w-[110px] h-auto object-contain" />
                    ) : (
                      <img src={imgVectorSlotPurple} alt="" className="w-[110px] h-auto object-contain opacity-85" />
                    )}
                  </div>
                  <img src={imgGame1Cd1B152} alt="Bunny" className="w-[160px] h-[160px] object-contain transform hover:scale-105 transition-transform duration-300 pointer-events-none" />
                  {gameChecked && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                      {placedEmotions.bunny === 'vui' ? (
                        <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                      ) : (
                        <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                      )}
                    </div>
                  )}
                  <span className={`font-vietnam font-bold text-[16px] transition-colors ${gameChecked ? (placedEmotions.bunny === 'vui' ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#8234e4]'}`}>
                    {placedEmotions.bunny ? getEmotionLabel(placedEmotions.bunny) : "???"}
                  </span>
                </div>

                {/* Card 2: Fox Toro (Buồn) */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'fox')}
                  className={`border-[3px] rounded-[24px] p-6 flex flex-col items-center gap-4 text-center select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-all ${
                    gameChecked 
                      ? (placedEmotions.fox === 'buon' ? 'border-[#339e4a] bg-[#eefcf2]' : 'border-[#ef4444] bg-[#fdf2f2]')
                      : 'border-[#fea01f] bg-gradient-to-b from-[#fef9ed] via-[#fff4bf] to-[#fef9ed]'
                  }`}
                  style={!gameChecked ? { backgroundImage: 'linear-gradient(181deg, rgb(254, 249, 237) 23%, rgb(255, 244, 191) 88%, rgb(254, 249, 237) 108%)' } : undefined}
                >
                  <div 
                    onClick={() => handleSlotClick('fox')}
                    className="w-[134px] h-[120px] border-[3px] border-white rounded-[24px] relative flex items-center justify-center overflow-hidden cursor-pointer shadow-inner bg-white/40 hover:bg-white/60 transition-colors"
                  >
                    {placedEmotions.fox ? (
                      <img src={getCloudImage(placedEmotions.fox)} alt="" className="w-[110px] h-auto object-contain" />
                    ) : (
                      <img src={imgVectorSlotOrange} alt="" className="w-[110px] h-auto object-contain opacity-85" />
                    )}
                  </div>
                  <img src={imgGame1Cd1B151} alt="Toro" className="w-[160px] h-[160px] object-contain transform hover:scale-105 transition-transform duration-300 pointer-events-none" />
                  {gameChecked && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                      {placedEmotions.fox === 'buon' ? (
                        <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                      ) : (
                        <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                      )}
                    </div>
                  )}
                  <span className={`font-vietnam font-bold text-[16px] transition-colors ${gameChecked ? (placedEmotions.fox === 'buon' ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#fea01f]'}`}>
                    {placedEmotions.fox ? getEmotionLabel(placedEmotions.fox) : "???"}
                  </span>
                </div>

                {/* Card 3: Bear Lu (Giận) */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'bear')}
                  className={`border-[3px] rounded-[24px] p-6 flex flex-col items-center gap-4 text-center select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-all ${
                    gameChecked 
                      ? (placedEmotions.bear === 'gian' ? 'border-[#339e4a] bg-[#eefcf2]' : 'border-[#ef4444] bg-[#fdf2f2]')
                      : 'border-[#e55c72] bg-gradient-to-b from-[#fef0f0] via-[#ffc9d1] to-[#fef0f0]'
                  }`}
                  style={!gameChecked ? { backgroundImage: 'linear-gradient(181deg, rgb(254, 240, 240) 23%, rgb(255, 201, 209) 88%, rgb(254, 240, 240) 108%)' } : undefined}
                >
                  <div 
                    onClick={() => handleSlotClick('bear')}
                    className="w-[134px] h-[120px] border-[3px] border-white rounded-[24px] relative flex items-center justify-center overflow-hidden cursor-pointer shadow-inner bg-white/40 hover:bg-white/60 transition-colors"
                  >
                    {placedEmotions.bear ? (
                      <img src={getCloudImage(placedEmotions.bear)} alt="" className="w-[110px] h-auto object-contain" />
                    ) : (
                      <img src={imgVectorSlotRed} alt="" className="w-[110px] h-auto object-contain opacity-85" />
                    )}
                  </div>
                  <img src={imgGame1Cd1B153} alt="Lu" className="w-[160px] h-[160px] object-contain transform hover:scale-105 transition-transform duration-300 pointer-events-none" />
                  {gameChecked && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                      {placedEmotions.bear === 'gian' ? (
                        <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                      ) : (
                        <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                      )}
                    </div>
                  )}
                  <span className={`font-vietnam font-bold text-[16px] transition-colors ${gameChecked ? (placedEmotions.bear === 'gian' ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#e55c72]'}`}>
                    {placedEmotions.bear ? getEmotionLabel(placedEmotions.bear) : "???"}
                  </span>
                </div>

                {/* Card 4: Turtle (Sợ) */}
                <div 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'turtle')}
                  className={`border-[3px] rounded-[24px] p-6 flex flex-col items-center gap-4 text-center select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.05)] transition-all ${
                    gameChecked 
                      ? (placedEmotions.turtle === 'so' ? 'border-[#339e4a] bg-[#eefcf2]' : 'border-[#ef4444] bg-[#fdf2f2]')
                      : 'border-[#0a7ad8] bg-gradient-to-b from-[#f4fafd] via-[#e5f2ff] to-[#f4fafd]'
                  }`}
                  style={!gameChecked ? { backgroundImage: 'linear-gradient(181deg, rgb(244, 250, 253) 23%, rgb(229, 242, 255) 88%, rgb(244, 250, 253) 108%)' } : undefined}
                >
                  <div 
                    onClick={() => handleSlotClick('turtle')}
                    className="w-[134px] h-[120px] border-[3px] border-white rounded-[24px] relative flex items-center justify-center overflow-hidden cursor-pointer shadow-inner bg-white/40 hover:bg-white/60 transition-colors"
                  >
                    {placedEmotions.turtle ? (
                      <img src={getCloudImage(placedEmotions.turtle)} alt="" className="w-[110px] h-auto object-contain" />
                    ) : (
                      <img src={imgVectorSlotBlue} alt="" className="w-[110px] h-auto object-contain opacity-85" />
                    )}
                  </div>
                  <img src={imgGame1Cd1B154} alt="Turtle" className="w-[160px] h-[160px] object-contain transform hover:scale-105 transition-transform duration-300 pointer-events-none" />
                  {gameChecked && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                      {placedEmotions.turtle === 'so' ? (
                        <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                      ) : (
                        <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                      )}
                    </div>
                  )}
                  <span className={`font-vietnam font-bold text-[16px] transition-colors ${gameChecked ? (placedEmotions.turtle === 'so' ? 'text-[#339e4a]' : 'text-[#ef4444]') : 'text-[#0a7ad8]'}`}>
                    {placedEmotions.turtle ? getEmotionLabel(placedEmotions.turtle) : "???"}
                  </span>
                </div>

              </div>

              {/* Bottom Drawer containing Draggable Clouds */}
              <div className="bg-white border border-[#c4c9d4] rounded-[24px] p-6 flex flex-wrap gap-6 items-center justify-center shadow-md w-full max-w-[800px] mt-4 z-20">
                {emotionsList.map(emotion => {
                  const isPlaced = Object.values(placedEmotions).includes(emotion.id)
                  const isSelected = selectedEmotionId === emotion.id
                  return (
                    <div 
                      key={emotion.id}
                      draggable={!isPlaced}
                      onDragStart={(e) => handleDragStart(e, emotion.id)}
                      onClick={() => !isPlaced && handleSelectEmotion(emotion.id)}
                      className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 relative ${
                        isPlaced 
                          ? 'opacity-30 cursor-not-allowed scale-90' 
                          : (isSelected 
                              ? 'scale-110 border-4 border-[#339e4a] rounded-[16px] p-2 bg-[#f2fbef]' 
                              : 'hover:scale-105 active:scale-95')
                      }`}
                    >
                      <div className="w-[120px] h-[100px] relative flex items-center justify-center">
                        <img src={emotion.cloudImage} alt={emotion.label} className="max-w-full max-h-full object-contain pointer-events-none select-none" />
                      </div>
                      <span 
                        style={{ color: emotion.textColor }}
                        className="font-baloo font-bold text-[16px] tracking-wide"
                      >
                        {emotion.label}
                      </span>
                    </div>
                  )
                })}
              </div>

            </div>

          </div>
        ) : showIntro ? (
          /* Render the Game Intro View full-screen overlay styled */
          <div 
            onClick={() => {
              if (navigateTimeoutRef.current) clearTimeout(navigateTimeoutRef.current)
              setShowIntro(false)
              setShowGame(true)
            }}
            className="absolute inset-0 cursor-pointer z-10 flex flex-col items-center justify-start pt-[112px] md:pt-[144px]"
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
              className={`absolute right-4 top-4 md:right-8 md:top-8 bg-[#0a7ad8] hover:bg-[#0863b0] active:scale-95 transition-all p-3 rounded-full flex items-center justify-center shadow-md z-20 ${isSpeaking ? 'animate-pulse scale-105' : ''}`}
              title="Nghe hướng dẫn"
            >
              <img src={imgSpeaker} alt="Speak" className="w-6 h-6 select-none" />
            </button>

            {/* Speech Bubble (Centered and larger width, with brand green border) */}
            <div className="w-[92%] max-w-[900px] bg-white border-4 border-[#339E4A] rounded-[100px] px-8 py-6 md:px-16 md:py-8 shadow-lg flex flex-col items-center justify-center text-center z-15 relative">
              <p className="font-baloo font-bold text-[20px] sm:text-[26px] md:text-[34px] text-[#001e2f] leading-snug md:leading-[52px]">
                {introText}
              </p>
              {/* Custom Waving Curved Tail pointing down-left with brand green border */}
              <div className="absolute -bottom-[28px] left-[45%] w-[48px] h-[32px] pointer-events-none">
                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M0 0 C10 15 15 28 15 32 C18 28 25 15 35 0" stroke="#339E4A" strokeWidth="4" fill="white" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 0 C10 12 15 24 15 29 C18 24 25 12 33 0 Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Mascot Waving Otter at Bottom Center (very large, sitting flush at the bottom of the banner) */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[460px] sm:w-[650px] lg:w-[860px] xl:w-[1020px] pointer-events-none z-10">
              <img
                src={imgWavingMascot}
                alt="Mascot Waving"
                className="w-full h-auto object-contain select-none block"
              />
            </div>
          </div>
        ) : (
          /* Render the standard Quiz Content */
          <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-[48px] items-center justify-center min-h-[600px] py-8">
            
            {/* Mascot floating in the bottom-left corner */}
            <div className="absolute left-4 bottom-0 w-[180px] md:w-[280px] lg:w-[350px] xl:w-[400px] pointer-events-none z-10">
              <img
                src={imgMascot}
                alt="Mascot"
                className="w-full h-auto object-contain select-none pointer-events-none transform origin-bottom-left hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Back Button */}
            <div className="w-full flex justify-start pl-4 md:pl-0">
              <button
                onClick={() => navigate('/zone/cam-xuc')}
                className="bg-white hover:bg-red-50 active:scale-95 transition-all border border-[#e83552] text-[#e83552] font-baloo text-[16px] md:text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Quay lại</span>
              </button>
            </div>

            {/* Question Bubble */}
            <div className="w-full bg-white border-[4px] border-[#339E4A] rounded-[100px] flex items-center justify-start pl-[40px] pr-[24px] py-[24px] gap-[24px] shadow-sm">
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
                    className={`flex flex-col items-center justify-center p-[48px] gap-[24px] rounded-[24px] transition-all duration-300 w-full group relative ${cardClass} active:scale-98 cursor-pointer`}
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
        )}
      </main>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border-[6px] border-[#339e4a] p-8 max-w-[500px] w-full text-center shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
            
            {/* Mascot Otter image */}
            <div className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden">
              <img src={imgWavingMascot} alt="Congratulations" className="max-h-full object-contain" />
            </div>

            <h2 className="font-baloo font-bold text-[28px] md:text-[32px] text-[#339e4a] leading-tight">
              Chúc mừng bé!
            </h2>
            
            <p className="font-vietnam font-medium text-[#37393e] text-[16px] md:text-[18px] leading-relaxed">
              Bé đã xuất sắc kéo thả đúng toàn bộ các cảm xúc của các bạn nhỏ rồi đấy!
            </p>

            <button
              onClick={() => {
                setShowSuccessModal(false)
                navigate('/zone/cam-xuc')
              }}
              className="bg-[#339e4a] hover:bg-[#2c883f] active:scale-95 transition-all text-white font-baloo text-[20px] font-bold rounded-[40px] px-12 py-3 shadow-md cursor-pointer w-full"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
