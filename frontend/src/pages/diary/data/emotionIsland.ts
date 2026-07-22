import type { DiaryIsland, DiaryLesson } from '../types'

export const emotionIslandName = 'Vùng đất cảm xúc'

export const emotionIsland: DiaryIsland = {
  name: emotionIslandName,
  bgColor: 'bg-[#f2fbef]',
  borderColor: 'border-[#c3ffd0]',
  bgHex: '#F2FBEF',
  textColor: 'text-[#339E4A]',
  fillColor: '#339E4A',
  caretIcon: '/assets/8f8ea9c83aa342067a65b615c8910f82398ad226.svg',
  image: '/assets/vung_dat_cam_xuc_island.webp',
  skills: [
    { label: 'Nhận biết cảm xúc', color: '#339E4A', progress: 80, spriteOffset: '-3.85%' },
    { label: 'Bình tĩnh khi tức giận', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
    { label: 'Nói ra cảm xúc', color: '#0A7AD8', progress: 80, spriteOffset: '-252.32%' },
    { label: 'Giao tiếp tích cực', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' },
  ],
}

export const emotionIslandLessons: DiaryLesson[] = [
  {
    id: 'lesson-1-cam-xuc',
    title: 'Niềm vui của con',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    isCompleted: true,
    feedback: {
      title: 'Con đang cảm thấy gì?',
      strengths: ['Bé nhận ra cảm xúc của mình', 'Bé biết gọi tên cảm xúc vui, buồn'],
      practice: ['Bé nhận ra cảm xúc của mình', 'Bé biết gọi tên cảm xúc vui, buồn'],
      tips: ['Bé nhận ra cảm xúc của mình', 'Bé biết gọi tên cảm xúc vui, buồn'],
    },
  },
  {
    id: 'lesson-2-cam-xuc',
    title: 'Nỗi buồn bé nhỏ',
    status: 'learning',
    statusLabel: 'Đang học',
    isCompleted: false,
    feedback: {
      title: 'Con đang cảm thấy gì?',
      strengths: [
        'Bé biết nhường đồ chơi cho bạn khi chơi chung',
        'Bé vui vẻ và hợp tác khi tham gia hoạt động nhóm',
      ],
      practice: ['Chờ đến lượt của mình mà không tranh giành', 'Biết nói lời cảm ơn khi bạn chia sẻ đồ chơi'],
      tips: ['Khen ngợi mỗi khi bé biết chia sẻ đồ chơi', 'Chơi trò chơi đóng vai kể chuyện về sự sẻ chia'],
    },
  },
  {
    id: 'lesson-3-cam-xuc',
    title: 'Cơn giận đang tới',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con đang cảm thấy gì?',
      strengths: [
        'Bé nhận biết được lỗi sai của bản thân khi được giải thích',
        'Bé chịu lắng nghe lời khuyên từ ba mẹ',
      ],
      practice: ['Nói lời xin lỗi một cách rõ ràng và chân thành', 'Học cách hứa sửa sai và cố gắng không lặp lại'],
      tips: ['Giải thích nhẹ nhàng tại sao hành động đó chưa đúng', 'Làm gương xin lỗi trước mặt bé khi ba mẹ mắc lỗi'],
    },
  },
  {
    id: 'lesson-4-cam-xuc',
    title: 'Khi con thấy sợ',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con đang cảm thấy gì?',
      strengths: ['Bé tự tin giới thiệu bản thân trước cả lớp', 'Bé nói to, rõ ràng và có ánh mắt tương tác tốt'],
      practice: ['Kiểm soát nhịp thở để giảm bớt hồi hộp khi nói', 'Tự tin đặt câu hỏi khi chưa hiểu vấn đề'],
      tips: ['Tạo cơ hội cho bé biểu diễn văn nghệ trước gia đình', 'Luôn động viên và khích lệ từng sự cố gắng nhỏ của bé'],
    },
  },
  {
    id: 'lesson-5-cam-xuc',
    title: 'Nói ra cảm xúc của mình',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Con có thể nói ra cảm xúc của mình',
      strengths: ['Bé biết chia sẻ khi con đang vui hoặc buồn', 'Bé bước đầu gọi tên được cảm xúc của mình'],
      practice: ['Tự tin nói cho ba mẹ biết khi con không thoải mái', 'Dùng câu ngắn để diễn tả cảm xúc rõ ràng hơn'],
      tips: [
        'Gợi ý cho bé dùng các câu như con đang buồn hoặc con cần giúp đỡ',
        'Khuyến khích bé chia sẻ cảm xúc mỗi ngày qua trò chuyện hoặc tranh vẽ',
      ],
    },
  },
]
