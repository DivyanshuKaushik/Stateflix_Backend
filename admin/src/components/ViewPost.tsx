import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
// import Modal from "./utils/Modal";
import ModalWithBtn from "./utils/ModalWithBtn";
interface Props {
    post: any;
}
const ViewPost = ({ post }: Props) => {
    const { title, summary, image, author, date } = post;
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className="" onClick={() => setShowModal(true)}>
                <FaEye className="text-blue-600 text-lg" />
            </button>
            <ModalWithBtn show={showModal} setShow={setShowModal}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2">
                    <div className="md:col-span-2 space-y-3">
                        <h1 className="text-2xl text-secondary font-bold">
                            {title}
                        </h1>
                        <p className="text-justify">{summary}</p>
                        <div className="flex justify-between">
                            <h3 className="">{author}</h3>
                            <span className="">Posted {date}</span>
                        </div>
                    </div>
                    <div className="col-span-1 h-full w-full relative bg-gray-200">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
               
            </ModalWithBtn>
        </>
    );
};

export default ViewPost;
