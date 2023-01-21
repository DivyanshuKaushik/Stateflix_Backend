import React from 'react'
import Image from "next/image";
import { relativeTime, formatTime } from "../utils/time";
import { HiPlus } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectPublisher } from '../../app/features/publisherSlice';
import { selectVisitor } from '../../app/features/authSlice';
import API from '../../services/API';
const PublisherHead = ({publisher,time,followBtn=false}) => {
    const publishers = useSelector(selectPublisher)
    const visitor = useSelector(selectVisitor)
    const [follow, setFollow] = React.useState(false);
    const [pubId, setPubId] = React.useState();

    async function isFollowing(){
        if(visitor){
            const pub = publishers.find((pub) => pub.slug ===publisher)
            setPubId(pub._id)
            return visitor.following.find((pub) => pub.slug ===publisher ? setFollow(true) : setFollow(false) )
        }
    }
    async function followPublisher(){
        try {
            await API.post("/visitor/follow/publisher/"+ pubId)
            setFollow(true)
        } catch (error) {
            alert("Something went wrong")
        }
    }
    React.useEffect(()=>{
        isFollowing()
    },[visitor])
  return (
    <header className="flex space-x-2 items-center justify-between">
                    <div className="flex space-x-2 items-center">
                        <div className="relative h-7 w-7 lg:h-10 lg:w-10 bg-blue-100 rounded-full">
                            <Image
                                src="/ICON.png"
                                layout="fill"
                                className="object-contain rounded-full"
                                alt={publisher}
                            />
                        </div>
                        <div className="">
                            <div className="flex items-center space-x-1.5">
                                <h1 className="font-semibold text-sm capitalize">
                                    {publisher.split("-").join(" ")}
                                </h1>
                                <MdVerified className="text-blue-500 text-lg" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-100">
                                {relativeTime(time)}
                            </p>
                        </div>
                    </div>
                    {followBtn && (
                        <div className="">
                            {follow ? (
                                <button
                                    className="text-green-500 flex"
                                    onClick={() => setFollow(!follow)}
                                >
                                    Following
                                </button>
                            ) : (
                                <button
                                    className="text-blue-500 flex"
                                    onClick={followPublisher}
                                >
                                    <HiPlus size={20} /> Follow
                                </button>
                            )}
                        </div>
                    )}
                </header>
  )
}

export default PublisherHead