import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const imgHeroBg       = "/assets/91f866117dd6591a067bf62bae3766ed02c65b97.png"
const imgZone         = "/assets/thanh_pho_giao_tiep_island.png"
const imgStarFilled   = "/assets/81ba9f1daf2ecf4c10992f3055635021acbe778b.svg"
const imgStarEmpty    = "/assets/7ec1bdd71358bad87dabead01d04537ca3db6722.svg"
const imgStarFilledSm = "/assets/5f4b469c66545c2ff1cf20ce7bbc09731bbbe55d.svg"
const imgStarEmptySm  = "/assets/0a48ffb1b0c56300ebc704a0276a3f2cd07b495b.svg"
const imgToro         = "/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.png"

function HeartIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <path
        d="M5.15 0C2.36914 0 0 2.0793 0 4.7798C0 6.64275 0.872346 8.21118 2.02849 9.51043C3.18066 10.8052 4.66714 11.892 6.01097 12.8016L8.32959 14.3711C8.58351 14.543 8.91649 14.543 9.17041 14.3711L11.489 12.8016C12.8329 11.892 14.3193 10.8052 15.4715 9.51043C16.6277 8.21118 17.5 6.64275 17.5 4.7798C17.5 2.0793 15.1309 0 12.35 0C10.9165 0 9.65516 0.672139 8.75 1.54183C7.84484 0.672139 6.58347 0 5.15 0Z"
        fill={color}
      />
    </svg>
  )
}
type LessonStatus = 'completed' | 'in-progress' | 'not-started'
interface Lesson { id: number; title: string; description: string; status: LessonStatus; stars: number }

const lessons: Lesson[] = [
  { id: 1, title: 'Con biết chào hỏi', description: "Bé hiểu khi nào cần chào hỏi, biết chọn lời chào phù hợp với từng người và thể hiện thái độ lễ phép, thân thiện khi giao tiếp.", status: 'completed',    stars: 5 },
  { id: 2, title: 'Con nói lời cảm ơn', description: "Bé hiểu vì sao cần nói cảm ơn, biết nhận ra tình huống cần cảm ơn và chọn cách nói cảm ơn phù hợp, chân thành.", status: 'in-progress',  stars: 0 },
  { id: 3, title: 'Con nói lời xin lỗi', description: "Bé hiểu lời xin lỗi giúp sửa chữa tình huống, biết nhận ra khi mình làm sai và chọn cách xin lỗi phù hợp để thể hiện sự quan tâm đến người khác.", status: 'not-started',  stars: 0 },
  { id: 4, title: 'Con biết lắng nghe', description: "Bé hiểu lắng nghe là một phần quan trọng của giao tiếp, biết chú ý khi người khác nói, không ngắt lời và phản hồi phù hợp.", status: 'not-started',  stars: 0 },
  { id: 5, title: 'Con biết nhờ giúp đỡ', description: "Bé hiểu khi nào cần nhờ giúp đỡ, biết nói rõ điều mình cần và chọn cách nhờ giúp đỡ lịch sự, phù hợp với tình huống.", status: 'not-started',  stars: 0 },
]

