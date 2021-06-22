import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectTimer, resetTimer } from './timerSlice'
import { Button } from './Button'
import { DisplayTimer } from './DisplayTimer'

export const Timer = () => {
  const timer = useSelector(selectTimer)
  const [ status, setStatus ] = useState({
    active: false,
    mode: 'session',
    id: undefined
  })
  const [ elapsedTime, setElapsedTime ] = useState(timer.length[status.mode] * 1000)
  const [ startTime, setStartTime ] = useState(undefined)

  const dispatch = useDispatch()

  const startTimer = () => {
    if (!status.active) {
      let start = startTime || Date.now()
      let delay = 1000 - ((Date.now() - startTime) % 1000)
      let mode = status.mode
      let msec = timer.length[mode] * 1000


      function timeout() {
        const id = setTimeout(timeout, delay)
        delay = 1000

        if (msec < 0) {
          start = Date.now()
          mode = mode === 'session' ? 'break' : 'session'
          msec = timer.length[mode] * 1000
        } else {
          msec = timer.length[mode] * 1000 - (Date.now() - start)
        }

        setStatus({
          active: true,
          mode: mode,
          id: id,
        })

        setElapsedTime(msec)
        setStartTime(start)
      }

      timeout()
    }
  }

  const pauseTimer = () => {
    if (status.active) {
      clearTimeout(status.id)
      setStatus({
        active: false,
        id: undefined
      })
    }
  }

  const initTimer = () => {
    clearTimeout(status.id)
    dispatch(resetTimer())
    setStatus({
      active: false,
      mode: 'session',
      id: undefined
    })
    setElapsedTime(timer.length['session'] * 1000)
    setStartTime(undefined)
  }

  return (
    <div className='timer'>
      <h2 id='timer-label'>{timer.mode}</h2>
      <DisplayTimer msec={elapsedTime} />
      <div className='timer-controls'>
        <Button label='Start' onClick={startTimer} />
        <Button label='Pause' onClick={pauseTimer} />
        <Button label='Reset' onClick={initTimer} />
      </div>
    </div>
  )
}
