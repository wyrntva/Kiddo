import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import ZoneQuizGameScreen from './_components/ZoneQuizGameScreen'
import ZoneQuizIntroScreen from './_components/ZoneQuizIntroScreen'
import ZoneQuizQuestionScreen from './_components/ZoneQuizQuestionScreen'
import ZoneQuizSuccessModal from './_components/ZoneQuizSuccessModal'
import { quizDatabase, zoneQuizAssets } from './quizData'
import useZoneQuiz from './useZoneQuiz'

export default function ZoneQuizPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const initialLessonId = id ? parseInt(id, 10) : 1
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
  } = useZoneQuiz(initialLessonId)

  useEffect(() => {
    if (id) {
      setCurrentLessonId(parseInt(id, 10))
    }
  }, [id, setCurrentLessonId])

  const handleNextLesson = () => {
    const nextLessonId = currentLessonId + 1

    if (quizDatabase[nextLessonId]) {
      setCurrentLessonId(nextLessonId)
      navigate(`/zone/emotions/lesson/${nextLessonId}`)
      return
    }

    navigate('/zone/emotions')
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
            onBack={() => navigate('/zone/emotions')}
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
            onBack={() => navigate('/zone/emotions')}
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
