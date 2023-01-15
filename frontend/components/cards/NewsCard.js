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
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
} from "next-share";
import Link from "next/link";
import slugify from "slugify";
import PublisherHead from "./PublisherHead";

const NewsCard = ({ news, options = true, followBtn = true }) => {
    const [follow, setFollow] = React.useState(false);
    const slug = news && slugify(news.title) + "-" + news._id;
    return (
        news && (
            <div className="border-2 rounded-2xl p-4 shadow-sm bg-gray-50 dark:bg-[#202020] dark:text-gray-100">
                {/* header  */}
                <PublisherHead publisher={news.publisher} time={news.updatedAt} followBtn={followBtn} />
                {/* body  */}
                <div className="mt-3">
                    {/* title  */}
                    <h1 className="lg:text-xl font-extrabold dark:opacity-90 dark:text-white">{news.title}</h1>
                    {/* tags  */}
                    {/* <div className="">
                {news.yoast_head_json.schema["@graph"][0].keywords.map((tag) =>( <span>{tag}</span> ))}
            </div> */}
                    <div className="flex space-x-2">
                        {news.tags
                            .map((tag) => (
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
                    {/* image src  */}
                    {/* <p className="text-sm text-gray-400">
                    Ronnie Hillman was a running back with the Denver Broncos.
                    (Photo: Twitter/ @MrHillman2U)
                </p> */}
                    {/* content  */}
                    <div className="text-xs lg:text-base ">
                        <p className="my-4 text-justify text-gray-600 dark:opacity-90 dark:text-white">
                            {news.content}
                        </p>
                        {/* <HTMLRenderer
                        html={news.content}
                        components={{
                            p: (props) => (
                                <p
                                    className="my-4 text-justify text-gray-600"
                                    {...props}
                                />
                            ),
                        }}
                    /> */}
                    </div>
                    {/* <p
                    className="my-4 text-justify text-gray-600"
                    style={{ fontWeight: 530 }}
                >
                    {news.content.rendered}
                </p> */}
                    <p className="text-xs text-gray-500 dark:text-gray-100 text-right">
                        {formatTime(news.updatedAt)}
                    </p>
                    {/* options  */}
                    {options && (
                        <div className="flex justify-around items-center mt-2">
                            <button className="news_card_option_btn">
                                <HiOutlineHeart className="" />{" "}
                                <span className="">Like</span>
                            </button>
                            <button className="news_card_option_btn">
                                <RiShareForwardLine className="text-lg" />{" "}
                                <span className="">Share</span>
                            </button>
                            <Link href={`/${news.category}/${slug}`}>
                            <button className="news_card_option_btn">
                                <BsBoxArrowUpRight className="" />{" "}
                                <span className="">Read More</span>
                            </button>

                            </Link>
                            <button className="news_card_option_btn">
                                <HiOutlineBookmark className="" />{" "}
                                <span className="">Save</span>
                            </button>
                            {/* <button className="bg-blue-500 py-1 px-2 text-sm flex items-center text-white font-semibold rounded-full">
                        <WhatsappShareButton
                            url={"https://stortnews-web.vercel.com"}
                            quote={
                               news.title
                            }
                            hashtag={"#janjgir"}
                            className="flex"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <span>Whatsapp</span>
                    </button> */}
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default NewsCard;
