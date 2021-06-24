import { Button } from './Button'
import { Length } from './Length'

export const Settings = (props) => {

  return (
    <div className='settings'>
      <div className='settings-section'>
        <div className='settings-label'>
          <h3 id='break-label'>Break Length</h3>
        </div>
        <div className='settings-inputs'>
          <Button
            id='break-decrement'
            label='-'
            onClick={() => props.onDecrementClick('break')}
          />
          <Length id='break-length' value={props.breakLength} />
          <Button
            id='break-increment'
            label='+'
            onClick={() => props.onIncrementClick('break')}
          />
        </div>
      </div>
      <div className='settings-section'>
        <div className='settings-label'>
          <h3 id='session-label'>Session Length</h3>
        </div>
        <div className='settings-inputs'>
          <Button
            id='session-decrement'
            label='-'
            onClick={() => props.onDecrementClick('session')}
          />
          <Length id='session-length' value={props.sessionLength} />
          <Button
            id='session-increment'
            label='+'
            onClick={() => props.onIncrementClick('session')}
          />
        </div>
      </div>
    </div>
  )
}
