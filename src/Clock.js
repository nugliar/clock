import { useState, useRef } from 'react'

import { Settings } from './Settings'
import { Timer } from './Timer'

import alarmSound from './audio/classic-short-alarm.wav'

// The 25+5 clock on freecodecamp.org sets timer to
// period which in fact 1 second longer than it is supposed to be.
// The reason is that the timer freezes for extra second at
// zero, instead of switching to next session immediately.
// Because of that, for this project, the length value stored
// in state is actually 1 second bigger. This allows making
// setTimeout callback logic simpler, since there is no need to
// implement 1 second break. The displayed timer value is 1 second less
// than actual elapsed time value

const DEFAULT_LENGTH = {
  break: 5 * 60 + 1, // seconds
  session: 25 * 60 + 1 // seconds
}

export const Clock = () => {
  const [ length, setLength ] = useState(DEFAULT_LENGTH)
  const [ timer, setTimer ] = useState({
    start: undefined,
    before: undefined,
    mode: 'session',
    active: false,
    id: undefined
  })
  const [ elapsedTime, setElapsedTime ] = useState(
    length[timer.mode] * 1000 // milliseconds
  )
  const alarmSet = useRef(true)

  const setTimerLength = (mode, newLength) => {
    newLength = Math.min(60 * 60 + 1, Math.max(1 * 60 + 1, newLength))

    if (!timer.active) {
      setLength({
        ...length,
        [mode]: newLength
      })
      if (timer.mode === mode) {
        setTimer({
          ...timer,
          start: undefined,
          before: undefined,
          id: undefined
        })
        setElapsedTime(newLength * 1000)
        alarmSet.current = true
      }
    }
  }

  const onIncrementClick = (mode) => {
    setTimerLength(mode, length[mode] + 1 * 60)
  }

  const onDecrementClick = (mode) => {
    setTimerLength(mode, length[mode] - 1 * 60)
  }

  const startTimer = () => {
    const audioElement = document.getElementById('beep')

    if (!timer.active) {
      let start = Date.now()
      let ahead = timer.before - timer.start || 0
      let mode = timer.mode
      let msec = elapsedTime - ahead

      function timeout() {
        let id = undefined
        let delay = 0

        msec = msec - (Date.now() - start)

        if (msec <= 0) {
          msec = length[mode] * 1000
          alarmSet.current = true

        } else if (alarmSet.current && msec <= 1000) {
          mode = mode === 'session' ? 'break' : 'session'
          audioElement.currentTime = 0
          audioElement.play()
          alarmSet.current = false
        }

        setElapsedTime(msec)

        // Adjust delay by function runtime.
        // Add 2000ms to msec value to avoid negative values.
        delay = (msec % 1000) ? (1000 - (msec + 1000) % 1000) : (0)

        start = Date.now()
        id = setTimeout(timeout, 1000 - delay)

        setTimer({
          start: start,
          before: undefined,
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
    const audioElement = document.getElementById('beep')

    audioElement.pause()
    audioElement.currentTime = 0
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
        breakLength={length.break - 1} // displayed value is 1 sec less
        sessionLength={length.session - 1} // displayed value is 1 sec less
        onIncrementClick={onIncrementClick}
        onDecrementClick={onDecrementClick}
      />
      <Timer
        active={timer.active}
        mode={timer.mode}
        onStart={startTimer}
        onReset={resetTimer}
        elapsedTime={elapsedTime - 1000} // displayed value is 1 sec less
      />
      <audio id='beep' src={alarmSound}></audio>
    </>
  )
}
