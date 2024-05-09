import dockerLogo from '@assets/Docker.svg'
import { button } from '@assets/motion'
import reactLogo from '@assets/react.svg'
import { useUserStore } from '@store/user'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import Footer from '@/components/Footer/Index'
import Header from '@/components/Header/Index'
import { Snow } from '@/components/Snow/sonw'
import GameData, { iGameData } from '@/views/Game/levels/index'
import HomeStyle from './index.module.scss'

const MenuItem = ({ item }: { item: iGameData }) => {
  const navigate = useNavigate()
  const handlerButtonClick = (item: iGameData) => {
    navigate(`/game`, { state: { ...item } })
  }
  return (
    <div
      className={`${HomeStyle.HomeMenuItem} button-style`}
      onClick={() => {
        handlerButtonClick(item)
      }}
    >
      {item.name}
    </div>
  )
}

const Home = () => {
  const rootRef = useRef(null)
  useEffect(() => {
    new Snow(rootRef.current as unknown as Element, 'snow.svg')
  }, [])

  return (
    <div className="page-container" ref={rootRef}>
      <Header />
      <div className={HomeStyle.Menus}>
        {GameData.map((item) => (
          <MenuItem item={item} key={item.name} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
