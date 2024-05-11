import { useRoutes } from 'react-router-dom'

import Game from '@/views/Game'
import Home from '@/views/Home'
import DiyConfig from '@/views/Diy'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/game',
      element: <Game />,
    },
    {
      path: '/diy',
      element: <DiyConfig />,
    },
  ])
}