/* ── Small star row (used in lesson cards) ── */
function SmallStarRow({ filled }: { filled: number }) {
  return (
    <div className="flex flex-[1_0_0] gap-[4px] items-start min-w-px">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="overflow-clip relative shrink-0 w-4 h-4">
          <div className="absolute" style={{ inset: '10.42% 8.34%' }}>
            <img
              src={i < filled ? imgStarFilledSm : imgStarEmptySm}
              alt=""
              className="absolute block inset-0 w-full h-full max-w-none"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Status tag ── */
function StatusTag({ status }: { status: LessonStatus }) {
  const map = {
    completed:    { bg: 'bg-[#c3ffd0]', border: 'border-[#418457]', color: 'text-[#418457]', label: 'Đã học'   },
    'in-progress':{ bg: 'bg-[#fff4bf]', border: 'border-[#fea01f]', color: 'text-[#fea01f]', label: 'Đang học' },
    'not-started':{ bg: 'bg-[#f0f2f4]', border: 'border-[#757e95]', color: 'text-[#757e95]', label: 'Chưa học' },
  }
  const v = map[status]
  return (
    <div className={`flex flex-[1_0_0] items-center justify-center min-w-px px-2 py-1 rounded-lg border ${v.bg} ${v.border}`}>
      <span className={`font-vietnam text-sm tracking-[0.28px] leading-5 ${v.color}`}>{v.label}</span>
    </div>
  )
}

/* ── Action button ── */
function ActionButton({ status }: { status: LessonStatus }) {
  if (status === 'completed')
    return (
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] bg-[#339e4a] border-2 border-white hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 ease-out">
        <span className="font-vietnam font-medium text-base leading-6 text-white whitespace-nowrap">Học lại</span>
      </button>
    )
  if (status === 'in-progress')
    return (
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] bg-[#fea01f] border-2 border-white hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 ease-out">
        <span className="font-vietnam font-medium text-base leading-6 text-white whitespace-nowrap">Tiếp tục</span>
      </button>
    )
  return (
    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[40px] bg-[#0a7ad8] hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 ease-out">
      <span className="font-vietnam font-medium text-base leading-6 text-white whitespace-nowrap">Học ngay</span>
    </button>
  )
}

/* ── Lesson card — matches Figma "Card bài học chủ đề" exactly ── */
function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="bg-white border border-[#C9E6FF] shadow-[0px_0px_10px_rgba(10,122,216,0.4)] hover:shadow-[0px_8px_20px_rgba(10,122,216,0.6)] hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 ease-out cursor-pointer flex flex-col sm:flex-row items-start gap-6 p-6 rounded-[16px] w-full h-full kiddo-zone-card" style={{ minHeight: '224px' }}>
      {/* Left: thumbnail (flex-1) + absolute number badge */}
      <div className="flex sm:flex-[1_0_0] h-[120px] sm:h-auto gap-3 items-end justify-end min-w-px relative self-stretch">
        <div className="bg-[#d2d2d2] w-full h-full relative rounded-xl" />
        <div
          className="absolute bg-[#0a7ad8] border-2 border-white flex items-center justify-center rounded-full w-10 h-10 shrink-0"
          style={{ left: -7, top: -9 }}
        >
          <span className="font-baloo text-[18px] leading-[32px] text-white text-center">{lesson.id}</span>
        </div>
      </div>

      {/* Right: content (flex-1) */}
      <div className="flex flex-[1_0_0] flex-col gap-2 justify-between items-start min-w-[150px] w-full self-stretch">
        {/* Title + description */}
        <div className="flex flex-col gap-1 w-full text-left">
          <p className="font-baloo text-[18px] font-bold leading-[28px] text-[#37393E]">{lesson.title}</p>
          <p className="font-vietnam font-normal text-[16px] leading-[22px] text-[#575E70] line-clamp-4 min-h-[88px]">
            {lesson.description}
          </p>
        </div>
        {/* Stars row (gap-[54px] matches Figma exactly) + button */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-[24px] sm:gap-[54px] items-center justify-between sm:justify-start w-full">
            <SmallStarRow filled={lesson.stars} />
            <StatusTag status={lesson.status} />
          </div>
          <ActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}

const COMPLETED = 2
const TOTAL     = 5

export default function ZoneGiaoTiepPage() {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/*
        min-h-[calc(100vh-64px)] ensures footer is always below the fold.
        Background image covers the whole main area.
      */}
      <main className="flex-1 min-h-[calc(100vh-64px)] relative">

        {/* Full-section background */}
        <img
          src={imgHeroBg}
          alt=""
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        />

        {/* Content — px-[48px] py-[24px] gap-[48px] matches Figma frame 240:10773 */}
        <div className="relative z-10 max-w-[1920px] mx-auto px-4 md:px-[48px] pt-[48px] pb-[48px] flex flex-col gap-[48px]">

          {/* ── HERO ROW — flex gap-[24px] items-center ── */}
          <div className="flex flex-col xl:flex-row gap-[16px] items-center justify-between w-full">

            {/* 1. Island column — left aligned on desktop */}
            <div className="w-full xl:w-[350px] flex justify-center xl:justify-start shrink-0">
              <div className="relative shrink-0 w-[170px] xl:w-[240px] aspect-square -my-[15px] xl:-my-[25px] hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer">
                <img
                  src={imgZone}
                  alt="Thành phố giao tiếp"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>
            </div>

            {/* 2. Title + subtitle column — centered */}
            <div className="flex-1 flex flex-col gap-[4px] items-center justify-center text-center">
              <p className="font-baloo text-[44px] md:text-[60px] font-bold leading-[56px] md:leading-[90px] text-[#0a7ad8] whitespace-nowrap">
                Thành phố giao tiếp
              </p>
              <div className="flex flex-wrap gap-[6px] justify-center items-center shrink-0">
                {/* Be Vietnam Pro Bold — font-bold is weight 700 ✓ */}
                <p className="font-vietnam font-bold text-[16px] md:text-[22px] leading-[24px] md:leading-[28px] text-[#37393E]">
                  Cùng Toro học cách giao tiếp lễ phép và tự tin nhé!
                </p>
                <div className="w-6 h-6 md:w-7 md:h-7 shrink-0">
                  <HeartIcon color="#0a7ad8" />
                </div>
              </div>
            </div>

            {/* 3. Progress card column — right aligned on desktop */}
            <div className="w-full xl:w-[350px] flex justify-center xl:justify-end shrink-0">
              <div className="bg-white border border-[#bce2ff] shadow-[0px_0px_10px_rgba(10,122,216,0.2)] hover:shadow-[0px_6px_15px_rgba(10,122,216,0.4)] hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col gap-3 items-start p-4 rounded-[24px] w-full xl:w-[350px]">
                {/* Header row */}
                <div className="flex gap-3 items-center w-full">
                  <div className="flex flex-[1_0_0] min-w-px">
                     <p className="font-baloo text-[16px] font-bold leading-[28px] text-[#37393E]">Tiến độ chủ đề</p>
                  </div>
                  <div className="flex gap-2 items-center shrink-0">
                     <span className="font-baloo text-[24px] font-bold leading-[40px] text-[#0a7ad8]">{COMPLETED}/{TOTAL}</span>
                    <span className="font-vietnam text-base leading-6 text-[#37393e]">bài</span>
                  </div>
                </div>

                {/* Stars + progress bar */}
                <div className="flex flex-col w-full" style={{ gap: '9.33px' }}>
                  {/* 5 big stars — exact Figma inset pattern */}
                  <div className="flex items-center justify-between w-full">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="relative shrink-0 w-[50px] h-[50px]">
                        <div className="absolute" style={{ inset: '10.42% 8.34%' }}>
                          <img
                            src={i < COMPLETED ? imgStarFilled : imgStarEmpty}
                            alt=""
                            className="absolute block inset-0 w-full h-full max-w-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Progress bar — dynamic width based on progress */}
                  <div
                    className="bg-[#f7f6f8] h-[19px] overflow-clip relative rounded-full w-full"
                    style={{ border: '1.042px solid white' }}
                  >
                    <div
                      className="absolute bg-[#fdd444] h-[19px] rounded-full transition-all duration-300"
                      style={{ left: '6px', top: '-1.04px', width: `calc(${(COMPLETED / TOTAL) * 100}% - 12px)` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CARD GRID: 5 lessons + 1 encouragement card ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 xl:auto-rows-fr gap-[24px] w-full">
            {lessons.map(l => <LessonCard key={l.id} lesson={l} />)}

            {/* Encouragement card — matches Figma node 240:10920 */}
            <div className="bg-[#e5f2ff] border border-[#bce2ff] rounded-[12px] shadow-[0px_0px_10px_rgba(10,122,216,0.4)] hover:shadow-[0px_8px_20px_rgba(10,122,216,0.6)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col sm:flex-row items-center overflow-clip relative w-full h-full kiddo-zone-card" style={{ minHeight: '224px' }}>
              {/* Left Side: Text */}
              <div className="flex flex-col justify-center items-start p-6 shrink-0 w-full sm:w-[279px] text-left self-stretch">
                <div className="flex flex-col gap-[12px] items-start w-full">
                  <p className="font-baloo font-bold text-[28px] leading-[48px] text-[#0a7ad8] whitespace-nowrap">
                    Cố lên nhé!
                  </p>
                  <div className="flex gap-[4px] items-center">
                    <p className="font-vietnam font-bold text-[18px] leading-[24px] text-[#37393e] whitespace-nowrap">
                      Toro tin bạn làm được!
                    </p>
                    <div className="w-4 h-4 shrink-0">
                      <HeartIcon color="#0a7ad8" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Side: Toro mascot */}
              <div className="flex flex-1 h-[140px] sm:h-full relative overflow-hidden self-stretch">
                <img
                  src={imgToro}
                  alt="Toro"
                  className="absolute h-[127.2%] w-[160.25%] max-w-none left-[-30.13%] top-0 object-contain object-bottom"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
