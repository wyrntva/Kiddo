import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const imgHeroBg = "/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png"
const imgZone = "/assets/d40b12e9e0ded0d71e21206c1a1fd7e7547fb778.png"
const imgHeart = "/assets/601311fd499700ead517b85c70add1006f4669ce.svg"
const imgStarFilled = "/assets/81ba9f1daf2ecf4c10992f3055635021acbe778b.svg"
const imgStarEmpty = "/assets/7ec1bdd71358bad87dabead01d04537ca3db6722.svg"
const imgStarFilledSm = "/assets/5f4b469c66545c2ff1cf20ce7bbc09731bbbe55d.svg"
const imgStarEmptySm = "/assets/0a48ffb1b0c56300ebc704a0276a3f2cd07b495b.svg"
const imgToro = "/assets/8a42d8a694f66237d91d5cac631d21ee780cbf64.png"

type LessonStatus = 'completed' | 'in-progress' | 'not-started'

interface Lesson {
  id: number
  title: string
  description: string
  status: LessonStatus
  stars: number
}

const lessons: Lesson[] = [
  { id: 1, title: 'Con biết chào hỏi', description: 'Học chào hỏi lễ phép khi gặp người lớn', status: 'completed', stars: 5 },
  { id: 2, title: 'Con biết chào hỏi', description: 'Học chào hỏi lễ phép khi gặp người lớn', status: 'in-progress', stars: 0 },
  { id: 3, title: 'Con biết chào hỏi', description: 'Học chào hỏi lễ phép khi gặp người lớn', status: 'not-started', stars: 0 },
  { id: 4, title: 'Con biết chào hỏi', description: 'Học chào hỏi lễ phép khi gặp người lớn', status: 'not-started', stars: 0 },
  { id: 5, title: 'Con biết chào hỏi', description: 'Học chào hỏi lễ phép khi gặp người lớn', status: 'not-started', stars: 0 },
]

function StarRating({ filled, size = 'sm' }: { filled: number; size?: 'sm' | 'lg' }) {
  const total = 5
  const sz = size === 'lg' ? 'w-[50px] h-[50px]' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }, (_, i) => (
        <img
          key={i}
          src={i < filled ? (size === 'lg' ? imgStarFilled : imgStarFilledSm) : (size === 'lg' ? imgStarEmpty : imgStarEmptySm)}
          alt=""
          className={sz}
        />
      ))}
    </div>
  )
}

