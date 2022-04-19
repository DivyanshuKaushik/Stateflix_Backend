import React from "react";
import Link from "next/link";
import Image from "next/image";

const AffilateCard = () => {
  return (
    <Link href={`/hello`}>
        <a className="flex h-20 w-72 m-1 group shadow-lg rounded-md ">
          <div className="relative h-full w-2/3 rounded-md">
            <Image
              src="/download.png"
              layout="fill"
              objectFit="fill"
              className="card-image rounded-md"
            />
          </div>
          <div className="p-1 ml-3 flex flex-col justify-between">
            <p className="text-md leading-snug font-medium text-gray-900 group-hover:text-yellow-600 transition-all duration-200">
             Iphone 11 latest 121 GB RAM 256Gb
            </p>
          </div>
        </a>
    </Link>
  );
};

export default AffilateCard;