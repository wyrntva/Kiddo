import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import ZoneQuizGameScreen from './_components/ZoneQuizGameScreen'
import ZoneQuizIntroScreen from './_components/ZoneQuizIntroScreen'
import ZoneQuizQuestionScreen from './_components/ZoneQuizQuestionScreen'
import ZoneQuizSuccessModal from './_components/ZoneQuizSuccessModal'
import ZoneQuizWelcomeScreen from './_components/ZoneQuizWelcomeScreen'
import ZoneQuizPreVideoScreen from './_components/ZoneQuizPreVideoScreen'
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
    setSelectedEmotionId,
    gameChecked,
    showSuccessModal,
    allPlaced,
    introText,
    welcomeText,
    preVideoText,
    postVideoText,
    videoUrl,
    gameGuideText,
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
    <div className="flex flex-col min-h-screen md:h-screen md:overflow-hidden bg-[#F3F9FC]">
      <SEO title={quizLesson?.lessonTitle ? `Bài học: ${quizLesson.lessonTitle}` : 'Bài học'} noindex={true} />
      <Navbar />

      <main className="flex-1 p-4 md:py-6 md:px-12 relative flex flex-col bg-[#F3F9FC] overflow-y-auto md:overflow-hidden">
        <div className="relative flex-1 w-full min-h-[500px] md:h-full rounded-[20px] md:rounded-[32px] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col bg-[#f2f6f9]">
          <img
            src={zoneQuizAssets.heroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          />

          {showWelcome ? (
            <ZoneQuizWelcomeScreen
              welcomeText={welcomeText}
              isSpeaking={isSpeaking}
              onSpeak={speakWelcome}
              onStart={() => {
                setShowWelcome(false)
                setShowPreVideo(true)
                stopAudio()
              }}
            />
          ) : showPreVideo ? (
            <ZoneQuizPreVideoScreen
              preVideoText={preVideoText}
              isSpeaking={isSpeaking}
              onSpeak={speakPreVideo}
              onStartVideo={startVideoNow}
            />
          ) : showVideo ? (
            <div className="absolute inset-0 w-full h-full z-20 flex items-center justify-center bg-black">
              <video
                src={videoUrl || "/uploads/videos/videobai1.mp4"}
                autoPlay
                playsInline
                controls
                preload="auto"
                className="w-full h-full object-contain z-10"
                onEnded={() => {
                  setShowVideo(false)
                  setShowPostVideo(true)
                }}
              />
              <button
                onClick={() => {
                  setShowVideo(false)
                  setShowPostVideo(true)
                }}
                className="absolute top-4 right-4 z-30 bg-black/75 hover:bg-black active:scale-95 transition-all text-white px-6 py-2.5 rounded-full font-baloo text-[16px] sm:text-[18px] font-bold shadow-md cursor-pointer border border-white/20"
              >
                Bỏ qua
              </button>
            </div>
          ) : showPostVideo ? (
            <ZoneQuizPreVideoScreen
              preVideoText={postVideoText}
              isSpeaking={isSpeaking}
              onSpeak={speakPostVideo}
            />
          ) : showGame ? (
            <ZoneQuizGameScreen
              allPlaced={allPlaced}
              placedEmotions={placedEmotions}
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
              onSpeak={speakPostQuestion}
            />
          ) : (
            <ZoneQuizQuestionScreen
              quiz={quiz}
              quizLesson={quizLesson}
              currentQuestionIndex={currentQuestionIndex}
              selectedOptionId={selectedOptionId}
              isChecked={isChecked}
              isSpeaking={isSpeaking}
              onBack={() => navigate(backPath)}
              onSpeakQuestion={speakQuestion}
              onSelect={handleSelect}
            />
          )}
        </div>
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
