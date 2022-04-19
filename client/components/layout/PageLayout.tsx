import React from 'react'

interface Props {
    children: React.ReactNode
}

const PageLayout = ({children}:Props) => {
  return (
    <main className='w-full px-10 md:px-0 md:w-4/5 md:mx-auto py-6'>
        {children}
    </main>
  )
}

export default PageLayout