function StatusTag({ status }: { status: LessonStatus }) {
  if (status === 'completed') {
    return (
      <div className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#418457] bg-[#c3ffd0]">
        <span className="font-vietnam text-sm text-[#418457] tracking-wide">Đã học</span>
      </div>
    )
  }
  if (status === 'in-progress') {
    return (
      <div className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#fea01f] bg-[#fff4bf]">
        <span className="font-vietnam text-sm text-[#fea01f] tracking-wide">Đang học</span>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center px-2 py-1 rounded-lg border border-[#757e95] bg-[#f0f2f4]">
      <span className="font-vietnam text-sm text-[#757e95] tracking-wide">Chưa học</span>
    </div>
  )
}

function ActionButton({ status }: { status: LessonStatus }) {
  if (status === 'completed') {
    return (
      <button className="w-full py-2 px-4 rounded-[40px] border-2 border-white bg-[#339e4a] font-vietnam font-medium text-base text-white">
        Học lại
      </button>
    )
  }
  if (status === 'in-progress') {
    return (
      <button className="w-full py-2 px-4 rounded-[40px] border-2 border-white bg-[#fea01f] font-vietnam font-medium text-base text-white">
        Tiếp tục
      </button>
    )
  }
  return (
    <button className="w-full py-2 px-4 rounded-[40px] bg-[#0a7ad8] font-vietnam font-medium text-base text-white">
      Học ngay
    </button>
  )
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="bg-white border border-[#c3ffd0] rounded-2xl p-6 flex gap-6 items-start flex-1 min-w-0 drop-shadow-[0px_0px_5px_rgba(149,96,216,0.4)] relative">
      {/* Thumbnail + number badge */}
      <div className="relative shrink-0 w-[120px] self-stretch">
        <div className="bg-[#d2d2d2] w-full h-full rounded-xl min-h-[100px]" />
        <div className="absolute -left-2 -top-2 w-10 h-10 rounded-full bg-[#339e4a] border-2 border-white flex items-center justify-center">
          <span className="font-baloo text-lg text-white leading-8">{lesson.id}</span>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex flex-col gap-2">
          <h3 className="font-baloo text-lg text-[#37393e] leading-8">{lesson.title}</h3>
          <p className="font-vietnam text-base text-[#575e70] leading-6">{lesson.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <StarRating filled={lesson.stars} size="sm" />
            </div>
            <div className="flex-1">
              <StatusTag status={lesson.status} />
            </div>
          </div>
          <ActionButton status={lesson.status} />
        </div>
      </div>
    </div>
  )
}

export default function ZoneCamXucPage() {
  const completedCount = 2
  const totalCount = 5
  const progressPct = (completedCount / totalCount) * 100

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero section */}
        <div className="relative w-full overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white" />
            <img src={imgHeroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="relative z-10 max-w-[1920px] mx-auto px-12 py-6">
            <div className="flex gap-6 items-center">
              {/* Zone mascot image */}
              <div className="shrink-0 w-[280px] xl:w-[350px] h-[240px] xl:h-[277px] overflow-hidden">
                <img src={imgZone} alt="Vùng đất cảm xúc" className="w-full h-full object-cover" />
              </div>

              {/* Title + subtitle */}
              <div className="flex-1 flex flex-col gap-1 items-center justify-center">
                <h1 className="font-baloo text-4xl xl:text-[48px] text-[#339e4a] leading-[80px] font-normal">
                  Vùng đất cảm xúc
                </h1>
                <div className="flex items-center gap-1">
                  <span className="font-vietnam font-bold text-lg text-[#37393e] leading-6">
                    Cùng Toro học cách giao tiếp lễ phép và tự tin nhé!
                  </span>
                  <img src={imgHeart} alt="" className="w-6 h-6" />
                </div>
              </div>

              {/* Progress card */}
              <div className="shrink-0 w-[280px] xl:w-[350px] bg-white border border-[#c3ffd0] rounded-3xl p-4 flex flex-col gap-3 drop-shadow-[0px_0px_5px_rgba(149,96,216,0.4)]">
                <div className="flex items-center gap-3">
                  <span className="font-baloo text-base text-[#37393e] leading-7 flex-1">Tiến độ chủ đề</span>
                  <div className="flex items-center gap-2">
                    <span className="font-baloo text-2xl text-[#418457] leading-10">{completedCount}/{totalCount}</span>
                    <span className="font-vietnam text-base text-[#37393e] leading-6">bài</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    {Array.from({ length: 5 }, (_, i) => (
                      <img
                        key={i}
                        src={i < completedCount ? imgStarFilled : imgStarEmpty}
                        alt=""
                        className="w-[50px] h-[50px]"
                      />
                    ))}
                  </div>
                  <div className="relative bg-[#f7f6f8] border border-white rounded-full h-[19px] w-full overflow-hidden">
                    <div
                      className="absolute left-[6px] top-0 h-full bg-[#fdd444] rounded-full"
                      style={{ width: `${progressPct - 8}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course grid */}
        <div className="max-w-[1920px] mx-auto px-12 py-6 flex flex-col gap-6">
          {/* Row 1 */}
          <div className="flex gap-6 items-stretch">
            {lessons.slice(0, 3).map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6 items-stretch">
            {lessons.slice(3, 5).map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}

            {/* Encouragement card */}
            <div className="bg-[#f2fbef] border border-[#c3ffd0] rounded-xl flex items-center overflow-hidden flex-1 shadow-[0px_0px_10px_0px_rgba(149,96,216,0.4)]">
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h3 className="font-baloo text-[28px] text-[#418457] leading-[48px]">Cố lên nhé!</h3>
                <div className="flex items-end gap-1">
                  <span className="font-vietnam font-bold text-lg text-[#37393e] leading-6">Toro tin bạn làm được!</span>
                  <img src={imgHeart} alt="" className="w-6 h-6" />
                </div>
              </div>
              <div className="h-full flex-1 flex items-center justify-center overflow-hidden">
                <img
                  src={imgToro}
                  alt="Toro"
                  className="h-full w-auto object-contain max-h-[200px]"
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
