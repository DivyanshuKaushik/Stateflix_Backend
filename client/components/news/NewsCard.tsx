import Image from "next/image";
import Link from "next/link";
const title = "Yes Bank's Rana Kapoor says he was forced to buy Rs 2 crore painting from Priyanka Gandhi"
const NewsCard = () => {
    return (
        <Link href={`/bussiness/${title.split(" ").join("-").toLowerCase()}`}>
            <article className="h-24 sm:h-28 lg:h-20 grid grid-cols-3 gap-3 cursor-pointer group click_effect">
                {/* news image  */}
                <div className="col-span-1 relative">
                    <Image
                        src="/download.png"
                        layout="fill"
                        className="h-full w-full object-fill"
                    />
                </div>
                {/* news content  */}
                <div className="col-span-2 place-self-center">
                    {/* news title  */}
                    <p className="text-secondary font-semibold group-hover:text-primary text-sm">
                        Yes Bank's Rana Kapoor says he was forced to buy Rs 2
                        crore painting from Priyanka Gandhi
                    </p>
                    {/* news date  */}
                    <span className="text-sm text-gray-500 font-thin font-serif italic">Posted On April 25th, 2022</span>
                </div>
            </article>
        </Link>
    );
};

export default NewsCard;
