import React from "react";
import NewsLayout from "../layout/NewsLayout";
import CategoryTitle from "./CategoryTitle";
import NewsCard from "./NewsCard";
import NewsWrapper from "./NewsWrapper";

const AllNews = ({ allPosts }) => {
    return (
        <NewsLayout>
            {/* show all categorized news  */}
            {allPosts.map(({ category, posts }) => (
                <NewsWrapper key={category}>
                    <CategoryTitle category={category} />
                    {/* maping news of each category  */}
                    {posts.map((post) => (
                        <NewsCard key={post._id} post={post} />
                    ))}
                </NewsWrapper>
            ))}
           
        </NewsLayout>
    );
};

export default AllNews;
