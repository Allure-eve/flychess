import { useVcosole } from '@hooks/useVconsole'
import { SetStateAction } from 'react'
import { useMediaQuery } from 'react-responsive'

import MyRoutes from '@/router'

import { useSysStore } from './store/system'
// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  const sysStore = useSysStore()
  const [vc] = useVcosole()
  useEffect(() => {
    console.log('VConsole ?', vc)
    if (vc) {
      vc.show()
    }
  }, [])
  return (
    <div className={`app-container ${sysStore.theme}`}>
      <MyRoutes />
    </div>
  )
}
