import { BoxsData, genBoxs } from '@/utils/utils'
import Level1 from './level1.json'
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
]

export default data
