import { startAudio, stopAudio } from '../services/audio.service'
import { useTunerStore } from '../stores/tuner.store'

export const useTuner = () => {
  const { frequency, isListening } = useTunerStore()

  const toggle = () => {
    if (isListening) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  return {
    frequency,
    isListening,
    toggle,
  }
}