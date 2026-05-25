import { useTunerStore } from '../stores/tuner.store'
import { detectPitchYIN } from '../lib/yin.ts'

let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let source: MediaStreamAudioSourceNode | null = null
let dataArray: Float32Array<ArrayBuffer>
let animationId: number
let frequencyHistory: number[] = []
let lastFrequency: number | null = null
let lastDetectionTime = 0
let lastSoundTime = 0
let pendingFrequency: number | null = null
let pendingStartTime = 0
let filter: BiquadFilterNode | null = null
const DETECTION_INTERVAL = 120 
const SILENCE_TIMEOUT = 5000

export const startAudio = async () => {
  if (audioContext) return

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  audioContext = new AudioContext()

  analyser = audioContext.createAnalyser()
  analyser.smoothingTimeConstant = 0.4

  source = audioContext.createMediaStreamSource(stream)
 

  analyser.fftSize = 4096
  dataArray = new Float32Array(analyser.fftSize)

  filter = audioContext.createBiquadFilter()

  filter.type = 'bandpass'
  filter.frequency.value = 500
  filter.Q.value = 3

  source.connect(filter)
  filter.connect(analyser)

  useTunerStore.getState().setListening(true)

  lastFrequency = null
  frequencyHistory = []
  lastDetectionTime = 0
  

  animationId = requestAnimationFrame(loop)
}

export const stopAudio = () => {
  if (!audioContext) return

  cancelAnimationFrame(animationId)
  audioContext.close()

  audioContext = null
  analyser = null
  source = null

  useTunerStore.getState().setListening(false)
  useTunerStore.getState().setFrequency(null)
}
const loop = (time: number) => {
  if (!analyser || !audioContext) return

  animationId = requestAnimationFrame(loop)

  if (time - lastDetectionTime < DETECTION_INTERVAL) {
    return
  }

  lastDetectionTime = time

  analyser.getFloatTimeDomainData(dataArray)
  const selected =
  useTunerStore.getState().selectedString

  if (filter) {

    switch (selected) {

    case 'G3':
      filter.frequency.value = 196
      break

    case 'D4':
      filter.frequency.value = 293.66
      break

    case 'A4':
      filter.frequency.value = 440
      break

    case 'E5':
      filter.frequency.value = 659.25
      break

    default:
      filter.frequency.value = 500
  }
}

  const detected = detectPitchYIN(
    dataArray,
    audioContext.sampleRate
  )

  if (detected && (detected < 100 || detected > 3500)) {
  return
}

if (detected) {

  lastSoundTime = time


  frequencyHistory.push(detected)

  if (frequencyHistory.length > 5) {
    frequencyHistory.shift()
  }


if (detected) {

  // ignora frequências inválidas
  if (detected < 100 || detected > 3500) {
    return
  }

  // primeira leitura
  if (!pendingFrequency) {

    pendingFrequency = detected
    pendingStartTime = time
  }

  const difference =
    Math.abs(detected - pendingFrequency)

  // mudança muito distante
  if (difference > 100) {

    // precisa estabilizar por 0.8s
    if (time - pendingStartTime < 800) {
      return
    }

    pendingFrequency = detected
    pendingStartTime = time
  }

  lastSoundTime = time


  frequencyHistory.push(detected)

  if (frequencyHistory.length > 3) {
    frequencyHistory.shift()
  }

  const sorted = [...frequencyHistory]
    .sort((a, b) => a - b)

  const median =
    sorted[Math.floor(sorted.length / 2)]

  let smoothed = median

  if (lastFrequency) {

    const jump =
      Math.abs(median - lastFrequency)

    // troca brusca de nota
    if (jump > 80) {

      smoothed =
        lastFrequency * 0.35 +
        median * 0.65

    // movimento médio
    } else if (jump > 15) {

      smoothed =
        lastFrequency * 0.70 +
        median * 0.30

    // micro-ajuste fino
    } else {

      smoothed =
        lastFrequency * 0.55 +
        median * 0.45
    }
  }

  lastFrequency = smoothed

  useTunerStore
    .getState()
    .setFrequency(smoothed)

} else {

  if (time - lastSoundTime > SILENCE_TIMEOUT) {

    lastFrequency = null
    frequencyHistory = []
    pendingFrequency = null

    useTunerStore
      .getState()
      .setFrequency(null)
  }
}
} else {

  if (time - lastSoundTime > SILENCE_TIMEOUT) {

    lastFrequency = null
    frequencyHistory = []

    useTunerStore.getState().setFrequency(null)
  }

}
}
