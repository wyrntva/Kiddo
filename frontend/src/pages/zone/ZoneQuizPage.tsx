import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'

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

// Cloud Draggables Assets
const imgCloudYellow = "/assets/a22cb2f9edc52b52cd16b51dcc742598104e1e5e.png" // Yellow Cloud
const imgCloudBlue = "/assets/3e9edb9d1e8de4aa2416bf99d25bc8fe79a49589.png"   // Blue Cloud
const imgCloudRed = "/assets/4a0bc8ca4cd8ff855e9199aa605a764c279653b6.png"    // Red Cloud
const imgCloudPurple = "/assets/6531d04afb1a13034e11ba68f888ee80f43200bf.png" // Purple Cloud

// Sidebar assets
const imgDao11 = "/assets/78cf394c6936fb3cee36951b4f171158844bf106.png" // Step 1 preview
const imgDao12 = "/assets/1188aec46cc4437e1d55068374629cd872cc6644.png" // Step 2 preview

// General UI SVGs
const imgIcon = "/assets/c913a47b764e1e79b2c4c7abdd387b731a060c45.svg" // down arrow icon
const imgVector1 = "/assets/8f5a664848c186957dd46a3e7b85e3ccceb643f1.svg" // tail base
const imgVector2 = "/assets/6d192bbe69b13519caf699b3b46ddb09f844d570.svg" // tail outline

