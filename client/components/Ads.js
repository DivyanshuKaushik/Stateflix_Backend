import Image from 'next/image'
import React from 'react'

const Ads = ({ad}) => {
  const imgsrc = ad ? ad.image : "https://media.istockphoto.com/id/842214470/photo/young-designers-discussing-the-color-palette.jpg?s=612x612&w=0&k=20&c=nAJgTF73SOAoiDLY-T1KOJGF8azZIX9C52X5xGy69K4="
  return (
    <div className='h-72 w-72 relative'>
        <Image src={imgsrc} layout='fill' alt='ads'/>
    </div>
  )
}

export default Ads