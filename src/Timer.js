import { useState } from 'react'
import { Button } from './Button'

export const Timer = () => {
  const [ timer, setTimer ] = useState({
    start: undefined,
    pause: undefined,
    id: undefined,
    active: false
  })
  const [ time, setTime ] = useState(undefined)

  const startTimer = () => {
    if (!timer.active) {
      const start = timer.start + (Date.now() - timer.pause) || Date.now()

      setTimeout(
        () => {
          setTime(Date.now())
          clearInterval(timer.id)
          const id = setInterval(() => setTime(Date.now()), 1000)
          setTimer({...timer, start: start, id: id, active: true})
        },
        1000 - (timer.pause - timer.start % 1000) || 0
      )
    }
  }

  const pauseTimer = () => {
    if (timer.active) {
      clearInterval(timer.id)
      setTimer({
        ...timer,
        pause: Date.now(),
        id: undefined,
        active: false
      })
    }
  }

  const resetTimer = () => {
    clearInterval(timer.id)
    setTimer({
      start: undefined,
      pause: undefined,
      id: undefined,
      active: false
    })
  }

  const DisplayTime = () => {
    const msec = time - timer.start || 0
    const seconds = Math.round(msec / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const f = (number) => {
      const numberDisplay = number.toString().slice(0, 2)
      return '0'.repeat(2 - numberDisplay.length).concat(numberDisplay)
    }

    return (
      <p className='timer-display'>
        {`${f(hours % 24)}:${f(minutes % 60)}:${f(seconds % 60)}`}
      </p>
    )
  }

  return (
    <div className='timer'>
      <h2 id='timer-label'>Session</h2>
      <DisplayTime />
      <div className='timer-controls'>
        <Button label='Start' onClick={startTimer} />
        <Button label='Pause' onClick={pauseTimer} />
        <Button label='Reset' onClick={resetTimer} />
      </div>
    </div>
  )
}
