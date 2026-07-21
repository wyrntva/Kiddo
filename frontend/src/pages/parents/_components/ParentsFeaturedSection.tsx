const imgFeatured   = "/assets/2ef900d41652ded63060baf5f80eaa8c41302f1c.png"
const imgStar       = "/assets/fab336f52963bda96bf7fd3972c00e6f48413f30.svg"
const imgCalendar   = "/assets/301795cd9061ae01af0f35a90267af9138916e7e.svg"
const imgEye        = "/assets/b21e2894a8889fed5ba2dc562524705ab4d680eb.svg"

interface FeaturedArticle {
  id: number
  image: string
  title: string
  description: string
  date: string
  views: string
  tag: string
}

const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: 1,
    image: imgFeatured,
    title: '5 cách giúp con hiểu và gọi tên cảm xúc của mình',
    description: 'Giúp trẻ nhận biết cảm xúc là bước đầu quan trọng để con học cách kiểm soát và thể hiện cảm xúc một cách tích cực.',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    tag: 'Phát triển cảm xúc',
  },
  {
    id: 2,
    image: imgFeatured,
    title: '5 cách giúp con hiểu và gọi tên cảm xúc của mình',
    description: 'Giúp trẻ nhận biết cảm xúc là bước đầu quan trọng để con học cách kiểm soát và thể hiện cảm xúc một cách tích cực.',
    date: '15:00 20/05/2026',
    views: '24 lượt xem',
    tag: 'Phát triển cảm xúc',
  },
]

function FeaturedCard({ article }: { article: FeaturedArticle }) {
  return (
    <div className="bg-white border border-[#e2e2ea] rounded-[24px] flex flex-col lg:flex-row flex-1 min-w-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      {/* Image side */}
      <div className="relative w-full h-[200px] sm:h-[240px] lg:w-[45%] lg:h-auto shrink-0">
        <img
          alt={article.title}
          src={article.image}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Nổi bật badge */}
        <div className="absolute top-4 left-4 bg-[#fea01f] flex items-center gap-2 px-3 py-1 rounded-[40px]">
          <div className="relative shrink-0 size-[20px] overflow-clip">
            <div className="absolute inset-[10.42%_8.34%]">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgStar} />
            </div>
          </div>
          <span className="font-vietnam text-[14px] font-medium text-white tracking-[0.28px]">Nổi bật</span>
        </div>
      </div>

      {/* Content side */}
      <div className="flex flex-col gap-4 items-start p-5 lg:p-6 flex-1 min-w-0">
        {/* Tag */}
        <div className="bg-[#e5f2ff] border border-[#0a7ad8] flex items-center px-2 py-1 rounded-[8px] shrink-0">
          <span className="font-vietnam text-[14px] text-[#0a7ad8] tracking-[0.28px] whitespace-nowrap">{article.tag}</span>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 w-full">
          <p className="font-baloo font-bold text-[18px] leading-[32px] text-[#37393e]">{article.title}</p>
          <p className="font-vietnam text-[16px] leading-[24px] text-[#575e70]">{article.description}</p>
        </div>

        {/* Meta */}
        <div className="flex gap-4 items-start w-full">
          <div className="flex flex-1 gap-2 items-center py-2">
            <div className="relative shrink-0 size-[24px] overflow-clip">
              <div className="absolute inset-[6.25%_12.5%_11.46%_12.5%]">
                <div className="absolute inset-[-3.8%_-4.17%]">
                  <img alt="" className="block w-full h-full" src={imgCalendar} />
                </div>
              </div>
            </div>
            <span className="font-vietnam font-medium text-[14px] leading-[20px] text-[#8690a7] tracking-[0.28px] whitespace-nowrap">{article.date}</span>
          </div>
          <div className="flex flex-1 gap-2 items-center justify-end py-2">
            <div className="relative shrink-0 size-[24px] overflow-clip">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4">
                <div className="absolute inset-[-6.25%_-4.17%]">
                  <img alt="" className="block w-full h-full" src={imgEye} />
                </div>
              </div>
            </div>
            <span className="font-vietnam font-medium text-[14px] leading-[20px] text-[#8690a7] tracking-[0.28px] whitespace-nowrap">{article.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ParentsFeaturedSection() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      {FEATURED_ARTICLES.map(article => (
        <FeaturedCard key={article.id} article={article} />
      ))}
    </div>
  )
}
