import Image from "next/image";
import React from "react";

const StoryCard = () => {
    return (
        <div className="relative h-96 w-2/3 md:w-full rounded-lg p-2 shadow-md">
            <Image
                src="https://cdn2.storyasset.link/579717c4-baa9-4345-a997-218709e694f8/ms-rnfpocerdf.jpg"
                layout="fill"
                className=" h-full w-full rounded-lg"
                alt="story"
            />
            <div className="absolute bottom-6">
                <p className=" text-white text-2xl font-bold">
                    मांडविया ने राहुल को क्यों लिखी चिट्ठी:
                </p>
            </div>
        </div>
    );
};

export default StoryCard;
