import SvgIcon from '@/components/SvgIcon/Index'
import Header from './Header'
import HeaderStyle from './Header/style.module.scss'
import Sysconfig from '@/constants'
import DiyConfigStyle from './index.module.scss'
import { Toast } from 'antd-mobile'
import { genBoxs } from '@/utils/utils'

const DiyConfig = () => {
  const [config, setConfig] = useState([['', '']])
  const [currentPerson, SetCurrentPerson] = useState<number>(0)

  const handleSaveConfig = () => {
    localStorage.setItem(Sysconfig.DIY_CONFIG_KEY, JSON.stringify(config))
    Toast.show('保存成功'!)
  }
  const navigate = useNavigate()
  useEffect(() => {
    const DIY_CONFIG = JSON.parse(localStorage.getItem(Sysconfig.DIY_CONFIG_KEY) || '[]')
    const emptyArray = new Array(40).fill(['男生自定义任务', '女生自定义任务'])
    if (DIY_CONFIG.length == 0) {
      setConfig(emptyArray)
    } else {
      setConfig(DIY_CONFIG)
    }
  }, [])
  const updateItem = (index: number, person: number, newValue: string) => {
    const newConfig = JSON.parse(JSON.stringify(config))
    newConfig[index][person] = newValue
    // 设置新的状态，触发重新渲染
    setConfig(newConfig)
  }
  return (
    <div className={`page-container`}>
      <Header
        Leading={
          <div
            className={HeaderStyle.icon}
            onClick={() => {
              navigate(-1)
            }}
          >
            <SvgIcon size={30} name="arrowLeft" color="#FFF" className="button-style" />
          </div>
        }
        Title={'自定义模式配置'}
        Action={
          <>
            <div className={HeaderStyle.icon} onClick={() => SetCurrentPerson(currentPerson == 1 ? 0 : 1)}>
              <SvgIcon size={20} name={currentPerson == 1 ? 'male' : 'female'} color="#FFF" className="button-style" />
            </div>
            <div className={HeaderStyle.icon} onClick={handleSaveConfig}>
              <SvgIcon size={20} name="save" color="#FFF" className="button-style" />
            </div>
          </>
        }
      />
      <div className={DiyConfigStyle.Container}>
        {config.map((item, index) => {
          return (
            <div className={DiyConfigStyle.Item} key={index}>
              <div className={DiyConfigStyle.Label}>
                {currentPerson == 0 ? '男生' : '女生'}第{index + 1}格
              </div>
              <div className={DiyConfigStyle.Input}>
                <input
                  value={item[currentPerson]}
                  type="text"
                  placeholder="请输入任务内容"
                  onChange={(event) => {
                    updateItem(index, currentPerson, event.target.value || '')
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className={DiyConfigStyle.StartButton}>
        <div
          className={`${DiyConfigStyle.button} button-style`}
          onClick={() => {
            handleSaveConfig()
            navigate('/game', {
              state: {
                ...{
                  id: 999,
                  name: '自定义模式',
                  boxs: genBoxs(config),
                  color: 'bule',
                },
              },
            })
          }}
        >
          *_^↗[GO!]
        </div>
      </div>
    </div>
  )
}

export default DiyConfig
