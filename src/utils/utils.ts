import { iGameData } from '@/views/Game/levels'

export const randomNum = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

export interface BoxsData {
  name: number
  className: string
  description1: string
  description2: string
}

export const genBoxs = (descriptions: string[][]) => {
  const _tempArr: Array<BoxsData> = []
  for (let index = 0; index < descriptions.length; index++) {
    let className = 'round '
    switch (index) {
      case 1:
        className += 'lt lb'
        break
      case 7:
      case 21:
        className += 'lt'
        break
      case 8:
      case 22:
        className += 'lb'
        break
      case 14:
        className += 'rt'
        break
      case 15:
        className += 'rb'
        break
      case 27:
        className += 'rt rb'
        break
      case 28:
      case 29:
      case 30:
      case 31:
        className += 'lb rb'
        break
      case 32:
      case 33:
      case 34:
      case 35:
      case 36:
        className += 'lb lt'
        break
      case 37:
      case 38:
      case 39:
        className += 'rt lt'
        break
      case 0:
        className += 'lt lb rt rb'
        break
      default:
        break
    }
    _tempArr.push({
      name: index,
      className,
      description1: descriptions[index][0],
      description2: descriptions[index][1],
    })
  }
  return [
    _tempArr.slice(1, 8),
    _tempArr.slice(8, 15),
    _tempArr.slice(15, 22),
    _tempArr.slice(22, 28),
    _tempArr.slice(28, 32),
    _tempArr.slice(32, 37),
    [_tempArr[0], ..._tempArr.slice(37, 40)],
  ]
}

export const getBoxDescriptionByIndex = (data: iGameData, index: number) => {
  let ret = ['', '']
  for (const innerArray of data.boxs || []) {
    const item = innerArray.find((item) => item.name === index)
    ret = [item?.description1 || '', item?.description2 || '']
    if (item?.description1 || item?.description2) {
      break // 如果找到符合条件的对象，跳出循环
    }
  }
  return ret
}

export const setDocTile = (title: string) => {
  document.title = title
}
