import Image from 'next/image'
import React from 'react'
interface Props{
    post:any
}
const ViewPost = ({post}:Props) => {
    const {title,summary,image} = post
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2 relative">
        <div className="md:col-span-2 space-y-3">
            <h1 className='text-2xl text-secondary font-bold'>{title}</h1>
            <p className='text-justify'>{summary}</p>
        </div>
        <div className="col-span-1 relative h-[300px] w-[400px]">
            <Image src={image} layout="fill" className='h-full w-full object-contain' />
        </div>
    </div>
  )
}

export default ViewPost