import { Link } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEO title="Không tìm thấy trang" noindex />
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-baloo text-7xl font-bold text-[#0a7ad8]">404</p>
        <h1 className="mt-4 font-baloo text-3xl font-bold text-[#004c6e]">Không tìm thấy trang</h1>
        <p className="mt-3 font-vietnam text-[#575e70]">Trang bạn đang tìm không tồn tại hoặc đã được chuyển đi.</p>
        <Link className="mt-8 rounded-full bg-[#0a7ad8] px-6 py-3 font-vietnam font-bold text-white" to="/">
          Về trang chủ
        </Link>
      </main>
      <Footer />
    </div>
  )
}
