import React from 'react'

interface Props {
    children: React.ReactNode
}
const NewsLayout = ({children}:Props) => {
  return (
    <div className='flex justify-around items-center flex-wrap gap-4 py-4'>
        {children}
    </div>
  )
}

export default NewsLayout