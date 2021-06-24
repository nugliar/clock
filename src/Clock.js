import { useState } from 'react'

import { Settings } from './Settings'
import { Timer } from './Timer'

const DEFAULT_LENGTH = {
  break: 5,
  session: 7
}

export const Clock = () => {
  const [ length, setLength ] = useState(DEFAULT_LENGTH)
  const [ timer, setTimer ] = useState({
    mode: 'session',
    active: false,
    id: undefined
  })
  const [ elapsedTime, setElapsedTime ] = useState(
    length[timer.mode] * 1000
  )

  const onIncrementClick = (mode) => {
    if (!timer.active) {
      setLength({
        ...length,
        [mode]: length[mode] + 1
      })
      if (timer.mode === mode) {
        setElapsedTime((length[mode] + 1) * 1000)
      }
    }
  }

  const onDecrementClick = (mode) => {
    if (!timer.active) {
      setLength({
        ...length,
        [mode]: length[mode] - 1
      })
      if (timer.mode === mode) {
        setElapsedTime((length[mode] - 1) * 1000)
      }
    }
  }

  const startTimer = () => {
    if (!timer.active) {
      let start = Date.now()
      let delay = elapsedTime % 1000
      let mode = timer.mode
      let msec = elapsedTime


      function timeout() {
        const id = setTimeout(timeout, delay)
        delay = 1000

        if (msec < 0) {
          start = Date.now()
          mode = mode === 'session' ? 'break' : 'session'
          msec = length[mode] * 1000
        } else {
          msec = elapsedTime - (Date.now() - start)
        }

        setTimer({
          active: true,
          mode: mode,
          id: id,
        })

        setElapsedTime(msec)
      }

      timeout()
    }
  }

  const pauseTimer = () => {
    if (timer.active) {
      clearTimeout(timer.id)
      setTimer({
        ...timer,
        active: false,
        id: undefined
      })
    }
  }

  const resetTimer = () => {
    clearTimeout(timer.id)
    setLength(DEFAULT_LENGTH)
    setTimer({
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
        mode={timer.mode}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        elapsedTime={elapsedTime}
      />
    </>
  )
}
