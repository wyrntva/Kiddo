import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import { useAuth } from '../../context/AuthContext'

// Define the interface for Lesson
interface Lesson {
  id: string
  title: string
  status: 'active' | 'learning' | 'locked' | 'completed'
  statusLabel: string
  isCompleted: boolean
  feedback: {
    title: string
    strengths: string[]
    practice: string[]
    tips: string[]
  }
}

const ISLAND_LESSONS: { [key: string]: Lesson[] } = {
  'Vùng đất cảm xúc': [
    {
      id: 'lesson-1-cam-xuc',
      title: 'Niềm vui của con',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      isCompleted: true,
      feedback: {
        title: 'Con đang cảm thấy gì ?',
        strengths: [
          'Bé nhận ra cảm xúc của mình',
          'Bé biết gọi tên cảm xúc vui, buồn'
        ],
        practice: [
          'Bé nhận ra cảm xúc của mình',
          'Bé biết gọi tên cảm xúc vui, buồn'
        ],
        tips: [
          'Bé nhận ra cảm xúc của mình',
          'Bé biết gọi tên cảm xúc vui, buồn'
        ]
      }
    },
    {
      id: 'lesson-2-cam-xuc',
      title: 'Nỗi buồn bé nhỏ',
      status: 'learning',
      statusLabel: 'Đang học',
      isCompleted: false,
      feedback: {
        title: 'Con đang cảm thấy gì ?',
        strengths: [
          'Bé biết nhường đồ chơi cho bạn khi chơi chung',
          'Bé vui vẻ và hợp tác khi tham gia hoạt động nhóm'
        ],
        practice: [
          'Chờ đến lượt của mình mà không tranh giành',
          'Biết nói lời cảm ơn khi bạn chia sẻ đồ chơi'
        ],
        tips: [
          'Khen ngợi mỗi khi bé biết chia sẻ đồ chơi',
          'Chơi trò chơi đóng vai kể chuyện về sự sẻ chia'
        ]
      }
    },
    {
      id: 'lesson-3-cam-xuc',
      title: 'Cơn giận đang tới',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đang cảm thấy gì ?',
        strengths: [
          'Bé nhận biết được lỗi sai của bản thân khi được giải thích',
          'Bé chịu lắng nghe lời khuyên từ ba mẹ'
        ],
        practice: [
          'Nói lời xin lỗi một cách rõ ràng và chân thành',
          'Học cách hứa sửa sai và cố gắng không lặp lại'
        ],
        tips: [
          'Giải thích nhẹ nhàng tại sao hành động đó chưa đúng',
          'Làm gương xin lỗi trước mặt bé khi ba mẹ mắc lỗi'
        ]
      }
    },
    {
      id: 'lesson-4-cam-xuc',
      title: 'Khi con thấy sợ',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đang cảm thấy gì ?',
        strengths: [
          'Bé tự tin giới thiệu bản thân trước cả lớp',
          'Bé nói to, rõ ràng và có ánh mắt tương tác tốt'
        ],
        practice: [
          'Kiểm soát nhịp thở để giảm bớt hồi hộp khi nói',
          'Tự tin đặt câu hỏi khi chưa hiểu vấn đề'
        ],
        tips: [
          'Tạo cơ hội cho bé biểu diễn văn nghệ trước gia đình',
          'Luôn động viên và khích lệ từng sự cố gắng nhỏ của bé'
        ]
      }
    },
    {
      id: 'lesson-5-cam-xuc',
      title: 'Nói ra cảm xúc của mình',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đang cảm thấy gì ?',
        strengths: [
          'Bé nhận biết được lỗi sai của bản thân khi được giải thích',
          'Bé chịu lắng nghe lời khuyên từ ba mẹ'
        ],
        practice: [
          'Nói lời xin lỗi một cách rõ ràng và chân thành',
          'Học cách hứa sửa sai và cố gắng không lặp lại'
        ],
        tips: [
          'Giải thích nhẹ nhàng tại sao hành động đó chưa đúng',
          'Làm gương xin lỗi trước mặt bé khi ba mẹ mắc lỗi'
        ]
      }
    }
  ],
  'Thành phố giao tiếp': [
    {
      id: 'lesson-1-giao-tiep',
      title: 'Con biết chào hỏi',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      isCompleted: true,
      feedback: {
        title: 'Con đã biết chào hỏi chưa ?',
        strengths: [
          'Bé biết chào hỏi người lớn khi gặp mặt',
          'Bé lễ phép khoanh tay chào hỏi tự tin'
        ],
        practice: [
          'Tự tin chào hỏi người lạ dưới sự hướng dẫn',
          'Nhớ chào hỏi to và rõ ràng hơn'
        ],
        tips: [
          'Khuyến khích bé chào hỏi hàng xóm khi ra ngoài',
          'Khen ngợi bé mỗi khi bé chủ động chào hỏi'
        ]
      }
    },
    {
      id: 'lesson-2-giao-tiep',
      title: 'Con nói lời cảm ơn',
      status: 'learning',
      statusLabel: 'Đang học',
      isCompleted: false,
      feedback: {
        title: 'Con đã biết cảm ơn chưa ?',
        strengths: [
          'Bé biết nói lời cảm ơn khi nhận quà',
          'Bé thể hiện sự vui vẻ khi nhận đồ từ người khác'
        ],
        practice: [
          'Tập thói quen nói cảm ơn ngay lập tức',
          'Cảm ơn chân thành bằng cả lời nói và ánh mắt'
        ],
        tips: [
          'Làm gương cảm ơn trước mặt bé thường xuyên',
          'Nhắc nhở nhẹ nhàng khi bé quên nói lời cảm ơn'
        ]
      }
    },
    {
      id: 'lesson-3-giao-tiep',
      title: 'Con nói lời xin lỗi',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đã biết xin lỗi chưa ?',
        strengths: [
          'Bé nhận ra lỗi sai của mình khi được giải thích',
          'Bé biết lắng nghe ý kiến của ba mẹ'
        ],
        practice: [
          'Chủ động xin lỗi khi vô tình làm đau bạn',
          'Học cách hứa sửa đổi lỗi lầm của mình'
        ],
        tips: [
          'Giải thích cho bé tại sao hành động đó cần lời xin lỗi',
          'Tránh quát mắng quá mức khi bé phạm lỗi'
        ]
      }
    },
    {
      id: 'lesson-4-giao-tiep',
      title: 'Con biết lắng nghe',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đã biết lắng nghe chưa ?',
        strengths: [
          'Bé biết tập trung khi ba mẹ nói chuyện',
          'Bé hiểu ý của các câu chuyện ngắn'
        ],
        practice: [
          'Không ngắt lời người khác khi họ đang phát biểu',
          'Tập thói quen đợi người khác nói xong rồi mới phản hồi'
        ],
        tips: [
          'Kể chuyện cho bé nghe và hỏi lại ý chính để tập trung',
          'Lắng nghe bé một cách tôn trọng làm gương cho bé'
        ]
      }
    },
    {
      id: 'lesson-5-giao-tiep',
      title: 'Con biết nhờ giúp đỡ',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Con đã biết nhờ giúp đỡ chưa ?',
        strengths: [
          'Bé hiểu khi nào việc đó quá sức và cần người giúp',
          'Bé biết nói rõ ràng điều mình cần'
        ],
        practice: [
          'Nhờ giúp đỡ một cách lịch sự, lễ phép',
          'Nói cảm ơn sau khi nhận được sự giúp đỡ'
        ],
        tips: [
          'Hướng dẫn bé cách diễn đạt câu nhờ vả lịch sự',
          'Không làm hộ bé ngay lập tức mà để bé thử sức trước'
        ]
      }
    }
  ],
  'Ngôi làng tự lập': [
    {
      id: 'lesson-1-tu-lap',
      title: 'Tự dọn dẹp đồ chơi',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      isCompleted: true,
      feedback: {
        title: 'Bé đã biết dọn dẹp đồ chơi chưa?',
        strengths: [
          'Bé tự giác xếp gọn gấu bông vào rổ',
          'Bé không vứt đồ chơi lung tung sau khi chơi'
        ],
        practice: [
          'Tập thói quen phân loại đồ chơi gỗ và nhựa',
          'Cất dọn nhanh hơn không để ba mẹ nhắc nhở'
        ],
        tips: [
          'Tạo trò chơi thi dọn đồ chơi nhanh cùng bé',
          'Khen ngợi sự ngăn nắp của bé hàng ngày'
        ]
      }
    },
    {
      id: 'lesson-2-tu-lap',
      title: 'Tự mặc quần áo',
      status: 'learning',
      statusLabel: 'Đang học',
      isCompleted: false,
      feedback: {
        title: 'Bé đã tự mặc quần áo được chưa?',
        strengths: [
          'Bé tự xỏ chân vào quần rất nhanh',
          'Bé biết chọn đúng mặt trước của áo'
        ],
        practice: [
          'Tập tự cài cúc áo sơ mi gỗ',
          'Tập tự kéo khóa áo khoác mượt mà'
        ],
        tips: [
          'Chuẩn bị quần áo chun co giãn dễ mặc cho bé tập',
          'Kiên nhẫn để bé tự làm thay vì làm hộ'
        ]
      }
    },
    {
      id: 'lesson-3-tu-lap',
      title: 'Giữ gìn vệ sinh cá nhân',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé giữ vệ sinh cá nhân tốt chưa?',
        strengths: [
          'Bé biết tự rửa tay xà phòng trước khi ăn',
          'Bé đánh răng ngoan ngoãn mỗi tối'
        ],
        practice: [
          'Đánh răng đúng cách xoay tròn nhẹ nhàng',
          'Rửa tay kỹ càng các kẽ ngón tay'
        ],
        tips: [
          'Dùng đồng hồ cát hoặc bài hát 2 phút làm mốc đánh răng',
          'Khen ngợi bé có bàn tay và nụ cười thơm tho'
        ]
      }
    },
    {
      id: 'lesson-4-tu-lap',
      title: 'Giúp đỡ việc nhà nhỏ',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé giúp ba mẹ việc nhà nhỏ chưa?',
        strengths: [
          'Bé thích giúp quét nhà bằng chổi nhỏ',
          'Bé biết mang quần áo bẩn bỏ vào giỏ'
        ],
        practice: [
          'Lau bàn ăn sạch sẽ bằng khăn mềm',
          'Biết giữ gìn chổi và giẻ lau ngăn nắp'
        ],
        tips: [
          'Giao các việc cực kỳ đơn giản và an toàn cho bé',
          'Luôn khích lệ bé như một "trợ lý đắc lực"'
        ]
      }
    },
    {
      id: 'lesson-5-tu-lap',
      title: 'Tự chuẩn bị đồ dùng',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé tự chuẩn bị balo đi học chưa?',
        strengths: [
          'Bé biết mang hộp bút bỏ vào cặp sách',
          'Bé tự chọn đúng mũ nón khi ra ngoài'
        ],
        practice: [
          'Kiểm tra lại sách vở theo thời khóa biểu',
          'Kéo khóa balo cẩn thận trước khi đeo'
        ],
        tips: [
          'Lập bảng hình ảnh các vật dụng bé cần mang theo',
          'Cùng bé chuẩn bị balo vào tối hôm trước'
        ]
      }
    }
  ],
  'Khu vườn bạn bè': [
    {
      id: 'lesson-1-ban-be',
      title: 'Biết cách chia sẻ',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      isCompleted: true,
      feedback: {
        title: 'Bé đã biết chia sẻ đồ chơi chưa?',
        strengths: [
          'Bé vui vẻ nhường đồ chơi cho bạn',
          'Bé chủ động mời bạn cùng ăn bánh'
        ],
        practice: [
          'Chờ đến lượt chơi cầu trượt',
          'Không giằng đồ chơi khi bạn đang sử dụng'
        ],
        tips: [
          'Khen ngợi bé trước mặt bạn bè khi bé biết chia sẻ',
          'Đọc sách truyện kể về tình bạn và sự sẻ chia'
        ]
      }
    },
    {
      id: 'lesson-2-ban-be',
      title: 'Lắng nghe bạn bè',
      status: 'learning',
      statusLabel: 'Đang học',
      isCompleted: false,
      feedback: {
        title: 'Bé đã biết lắng nghe bạn chưa?',
        strengths: [
          'Bé biết đứng nghe bạn trình bày ý kiến',
          'Bé tôn trọng bạn khi chơi chung'
        ],
        practice: [
          'Không ngắt lời khi bạn đang kể chuyện',
          'Biết cách an ủi khi bạn khóc'
        ],
        tips: [
          'Tạo trò chơi truyền tin để bé tập lắng nghe',
          'Khen ngợi thái độ kiên nhẫn của bé'
        ]
      }
    },
    {
      id: 'lesson-3-ban-be',
      title: 'Hợp tác nhóm',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé có hợp tác tốt khi chơi nhóm?',
        strengths: [
          'Bé hào hứng tham gia xếp hình lego cùng nhóm',
          'Bé đóng góp đồ chơi chung cùng cả đội'
        ],
        practice: [
          'Thảo luận nhẹ nhàng không tranh giành vai trò',
          'Hợp tác cùng bạn hoàn thành bức tranh chung'
        ],
        tips: [
          'Tổ chức các trò chơi cần sự chung sức của 2-3 bé',
          'Khen ngợi thành quả của cả nhóm sau khi chơi xong'
        ]
      }
    },
    {
      id: 'lesson-4-ban-be',
      title: 'Giải quyết xung đột',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé xử lý tranh chấp thế nào?',
        strengths: [
          'Bé biết gọi ba mẹ/cô giáo giúp đỡ khi bạn đánh mình',
          'Bé chịu nói chuyện ôn hòa thay vì giật đồ'
        ],
        practice: [
          'Nói rõ cảm xúc của mình thay vì la khóc',
          'Biết nhường bạn một bước để giải quyết êm đẹp'
        ],
        tips: [
          'Dạy bé câu nói thần kỳ "Mình cùng chơi nhé"',
          'Không thiên vị ai khi phân xử xung đột giữa các bé'
        ]
      }
    },
    {
      id: 'lesson-5-ban-be',
      title: 'Cảm thông và giúp đỡ',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé biết quan tâm giúp bạn chưa?',
        strengths: [
          'Bé biết lấy khăn lau cho bạn khi bạn bị bẩn',
          'Bé biết hỏi han bạn khi thấy bạn ngã đau'
        ],
        practice: [
          'Chủ động giúp bạn nhặt bút màu rơi',
          'Chia sẻ lời động viên khi bạn buồn'
        ],
        tips: [
          'Hỏi bé về ngày đi học xem có bạn nào cần giúp đỡ không',
          'Lắng nghe bé một cách tôn trọng làm gương cho bé'
        ]
      }
    }
  ],
  'Hành tinh tình huống': [
    {
      id: 'lesson-1-tinh-huong',
      title: 'Khi bị lạc đường',
      status: 'completed',
      statusLabel: 'Hoàn thành',
      isCompleted: true,
      feedback: {
        title: 'Bé đã biết xử lý khi lạc chưa?',
        strengths: [
          'Bé nhớ số điện thoại của ba mẹ',
          'Bé biết đứng im một chỗ chờ ba mẹ'
        ],
        practice: [
          'Tập tìm chú bảo vệ hoặc cô bán hàng để giúp',
          'Không đi theo người lạ dù họ cho kẹo'
        ],
        tips: [
          'Đóng vai tình huống đi lạc tại trung tâm thương mại',
          'Dạy bé ghi nhớ địa chỉ nhà và tên ba mẹ'
        ]
      }
    },
    {
      id: 'lesson-2-tinh-huong',
      title: 'Gặp người lạ nói chuyện',
      status: 'learning',
      statusLabel: 'Đang học',
      isCompleted: false,
      feedback: {
        title: 'Bé biết từ chối quà người lạ không?',
        strengths: [
          'Bé biết lắc đầu từ chối khi người lạ cho kẹo',
          'Bé chạy lại gần ba mẹ ngay khi có người lạ tiếp cận'
        ],
        practice: [
          'Nói "Không, cám ơn" to và rõ ràng',
          'Biết hét to cầu cứu nếu bị người lạ lôi đi'
        ],
        tips: [
          'Xem hoạt hình giáo dục về an toàn với người lạ',
          'Thiết lập mật mã gia đình chỉ ba mẹ và bé biết'
        ]
      }
    },
    {
      id: 'lesson-3-tinh-huong',
      title: 'Ứng phó khi xảy ra hỏa hoạn',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé biết thoát hiểm khi có cháy?',
        strengths: [
          'Bé biết cúi thấp người đi men theo tường',
          'Bé nhớ cần dùng khăn ướt bịt mũi miệng'
        ],
        practice: [
          'Không trốn trong tủ hay gầm giường khi có cháy',
          'Nhanh chóng chạy ra lối thoát hiểm gần nhất'
        ],
        tips: [
          'Đóng vai diễn tập báo động cháy tại gia đình',
          'Dạy bé cách nhận diện lối thoát hiểm và chuông báo cháy'
        ]
      }
    },
    {
      id: 'lesson-4-tinh-huong',
      title: 'Sử dụng thiết bị điện an toàn',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé nhận biết mối nguy hiểm điện chưa?',
        strengths: [
          'Bé biết không được tự ý cắm phích cắm',
          'Bé không sờ tay ướt vào công tắc'
        ],
        practice: [
          'Nhắc nhở bạn bè tránh xa ổ điện nguy hiểm',
          'Biết gọi người lớn bật giúp thiết bị điện'
        ],
        tips: [
          'Sử dụng các nắp đậy che ổ điện an toàn',
          'Giải thích trực quan các mối nguy từ dòng điện cho bé'
        ]
      }
    },
    {
      id: 'lesson-5-tinh-huong',
      title: 'Gọi điện số khẩn cấp',
      status: 'locked',
      statusLabel: 'Chưa học',
      isCompleted: false,
      feedback: {
        title: 'Bé biết gọi số điện thoại khẩn cấp?',
        strengths: [
          'Bé ghi nhớ số 113, 114, 115 nhanh chóng',
          'Bé biết cách mở bàn phím cuộc gọi khẩn cấp trên điện thoại'
        ],
        practice: [
          'Báo cáo ngắn gọn, rõ ràng địa chỉ xảy ra sự cố',
          'Không nghịch ngợm gọi số khẩn cấp khi không có việc gì'
        ],
        tips: [
          'Thực hành bấm số và nói chuyện giả định cứu hộ',
          'Giải thích rõ cho bé khi nào thực sự cần gọi cứu hộ'
        ]
      }
    }
  ]
}

