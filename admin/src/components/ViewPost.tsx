import React, { useState } from 'react'
import Modal from './utils/Modal'
import ModalWithBtn from './utils/ModalWithBtn'
interface Props{
    post:any
}
const ViewPost = ({post}:Props) => {
    const {title,summary,image} = post
    const [showModal, setShowModal] = useState(false);
  return (
      <>
        <button className="" onClick={() => setShowModal(true)}>
                view
            </button>
    {/* //   <ModalWithBtn btnName="view"> */}
          <Modal title="view" show={showModal} setShow={setShowModal}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2 bg-white p-6 relative">
                <div className="md:col-span-2 space-y-3">
                    <h1 className='text-2xl text-secondary font-bold'>{title}</h1>
                    <p className='text-justify'>{summary}</p>
                </div>
                <div className="col-span-1 relative">
                    <img src={image} className='object-fill' />
                </div>
            </div>
          </Modal>

    {/* //   </ModalWithBtn> */}
      </>
  )
}

export default ViewPost