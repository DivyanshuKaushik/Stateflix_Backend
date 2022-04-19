import React from 'react'
import AffilateCard from './cards/AffilateCard'

const AffillateLinks = () => {
  return (
    <div className='flex flex-col space-y-2 justify-center w-full'>
        <h3 className="text-lg text-secondary">Want to buy?</h3>
        <AffilateCard />
        <AffilateCard />
        <AffilateCard />
        <AffilateCard />
        <AffilateCard />
    </div>
  )
}

export default AffillateLinks