import Image from "next/image";
import React from "react";
import { MdVerified } from "react-icons/md";
import {
    HiOutlineBookmark,
    HiOutlineHeart,
    HiPlus,
    HiShare,
} from "react-icons/hi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";
import HTMLRenderer from "react-html-renderer";
import { relativeTime, formatTime } from "../utils/time";

import Link from "next/link";
import slugify from "slugify";
import PublisherHead from "./PublisherHead";
import Share from "../utils/Share";

const NewsCard = ({
    news,
    options = true,
    followBtn = true,
    source = false,
}) => {
    const [follow, setFollow] = React.useState(false);
    const slug = news && news.slug + "-" + news._id;
    const [share,setShare]  = React.useState(false)
    return (
        news && (
            <div className="border-2 rounded-2xl p-4 shadow-sm bg-gray-50 dark:bg-[#222222] dark:text-gray-100 dark:border-gray-400">
                {/* header  */}
                <PublisherHead
                    publisher={news.publisher}
                    time={news.updatedAt}
                    followBtn={followBtn}
                />
                {/* body  */}
                <div className="mt-3">
                    {/* title  */}
                    <h1 className="lg:text-xl font-extrabold dark:opacity-90 dark:text-white">
                        {news.title}
                    </h1>
                    <div className="flex space-x-2">
                        {news.tags.map((tag) => (
                            <p key={tag} className="text-blue-400 text-sm">
                                #{tag}
                            </p>
                        ))}
                    </div>
                    {/* image  */}
                    <div className="relative h-[200px] lg:h-[400px] w-full mt-4 mb-2">
                        <Image
                            src={news.image}
                            layout="fill"
                            className=" rounded-lg object-cover"
                            alt="news"
                        />
                        <div className="absolute font-light z-10 bottom-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-lg text-xs lg:text-sm">
                            <h3 className="cursor-pointer capitalize">
                                {news.category}
                            </h3>
                        </div>
                    </div>
                    {/* content  */}
                    <div className="text-xs lg:text-base ">
                        <p className="my-4 text-justify text-gray-600 dark:opacity-80 dark:text-white">
                            {news.content}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <Share news={news} />
                    <p className="text-xs text-gray-500 dark:text-gray-100">
                        {formatTime(news.updatedAt)}
                    </p>
                    </div>
                    {/* options  */}
                    {options && (
                        <div className="flex justify-around items-center mt-2 relative">
                            <button className="news_card_option_btn">
                                <HiOutlineHeart className="" />
                                <span className="">Like</span>
                            </button>
                            {/* <button className="news_card_option_btn" onClick={()=>setShare(!share)}>
                                <RiShareForwardLine className="text-lg" />
                                <span className="">Share</span>
                            </button> */}
                            {source ? (
                                <Link href={news.source} target="_blank">
                                    <button className="news_card_option_btn">
                                        <BsBoxArrowUpRight className="" />
                                        <span className=""> Source</span>
                                    </button>
                                </Link>
                            ) : (
                                <Link href={`/${news.category}/${slug}`}>
                                    <button className="news_card_option_btn">
                                        <BsBoxArrowUpRight className="" />
                                        <span className="">Read More </span>
                                    </button>
                                </Link>
                            )}
                            <button className="news_card_option_btn">
                                <HiOutlineBookmark className="" />
                                <span className="">Save</span>
                            </button>
                            {/* {share && <div className="absolute bottom-8">
                                <Share news={news}/>
                            </div> } */}
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default NewsCard;
