import './flychess.css'

import { ReactNode } from 'react'

import SvgIcon from '@/components/SvgIcon/Index'
import { randomNum } from '@/utils/utils'

const ChessBox = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return <div className={`fly-chess-board-box ${className || ''}`}>{children}</div>
}

const ChessRow = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return <div className={`fly-chess-board-row ${className || ''} `}>{children}</div>
}

const ChessArrow = ({ className }: { className?: string }) => {
  return (
    <ChessRow className={`${className} arrow-space`}>
      <ChessBox>
        <div className="arrow">
          <SvgIcon name="back" color="var(--UI-FC-0)" />
        </div>
      </ChessBox>
    </ChessRow>
  )
}

const Player = ({ data }: { data: PersonData }) => {
  const styles = {
    transform: `translate(${data.x}px, ${data.y}px)`,
    width: `${data.width}px`,
    height: `${data.height}px`,
    transition: data.current == 1 ? 'none' : 'all 0.5s ease-in-out',
  }
  return (
    <div className="player" style={styles}>
      <SvgIcon name={data.img} color={data.color} />
    </div>
  )
}
const line0 = [
  { name: 1, className: 'round lt lb', description: '' },
  { name: 2, className: 'round', description: '' },
  { name: 3, className: 'round', description: '' },
  { name: 4, className: 'round', description: '' },
  { name: 5, className: 'round', description: '' },
  { name: 6, className: 'round', description: '' },
  { name: 7, className: 'round lt', description: '' },
]
const line1 = [
  { name: 8, className: 'round lb', description: '' },
  { name: 9, className: 'round', description: '' },
  { name: 10, className: 'round', description: '' },
  { name: 11, className: 'round', description: '' },
  { name: 12, className: 'round', description: '' },
  { name: 13, className: 'round', description: '' },
  { name: 14, className: 'round rt', description: '' },
]
const line2 = [
  { name: 15, className: 'round rb', description: '' },
  { name: 16, className: 'round', description: '' },
  { name: 17, className: 'round', description: '' },
  { name: 18, className: 'round', description: '' },
  { name: 19, className: 'round', description: '' },
  { name: 20, className: 'round', description: '' },
  { name: 21, className: 'round lt', description: '' },
]
const line3 = [
  { name: 22, className: 'round lb', description: '' },
  { name: 23, className: 'round', description: '' },
  { name: 24, className: 'round', description: '' },
  { name: 25, className: 'round', description: '' },
  { name: 26, className: 'round', description: '' },
  { name: 27, className: 'round rt rb', description: '' },
]
const line4 = [
  { name: 28, className: 'round lb rb', description: '' },
  { name: 29, className: 'round lb rb', description: '' },
  { name: 30, className: 'round lb rb', description: '' },
  { name: 31, className: 'round lb rb', description: '' },
]
const line5 = [
  { name: 32, className: 'round lb lt', description: '' },
  { name: 33, className: 'round lb lt', description: '' },
  { name: 34, className: 'round lb lt', description: '' },
  { name: 35, className: 'round lb lt', description: '' },
  { name: 36, className: 'round lb lt', description: '' },
]
const line6 = [
  { name: 37, className: 'round rt lt', description: '' },
  { name: 38, className: 'round rt lt', description: '' },
  { name: 39, className: 'round rt lt', description: '' },
  { name: 0, className: 'round rt lt', description: '' },
]

interface PersonData {
  x?: number
  y?: number
  width?: number
  height?: number
  current?: number
  img?: string
  color?: string
}

