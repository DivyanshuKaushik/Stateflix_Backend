import Head from "next/head";
import Image from "next/image";
import NewsC from "../components/cards/NewsC";
import NewsCard from "../components/cards/NewsCard";
import NewsLayout from "../components/layout/NewsLayout";
import PageLayout from "../components/layout/PageLayout";
import CategoryTitle from "../components/utils/CategoryTitle";
import Heading from "../components/utils/Heading";

export default function Home() {
    return (
        <PageLayout>
            {/* <Heading title="hello" color="gray-500" /> */}
            <CategoryTitle title="Breaking News" color="red-500" />
            <NewsLayout>
                <NewsCard />
                <NewsCard />
                <NewsC />
                <NewsC />
                <NewsCard />
                <NewsCard />
                <NewsC />
                <NewsCard />
                <NewsCard />
                <NewsC />
                <NewsC />
            </NewsLayout>
        </PageLayout>
    );
}
