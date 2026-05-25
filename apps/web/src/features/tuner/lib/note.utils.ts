export function getNoteData(
  freq: number,
  a4: number,
  selectedString?: 'G3' | 'D4' | 'A4' | 'E5' | null
) {
  const violinStrings = [
    { name: 'G3', semitones: -14 },
    { name: 'D4', semitones: -7 },
    { name: 'A4', semitones: 0 },
    { name: 'E5', semitones: 7 },
  ]

  const adjustedStrings = violinStrings.map(string => ({
   name: string.name,
   frequency:
    a4 * Math.pow(2, string.semitones / 12)
  }))

  // 🎯 Se houver corda selecionada, usa ela
  let target = selectedString
    ? adjustedStrings.find(s => s.name === selectedString)!
    : adjustedStrings[0]

  // 🔎 Se NÃO houver corda selecionada, busca a mais próxima
  if (!selectedString) {
    let minDiff = Math.abs(freq - target.frequency)

    for (const string of adjustedStrings) {
      const diff = Math.abs(freq - string.frequency)
      if (diff < minDiff) {
        minDiff = diff
        target = string
      }
    }
  }
  

  const cents = 1200 * Math.log2(freq / target.frequency)

  // ---------- BASE CROMÁTICA ----------
  const noteNumber = 69 + 12 * Math.log2(freq / a4)
  const rounded = Math.round(noteNumber)

  const noteNames = [
    'C', 'C#', 'D', 'D#', 'E',
    'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ]

  const noteIndex = ((rounded % 12) + 12) % 12
  const prevIndex = (noteIndex + 11) % 12
  const nextIndex = (noteIndex + 1) % 12

const octave = Math.floor(rounded / 12) - 1

const chromaticName =
  `${noteNames[noteIndex]}${octave}`

const targetFrequency =
  a4 * Math.pow(2, (rounded - 69) / 12)

const chromaticCents =
  1200 * Math.log2(freq / targetFrequency)

return {
  // 🎻 Nota principal
  noteName: selectedString
    ? target.name
    : chromaticName,

  // 🎯 Frequência alvo
  targetFrequency: selectedString
    ? target.frequency
    : targetFrequency,

  // 📊 Cents
  cents: Math.round(
    selectedString
      ? cents
      : chromaticCents
  ),

  // 🎹 Cromático
  chromaticNote: noteNames[noteIndex],
  prevNote: noteNames[prevIndex],
  nextNote: noteNames[nextIndex]
}
  
}
export function getFrequencyFromA4(
  a4: number,
  semitones: number
) {
  return a4 * Math.pow(2, semitones / 12)
}