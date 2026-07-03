export interface ExploreCourse {
  id: number
  title: string
  category: string
  categoryLabel: string
  categoryColor: string
  categoryBg: string
  emoji: string
  gradient: string
  accentColor: string
  lessons: number
  duration: string
  stars: number
  progress: number
  level: string
}

export const allCourses: ExploreCourse[] = [
  { id: 1, title: 'Quản lý cơn tức giận', category: 'emotion', categoryLabel: 'Cảm Xúc', categoryColor: 'text-[#339e4a]', categoryBg: 'bg-[#f2fbef]', emoji: '😤', gradient: 'from-[#f2fbef] to-[#c3ffd0]', accentColor: '#339e4a', lessons: 5, duration: '25 phút', stars: 4, progress: 0, level: 'Cơ bản' },
  { id: 2, title: 'Lắng nghe người khác', category: 'communication', categoryLabel: 'Giao Tiếp', categoryColor: 'text-[#0a7ad8]', categoryBg: 'bg-[#e5f2ff]', emoji: '👂', gradient: 'from-[#e5f2ff] to-[#c9e6ff]', accentColor: '#0a7ad8', lessons: 6, duration: '30 phút', stars: 5, progress: 40, level: 'Cơ bản' },
  { id: 3, title: 'Tự dọn dẹp phòng', category: 'independence', categoryLabel: 'Tự Lập', categoryColor: 'text-[#895026]', categoryBg: 'bg-[#fef9ed]', emoji: '🧹', gradient: 'from-[#fef9ed] to-[#fff4bf]', accentColor: '#e8a000', lessons: 4, duration: '20 phút', stars: 4, progress: 75, level: 'Cơ bản' },
  { id: 4, title: 'Chia sẻ đồ chơi', category: 'friendship', categoryLabel: 'Bạn Bè', categoryColor: 'text-[#e55c72]', categoryBg: 'bg-[#fff0f3]', emoji: '🎁', gradient: 'from-[#fff0f3] to-[#ffd6de]', accentColor: '#e55c72', lessons: 5, duration: '22 phút', stars: 5, progress: 0, level: 'Cơ bản' },
  { id: 5, title: 'Xử lý khi bị bắt nạt', category: 'situation', categoryLabel: 'Tình Huống', categoryColor: 'text-[#9560d8]', categoryBg: 'bg-[#f2f0fe]', emoji: '🛡️', gradient: 'from-[#f2f0fe] to-[#e9d8ff]', accentColor: '#9560d8', lessons: 7, duration: '35 phút', stars: 5, progress: 20, level: 'Trung cấp' },
  { id: 6, title: 'Thể hiện tình yêu thương', category: 'emotion', categoryLabel: 'Cảm Xúc', categoryColor: 'text-[#339e4a]', categoryBg: 'bg-[#f2fbef]', emoji: '💚', gradient: 'from-[#f2fbef] to-[#c3ffd0]', accentColor: '#339e4a', lessons: 6, duration: '28 phút', stars: 5, progress: 60, level: 'Cơ bản' },
  { id: 7, title: 'Tự chuẩn bị bữa sáng', category: 'independence', categoryLabel: 'Tự Lập', categoryColor: 'text-[#895026]', categoryBg: 'bg-[#fef9ed]', emoji: '🍳', gradient: 'from-[#fef9ed] to-[#fff4bf]', accentColor: '#e8a000', lessons: 5, duration: '25 phút', stars: 4, progress: 0, level: 'Trung cấp' },
  { id: 8, title: 'Nói xin lỗi đúng cách', category: 'communication', categoryLabel: 'Giao Tiếp', categoryColor: 'text-[#0a7ad8]', categoryBg: 'bg-[#e5f2ff]', emoji: '🙏', gradient: 'from-[#e5f2ff] to-[#c9e6ff]', accentColor: '#0a7ad8', lessons: 4, duration: '18 phút', stars: 5, progress: 100, level: 'Cơ bản' },
  { id: 9, title: 'Kết bạn mới ở trường', category: 'friendship', categoryLabel: 'Bạn Bè', categoryColor: 'text-[#e55c72]', categoryBg: 'bg-[#fff0f3]', emoji: '👫', gradient: 'from-[#fff0f3] to-[#ffd6de]', accentColor: '#e55c72', lessons: 6, duration: '30 phút', stars: 4, progress: 0, level: 'Cơ bản' },
  { id: 10, title: 'Ứng xử khi bị ngã', category: 'situation', categoryLabel: 'Tình Huống', categoryColor: 'text-[#9560d8]', categoryBg: 'bg-[#f2f0fe]', emoji: '🩹', gradient: 'from-[#f2f0fe] to-[#e9d8ff]', accentColor: '#9560d8', lessons: 3, duration: '15 phút', stars: 4, progress: 0, level: 'Cơ bản' },
  { id: 11, title: 'Vui chơi công bằng', category: 'friendship', categoryLabel: 'Bạn Bè', categoryColor: 'text-[#e55c72]', categoryBg: 'bg-[#fff0f3]', emoji: '🎲', gradient: 'from-[#fff0f3] to-[#ffd6de]', accentColor: '#e55c72', lessons: 5, duration: '22 phút', stars: 5, progress: 30, level: 'Cơ bản' },
  { id: 12, title: 'Nhận ra khi mình sai', category: 'emotion', categoryLabel: 'Cảm Xúc', categoryColor: 'text-[#339e4a]', categoryBg: 'bg-[#f2fbef]', accentColor: '#339e4a', emoji: '🤔', gradient: 'from-[#f2fbef] to-[#c3ffd0]', lessons: 4, duration: '20 phút', stars: 5, progress: 0, level: 'Trung cấp' },
]
