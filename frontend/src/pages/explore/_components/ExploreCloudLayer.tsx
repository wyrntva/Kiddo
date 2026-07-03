import { DRIFTING_CLOUDS, GRADIENTS } from './exploreZoneMapData'
import { getCloudPuffs } from './exploreCloudUtils'

export default function ExploreCloudLayer() {
  return (
    <>
      {DRIFTING_CLOUDS.map((cloud, index) => {
        const isBack = cloud.zIndex === 1
        const filterId = isBack ? 'url(#cloud-filter-back)' : 'url(#cloud-filter-front)'
        const blurValue = isBack ? '3px' : '2px'
        const shadowColor = isBack ? 'rgba(0, 50, 80, 0.12)' : 'rgba(0, 50, 80, 0.08)'
        const gradientClass = GRADIENTS[cloud.gradIdx]

        return (
          <div
            key={index}
            className="absolute animate-drift pointer-events-none select-none"
            style={{
              top: cloud.top + 50,
              width: cloud.width,
              height: cloud.height,
              zIndex: cloud.zIndex,
              opacity: cloud.opacity,
              filter: `${filterId} blur(${blurValue}) drop-shadow(0 6px 12px ${shadowColor})`,
              animationDuration: `${cloud.speed}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          >
            {getCloudPuffs(cloud.type, gradientClass)}
          </div>
        )
      })}
    </>
  )
}
