import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import ZoneQuizGameScreen from './_components/ZoneQuizGameScreen'
import ZoneQuizIntroScreen from './_components/ZoneQuizIntroScreen'
import ZoneQuizQuestionScreen from './_components/ZoneQuizQuestionScreen'
import ZoneQuizSuccessModal from './_components/ZoneQuizSuccessModal'
import { zoneQuizAssets } from './quizData'
import useZoneQuiz from './useZoneQuiz'

export default function ZoneQuizPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const initialLessonId = id ? (isNaN(Number(id)) ? id : parseInt(id, 10)) : 1
  const {
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
    introText,
    gameGuideText,
    speakText,
    handleSelect,
    handleDrop,
    handleSlotClick,
    handleCheckAnswers,
    handleResetGame,
    loading,
    lessonsList,
    backPath,
  } = useZoneQuiz(initialLessonId)

  useEffect(() => {
    if (id) {
      const parsedId = isNaN(Number(id)) ? id : parseInt(id, 10)
      setCurrentLessonId(parsedId)
    }
  }, [id, setCurrentLessonId])

  const handleNextLesson = () => {
    const currentIndex = lessonsList.findIndex((l) => l.id === currentLessonId)
    if (currentIndex !== -1 && currentIndex < lessonsList.length - 1) {
      const nextLesson = lessonsList[currentIndex + 1]
      setCurrentLessonId(nextLesson.id)
      navigate(`/zone/emotions/lesson/${nextLesson.id}`)
      return
    }

    navigate(backPath)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: `url(${zoneQuizAssets.heroBg})` }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white/80 p-8 rounded-[32px] border-4 border-[#339E4A] shadow-xl backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-[#339E4A] border-t-transparent rounded-full animate-spin" />
            <p className="font-vietnam font-bold text-gray-700">Đang chuẩn bị câu hỏi...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] relative overflow-hidden">
        <img
          src={zoneQuizAssets.heroBg}
          alt=""
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {showGame ? (
          <ZoneQuizGameScreen
            allPlaced={allPlaced}
            placedEmotions={placedEmotions}
            selectedEmotionId={selectedEmotionId}
            gameChecked={gameChecked}
            onBack={() => navigate(backPath)}
            onCheckAnswers={handleCheckAnswers}
            onSpeakGuide={() => speakText(gameGuideText)}
            onSelectEmotion={setSelectedEmotionId}
            onDrop={handleDrop}
            onSlotClick={handleSlotClick}
          />
        ) : showIntro ? (
          <ZoneQuizIntroScreen
            introText={introText}
            isSpeaking={isSpeaking}
            onSpeak={() => speakText(introText)}
          />
        ) : (
          <ZoneQuizQuestionScreen
            quiz={quiz}
            quizLesson={quizLesson}
            currentQuestionIndex={currentQuestionIndex}
            selectedOptionId={selectedOptionId}
            isChecked={isChecked}
            isCorrect={isCorrect}
            isSpeaking={isSpeaking}
            onBack={() => navigate(backPath)}
            onSpeakQuestion={() => speakText(quiz.prompt)}
            onSelect={handleSelect}
          />
        )}
      </main>

      {showSuccessModal && (
        <ZoneQuizSuccessModal
          onResetGame={handleResetGame}
          onNextLesson={handleNextLesson}
          onGoToDiary={() => navigate('/diary')}
        />
      )}
    </div>
  )
}
