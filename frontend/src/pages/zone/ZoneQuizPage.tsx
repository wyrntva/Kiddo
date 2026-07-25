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
import { emotionIslandLessons } from '../diary/data/emotionIsland'
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
    showPostVideo,
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
    handleSkip,
    loading,
    lessonsList,
    backPath,
    calculatedFeedback,
  } = useZoneQuiz(initialLessonId)

  useEffect(() => {
    if (id) {
      const parsedId = isNaN(Number(id)) ? id : parseInt(id, 10)
      setCurrentLessonId(parsedId)
    }
  }, [id, setCurrentLessonId])

  useEffect(() => {
    if (!showSuccessModal) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [showSuccessModal])

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

  const lessonFeedback =
    calculatedFeedback ??
    emotionIslandLessons.find((lesson) => lesson.title === quizLesson.lessonTitle)?.feedback ??
    emotionIslandLessons[0].feedback

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
    <div className="zone-lesson-page flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-[#F3F9FC]">
      <SEO title={quizLesson?.lessonTitle ? `Bài học: ${quizLesson.lessonTitle}` : 'Bài học'} noindex={true} />
      <Navbar />

      <main className="zone-lesson-main relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F3F9FC] p-2 sm:p-3 md:p-4 lg:px-6 lg:py-4 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5">
        <div className="zone-lesson-stage relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[20px] bg-[#f2f6f9] shadow-2xl md:rounded-[32px]">
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
              onSkip={handleSkip}
            />
          ) : showPreVideo ? (
            <ZoneQuizPreVideoScreen
              preVideoText={preVideoText}
              isSpeaking={isSpeaking}
              onSpeak={speakPreVideo}
              onSkip={handleSkip}
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
                onEnded={handleVideoEnded}
              />
              <button
                onClick={handleVideoEnded}
                className="absolute right-3 top-3 z-30 cursor-pointer rounded-full border border-white/20 bg-black/75 px-4 py-2 font-baloo text-[14px] font-bold text-white shadow-md transition-all hover:bg-black active:scale-95 sm:right-4 sm:top-4 sm:px-6 sm:py-2.5 sm:text-[18px]"
              >
                Bỏ qua
              </button>
            </div>
          ) : showPostVideo ? (
            <ZoneQuizPreVideoScreen
              preVideoText={postVideoText}
              isSpeaking={isSpeaking}
              onSpeak={speakPostVideo}
              onSkip={handleSkip}
            />
          ) : showGame ? (
            <ZoneQuizGameScreen
              allPlaced={allPlaced}
              placedEmotions={placedEmotions}
              gameChecked={gameChecked}
              onBack={() => navigate(backPath)}
              onRewatchVideo={handleRewatchVideo}
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
              onSkip={handleSkip}
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
              onRewatchVideo={handleRewatchVideo}
              onSpeakQuestion={speakQuestion}
              onSelect={handleSelect}
            />
          )}
        </div>
      </main>

      {showSuccessModal && (
        <ZoneQuizSuccessModal
          feedback={lessonFeedback}
          onResetGame={handleResetGame}
          onRestartLesson={handleRestartLesson}
          onNextLesson={handleNextLesson}
          onGoToDiary={() => navigate('/diary')}
        />
      )}
    </div>
  )
}
