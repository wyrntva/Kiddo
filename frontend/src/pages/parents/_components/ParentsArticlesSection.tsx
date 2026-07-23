import { useState } from 'react'
import { Link } from 'react-router-dom'

const imgCard1      = "/assets/e8804dfc93d2a6f7e86dfd11a04dcfe495214e95.webp"
const imgCard2      = "/assets/cd8eb4ae612b9c9fea7a4434916202f28d3f600f.webp"
const imgCard3      = "/assets/72930f953788db5aa9e8963a388682969be217ab.webp"
const imgCard4      = "/assets/17f3f0ac4921ae7dbae01d54bab257633af33b57.webp"
const imgCalendar   = "/assets/301795cd9061ae01af0f35a90267af9138916e7e.svg"
const imgEye        = "/assets/b21e2894a8889fed5ba2dc562524705ab4d680eb.svg"
const imgStar       = "/assets/840e2a429f658f653956cea3592d2b076218c88d.svg"
const imgCaretDown  = "/assets/db119c5879e533666bf4d57c819bd3abd97eb956.svg"

export interface Article {
  id: number
  slug: string
  image: string
  title: string
  description: string
  date: string
  views: string
  category: string
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: 'ky-nang-giao-tiep-cho-tre-3-6-tuoi',
    image: imgCard1,
    title: 'Kỹ năng giao tiếp cho trẻ 3-6 tuổi',
    description: 'Gợi ý những cách đơn giản giúp con tự tin nói và lắng nghe mỗi ngày.',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    category: 'Kỹ năng sống',
  },
  {
    id: 2,
    slug: 'huong-dan-con-tu-lap-tung-buoc-nho',
    image: imgCard2,
    title: 'Hướng dẫn con tự lập từng bước nhỏ',
    description: 'Những thói quen nhỏ mỗi ngày sẽ giúp con tự tin và chủ động hơn.',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    category: 'Kỹ năng sống',
  },
  {
    id: 3,
    slug: 'day-con-biet-chia-se-va-quan-tam',
    image: imgCard3,
    title: 'Dạy con biết chia sẻ và quan tâm',
    description: 'Nuôi dưỡng lòng nhân ái và dạy con biết chia sẻ với mọi người',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    category: 'Phát triển cảm xúc',
  },
  {
    id: 4,
    slug: '3-buoc-giup-con-binh-tinh-khi-gap-tinh-huong-kho',
    image: imgCard4,
    title: '3 bước giúp con bình tĩnh khi gặp tình huống khó',
    description: 'Cùng con học cách hít thở, suy nghĩ và chọn cách xử lý phù hợp',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    category: 'Phát triển cảm xúc',
  },
]

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/parents/articles/${article.slug}`} className="bg-white border border-[#e2e2ea] rounded-[24px] flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7ad8]">
      {/* Thumbnail */}
      <div className="h-[200px] relative w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[#d2d2d2]" />
        <img loading="lazy" decoding="async"
          alt={article.title}
          src={article.image}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 items-start p-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <p className="font-baloo font-bold text-[18px] leading-[32px] text-[#37393e]">{article.title}</p>
          <p className="font-vietnam text-[16px] leading-[24px] text-[#575e70] line-clamp-2 overflow-hidden">{article.description}</p>
        </div>

        {/* Meta */}
        <div className="flex gap-4 items-center w-full">
          <div className="flex flex-1 gap-2 items-center py-2">
            <div className="relative shrink-0 size-[24px] overflow-clip">
              <div className="absolute inset-[6.25%_12.5%_11.46%_12.5%]">
                <div className="absolute inset-[-3.8%_-4.17%]">
                  <img loading="lazy" decoding="async" alt="" className="block w-full h-full" src={imgCalendar} />
                </div>
              </div>
            </div>
            <span className="font-vietnam font-medium text-[14px] leading-[20px] text-[#8690a7] tracking-[0.28px] whitespace-nowrap">{article.date}</span>
          </div>
          <div className="flex flex-1 gap-2 items-center justify-end py-2">
            <div className="relative shrink-0 size-[24px] overflow-clip">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4">
                <div className="absolute inset-[-6.25%_-4.17%]">
                  <img loading="lazy" decoding="async" alt="" className="block w-full h-full" src={imgEye} />
                </div>
              </div>
            </div>
            <span className="font-vietnam font-medium text-[14px] leading-[20px] text-[#8690a7] tracking-[0.28px] whitespace-nowrap">{article.views}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ParentsArticlesSection({ activeCategory = 'Tất cả' }: { activeCategory?: string }) {
  const [search, setSearch] = useState('')

  const filtered = ARTICLES.filter(a => {
    const matchesCategory = activeCategory === 'Tất cả' || a.category === activeCategory
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Section header */}
      <div className="flex items-center justify-between w-full flex-wrap gap-4">
        <div className="flex gap-3 items-center shrink-0">
          <div className="bg-[#fff4bf] flex items-center justify-center p-2 rounded-[100px] shrink-0">
            <div className="relative size-[24px] overflow-clip">
              <div className="absolute inset-[10.42%_8.34%]">
                <div className="absolute inset-[-3.95%_-3.75%]">
                  <img loading="lazy" decoding="async" alt="" className="block w-full h-full" src={imgStar} />
                </div>
              </div>
            </div>
          </div>
          <p className="font-baloo font-bold text-[24px] leading-[40px] text-black">Bài viết mới nhất</p>
        </div>

        {/* Search input */}
        <div className="bg-white border border-[#8690a7] flex gap-2 items-center justify-center px-4 py-2 rounded-[24px] w-full sm:w-[320px]">
          <svg className="shrink-0 size-[24px] text-[#8690a7]" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.875 15.4554L20.875 19.4602C21.0536 19.6589 21.0448 19.9631 20.855 20.1511L20.155 20.8519C20.0611 20.9467 19.9333 21 19.8 21C19.6667 21 19.5389 20.9467 19.445 20.8519L15.445 16.8471C15.3344 16.7362 15.234 16.6156 15.145 16.4867L14.395 15.4855C13.1541 16.4776 11.613 17.0178 10.025 17.0173C6.75261 17.0287 3.90902 14.7686 3.17773 11.5751C2.44643 8.38161 4.0226 5.10699 6.9731 3.68991C9.92359 2.27284 13.461 3.09151 15.491 5.66125C17.521 8.23099 17.5019 11.866 15.445 14.4142L16.445 15.105C16.6012 15.2051 16.7454 15.3226 16.875 15.4554ZM5.025 10.0089C5.025 12.7736 7.26357 15.0149 10.025 15.0149C11.3511 15.0149 12.6228 14.4875 13.5605 13.5487C14.4982 12.6099 15.025 11.3365 15.025 10.0089C15.025 7.24411 12.7864 5.00284 10.025 5.00284C7.26357 5.00284 5.025 7.24411 5.025 10.0089Z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            placeholder="Tìm bài viết..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-0 font-vietnam text-[16px] text-[#8690a7] outline-none bg-transparent placeholder:text-[#8690a7]"
          />
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filtered.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex items-center justify-center w-full pt-2">
        <button className="flex gap-2 items-center justify-center px-6 py-3 rounded-[40px] hover:bg-[#e5f2ff] transition-colors">
          <span className="font-vietnam text-[16px] font-medium text-[#0a7ad8] whitespace-nowrap">Xem thêm bài viết</span>
          <div className="relative shrink-0 size-[24px]">
            <div className="absolute inset-[36.46%_30.21%_40.63%_30.21%]">
              <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full" src={imgCaretDown} />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
