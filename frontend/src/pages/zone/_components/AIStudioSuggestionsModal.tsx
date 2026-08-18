import { useEffect, useState } from 'react'
import type { DiaryLesson } from '../../diary/types'
import toroChatbot from '../../../assets/toro-chatbot.webp'

interface ParentGuide {
  id: string
  title: string
  description: string
  tip?: string
}

interface AISuggestionsData {
  title: string
  summary: string
  parentGuides: ParentGuide[]
  toroMessage?: string
}

interface AIStudioSuggestionsModalProps {
  isOpen: boolean
  onClose: () => void
  feedback?: DiaryLesson['feedback']
  lessonTitle?: string
}

const getApiUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.hostname.includes('ottopia.vn')) {
      return window.location.origin
    }
    return `http://${window.location.hostname}:5000`
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:5000'
}

const API_URL = getApiUrl()

export default function AIStudioSuggestionsModal({
  isOpen,
  onClose,
  feedback,
  lessonTitle,
}: AIStudioSuggestionsModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AISuggestionsData | null>(null)

  const practice = feedback?.practice || []
  const tips = feedback?.tips || []
  const strengths = feedback?.strengths || []
  const displayTitle = lessonTitle || feedback?.title || 'Con đang cảm thấy gì?'

  const fetchSuggestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/chat/lesson-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle: displayTitle,
          strengths,
          practice,
          tips,
        }),
      })

      if (!response.ok) {
        throw new Error('Không thể kết nối đến AI Studio')
      }

      const result = await response.json()
      setData(result)
    } catch (err: any) {
      console.error('Error fetching AI suggestions:', err)
      setError('Toro đang bận một chút, bạn thử bấm "Thử lại" nhé!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-auto max-h-[92dvh] sm:max-h-[88dvh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[20px] sm:rounded-[28px] border-2 border-[#FEA01F] bg-white shadow-2xl">
        
        {/* Background Sky Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <img
            src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header - Responsive */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#BAE6FD]/80 bg-white/85 px-3.5 py-2.5 sm:px-6 sm:py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FEA01F] to-[#FF8C00] p-1 shadow-sm">
              <img
                src={toroChatbot}
                alt="Toro Mascot"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 font-baloo text-[11px] sm:text-[12px] font-bold text-[#E68E16] leading-none">
                  AI STUDIO GỢI Ý
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 font-vietnam text-[10px] sm:text-[11px] font-medium text-[#0A7AD8] leading-none">
                  Dành cho phụ huynh
                </span>
              </div>
              <h3 className="font-baloo text-[16px] sm:text-[20px] font-bold leading-tight text-[#0A7AD8] truncate">
                {data?.title || 'Gợi ý đồng hành dành cho ba mẹ'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng"
            className="flex size-8 sm:size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-800 active:scale-95 ml-2"
          >
            <svg className="size-4 sm:size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body - Fully Responsive & Scrollable */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto p-3.5 sm:p-5 md:p-6">
          
          {loading ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="relative flex size-16 sm:size-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-100 via-orange-50 to-blue-50 border-4 border-[#FEA01F] shadow-md animate-bounce">
                <img
                  src={toroChatbot}
                  alt="Toro thinking"
                  className="size-11 sm:size-14 object-contain"
                />
              </div>
              <div className="max-w-md px-2">
                <h4 className="font-baloo text-[18px] sm:text-[20px] font-bold text-[#37393E]">
                  Toro đang phân tích kết quả bài học...
                </h4>
                <p className="mt-1 font-vietnam text-[13px] sm:text-[14px] text-[#61646B]">
                  Đang tạo các gợi ý đồng hành thực tế dành riêng cho ba mẹ
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="size-2.5 rounded-full bg-[#FEA01F] animate-ping" />
                <span className="size-2.5 rounded-full bg-[#0A7AD8] animate-ping [animation-delay:200ms]" />
                <span className="size-2.5 rounded-full bg-[#339E4A] animate-ping [animation-delay:400ms]" />
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3.5 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-red-100 font-bold text-lg text-red-500">
                !
              </div>
              <p className="font-vietnam text-[14px] font-medium text-gray-700">{error}</p>
              <button
                onClick={fetchSuggestions}
                className="cursor-pointer rounded-full bg-[#FEA01F] px-5 py-2 font-baloo text-[14px] font-bold text-white shadow-md transition-all hover:bg-[#e68e16] active:scale-95"
              >
                Thử lại ngay
              </button>
            </div>
          ) : data ? (
            <div className="flex flex-col gap-3.5 sm:gap-4 pb-2">
              {/* Context Summary Banner */}
              <div className="flex flex-col gap-2 rounded-xl sm:rounded-2xl border border-[#BAE6FD] bg-gradient-to-r from-[#F0F9FF] via-[#FEF9ED] to-[#F4FAFD] p-3 sm:p-4 shadow-sm">
                <p className="font-vietnam text-[13px] sm:text-[14px] font-medium text-[#37393E] leading-relaxed">
                  {data.summary}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-medium">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[#0A7AD8] border border-blue-200">
                    Bài học: {displayTitle}
                  </span>
                  {practice.length > 0 && (
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-amber-700 border border-amber-200">
                      {practice.length} điểm cần rèn luyện
                    </span>
                  )}
                  {tips.length > 0 && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-green-700 border border-green-200">
                      {tips.length} gợi ý từ bài học
                    </span>
                  )}
                </div>
              </div>

              {/* Parent Guides List - Grid 1 col on mobile, 2 cols on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {data.parentGuides?.map((guide, idx) => (
                  <div
                    key={guide.id || idx}
                    className="flex flex-col justify-between gap-2.5 rounded-xl sm:rounded-2xl border border-[#C9E6FF] bg-gradient-to-br from-[#F4FAFD] to-[#FFFFFF] p-3.5 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-[#0A7AD8]"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 font-vietnam text-[10px] sm:text-[11px] font-bold text-[#0A7AD8]">
                          Gợi ý #{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-baloo text-[15px] sm:text-[17px] font-bold text-[#37393E] leading-snug">
                        {guide.title}
                      </h4>
                    </div>
                    <p className="font-vietnam text-[12.5px] sm:text-[13.5px] text-[#555861] leading-relaxed">
                      {guide.description}
                    </p>
                    {guide.tip && (
                      <div className="mt-1 flex items-start gap-1.5 rounded-lg bg-blue-50/80 p-2 sm:p-2.5 text-[11.5px] sm:text-[12.5px] font-medium text-[#0A7AD8] border border-blue-100">
                        <span className="font-bold shrink-0">Mẹo cho ba mẹ:</span>
                        <span>{guide.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Toro Encouragement Message */}
              {data.toroMessage && (
                <div className="mt-1 flex flex-col gap-0.5 rounded-xl sm:rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 p-3 sm:p-3.5">
                  <span className="font-baloo text-[13px] sm:text-[14px] font-bold text-[#8234E4]">
                    Lời nhắn từ Toro gửi ba mẹ:
                  </span>
                  <p className="font-vietnam text-[12.5px] sm:text-[13.5px] italic text-[#4A4D54]">
                    "{data.toroMessage}"
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer Actions - Responsive */}
        <div className="relative z-10 flex items-center justify-between gap-2.5 border-t border-gray-100 bg-white px-3.5 py-2.5 sm:px-6 sm:py-3.5">
          <button
            onClick={fetchSuggestions}
            disabled={loading}
            className="flex items-center gap-1.5 cursor-pointer rounded-full border border-gray-300 bg-white px-3.5 py-2 sm:px-4 sm:py-2 font-vietnam text-[12.5px] sm:text-[14px] font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50"
          >
            <svg className={`size-3.5 sm:size-4 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Tạo gợi ý mới</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-[#FEA01F] to-[#FF8C00] px-5 py-2 sm:px-8 sm:py-2.5 font-baloo text-[14px] sm:text-[16px] font-bold text-white shadow-md transition-all hover:from-[#e68e16] hover:to-[#e07b00] active:scale-95"
          >
            Đã hiểu rồi
          </button>
        </div>
      </div>
    </div>
  )
}
