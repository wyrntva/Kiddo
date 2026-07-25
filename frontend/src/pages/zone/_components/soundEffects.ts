// Sound effects using Web Audio API - no external files needed
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

/** Short "pop" sound when an emotion is placed on a card */
export function playDropSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08)
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12)

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  } catch {
    // Silently ignore audio errors
  }
}

/** Short "click" sound when picking up / selecting an emotion */
export function playPickupSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.06)

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  } catch {
    // Silently ignore audio errors
  }
}

/** "Remove" sound when an emotion is removed from a slot */
export function playRemoveSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15)

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.18)
  } catch {
    // Silently ignore audio errors
  }
}

/** Celebratory fanfare when all answers are correct */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext()

    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12)

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.12 + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.35)

      osc.start(ctx.currentTime + i * 0.12)
      osc.stop(ctx.currentTime + i * 0.12 + 0.35)
    })
  } catch {
    // Silently ignore audio errors
  }
}

/** Button press "click" sound */
export function playButtonSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(500, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.12)
  } catch {
    // Silently ignore audio errors
  }
}
