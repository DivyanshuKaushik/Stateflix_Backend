import React from "react";
import Ads from "./Ads";
import NewsCard from "./cards/NewsCard";

const News = ({ news }) => {
    return (
        <div className="flex flex-col space-y-3 md:w-2/3 lg:w-full mx-auto">
            {/* <NewsCard2 news={n} /> */}
            {news?.map((item, index) => (
                <div key={index}>
                    <NewsCard key={item._id} news={item} />
                    {(index + 1) % 3 == 0 && (
                        <div key={index} className="">
                            <h3 className="text-blue-500 text-center mb-2">
                                Promoted Content
                            </h3>
                            <div className="flex justify-around">
                                <Ads />
                                <Ads />
                            </div>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default News;
