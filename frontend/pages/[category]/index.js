import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Basic from "../../components/layouts/Basic";
import MainWrapper from "../../components/layouts/MainWrapper";
import News from "../../components/News";
import API from "../../services/API";

const NewsByCategory = ({ news }) => {
    const router = useRouter();
    const { category } = router.query;
    return (
        <>
            <Head>
                <title>STATEFLIX - {category.toUpperCase()}</title>
                <meta
                    name="description"
                    content={`${category} news from Stateflix`}
                />
            </Head>
            <Basic>
                <MainWrapper>
                    <News news={news} />
                </MainWrapper>
            </Basic>
        </>
    );
};

export default NewsByCategory;

export async function getServerSideProps(context) {
    try {
        const { category } = context.params;
        const news = (await API.get(`/posts?categories=${category}`)).data.data;
        return {
            props: {
                news,
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
