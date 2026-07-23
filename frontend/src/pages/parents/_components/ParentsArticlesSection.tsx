import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resolveNewsImage, type NewsArticle } from '../newsApi'

const imgCalendar = '/assets/301795cd9061ae01af0f35a90267af9138916e7e.svg'
const imgStar = '/assets/840e2a429f658f653956cea3592d2b076218c88d.svg'

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link to={`/parents/articles/${article.id}`} className="flex flex-col overflow-hidden rounded-[24px] border border-[#e2e2ea] bg-white transition-shadow hover:shadow-md">
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[#d2d2d2]">
        <img loading="lazy" decoding="async" alt={article.title} src={resolveNewsImage(article.image)} className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <span className="text-[13px] font-medium text-[#0a7ad8]">{article.category}</span>
          <p className="font-baloo text-[18px] font-bold leading-8 text-[#37393e]">{article.title}</p>
          <p className="line-clamp-2 font-vietnam text-[16px] leading-6 text-[#575e70]">{article.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 text-[14px] text-[#8690a7]">
          <img alt="" src={imgCalendar} className="size-6" />
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
      </div>
    </Link>
  )
}

export default function ParentsArticlesSection({
  articles,
  activeCategory,
}: {
  articles: NewsArticle[]
  activeCategory: string
}) {
  const [search, setSearch] = useState('')
  const filtered = articles.filter(article => {
    const matchesCategory = activeCategory === 'Tất cả' || article.category === activeCategory
    const query = search.trim().toLocaleLowerCase('vi')
    const matchesSearch = !query ||
      article.title.toLocaleLowerCase('vi').includes(query) ||
      article.excerpt.toLocaleLowerCase('vi').includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-[#fff4bf] p-2">
            <img alt="" src={imgStar} className="size-6" />
          </div>
          <p className="font-baloo text-[24px] font-bold leading-10 text-black">Bài viết mới nhất</p>
        </div>
        <div className="flex w-full items-center gap-2 rounded-[24px] border border-[#8690a7] bg-white px-4 py-2 sm:w-[320px]">
          <span aria-hidden="true" className="text-[#8690a7]">⌕</span>
          <input
            type="search"
            placeholder="Tìm bài viết..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent font-vietnam text-[16px] outline-none"
          />
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
      ) : (
        <p className="py-8 text-center font-vietnam text-[#575e70]">Không tìm thấy bài viết phù hợp.</p>
      )}
    </div>
  )
}
