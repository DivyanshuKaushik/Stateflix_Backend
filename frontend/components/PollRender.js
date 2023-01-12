import React from 'react'
import Ads from './Ads'
import PollCard from './cards/PollCard'

const PollRender = ({polls}) => {
  return (
    <div className="flex flex-col space-y-3">
    {polls?.map((poll, index) => (
        <>
            <PollCard key={poll._id} poll={poll} />
            {(index+1) % 3 === 0 && (
                <div className="">
                    <h3 className="text-blue-500 text-center mb-2">
                        Promoted Content
                    </h3>
                    <div className="flex justify-around">
                        <Ads />
                        <Ads />
                    </div>
                </div>
            )}
        </>
    ))}
</div>
  )
}

export default PollRender