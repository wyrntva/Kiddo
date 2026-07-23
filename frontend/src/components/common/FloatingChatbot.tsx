import { FormEvent, useState } from 'react'

type ChatMessage = {
  id: number
  role: 'bot' | 'user'
  text: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'bot',
    text: 'Xin chào! Mình là trợ lý OTTOPIA. Mình có thể giúp gì cho ba mẹ và bé?',
  },
]

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const message = input.trim()
    if (!message) return

    setMessages(current => [
      ...current,
      { id: Date.now(), role: 'user', text: message },
      {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Mình đã nhận được câu hỏi. Ba mẹ có thể xem các khóa học hoặc để lại thông tin để OTTOPIA hỗ trợ chi tiết hơn nhé!',
      },
    ])
    setInput('')
  }

  return (
    <>
      {isOpen && (
        <section
          aria-label="Trợ lý OTTOPIA"
          className="fixed bottom-4 right-3 z-[70] flex h-[min(560px,calc(100vh-32px))] w-[calc(100vw-24px)] max-w-[380px] flex-col overflow-hidden rounded-[24px] border border-[#c9e6ff] bg-white shadow-[0_16px_48px_rgba(0,76,110,0.22)] sm:bottom-6 sm:right-6"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-[#0a7ad8] to-[#39a8f4] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/20">
                <ChatbotIcon className="size-6" />
              </div>
              <div>
                <h2 className="font-baloo text-[18px] font-bold leading-6">Trợ lý OTTOPIA</h2>
                <p className="flex items-center gap-1.5 text-[12px] text-white/90">
                  <span className="size-2 rounded-full bg-[#c3ffd0]" />
                  Luôn sẵn sàng hỗ trợ
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chatbot"
              className="flex size-9 items-center justify-center rounded-full text-[24px] text-white transition-colors hover:bg-white/15"
            >
              ×
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#f4fafd] p-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`max-w-[84%] rounded-[18px] px-4 py-3 text-[14px] leading-5 shadow-sm ${
                  message.role === 'user'
                    ? 'ml-auto rounded-br-[6px] bg-[#0a7ad8] text-white'
                    : 'mr-auto rounded-bl-[6px] border border-[#d8edfa] bg-white text-[#37393e]'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-[#e2e2ea] bg-white p-3">
            <textarea
              value={input}
              onChange={event => setInput(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              rows={1}
              placeholder="Nhập câu hỏi..."
              aria-label="Nội dung tin nhắn"
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-[22px] border border-[#c9e6ff] bg-[#f4fafd] px-4 py-2.5 text-[14px] text-[#313235] outline-none placeholder:text-[#8690a7] focus:border-[#0a7ad8]"
            />
            <button
              type="submit"
              aria-label="Gửi tin nhắn"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fea01f] text-white shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                <path d="m4 4 17 8-17 8 3-8-3-8Z" fill="currentColor" />
                <path d="M7 12h14" stroke="white" strokeWidth="1.5" />
              </svg>
            </button>
          </form>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Mở chatbot OTTOPIA"
          className="group fixed right-0 top-[calc(50%+250px)] z-[70] flex h-[35px] w-11 -translate-y-1/2 items-center justify-start overflow-hidden rounded-l-full border border-r-0 border-[#0067b9] bg-[#0789ef] px-3 text-white shadow-[0_4px_12px_rgba(0,76,110,0.3)] transition-all duration-300 hover:h-10 hover:w-[190px] hover:bg-[#0a7ad8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fea01f]"
        >
          <ChatbotIcon className="size-[19px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap font-baloo text-[15px] font-bold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[150px] group-hover:opacity-100">
            Trợ lý AI OTTOPIA
          </span>
        </button>
      )}
    </>
  )
}

function ChatbotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -19.5 164 164" fill="none" className={className} aria-hidden="true">
      <path d="M19.2329 89.0831C17.3341 89.4211 15.7432 89.7559 14.1371 89.9817C7.06966 90.976 1.51901 86.5687 0.48068 79.5288C-1.0289 69.307 6.73229 58.1139 14.141 55.0389C16.6482 53.9986 19.5794 53.9795 23.0364 53.3665C32.2494 32.1615 49.7618 21.7934 73.5423 20.3488C73.8921 16.4462 74.238 12.5935 74.6022 8.54059C73.5751 8.11988 72.3431 7.95977 71.6796 7.26077C70.7134 6.24344 69.5996 4.84016 69.5957 3.59771C69.5918 2.53116 70.9221 0.709891 71.8974 0.535306C74.597 0.0535535 77.542 -0.276629 80.1608 0.325233C83.5048 1.0938 83.9852 3.75262 81.8548 6.48561C81.4171 6.9389 81.1341 7.51899 81.0462 8.14288C81.224 11.6156 81.5273 15.081 81.7616 18.179C88.0211 18.7375 94.0055 19.0381 99.9211 19.8421C119.273 22.472 132.088 33.3508 139.077 51.3896C139.194 51.6909 139.333 51.9849 139.478 52.2744C139.549 52.3747 139.633 52.4656 139.727 52.5448C142.943 52.5448 146.247 52.1103 149.393 52.6347C156.138 53.7583 161.178 57.4004 162.853 64.3477C164.528 71.2951 161.862 77.0616 156.759 81.6435C151.742 86.1493 145.621 87.389 138.993 86.5404C138.746 86.7453 138.532 86.987 138.359 87.2571C130.949 104.691 117.203 114.915 99.7662 120.658C84.6227 125.684 68.3154 126.026 52.9746 121.639C36.0424 116.958 23.8017 107.182 19.2329 89.0831ZM74.3653 116.033C77.9548 115.728 81.5686 115.59 85.1292 115.09C99.4118 113.083 112.05 107.628 121.744 96.6153C138.759 77.2881 134.524 42.1123 104.846 32.3558C93.8566 28.746 82.3857 26.5243 70.7233 27.2725C57.6687 28.1106 46.2832 33.0968 37.8617 43.4256C30.0513 53.0022 26.6062 64.3694 26.3233 76.5471C25.9125 94.2223 34.5276 106.232 51.1808 112.095C58.6448 114.649 66.4731 115.979 74.362 116.032L74.3653 116.033ZM20.0205 60.3756C19.7421 60.3376 19.4597 60.3412 19.1824 60.3861C12.7641 62.2757 6.45466 73.2929 8.09026 79.6823C8.58579 81.6199 9.81316 82.7712 11.7592 82.8092C13.8765 82.8512 16.0005 82.5894 17.5501 82.4949C18.4092 74.7881 19.2099 67.6156 20.0185 60.3742L20.0205 60.3756ZM141.736 77.21C145.278 77.15 148.678 75.8064 151.305 73.4289C154.874 70.1905 155.296 65.2817 152.224 62.4522C149.242 59.7061 145.667 58.9152 141.736 59.7146V77.21Z" fill="currentColor" />
      <path d="M84.8075 82.0252C86.4018 82.3193 88.1725 82.2825 89.5331 83.0097C90.1516 83.3495 90.6946 83.8115 91.129 84.3676C91.5634 84.9238 91.8802 85.5624 92.06 86.2448C92.3344 88.1095 90.7172 89.0671 88.9411 89.2994C88.0814 89.4143 87.2076 89.3635 86.367 89.1498C84.8505 88.6937 83.2428 88.6309 81.6954 88.9674C80.148 89.304 78.7116 90.0287 77.5215 91.0734C76.1714 92.182 74.5896 93.0209 73.233 91.3781C72.0319 89.9236 72.5832 88.2348 73.7817 86.9346C75.1549 85.3673 76.8518 84.1166 78.7554 83.269C80.659 82.4214 82.7239 81.9971 84.8075 82.0252Z" fill="currentColor" />
      <path d="M57.7186 52.5112C61.4295 52.6392 63.7503 55.2876 63.5495 59.1645C63.3893 62.2533 60.9084 64.7434 58.1203 64.6154C54.9698 64.4703 52.4724 61.3206 52.607 57.6582C52.7442 53.9453 54.2853 52.3924 57.7186 52.5112Z" fill="currentColor" />
      <path d="M93.575 57.3327C93.5684 54.2361 94.7564 52.8328 97.4244 52.7856C100.873 52.7245 103.039 54.689 102.96 57.8066C102.891 60.4916 100.78 62.7678 98.3 62.8282C95.4672 62.8971 93.5822 60.7024 93.575 57.3327Z" fill="currentColor" />
    </svg>
  )
}
