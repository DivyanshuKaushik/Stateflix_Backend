import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import NewsCard from "../../components/cards/NewsCard";
import Basic from "../../components/layouts/Basic";
import MainWrapper from "../../components/layouts/MainWrapper";
import News from "../../components/News";
import API from "../../services/API";

const Post = ({ news, title }) => {
    const router = useRouter();
    const { post } = router.query;
    const slug = news && news.slug + "-" + news._id;
    const url = `https://stateflix.com/${news.category}/${slug}`
    return (
        <>
            <Head>
                <title>STATEFLIX - {title} </title>
                <meta name="description" content={`${title} from Stateflix`} />
                <meta property="og:url" content={news.url} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />

                <meta property="og:title" content={news.slug.split("-").join(" ")} />
                <meta property="og:site_name" content="Stateflix" />
                <meta
                    property="og:image"
                    itemProp="image"
                    content={news.image}
                />
                <meta property="og:image:type" content="image/webp" />
            </Head>
            <Basic>
                <MainWrapper>
                    <div className="flex flex-col space-y-3 md:w-2/3 lg:w-full mx-auto">
                        <NewsCard news={news} source />
                    </div>
                </MainWrapper>
            </Basic>
        </>
    );
};

export default Post;

export async function getServerSideProps(context) {
    try {
        const { post } = context.params;
        const id = post.split("-").pop();
        const news = (await API.get(`/posts/${id}`)).data.data;
        return {
            props: {
                news,
                title: news.slug.split("-").join(" "),
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}
