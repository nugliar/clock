export const Button = (props) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
    >
      <p>{props.label}</p>
    </button>
  )
}
