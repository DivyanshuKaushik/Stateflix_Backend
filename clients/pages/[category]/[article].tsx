import CategoryTitle from "../../components/news/CategoryTitle";
import PublicPage from "../../components/layout/PublicPage";
import NewsCard from "../../components/news/NewsCard";
import NewsWrapper from "../../components/news/NewsWrapper";
import Image from "next/image";
import Socials from "../../components/Socials";
import axios from "axios";
import { API_URL } from "../../config";

const NewsDetailPage = ({post,related,category }) => {
    const {title,summary,image,date} = post
    return (
        <PublicPage>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2 xl:gap-4 py-6">
                {/* news section */}
                <main className="md:col-span-2 md:pr-8 space-y-4">
                    {/* news title  */}
                    <h1 className="text-secondary font-semibold text-3xl">
                        {title}
                    </h1>
                    {/* news image  */}
                    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] 2xl:h-[550px] w-full">
                        <Image
                            src={image}
                            layout="fill"
                            className="object-fill"
                        />
                    </div>
                    {/* news content  */}
                    <div className="flex flex-col space-y-2">
                        {/* summary  */}
                        <p className="text-xl text-secondary opacity-80">
                           {summary}
                        </p>
                        {/* post date  */}
                        <span className="text-sm text-gray-500 font-thin font-serif italic self-end">Posted On {date}</span>
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
                        <CategoryTitle category={category} />
                        {related?.map(item=>
                            <NewsCard key={item._id} post={item} />
                        )}
                    </NewsWrapper>
                </aside>
            </div>

            {/* related news  */}
        </PublicPage>
    );
};

export default NewsDetailPage;

// server side code to fetch the news data
export async function getServerSideProps(context) {
    // get category and article from the url query params
    // try{
        const { category,article } = context.query;
        const id = article.split('-').reverse()[0]
        const post = (await axios.get(API_URL+'/posts/'+id)).data.data
        const related = (await axios.get(`${API_URL}/posts?category=${category}&page=1&limit=100`)).data.data;
        return {
            props: {
                post,
                related,
                category
            },
        };
    // }catch(error){
    //     return {
    //         post:{},
    //         notFound: true
    //     }
    // }
}
