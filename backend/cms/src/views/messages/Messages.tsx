import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { chatAPI, type ChatConversationUser, type ChatMessageItem } from '../../api/chat.api';
import { defaultAvatar } from '../../constants/shared';

export default function Messages() {
  const [conversations, setConversations] = useState<ChatConversationUser[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<ChatConversationUser | null>(null);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');

  const selectedUserIdRef = useRef<string | null>(null);
  selectedUserIdRef.current = selectedUserId;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef<boolean>(true);
  const lastMsgIdRef = useRef<string | null>(null);

  // Scroll to bottom helper
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // Load conversation list
  const fetchConversations = async (silent = false) => {
    if (!silent) setLoadingList(true);
    try {
      const res = await chatAPI.getConversations();
      const list = res.data?.conversations || [];
      setConversations(list);

      // Auto-select first conversation only if none is currently selected
      setSelectedUserId((prev) => {
        if (prev) {
          // If selected user is still in the list, keep it
          return prev;
        }
        return list.length > 0 ? list[0].id : null;
      });
    } catch (_err) {
      if (!silent) toast.error('Không thể tải danh sách cuộc trò chuyện');
    } finally {
      if (!silent) setLoadingList(false);
    }
  };

  // Load chat detail for a specific user
  const fetchChatDetail = async (userId: string, silent = false) => {
    if (!silent) setLoadingChat(true);
    try {
      const res = await chatAPI.getConversationDetail(userId);
      // Guard against race conditions if user switched
      if (selectedUserIdRef.current !== userId) return;

      setActiveUser(res.data.user);
      const newMessages = res.data.messages || [];

      // Check if there are new messages
      const latestMsg = newMessages[newMessages.length - 1];
      const isNewMsg = latestMsg && latestMsg.id !== lastMsgIdRef.current;

      setMessages(newMessages);

      if (isInitialLoadRef.current) {
        isInitialLoadRef.current = false;
        setTimeout(() => scrollToBottom('auto'), 50);
      } else if (isNewMsg) {
        // Auto-scroll if user is near bottom or last message is from ADMIN
        const container = chatContainerRef.current;
        const isNearBottom = container
          ? container.scrollHeight - container.scrollTop - container.clientHeight < 180
          : true;

        if (isNearBottom || latestMsg?.sender === 'ADMIN') {
          setTimeout(() => scrollToBottom('smooth'), 50);
        }
      }

      if (latestMsg) {
        lastMsgIdRef.current = latestMsg.id;
      }
    } catch (_err) {
      if (!silent) toast.error('Không thể tải chi tiết tin nhắn');
    } finally {
      if (!silent) setLoadingChat(false);
    }
  };

  // Initial load and periodic polling of conversation list
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(() => {
      fetchConversations(true);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // When selected user changes, load their detail and reset scroll
  useEffect(() => {
    if (selectedUserId) {
      isInitialLoadRef.current = true;
      lastMsgIdRef.current = null;
      fetchChatDetail(selectedUserId);
    } else {
      setActiveUser(null);
      setMessages([]);
    }
  }, [selectedUserId]);

  // Periodic polling for active chat
  useEffect(() => {
    if (!selectedUserId) return;
    const interval = setInterval(() => {
      if (selectedUserIdRef.current) {
        fetchChatDetail(selectedUserIdRef.current, true);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedUserId]);

  const handleSelectUser = (userId: string) => {
    if (userId === selectedUserId) return;
    setSelectedUserId(userId);
  };

  const handleSendReply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentUserId = selectedUserIdRef.current;
    if (!currentUserId || !replyText.trim() || sending) return;

    const textToSend = replyText.trim();
    setReplyText('');
    setSending(true);

    try {
      const res = await chatAPI.replyConversation(currentUserId, textToSend);
      if (res.data?.message) {
        setMessages((prev) => [...prev, res.data.message]);
        lastMsgIdRef.current = res.data.message.id;
        setTimeout(() => scrollToBottom('smooth'), 50);
      }
      toast.success('Đã gửi phản hồi');
      fetchConversations(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gửi phản hồi thất bại');
      setReplyText(textToSend);
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const kw = search.trim().toLowerCase();
    if (!kw) return true;
    return (
      (c.name || '').toLowerCase().includes(kw) ||
      (c.parentName || '').toLowerCase().includes(kw) ||
      (c.email || '').toLowerCase().includes(kw) ||
      (c.phone || '').toLowerCase().includes(kw)
    );
  });

  const getAvatarUrl = (userItem?: ChatConversationUser | null) => {
    if (!userItem?.avatar) return defaultAvatar;
    if (userItem.avatar.startsWith('http') || userItem.avatar.startsWith('data:')) {
      return userItem.avatar;
    }
    const apiUrl = import.meta.env.VITE_API_URL || '';
    return `${apiUrl}${userItem.avatar.startsWith('/') ? '' : '/'}${userItem.avatar}`;
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString('vi-VN');
  };

  // Prevent outer page scrolling so only inner chat panels scroll
  useEffect(() => {
    const scrollContainer = document.getElementById('main-content-scroll');
    if (scrollContainer) {
      scrollContainer.style.overflow = 'hidden';
      scrollContainer.scrollTop = 0;
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <div className="h-[calc(100vh-145px)] max-h-[calc(100vh-145px)] -mt-5 flex flex-col px-3 md:px-5 pb-2 space-y-2 max-w-[1750px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-1 shrink-0">
        <div>
          <h1 className="text-[16px] md:text-[17px] font-bold uppercase text-[#37393E] dark:text-white flex items-center gap-2">
            <svg className="size-5 text-[#0A7AD8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            TIN NHẮN KHÁCH HÀNG & TRỢ LÝ AI TORO
          </h1>
          <p className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">Quản lý cuộc trò chuyện, xem lịch sử chat và trả lời tin nhắn trực tiếp cho khách hàng</p>
        </div>
        <button
          type="button"
          onClick={() => fetchConversations()}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 shadow-xs shrink-0"
        >
          <svg className={`size-3.5 ${loadingList ? 'animate-spin text-blue-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Làm mới
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
        
        {/* Left Sidebar: Conversation List */}
        <div className="lg:col-span-4 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full min-h-0 bg-[#f8fbfe] dark:bg-gray-900/40 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm tên, SĐT, Email..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#f0f8ff] dark:bg-gray-700 border border-[#c9e6ff] dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0a7ad8] focus:bg-white text-gray-900 dark:text-white"
              />
              <svg className="size-4 text-[#0a7ad8] absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {loadingList && conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#0a7ad8] mx-auto mb-2" />
                <span className="text-xs">Đang tải danh sách...</span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                Chưa có cuộc trò chuyện nào
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isSelected = c.id === selectedUserId;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectUser(c.id)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#eaf5ff] dark:bg-blue-950/60 border-l-4 border-[#0a7ad8]'
                        : 'hover:bg-white dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <img
                      src={getAvatarUrl(c)}
                      alt={c.name}
                      className="size-11 rounded-full object-cover shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm"
                      onError={(e) => { e.currentTarget.src = defaultAvatar; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h3 className={`text-sm truncate ${isSelected ? 'font-bold text-[#0a7ad8]' : 'font-semibold text-gray-900 dark:text-white'}`}>
                          {c.name} {c.parentName ? `(${c.parentName})` : ''}
                        </h3>
                        <span className="text-[11px] text-gray-400 shrink-0">
                          {formatTime(c.lastMessage?.createdAt).split(' - ')[0]}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                        {c.lastMessage
                          ? `${c.lastMessage.sender === 'USER' ? 'Khách: ' : c.lastMessage.sender === 'ADMIN' ? 'Admin: ' : 'Toro AI: '}${c.lastMessage.text}`
                          : 'Chưa có tin nhắn'}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 truncate">
                          {c.phone || c.email || 'Hội viên'}
                        </span>
                        {c.isPaid ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Trả phí</span>
                        ) : (
                          <span className="text-[10px] text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Miễn phí</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Chat Window */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-0 bg-white dark:bg-gray-800 overflow-hidden">
          {activeUser ? (
            <>
              {/* Active User Header with vibrant Blue Gradient */}
              <div className="px-5 py-3 bg-gradient-to-r from-[#0a7ad8] to-[#39a8f4] text-white flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-11 overflow-hidden rounded-full border-2 border-white/80 bg-[#ddecff] shadow-sm shrink-0">
                    <img
                      src={getAvatarUrl(activeUser)}
                      alt={activeUser.name}
                      className="size-full object-cover"
                      onError={(e) => { e.currentTarget.src = defaultAvatar; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-white text-[16px] leading-5 truncate">
                      {activeUser.name} {activeUser.parentName ? `• Phụ huynh: ${activeUser.parentName}` : ''}
                    </h2>
                    <p className="text-[11.5px] text-white/90 flex items-center flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-[#c3ffd0]" />
                        SĐT: {activeUser.phone || 'Chưa cập nhật'}
                      </span>
                      <span>Email: {activeUser.email}</span>
                      {activeUser.childAge && <span>Tuổi bé: {activeUser.childAge}</span>}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {activeUser.isPaid ? (
                    <span className="text-xs font-bold text-emerald-900 bg-[#c3ffd0] px-3 py-1 rounded-full shadow-sm">
                      Tài khoản Trả phí
                    </span>
                  ) : (
                    <span className="text-xs text-white/90 bg-white/20 px-3 py-1 rounded-full">
                      Tài khoản Miễn phí
                    </span>
                  )}
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 min-h-0 p-4 md:p-5 overflow-y-auto bg-[#f4fafd] dark:bg-gray-900/50 space-y-3"
              >
                {loadingChat && messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#0a7ad8] mx-auto mb-2" />
                    <span className="text-xs">Đang tải cuộc trò chuyện...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 text-sm">
                    Chưa có tin nhắn nào từ người dùng này.
                  </div>
                ) : (
                  messages.map((m) => {
                    const isUser = m.sender === 'USER';
                    const isAdmin = m.sender === 'ADMIN';
                    const isBot = m.sender === 'BOT';

                    // Customer on LEFT, System (Admin + Toro AI) on RIGHT
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                            {isUser
                              ? `${activeUser.name} (Khách hàng)`
                              : isAdmin
                              ? 'Admin OTTOPIA (Bạn)'
                              : '🦦 Toro - Trợ lý AI OTTOPIA'}
                          </span>
                          <span className="text-[10px] text-gray-400">{formatTime(m.createdAt)}</span>
                        </div>

                        <div
                          className={`max-w-[85%] md:max-w-[75%] px-4 py-3 text-[14px] leading-relaxed shadow-sm break-words ${
                            isUser
                              ? 'rounded-[18px] rounded-bl-[4px] border border-[#d8edfa] bg-white text-[#313235] dark:bg-gray-800 dark:text-white'
                              : 'rounded-[18px] rounded-br-[4px] bg-[#0a7ad8] text-white shadow-sm'
                          }`}
                        >
                          <RenderChatMessageText text={m.text} isDarkBg={!isUser} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-4 py-2 border-t border-[#e2eff9] dark:border-gray-800 bg-[#f8fbfe] dark:bg-gray-900/40 flex gap-2 overflow-x-auto text-xs shrink-0">
                <span className="text-gray-400 py-1 shrink-0 font-medium">Gợi ý nhanh:</span>
                <button
                  type="button"
                  onClick={() => setReplyText('Dạ chào ba mẹ, OTTOPIA đã ghi nhận thông tin. Con có thể hỗ trợ gì thêm cho ba mẹ không ạ?')}
                  className="px-2.5 py-1 bg-white border border-[#c9e6ff] rounded-lg text-gray-600 hover:border-[#0a7ad8] hover:text-[#0a7ad8] transition-colors shrink-0 shadow-sm"
                >
                  Chào & Hỏi thăm
                </button>
                <button
                  type="button"
                  onClick={() => setReplyText('Dạ bộ phận kỹ thuật OTTOPIA đã kiểm tra và hỗ trợ tài khoản cho ba mẹ rồi nhé!')}
                  className="px-2.5 py-1 bg-white border border-[#c9e6ff] rounded-lg text-gray-600 hover:border-[#0a7ad8] hover:text-[#0a7ad8] transition-colors shrink-0 shadow-sm"
                >
                  Xác nhận hỗ trợ kỹ thuật
                </button>
                <button
                  type="button"
                  onClick={() => setReplyText('Dạ ba mẹ vui lòng liên hệ trực tiếp Hotline/Zalo 0976716116 để được xử lý nhanh nhất nhé!')}
                  className="px-2.5 py-1 bg-white border border-[#c9e6ff] rounded-lg text-gray-600 hover:border-[#0a7ad8] hover:text-[#0a7ad8] transition-colors shrink-0 shadow-sm"
                >
                  Hướng dẫn Hotline
                </button>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-[#e0effa] dark:border-gray-700 bg-white dark:bg-gray-800 flex items-end gap-2.5 shrink-0">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                  rows={1}
                  placeholder="Nhập nội dung phản hồi cho khách hàng (Enter để gửi, Shift+Enter để xuống dòng)..."
                  className="max-h-24 min-h-[44px] flex-1 resize-none rounded-[22px] border border-[#c9e6ff] bg-[#f4fafd] px-4 py-2.5 text-[14px] text-[#313235] dark:text-white dark:bg-gray-700 outline-none placeholder:text-[#8690a7] focus:border-[#0a7ad8] disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={sending || !replyText.trim()}
                  aria-label="Gửi phản hồi"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fea01f] hover:bg-[#e68f18] text-white shadow-md transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
                    <path d="m4 4 17 8-17 8 3-8-3-8Z" fill="currentColor" />
                    <path d="M7 12h14" stroke="white" strokeWidth="1.5" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <svg className="size-16 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-semibold text-base text-gray-600 dark:text-gray-300 mb-1">Chọn một cuộc trò chuyện</h3>
              <p className="text-xs">Chọn tài khoản khách hàng ở danh sách bên trái để xem lịch sử tin nhắn và gửi phản hồi</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function RenderChatMessageText({ text, isDarkBg }: { text: string; isDarkBg?: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1 leading-relaxed">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;
        return (
          <div key={lIdx} className="break-words">
            {parseInlineMarkdown(line, isDarkBg)}
          </div>
        );
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string, isDarkBg?: boolean) {
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const label = match[2];
      const url = match[3];

      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-semibold underline px-2 py-0.5 rounded-md my-0.5 transition-colors ${
            isDarkBg
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'text-[#0a7ad8] hover:text-[#0863b3] bg-[#e6f4ff]'
          }`}
        >
          <span>{label}</span>
          <svg className="w-3.5 h-3.5 shrink-0" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      );
    } else if (match[4]) {
      parts.push(
        <strong key={match.index} className={`font-bold ${isDarkBg ? 'text-white' : 'text-[#1e293b] dark:text-white'}`}>
          {match[4]}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}


