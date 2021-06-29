import { useEffect } from 'react'

export const DisplayTimer = (props) => {
  let msec = props.alarmBreak ? 0 : props.msec

  const format = (msec) => {
    const secs = Math.floor(msec / 1000)
    const mins = Math.floor(secs / 60)

    const f = (number, ndigits) => {
      const display = number.toString()
      return '0'.repeat(Math.max(0, ndigits - display.length)).concat(display)
    }

    return (
      `${f(mins % 60, 2)}:${f(secs % 60, 2)}:${f(msec % 1000, 3)}`
    )
  }

  const dummyFormat = (msec) => {
    const secs = Math.round(msec / 1000)
    const mins = Math.floor(secs / 60)

    const f = (number, ndigits) => {
      const display = number.toString()
      return '0'.repeat(Math.max(0, ndigits - display.length)).concat(display)
    }

    return (
      `${f(mins % 60, 2)}:${f(secs % 60, 2)}`
    )
  }

  useEffect(() => {
    const timerElement = document.getElementById('real-time-left')
    let start = Date.now()
    let id = undefined

    const timeout = () => {
      if (props.active) {
        msec -= Date.now() - start
        timerElement.innerHTML = format(msec)
        id = setTimeout(timeout, 1)
        start = Date.now()
      } else {
        clearTimeout(id)
      }
    }

    if (msec > 0) {
      timeout()
    }
    return () => clearTimeout(id)
  })

  return (
    <>
      <div className='timer-display'>
        <p id='real-time-left'>{format(msec)}</p>
      </div>
      <div className='fake-timer-display'>
        <p id='time-left'>{dummyFormat(msec)}</p>
      </div>
    </>
  )
}
