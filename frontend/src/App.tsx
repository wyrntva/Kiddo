import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/common/ScrollToTop'

const ExplorePage   = lazy(() => import('./pages/explore/ExplorePage'))
const HomePage      = lazy(() => import('./pages/home/HomePage'))
const CoursesPage   = lazy(() => import('./pages/courses/CoursesPage'))
const LoginPage     = lazy(() => import('./pages/login/LoginPage'))
const RegisterPage  = lazy(() => import('./pages/register/RegisterPage'))
const DiaryPage     = lazy(() => import('./pages/diary/DiaryPage'))
const ParentsPage   = lazy(() => import('./pages/parents/ParentsPage'))
const ZoneCamXucPage = lazy(() => import('./pages/zone/ZoneCamXucPage'))
const ZoneGiaoTiepPage = lazy(() => import('./pages/zone/ZoneGiaoTiepPage'))
const ZoneTuLapPage = lazy(() => import('./pages/zone/ZoneTuLapPage'))
const ZoneBanBePage = lazy(() => import('./pages/zone/ZoneBanBePage'))
const ZoneTinhHuongPage = lazy(() => import('./pages/zone/ZoneTinhHuongPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#0a7ad8] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"        element={<Navigate to="/home" replace />} />
            <Route path="/home"    element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/login"   element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/diary"   element={<DiaryPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/zone/cam-xuc" element={<ZoneCamXucPage />} />
            <Route path="/zone/giao-tiep" element={<ZoneGiaoTiepPage />} />
            <Route path="/zone/tu-lap" element={<ZoneTuLapPage />} />
            <Route path="/zone/tu-do" element={<ZoneTuLapPage />} />
            <Route path="/zone/ban-be" element={<ZoneBanBePage />} />
            <Route path="/zone/tinh-huong" element={<ZoneTinhHuongPage />} />
            <Route path="*"        element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
