import { useParams } from "react-router-dom";
import BookmarkBtn from "../components/utils/BookmarkBtn";
import ShareBtn from "../components/utils/ShareBtn";

const NewsDetail = () => {
    const { category, id } = useParams();
    return (
        <main className="w-4/5 md:px-20 mx-auto space-y-4">
            <div className="">
                <span className="">
                    {category} {id}
                </span>
                <h1 className="text-4xl text-primary font-bold my-2">
                    Battleground Mobile India IOS release date
                </h1>
                <span className="text-gray-500">#local #chennai</span>
            </div>
            <div className="h-96 w-full mt-2">
                <img
                    src="/download.png"
                    alt="img"
                    className="h-full w-full rounded-md"
                />
            </div>
            <div className="">
                <p className="text-secondary">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aliquam sapiente itaque illum temporibus deserunt,
                    architecto harum sed tempora quibusdam earum! Aspernatur
                    architecto facilis obcaecati necessitatibus, deleniti unde
                    ex. Id, reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, dolorem. Temporibus mollitia saepe aperiam rem voluptatibus eum asperiores quas fugit, harum, fugiat minus dicta repellendus quia voluptates odio error amet.
                </p>
            </div>
            <div className="flex">
                <span className="">By - DIvyanshu kaushik</span>
                <div className="flex justify-between space-x-2">
                   <ShareBtn/>
                   <BookmarkBtn size="sm"/>
                </div>
            </div>
        </main>
    );
};

export default NewsDetail;
