export class Snow {
  canvas!: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D | null
  width: number = 0
  height: number = 0
  image!: HTMLImageElement
  imageSrc: string = ''
  snowflakes: Snowflake[] = []
  // 雪花数量
  snowflakeCount: number = 99

  // 最小和最大速度
  minSpeed: number = 1
  maxSpeed: number = 3

  dpr: number = 2

  constructor(dom: Element, image: string) {
    this.width = dom.clientWidth
    this.height = dom.clientHeight
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width * this.dpr
    this.canvas.height = this.height * this.dpr
    this.canvas.style.position = 'absolute'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.userSelect = 'none'
    this.canvas.style.zIndex = '1'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`

    this.canvas.id = `__${new Date().getTime() / 1000}_snow_flakes`
    this.ctx = this.canvas.getContext('2d')
    dom.append(this.canvas)
    this.imageSrc = image
    this.init()
    window.addEventListener('resize', () => {
      this.canvas.width = dom.clientWidth
      this.canvas.height = dom.clientHeight
      this.initSnowflakes()
    })
  }
  async init(): Promise<void> {
    this.image = await this.loadImage(this.imageSrc)
    this.initSnowflakes()
    this.animate()
  }
  drawSnowflakes(): void {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.snowflakes.forEach((snowflake: Snowflake) => snowflake.draw(this.ctx, this.image))
  }
  updateSnowflakes(): void {
    this.snowflakes.forEach((snowflake: Snowflake) => snowflake.update(this.canvas))
  }
  initSnowflakes(): void {
    this.snowflakes = []
    for (let i = 0; i < this.snowflakeCount; i++) {
      const x: number = Math.random() * this.canvas.width
      const y: number = Math.random() * this.canvas.height
      const speed: number = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed
      this.snowflakes.push(new Snowflake(x, y, speed))
    }
  }
  animate(): void {
    this.drawSnowflakes()
    this.updateSnowflakes()
    requestAnimationFrame(this.animate.bind(this))
  }
  private async loadImage(src: string): Promise<HTMLImageElement> {
    const image: HTMLImageElement = new Image()
    const onload = () =>
      new Promise<HTMLImageElement>((resolve) => {
        image.src = src
        image.onload = () => {
          resolve(image)
        }
      })
    return await onload()
  }
}
// 创建雪花对象
class Snowflake {
  x: number
  y: number
  speed: number
  size: number
  depth: number
  direction: number

  constructor(x: number, y: number, speed: number) {
    this.x = x
    this.y = y
    this.speed = speed
    this.size = getRandomInt(50, 60) // 雪花大小随机 // Math.random() * (50 - 30) + 30
    this.depth = getRandomInt(1, 3) // 深度随机
    this.direction = Math.random() > 0.5 ? 1 : 0
  }

  // 更新雪花位置
  update(canvas: HTMLCanvasElement): void {
    this.direction == 0 ? (this.x += this.speed / 5) : (this.x -= this.speed / 5)
    this.y += this.speed * this.depth
    if (this.y > canvas.height) {
      this.y = 0
      this.x = Math.random() * canvas.width
      this.direction = Math.random() > 0.5 ? 1 : 0
    }
  }

  // 绘制雪花
  draw(ctx: CanvasRenderingContext2D | null, image: HTMLImageElement): void {
    if (!ctx) return
    const scaleFactor: number = 1 / this.depth // 根据深度缩放雪花大小
    ctx.drawImage(image, this.x, this.y, this.size * scaleFactor, this.size * scaleFactor)
  }
}

const getRandomInt = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}
