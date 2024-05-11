import { Toast } from 'antd-mobile'

export class LanChat {
  private peerConnection: RTCPeerConnection
  private dataChannel: RTCDataChannel | null
  private chatLog: string
  private sessionId: string

  constructor(sessionId: string) {
    this.peerConnection = new RTCPeerConnection()
    this.dataChannel = null
    this.chatLog = ''
    this.sessionId = sessionId

    this.setupDataChannel()

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // 存储ICE候选到LocalStorage
        console.log('ICE candidate:', this.sessionId, event.candidate)
        if (this.getIceCandidateFromStorage(this.sessionId) === null) {
          this.storeIceCandidate(event.candidate)
          console.log('ICE candidated')
        }
      }
    }
    this.peerConnection.ondatachannel = (event: RTCDataChannelEvent) => {
      const channel = event.channel
      channel.onopen = function (event) {
        Toast.show({
          content: '同步连接成功！',
          duration: 1000,
          maskClickable: false,
        })
      }
      channel.onmessage = function (event) {
        Toast.show({
          content: `收到消息${event.data}`,
          duration: 1000,
          maskClickable: false,
        })
        console.log('onDataChannel: ', event)
      }
    }
  }

  private async setupDataChannel() {
    this.dataChannel = this.peerConnection.createDataChannel('chat')
    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)
    this.storeOffer(offer)

    if (this.dataChannel) {
      this.dataChannel.onopen = () => console.log('Data channel is open')
      this.dataChannel.onerror = (error) => console.log('Data channel error:', error)
      this.dataChannel.onclosing = () => console.log('Data channel is closing')
      this.dataChannel.onclose = () => console.log('Data channel is closed')
      this.dataChannel.onmessage = (event) => {
        this.chatLog += 'Other: ' + event.data + '\n'
        Toast.show({
          content: `onMessage收到消息${event.data}`,
          duration: 1000,
          maskClickable: false,
        })
        console.log('onMessage: ', event)
      }
    }
  }

  public async sendMessage(message: string) {
    if (this.dataChannel) {
      this.dataChannel.send(message)
      this.chatLog += 'Me: ' + message + '\n'
    }
  }

  private storeIceCandidate(candidate: RTCIceCandidate) {
    // 存储ICE候选到LocalStorage
    localStorage.setItem(`${this.sessionId}_iceCandidate`, JSON.stringify(candidate))
  }

  private getIceCandidateFromStorage(sessionId: string): RTCIceCandidate | null {
    // 从LocalStorage获取ICE候选
    const storedCandidate = localStorage.getItem(`${sessionId}_iceCandidate`)
    return storedCandidate ? JSON.parse(storedCandidate) : null
  }

  private storeAnswer(answer: RTCSessionDescriptionInit, sessionId: string) {
    // 存储Answer到LocalStorage
    localStorage.setItem(`${sessionId}_answer`, JSON.stringify(answer))
  }

  private getAnswerFromStorage(sessionId: string): RTCSessionDescriptionInit | null {
    // 从LocalStorage获取Answer
    const storedAnswer = localStorage.getItem(`${sessionId}_answer`)
    return storedAnswer ? JSON.parse(storedAnswer) : null
  }

  private storeOffer(offer: RTCSessionDescriptionInit) {
    // 存储Offer到LocalStorage
    localStorage.setItem(`${this.sessionId}_offer`, JSON.stringify(offer))
  }

  private getOfferFromStorage(sessionId: string): RTCSessionDescriptionInit | null {
    // 从LocalStorage获取Offer
    const storedOffer = localStorage.getItem(`${sessionId}_offer`)
    return storedOffer ? JSON.parse(storedOffer) : null
  }

  public async receiveOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(offer)
    const answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(answer)
    console.log('Local answer created:', answer)

    // 存储Answer到LocalStorage
    this.storeAnswer(answer, this.sessionId)
  }

  public async connect(sessionId: string) {
    // 检查是否有存储的Offer和ICE候选
    const storedOffer = this.getOfferFromStorage(sessionId)
    const storedCandidate = this.getIceCandidateFromStorage(sessionId)
    if (storedOffer && storedCandidate) {
      await this.receiveOffer(storedOffer)
      await this.peerConnection.addIceCandidate(storedCandidate)
    }
  }

  public async answer(sessionId: string) {
    // 检查是否有存储的Answer
    const storedAnswer = this.getAnswerFromStorage(sessionId)
    if (storedAnswer) {
      await this.peerConnection.setRemoteDescription(storedAnswer)
    }
  }

  public getChatLog(): string {
    return this.chatLog
  }
}
