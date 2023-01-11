import React from 'react'
import Header from './Header'

const Basic = ({children}) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default Basic