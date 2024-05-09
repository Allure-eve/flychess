import './flychess.css'
import PageStyle from './index.module.scss'
import PopupStyle from '@/assets/styles/popup.module.scss'
import { CloseOutline } from 'antd-mobile-icons'
import { CenterPopup, Popup, Toast } from 'antd-mobile'

import Bubble from '@/components/Bubble/index.tsx'
import SvgIcon from '@/components/SvgIcon/Index'
import { BoxsData, getBoxDescriptionByIndex, randomNum } from '@/utils/utils'
import { ChessBox, ChessRow, ChessArrow, Player, PersonData, getStepPosition } from './components.tsx'
import GameData, { iGameData } from './levels/index.ts'
import Header from './Header/index.tsx'
import HeaderStyle from './Header/style.module.scss'
import ModeListComp from './ModeList'
import type { ToastHandler } from 'antd-mobile/es/components/toast'

const Game = () => {
  const [isStepping, setIsStepping] = useState<boolean>(false)
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentPerson, setCurrentPerson] = useState<number>(1)
  const [boxData, setBoxData] = useState<iGameData>({})
  const [description, setDescription] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [levelsVisible, setLevelsVisible] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [playersData, setPlayersData] = useState<{ [key: number]: PersonData }>({
    1: {
      x: 0,
      y: 0,
      current: 1,
      width: 0,
      height: 0,
      img: 'nansheng',
      color: '#5792CE',
    },
    2: {
      x: 0,
      y: 0,
      current: 1,
      width: 0,
      height: 0,
      img: 'nvsheng',
      color: '#EB6990',
    },
  })

  const playersDataRef = useRef(playersData)

  const updatePlayerData = (player: number) => {
    setPlayersData((prevPlayersData) => {
      const prevPlayerData = prevPlayersData[player]
      const current = (prevPlayerData.current || 1) + 1
      const position = getStepPosition(current)
      const updatedPlayerData: PersonData = {
        ...prevPlayerData,
        x: position.x,
        y: position.y,
        current,
        width: position.width,
        height: position.height,
      }
      playersDataRef.current[player] = updatedPlayerData
      return {
        ...prevPlayersData,
        [player]: updatedPlayerData,
      }
    })
  }

  const next = () => {
    if (currentPerson === 1) {
      updatePlayerData(1)
    } else {
      updatePlayerData(2)
    }
  }

  const randomStep = async () => {
    if (isStepping || isRolling) return
    setIsRolling(true)
    setIsStepping(true)
    let step = randomNum(1, 6)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsRolling(false)
    setCurrentStep(step)
    const intervalHandler = setInterval(() => {
      if (step > 0) {
        next()
        step--
      } else {
        clearInterval(intervalHandler)
        setCurrentPerson((prevPerson) => {
          setIsStepping(false)
          handlerShowPopup()
          return prevPerson === 1 ? 2 : 1
        })
      }
    }, 1000)
  }

  const handlerForceChangePerson = (person: number) => {
    if (isStepping || isRolling) return
    setCurrentPerson(person)
  }

  useEffect(() => {
    console.log('boxData=>', boxData)
    setPlayersData((prevPlayersData) => {
      const updatedPlayersData: { [key: number]: PersonData } = {}
      for (const player in prevPlayersData) {
        const position = getStepPosition(prevPlayersData[player].current)
        updatedPlayersData[player] = {
          ...prevPlayersData[player],
          x: position.x,
          y: position.y,
          current: 1,
          width: position.width,
          height: position.height,
        }
      }
      playersDataRef.current = updatedPlayersData
      return updatedPlayersData
    })
  }, [boxData])

  useEffect(() => {
    if (location.state == null) {
      navigate('/', { replace: true })
      console.log('无参数进入页面 返回首页')
    }
  }, [])
  useEffect(() => {
    if (location.state != null) {
      const toast = Toast.show({
        content: '棋盘初始化中',
        duration: 0,
        icon: 'loading',
        maskClickable: false,
      })
      console.log('有参数进入页面，State:', location.state)
      setBoxData(location.state)
      setLevelsVisible(false)
      setTimeout(() => {
        toast.close()
      }, 1500)
    }
    // 在状态改变时执行其他操作
  }, [location.state])

  const handlerShowPopup = () => {
    const currentPlayer = currentPerson === 1 ? playersDataRef.current[1] : playersDataRef.current[2]
    console.log('currentPlayer.current', currentPlayer.current)
    const description: string = getBoxDescriptionByIndex(boxData, currentPlayer.current || 1)[currentPerson - 1]
    setDescription(description)
    setVisible(true)
  }
  const hanlderPreviewDesciption = (line: BoxsData) => {
    const _description = currentPerson == 1 ? line.description1 : line.description2
    setDescription(_description)
    setVisible(true)
  }

  return (
    <div className={`${PageStyle.Page} page-container`}>
      <Header
        Leading={
          <div
            className={HeaderStyle.icon}
            onClick={() => {
              navigate(-1)
            }}
          >
            <SvgIcon name="back" color="#FFF" className="button-style" />
          </div>
        }
        Title={boxData?.name || '基础模式'}
        Action={
          <div
            className={HeaderStyle.icon}
            onClick={() => {
              setLevelsVisible(true)
            }}
          >
            <SvgIcon name="menu" color="#FFF" className="button-style" />
          </div>
        }
      />
      <Player data={playersData[2]} />
      <Player data={playersData[1]} />
      <div className={PageStyle.Bubbles}>
        <Bubble x={0} y={0} size={200} />
        <Bubble x={-20} y={-10} size={50} delay={1} />
        <Bubble x={40} y={0} size={50} delay={0.8} />
        <Bubble x={-50} y={120} size={100} delay={0.6} />
      </div>
      <CenterPopup className={PopupStyle.value} visible={visible}>
        <div className={PopupStyle.container}>
          <div className={PopupStyle.title}>任务</div>
          <div className={PopupStyle.main}>{description}</div>
          <div className={PopupStyle.close}>
            <CloseOutline
              fontSize={26}
              onClick={() => {
                setVisible(false)
              }}
            />
          </div>
        </div>
      </CenterPopup>
      <Popup
        visible={levelsVisible}
        onMaskClick={() => {
          setLevelsVisible(false)
        }}
        position="right"
        bodyStyle={{
          width: '50vw',
          color: '#fff',
          backgroundColor: 'transparent',
          backgroundImage: 'radial-gradient(transparent 1px, rgba(0, 0, 0, 0.396078431372549) 0)',
          backdropFilter: 'saturate(50%) blur(4px)',
          backgroundSize: '4px 4px',
        }}
      >
        <ModeListComp data={GameData} />
      </Popup>
      <div className={PageStyle.Game}>
        <ChessRow className="row-reverse">
          {boxData.boxs &&
            boxData.boxs[0].map((line) => {
              return (
                <ChessBox
                  className={line.className}
                  key={line.name}
                  onClick={() => {
                    hanlderPreviewDesciption(line)
                  }}
                >
                  <div className="box" id={`box-${line.name}`}>
                    <span>{line.name}</span>
                  </div>
                </ChessBox>
              )
            })}
        </ChessRow>
        <ChessArrow className="arrow-br" />
        <ChessRow>
          {boxData.boxs &&
            boxData.boxs[1].map((line) => {
              return (
                <ChessBox
                  className={line.className}
                  key={line.name}
                  onClick={() => {
                    hanlderPreviewDesciption(line)
                  }}
                >
                  <div className="box" id={`box-${line.name}`}>
                    <span>{line.name}</span>
                  </div>
                </ChessBox>
              )
            })}
        </ChessRow>
        <ChessArrow className="row-reverse arrow-bl" />
        <ChessRow className="row-reverse">
          {boxData.boxs &&
            boxData.boxs[2].map((line) => {
              return (
                <ChessBox
                  className={line.className}
                  key={line.name}
                  onClick={() => {
                    hanlderPreviewDesciption(line)
                  }}
                >
                  <div className="box" id={`box-${line.name}`}>
                    <span>{line.name}</span>
                  </div>
                </ChessBox>
              )
            })}
        </ChessRow>
        <ChessArrow className="arrow-br" />
        <ChessRow>
          {boxData.boxs &&
            boxData.boxs[3].map((line) => {
              return (
                <ChessBox
                  className={line.className}
                  key={line.name}
                  onClick={() => {
                    hanlderPreviewDesciption(line)
                  }}
                >
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
            {boxData.boxs &&
              boxData.boxs[4].map((line) => {
                return (
                  <ChessBox
                    className={line.className}
                    key={line.name}
                    onClick={() => {
                      hanlderPreviewDesciption(line)
                    }}
                  >
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
          <div className="fly-chess-board-col">
            {boxData.boxs &&
              boxData.boxs[6].map((line) => {
                if (line.name == 0) {
                  return (
                    <ChessBox
                      className={line.className}
                      key={line.name}
                      onClick={() => {
                        hanlderPreviewDesciption(line)
                      }}
                    >
                      <div className="box" id={`box-${line.name}`}>
                        <SvgIcon name="done" color="var(--UI-FC-0)" className="icon-done" />
                      </div>
                    </ChessBox>
                  )
                } else {
                  return (
                    <ChessBox
                      className={line.className}
                      key={line.name}
                      onClick={() => {
                        hanlderPreviewDesciption(line)
                      }}
                    >
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
          {boxData.boxs &&
            boxData.boxs[5].map((line) => {
              return (
                <ChessBox
                  className={line.className}
                  key={line.name}
                  onClick={() => {
                    hanlderPreviewDesciption(line)
                  }}
                >
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
    </div>
  )
}

export default Game
