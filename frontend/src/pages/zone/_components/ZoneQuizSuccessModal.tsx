interface ZoneQuizSuccessModalProps {
  onResetGame: () => void
  onNextLesson: () => void
  onGoToDiary: () => void
}

export default function ZoneQuizSuccessModal({
  onResetGame,
  onNextLesson,
  onGoToDiary,
}: ZoneQuizSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative flex h-auto max-h-[calc(100vh-24px)] sm:max-h-[calc(100vh-32px)] w-full max-w-[1140px] flex-col overflow-y-auto overflow-x-hidden rounded-[24px] border border-[#BAE6FD] bg-white p-[20px] sm:p-[24px] lg:p-[40px] xl:p-[48px] shadow-[0px_0px_5px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in duration-300">
        <div className="absolute inset-0 z-0 pointer-events-none rounded-[24px]">
          <img
            alt="Sky Background"
            className="absolute h-full w-full max-w-none rounded-[24px] object-cover"
            src="/assets/9df33b1557a9d97afd069c95e8a6f06c6f083c6d.png"
          />
        </div>

        <div className="relative z-10 flex w-full flex-col gap-6 lg:gap-8">
          <div className="flex w-full flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:pr-[240px] lg:text-left">
            <div className="relative h-[96px] w-[96px] sm:h-[120px] sm:w-[120px] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none" className="h-full w-full">
                <path d="M107.283 108.075L92.8358 104.895L88.3583 119.03C88.0362 120.047 86.6598 120.196 86.128 119.272L68.2559 88.2254C77.0594 86.3179 84.8925 81.797 90.9069 75.5137L108.608 106.267C109.139 107.189 108.322 108.304 107.283 108.075Z" fill="#925DED"/>
                <path d="M107.283 108.075L93.9291 105.136C93.3098 104.999 92.689 105.358 92.4976 105.962L88.3583 119.03C88.0362 120.047 86.6598 120.196 86.128 119.272L70.817 92.6723L68.2559 88.2252C77.0594 86.3177 84.8925 81.7968 90.9069 75.5134L93.4485 79.926L108.608 106.266C109.139 107.189 108.322 108.304 107.283 108.075Z" fill="#925DED"/>
                <path d="M104.48 44.6154C104.48 56.6069 99.7619 67.4971 92.0832 75.5137C86.0688 81.7971 78.2357 86.318 69.4322 88.2255C66.3906 88.8843 63.2363 89.2309 59.9987 89.2309C57.5282 89.2309 55.1067 89.0291 52.7465 88.6409C44.2616 87.2447 36.5829 83.4392 30.4361 77.9475C30.1028 77.6524 29.7768 77.3526 29.4533 77.0453C28.3063 75.9588 27.2181 74.8106 26.1887 73.6087C25.2035 72.4533 24.277 71.2463 23.4119 69.9926C20.8139 66.2339 18.7773 62.0522 17.4219 57.5733C16.1842 53.4729 15.5176 49.1241 15.5176 44.6157C15.5176 19.9759 35.4335 0 59.9987 0C64.4912 0 68.8292 0.668601 72.9149 1.91267C77.3828 3.26728 81.5493 5.31009 85.2992 7.91832C86.5491 8.78618 87.7525 9.71531 88.902 10.706C90.4411 12.0236 91.8872 13.447 93.2327 14.9612C100.23 22.8449 104.48 33.2335 104.48 44.6154Z" fill="#FEC92B"/>
                <path d="M61.0996 26.9443L65.4761 35.8844C65.6543 36.2486 66.0011 36.501 66.4026 36.5586L76.2382 37.9718C77.2448 38.1164 77.6475 39.3534 76.9188 40.0627L69.785 47.0092C69.4953 47.2913 69.3635 47.6979 69.4324 48.0962L71.1323 57.9181C71.3061 58.9215 70.2509 59.6867 69.351 59.21L60.5726 54.5582C60.2138 54.368 59.784 54.368 59.4251 54.5582L50.6468 59.21C49.7468 59.6869 48.6917 58.9217 48.8655 57.9181L50.5654 48.0962C50.6343 47.6979 50.5024 47.2913 50.2128 47.0092L43.079 40.0627C42.3503 39.3531 42.753 38.1164 43.7596 37.9718L53.5952 36.5586C53.9964 36.501 54.3432 36.2486 54.5217 35.8844L58.8982 26.9443C59.3465 26.0287 60.6513 26.0287 61.0996 26.9443Z" fill="#E38300"/>
              </svg>
            </div>

            <div className="flex flex-col justify-center pt-1">
              <span style={{ color: '#37393E' }} className="font-baloo text-[20px] sm:text-[24px] font-bold leading-[32px] sm:leading-[40px]">
                Chúc mừng bé vừa hoàn thành bài học
              </span>
              <h2 style={{ color: '#0A7AD8' }} className="font-baloo text-[30px] sm:text-[40px] xl:text-[48px] font-bold leading-[38px] sm:leading-[56px] xl:leading-[80px]">
                Con đang cảm thấy gì?
              </h2>
            </div>
          </div>

          <div className="absolute right-[20px] top-[20px] z-10 hidden h-[150px] w-[200px] pointer-events-none lg:block xl:right-[40px] xl:top-[32px] xl:h-[225px] xl:w-[315px]">
            <img
              src="/assets/63994d049c46d89ab6ace318a3f3b1fb39d17839.png"
              alt="Mascot Otter holding Trophy"
              className="absolute left-[-48.13%] top-[-9.52%] h-[154.71%] w-[196.55%] max-w-none object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3 sm:gap-4">
            <button
              onClick={onResetGame}
              className="flex h-[48px] min-w-[200px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[40px] border-2 border-solid border-[#e83552] bg-white px-4 font-vietnam text-[16px] font-normal text-[#e83552] shadow-sm transition-all duration-200 hover:bg-red-50 active:scale-95"
            >
              <span>Chơi lại lần nữa</span>
            </button>
            <button
              onClick={onNextLesson}
              className="flex h-[48px] min-w-[200px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[40px] bg-[#0a7ad8] px-4 font-baloo text-[18px] sm:text-[20px] font-normal text-white shadow-md transition-all duration-200 hover:bg-[#0862ae] active:scale-95"
            >
              <span>Mở bài mới nào</span>
            </button>
            <button
              onClick={onGoToDiary}
              className="flex h-[48px] min-w-[200px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[40px] bg-[#339e4a] px-4 font-vietnam text-[16px] font-normal text-white shadow-md transition-all duration-200 hover:bg-[#2c883f] active:scale-95"
            >
              <span>Về nhật ký của bé</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
