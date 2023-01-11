import Image from "next/image";
import React from "react";
import { MdVerified } from "react-icons/md";
import { HiChartBar, HiOutlineBookmark, HiOutlineHeart, HiShare } from "react-icons/hi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import HTMLRenderer from "react-html-renderer";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";
import { useRouter } from "next/router";
import {relativeTime} from "../utils/time";
const PollCard = ({ poll ,options=true}) => {
    const router = useRouter();
    const user = useSelector(selectUser)

    const handleVote = ()=>{
        setTimeout(()=>{
        if(!user){
            router.push('/auth/login')
        }
    },3000)
    }
    return (poll&&
        <div className="border-2 rounded-2xl p-4 shadow-sm bg-gray-50 dark:bg-gray-900 lg:dark:bg-[#151515]">
            {/* header  */}
            <header className="flex space-x-2 items-center">
                <div className="relative h-7 w-7 lg:h-10 lg:w-10 bg-blue-100 rounded-full">
                    <Image
                        src="/ICON.png"
                        layout="fill"
                        className="object-contain rounded-full"
                        alt={poll.publisher.name}
                    />
                </div>
                <div className="">
                    <div className="flex items-center space-x-1.5">
                        <h1 className="font-semibold text-sm">{poll.publisher.name} </h1>
                        <MdVerified className="text-blue-500 text-lg" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-100">{relativeTime(poll.updatedAt)}</p>
                </div>
            </header>
            {/* body  */}
            <div className="mt-3">
                {/* title  */}
                <h1 className="lg:text-xl font-extrabold mb-3">
                   {poll.title}
                </h1>

                {/* options  */}
                <ul className="space-y-3">
                    {poll.options.map((option, index) => 
                    <li key={index} className="relative w-full dark:bg-gray-700 bg-gray-100 py-2 px-4 rounded-md cursor-pointer hover:bg-blue-200 flex items-center group">
                        {option.image && 
                                <Image src={option.image} alt="imge" height={100} width={100} className="rounded-lg" />

                        }
                        <h3 className="ml-3 text-lg group-hover:font-bold group-hover:text-blue-500 capitalize">{option.name}</h3>
                    </li>
                    )}
                </ul>
                {options && 
                    <div className="flex justify-around items-center mt-2">
                        <button onClick={handleVote} className="flex items-center text-sm outline-none border-none space-x-2 hover:text-blue-400 p-2 rounded-xl">
                            <HiChartBar className="text-lg rotate-90" />{" "}
                            <span className="">Vote Now</span>
                        </button>
                        <button className="flex items-center text-sm outline-none border-none space-x-2 hover:text-blue-400 p-2 rounded-xl">
                            <RiShareForwardLine className="text-lg" />{" "}
                            <span className="">Share</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default PollCard;
