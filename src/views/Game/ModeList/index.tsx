import { setDocTile } from '@/utils/utils'
import './index.css'
import { iGameData } from '../levels'

export interface ModeListProps {
  data: iGameData[]
}

const Mode = ({ ...props }: iGameData) => {
  const navigate = useNavigate()
  const handlerButtonClick = (item: iGameData) => {
    console.log('handlerButtonClick', item)
    setDocTile(item?.name || '')
    navigate(`/game`, {
      replace: true,
      state: { ...props },
    })
  }
  return (
    <div
      className={`mode button-style ${props.color}`}
      onClick={() => {
        console.log('onClick', props)
        handlerButtonClick(props)
      }}
    >
      <div className="content">{props.name}</div>
      <div className="line">
        <div className="line-top"></div>
        <div className="line-right"></div>
        <div className="line-bottom"></div>
        <div className="line-left"></div>
      </div>
    </div>
  )
}
const ModeList = ({ ...props }: ModeListProps) => {
  return (
    <div className="levels-container">
      <div className="title">模式切换</div>
      <div className="mode-list">
        {props.data.map((item, index) => (
          <Mode key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
export default ModeList
