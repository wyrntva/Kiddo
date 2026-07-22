import type { DiaryIsland, DiaryLesson } from '../types'

export const friendshipIslandName = 'Khu vườn bạn bè'

export const friendshipIsland: DiaryIsland = {
  name: friendshipIslandName,
  bgColor: 'bg-[#fef0f0]',
  borderColor: 'border-[#ffc9d2]',
  bgHex: '#FEF0F0',
  textColor: 'text-[#E83552]',
  fillColor: '#E83552',
  caretIcon: '/assets/d2a5480bd7290e1918a69d355d9003da4d4a24fd.svg',
  image: '/assets/khu_vuon_ban_be_island.webp',
  skills: [
    { label: 'Biết cách chia sẻ', color: '#E83552', progress: 80, spriteOffset: '-3.85%' },
    { label: 'Lắng nghe bạn bè', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
    { label: 'Hợp tác nhóm', color: '#339E4A', progress: 80, spriteOffset: '-252.32%' },
    { label: 'Giải quyết xung đột', color: '#0A7AD8', progress: 80, spriteOffset: '-381.62%' },
  ],
}

export const friendshipIslandLessons: DiaryLesson[] = [
  {
    id: 'lesson-1-ban-be',
    title: 'Biết cách chia sẻ',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    isCompleted: true,
    feedback: {
      title: 'Bé đã biết chia sẻ đồ chơi chưa?',
      strengths: ['Bé vui vẻ nhường đồ chơi cho bạn', 'Bé chủ động mời bạn cùng ăn bánh'],
      practice: ['Chờ đến lượt chơi cầu trượt', 'Không giằng đồ chơi khi bạn đang sử dụng'],
      tips: ['Khen ngợi bé trước mặt bạn bè khi bé biết chia sẻ', 'Đọc sách truyện kể về tình bạn và sự sẻ chia'],
    },
  },
  {
    id: 'lesson-2-ban-be',
    title: 'Lắng nghe bạn bè',
    status: 'learning',
    statusLabel: 'Đang học',
    isCompleted: false,
    feedback: {
      title: 'Bé đã biết lắng nghe bạn chưa?',
      strengths: ['Bé biết đứng nghe bạn trình bày ý kiến', 'Bé tôn trọng bạn khi chơi chung'],
      practice: ['Không ngắt lời khi bạn đang kể chuyện', 'Biết cách an ủi khi bạn khóc'],
      tips: ['Tạo trò chơi truyền tin để bé tập lắng nghe', 'Khen ngợi thái độ kiên nhẫn của bé'],
    },
  },
  {
    id: 'lesson-3-ban-be',
    title: 'Hợp tác nhóm',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé có hợp tác tốt khi chơi nhóm?',
      strengths: ['Bé hào hứng tham gia xếp hình lego cùng nhóm', 'Bé đóng góp đồ chơi chung cùng cả đội'],
      practice: ['Thảo luận nhẹ nhàng không tranh giành vai trò', 'Hợp tác cùng bạn hoàn thành bức tranh chung'],
      tips: ['Tổ chức các trò chơi cần sự chung sức của 2-3 bé', 'Khen ngợi thành quả của cả nhóm sau khi chơi xong'],
    },
  },
  {
    id: 'lesson-4-ban-be',
    title: 'Giải quyết xung đột',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé xử lý tranh chấp thế nào?',
      strengths: ['Bé biết gọi ba mẹ/cô giáo giúp đỡ khi bạn đánh mình', 'Bé chịu nói chuyện ôn hòa thay vì giật đồ'],
      practice: ['Nói rõ cảm xúc của mình thay vì la khóc', 'Biết nhường bạn một bước để giải quyết êm đẹp'],
      tips: ['Dạy bé câu nói thần kỳ "Mình cùng chơi nhé"', 'Không thiên vị ai khi phân xử xung đột giữa các bé'],
    },
  },
  {
    id: 'lesson-5-ban-be',
    title: 'Cảm thông và giúp đỡ',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé biết quan tâm giúp bạn chưa?',
      strengths: ['Bé biết lấy khăn lau cho bạn khi bạn bị bẩn', 'Bé biết hỏi han bạn khi thấy bạn ngã đau'],
      practice: ['Chủ động giúp bạn nhặt bút màu rơi', 'Chia sẻ lời động viên khi bạn buồn'],
      tips: ['Hỏi bé về ngày đi học xem có bạn nào cần giúp đỡ không', 'Lắng nghe bé một cách tôn trọng làm gương cho bé'],
    },
  },
]
