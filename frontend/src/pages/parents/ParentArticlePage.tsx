import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { ARTICLES } from './_components/ParentsArticlesSection'
import { FEATURED_ARTICLES } from './_components/ParentsFeaturedSection'

const articles = [...FEATURED_ARTICLES, ...ARTICLES]

export default function ParentArticlePage() {
  const { slug } = useParams()
  const [relatedIndex, setRelatedIndex] = useState(0)
  const article = articles.find(item => item.slug === slug)

  if (!article) return <Navigate to="/parents" replace />
  const tag = 'tag' in article ? String(article.tag) : null
  const relatedArticles = articles.filter(item => item.slug !== article.slug)
  const visibleRelated = Array.from(
    { length: Math.min(3, relatedArticles.length) },
    (_, index) => relatedArticles[(relatedIndex + index) % relatedArticles.length],
  )

  const moveRelated = (direction: number) => {
    setRelatedIndex(current => (current + direction + relatedArticles.length) % relatedArticles.length)
  }

  return (
    <div className="min-h-screen bg-[#f4fafd] font-vietnam">
      <SEO title={article.title} description={article.description} schemaType="WebPage" />
      <Navbar />

      <main className="pb-10 md:pb-16">
        <div className="relative h-[220px] sm:h-[300px] lg:h-auto lg:aspect-[1920/450] lg:max-h-[450px] w-full overflow-hidden bg-[#d8edfa]">
          <img
            src={article.image}
            alt={article.title}
            width="1920"
            height="450"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001e2f]/35 via-transparent to-transparent" />
        </div>

        <article className="relative z-10 mx-4 -mt-8 max-w-[1824px] rounded-[20px] border border-[#e2e2ea] bg-white px-5 py-7 shadow-[0_12px_40px_rgba(0,76,110,0.12)] sm:mx-6 sm:px-8 md:-mt-14 md:rounded-[24px] md:px-10 md:py-10 lg:mx-auto lg:-mt-[180px] lg:px-12">
          <Link to="/parents" className="mb-5 inline-flex items-center gap-2 text-[15px] font-medium text-[#0a7ad8] hover:underline">
            <span aria-hidden="true">←</span>
            Dành cho phụ huynh
          </Link>

          {tag && (
            <div className="mb-4 w-fit rounded-full bg-[#e5f2ff] px-3 py-1 text-[14px] font-medium text-[#0a7ad8]">
              {tag}
            </div>
          )}

          <h1 className="font-baloo text-[28px] font-bold leading-tight text-[#004c6e] sm:text-[36px] lg:text-[44px]">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#e2e2ea] pb-5 text-[14px] text-[#8690a7] sm:text-[15px]">
            <span>Ngày đăng: {article.date}</span>
            <span>{article.views}</span>
            <span>Người đăng: OTTOPIA</span>
          </div>

          <div className="mt-7 space-y-5 text-[16px] leading-8 text-[#37393e] sm:text-[17px]">
            <p className="font-medium text-[#575e70]">{article.description}</p>
            <p>
              Mỗi kỹ năng của trẻ đều được hình thành từ những trải nghiệm nhỏ trong cuộc sống hằng ngày. Khi cha mẹ kiên nhẫn quan sát, lắng nghe và đồng hành, con sẽ cảm thấy an toàn để thử sức và từng bước tiến bộ.
            </p>
            <h2 className="font-baloo text-[24px] font-bold text-[#004c6e]">Bắt đầu cùng con từ những điều đơn giản</h2>
            <p>
              Hãy chọn một thời điểm thoải mái, giải thích cho con bằng câu ngắn gọn và làm mẫu trước. Cha mẹ có thể biến việc luyện tập thành trò chơi, tình huống đóng vai hoặc một nhiệm vụ nhỏ phù hợp với độ tuổi của con.
            </p>
            <p>
              Điều quan trọng không phải là con làm đúng ngay lần đầu, mà là con hiểu mình đang học gì và luôn nhận được sự khích lệ. Những lời khen cụ thể sẽ giúp trẻ nhận ra nỗ lực của bản thân và muốn tiếp tục luyện tập.
            </p>
            <h2 className="font-baloo text-[24px] font-bold text-[#004c6e]">Gợi ý dành cho cha mẹ</h2>
            <ul className="list-disc space-y-2 pl-6 marker:text-[#fea01f]">
              <li>Dành thời gian trò chuyện và thực hành cùng con mỗi ngày.</li>
              <li>Khen ngợi nỗ lực cụ thể thay vì chỉ nhận xét kết quả.</li>
              <li>Giữ nhịp học nhẹ nhàng, vui vẻ và phù hợp với cảm xúc của trẻ.</li>
            </ul>
          </div>
        </article>

        <section className="mx-4 mt-8 max-w-[1824px] sm:mx-6 md:mt-10 lg:mx-auto">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-baloo text-[26px] font-bold uppercase italic text-[#001e2f] sm:text-[32px]">
              Bài viết liên quan
            </h2>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => moveRelated(-1)}
                aria-label="Xem bài viết trước"
                className="flex size-10 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[24px] text-[#8690a7] transition-colors hover:border-[#0a7ad8] hover:text-[#0a7ad8] sm:size-11"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => moveRelated(1)}
                aria-label="Xem bài viết tiếp theo"
                className="flex size-10 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[24px] text-[#001e2f] transition-colors hover:border-[#0a7ad8] hover:text-[#0a7ad8] sm:size-11"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visibleRelated.map((item, index) => {
              const relatedTag = 'tag' in item ? String(item.tag) : 'Kỹ năng sống'

              return (
                <Link
                  key={item.slug}
                  to={`/parents/articles/${item.slug}`}
                  className={`${index > 0 ? 'hidden md:flex' : 'flex'} ${index > 1 ? 'md:hidden lg:flex' : ''} group min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#e2e2ea] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="relative h-[210px] overflow-hidden bg-[#d8edfa]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute left-4 top-4 rounded-[7px] bg-[#004c6e] px-3 py-1 text-[12px] font-bold uppercase text-white shadow-sm">
                      {relatedTag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-[#575e70]">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>OTTOPIA</span>
                    </div>
                    <h3 className="line-clamp-2 font-baloo text-[20px] font-bold leading-7 text-[#001e2f]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-[#575e70]">
                      {item.description}
                    </p>
                    <span className="mt-5 border-t border-[#e2e2ea] pt-4 text-[14px] font-bold text-[#0a7ad8]">
                      Đọc tiếp →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
