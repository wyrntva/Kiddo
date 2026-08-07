const testimonials = [
  {
    quote: 'OTTOPIA giúp bé nhà mình tự tin hơn hẳn, biết nói cảm xúc thay vì khóc hay gắt gỏng. Mình rất yên tâm!',
    name: 'Chị Minh Thư',
    subtitle: 'Mẹ bé Bin, 4 tuổi',
    avatar: '/assets/avatar_mother_1.jpg',
    themeColor: '#339e4a', // Green
    bgColor: 'bg-[#f4faf6]',
    borderColor: 'border-[#339e4a]/10',
    avatarBg: 'bg-[#eef8f2]',
  },
  {
    quote: 'Bài học ngắn gọn, hình ảnh dễ thương và đặc biệt là bé học mỗi ngày mà không hề chán!',
    name: 'Chị Hoài An',
    subtitle: 'Mẹ bé Sữa, 3 tuổi',
    avatar: '/assets/avatar_mother_2.jpg',
    themeColor: '#fea01f', // Orange
    bgColor: 'bg-[#fef9ed]',
    borderColor: 'border-[#fea01f]/10',
    avatarBg: 'bg-[#fefcf0]',
  },
  {
    quote: 'Mình thích nhất là các tình huống thực tế rất gần gũi với cuộc sống hằng ngày của con. Rất thực tế!',
    name: 'Anh Quân Bảo',
    subtitle: 'Ba bé Kem, 5 tuổi',
    avatar: '/assets/avatar_father_1.jpg',
    themeColor: '#0a7ad8', // Blue
    bgColor: 'bg-[#f4fafd]',
    borderColor: 'border-[#0a7ad8]/10',
    avatarBg: 'bg-[#eef7fc]',
  },
  {
    quote: 'Khóa học thiết thực vô cùng! Bé nhà mình biết chia sẻ đồ chơi và tự xin lỗi khi làm sai, thay đổi rõ rệt từng ngày.',
    name: 'Chị Lan Phương',
    subtitle: 'Mẹ bé Gấu, 5 tuổi',
    avatar: '/assets/avatar_mother_3.jpg',
    themeColor: '#8234e4', // Purple
    bgColor: 'bg-[#f8f2ff]',
    borderColor: 'border-[#8234e4]/10',
    avatarBg: 'bg-[#faf5ff]',
  }
]

export default function ParentsTestimonialsSection() {
  return (
    <section className="w-full py-8 sm:py-12 bg-white">
      {/* Title */}
      <div className="flex items-center justify-center gap-2.5 w-full text-center mb-8 sm:mb-10">
        <h2 className="font-baloo text-[24px] sm:text-[32px] font-bold text-[#0A7AD8] leading-tight">
          Phụ huynh nói gì về OTTOPIA?
        </h2>
        {/* User-supplied SVG Comment Bubble Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-7 h-7 sm:w-9 sm:h-9 shrink-0">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.6693 6.07061C14.2644 5.79965 17.8754 5.81743 21.4677 6.12377L23.6327 6.3084C25.268 6.44786 26.5952 7.68895 26.8439 9.31128L26.9805 10.2024C27.444 13.2263 27.4006 16.3062 26.8523 19.3159C26.5817 20.8009 25.2881 21.8801 23.7787 21.8801H11.8101C11.5348 21.8801 11.2637 21.9483 11.0211 22.0786L5.80676 24.8809C5.49685 25.0475 5.12222 25.0389 4.82024 24.8584C4.51826 24.6778 4.33337 24.3519 4.33337 24.0001V12.6437C4.33337 9.20553 6.98325 6.34842 10.4117 6.09003L10.6693 6.07061ZM10.6667 12.6667C9.74623 12.6667 9.00004 13.4129 9.00004 14.3334C9.00004 15.2539 9.74623 16.0001 10.6667 16.0001C11.5872 16.0001 12.3334 15.2539 12.3334 14.3334C12.3334 13.4129 11.5872 12.6667 10.6667 12.6667ZM16 12.6667C15.0796 12.6667 14.3334 13.4129 14.3334 14.3334C14.3334 15.2539 15.0796 16.0001 16 16.0001C16.9205 16.0001 17.6667 15.2539 17.6667 14.3334C17.6667 13.4129 16.9205 12.6667 16 12.6667ZM19.6667 14.3334C19.6667 13.4129 20.4129 12.6667 21.3334 12.6667C22.2538 12.6667 23 13.4129 23 14.3334C23 15.2539 22.2538 16.0001 21.3334 16.0001C20.4129 16.0001 19.6667 15.2539 19.6667 14.3334Z" fill="#0A7AD8"/>
        </svg>
      </div>

      {/* Testimonials Grid aligned with the layout bounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
        {testimonials.map((item, idx) => (
          <div 
            key={idx}
            className={`flex gap-4 p-5 sm:p-6 rounded-[24px] border ${item.bgColor} ${item.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            {/* Avatar Column */}
            <div className="shrink-0">
              <div className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full p-[3px] ${item.avatarBg} border-2 overflow-hidden flex items-center justify-center`} style={{ borderColor: item.themeColor }}>
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col flex-grow items-start text-left">
              {/* Quote Mark */}
              <span 
                className="text-[44px] sm:text-[48px] font-serif leading-none select-none h-6 sm:h-8"
                style={{ color: item.themeColor }}
              >
                “
              </span>

              {/* Testimonial Text */}
              <p className="font-vietnam text-[14px] sm:text-[15px] leading-relaxed text-[#2d2f31] font-medium mt-1">
                {item.quote}
              </p>

              {/* Parent Info */}
              <h4 className="font-vietnam font-bold text-[15px] sm:text-[16px] text-[#004c6e] mt-4">
                {item.name}
              </h4>
              <p className="font-vietnam text-[12px] sm:text-[13px] text-[#575e70]">
                {item.subtitle}
              </p>

              {/* 5 Stars Rating */}
              <div className="flex gap-0.5 mt-2.5">
                {[...Array(5)].map((_, starIdx) => (
                  <svg 
                    key={starIdx}
                    className="w-4 h-4 text-[#fea01f] fill-current" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
