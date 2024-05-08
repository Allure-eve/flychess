import SvgIcon from '@/components/SvgIcon/Index'

import Style from './style.module.scss'

export default function Header() {
  const sysStore = useSysStore()
  const handlerChangeTheme = () => {
    const nextTheme = sysStore.theme == Theme.DARK ? Theme.LIGHT : Theme.DARK
    sysStore.handleThemeChange(nextTheme)
  }
  return (
    <div className={Style.AppHeader}>
      <div className={Style.AppLeading}></div>
      <div className={Style.AppName}></div>
      <div className={Style.AppAction}>
        <div className={Style.icon} onClick={handlerChangeTheme}>
          <SvgIcon name="setting" color="#FFF" className="button-style" />
        </div>
      </div>
    </div>
  )
}
