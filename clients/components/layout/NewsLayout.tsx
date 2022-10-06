import React from 'react'

interface Props{
    children: React.ReactNode
}

const NewsLayout = ({children}:Props) => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8 py-4'>
        {children}
    </main>
  )
}

export default NewsLayout