const Input = (props) => {
  return (
    <input  {...props} className={`bg-transparent focus:outline-none w-full text-sm ${props.className}`} />
  )
}

export default Input