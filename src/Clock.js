import { useState } from 'react'

import { Settings } from './Settings'
import { Timer } from './Timer'

import alarmSound from './audio/classic-short-alarm.wav'

const DEFAULT_LENGTH = {
  break: 5,
  session: 7
}

export const Clock = () => {
  const audioElement = document.getElementById('beep')
  const [ length, setLength ] = useState(DEFAULT_LENGTH)
  const [ timer, setTimer ] = useState({
    start: undefined,
    before: undefined,
    alarmBreak: false,
    mode: 'session',
    active: false,
    id: undefined
  })
  const [ elapsedTime, setElapsedTime ] = useState(
    length[timer.mode] * 1000
  )

  const setTimerLength = (mode, newLength) => {
    newLength = Math.min(60, Math.max(1, newLength))

    if (!timer.active) {
      setLength({
        ...length,
        [mode]: newLength
      })
      if (timer.mode === mode) {
        setElapsedTime(newLength * 1000)
      }
    }
  }

  const onIncrementClick = (mode) => {
    setTimerLength(mode, length[mode] + 1)
  }

  const onDecrementClick = (mode) => {
    setTimerLength(mode, length[mode] - 1)
  }

  const startTimer = () => {
    if (!timer.active) {
      let start = Date.now()
      let ahead = timer.before - timer.start || 0
      let mode = timer.mode
      let msec = elapsedTime - ahead
      let alarmSet = false

      function timeout() {
        let id = undefined
        let delay = 0

        msec = msec - (Date.now() - start)

        if (msec <= 0 && alarmSet) {
          mode = mode === 'session' ? 'break' : 'session'
          msec = length[mode] * 1000
          alarmSet = false

        } else if (msec <= 0) {
          audioElement.currentTime = 0
          audioElement.play()
          alarmSet = true
          msec = 1000
        }

        setElapsedTime(msec)

        // Adjust delay by function runtime.
        // Add 1000ms to msec value to avoid negative values.
        delay = (msec % 1000) ? (1000 - (msec + 1000) % 1000) : (0)

        start = Date.now()
        id = setTimeout(timeout, 1000 - delay)

        setTimer({
          start: start,
          before: undefined,
          alarmBreak: alarmSet,
          active: true,
          mode: mode,
          id: id,
        })
      }
      timeout()

    } else {
      clearTimeout(timer.id)
      setTimer({
        ...timer,
        before: Date.now(),
        active: false,
        id: undefined
      })
    }
  }

  const resetTimer = () => {
    audioElement.pause()
    clearTimeout(timer.id)
    setLength(DEFAULT_LENGTH)
    setTimer({
      start: undefined,
      before: undefined,
      active: false,
      mode: 'session',
      id: undefined
    })
    setElapsedTime(DEFAULT_LENGTH.session * 1000)
  }

  return (
    <>
      <Settings
        breakLength={length.break}
        sessionLength={length.session}
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
      />
      <Timer
        active={timer.active}
        mode={timer.mode}
        alarmBreak={timer.alarmBreak}
        onStart={startTimer}
        onReset={resetTimer}
        elapsedTime={elapsedTime}
      />
      <audio id='beep' src={alarmSound}></audio>
    </>
  )
}
