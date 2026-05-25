import { create } from 'zustand'

interface TunerState {
  frequency: number | null
  isListening: boolean
  a4: number
  selectedString: 'G3' | 'D4' | 'A4' | 'E5' | null

  setFrequency: (freq: number | null) => void
  setListening: (value: boolean) => void
  setA4: (value: number) => void
  setSelectedString: (value: 'G3' | 'D4' | 'A4' | 'E5' | null) => void
}

export const useTunerStore = create<TunerState>((set) => ({
  frequency: null,
  isListening: false,
  a4: 440,
  selectedString: null,

  setA4: (value: number) => set({ a4: value }),
  setFrequency: (freq) => set({ frequency: freq }),
  setListening: (value) => set({ isListening: value }),
  setSelectedString: (value) => set({ selectedString: value }),
}))