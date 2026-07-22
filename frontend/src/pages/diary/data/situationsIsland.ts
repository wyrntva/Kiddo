import type { DiaryIsland, DiaryLesson } from '../types'

export const situationsIslandName = 'Hành tinh tình huống'

export const situationsIsland: DiaryIsland = {
  name: situationsIslandName,
  bgColor: 'bg-[#f2f0fe]',
  borderColor: 'border-[#d4c9ff]',
  bgHex: '#F2F0FE',
  textColor: 'text-[#8234E4]',
  fillColor: '#8234E4',
  caretIcon: '/assets/2272e67b001e06fe0c8546a967e8640d1eec1796.svg',
  image: '/assets/hanh_tinh_tinh_huong_island.webp',
  skills: [
    { label: 'Khi bị lạc đường', color: '#8234E4', progress: 80, spriteOffset: '-3.85%' },
    { label: 'Gặp người lạ nói chuyện', color: '#0A7AD8', progress: 80, spriteOffset: '-131.84%' },
    { label: 'Ứng phó hỏa hoạn', color: '#FEA01F', progress: 80, spriteOffset: '-252.32%' },
    { label: 'Sử dụng điện an toàn', color: '#339E4A', progress: 80, spriteOffset: '-381.62%' },
  ],
}

export const situationsIslandLessons: DiaryLesson[] = [
  {
    id: 'lesson-1-tinh-huong',
    title: 'Khi bị lạc đường',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    isCompleted: true,
    feedback: {
      title: 'Bé đã biết xử lý khi lạc chưa?',
      strengths: ['Bé nhớ số điện thoại của ba mẹ', 'Bé biết đứng im một chỗ chờ ba mẹ'],
      practice: ['Tập tìm chú bảo vệ hoặc cô bán hàng để giúp', 'Không đi theo người lạ dù họ cho kẹo'],
      tips: ['Đóng vai tình huống đi lạc tại trung tâm thương mại', 'Dạy bé ghi nhớ địa chỉ nhà và tên ba mẹ'],
    },
  },
  {
    id: 'lesson-2-tinh-huong',
    title: 'Gặp người lạ nói chuyện',
    status: 'learning',
    statusLabel: 'Đang học',
    isCompleted: false,
    feedback: {
      title: 'Bé biết từ chối quà người lạ không?',
      strengths: ['Bé biết lắc đầu từ chối khi người lạ cho kẹo', 'Bé chạy lại gần ba mẹ ngay khi có người lạ tiếp cận'],
      practice: ['Nói "Không, cảm ơn" to và rõ ràng', 'Biết hét to cầu cứu nếu bị người lạ lôi đi'],
      tips: ['Xem hoạt hình giáo dục về an toàn với người lạ', 'Thiết lập mật mã gia đình chỉ ba mẹ và bé biết'],
    },
  },
  {
    id: 'lesson-3-tinh-huong',
    title: 'Ứng phó khi xảy ra hỏa hoạn',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé biết thoát hiểm khi có cháy?',
      strengths: ['Bé biết cúi thấp người đi men theo tường', 'Bé nhớ cần dùng khăn ướt bịt mũi miệng'],
      practice: ['Không trốn trong tủ hay gầm giường khi có cháy', 'Nhanh chóng chạy ra lối thoát hiểm gần nhất'],
      tips: ['Đóng vai diễn tập báo động cháy tại gia đình', 'Dạy bé cách nhận diện lối thoát hiểm và chuông báo cháy'],
    },
  },
  {
    id: 'lesson-4-tinh-huong',
    title: 'Sử dụng thiết bị điện an toàn',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé nhận biết mối nguy hiểm điện chưa?',
      strengths: ['Bé biết không được tự ý cắm phích cắm', 'Bé không sờ tay ướt vào công tắc'],
      practice: ['Nhắc nhở bạn bè tránh xa ổ điện nguy hiểm', 'Biết gọi người lớn bật giúp thiết bị điện'],
      tips: ['Sử dụng các nắp đậy che ổ điện an toàn', 'Giải thích trực quan các mối nguy từ dòng điện cho bé'],
    },
  },
  {
    id: 'lesson-5-tinh-huong',
    title: 'Gọi điện số khẩn cấp',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé biết gọi số điện thoại khẩn cấp?',
      strengths: ['Bé ghi nhớ số 113, 114, 115 nhanh chóng', 'Bé biết cách mở bàn phím cuộc gọi khẩn cấp trên điện thoại'],
      practice: ['Báo cáo ngắn gọn, rõ ràng địa chỉ xảy ra sự cố', 'Không nghịch ngợm gọi số khẩn cấp khi không có việc gì'],
      tips: ['Thực hành bấm số và nói chuyện giả định cứu hộ', 'Giải thích rõ cho bé khi nào thực sự cần gọi cứu hộ'],
    },
  },
]
