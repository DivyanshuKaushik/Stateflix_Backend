import React from 'react'
interface Props{
  children: React.ReactNode
}
const NewsWrapper = ({children}:Props) => {
  return (
    <section className='space-y-4'>
      {children}
    </section>
  )
}

export default NewsWrapper