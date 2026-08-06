import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import ScrollToTop from './components/common/ScrollToTop'
import FloatingChatbot from './components/common/FloatingChatbot'

const ExplorePage   = lazy(() => import('./pages/explore/ExplorePage'))
const HomePage      = lazy(() => import('./pages/home/HomePage'))
const CoursesPage   = lazy(() => import('./pages/courses/CoursesPage'))
const LoginPage     = lazy(() => import('./pages/login/LoginPage'))
const RegisterPage  = lazy(() => import('./pages/register/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/login/ForgotPasswordPage'))
const GoogleOnboardingPage = lazy(() => import('./pages/auth/GoogleOnboardingPage'))
const DiaryPage     = lazy(() => import('./pages/diary/DiaryPage'))
const ParentsPage   = lazy(() => import('./pages/parents/ParentsPage'))
const ParentArticlePage = lazy(() => import('./pages/parents/ParentArticlePage'))
const TermsPage     = lazy(() => import('./pages/terms/TermsPage'))
const ProfilePage     = lazy(() => import('./pages/profile/ProfilePage'))
const ZoneCamXucPage = lazy(() => import('./pages/zone/ZoneCamXucPage'))
const ZoneGiaoTiepPage = lazy(() => import('./pages/zone/ZoneGiaoTiepPage'))
const ZoneTuLapPage = lazy(() => import('./pages/zone/ZoneTuLapPage'))
const ZoneBanBePage = lazy(() => import('./pages/zone/ZoneBanBePage'))
const ZoneTinhHuongPage = lazy(() => import('./pages/zone/ZoneTinhHuongPage'))
const ZoneQuizPage = lazy(() => import('./pages/zone/ZoneQuizPage'))
const ContactPage = lazy(() => import('./pages/contact/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#0a7ad8] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />

  return children
}

function LegacyEmotionLessonRedirect() {
  const { id } = useParams()
  return <Navigate to={`/zone/emotions/lesson/${id ?? ''}`} replace />
}

const CHATBOT_PATHS = new Set(['/', '/explore', '/courses', '/diary', '/parents'])

function ChatbotForAllowedPages() {
  const { pathname } = useLocation()

  return CHATBOT_PATHS.has(pathname) ? <FloatingChatbot /> : null
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/home"    element={<Navigate to="/" replace />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/login"   element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/google-onboarding" element={<GoogleOnboardingPage />} />
            <Route path="/diary"   element={<ProtectedRoute><DiaryPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/parents/articles/:slug" element={<ParentArticlePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/zone/cam-xuc" element={<Navigate to="/zone/emotions" replace />} />
            <Route path="/zone/cam-xuc/lesson/:id" element={<LegacyEmotionLessonRedirect />} />
            <Route path="/zone/giao-tiep" element={<Navigate to="/zone/communication" replace />} />
            <Route path="/zone/tu-lap" element={<Navigate to="/zone/independence" replace />} />
            <Route path="/zone/tu-do" element={<Navigate to="/zone/independence" replace />} />
            <Route path="/zone/ban-be" element={<Navigate to="/zone/friends" replace />} />
            <Route path="/zone/tinh-huong" element={<Navigate to="/zone/situations" replace />} />
            <Route path="/zone/emotions" element={<ProtectedRoute><ZoneCamXucPage /></ProtectedRoute>} />
            <Route path="/zone/emotions/lesson/:id" element={<ProtectedRoute><ZoneQuizPage /></ProtectedRoute>} />
            <Route path="/zone/communication" element={<ProtectedRoute><ZoneGiaoTiepPage /></ProtectedRoute>} />
            <Route path="/zone/independence" element={<ProtectedRoute><ZoneTuLapPage /></ProtectedRoute>} />
            <Route path="/zone/friends" element={<ProtectedRoute><ZoneBanBePage /></ProtectedRoute>} />
            <Route path="/zone/situations" element={<ProtectedRoute><ZoneTinhHuongPage /></ProtectedRoute>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*"        element={<NotFoundPage />} />
          </Routes>
          <ChatbotForAllowedPages />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
