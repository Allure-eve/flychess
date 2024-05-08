import { useRoutes } from 'react-router-dom'

import Game from '@/views/Game'
import Home from '@/views/Home'

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
  ])
}
