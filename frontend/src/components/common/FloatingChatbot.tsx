import { FormEvent, useEffect, useRef, useState } from 'react'
import toroChatbot from '../../assets/toro-chatbot.webp'

type ChatMessage = {
  id: number
  role: 'assistant' | 'user'
  text: string
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn')
    ? window.location.origin
    : 'http://localhost:5000')

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Xin chào! Mình là Toro trợ lý của OTTOPIA. Mình có thể giúp gì cho ba mẹ và bé?',
  },
]

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || isSending) return

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsSending(true)

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter(message => message.id !== 1)
            .slice(-20)
            .map(message => ({ role: message.role, content: message.text })),
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Không thể kết nối với trợ lý AI')
      }

      setMessages(current => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', text: data.reply },
      ])
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Đã có lỗi xảy ra, vui lòng thử lại.',
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {isOpen && (
        <section
          aria-label="Toro - Trợ lý OTTOPIA"
          className="fixed bottom-4 right-3 z-[70] flex h-[min(560px,calc(100vh-32px))] w-[calc(100vw-24px)] max-w-[380px] flex-col overflow-hidden rounded-[24px] border border-[#c9e6ff] bg-white shadow-[0_16px_48px_rgba(0,76,110,0.22)] sm:bottom-6 sm:right-6"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-[#0a7ad8] to-[#39a8f4] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="size-11 overflow-hidden rounded-full border-2 border-white/70 bg-[#ddecff] shadow-sm">
                <img
                  src={toroChatbot}
                  alt=""
                  className="size-full object-cover"
                  width="44"
                  height="44"
                />
              </div>
              <div>
                <h2 className="font-baloo text-[18px] font-bold leading-6">Toro - Trợ lý OTTOPIA</h2>
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

          <div
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#f4fafd] p-4"
            aria-live="polite"
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={`max-w-[84%] whitespace-pre-wrap rounded-[18px] px-4 py-3 text-[14px] leading-5 shadow-sm ${
                  message.role === 'user'
                    ? 'ml-auto rounded-br-[6px] bg-[#0a7ad8] text-white'
                    : 'mr-auto rounded-bl-[6px] border border-[#d8edfa] bg-white text-[#37393e]'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isSending && (
              <div className="mr-auto rounded-[18px] rounded-bl-[6px] border border-[#d8edfa] bg-white px-4 py-3 text-[14px] text-[#667085] shadow-sm">
                Đang trả lời…
              </div>
            )}
            {error && (
              <div role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-[13px] text-red-700">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
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
              maxLength={2000}
              disabled={isSending}
              placeholder="Nhập câu hỏi..."
              aria-label="Nội dung tin nhắn"
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-[22px] border border-[#c9e6ff] bg-[#f4fafd] px-4 py-2.5 text-[14px] text-[#313235] outline-none placeholder:text-[#8690a7] focus:border-[#0a7ad8] disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label="Gửi tin nhắn"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fea01f] text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
        <div className="fixed right-4 top-[68%] z-[70] flex -translate-y-1/2 flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Mở Toro - Trợ lý OTTOPIA"
            className="group relative flex size-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#42b7ff] to-[#087ed9] p-1 text-white shadow-[0_8px_20px_rgba(0,96,160,0.38)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_26px_rgba(0,96,160,0.45)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#fea01f] focus-visible:ring-offset-2"
          >
            <img
              src={toroChatbot}
              alt=""
              className="size-full rounded-full bg-[#ddecff] object-cover"
              width="36"
              height="36"
            />
            <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-[#58dc72]" />
          </button>

          <ContactButton
            href="tel:0976716116"
            label="Gọi OTTOPIA"
            className="text-[#00c83c]"
          >
            <PhoneContactIcon />
          </ContactButton>
          <ContactButton
            href="https://zalo.me/0976716116"
            label="Nhắn Zalo cho OTTOPIA"
            className="text-[#0879e8]"
          >
            <ZaloContactIcon />
          </ContactButton>
          <ContactButton
            href="https://m.me/ottopia.kynangsongchotre"
            label="Nhắn Messenger cho OTTOPIA"
            className="text-[#1688f8]"
          >
            <MessengerContactIcon />
          </ContactButton>
        </div>
      )}
    </>
  )
}

function ContactButton({
  href,
  label,
  className,
  children,
}: {
  href: string
  label: string
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      className={`flex size-12 items-center justify-center rounded-full border border-[#e2eff9] bg-white shadow-[0_7px_20px_rgba(14,94,145,0.22)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_24px_rgba(14,94,145,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1688f8] focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  )
}

function PhoneContactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  )
}

function ZaloContactIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-8" aria-hidden="true">
      <path
        fill="#2962ff"
        d="M15 36V6.827l-1.211-.811C8.64 8.083 5 13.112 5 19v10c0 7.732 6.268 14 14 14h10c4.722 0 8.883-2.348 11.417-5.931V36H15Z"
      />
      <path
        fill="#eee"
        d="M29 5H19c-1.845 0-3.601.366-5.214 1.014C10.453 9.25 8 14.528 8 19c0 6.771.936 10.735 3.712 14.607.216.301.357.653.376 1.022.043.835-.129 2.365-1.634 3.742-.162.148-.059.419.16.428.942.041 2.843-.014 4.797-.877.557-.246 1.191-.203 1.729.083C20.453 39.764 24.333 40 28 40c4.676 0 9.339-1.04 12.417-2.916C42.038 34.799 43 32.014 43 29V19C43 11.268 36.732 5 29 5Z"
      />
      <path
        fill="#2962ff"
        d="M36.75 27A3.754 3.754 0 0 1 33 23.25a3.754 3.754 0 0 1 3.75-3.75 3.754 3.754 0 0 1 3.75 3.75A3.754 3.754 0 0 1 36.75 27Zm0-6a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.25A2.253 2.253 0 0 0 39 23.25 2.253 2.253 0 0 0 36.75 21ZM31.5 27h-1a.5.5 0 0 1-.5-.5V18h1.5v9ZM27 19.75v.519a3.704 3.704 0 0 0-2.25-.769A3.754 3.754 0 0 0 21 23.25 3.754 3.754 0 0 0 24.75 27c.847 0 1.621-.293 2.25-.769v.269a.5.5 0 0 0 .5.5h1v-7.25H27Zm-2.25 5.75a2.253 2.253 0 0 1-2.25-2.25A2.253 2.253 0 0 1 24.75 21 2.253 2.253 0 0 1 27 23.25a2.253 2.253 0 0 1-2.25 2.25ZM21.25 18h-8v1.5h5.321L13 26h.026a1.228 1.228 0 0 0-.276.75V27h7.5a.5.5 0 0 0 .5-.5v-1h-5.321L21 19h-.026c.163-.211.276-.463.276-.75V18Z"
      />
    </svg>
  )
}

function MessengerContactIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-8" aria-hidden="true">
      <path
        fill="#007FFF"
        d="M24 0C10.745 0 0 9.949 0 22.222c0 6.994 3.49 13.232 8.944 17.305V48l8.172-4.485A25.657 25.657 0 0 0 24 44.444c13.255 0 24-9.949 24-22.222C48 9.949 37.255 0 24 0Zm2.385 29.926-6.112-6.519-11.925 6.519L21.466 16l6.261 6.519L39.503 16 26.385 29.926Z"
      />
    </svg>
  )
}
