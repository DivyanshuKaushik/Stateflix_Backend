import Image from "next/image";
import Link from "next/link";
const title = "Yes Bank's Rana Kapoor says he was forced to buy Rs 2 crore painting from Priyanka Gandhi"
const NewsCardM = ({post}) => {
    const {_id,title,image,date}=post
  return (
    <Link href={`/bussiness/${title.split(" ").join("-").toLowerCase()}-${_id}`}>
    <article className="flex flex-col cursor-pointer w-2/3 md:w-full space-y-3 group click_effect">
        {/* news image  */}
        <div className="relative h-44 sm:h-64 lg:h-44 w-full">
            <Image
                src={image || ""}
                layout="fill"
                className="h-full w-full object-fill"
            />
        </div>
        {/* news content  */}
        <div className="col-span-2">
             {/* news title  */}
            <p className="text-secondary font-semibold group-hover:text-primary">
                {title}
            </p>
            {/* news date  */}
            <span className="text-sm text-gray-500 font-thin font-serif italic">Posted On {date}</span>
        </div>
    </article>
</Link>
  )
}

export default NewsCardM