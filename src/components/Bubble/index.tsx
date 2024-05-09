import './style.css'
export interface BubbleProps {
  x: number
  y: number
  size: number
  delay?: number
}

const Bubble = ({ ...props }: BubbleProps) => {
  const style = {
    left: props.x + 'px',
    top: props.y + 'px',
    width: props.size + 'px',
    height: props.size + 'px',
    '--size': props.size + 'px',
    '--delay': (props.delay || 0) + 's',
  }
  return (
    <div className="bubble" style={style}>
      <span className="border"></span>
      <span className="border"></span>
      <span className="border"></span>
      <span className="border"></span>
      <span className="border"></span>
    </div>
  )
}

export default Bubble
