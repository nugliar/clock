export const DisplayTimer = (props) => {
  const msec = props.msec
  const seconds = Math.round(msec / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const f = (number) => {
    const numberDisplay = number.toString().slice(0, 2)
    return '0'.repeat(2 - numberDisplay.length).concat(numberDisplay)
  }

  return (
    <p className='timer-display'>
      {`${f(hours)}:${f(minutes % 60)}:${f(seconds % 60)}`}
    </p>
  )
}
