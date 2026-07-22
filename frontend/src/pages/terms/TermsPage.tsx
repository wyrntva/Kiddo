import Footer from '../../components/common/Footer'
import Navbar from '../../components/common/Navbar'
import SEO from '../../components/common/SEO'
import termsContent from './termsContent'

type TermsSection = {
  heading: string
  paragraphs: string[]
}

function parseTerms() {
  const lines = termsContent.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const title = lines.shift() ?? 'OTTOPIA – Chơi để hiểu, học để lớn'
  const introduction: string[] = []
  const sections: TermsSection[] = []

  for (const line of lines) {
    if (/^\d+\.\s/.test(line)) {
      sections.push({ heading: line, paragraphs: [] })
    } else if (sections.length === 0) {
      introduction.push(line)
    } else {
      sections[sections.length - 1].paragraphs.push(line)
    }
  }

  return { title, introduction, sections }
}

const terms = parseTerms()

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faff]">
      <SEO
        title="Điều khoản & Chính sách bảo mật"
        description="Điều khoản sử dụng dịch vụ và chính sách bảo mật thông tin người dùng trên nền tảng OTTOPIA."
      />
      <Navbar />
      <main className="w-full flex-1 px-2 pb-8 pt-2 sm:px-6 sm:pb-10 sm:pt-[10px] md:px-8 md:pb-14 xl:px-12">
        <article className="mx-auto w-full max-w-[1824px] overflow-hidden rounded-[16px] border border-[#d8edfa] bg-white shadow-[0_8px_28px_rgba(0,76,110,0.07)] sm:rounded-[20px] md:rounded-[24px]">
          <div className="flex justify-center px-3 sm:px-6">
            <div className="flex min-h-[44px] w-full max-w-[584px] items-center justify-center rounded-b-[22px] bg-[#0a7ad8] px-4 py-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.1)] sm:min-h-[50px] sm:rounded-b-[30px] sm:px-6 sm:py-2">
              <h1 className="text-center font-baloo text-[18px] font-bold uppercase leading-[28px] text-white sm:text-[22px] sm:leading-[32px] md:text-[24px]">
                Điều khoản sử dụng
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
            <div className="mb-8 space-y-3 rounded-[12px] border-l-[3px] border-[#fea01f] bg-[#fef9ed] px-4 py-4 sm:mb-10 sm:space-y-4 sm:rounded-[16px] sm:border-l-4 sm:px-5 sm:py-5">
              {terms.introduction.map((paragraph) => (
                <p key={paragraph} className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[28px]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-8 sm:space-y-9 md:space-y-10">
              {terms.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-3 break-words font-baloo text-[20px] font-bold leading-[30px] text-[#004c6e] sm:mb-4 sm:text-[22px] sm:leading-[34px] lg:text-[24px] lg:leading-[36px]">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.heading}-${index}`} className="break-words font-vietnam text-[15px] leading-[26px] text-[#3e484f] sm:text-[16px] sm:leading-[29px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
