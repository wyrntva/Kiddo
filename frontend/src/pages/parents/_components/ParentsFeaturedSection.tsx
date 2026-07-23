import { Link } from 'react-router-dom'
import { resolveNewsImage, type NewsArticle } from '../newsApi'

const imgStar = '/assets/fab336f52963bda96bf7fd3972c00e6f48413f30.svg'
const imgCalendar = '/assets/301795cd9061ae01af0f35a90267af9138916e7e.svg'

function FeaturedCard({ article }: { article: NewsArticle }) {
  return (
    <Link to={`/parents/articles/${article.id}`} className="flex flex-1 min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#e2e2ea] bg-white transition-shadow hover:shadow-md lg:flex-row xl:h-[264px]">
      <div className="relative h-[200px] w-full shrink-0 sm:h-[240px] lg:h-auto lg:w-[45%] xl:h-[264px] xl:w-[400px]">
        <img loading="lazy" decoding="async" alt={article.title} src={resolveNewsImage(article.image)} className="absolute inset-0 size-full object-cover" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-[40px] bg-[#fea01f] px-3 py-1">
          <img alt="" src={imgStar} className="size-5" />
          <span className="font-vietnam text-[14px] font-medium text-white">Nổi bật</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-4 p-5 lg:p-6">
        <div className="rounded-[8px] border border-[#0a7ad8] bg-[#e5f2ff] px-2 py-1">
          <span className="font-vietnam text-[14px] text-[#0a7ad8]">{article.category}</span>
        </div>
        <div className="w-full">
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

export default function ParentsFeaturedSection({
  articles,
  activeCategory,
}: {
  articles: NewsArticle[]
  activeCategory: string
}) {
  const filtered = articles.filter(article => activeCategory === 'Tất cả' || article.category === activeCategory)
  if (filtered.length === 0) return null

  return (
    <div className="flex w-full flex-col gap-6 sm:flex-row">
      {filtered.map(article => <FeaturedCard key={article.id} article={article} />)}
    </div>
  )
}
