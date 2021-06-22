import { useDispatch, useSelector } from 'react-redux'

import {
  incrementLength,
  decrementLength,
  selectTimer,
} from './timerSlice'

import { Button } from './Button'
import { Length } from './Length'

export const Settings = () => {
  const timer = useSelector(selectTimer)

  const dispatch = useDispatch()

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
            onClick={() => dispatch(decrementLength('break'))}
          />
          <Length id='break-length' value={timer.length.break} />
          <Button
            id='break-increment'
            label='+'
            onClick={() => dispatch(incrementLength('break'))}
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
            onClick={() => dispatch(decrementLength('session'))}
          />
          <Length id='session-length'value={timer.length.session} />
          <Button
            id='session-increment'
            label='+'
            onClick={() => dispatch(incrementLength('session'))}
          />
        </div>
      </div>
    </div>
  )
}
