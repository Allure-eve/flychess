import dockerLogo from '@assets/Docker.svg'
import { button } from '@assets/motion'
import reactLogo from '@assets/react.svg'
import { useUserStore } from '@store/user'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer/Index'
import Header from '@/components/Header/Index'
import { Snow } from '@/components/Snow/sonw'

import HomeStyle from './index.module.scss'

type Menu = {
  name: string
  data: object
}

const MenuItem = ({ menu }: { menu: Menu }) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/game`)
  }
  return (
    <div className={`${HomeStyle.HomeMenuItem} button-style`} onClick={onClick}>
      {menu.name}
    </div>
  )
}

const Home = () => {
  const rootRef = useRef(null)
  useEffect(() => {
    new Snow(rootRef.current as unknown as Element, 'snow.svg')
  }, [])

  const meuns: Menu[] = [{ name: '基础模式', data: {} }]
  return (
    <div className="page-container" ref={rootRef}>
      <Header />
      <div className={HomeStyle.Menus}>
        {meuns.map((menu) => (
          <MenuItem menu={menu} key={menu.name} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
