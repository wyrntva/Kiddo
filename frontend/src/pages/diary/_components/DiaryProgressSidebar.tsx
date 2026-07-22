import type { MutableRefObject, RefObject } from 'react'
import type { DiaryIsland } from '../types'

interface DiaryProgressSidebarProps {
  islands: DiaryIsland[]
  expandedIsland: string
  setExpandedIsland: (name: string) => void
  accordionScrollRef: RefObject<HTMLDivElement>
  islandRefs: MutableRefObject<Record<string, HTMLDivElement | null>>
}

export default function DiaryProgressSidebar({
  islands,
  expandedIsland,
  setExpandedIsland,
  accordionScrollRef,
  islandRefs,
}: DiaryProgressSidebarProps) {
  return (
    <div
      className="relative overflow-hidden w-full flex flex-col h-[420px] sm:h-[520px] xl:h-[590px] p-[16px] pr-0 sm:p-[24px] sm:pr-0"
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
      <div className="flex items-center gap-[12px] w-full pr-[16px] sm:pr-[24px]">
        <div className="bg-[#f2f0fe] p-[8px] rounded-full shrink-0 size-[40px] flex items-center justify-center">
          <img width="24" height="24" src="/assets/3bab622495f2214e9c9d7da863feb777684907f2.svg" alt="Status Up" className="block size-[24px] object-contain" loading="lazy" decoding="async" />
        </div>
        <h3 className="font-vietnam text-[20px] sm:text-[24px] font-bold text-[#37393e] leading-snug sm:leading-[32px]">Tiến độ kỹ năng</h3>
      </div>

      <div
        ref={accordionScrollRef}
        className="relative flex flex-col gap-[12px] w-full overflow-y-auto pr-[16px] sm:pr-[24px] scrollbar-thin-custom"
        style={{ flex: 1 }}
      >
        {islands.map((island) => {
          const isExpanded = expandedIsland === island.name

          return (
            <div
              ref={(element) => {
                islandRefs.current[island.name] = element
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
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="flex items-center gap-[12px] w-full justify-between">
                <div className="flex items-center gap-[12px] min-w-0">
                  <div className="relative shrink-0 size-[48px] overflow-hidden rounded-[12px]">
                    <img
                      src={island.image}
                      alt={island.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy" decoding="async"
                    />
                  </div>
                  <span className="font-vietnam font-bold text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] transition-colors duration-300 break-words" style={{ color: island.fillColor }}>
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
                    className={`block size-full object-contain transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <path
                      d="M7.85981 11.06C7.81295 11.0135 7.77575 10.9582 7.75037 10.8973C7.72498 10.8363 7.71191 10.771 7.71191 10.705C7.71191 10.639 7.72498 10.5736 7.75037 10.5127C7.77575 10.4518 7.81295 10.3965 7.85981 10.35L8.05981 10.15C8.10636 10.1017 8.16232 10.0634 8.22425 10.0376C8.28617 10.0118 8.35274 9.99902 8.41981 9.99999H15.5798C15.6469 9.99902 15.7135 10.0118 15.7754 10.0376C15.8373 10.0634 15.8933 10.1017 15.9398 10.15L16.1398 10.35C16.1867 10.3965 16.2239 10.4518 16.2493 10.5127C16.2746 10.5736 16.2877 10.639 16.2877 10.705C16.2877 10.771 16.2746 10.8363 16.2493 10.8973C16.2239 10.9582 16.1867 11.0135 16.1398 11.06L12.3498 14.85C12.3049 14.8978 12.2507 14.9359 12.1905 14.962C12.1303 14.9881 12.0654 15.0015 11.9998 15.0015C11.9342 15.0015 11.8693 14.9881 11.8091 14.962C11.7489 14.9359 11.6947 14.8978 11.6498 14.85L7.85981 11.06Z"
                      fill={island.fillColor}
                    />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <div className="flex flex-col gap-[24px] pt-[12px] w-full" onClick={(event) => event.stopPropagation()}>
                  {island.skills.map((skill) => (
                    <div key={skill.label} className="flex items-center gap-[24px] w-full">
                      <div className="overflow-clip relative shrink-0 size-[48px]">
                        <img width="228" height="1024"
                          src="/assets/71a60f62f566a1e60279961c156dc98659392a01.webp"
                          alt={skill.label}
                          className="absolute max-w-none"
                          style={{
                            width: '112.5%',
                            height: '505.26%',
                            left: '-8.31%',
                            top: skill.spriteOffset,
                          }}
                          loading="lazy" decoding="async"
                        />
                      </div>

                      <div className="flex-1 flex flex-col gap-[4px]">
                        <span className="font-vietnam text-[16px] font-medium text-[#575e70] leading-[24px]">{skill.label}</span>
                        <div className="flex gap-[12px] items-center w-full">
                          <div className="bg-[#f0f2f4] flex-1 h-[10px] relative rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${skill.progress}%`, backgroundColor: skill.color }} />
                          </div>
                          <span className="font-baloo font-bold text-[16px] text-[#37393e] leading-[28px] shrink-0">{skill.progress}%</span>
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
  )
}