const Game = () => {
  const [isSteping, setIsSteping] = useState(false)
  const [isRolling, setIsRolling] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentPerson, setCurrentPerson] = useState(1)
  const [P1Data, setP1Data] = useState<PersonData>({
    x: 0,
    y: 0,
    current: 1,
    width: 0,
    height: 0,
    img: 'nansheng',
    color: '#5792CE',
  })
  const [P2Data, setP2Data] = useState<PersonData>({
    x: 0,
    y: 0,
    current: 1,
    width: 0,
    height: 0,
    img: 'nvsheng',
    color: '#EB6990',
  })

  const getStepPostion = (id: number) => {
    const elem = document.getElementById(`box-${id}`)
    return {
      x: elem?.offsetLeft || 0,
      y: elem?.offsetTop || 0,
      width: elem?.offsetWidth || 0,
      height: elem?.offsetHeight || 0,
    }
  }

  const next = () => {
    if (currentPerson == 1) {
      setP1Data((prevState) => {
        const current = (prevState?.current || 1) + 1
        const postion = getStepPostion(current)
        return {
          ...prevState,
          x: postion.x,
          y: postion.y,
          current: current,
          width: postion.width,
          height: postion.height,
        }
      })
    } else {
      setP2Data((prevState) => {
        const current = (prevState?.current || 1) + 1
        const postion = getStepPostion(current)
        return {
          ...prevState,
          x: postion.x,
          y: postion.y,
          current: current,
          width: postion.width,
          height: postion.height,
        }
      })
    }
  }

  const randomStep = async () => {
    if (isSteping || isRolling) return
    setIsRolling(true)
    setIsSteping(true)
    let step = randomNum(1, 6)
    await new Promise((resovle) => setTimeout(resovle, 3000))
    setIsRolling(false)
    setCurrentStep(step)
    const handler = setInterval(() => {
      if (step-- > 0) {
        next()
      } else {
        setCurrentPerson(() => {
          setIsSteping(false)
          clearInterval(handler)
          return currentPerson == 1 ? 2 : 1
        })
      }
    }, 1000)
  }

  const handlerForceChangePerson = (person: number) => {
    if (isSteping || isRolling) return
    setCurrentPerson(person)
  }

  useEffect(() => {
    const postion = getStepPostion(1)
    setP1Data((prev) => {
      return {
        ...prev,
        x: postion.x,
        y: postion.y,
        current: 1,
        width: postion.width,
        height: postion.height,
      }
    })
    setP2Data((prev) => {
      return {
        ...prev,
        x: postion.x,
        y: postion.y,
        current: 1,
        width: postion.width,
        height: postion.height,
      }
    })
  }, [])

  return (
    <div className="page-container">
      <Player data={P2Data} />
      <Player data={P1Data} />
      <ChessRow className="row-reverse">
        {line0.map((line) => {
          return (
            <ChessBox className={line.className} key={line.name}>
              <div className="box" id={`box-${line.name}`}>
                <span>{line.name}</span>
              </div>
            </ChessBox>
          )
        })}
      </ChessRow>
      <ChessArrow className="arrow-br" />
      <ChessRow>
        {line1.map((line) => {
          return (
            <ChessBox className={line.className} key={line.name}>
              <div className="box" id={`box-${line.name}`}>
                <span>{line.name}</span>
              </div>
            </ChessBox>
          )
        })}
      </ChessRow>
      <ChessArrow className="row-reverse arrow-bl" />
      <ChessRow className="row-reverse">
        {line2.map((line) => {
          return (
            <ChessBox className={line.className} key={line.name}>
              <div className="box" id={`box-${line.name}`}>
                <span>{line.name}</span>
              </div>
            </ChessBox>
          )
        })}
      </ChessRow>
      <ChessArrow className="arrow-br" />
      <ChessRow>
        {line3.map((line) => {
          return (
            <ChessBox className={line.className} key={line.name}>
              <div className="box" id={`box-${line.name}`}>
                <span>{line.name}</span>
              </div>
            </ChessBox>
          )
        })}
        <ChessBox className="arrow-space">
          <div className="arrow">
            <SvgIcon name="back" color="var(--UI-FC-0)" className="inline arrow-ltb" />
          </div>
        </ChessBox>
      </ChessRow>
      <ChessRow className="row-reverse">
        <div className="fly-chess-board-col">
          {line4.map((line) => {
            return (
              <ChessBox className={line.className} key={line.name}>
                <div className="box" id={`box-${line.name}`}>
                  <span>{line.name}</span>
                </div>
              </ChessBox>
            )
          })}
        </div>
        <div className="fly-chess-board-col actions">
          <div className="player-status">
            <div className={`item ${currentPerson == 1 ? 'active' : ''}`} onClick={() => handlerForceChangePerson(1)}>
              男
            </div>
            <div className={`item ${currentPerson == 2 ? 'active' : ''}`} onClick={() => handlerForceChangePerson(2)}>
              女
            </div>
          </div>
          <div className="dice-container">
            {isRolling ? (
              <img src="/changenew.gif" onClick={randomStep} />
            ) : (
              <img src={`/chess${currentStep || 1}.png`} onClick={randomStep} />
            )}
          </div>
        </div>
        <div className="fly-chess-board-col col-reverse">
          {line6.map((line) => {
            if (line.name == 0) {
              return (
                <ChessBox className={line.className} key={line.name}>
                  <div className="box" id={`box-${line.name}`}>
                    <SvgIcon name="done" color="var(--UI-FC-0)" className="icon-done" />
                  </div>
                </ChessBox>
              )
            } else {
              return (
                <ChessBox className={line.className} key={line.name}>
                  <div className="box" id={`box-${line.name}`}>
                    <span>{line.name}</span>
                  </div>
                </ChessBox>
              )
            }
          })}
        </div>
      </ChessRow>
      <ChessRow className="row-reverse">
        <ChessBox className="arrow-space">
          <div className="arrow">
            <SvgIcon name="back" color="var(--UI-FC-0)" className="inline arrow-trl" />
          </div>
        </ChessBox>
        {line5.map((line) => {
          return (
            <ChessBox className={line.className} key={line.name}>
              <div className="box" id={`box-${line.name}`}>
                <span>{line.name}</span>
              </div>
            </ChessBox>
          )
        })}
        <ChessBox className="arrow-space">
          <div className="arrow">
            <SvgIcon name="back" color="var(--UI-FC-0)" className="inline arrow-brt" />
          </div>
        </ChessBox>
      </ChessRow>
    </div>
  )
}

export default Game
