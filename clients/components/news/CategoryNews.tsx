import React from "react";
import NewsLayout from "../layout/NewsLayout";
import NewsCardM from "./NewsCardM";

const CategoryNews = ({posts}) => {
    return (
        <section className="">
            {/* show all news by category  */}
            {/* <NewsLayout> */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 place-content-center place-items-center py-4">
                {/* map all news  */}
                {posts?.map(post=><NewsCardM key={post._id} post={post} />)}
            </main>
            {/* </NewsLayout> */}
        </section>
    );
};

export default CategoryNews;
