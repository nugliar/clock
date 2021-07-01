import { useEffect } from 'react'

export const DisplayTimer = (props) => {
  let msec = props.msec >= 0 ? props.msec : 0

  const format = (msec) => {

    const secs = Math.floor(msec / 1000)
    const mins = Math.floor(secs / 60)

    const f = (number, ndigits) => {
      const display = number.toString()
      return '0'.repeat(Math.max(0, ndigits - display.length)).concat(display)
    }

    return (
      `${f(mins, 2)}:${f(secs % 60, 2)}:${f(msec % 1000, 3)}`
    )
  }

  const dummyFormat = (msec) => {
    const secs = Math.ceil(msec / 1000)
    const mins = Math.floor(secs / 60)

    const f = (number, ndigits) => {
      const display = number.toString()
      return '0'.repeat(Math.max(0, ndigits - display.length)).concat(display)
    }

    return (
      `${f(mins, 2)}:${f(secs % 60, 2)}`
    )
  }

  useEffect(() => {
    const timerElement = document.getElementById('real-time-left')
    let start = Date.now()
    let id = undefined

    const timeout = () => {
      if (msec <= 0) {
        timerElement.innerHTML = format(0)
        return
      }
      if (props.active) {
        msec -= Date.now() - start
        timerElement.innerHTML = format(msec)
        id = setTimeout(timeout, 1)
        start = Date.now()
      } else {
        clearTimeout(id)
      }
    }
    timeout()
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
