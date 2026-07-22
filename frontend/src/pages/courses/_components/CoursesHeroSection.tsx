
export default function CoursesHeroSection() {
  return (
    <section className="bg-white flex flex-col lg:flex-row items-center gap-8 py-6 w-full">
      {/* Left Column: Title and Info tags */}
      <div className="flex-1 flex flex-col gap-6 items-start w-full lg:max-w-[700px]">
        <h1 className="font-baloo text-[40px] md:text-[48px] leading-[1.2] text-[#6c04ee] font-bold">
          Khóa học kỹ năng sống cho bé - 3-5 tuổi
        </h1>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start w-full">
          {/* Button tag 1 */}
          <div className="bg-[#f9f9fb] border border-[#313235] flex gap-2 items-center px-4 py-2 rounded-[40px] shrink-0">
            <img width="21" height="21"
              alt="Star" 
              className="w-6 h-6 object-contain" 
              src="/assets/f2cc417081b8fe0b59fbe703295d6629d83b6985.svg" 
            />
            <span className="font-vietnam font-bold text-[14px] md:text-[16px] text-[#313235]">
              Phù hợp cho bé 3-5 tuổi
            </span>
          </div>

          {/* Button tag 2 */}
          <div className="bg-[#f9f9fb] border border-[#313235] flex gap-2 items-center px-4 py-2 rounded-[40px] shrink-0">
            <img width="24" height="24"
              alt="Play" 
              className="w-6 h-6 object-contain" 
              src="/assets/cb0fd9852f3b881b5a2ac006035c4768a2646742.svg" 
            />
            <span className="font-vietnam font-bold text-[14px] md:text-[16px] text-[#313235]">
              Học qua trò chơi, video, tương tác
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Illustration banner */}
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="relative w-full max-w-[800px] aspect-[1003/313] overflow-hidden rounded-[24px]">
          <img width="1847" height="576"
            alt="Courses Hero Banner" 
            className="w-full h-full object-cover pointer-events-none" 
            src="/assets/6d12ccb4debf5997e86a9ef84b9e5cfee43a927c.webp" 
          />
        </div>
      </div>
    </section>
  )
}
