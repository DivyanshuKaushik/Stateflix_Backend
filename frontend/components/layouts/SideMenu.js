import React, { useState } from "react";
import {
    HiChartBar,
    HiGlobeAlt,
    HiHome,
    HiOutlineBookmark,
} from "react-icons/hi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { MdTrendingUp, MdWebStories } from "react-icons/md";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCategories } from "../../app/features/categorySlice";
import Image from "next/image";
import { useRouter } from "next/router";

const sideMenuItems = [
    { title: "Home", icon: <HiHome size={24} />, href: "/" },
    // {
    //     title: "Latest",
    //     icon: <BsFillLightningChargeFill size={24} />,
    //     href: "/latest",
    // },
    { title: "Trending", icon: <MdTrendingUp size={24} />, href: "/trending" },
    {
        title: "Polls",
        icon: <HiChartBar size={24} />,
        href: "/polls",
    },
    // { title: "Stories", icon: <MdWebStories size={24} />, href: "/stories" },
    // { title: "Publisher", icon: <HiGlobeAlt size={24} />, href: "/publishers" },
    // {
    //     title: "Bookmarks",
    //     icon: <HiOutlineBookmark size={24} />,
    //     href: "/bookmarks",
    // },
];

const SideMenu = () => {
    const { pathname } = useRouter();

    const categories = useSelector(selectCategories);
    return (
        <div className="">
            <div className="pt-6 lg:pt-0">
                {sideMenuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <div
                            className={`flex items-center cursor-pointer my-1 ${
                                pathname == item.href &&
                                "bg-gray-200 text-blue-500 dark:text-blue-500 font-semibold"
                            } hover:bg-gray-200 ${
                                pathname !== item.href && "text-gray-700"
                            } hover:text-blue-500 hover:font-semibold dark:text-gray-50 rounded-xl py-3 px-6`}
                        >
                            {item.icon}
                            <h1 className="ml-2 text-sm lg:text-base">
                                {item.title}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
            <hr className="w-11/12 mx-auto my-3" />
            <aside className="px-4">
                <h1 className="font-semibold text-gray-900 dark:text-gray-50 text-sm">
                    Read News By Categories
                </h1>
                <ul className="">
                    {categories?.map((category) => (
                        <Link
                            href={`/${category.name.toLowerCase()}`}
                            key={category._id}
                        >
                            <li
                                key={category._id}
                                className="py-2 pl-2 hover:bg-gray-200 rounded-md cursor-pointer text-gray-700 dark:text-gray-50 hover:text-blue-400 hover:font-semibold capitalize"
                            >
                                <div className="flex space-x-2 items-center">
                                    <Image
                                        src={category.image}
                                        height={30}
                                        width={30}
                                        alt={category.name}
                                    />
                                    <span className="">{category.name}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default SideMenu;
