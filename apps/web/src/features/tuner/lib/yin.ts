export function detectPitchYIN(
  buffer: Float32Array,
  sampleRate: number
): number | null {

  // Remove DC offset
  let mean = 0

  for (let i = 0; i < buffer.length; i++) {
    mean += buffer[i]
  }

  mean /= buffer.length

  const normalized = new Float32Array(buffer.length)

  for (let i = 0; i < buffer.length; i++) {
    normalized[i] = buffer[i] - mean
  }

  const threshold = 0.1
  const tauMax = Math.floor(normalized.length / 2)

  const yin = new Float32Array(tauMax)

  // Difference function
  for (let tau = 1; tau < tauMax; tau++) {

    let sum = 0

    for (let i = 0; i < tauMax; i++) {

      const delta =
        normalized[i] - normalized[i + tau]

      sum += delta * delta
    }

    yin[tau] = sum
  }

  // Cumulative mean normalized difference
  yin[0] = 1

  let runningSum = 0

  for (let tau = 1; tau < tauMax; tau++) {

    runningSum += yin[tau]

    yin[tau] *= tau / runningSum
  }

  // Absolute threshold
  let tauEstimate = -1

  for (let tau = 2; tau < tauMax; tau++) {

    if (yin[tau] < threshold) {

      while (
        tau + 1 < tauMax &&
        yin[tau + 1] < yin[tau]
      ) {
        tau++
      }

      tauEstimate = tau
      break
    }
  }

  if (tauEstimate === -1) {
    return null
  }

  // Parabolic interpolation
  const x0 =
    tauEstimate > 0
      ? tauEstimate - 1
      : tauEstimate

  const x2 =
    tauEstimate < tauMax - 1
      ? tauEstimate + 1
      : tauEstimate

  let betterTau = tauEstimate

  if (
    x0 !== tauEstimate &&
    x2 !== tauEstimate
  ) {

    const s0 = yin[x0]
    const s1 = yin[tauEstimate]
    const s2 = yin[x2]

    betterTau =
      tauEstimate +
      (s2 - s0) /
      (2 * (2 * s1 - s2 - s0))
  }

  if (!betterTau || betterTau <= 0) {
    return null
  }

  return sampleRate / betterTau
}