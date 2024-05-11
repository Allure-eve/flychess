import { BoxsData, genBoxs } from '@/utils/utils'
import Level1 from './level1.json'
import Sysconfig from '@/constants'

const loadDiyBoxs = () => {
  const data: string[][] = JSON.parse(localStorage.getItem(Sysconfig.DIY_CONFIG_KEY) || '[]')
  return data
}
export interface iGameData {
  id?: number
  name?: string
  boxs?: BoxsData[][]
  color?: 'blue' | 'pink' | 'green' | 'yellow'
}
const data: iGameData[] = [
  {
    id: 0,
    name: '基础模式',
    boxs: genBoxs(Level1),
    color: 'blue',
  },
  {
    id: 1,
    name: '恋爱版',
    boxs: genBoxs(Level1),
    color: 'pink',
  },
  {
    id: 999,
    name: '自定义模式',
    boxs: genBoxs(loadDiyBoxs()),
    color: 'pink',
  },
]

export default data
