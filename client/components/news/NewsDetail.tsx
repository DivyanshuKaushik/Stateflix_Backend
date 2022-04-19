import Image from "next/image";
import BookmarkBtn from "../utils/BookmarkBtn";
import ShareBtn from "../utils/ShareBtn";

interface Props {
    category: string;
    article: string;
}

const NewsDetail = ({ category, article }: Props) => {
    return (
        <div className="col-span-2">
            <div className="">
                <span className="">
                    {category} {article}
                </span>
                {/* title start */}
                <h1 className="text-4xl text-primary font-bold my-2">
                    Battleground Mobile India IOS release date
                </h1>
                {/* title end */}
                <span className="text-gray-500">#local #chennai</span>
            </div>
            {/* news image start */}
            <div className="relative h-96 w-full mt-2">
                <Image
                    src="/download.png"
                    alt="img"
                    layout="fill"
                    className="h-full w-full rounded-md"
                />
            </div>
            {/* news image end */}
            {/* news summary start  */}
            <div className="">
                <p className="text-secondary">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aliquam sapiente itaque illum temporibus deserunt,
                    architecto harum sed tempora quibusdam earum! Aspernatur
                    architecto facilis obcaecati necessitatibus, deleniti unde
                    ex. Id, reiciendis! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Eos, dolorem. Temporibus mollitia saepe
                    aperiam rem voluptatibus eum asperiores quas fugit, harum,
                    fugiat minus dicta repellendus quia voluptates odio error
                    amet.
                </p>
            </div>
            {/* news summary end  */}
            <div className="flex">
                {/* author name start */}
                <span className="">By - DIvyanshu kaushik</span>
                {/* author name end */}
                {/* share and bookmark section start */}
                <div className="flex justify-between space-x-2">
                    <ShareBtn size="lg" />
                    <BookmarkBtn size="lg" />
                </div>
                {/* share and bookmark section end */}
            </div>
        </div>
    );
};

export default NewsDetail;
