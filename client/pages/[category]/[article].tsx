import CategoryTitle from "../../components/news/CategoryTitle";
import PageLayout from "../../components/layout/PageLayout";
import NewsCard from "../../components/news/NewsCard";
import NewsWrapper from "../../components/news/NewsWrapper";
import Image from "next/image";
import Socials from "../../components/Socials";

interface Props {
    category: string;
    article: string;
}

const NewsDetailPage = ({ category, article }: Props) => {
    return (
        <PageLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2 xl:gap-4 py-6">
                {/* news section */}
                <main className="md:col-span-2 md:pr-8 space-y-4">
                    {/* news title  */}
                    <h1 className="text-secondary font-semibold text-3xl">
                        Yes Bank's Rana Kapoor says he was forced to buy Rs 2
                        crore painting from Priyanka Gandhi
                    </h1>
                    {/* news image  */}
                    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] 2xl:h-[550px] w-full">
                        <Image
                            src="/download.png"
                            layout="fill"
                            className="object-fill"
                        />
                    </div>
                    {/* news content  */}
                    <div className="flex flex-col space-y-2">
                        {/* summary  */}
                        <p className="text-xl text-secondary">
                            The UK is getting its first mini-airport or
                            vertiport open for demonstrations. The opening of
                            the vertiport is being celebrated by an
                            Indian-origin entrepreneur, as the "fire of the
                            starting gun" for futuristic transportation. Air-One
                            is the UK’s first mini-airport in Coventry, which
                            will be open to the public for demonstrations until
                            the middle of May.
                        </p>
                        {/* post date  */}
                        <span className="text-sm text-gray-500 font-thin font-serif italic self-end">Posted On April 25th, 2022</span>
                        {/* extra content */}
                        <div className="flex justify-between">
                            {/* source link  */}
                            <button className="border border-gray-400 text-gray-500 px-4 py-2 text-sm rounded-sm click_effect">Read More</button>
                            {/* share on social media  */}
                            <Socials />
                        </div>
                    </div>
                </main>
                {/* same category news section */}
                <aside className="md:col-span-1">
                    <NewsWrapper>
                        <CategoryTitle category="bussiness" />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                    </NewsWrapper>
                </aside>
            </div>

            {/* related news  */}
        </PageLayout>
    );
};
const title =
    "Yes Bank's Rana Kapoor says he was forced to buy Rs 2 crore painting from Priyanka Gandhi";

export default NewsDetailPage;

// server side code to fetch the news data
export async function getServerSideProps(context) {
    // get category and article from the url query params
    const { category, article } = context.query;
    return {
        props: {
            category,
            article,
        },
    };
}
