import React from 'react'

const Heading = ({title,color}) => {
    return (
        <>
            {color && 
                <div className={`w-full border-b-4 border-${color} my-3`}>
                    <h1 className={`bg-${color} inline px-3 py-1 text-gray-100 text-xs font-medium uppercase rounded-t-sm`}>{title}</h1>
                </div>
            }
        </>
    )
}

export default Heading
