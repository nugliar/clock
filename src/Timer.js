import { Button } from './Button'
import { DisplayTimer } from './DisplayTimer'

export const Timer = (props) => {
  return (
    <div className='timer'>
      <h2 id='timer-label'>{props.mode}</h2>
      <DisplayTimer msec={props.elapsedTime} />
      <div className='timer-controls'>
        <Button label='Start' onClick={props.onStart} />
        <Button label='Pause' onClick={props.onPause} />
        <Button label='Reset' onClick={props.onReset} />
      </div>
    </div>
  )
}
