import Style from './style.module.scss'
export default function Footer() {
  return (
    <div className={Style.AppHeader}>
      <div className={Style.AppLeading}></div>
      <div className={Style.AppName}>copyright@nobody 2024</div>
      <div className={Style.AppAction}></div>
    </div>
  )
}
