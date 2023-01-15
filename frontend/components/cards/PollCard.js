import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import {
    HiChartBar,
    HiOutlineBookmark,
    HiOutlineHeart,
    HiShare,
} from "react-icons/hi";
import { RiShareForwardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectVisitor } from "../../app/features/authSlice";
import { useRouter } from "next/router";
import PublisherHead from "./PublisherHead";
import API from "../../services/API";
import { setChange } from "../../app/features/changeSlice";
const PollCard = ({ pollData, options = true }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [poll,setPoll] = useState(pollData)
    const visitor = useSelector(selectVisitor);
    const [voted, setVoted] = useState(false);
    const [selectOption, setSelectOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ votedPoll, setVotedPoll ] = useState(null);

    const handleVote = async () => {
        if (!visitor) {
            return alert("You must be logged in to vote");
        }
        if (!selectOption) {
            return alert("You must select an option to vote");
        }
        try {
            await API.post(`/polls/vote`, {
                poll: poll._id,
                option: selectOption,
            });
            // setVotedPoll(poll._id);
            setVoted(true);
            dispatch(setChange("polls"))
        } catch (error) {
            console.log(error);
        }
    };

    async function Voted() {
        try {
            const res = (await API.get(`/polls/${poll._id}/voted`)).data.data;
            setVoted(res);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    function findOptionPercentage(votes) {
        return parseInt((votes / poll.totalVotes) * 100);
    }

    async function refetchUpdatedPoll(){
        try {
            setLoading(true);
            const res = (await API.get(`/polls/${votedPoll}`)).data.data;
            setPoll(res);
            setVoted(true);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        Voted();
        // refetchUpdatedPoll()
    }, [votedPoll]);
    return (
        poll && !loading && (
            <div className="border-2 rounded-2xl p-4 shadow-sm bg-gray-50 dark:bg-gray-900 lg:dark:bg-[#151515]">
                {/* header  */}
                <PublisherHead
                    publisher={poll.publisher.slug}
                    time={poll.createdAt}
                />
                {/* body  */}
                <div className="mt-3">
                    {/* title  */}
                    <h1 className="lg:text-xl font-extrabold mb-3">
                        {poll.title}
                    </h1>

                    {/* options  */}
                    <ul className="space-y-3">
                        {poll.options.map((option, index) =>
                            voted ? (
                                <li
                                    key={index}
                                    className="relative w-full dark:bg-gray-700 bg-gray-100 py-2 rounded-md cursor-pointer flex items-center group"
                                >
                                    {option.image && (
                                        <Image
                                            src={option.image}
                                            alt="imge"
                                            height={100}
                                            width={100}
                                            className="rounded-lg ml-4"
                                        />
                                    )}
                                    <div
                                        className="absolute bg-black opacity-25 h-full rounded-md"
                                        style={{
                                            width: `${findOptionPercentage(
                                                option.votes
                                            )}%`,
                                        }}
                                    ></div>
                                    <span className="absolute bottom-2 right-2 text-gray-700">
                                        {findOptionPercentage(option.votes)}%
                                    </span>
                                    <h3 className="ml-3 text-lg font-semibold text-gray-800  capitalize">
                                        {option.name}
                                    </h3>
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className={`relative w-full dark:bg-gray-700 bg-gray-100 py-2 px-4 rounded-md cursor-pointer hover:bg-blue-200 flex items-center group ${selectOption === option._id && "bg-blue-200"}`}
                                    onClick={() => setSelectOption(option._id)}
                                >
                                    {option.image && (
                                        <Image
                                            src={option.image}
                                            alt="imge"
                                            height={100}
                                            width={100}
                                            className="rounded-lg"
                                        />
                                    )}
                                    <h3 className={`ml-3 text-lg group-hover:font-bold ${selectOption === option._id && "font-bold text-blue-500"} group-hover:text-blue-500 capitalize`}>
                                        {option.name}
                                    </h3>
                                </li>
                            )
                        )}
                    </ul>
                    {options && (
                        <div className="flex justify-around items-center mt-2">
                            {!voted && 
                            <button
                                onClick={handleVote}
                                className="flex items-center text-sm outline-none border-none space-x-2 hover:text-blue-400 p-2 rounded-xl"
                            >
                                <HiChartBar className="text-lg rotate-90" />{" "}
                                <span className="">Vote Now</span>
                            </button>
                            }
                            <button className="flex items-center text-sm outline-none border-none space-x-2 hover:text-blue-400 p-2 rounded-xl">
                                <RiShareForwardLine className="text-lg" />{" "}
                                <span className="">Share</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default PollCard;
