export function getCloudPuffs(type: string, gradientClass: string) {
  switch (type) {
    case 'B':
      return (
        <>
          <div className={`absolute rounded-full w-[80%] h-[55%] left-[10%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[35%] h-[80%] left-[25%] bottom-[12%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[40%] h-[75%] right-[20%] bottom-[10%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[25%] h-[60%] left-[5%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
    case 'C':
      return (
        <>
          <div className={`absolute rounded-full w-[70%] h-[75%] left-[15%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[45%] h-[95%] left-[28%] bottom-[15%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[35%] h-[70%] left-[8%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[40%] h-[80%] right-[12%] bottom-[10%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
    case 'A':
    default:
      return (
        <>
          <div className={`absolute rounded-full w-[65%] h-[70%] left-[18%] bottom-[5%] bg-gradient-to-t ${gradientClass} opacity-95`} />
          <div className={`absolute rounded-full w-[42%] h-[85%] left-[5%] bottom-[8%] bg-gradient-to-t ${gradientClass} opacity-90`} />
          <div className={`absolute rounded-full w-[48%] h-[90%] left-[26%] bottom-[12%] bg-gradient-to-t ${gradientClass}`} />
          <div className={`absolute rounded-full w-[45%] h-[78%] right-[5%] bottom-[6%] bg-gradient-to-t ${gradientClass} opacity-90`} />
        </>
      )
  }
}
