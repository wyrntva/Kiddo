import type { DiaryLesson } from '../types'

function FeedbackColumn({
  title,
  titleColor,
  bgColor,
  borderColor,
  iconBorderColor,
  iconBgColor,
  icon,
  bulletIcon,
  items,
}: {
  title: string
  titleColor: string
  bgColor: string
  borderColor: string
  iconBorderColor: string
  iconBgColor: string
  icon: React.ReactNode
  bulletIcon: string
  items: string[]
}) {
  return (
    <div className="rounded-[24px] p-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-200 flex flex-col gap-[24px]" style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}>
      <div className="flex items-center gap-[12px] shrink-0 w-full">
        <div className="p-[4px] rounded-full shrink-0 flex items-center justify-center" style={{ border: `1px solid ${iconBorderColor}` }}>
          <div className="p-[8px] rounded-full shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: iconBgColor }}>
            {icon}
          </div>
        </div>
        <div className="pb-[4px] flex-1 flex flex-col items-start justify-center" style={{ borderBottom: `1px dashed ${titleColor}` }}>
          <h4 className="font-baloo text-[24px] font-bold leading-[40px]" style={{ color: titleColor }}>{title}</h4>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 items-start">
            <span className="shrink-0 w-6 h-6 mt-0.5">
              <img src={bulletIcon} alt="Check" className="w-full h-full" loading="lazy" />
            </span>
            <span className="font-vietnam text-[16px] font-medium leading-[24px] text-[#313235]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DiaryFeedbackPanel({ lesson }: { lesson: DiaryLesson }) {
  return (
    <div className="relative rounded-[24px] w-full h-auto p-[16px] sm:p-[24px] lg:p-[32px] xl:p-[40px] border border-[#BAE6FD] shadow-[0px_0px_5px_rgba(0,0,0,0.05)] flex flex-col gap-[20px] xl:gap-[24px] overflow-hidden justify-between">
      <div className="absolute inset-0 pointer-events-none rounded-[24px] z-0">
        <div className="absolute bg-white inset-0 rounded-[24px]" />
        <img alt="Sky Background" className="absolute max-w-none object-cover rounded-[24px] w-full h-full" loading="lazy" src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.png" />
      </div>

      <div className="flex justify-between items-center relative z-10 w-full pb-2 pr-0 xl:pr-[280px]">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
          <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] xl:w-[120px] xl:h-[120px] shrink-0 relative overflow-visible">
            <div className="absolute inset-[0_9.35%]">
              <img src="/assets/e07e743fd476475cd05aedf502e19c4792f1a76e.svg" alt="Medal" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
            </div>
          </div>

          <div className="flex flex-col justify-center sm:justify-start h-full pt-1 sm:pt-2">
            <span className="font-vietnam text-[16px] sm:text-[20px] xl:text-[24px] font-bold text-[#37393e] leading-snug sm:leading-[32px] xl:leading-[40px]">Vừa hoàn thành bài học</span>
            <h2 className="font-baloo text-[24px] sm:text-[36px] xl:text-[48px] font-black text-[#0A7AD8] leading-tight sm:leading-[48px] xl:leading-[64px]">
              {lesson.feedback.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="absolute right-[24px] xl:right-[48px] top-[24px] w-[200px] xl:w-[280px] h-[150px] xl:h-[200px] pointer-events-none z-10 hidden lg:block">
        <img
          src="/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.png"
          alt="Mascot Otter holding Trophy"
          loading="lazy"
          className="absolute h-[154.71%] left-[-48.13%] max-w-none top-[-9.52%] w-[196.55%] object-contain"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[16px] xl:gap-[24px] relative z-10 mt-2">
        <FeedbackColumn
          title="Điểm mạnh"
          titleColor="#339e4a"
          bgColor="#f2fbef"
          borderColor="#9de4af"
          iconBorderColor="#9de4af"
          iconBgColor="#339e4a"
          icon={<img src="/assets/781765e07dba9b19c7235eef3c818a8faf26e891.svg" alt="Star" className="w-6 h-6" loading="lazy" />}
          bulletIcon="/assets/0b40b5852870bd86ba33ba6078e2bd0b4b0b6bad.svg"
          items={lesson.feedback.strengths}
        />
        <FeedbackColumn
          title="Cần luyện thêm"
          titleColor="#fea01f"
          bgColor="#fef9ed"
          borderColor="#ffdc64"
          iconBorderColor="#ffdc64"
          iconBgColor="#fea01f"
          icon={<img src="/assets/a7de906b07dd2bfbe826ef5f3ae618e76bfa3ef3.svg" alt="Practice" className="w-6 h-6" loading="lazy" />}
          bulletIcon="/assets/5ff06334161ed0621fed80bef95568a1a034d49f.svg"
          items={lesson.feedback.practice}
        />
        <FeedbackColumn
          title="Gợi ý cho phụ huynh"
          titleColor="#0a7ad8"
          bgColor="#f4fafd"
          borderColor="#c9e6ff"
          iconBorderColor="#c9e6ff"
          iconBgColor="#0a7ad8"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M4.5 9.76594C4.5 5.73718 7.87403 2.5 12 2.5C16.126 2.5 19.5 5.73718 19.5 9.76594C19.5 12.1199 18.5269 14.2437 16.7051 15.5831C16.5794 15.6756 16.5033 15.7902 16.4767 15.9028C16.423 16.1308 16.3641 16.3918 16.3035 16.6718C16.2735 16.8103 16.1512 16.9095 16.0095 16.9095H7.99054C7.8488 16.9095 7.72649 16.8103 7.6965 16.6718C7.63588 16.3918 7.57696 16.1308 7.52325 15.9028C7.49675 15.7902 7.42064 15.6756 7.2949 15.5831C5.47313 14.2437 4.5 12.1199 4.5 9.76594Z" fill="white"/>
              <path d="M8.40053 18.4095C8.21367 18.4095 8.07242 18.5786 8.10352 18.7629C8.19745 19.3194 8.26604 19.8165 8.28682 20.1599C8.34981 21.2011 9.11672 22.0588 10.1422 22.2803L10.3382 22.3227C11.4326 22.5591 12.5674 22.5591 13.6618 22.3227L13.8578 22.2803C14.8833 22.0588 15.6502 21.2011 15.7132 20.1599C15.734 19.8165 15.8026 19.3194 15.8965 18.7629C15.9276 18.5786 15.7863 18.4095 15.5995 18.4095H8.40053Z" fill="white"/>
            </svg>
          }
          bulletIcon="/assets/dfc0fd4a7226ab8dabdc2a5e582c88014bad289a.svg"
          items={lesson.feedback.tips}
        />
      </div>
    </div>
  )
}
