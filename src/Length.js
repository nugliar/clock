export const Length = (props) => {
  return (
    <div id={props.id} className='settings-length' >
      <p>{Math.round(props.value / 60)}</p>
    </div>
  )
}