const sprite1 = "/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png"
const renderSlotOutline = (color: string) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="136" height="122" viewBox="0 0 136 122" fill="none" className="w-full h-full object-contain pointer-events-none select-none">
    <path 
      d="M40.4525 118.659C26.3438 112.542 24.5362 98.5723 24.5362 98.5723C24.5362 98.5723 9.17638 98.9198 2.36501 82.5864C-4.44637 66.2531 11.4695 53.8119 11.4695 53.8119C11.4695 53.8119 2.36503 38.4516 15.5702 24.5509C26.8607 12.6657 41.9121 19.5466 41.9121 19.5466C41.9121 19.5466 48.6568 -2.18724 71.5206 1.33668C90.0091 4.18624 93.8318 18.8515 93.8318 18.8515C93.8318 18.8515 109.262 12.3876 120.035 24.2728C133.353 38.9669 124.482 53.7424 124.482 53.7424C124.482 53.7424 140.112 64.8876 132.754 83.4204C127.124 97.5992 111.068 98.5723 111.068 98.5723C111.068 98.5723 110.443 110.874 96.0559 118.172C80.1792 126.226 68.1149 114.141 68.1149 114.141C68.1149 114.141 56.792 125.742 40.4525 118.659Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeDasharray="6.67 6.67"
    />
  </svg>
)

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
  const [currentLessonId, setCurrentLessonId] = useState<number>(id ? parseInt(id, 10) : 1)
  const quiz = quizDatabase[currentLessonId] || quizDatabase[1]

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

  // Sync currentLessonId with URL parameter if it changes (e.g. user navigates from map)
  useEffect(() => {
    if (id) {
      setCurrentLessonId(parseInt(id, 10))
    }
  }, [id])

  // Lock body scroll while quiz/game is active
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = 'hidden';
    
    return () => {
      document.documentElement.style.overflowY = originalOverflow;
    };
  }, []);

  // Reset page state when currentLessonId changes
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
  }, [currentLessonId])

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

    // Auto-advance to next or to intro after 1.0 second (faster state transition)
    navigateTimeoutRef.current = setTimeout(() => {
      if (currentLessonId < 4) {
        setCurrentLessonId(prev => prev + 1)
      } else {
        setShowIntro(true)
      }
    }, 1000)
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
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance("Có câu trả lời chưa đúng rồi, bé hãy kiểm tra và thử lại nhé!")
        utterance.lang = 'vi-VN'
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  const handleResetGame = () => {
    setPlacedEmotions({
      bunny: null,
      fox: null,
      bear: null,
      turtle: null
    })
    setGameChecked(false)
    setSelectedEmotionId(null)
    setShowSuccessModal(false)
  }

  const handleNextLesson = () => {
    const nextLessonId = currentLessonId + 1
    if (quizDatabase[nextLessonId]) {
      setCurrentLessonId(nextLessonId)
      setPlacedEmotions({
        bunny: null,
        fox: null,
        bear: null,
        turtle: null
      })
      setGameChecked(false)
      setSelectedEmotionId(null)
      setShowSuccessModal(false)
      navigate(`/zone/emotions/lesson/${nextLessonId}`)
    } else {
      navigate('/zone/emotions')
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



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-height: 850px) {
          .mascot-container {
            width: 110px !important;
            height: 110px !important;
          }
          .cloud-slot-container {
            width: 90px !important;
            height: 80px !important;
          }
          .game-workspace-stack {
            gap: 16px !important;
          }
          .centered-content-stack {
            gap: 16px !important;
          }
        }
        @media (max-height: 720px) {
          .mascot-container {
            width: 90px !important;
            height: 90px !important;
          }
          .cloud-slot-container {
            width: 75px !important;
            height: 65px !important;
          }
          .game-workspace-stack {
            gap: 12px !important;
          }
          .centered-content-stack {
            gap: 12px !important;
          }
        }
      `}} />

      <main className="flex-1 h-[calc(100vh-64px)] relative overflow-hidden">
        {/* Full-section background landscape image, always visible */}
        <img
          src={imgHeroBg}
          alt=""
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {showGame ? (
          /* Render the Drag-and-Drop Game View in a flex row exactly like Figma node 199:4012 */
          <div className="relative z-10 w-full h-full flex flex-row gap-[48px] items-stretch justify-center p-[48px] animate-in fade-in duration-500">
            
            {/* Sidebar Instructions (Left) */}
            <div className="w-[320px] h-full bg-white border border-[#c4c9d4] border-solid flex flex-col items-center justify-between pt-[24px] px-[24px] pb-[8px] relative rounded-[24px] shrink-0 gap-4">
              
              <div className="flex flex-col gap-[24px] items-center relative shrink-0 w-full">
                {/* How to Play Title Speaker Button */}
                <button
                  onClick={handleSpeakInstruction}
                  className="bg-[#fea01f] hover:bg-[#e08b15] active:scale-95 transition-all px-[16px] py-[8px] rounded-[40px] flex items-center gap-[8px] text-white font-vietnam font-medium text-[16px] shadow-sm cursor-pointer shrink-0"
                >
                  <img src={imgSpeaker} alt="Speak" className="w-[24px] h-[24px] invert brightness-0" />
                  <span>HƯỚNG DẪN CHƠI</span>
                </button>

                {/* Step 1 & 2 Box */}
                <div className="bg-[#e5f2ff] rounded-[12px] p-[16px] flex flex-col items-center w-full shrink-0">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col gap-[12px] items-start w-full">
                    <div className="flex gap-[12px] items-center w-full">
                      <div className="bg-[#0a7ad8] rounded-[100px] flex items-center justify-center p-[4px] shrink-0 size-[24px]">
                        <span className="font-baloo text-[16px] text-white font-normal leading-[28px]">1</span>
                      </div>
                      <span className="font-vietnam font-medium text-[#37393e] text-[16px] leading-[24px]">Chọn cảm xúc</span>
                    </div>
                    <div className="border border-[#0a7ad8] h-[120px] relative rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
                      <img src={imgDao11} alt="" className="absolute max-w-none object-contain rounded-[12px] size-full" />
                    </div>
                  </div>

                  {/* Down Arrow */}
                  <div className="flex gap-[10px] items-center p-[8px] rounded-[6px] shrink-0">
                    <img src={imgIcon} alt="" className="w-[24px] h-[24px] object-contain pointer-events-none select-none" />
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col gap-[12px] items-start w-full">
                    <div className="flex gap-[12px] items-center w-full">
                      <div className="bg-[#fea01f] rounded-[100px] flex items-center justify-center p-[4px] shrink-0 size-[24px]">
                        <span className="font-baloo text-[16px] text-white font-normal leading-[28px]">2</span>
                      </div>
                      <span className="font-vietnam font-medium text-[#37393e] text-[16px] leading-[24px]">Kéo vào ô đúng</span>
                    </div>
                    <div className="border border-[#fea01f] h-[120px] relative rounded-[12px] shrink-0 w-full overflow-hidden bg-white">
                      <img src={imgDao12} alt="" className="absolute max-w-none object-contain rounded-[12px] size-full" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Portion containing Speech Bubble and Mascot */}
              <div className="flex flex-col items-center pt-[12px] relative shrink-0 w-full gap-2">
                {/* Speech Bubble Parent Wrapper with Shadow */}
                <div className="drop-shadow-[0px_4px_5px_rgba(0,0,0,0.1)] flex flex-col items-end relative shrink-0 w-full">
                  {/* Speech Bubble Card Container */}
                  <div className="bg-white border-2 border-[#7bc9ff] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[1000px] shrink-0 w-full">
                    <span className="font-vietnam text-[#001e2f] text-[16px] font-normal leading-[24px] text-center w-full">
                      Chọn cảm xúc rồi kéo vào ô đúng nhé!
                    </span>
                  </div>
                  {/* Speech Bubble Tail Container */}
                  <div className="h-[25px] relative shrink-0 w-full">
                    <div className="absolute h-[20px] left-[161.3px] top-[1.8px] w-[23.7px]">
                      <img src={imgVector1} alt="" className="absolute inset-[-9%_-20%_-9%_-11%] block max-w-none size-full" />
                    </div>
                    <div className="absolute h-[22px] left-[161px] top-0 w-[24px]">
                      <img src={imgVector2} alt="" className="absolute block inset-0 max-w-none size-full" />
                    </div>
                  </div>
                </div>

                {/* Side Mascot Waving cropped exactly like Figma */}
                <div className="h-[150px] relative shrink-0 w-[238px] overflow-hidden pointer-events-none">
                  <img src={imgWavingMascot} alt="" className="absolute h-[119%] left-[-8%] top-[0%] w-[116%] object-contain max-w-none" />
                </div>
              </div>

            </div>

            {/* Game Workspace (Right) - takes remaining space, relative to place absolute buttons */}
            <div className="flex-1 h-full flex flex-col items-center relative min-w-0 game-workspace-stack">

              {/* Absolute Action Buttons relative to the Right Workspace */}
              <button
                onClick={() => navigate('/zone/emotions')}
                className="absolute left-0 top-0 z-30 bg-white hover:bg-red-50 active:scale-95 transition-all border border-[#e83552] text-[#e83552] font-baloo text-[16px] md:text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-sm cursor-pointer animate-in fade-in duration-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none" className="w-[13px] h-[10px] shrink-0">
                  <path d="M5.28033 1.28033C5.57322 0.987437 5.57322 0.512563 5.28033 0.21967C4.98744 -0.0732233 4.51256 -0.0732233 4.21967 0.21967L0.21967 4.21967C0.0732233 4.36612 0 4.55806 0 4.75C0 4.85169 0.0202391 4.94866 0.0569091 5.03709C0.0935089 5.12555 0.147763 5.20842 0.21967 5.28033L4.21967 9.28033C4.51256 9.57322 4.98744 9.57322 5.28033 9.28033C5.57322 8.98744 5.57322 8.51256 5.28033 8.21967L2.56066 5.5H12.25C12.6642 5.5 13 5.16421 13 4.75C13 4.33579 12.6642 4 12.25 4H2.56066L5.28033 1.28033Z" fill="#E83552"/>
                </svg>
                <span>Quay lại</span>
              </button>

              {placedEmotions.bunny && placedEmotions.fox && placedEmotions.bear && placedEmotions.turtle && (
                <button
                  onClick={handleCheckAnswers}
                  className="absolute right-0 top-0 z-30 bg-[#339e4a] hover:bg-[#2c883f] active:scale-95 transition-all border border-white text-white font-baloo text-[16px] md:text-[18px] font-bold rounded-[40px] px-6 py-2.5 flex items-center gap-2 shadow-md cursor-pointer animate-in fade-in duration-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[24px] h-[24px] shrink-0">
                    <path d="M22.3173 6.9053L9.2199 19.8198C9.1039 19.9351 8.94599 20 8.78126 20C8.61653 20 8.45863 19.9351 8.34263 19.8198L1.68274 13.2529C1.56579 13.1385 1.5 12.9828 1.5 12.8204C1.5 12.658 1.56579 12.5023 1.68274 12.3879L2.54766 11.535C2.66367 11.4197 2.82157 11.3548 2.9863 11.3548C3.15103 11.3548 3.30894 11.4197 3.42494 11.535L8.77509 16.8105L20.5751 5.17524C20.8195 4.94159 21.2079 4.94159 21.4523 5.17524L22.3173 6.04027C22.4342 6.15466 22.5 6.31036 22.5 6.47279C22.5 6.63522 22.4342 6.79092 22.3173 6.9053Z" fill="white"/>
                  </svg>
                  <span>Hoàn thành</span>
                </button>
              )}

              {/* Main Title Banner (Normal flow to prevent overlapping) */}
              <div className="flex flex-col items-center gap-2 md:gap-3 text-center shrink-0 mb-6 z-20">
                  <h1 
                    style={{
                      WebkitTextStrokeWidth: '8px',
                      WebkitTextStrokeColor: '#FFF',
                      paintOrder: 'stroke fill',
                    }}
                    className="font-baloo font-bold text-[48px] text-[#fea01f] leading-[60px] select-none"
                  >
                    Kéo thả cảm xúc
                  </h1>
                  
                  {/* Heading Capsule with Dotted Border */}
                  <div className="bg-[#f2fbef] border-4 border-[#339e4a] border-solid flex items-center justify-center p-[8px] relative rounded-[1000px] shadow-sm -mt-3">
                    <div className="border-2 border-[#02522b] border-dashed flex flex-col items-start justify-center px-[24px] py-[8px] relative rounded-[100px] shrink-0">
                      <span className="font-baloo text-[24px] text-[#418457] leading-[40px] font-bold whitespace-nowrap">
                        Con đang cảm thấy gì
                      </span>
                    </div>
                </div>
              </div>

              {/* Centered Content Stack (Cards, Bottom Drawer) */}
              <div className="flex-1 w-full flex flex-col items-center justify-center gap-6 min-h-0 centered-content-stack">

                <div 
                  className="bg-white rounded-[24px] p-[24px] w-full max-w-[1100px] flex flex-row gap-[24px] items-start justify-center shrink-0 h-fit z-20"
                  style={{ boxShadow: '0 0 10px 0 rgba(0, 76, 110, 0.60)' }}
                >
                  
                  {/* Card 1: Bunny (Vui) */}
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'bunny')}
                    className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all flex-1 shrink-0 h-fit ${
                      gameChecked 
                        ? (placedEmotions.bunny === 'vui' ? 'border-[#339e4a]' : 'border-[#ef4444]')
                        : 'border-[#8234e4]'
                    }`}
                  >
                    <div 
                      className="border-4 border-white border-solid w-full flex flex-col gap-[10px] items-center py-[18px] px-0 relative rounded-[24px] justify-start"
                      style={{
                        background: gameChecked
                          ? (placedEmotions.bunny === 'vui' ? '#eefcf2' : '#fdf2f2')
                          : 'linear-gradient(181deg, #F2F0FE 23.07%, #E9D8FF 88.73%, #F2F0FE 108.59%)'
                      }}
                    >
                      <div 
                        onClick={() => handleSlotClick('bunny')}
                        className="w-[72px] md:w-[108px] h-[64px] md:h-[96px] relative flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 cloud-slot-container"
                      >
                        {placedEmotions.bunny ? (
                          <img src={getCloudImage(placedEmotions.bunny)} alt="" className="w-full h-full object-contain pointer-events-none scale-[1.62]" />
                        ) : (
                          renderSlotOutline('#8234E4')
                        )}
                      </div>
                      
                      {/* Character cropped container */}
                      <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] xl:w-[185px] xl:h-[185px] shrink-0 overflow-hidden pointer-events-none rounded-[20px] mascot-container">
                        <img src={imgGame1Cd1B152} alt="Bunny" className="absolute h-[126.52%] left-[-62.46%] max-w-none top-[-9.2%] w-[224.93%] object-cover pointer-events-none select-none" />
                      </div>

                      {gameChecked && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                          {placedEmotions.bunny === 'vui' ? (
                            <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                          ) : (
                            <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card 2: Fox Toro (Buồn) */}
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'fox')}
                    className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all flex-1 shrink-0 h-fit ${
                      gameChecked 
                        ? (placedEmotions.fox === 'buon' ? 'border-[#339e4a]' : 'border-[#ef4444]')
                        : 'border-[#fea01f]'
                    }`}
                  >
                    <div 
                      className="border-4 border-white border-solid w-full flex flex-col gap-[10px] items-center py-[18px] px-0 relative rounded-[24px] justify-start"
                      style={{
                        background: gameChecked
                          ? (placedEmotions.fox === 'buon' ? '#eefcf2' : '#fdf2f2')
                          : 'linear-gradient(181deg, #FEF9ED 23.07%, #FFF4BF 88.73%, #FEF9ED 108.59%)'
                      }}
                    >
                      <div 
                        onClick={() => handleSlotClick('fox')}
                        className="w-[72px] md:w-[108px] h-[64px] md:h-[96px] relative flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 cloud-slot-container"
                      >
                        {placedEmotions.fox ? (
                          <img src={getCloudImage(placedEmotions.fox)} alt="" className="w-full h-full object-contain pointer-events-none scale-[1.62]" />
                        ) : (
                          renderSlotOutline('#FEA01F')
                        )}
                      </div>
                      
                      {/* Character cropped container */}
                      <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] xl:w-[185px] xl:h-[185px] shrink-0 overflow-hidden pointer-events-none rounded-[20px] mascot-container">
                        <img src={imgGame1Cd1B151} alt="Fox" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full select-none" />
                      </div>

                      {gameChecked && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                          {placedEmotions.fox === 'buon' ? (
                            <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                          ) : (
                            <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card 3: Bear Lu (Giận) */}
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'bear')}
                    className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all flex-1 shrink-0 h-fit ${
                      gameChecked 
                        ? (placedEmotions.bear === 'gian' ? 'border-[#339e4a]' : 'border-[#ef4444]')
                        : 'border-[#e55c72]'
                    }`}
                  >
                    <div 
                      className="border-4 border-white border-solid w-full flex flex-col gap-[10px] items-center py-[18px] px-0 relative rounded-[24px] justify-start"
                      style={{
                        background: gameChecked
                          ? (placedEmotions.bear === 'gian' ? '#eefcf2' : '#fdf2f2')
                          : 'linear-gradient(181deg, #FEF0F0 23.07%, #FFC9D1 88.73%, #FEF0F0 108.59%)'
                      }}
                    >
                      <div 
                        onClick={() => handleSlotClick('bear')}
                        className="w-[72px] md:w-[108px] h-[64px] md:h-[96px] relative flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 cloud-slot-container"
                      >
                        {placedEmotions.bear ? (
                          <img src={getCloudImage(placedEmotions.bear)} alt="" className="w-full h-full object-contain pointer-events-none scale-[1.62]" />
                        ) : (
                          renderSlotOutline('#E55C72')
                        )}
                      </div>
                      
                      {/* Character cropped container */}
                      <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] xl:w-[185px] xl:h-[185px] shrink-0 overflow-hidden pointer-events-none rounded-[20px] mascot-container">
                        <img src={imgGame1Cd1B153} alt="Lu" className="absolute h-[117.39%] left-[-54.35%] max-w-none top-[-8.59%] w-[208.7%] object-cover pointer-events-none select-none" />
                      </div>

                      {gameChecked && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                          {placedEmotions.bear === 'gian' ? (
                            <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                          ) : (
                            <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card 4: Turtle (Sợ) */}
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'turtle')}
                    className={`border border-solid rounded-[24px] flex flex-col items-center justify-start select-none relative shadow-[0_8px_16px_rgba(0,0,0,0.02)] transition-all flex-1 shrink-0 h-fit ${
                      gameChecked 
                        ? (placedEmotions.turtle === 'so' ? 'border-[#339e4a]' : 'border-[#ef4444]')
                        : 'border-[#0a7ad8]'
                    }`}
                  >
                    <div 
                      className="border-4 border-white border-solid w-full flex flex-col gap-[10px] items-center py-[18px] px-0 relative rounded-[24px] justify-start"
                      style={{
                        background: gameChecked
                          ? (placedEmotions.turtle === 'so' ? '#eefcf2' : '#fdf2f2')
                          : 'linear-gradient(181deg, #F4FAFD 23.07%, #E5F2FF 88.73%, #F4FAFD 108.59%)'
                      }}
                    >
                      <div 
                        onClick={() => handleSlotClick('turtle')}
                        className="w-[72px] md:w-[108px] h-[64px] md:h-[96px] relative flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 cloud-slot-container"
                      >
                        {placedEmotions.turtle ? (
                          <img src={getCloudImage(placedEmotions.turtle)} alt="" className="w-full h-full object-contain pointer-events-none scale-[1.62]" />
                        ) : (
                          renderSlotOutline('#0A7AD8')
                        )}
                      </div>
                      
                      {/* Character cropped container */}
                      <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] xl:w-[185px] xl:h-[185px] shrink-0 overflow-hidden pointer-events-none rounded-[20px] mascot-container">
                        <img src={imgGame1Cd1B154} alt="Turtle" className="absolute h-[126.96%] left-[-60.7%] max-w-none top-[-11.74%] w-[225.71%] object-cover pointer-events-none select-none" />
                      </div>

                      {gameChecked && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md z-20 animate-in zoom-in duration-300">
                          {placedEmotions.turtle === 'so' ? (
                            <div className="bg-[#339e4a] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                          ) : (
                            <div className="bg-[#ef4444] rounded-full p-1.5"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

            {/* Bottom Drawer containing Draggable Clouds */}
              <div className="bg-white border border-[#c4c9d4] border-solid rounded-[24px] pt-[24px] pb-[16px] px-[24px] flex flex-row gap-[24px] items-start justify-between w-[656px] h-[196px] max-w-full z-20 shrink-0 bottom-drawer">
                {emotionsList.map(emotion => {
                  const isPlaced = Object.values(placedEmotions).includes(emotion.id)
                  const isSelected = selectedEmotionId === emotion.id
                  return (
                    <div 
                      key={emotion.id}
                      draggable={!isPlaced}
                      onDragStart={(e) => handleDragStart(e, emotion.id)}
                      onClick={() => !isPlaced && handleSelectEmotion(emotion.id)}
                      className={`flex flex-col items-center gap-1 md:gap-2 cursor-pointer transition-all duration-300 relative ${
                        isPlaced 
                          ? 'opacity-30 cursor-not-allowed scale-90' 
                          : (isSelected 
                              ? 'scale-110 border-4 border-[#339e4a] rounded-[16px] p-2 bg-[#f2fbef]' 
                              : 'hover:scale-105 active:scale-95')
                      }`}
                    >
                      <div className="w-[134px] h-[120px] relative flex items-center justify-center shrink-0 drawer-cloud-container">
                        <img src={emotion.cloudImage} alt={emotion.label} className="w-full h-full object-contain pointer-events-none select-none scale-[1.62]" />
                      </div>
                      <span 
                        style={{ color: emotion.textColor }}
                        className="font-baloo font-bold text-[18px] leading-[30px] tracking-wide drawer-cloud-label"
                      >
                        {emotion.label}
                      </span>
                    </div>
                  )
                })}
              </div>

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
            
            {/* Mascot floating on the grassy slope - fixed position for consistency */}
            <div className="fixed left-[20px] sm:left-[30px] md:left-[40px] lg:left-[60px] bottom-[200px] sm:bottom-[220px] md:bottom-[240px] lg:bottom-[260px] w-[160px] sm:w-[210px] md:w-[260px] lg:w-[310px] pointer-events-none z-10">
              <img
                src={imgMascot}
                alt="Mascot"
                className="w-full h-auto object-contain select-none pointer-events-none transform origin-bottom-left hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Back Button */}
            <div className="w-full flex justify-start pl-4 md:pl-0">
              <button
                onClick={() => navigate('/zone/emotions')}
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
          <div className="relative rounded-[24px] max-w-[1140px] w-full h-auto md:h-[446px] p-[24px] md:p-[48px] border border-[#BAE6FD] shadow-[0px_0px_5px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden bg-white animate-in fade-in zoom-in duration-300">
            
            {/* Background Sky Image */}
            <div className="absolute inset-0 pointer-events-none rounded-[24px] z-0">
              <img 
                alt="Sky Background"
                className="absolute max-w-none object-cover rounded-[24px] w-full h-full"
                src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.png" 
              />
            </div>

            {/* Content Top: Header Info */}
            <div className="absolute left-[48px] top-[96px] flex items-center z-10 w-full pr-0 lg:pr-[280px]">
              
              {/* Header Text block with Medal */}
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left w-full">
                {/* Medal/Badge Group */}
                <div className="w-[120px] h-[120px] shrink-0 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none" className="w-full h-full">
                    <path d="M107.283 108.075L92.8358 104.895L88.3583 119.03C88.0362 120.047 86.6598 120.196 86.128 119.272L68.2559 88.2254C77.0594 86.3179 84.8925 81.797 90.9069 75.5137L108.608 106.267C109.139 107.189 108.322 108.304 107.283 108.075Z" fill="#925DED"/>
                    <path d="M107.283 108.075L93.9291 105.136C93.3098 104.999 92.689 105.358 92.4976 105.962L88.3583 119.03C88.0362 120.047 86.6598 120.196 86.128 119.272L70.817 92.6723L68.2559 88.2252C77.0594 86.3177 84.8925 81.7968 90.9069 75.5134L93.4485 79.926L108.608 106.266C109.139 107.189 108.322 108.304 107.283 108.075Z" fill="#925DED"/>
                    <path d="M107.282 108.074L93.9294 105.135C93.3093 105.001 92.6892 105.359 92.498 105.961L93.9352 101.495C94.1291 100.893 94.7499 100.537 95.3678 100.675L106.858 103.229L108.608 106.268C109.14 107.189 108.321 108.304 107.282 108.074Z" fill="#7D46DF"/>
                    <path d="M52.0261 87.8528L33.8714 119.385C33.3396 120.309 31.9632 120.16 31.6411 119.144L27.5016 106.075C27.3102 105.471 26.6891 105.112 26.07 105.249L12.7169 108.188C11.6772 108.417 10.8603 107.302 11.3914 106.38L28.2763 77.0449C34.58 83.0212 43.0828 86.3803 52.0261 87.8528Z" fill="#925DED"/>
                    <path d="M30.6654 81.4085L15.6194 107.547L12.7171 108.187C11.6774 108.416 10.8603 107.302 11.3914 106.379L25.7639 81.4085L29.6505 74.6387C30.697 75.6293 31.7901 76.5709 32.9298 77.456L30.6654 81.4085Z" fill="#7D46DF"/>
                    <path d="M35.6415 116.306L33.8695 119.385C33.3377 120.309 31.9627 120.162 31.6392 119.145L27.4997 106.076C27.3085 105.471 26.6884 105.113 26.0684 105.248L30.6466 104.241C31.2657 104.105 31.8865 104.463 32.0779 105.067L35.6415 116.306Z" fill="#7D46DF"/>
                    <path d="M28.6844 76.2986L40.6249 81.6832L52.0256 87.8528L48.9687 93.159C40.4445 91.4284 32.5355 87.4606 25.999 81.6172C25.9205 81.5484 25.8421 81.4795 25.7637 81.4082L28.6844 76.2986Z" fill="#7D46DF"/>
                    <path d="M93.4466 79.9262L90.905 75.5137L77.456 81.4497L68.2539 88.2254L69.2882 90.0212L71.828 94.4323L86.126 119.272C86.6578 120.196 88.0343 120.047 88.3563 119.03L89.2668 116.156L75.0554 91.4015C81.9352 89.0075 88.1982 85.1126 93.4466 79.9262Z" fill="#7D46DF"/>
                    <path d="M104.48 44.6154C104.48 56.6069 99.7619 67.4971 92.0832 75.5137C86.0688 81.7971 78.2357 86.318 69.4322 88.2255C66.3906 88.8843 63.2363 89.2309 59.9987 89.2309C57.5282 89.2309 55.1067 89.0291 52.7465 88.6409C44.2616 87.2447 36.5829 83.4392 30.4361 77.9475C30.1028 77.6524 29.7768 77.3526 29.4533 77.0453C28.3063 75.9588 27.2181 74.8106 26.1887 73.6087C25.2035 72.4533 24.277 71.2463 23.4119 69.9926C20.8139 66.2339 18.7773 62.0522 17.4219 57.5733C16.1842 53.4729 15.5176 49.1241 15.5176 44.6157C15.5176 19.9759 35.4335 0 59.9987 0C64.4912 0 68.8292 0.668601 72.9149 1.91267C77.3828 3.26728 81.5493 5.31009 85.2992 7.91832C86.5491 8.78618 87.7525 9.71531 88.902 10.706C90.4411 12.0236 91.8872 13.447 93.2327 14.9612C100.23 22.8449 104.48 33.2335 104.48 44.6154Z" fill="#FEC92B"/>
                    <path d="M60.0002 76.5712C77.5957 76.5712 91.8597 62.264 91.8597 44.6153C91.8597 26.9666 77.5957 12.6594 60.0002 12.6594C42.4046 12.6594 28.1406 26.9666 28.1406 44.6153C28.1406 62.264 42.4046 76.5712 60.0002 76.5712Z" fill="#FEDE6A"/>
                    <path d="M91.8587 44.6153C91.8587 62.2634 77.5946 76.5707 59.9997 76.5707C42.4048 76.5707 28.1406 62.2634 28.1406 44.6153C28.1406 43.2828 28.2215 41.9701 28.3808 40.6821C30.3121 56.4766 43.7332 68.7041 59.9997 68.7041C76.2662 68.7041 89.6872 56.4766 91.6185 40.6821C91.7779 41.9703 91.8587 43.283 91.8587 44.6153Z" fill="#FEC92B"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M59.9997 12.6604C42.4048 12.6604 28.1406 26.9677 28.1406 44.6158C28.1406 62.2639 42.4048 76.5712 59.9997 76.5712C77.5946 76.5712 91.8587 62.2639 91.8587 44.6158C91.8587 26.9677 77.5946 12.6604 59.9997 12.6604ZM59.9997 72.8835C44.4586 72.8835 31.817 60.2037 31.817 44.6158C31.817 29.0279 44.4586 16.348 59.9997 16.348C75.5407 16.348 88.1824 29.0279 88.1824 44.6158C88.1824 60.2037 75.5407 72.8835 59.9997 72.8835Z" fill="#E38300"/>
                    <path d="M61.0996 26.9443L65.4761 35.8844C65.6543 36.2486 66.0011 36.501 66.4026 36.5586L76.2382 37.9718C77.2448 38.1164 77.6475 39.3534 76.9188 40.0627L69.785 47.0092C69.4953 47.2913 69.3635 47.6979 69.4324 48.0962L71.1323 57.9181C71.3061 58.9215 70.2509 59.6867 69.351 59.21L60.5726 54.5582C60.2138 54.368 59.784 54.368 59.4251 54.5582L50.6468 59.21C49.7468 59.6869 48.6917 58.9217 48.8655 57.9181L50.5654 48.0962C50.6343 47.6979 50.5024 47.2913 50.2128 47.0092L43.079 40.0627C42.3503 39.3531 42.753 38.1164 43.7596 37.9718L53.5952 36.5586C53.9964 36.501 54.3432 36.2486 54.5217 35.8844L58.8982 26.9443C59.3465 26.0287 60.6513 26.0287 61.0996 26.9443Z" fill="#E38300"/>
                  </svg>
                </div>

                <div className="flex flex-col justify-center sm:justify-start h-full pt-1 sm:pt-2">
                  <span 
                    style={{ color: '#37393E' }}
                    className="font-baloo text-[24px] font-bold leading-[40px]"
                  >
                    Chúc mừng bé vừa hoàn thành bài học
                  </span>
                  <h2 
                    style={{ color: '#0A7AD8' }}
                    className="font-baloo text-[48px] font-bold leading-[80px]"
                  >
                    Con đang cảm thấy gì ?
                  </h2>
                </div>
              </div>

            </div>

            {/* Mascot Otter holding trophy (Absolute Positioned on the right) */}
            <div className="absolute right-[24px] xl:right-[48px] top-[24px] w-[225px] xl:w-[315px] h-[162px] xl:h-[225px] pointer-events-none z-10 hidden lg:block">
              <img 
                src="/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.png"
                alt="Mascot Otter holding Trophy"
                className="absolute h-[154.71%] left-[-48.13%] max-w-none top-[-9.52%] w-[196.55%] object-contain"
              />
            </div>

            {/* Content Bottom: Actions buttons horizontal container (Absolute Positioned exactly) */}
            <div className="absolute left-[28px] bottom-[96px] flex flex-row items-center gap-[24px] z-10">
              
              {/* Button 1: Chơi lại lần nữa */}
              <button
                onClick={handleResetGame}
                className="bg-white border-2 border-solid border-[#e83552] text-[#e83552] font-vietnam text-[16px] font-normal rounded-[40px] w-[200px] h-[48px] flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:bg-red-50 transition-all active:scale-95 duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6.54616 8.16265C6.33094 8.10587 6.15206 7.95643 6.0579 7.75474C5.96374 7.55305 5.96402 7.31996 6.05868 7.11851L7.71944 3.58412C7.8432 3.32073 8.10815 3.15272 8.39916 3.15308C8.69018 3.15344 8.95471 3.32211 9.07782 3.5858L9.81045 5.15504C9.83664 5.14474 9.86368 5.13581 9.89151 5.12836C14.2389 3.96349 18.7074 6.5434 19.8723 10.8907C21.0371 15.2381 18.4572 19.7066 14.1099 20.8715C9.76253 22.0364 5.29399 19.4565 4.12912 15.1091C3.7587 13.7267 3.76704 12.3298 4.09147 11.0311C4.19186 10.6292 4.59901 10.3848 5.00088 10.4852C5.40274 10.5856 5.64714 10.9927 5.54675 11.3946C5.28245 12.4526 5.27517 13.5907 5.57801 14.7209C6.52847 18.268 10.1745 20.3731 13.7216 19.4226C17.2688 18.4722 19.3738 14.8261 18.4234 11.279C17.4885 7.78982 13.9454 5.69601 10.4538 6.53307L11.193 8.11637C11.3161 8.38006 11.2756 8.69116 11.089 8.91449C10.9024 9.13783 10.6035 9.23307 10.3221 9.15883L6.54616 8.16265Z" fill="#E83552"/>
                </svg>
                <span>Chơi lại lần nữa</span>
              </button>

              {/* Button 2: Mở bài mới nào */}
              <button
                onClick={handleNextLesson}
                className="bg-[#0a7ad8] hover:bg-[#0862ae] text-white font-baloo text-[20px] font-normal rounded-[40px] w-[200px] h-[48px] flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.7506 7C18.7506 6.58579 18.4148 6.25 18.0006 6.25C17.5864 6.25 17.2506 6.58579 17.2506 7V17C17.2506 17.4142 17.5864 17.75 18.0006 17.75C18.4148 17.75 18.7506 17.4142 18.7506 17V7Z" fill="white"/>
                  <path d="M14.4545 10.9452C15.1445 11.4791 15.1445 12.5208 14.4545 13.0547C12.3164 14.7091 9.92884 16.0131 7.38131 16.9179L6.91526 17.0835C6.04562 17.3923 5.12633 16.8039 5.0085 15.9055C4.67165 13.337 4.67165 10.663 5.0085 8.09448C5.12633 7.19604 6.04562 6.60765 6.91526 6.91652L7.38131 7.08204C9.92884 7.98683 12.3164 9.29083 14.4545 10.9452Z" fill="white"/>
                </svg>
                <span>Mở bài mới nào</span>
              </button>

              {/* Button 3: Về nhật ký của bé */}
              <button
                onClick={() => navigate('/diary')}
                className="bg-[#339e4a] hover:bg-[#2c883f] text-white font-vietnam text-[16px] font-normal rounded-[40px] w-[200px] h-[48px] flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95 duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0198 3.5C12.1417 3.5 12.2352 3.60805 12.219 3.72883C11.943 5.79611 11.9772 7.89429 12.3215 9.9538L12.3361 10.0412C12.3531 10.1429 12.4308 10.2238 12.5318 10.2448C12.6328 10.2658 12.7363 10.2226 12.7924 10.1361L14.4161 7.63486C14.4556 7.57413 14.5445 7.57413 14.5839 7.63486L16.2076 10.1361C16.2638 10.2226 16.3672 10.2658 16.4682 10.2448C16.5692 10.2238 16.6469 10.1429 16.6639 10.0412L16.6785 9.9538C17.0228 7.89429 17.057 5.79611 16.781 3.72883C16.7648 3.60805 16.8583 3.5 16.9802 3.5L18.5 3.5C19.3284 3.5 20 4.17157 20 5V20C20 20.5523 19.5523 21 19 21H7.5C5.73676 21 4.27806 19.6961 4.03544 18H4V8C4 5.51472 6.01472 3.5 8.5 3.5L12.0198 3.5ZM7.5 15.5H18.5V19.5H7.5C6.39543 19.5 5.5 18.6046 5.5 17.5C5.5 16.3954 6.39543 15.5 7.5 15.5Z" fill="white"/>
                </svg>
                <span>Về nhật ký của bé</span>
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
