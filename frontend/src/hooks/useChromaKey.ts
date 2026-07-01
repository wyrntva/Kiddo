import { useEffect, RefObject } from 'react'

interface ChromaKeyOptions {
  width: number
  height: number
  tMin?: number
  tMax?: number
}

export function useChromaKey(
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { width, height, tMin = 4, tMax = 16 }: ChromaKeyOptions,
) {
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let frameId: number

    const render = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height)
        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const maxRB = r > b ? r : b
          const greenness = g - maxRB

          if (greenness > 0) data[i + 1] = maxRB

          if (greenness > tMin) {
            data[i + 3] = greenness > tMax
              ? 0
              : Math.round(data[i + 3] * (tMax - greenness) / (tMax - tMin))
          }
        }

        ctx.putImageData(imgData, 0, 0)
      }
      frameId = requestAnimationFrame(render)
    }

    video.play().catch(() => {})
    render()

    return () => cancelAnimationFrame(frameId)
  }, [videoRef, canvasRef, width, height, tMin, tMax])
}
