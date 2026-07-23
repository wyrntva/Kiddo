import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import { getNews, getNewsArticle, resolveNewsImage, type NewsArticle } from './newsApi'

export default function ParentArticlePage() {
  const { slug } = useParams()
  const articleId = Number(slug)
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    if (!Number.isInteger(articleId) || articleId <= 0) {
      setError('Bài viết không tồn tại.')
      setLoading(false)
      return () => {
        active = false
      }
    }

    Promise.all([getNewsArticle(articleId), getNews()])
      .then(([current, list]) => {
        if (!active) return
        setArticle(current)
        setRelatedArticles(
          list.items
            .filter(item => item.id !== current.id)
            .sort(item => item.category === current.category ? -1 : 1)
            .slice(0, 3),
        )
      })
      .catch(() => {
        if (active) setError('Không thể tải bài viết này. Bài viết có thể đã bị xóa.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [articleId])

  return (
    <div className="min-h-screen bg-[#f4fafd] font-vietnam">
      <SEO
        title={article?.title || 'Bài viết dành cho phụ huynh'}
        description={article?.excerpt || 'Kiến thức giúp phụ huynh đồng hành cùng con.'}
        schemaType="WebPage"
      />
      <Navbar />

      <main className="pb-10 md:pb-16">
        {loading && <p className="py-20 text-center text-[#575e70]">Đang tải bài viết...</p>}

        {!loading && error && (
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <p className="mb-6 text-[#575e70]">{error}</p>
            <Link to="/parents" className="font-bold text-[#0a7ad8] hover:underline">← Quay lại Dành cho phụ huynh</Link>
          </div>
        )}

        {!loading && article && (
          <>
            <div className="relative h-[220px] w-full overflow-hidden bg-[#d8edfa] sm:h-[300px] lg:aspect-[1920/450] lg:h-auto lg:max-h-[450px]">
              {article.image && (
                <img
                  src={resolveNewsImage(article.image)}
                  alt={article.title}
                  width="1920"
                  height="450"
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001e2f]/35 via-transparent to-transparent" />
            </div>

            <article className="relative z-10 mx-4 -mt-8 max-w-[1824px] rounded-[20px] border border-[#e2e2ea] bg-white px-5 py-7 shadow-[0_12px_40px_rgba(0,76,110,0.12)] sm:mx-6 sm:px-8 md:-mt-14 md:rounded-[24px] md:px-10 md:py-10 lg:mx-auto lg:-mt-[180px] lg:px-12">
              <Link to="/parents" className="mb-5 inline-flex items-center gap-2 text-[15px] font-medium text-[#0a7ad8] hover:underline">
                ← Dành cho phụ huynh
              </Link>
              <div className="mb-4 w-fit rounded-full bg-[#e5f2ff] px-3 py-1 text-[14px] font-medium text-[#0a7ad8]">
                {article.category}
              </div>
              <h1 className="font-baloo text-[28px] font-bold leading-tight text-[#004c6e] sm:text-[36px] lg:text-[44px]">
                {article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#e2e2ea] pb-5 text-[14px] text-[#8690a7] sm:text-[15px]">
                <span>Ngày đăng: {article.date}</span>
                <span>Người đăng: {article.author}</span>
              </div>
              <p className="mt-7 text-[17px] font-medium leading-8 text-[#575e70]">{article.excerpt}</p>
              <div
                className="mt-7 text-[16px] leading-8 text-[#37393e] [&_h1]:mb-4 [&_h1]:font-baloo [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:font-baloo [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#004c6e] [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl [&_li]:ml-6 [&_ol]:list-decimal [&_p]:mb-5 [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: article.content.join('') }}
              />
            </article>

            {relatedArticles.length > 0 && (
              <section className="mx-4 mt-8 max-w-[1824px] sm:mx-6 md:mt-10 lg:mx-auto">
                <h2 className="mb-6 font-baloo text-[26px] font-bold uppercase italic text-[#001e2f] sm:text-[32px]">
                  Bài viết liên quan
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {relatedArticles.map(item => (
                    <Link
                      key={item.id}
                      to={`/parents/articles/${item.id}`}
                      className="group flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#e2e2ea] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-[210px] overflow-hidden bg-[#d8edfa]">
                        {item.image && <img src={resolveNewsImage(item.image)} alt={item.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />}
                        <span className="absolute left-4 top-4 rounded-[7px] bg-[#004c6e] px-3 py-1 text-[12px] font-bold uppercase text-white">{item.category}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-3 text-[13px] text-[#575e70]">{item.date} • {item.author}</div>
                        <h3 className="line-clamp-2 font-baloo text-[20px] font-bold leading-7 text-[#001e2f]">{item.title}</h3>
                        <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-[#575e70]">{item.excerpt}</p>
                        <span className="mt-5 border-t border-[#e2e2ea] pt-4 text-[14px] font-bold text-[#0a7ad8]">Đọc tiếp →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
