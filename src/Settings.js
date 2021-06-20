import { useState } from 'react'
import { Button } from './Button'
import { Length } from './Length'

export const Settings = () => {
  const [ length, setLength ] = useState({
    break: 5,
    session: 25
  })

  return (
    <div className='settings'>
      <div className='settings-section'>
        <div className='settings-label'>
          <h3 id='break-label'>Break Length</h3>
        </div>
        <div className='settings-inputs'>
          <Button id='break-decrement' label='-'/>
          <Length id='break-length' value={length.break} />
          <Button id='break-increment' label='+'/>
        </div>
      </div>
      <div className='settings-section'>
        <div className='settings-label'>
          <h3 id='session-label'>Session Length</h3>
        </div>
        <div className='settings-inputs'>
          <Button id='session-decrement' label='-'/>
          <Length id='session-length'value={length.session} />
          <Button id='session-increment' label='+'/>
        </div>
      </div>
    </div>
  )
}
