import { Button } from './Button'
import { DisplayTimer } from './DisplayTimer'

export const Timer = (props) => {
  return (
    <div className='timer'>
      <h2 id='timer-label'>{props.mode}</h2>
      <DisplayTimer
        msec={props.elapsedTime}
        active={props.active}
      />
      <div className='timer-controls'>
        <Button id='start_stop' label='Start/Stop' onClick={props.onStart} />
        <Button id='reset' label='Reset' onClick={props.onReset} />
      </div>
    </div>
  )
}
