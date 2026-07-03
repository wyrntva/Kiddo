import type { DiaryIsland, DiaryLesson } from '../types'

export const independenceIslandName = 'Ngôi làng tự lập'

export const independenceIsland: DiaryIsland = {
  name: independenceIslandName,
  bgColor: 'bg-[#fef9ed]',
  borderColor: 'border-[#ffdc64]',
  bgHex: '#FEF9ED',
  textColor: 'text-[#FEA01F]',
  fillColor: '#FEA01F',
  caretIcon: '/assets/3c19b0558b9c088774326ac1629f87c98aff3e3d.svg',
  image: '/assets/ngoi_lang_tu_lap_island.png',
  skills: [
    { label: 'Tự dọn dẹp đồ chơi', color: '#FEA01F', progress: 80, spriteOffset: '-3.85%' },
    { label: 'Tự mặc quần áo', color: '#339E4A', progress: 80, spriteOffset: '-131.84%' },
    { label: 'Giữ gìn vệ sinh', color: '#0A7AD8', progress: 80, spriteOffset: '-252.32%' },
    { label: 'Tự chuẩn bị đồ dùng', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' },
  ],
}

export const independenceIslandLessons: DiaryLesson[] = [
  {
    id: 'lesson-1-tu-lap',
    title: 'Tự dọn dẹp đồ chơi',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    isCompleted: true,
    feedback: {
      title: 'Bé đã biết dọn dẹp đồ chơi chưa?',
      strengths: ['Bé tự giác xếp gọn gấu bông vào rổ', 'Bé không vứt đồ chơi lung tung sau khi chơi'],
      practice: ['Tập thói quen phân loại đồ chơi gỗ và nhựa', 'Cất dọn nhanh hơn không để ba mẹ nhắc nhở'],
      tips: ['Tạo trò chơi thi dọn đồ chơi nhanh cùng bé', 'Khen ngợi sự ngăn nắp của bé hàng ngày'],
    },
  },
  {
    id: 'lesson-2-tu-lap',
    title: 'Tự mặc quần áo',
    status: 'learning',
    statusLabel: 'Đang học',
    isCompleted: false,
    feedback: {
      title: 'Bé đã tự mặc quần áo được chưa?',
      strengths: ['Bé tự xỏ chân vào quần rất nhanh', 'Bé biết chọn đúng mặt trước của áo'],
      practice: ['Tập tự cài cúc áo sơ mi gỗ', 'Tập tự kéo khóa áo khoác mượt mà'],
      tips: ['Chuẩn bị quần áo chun co giãn dễ mặc cho bé tập', 'Kiên nhẫn để bé tự làm thay vì làm hộ'],
    },
  },
  {
    id: 'lesson-3-tu-lap',
    title: 'Giữ gìn vệ sinh cá nhân',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé giữ vệ sinh cá nhân tốt chưa?',
      strengths: ['Bé biết tự rửa tay xà phòng trước khi ăn', 'Bé đánh răng ngoan ngoãn mỗi tối'],
      practice: ['Đánh răng đúng cách xoay tròn nhẹ nhàng', 'Rửa tay kỹ càng các kẽ ngón tay'],
      tips: ['Dùng đồng hồ cát hoặc bài hát 2 phút làm mốc đánh răng', 'Khen ngợi bé có bàn tay và nụ cười thơm tho'],
    },
  },
  {
    id: 'lesson-4-tu-lap',
    title: 'Giúp đỡ việc nhà nhỏ',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé giúp ba mẹ việc nhà nhỏ chưa?',
      strengths: ['Bé thích giúp quét nhà bằng chổi nhỏ', 'Bé biết mang quần áo bẩn bỏ vào giỏ'],
      practice: ['Lau bàn ăn sạch sẽ bằng khăn mềm', 'Biết giữ gìn chổi và giẻ lau ngăn nắp'],
      tips: ['Giao các việc cực kỳ đơn giản và an toàn cho bé', 'Luôn khích lệ bé như một "trợ lý đắc lực"'],
    },
  },
  {
    id: 'lesson-5-tu-lap',
    title: 'Tự chuẩn bị đồ dùng',
    status: 'locked',
    statusLabel: 'Chưa học',
    isCompleted: false,
    feedback: {
      title: 'Bé tự chuẩn bị balo đi học chưa?',
      strengths: ['Bé biết mang hộp bút bỏ vào cặp sách', 'Bé tự chọn đúng mũ nón khi ra ngoài'],
      practice: ['Kiểm tra lại sách vở theo thời khóa biểu', 'Kéo khóa balo cẩn thận trước khi đeo'],
      tips: ['Lập bảng hình ảnh các vật dụng bé cần mang theo', 'Cùng bé chuẩn bị balo vào tối hôm trước'],
    },
  },
]
