import { ReactNode, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  style?: CSSProperties
}

export default function Card({ children, className, hover = false, glass = true, style }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-transform duration-300',
        glass ? 'glass' : 'bg-slate-800',
        hover && 'hover-lift cursor-pointer hover:scale-105',
        className
      )}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