interface Skill {
  label: string
  color: string
  progress: number
  spriteOffset: string
}

interface Island {
  name: string
  bgColor: string
  borderColor: string
  bgHex: string
  textColor: string
  fillColor: string
  caretIcon: string
  image: string
  skills: Skill[]
}

const ISLANDS: Island[] = [
  {
    name: 'Vùng đất cảm xúc',
    bgColor: 'bg-[#f2fbef]',
    borderColor: 'border-[#c3ffd0]',
    bgHex: '#F2FBEF',
    textColor: 'text-[#339E4A]',
    fillColor: '#339E4A',
    caretIcon: '/assets/8f8ea9c83aa342067a65b615c8910f82398ad226.svg',
    image: '/assets/vung_dat_cam_xuc_island.png',
    skills: [
      { label: 'Nhận biết cảm xúc', color: '#339E4A', progress: 80, spriteOffset: '-3.85%' },
      { label: 'Bình tĩnh khi tức giận', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
      { label: 'Nói ra cảm xúc', color: '#0A7AD8', progress: 80, spriteOffset: '-252.32%' },
      { label: 'Giao tiếp tiêu cực', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' }
    ]
  },
  {
    name: 'Thành phố giao tiếp',
    bgColor: 'bg-[#f4fafd]',
    borderColor: 'border-[#c9e6ff]',
    bgHex: '#F4FAFD',
    textColor: 'text-[#0A7AD8]',
    fillColor: '#0A7AD8',
    caretIcon: '/assets/79c3e72202752af311f2a7c4b05755536c38fb62.svg',
    image: '/assets/thanh_pho_giao_tiep_island.png',
    skills: [
      { label: 'Con biết chào hỏi', color: '#0A7AD8', progress: 80, spriteOffset: '-3.85%' },
      { label: 'Con nói lời cảm ơn', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
      { label: 'Con nói lời xin lỗi', color: '#339E4A', progress: 80, spriteOffset: '-252.32%' },
      { label: 'Con biết lắng nghe', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' }
    ]
  },
  {
    name: 'Ngôi làng tự lập',
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
      { label: 'Tự chuẩn bị đồ dùng', color: '#8234E4', progress: 80, spriteOffset: '-381.62%' }
    ]
  },
  {
    name: 'Khu vườn bạn bè',
    bgColor: 'bg-[#fef0f0]',
    borderColor: 'border-[#ffc9d2]',
    bgHex: '#FEF0F0',
    textColor: 'text-[#E83552]',
    fillColor: '#E83552',
    caretIcon: '/assets/d2a5480bd7290e1918a69d355d9003da4d4a24fd.svg',
    image: '/assets/khu_vuon_ban_be_island.png',
    skills: [
      { label: 'Biết cách chia sẻ', color: '#E83552', progress: 80, spriteOffset: '-3.85%' },
      { label: 'Lắng nghe bạn bè', color: '#FEA01F', progress: 80, spriteOffset: '-131.84%' },
      { label: 'Hợp tác nhóm', color: '#339E4A', progress: 80, spriteOffset: '-252.32%' },
      { label: 'Giải quyết xung đột', color: '#0A7AD8', progress: 80, spriteOffset: '-381.62%' }
    ]
  },
  {
    name: 'Hành tinh tình huống',
    bgColor: 'bg-[#f2f0fe]',
    borderColor: 'border-[#d4c9ff]',
    bgHex: '#F2F0FE',
    textColor: 'text-[#8234E4]',
    fillColor: '#8234E4',
    caretIcon: '/assets/2272e67b001e06fe0c8546a967e8640d1eec1796.svg',
    image: '/assets/hanh_tinh_tinh_huong_island.png',
    skills: [
      { label: 'Khi bị lạc đường', color: '#8234E4', progress: 80, spriteOffset: '-3.85%' },
      { label: 'Gặp người lạ nói chuyện', color: '#0A7AD8', progress: 80, spriteOffset: '-131.84%' },
      { label: 'Ứng phó hỏa hoạn', color: '#FEA01F', progress: 80, spriteOffset: '-252.32%' },
      { label: 'Sử dụng điện an toàn', color: '#339E4A', progress: 80, spriteOffset: '-381.62%' }
    ]
  }
]

export default function DiaryPage() {
  const { user } = useAuth()
  const [expandedIsland, setExpandedIsland] = useState<string>('Vùng đất cảm xúc')
  const currentLessons = ISLAND_LESSONS[expandedIsland] || []
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(currentLessons[0])

  useEffect(() => {
    if (expandedIsland) {
      const lessonsForIsland = ISLAND_LESSONS[expandedIsland] || []
      if (lessonsForIsland.length > 0) {
        setSelectedLesson(lessonsForIsland[0])
      }
    }
  }, [expandedIsland])

  const accordionScrollRef = useRef<HTMLDivElement>(null)
  const islandRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    if (expandedIsland && islandRefs.current[expandedIsland] && accordionScrollRef.current) {
      const cardElement = islandRefs.current[expandedIsland]
      const containerElement = accordionScrollRef.current
      
      const timer = setTimeout(() => {
        const cardOffsetTop = cardElement.offsetTop
        containerElement.scrollTo({
          top: cardOffsetTop,
          behavior: 'smooth'
        })
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [expandedIsland])

  // Fallback info if user is not logged in
  const babyName = user?.name || 'An Hoàng Dương'
  const babyAge = '4 tuổi'
  const babyAvatar = user?.avatar || "/assets/dda751c0cf7a1aed55f732ffba2b65dc1e21acf3.png"



  // Handle selecting a lesson card
  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.status !== 'locked') {
      setSelectedLesson(lesson)
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F9FC] font-vietnam flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 xl:px-[48px] py-[24px] flex flex-col xl:flex-row gap-6 xl:gap-[24px]">
        
        {/* ══════════════════════════════════════════════════════
            LEFT SIDEBAR (Figma width: 540px -> increased to 564px to reduce gap to 24px)
        ══════════════════════════════════════════════════════ */}
        <div className="w-full xl:w-[564px] shrink-0 bg-[#fef9ed] rounded-[24px] p-[24px] pb-[80px] xl:pb-[24px] relative flex flex-col gap-[24px] overflow-hidden">
          
          {/* Baby Profile Card */}
          <div className="bg-white rounded-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] border border-[#edeef2] p-[24px] flex items-center gap-[24px]">
            <div className="bg-[#D9D9D9] overflow-clip relative rounded-full shrink-0 w-20 h-20">
              <img alt="Avatar" className="absolute inset-0 w-full h-full object-cover" src={babyAvatar} loading="lazy" />
            </div>
            <div className="flex flex-col gap-[12px]">
              <h2 className="font-baloo text-[24px] font-bold text-[#37393e] leading-[40px]">Bé : {babyName}</h2>
              <div className="flex items-center gap-[8px]">
                <div className="relative shrink-0 size-[24px]">
                  <img src="/assets/28c32429c5e658195e650777f7ed9b810af8e278.svg" alt="Cake Candles" className="absolute block inset-0 size-full object-contain" loading="lazy" />
                </div>
                <span className="font-vietnam text-[16px] font-medium text-[#37393e] leading-[24px]">{babyAge}</span>
              </div>
            </div>
          </div>

          {/* Skill Progress Card (Accordion list) */}
          <div 
            className="relative overflow-hidden w-full flex flex-col h-[480px] sm:h-[590px] p-[16px] pr-0 sm:p-[24px] sm:pr-0"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '12px',
              alignSelf: 'stretch',
              borderRadius: '24px',
              border: '1px solid #EDEEF2',
              background: '#FFF',
              boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-[12px] w-full pr-[16px] sm:pr-[24px]">
              <div className="bg-[#f2f0fe] p-[8px] rounded-full shrink-0 size-[40px] flex items-center justify-center">
                <img src="/assets/3bab622495f2214e9c9d7da863feb777684907f2.svg" alt="Status Up" className="block size-[24px] object-contain" loading="lazy" />
              </div>
              <h3 className="font-vietnam text-[20px] sm:text-[24px] font-bold text-[#37393e] leading-snug sm:leading-[32px]">Tiến độ kỹ năng</h3>
            </div>

            {/* Accordion list */}
            <div 
              ref={accordionScrollRef}
              className="relative flex flex-col gap-[12px] w-full overflow-y-auto pr-[16px] sm:pr-[24px] scrollbar-thin-custom"
              style={{
                flex: 1
              }}
            >
              {ISLANDS.map((island) => {
                const isExpanded = expandedIsland === island.name
                return (
                  <div
                    ref={(el) => {
                      islandRefs.current[island.name] = el
                    }}
                    key={island.name}
                    onClick={() => {
                      if (!isExpanded) {
                        setExpandedIsland(island.name)
                      }
                    }}
                    className="transition-all duration-300 w-full flex flex-col cursor-pointer hover:scale-[1.01]"
                    style={{
                      display: 'flex',
                      padding: '12px',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      gap: '12px',
                      alignSelf: 'stretch',
                      borderRadius: '24px',
                      border: '1px solid #EDEEF2',
                      background: island.bgHex,
                      boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {/* Island Header Row */}
                    <div className="flex items-center gap-[12px] w-full justify-between">
                      <div className="flex items-center gap-[12px]">
                        <div className="relative shrink-0 size-[48px] overflow-hidden rounded-[12px]">
                          <img
                            src={island.image}
                            alt={island.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <span 
                          className="font-vietnam font-bold text-[16px] leading-[24px] transition-colors duration-300"
                          style={{
                            color: island.fillColor
                          }}
                        >
                          {island.name}
                        </span>
                      </div>
                      <div className="relative shrink-0 size-[24px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className={`block size-full object-contain transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          <path
                            d="M7.85981 11.06C7.81295 11.0135 7.77575 10.9582 7.75037 10.8973C7.72498 10.8363 7.71191 10.771 7.71191 10.705C7.71191 10.639 7.72498 10.5736 7.75037 10.5127C7.77575 10.4518 7.81295 10.3965 7.85981 10.35L8.05981 10.15C8.10636 10.1017 8.16232 10.0634 8.22425 10.0376C8.28617 10.0118 8.35274 9.99902 8.41981 9.99999H15.5798C15.6469 9.99902 15.7135 10.0118 15.7754 10.0376C15.8373 10.0634 15.8933 10.1017 15.9398 10.15L16.1398 10.35C16.1867 10.3965 16.2239 10.4518 16.2493 10.5127C16.2746 10.5736 16.2877 10.639 16.2877 10.705C16.2877 10.771 16.2746 10.8363 16.2493 10.8973C16.2239 10.9582 16.1867 11.0135 16.1398 11.06L12.3498 14.85C12.3049 14.8978 12.2507 14.9359 12.1905 14.962C12.1303 14.9881 12.0654 15.0015 11.9998 15.0015C11.9342 15.0015 11.8693 14.9881 11.8091 14.962C11.7489 14.9359 11.6947 14.8978 11.6498 14.85L7.85981 11.06Z"
                            fill={island.fillColor}
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded Skill List */}
                    {isExpanded && (
                      <div 
                        className="flex flex-col gap-[24px] pt-[12px] w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent collapse when clicking inner content
                      >
                        {island.skills.map((skill) => (
                          <div key={skill.label} className="flex items-center gap-[24px] w-full">
                            {/* Sprite icon container */}
                            <div className="overflow-clip relative shrink-0 size-[48px]">
                              <img
                                src="/assets/71a60f62f566a1e60279961c156dc98659392a01.png"
                                alt={skill.label}
                                className="absolute max-w-none"
                                style={{
                                  width: '112.5%',
                                  height: '505.26%',
                                  left: '-8.31%',
                                  top: skill.spriteOffset
                                }}
                                loading="lazy"
                              />
                            </div>
                            
                            {/* Progress bar container */}
                            <div className="flex-1 flex flex-col gap-[4px]">
                              <span className="font-vietnam text-[16px] font-medium text-[#575e70] leading-[24px]">
                                {skill.label}
                              </span>
                              <div className="flex gap-[12px] items-center w-full">
                                <div className="bg-[#f0f2f4] flex-1 h-[10px] relative rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                                  />
                                </div>
                                <span className="font-baloo font-bold text-[16px] text-[#37393e] leading-[28px] shrink-0">
                                  {skill.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Grass decoration at the absolute bottom of left column */}
          <div className="absolute bottom-0 left-0 right-0 h-[62px] pointer-events-none z-10">
            <img 
              src="/assets/e6d6816d50b03ad893cebe7baab05e61452035d1.png"
              alt="Grass decoration"
              className="w-full h-full object-cover rounded-b-[24px] xl:rounded-none"
              loading="lazy" 
            />
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            RIGHT CONTENT AREA (Figma width: 1236px)
        ══════════════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col gap-[16px] min-w-0">
          
          {/* Section 1: Lesson Carousel */}
          <div className="flex flex-col gap-4">
            
            {/* Header of Section */}
            <div className="flex gap-[12px] items-start relative shrink-0 w-full">
              {/* Green circle containing the open book SVG */}
              <div className="bg-[#c3ffd0] flex gap-[10px] items-center p-[8px] relative rounded-[100px] shrink-0">
                <div className="relative shrink-0 size-[24px]">
                  <div className="absolute inset-[10.92%_6.25%_9.92%_6.25%]">
                    <img src="/assets/9acfa3ffa817d27da5068ef459f020ca126d7621.svg" alt="Book Open Icon" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                  </div>
                </div>
              </div>

              {/* Text block (Title + Subtitle) */}
              <div className="flex flex-col items-start justify-center leading-none">
                <h3 className="font-baloo text-[18px] font-bold text-[#339e4a] leading-[32px]">
                  Xem lại các bài khác
                </h3>
                <p className="font-vietnam text-[16px] text-[#575e70] leading-[24px] mt-0.5">
                  Chọn một bài để xem feedback chi tiết của bài đó
                </p>
              </div>
            </div>

            {/* Cards Grid (No Carousel, fits 5 items staticly) */}
            <div className="w-full flex items-center">
              
              {/* Fluid list container */}
              <div 
                className="w-full flex gap-[12px] xl:gap-[16px] pb-4 overflow-x-auto scrollbar-none snap-x snap-mandatory"
              >
                {currentLessons.map(lesson => {
                  const isSelected = selectedLesson.id === lesson.id
                  const isLocked = lesson.status === 'locked'
                  
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`w-[220px] md:w-[240px] shrink-0 snap-start xl:flex-1 xl:w-auto xl:min-w-0 rounded-[16px] border flex flex-col overflow-hidden h-fit transition-all duration-200 relative ${
                        isLocked 
                          ? 'cursor-not-allowed border-[#e2e2ea] bg-white' 
                          : 'cursor-pointer hover:shadow-md'
                      } ${
                        isSelected 
                          ? 'bg-[#f4fafd] border-[#0a7ad8] ring-2 ring-[#0a7ad8]' 
                          : 'bg-white border-[#e2e2ea]'
                      }`}
                    >
                      {/* Top Gray Image Area (aspect ratio matching /zone/cam-xuc) */}
                      <div 
                        className="w-full bg-[#d2d2d2] relative shrink-0 rounded-t-[14px] overflow-hidden"
                        style={{ aspectRatio: '260 / 176' }}
                      >
                        {/* Checkmark badge if completed */}
                        {lesson.isCompleted && (
                          <div className="absolute left-0 top-0 p-[10px] flex items-center">
                            <div className="bg-[#339e4a] p-[8px] rounded-full shrink-0 flex items-center justify-center text-white">
                              <div className="relative shrink-0 w-6 h-6">
                                <div className="absolute inset-[20.83%_6.25%_16.67%_6.25%]">
                                  <img src="/assets/36ad9f1432da45db964bbac8d805b994e5cf282a.svg" alt="Check" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Top-Right State tag */}
                        {isSelected && (
                          <div className="absolute right-0 top-0 p-[10px] flex items-center">
                            <div className="bg-[#e5f2ff] border border-[#0a7ad8] text-[#0a7ad8] text-[14px] font-medium px-[8px] py-[4px] rounded-[8px] shrink-0">
                              Đang xem
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Info & Button Area */}
                      <div className="flex-1 flex flex-col justify-between pt-[8px] pb-[12px] px-[8px] xl:px-[12px] gap-[8px]">
                        {/* Title */}
                        <div className="flex items-center justify-center w-full">
                          <h4 className="font-baloo text-[16px] xl:text-[18px] font-bold text-[#37393e] leading-[24px] text-center line-clamp-1 w-full">
                            {lesson.title}
                          </h4>
                        </div>

                        {/* Action Button */}
                        <div>
                          {lesson.status === 'locked' ? (
                            <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#757e95] text-[#757e95] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-[#f0f2f4]">
                              <div className="relative shrink-0 size-[24px]">
                                <div className="absolute inset-[8.33%_20.83%]">
                                  <img src="/assets/cfbbb7b1e9e9f60ab7b5d78cf3396285d4ff7e75.svg" alt="Lock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                                </div>
                              </div>
                              <span className="leading-[20px]">Chưa học</span>
                            </div>
                          ) : lesson.status === 'learning' ? (
                            <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#fdd444] text-[#fea01f] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-white hover:bg-[#FEA01F]/5 transition-colors">
                              <div className="relative shrink-0 size-[24px]">
                                <div className="absolute inset-[14.58%]">
                                  <img src="/assets/d701165fd92f8f0911b84de6d50d64b8c17335d7.svg" alt="Clock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                                </div>
                              </div>
                              <span className="leading-[20px]">Đang học</span>
                            </div>
                          ) : (
                            <div className="w-full flex items-center justify-center gap-[4px] md:gap-[6px] border-2 border-solid border-[#418457] text-[#418457] py-[6px] px-[8px] md:px-[12px] rounded-[40px] text-[14px] md:text-[15px] font-medium bg-white hover:bg-[#418457]/5 transition-colors">
                              <div className="relative shrink-0 size-[24px]">
                                <div className="absolute inset-[14.58%]">
                                  <img src="/assets/503f657f6c193f24dfa03bfb41d21c410490385e.svg" alt="Check Clock" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                                </div>
                              </div>
                              <span className="leading-[20px]">Hoàn thành</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

          </div>

          {/* Section 2: Active Lesson Feedback Display */}
          <div className="relative rounded-[24px] w-full xl:w-[1236px] h-auto xl:h-[490px] p-[20px] sm:p-[32px] xl:p-[48px] border border-[#BAE6FD] shadow-[0px_0px_5px_rgba(0,0,0,0.05)] flex flex-col gap-[20px] xl:gap-[24px] overflow-hidden justify-between">
            
            {/* Background Image of Feedback Area */}
            <div className="absolute inset-0 pointer-events-none rounded-[24px] z-0">
              <div className="absolute bg-white inset-0 rounded-[24px]" />
              <img 
                alt="Sky Background"
                className="absolute max-w-none object-cover rounded-[24px] w-full h-full"
                loading="lazy"
                src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.png" 
              />
            </div>

            {/* Content Top: Header */}
            <div className="flex justify-between items-center relative z-10 w-full pb-2 pr-0 lg:pr-[280px]">
              
              {/* Header Text block with Medal/Badge */}
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
                {/* Medal/Badge Group */}
                <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] xl:w-[120px] xl:h-[120px] shrink-0 relative overflow-visible">
                  <div className="absolute inset-[0_9.35%]">
                    <img src="/assets/e07e743fd476475cd05aedf502e19c4792f1a76e.svg" alt="Medal" className="absolute block inset-0 max-w-none size-full object-contain" loading="lazy" />
                  </div>
                </div>

                <div className="flex flex-col justify-center sm:justify-start h-full pt-1 sm:pt-2">
                  <span className="font-vietnam text-[16px] sm:text-[20px] xl:text-[24px] font-bold text-[#37393e] leading-snug sm:leading-[32px] xl:leading-[40px]">Vừa hoàn thành bài học</span>
                  <h2 className="font-baloo text-[24px] sm:text-[36px] xl:text-[48px] font-black text-[#0A7AD8] leading-tight sm:leading-[48px] xl:leading-[64px]">
                    {selectedLesson.feedback.title}
                  </h2>
                </div>
              </div>

            </div>

            {/* Mascot Otter holding trophy (Absolute Positioned) */}
            <div className="absolute right-[24px] xl:right-[48px] top-[24px] w-[200px] xl:w-[280px] h-[150px] xl:h-[200px] pointer-events-none z-10 hidden lg:block">
              <img 
                src="/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.png"
                alt="Mascot Otter holding Trophy"
                loading="lazy"
                className="absolute h-[154.71%] left-[-48.13%] max-w-none top-[-9.52%] w-[196.55%] object-contain"
              />
            </div>

            {/* Content Bottom: 3 Columns Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] xl:gap-[24px] relative z-10 mt-2">
              
              {/* Column 1: Strengths */}
              <div className="bg-[#f2fbef] rounded-[24px] border border-[#9de4af] p-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-200 flex flex-col gap-[24px]">
                <div className="flex items-center gap-[12px] shrink-0 w-full">
                  <div className="border border-[#9de4af] p-[4px] rounded-full shrink-0 flex items-center justify-center">
                    <div className="bg-[#339e4a] p-[8px] rounded-full shrink-0 flex items-center justify-center text-white">
                      <img src="/assets/781765e07dba9b19c7235eef3c818a8faf26e891.svg" alt="Star" className="w-6 h-6" loading="lazy" />
                    </div>
                  </div>
                  <div className="border-b border-dashed border-[#339e4a] pb-[4px] flex-1 flex flex-col items-start justify-center">
                    <h4 className="font-baloo text-[24px] font-bold text-[#339e4a] leading-[40px]">Điểm mạnh</h4>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {selectedLesson.feedback.strengths.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="shrink-0 w-6 h-6 mt-0.5">
                        <img src="/assets/0b40b5852870bd86ba33ba6078e2bd0b4b0b6bad.svg" alt="Check" className="w-full h-full" loading="lazy" />
                      </span>
                      <span className="font-vietnam text-[16px] font-medium leading-[24px] text-[#313235]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Need Practice */}
              <div className="bg-[#fef9ed] rounded-[24px] border border-[#ffdc64] p-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-200 flex flex-col gap-[24px]">
                <div className="flex items-center gap-[12px] shrink-0 w-full">
                  <div className="border border-[#ffdc64] p-[4px] rounded-full shrink-0 flex items-center justify-center">
                    <div className="bg-[#fea01f] p-[8px] rounded-full shrink-0 flex items-center justify-center text-white">
                      <img src="/assets/a7de906b07dd2bfbe826ef5f3ae618e76bfa3ef3.svg" alt="Practice" className="w-6 h-6" loading="lazy" />
                    </div>
                  </div>
                  <div className="border-b border-dashed border-[#fea01f] pb-[4px] flex-1 flex flex-col items-start justify-center">
                    <h4 className="font-baloo text-[24px] font-bold text-[#fea01f] leading-[40px]">Cần luyện thêm</h4>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {selectedLesson.feedback.practice.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="shrink-0 w-6 h-6 mt-0.5">
                        <img src="/assets/5ff06334161ed0621fed80bef95568a1a034d49f.svg" alt="Check" className="w-full h-full" loading="lazy" />
                      </span>
                      <span className="font-vietnam text-[16px] font-medium leading-[24px] text-[#313235]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Recommendations */}
              <div className="bg-[#f4fafd] rounded-[24px] border border-[#c9e6ff] p-[24px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] hover:shadow-md transition-all duration-200 flex flex-col gap-[24px]">
                <div className="flex items-center gap-[12px] shrink-0 w-full">
                  <div className="border border-[#c9e6ff] p-[4px] rounded-full shrink-0 flex items-center justify-center">
                    <div className="bg-[#0a7ad8] p-[8px] rounded-full shrink-0 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                        <path d="M4.5 9.76594C4.5 5.73718 7.87403 2.5 12 2.5C16.126 2.5 19.5 5.73718 19.5 9.76594C19.5 12.1199 18.5269 14.2437 16.7051 15.5831C16.5794 15.6756 16.5033 15.7902 16.4767 15.9028C16.423 16.1308 16.3641 16.3918 16.3035 16.6718C16.2735 16.8103 16.1512 16.9095 16.0095 16.9095H7.99054C7.8488 16.9095 7.72649 16.8103 7.6965 16.6718C7.63588 16.3918 7.57696 16.1308 7.52325 15.9028C7.49675 15.7902 7.42064 15.6756 7.2949 15.5831C5.47313 14.2437 4.5 12.1199 4.5 9.76594Z" fill="white"/>
                        <path d="M8.40053 18.4095C8.21367 18.4095 8.07242 18.5786 8.10352 18.7629C8.19745 19.3194 8.26604 19.8165 8.28682 20.1599C8.34981 21.2011 9.11672 22.0588 10.1422 22.2803L10.3382 22.3227C11.4326 22.5591 12.5674 22.5591 13.6618 22.3227L13.8578 22.2803C14.8833 22.0588 15.6502 21.2011 15.7132 20.1599C15.734 19.8165 15.8026 19.3194 15.8965 18.7629C15.9276 18.5786 15.7863 18.4095 15.5995 18.4095H8.40053Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div className="border-b border-dashed border-[#0a7ad8] pb-[4px] flex-1 flex flex-col items-start justify-center">
                    <h4 className="font-baloo text-[24px] font-bold text-[#0a7ad8] leading-[40px]">Gợi ý cho phụ huynh</h4>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {selectedLesson.feedback.tips.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="shrink-0 w-6 h-6 mt-0.5">
                        <img src="/assets/dfc0fd4a7226ab8dabdc2a5e582c88014bad289a.svg" alt="Check" className="w-full h-full" loading="lazy" />
                      </span>
                      <span className="font-vietnam text-[16px] font-medium leading-[24px] text-[#313235]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}
