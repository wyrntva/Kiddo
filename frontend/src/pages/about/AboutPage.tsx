import { Link } from 'react-router-dom'
import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff]">
      <SEO
        title="Về chúng tôi - OTTOPIA"
        description="Tìm hiểu câu chuyện, sứ mệnh, tầm nhìn và những giá trị cốt lõi mà OTTOPIA mang lại cho trẻ em và phụ huynh."
      />
      <Navbar />

      <main className="w-full flex-1 px-2 pb-12 pt-2 sm:px-6 sm:pb-14 sm:pt-[10px] md:px-8 xl:px-12">
        <article className="mx-auto w-full max-w-[1824px] overflow-hidden rounded-[16px] border border-[#d8edfa] bg-white shadow-[0_8px_28px_rgba(0,76,110,0.07)] sm:rounded-[20px] md:rounded-[24px]">
          {/* Header Bar */}
          <div className="flex justify-center px-3 sm:px-6">
            <div className="flex min-h-[44px] w-full max-w-[584px] items-center justify-center rounded-b-[22px] bg-[#0a7ad8] px-4 py-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.1)] sm:min-h-[50px] sm:rounded-b-[30px] sm:px-6 sm:py-2">
              <h1 className="text-center font-baloo text-[18px] font-bold uppercase leading-[28px] text-white sm:text-[22px] sm:leading-[32px] md:text-[24px]">
                Về chúng tôi
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-7 sm:py-10 md:px-10 lg:px-14 lg:py-12">
            {/* Welcome Intro */}
            <div className="mb-10 space-y-4 rounded-[12px] border-l-[4px] border-[#fea01f] bg-[#fef9ed] p-5 sm:mb-12 sm:rounded-[16px] sm:border-l-[5px] sm:p-6">
              <h2 className="font-baloo text-[22px] font-bold text-[#004c6e] sm:text-[26px]">
                Chào mừng đến với OTTOPIA
              </h2>
              <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                OTTOPIA là thế giới học kỹ năng sống dành cho trẻ từ 3–5 tuổi. Tại đây, những bài học tưởng như khó hiểu được kể lại bằng câu chuyện hoạt hình, nhân vật đáng yêu và trò chơi tương tác gần gũi.
              </p>
              <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                Trẻ được quan sát, lựa chọn và thử sức trong từng tình huống, để việc học không còn là nghe và ghi nhớ mà trở thành một hành trình khám phá đầy hứng thú.
              </p>
              <p className="font-baloo text-[16px] font-bold text-[#fea01f] sm:text-[18px]">
                OTTOPIA – Chơi để hiểu, học để lớn.
              </p>
            </div>

            {/* Story, Mission & Vision */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              {/* Story */}
              <div className="space-y-4">
                <h3 className="font-baloo text-[20px] font-bold text-[#004c6e] sm:text-[24px]">
                  Câu chuyện của OTTOPIA
                </h3>
                <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                  Trẻ nhỏ ngày càng tiếp xúc với thiết bị số từ sớm, nhưng phần lớn thời gian trên màn hình OTTOPIA bắt đầu từ một trăn trở nhỏ: trẻ ngày càng tiếp xúc với thiết bị số từ sớm, nhưng phần lớn thời gian ấy vẫn chỉ dành cho việc xem nội dung giải trí một chiều.
                </p>
                <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                  Chúng tôi tin rằng màn hình có thể mang lại nhiều giá trị hơn thế. Khi được thiết kế đúng cách, mỗi câu chuyện trẻ xem, mỗi lựa chọn trẻ đưa ra và mỗi trò chơi trẻ hoàn thành đều có thể trở thành một cơ hội để trẻ hiểu cảm xúc, học cách ứng xử và hình thành những thói quen tích cực.
                </p>
                <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                  Tên gọi OTTOPIA được kết hợp từ “Otter” – chú rái cá thông minh, tò mò, thích khám phá – và “Utopia” – một vùng đất lý tưởng. Đó cũng là thế giới chúng tôi muốn dành cho trẻ: vui tươi, an toàn và luôn có điều mới để học hỏi.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="space-y-8">
                {/* Mission */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-baloo text-[18px] font-bold text-[#0a7ad8] sm:text-[20px]">
                    <span className="text-[22px]">🎯</span> Sứ mệnh
                  </h4>
                  <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                    OTTOPIA mong muốn giúp trẻ tiếp cận kỹ năng sống theo cách tự nhiên, trực quan và phù hợp với lứa tuổi.
                  </p>
                  <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                    Đồng thời, chúng tôi giúp phụ huynh hiểu con đang học gì, đã làm tốt điều gì và cần luyện tập thêm ở đâu. Nhờ đó, mỗi bài học không chỉ dừng lại trên màn hình mà còn được tiếp tục trong những tình huống hằng ngày tại gia đình và trường học.
                  </p>
                </div>

                {/* Vision */}
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-baloo text-[18px] font-bold text-[#0a7ad8] sm:text-[20px]">
                    <span className="text-[22px]">👁️</span> Tầm nhìn
                  </h4>
                  <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                    Đến năm 2030, OTTOPIA hướng tới trở thành một thương hiệu nổi bật tại Việt Nam trong lĩnh vực trải nghiệm tương tác hỗ trợ phát triển kỹ năng sống cho trẻ mầm non.
                  </p>
                  <p className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                    Chúng tôi mong muốn xây dựng một thế giới số nơi công nghệ không chỉ mang đến niềm vui mà còn giúp trẻ từng bước hiểu bản thân, kết nối với mọi người và tự tin hơn trong cuộc sống.
                  </p>
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="mt-12 border-t border-[#e5e9f0] pt-10">
              <h3 className="mb-6 text-center font-baloo text-[22px] font-bold text-[#004c6e] sm:text-[26px]">
                Trẻ sẽ khám phá điều gì tại OTTOPIA?
              </h3>
              <p className="mx-auto mb-8 max-w-[900px] text-center font-vietnam text-[15px] leading-[26px] text-[#56646e] sm:text-[16px]">
                Hành trình khám phá tại OTTOPIA được mở đầu bằng năm vùng đất kỹ năng nền tảng:
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { icon: '🌈', title: 'Vùng đất cảm xúc', desc: 'Giúp trẻ nhận biết, gọi tên và thể hiện cảm xúc phù hợp.' },
                  { icon: '💬', title: 'Thành phố giao tiếp', desc: 'Giúp trẻ biết chào hỏi, cảm ơn, xin lỗi, lắng nghe và nhờ giúp đỡ.' },
                  { icon: '🏡', title: 'Ngôi làng tự lập', desc: 'Khuyến khích trẻ chủ động thực hiện những công việc phù hợp với độ tuổi.' },
                  { icon: '🤝', title: 'Khu vườn bạn bè', desc: 'Giúp trẻ học cách chia sẻ, hợp tác, cảm thông và giải quyết mâu thuẫn.' },
                  { icon: '🚀', title: 'Hành tinh tình huống', desc: 'Hướng dẫn trẻ phản ứng phù hợp trước những tình huống thường gặp.' }
                ].map((island, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center rounded-[16px] border border-[#d8edfa] bg-[#fcfdfe] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#b4dcf7] hover:bg-white hover:shadow-[0_8px_20px_rgba(10,122,216,0.06)]"
                  >
                    <span className="mb-3 text-[32px]">{island.icon}</span>
                    <h5 className="mb-2 font-baloo text-[16px] font-bold text-[#004c6e]">
                      {island.title}
                    </h5>
                    <p className="font-vietnam text-[13px] leading-relaxed text-[#56646e]">
                      {island.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-center font-vietnam text-[14px] italic leading-relaxed text-[#7c8b96] sm:text-[15px]">
                Đây là những điểm đến đầu tiên trong thế giới OTTOPIA. Các vùng đất, khóa học và chủ đề mới sẽ tiếp tục được mở rộng, mang đến cho trẻ nhiều kỹ năng cần thiết trong từng giai đoạn phát triển. Mỗi bài học đều bắt đầu từ những câu chuyện quen thuộc tại gia đình, trường học và trong quá trình vui chơi của trẻ.
              </p>
            </div>

            {/* Core Values */}
            <div className="mt-12 border-t border-[#e5e9f0] pt-10">
              <h3 className="mb-8 text-center font-baloo text-[22px] font-bold text-[#004c6e] sm:text-[26px]">
                Giá trị OTTOPIA theo đuổi
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Lấy trẻ làm trung tâm', desc: 'Mỗi nội dung được xây dựng dựa trên khả năng tiếp nhận, cảm xúc và nhịp phát triển tự nhiên của trẻ từ 3–5 tuổi.' },
                  { title: 'Sáng tạo giáo dục', desc: 'Những bài học kỹ năng sống được chuyển thành câu chuyện, nhân vật và trò chơi sinh động để trẻ tiếp thu tự nhiên hơn.' },
                  { title: 'Trải nghiệm có ý nghĩa', desc: 'Mỗi thao tác chạm, chọn hay trả lời đều giúp trẻ hiểu thêm về cảm xúc, hành vi và cách ứng xử trong cuộc sống.' },
                  { title: 'Phát triển kỹ năng thực tế', desc: 'OTTOPIA tập trung vào những kỹ năng trẻ có thể sử dụng hằng ngày tại nhà, ở trường và khi giao tiếp với mọi người.' },
                  { title: 'Kết nối đồng hành', desc: 'Bài học không kết thúc trên màn hình mà được tiếp tục qua sự hướng dẫn và luyện tập cùng phụ huynh, người chăm sóc và giáo viên.' }
                ].map((val, idx) => (
                  <div
                    key={idx}
                    className="rounded-[16px] border border-l-[4px] border-[#e4ebf0] border-l-[#0a7ad8] bg-[#fafcfe] p-5 transition-all duration-300 hover:border-[#b8c6cf] hover:border-l-[#fea01f] hover:bg-white hover:shadow-[0_6px_16px_rgba(0,0,0,0.03)]"
                  >
                    <h5 className="mb-2 font-baloo text-[17px] font-bold text-[#004c6e] sm:text-[18px]">
                      {val.title}
                    </h5>
                    <p className="font-vietnam text-[14px] leading-relaxed text-[#3e484f] sm:text-[15px]">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment & Toro CTA */}
            <div className="mt-12 border-t border-[#e5e9f0] pt-10 text-center">
              <div className="mx-auto max-w-[900px] space-y-4">
                <h3 className="font-baloo text-[22px] font-bold text-[#004c6e] sm:text-[26px]">
                  Cam kết của OTTOPIA
                </h3>
                <p className="break-words font-vietnam text-[15px] leading-relaxed text-[#3e484f] sm:text-[16px]">
                  OTTOPIA cam kết xây dựng nội dung tích cực, dễ hiểu và phù hợp với trẻ mầm non. Công nghệ được sử dụng như một công cụ hỗ trợ học tập, không thay thế hoạt động vui chơi, trải nghiệm thực tế hay sự kết nối giữa trẻ với những người xung quanh.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-[800px] rounded-[20px] bg-gradient-to-r from-[#e5f2ff] to-[#f0f7ff] p-6 shadow-sm border border-[#d8edfa] sm:p-8">
                <h4 className="mb-3 font-baloo text-[18px] font-bold text-[#0a7ad8] sm:text-[20px]">
                  🐻 Cùng Toro bắt đầu hành trình trưởng thành
                </h4>
                <p className="mb-6 font-vietnam text-[14px] leading-relaxed text-[#3e484f] sm:text-[15px]">
                  Toro cũng có lúc bối rối, mắc lỗi và chưa biết phải làm gì. Nhưng qua mỗi chuyến phiêu lưu cùng Bunny, Foxy, Berry và Tiki, Toro lại học thêm một điều mới. Hãy cùng Toro bước vào thế giới OTTOPIA, nơi mỗi trải nghiệm nhỏ đều có thể trở thành một bài học đầu đời ý nghĩa.
                </p>

                {/* Buttons container */}
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    to="/explore"
                    className="flex min-h-[44px] items-center justify-center rounded-[40px] bg-[#0a7ad8] px-6 py-2.5 font-baloo text-[15px] font-bold text-white shadow-sm transition-all hover:bg-[#0060b9] active:scale-95 sm:text-[16px]"
                  >
                    Khám phá bài học
                  </Link>
                  <Link
                    to="/explore"
                    className="flex min-h-[44px] items-center justify-center rounded-[40px] bg-[#fea01f] px-6 py-2.5 font-baloo text-[15px] font-bold text-white shadow-sm transition-all hover:bg-[#e08b15] active:scale-95 sm:text-[16px]"
                  >
                    Học thử miễn phí
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
