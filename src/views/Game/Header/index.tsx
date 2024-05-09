import SvgIcon from '@/components/SvgIcon/Index'

import Style from './style.module.scss'

export interface GameHeaderProps {
  Leading?: React.ReactNode
  Title?: React.ReactNode | string
  Action?: React.ReactNode
}
const Header = ({ ...props }: GameHeaderProps) => {
  return (
    <div className={Style.AppHeader}>
      <div className={Style.AppLeading}>{props.Leading}</div>
      <div className={Style.AppName}>{props.Title}</div>
      <div className={Style.AppAction}>{props.Action}</div>
    </div>
  )
}
export default Header

//<div className={Style.icon} onClick={handlerChangeTheme}>
//<SvgIcon name="setting" color="#FFF" className="button-style" />
//</div>
