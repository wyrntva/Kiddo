import type { DiaryIsland, DiaryLesson } from '../types'

export const communicationIslandName = 'Thành phố giao tiếp'

export const communicationIsland: DiaryIsland = {
  name: communicationIslandName,
  bgColor: 'bg-[#f4fafd]',
  borderColor: 'border-[#c9e6ff]',
  bgHex: '#F4FAFD',
  textColor: 'text-[#0A7AD8]',
  fillColor: '#0A7AD8',
  caretIcon: '/assets/79c3e72202752af311f2a7c4b05755536c38fb62.svg',
  image: '/assets/thanh_pho_giao_tiep_island.webp',
  skills: [
    { label: 'Con biết chào hỏi', color: '#0A7AD8', progress: 80, spriteOffset: '-3.85%' },
    { label: 'Con nói lời cảm ơn', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
    { label: 'Con nói lời xin lỗi', color: '#339E4A', progress: 80, spriteOffset: '-252.32%' },
    { label: 'Con biết lắng nghe', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' },
  ],
}

export const communicationIslandLessons: DiaryLesson[] = [
  {
    id: 'lesson-1-giao-tiep',
    title: 'Con biết chào hỏi',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    isCompleted: true,
    feedback: {
      title: 'Con đã biết chào hỏi chưa?',
      strengths: ['Bé biết chào hỏi người lớn khi gặp mặt', 'Bé lễ phép khoanh tay chào hỏi tự tin'],
      practice: ['Tự tin chào hỏi người lạ dưới sự hướng dẫn', 'Nhớ chào hỏi to và rõ ràng hơn'],
      tips: ['Khuyến khích bé chào hỏi hàng xóm khi ra ngoài', 'Khen ngợi bé mỗi khi bé chủ động chào hỏi'],
    },
  },
  {
    id: 'lesson-2-giao-tiep',
    title: 'Con nói lời cảm ơn',
    status: 'learning',
    statusLabel: 'Đang học',
    isCompleted: false,
    feedback: {
      title: 'Con đã biết cảm ơn chưa?',
      strengths: ['Bé biết nói lời cảm ơn khi nhận quà', 'Bé thể hiện sự vui vẻ khi nhận đồ từ người khác'],
      practice: ['Tập thói quen nói cảm ơn ngay lập tức', 'Cảm ơn chân thành bằng cả lời nói và ánh mắt'],
      tips: ['Làm gương cảm ơn trước mặt bé thường xuyên', 'Nhắc nhở nhẹ nhàng khi bé quên nói lời cảm ơn'],
    },
  },
  {
    id: 'lesson-3-giao-tiep',
    title: 'Con nói lời xin lỗi',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con đã biết xin lỗi chưa?',
      strengths: ['Bé nhận ra lỗi sai của mình khi được giải thích', 'Bé biết lắng nghe ý kiến của ba mẹ'],
      practice: ['Chủ động xin lỗi khi vô tình làm đau bạn', 'Học cách hứa sửa đổi lỗi lầm của mình'],
      tips: ['Giải thích cho bé tại sao hành động đó cần lời xin lỗi', 'Tránh quát mắng quá mức khi bé phạm lỗi'],
    },
  },
  {
    id: 'lesson-4-giao-tiep',
    title: 'Con biết lắng nghe',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con đã biết lắng nghe chưa?',
      strengths: ['Bé biết tập trung khi ba mẹ nói chuyện', 'Bé hiểu ý của các câu chuyện ngắn'],
      practice: ['Không ngắt lời người khác khi họ đang phát biểu', 'Tập thói quen đợi người khác nói xong rồi mới phản hồi'],
      tips: ['Kể chuyện cho bé nghe và hỏi lại ý chính để tập trung', 'Lắng nghe bé một cách tôn trọng làm gương cho bé'],
    },
  },
  {
    id: 'lesson-5-giao-tiep',
    title: 'Con biết nhờ giúp đỡ',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con đã biết nhờ giúp đỡ chưa?',
      strengths: ['Bé hiểu khi nào việc đó quá sức và cần người giúp', 'Bé biết nói rõ ràng điều mình cần'],
      practice: ['Nhờ giúp đỡ một cách lịch sự, lễ phép', 'Nói cảm ơn sau khi nhận được sự giúp đỡ'],
      tips: ['Hướng dẫn bé cách diễn đạt câu nhờ vả lịch sự', 'Không làm hộ bé ngay lập tức mà để bé thử sức trước'],
    },
  },
]
