import './flychess.css'
import { ReactNode } from 'react'
import SvgIcon from '@/components/SvgIcon/Index'
export interface PersonData {
  x?: number
  y?: number
  width?: number
  height?: number
  current?: number
  img?: string
  color?: string
}

export const ChessBox = ({
  children,
  className,
  onClick,
}: {
  children?: ReactNode
  className?: string
  onClick?: () => void
}) => {
  return (
    <div className={`fly-chess-board-box ${className || ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export const ChessRow = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return <div className={`fly-chess-board-row ${className || ''} `}>{children}</div>
}

export const ChessArrow = ({ className }: { className?: string }) => {
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

export const Player = ({ data }: { data: PersonData }) => {
  const styles = {
    transform: `translate(${data?.x}px, ${data?.y}px)`,
    width: `${data?.width}px`,
    height: `${data?.height}px`,
    transition: data?.current == 1 ? 'none' : 'all 0.5s ease-in-out',
  }
  return (
    <div className="player" style={styles}>
      <SvgIcon name={data?.img} color={data?.color} />
    </div>
  )
}

export const getStepPosition = (id?: number): PersonData => {
  const elem = document.getElementById(`box-${id}`)
  const parent = elem?.offsetParent as HTMLElement
  return {
    x: (parent?.offsetLeft || 0) + (elem?.offsetLeft || 0),
    y: (parent?.offsetTop || 0) + (elem?.offsetTop || 0),
    width: elem?.offsetWidth || 0,
    height: elem?.offsetHeight || 0,
  }
}
