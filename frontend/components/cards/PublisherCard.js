import Image from "next/image";
import React from "react";

const PublisherCard = ({publisher,posts}) => {
    return (
        <div className="flex items-center justify-around mb-2 w-full py-2 px-2 border shadow-lg rounded-lg bg-white dark:bg-inherit text-gray-600 dark:text-gray-50 dark:opacity-95">
            <div className="flex flex-col items-center justify-center space-y-3">
                <div className="relative h-16 w-16 lg:h-24 lg:w-24 bg-blue-100 rounded-full">
                    <Image
                        src="/ICON.png"
                        layout="fill"
                        className="object-contain rounded-full"
                        alt="logo"
                    />
                </div>
                <h1 className="font-bold text-lg">{publisher.name}</h1>
            </div>
            <div className="">
                <h1 className="text-3xl font-extrabold">21k</h1>
                <h3 className="text-lg font-semibold">Followers</h3>
            </div>
            <div className="">
                <h1 className="text-3xl font-extrabold">{posts}</h1>
                <h3 className="text-lg font-semibold">Posts</h3>
            </div>
        </div>
    );
};

export default PublisherCard;
