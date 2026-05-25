import './TunerView.css'

import { useTuner } from '../hooks/useTuner'
import { useTunerStore } from '../stores/tuner.store'
import { getNoteData } from '../lib/note.utils'

export function TunerView() {
  const { frequency, isListening, toggle } = useTuner()

  const {
    a4,
    setA4,
    selectedString,
    setSelectedString
  } = useTunerStore()

  const strings = ['G3', 'D4', 'A4', 'E5'] as const

  const noteData = frequency
    ? getNoteData(frequency, a4, selectedString)
    : null

  return (
    <div className="tuner-page">
      <div className="tuner-container">

        {/* HEADER */}
        <div className="tuner-header">
          <h1>Webviolin</h1>

          <p className="status">
            {isListening
              ? '🎤 Ouvindo'
              : '⏹️ Parado'}
          </p>
        </div>

        {/* CONTROLES */}
        <div className="controls">

          {/* Cordas */}
          <div className="strings">
            {strings.map(string => (
              <button
                key={string}
                onClick={() =>
                  setSelectedString(
                    selectedString === string
                      ? null
                      : string
                  )
                }
                className={
                  selectedString === string
                    ? 'string-button active'
                    : 'string-button'
                }
              >
                {string}
              </button>
            ))}
          </div>

          {/* Iniciar */}
          <button
            onClick={toggle}
            className={
              isListening
                ? 'listen-button stop'
                : 'listen-button start'
            }
          >
            {isListening ? 'Parar' : 'Iniciar'}
          </button>

          {/* A4 */}
          <div className="a4-control">
            <label>A4</label>

            <input
              type="range"
              min={415}
              max={445}
              value={a4}
              onChange={(e) =>
                setA4(Number(e.target.value))
              }
            />

            <span>{a4} Hz</span>
          </div>
        </div>

        {/* AFINADOR */}
        <div className="tuner-panel">

          {/* frequência */}
          <div className="frequency">
            {frequency
              ? `${frequency.toFixed(2)} Hz`
              : '--'}
          </div>

          {noteData && (
            <>
              {/* alvo */}
              <div className="target-frequency">
                {noteData.targetFrequency?.toFixed(2)} Hz
              </div>

              {/* nota */}
              <div className="main-note">
                {noteData.noteName}
              </div>

              {/* barra */}
              <div className="cents-bar">

                <div className="center-line" />

                <div
                  className="cents-indicator"
                  style={{
                    left: `calc(50% + ${
                      Math.max(
                        Math.min(noteData.cents, 50),
                        -50
                      ) * 4
                    }px)`
                  }}
                />
              </div>

              {/* cents */}
              <div
                className={
                  Math.abs(noteData.cents) <= 5
                    ? 'cents perfect'
                    : 'cents'
                }
              >
                {noteData.cents > 0 ? '+' : ''}
                {noteData.cents} cents
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}