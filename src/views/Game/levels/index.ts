import { BoxsData, genBoxs } from '@/utils/utils'
import Level1 from './level1.json'
export interface iGameData {
  id?: number
  name?: string
  boxs?: BoxsData[][]
}
export default [
  {
    id: 0,
    name: '普通模式',
    boxs: genBoxs(Level1),
  },
]
