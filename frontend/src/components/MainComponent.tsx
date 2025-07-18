import { cn } from '@/lib/utils'
import React from 'react'

interface mainComponent{
    children: React.ReactNode,
    className?: string
}
const MainComponent = ({className, children}: mainComponent) => {
  return (
    <div className={cn("mx-auto max-w-screen-2xl lg:px-10 px-4 w-full",className)}>
        {children}
      
    </div>
  )
}

export default MainComponent
