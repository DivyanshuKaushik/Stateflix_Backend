import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
interface Props {
    category: string;
}
const CategoryTitle = ({ category }: Props) => {
    return (
        <Link href={`/${category}`}>
            <a>
                <div className="border border-l-4 border-l-primary px-4 py-1.5">
                    <h3 className="flex items-center uppercase text-secondary font-semibold tracking-wider">
                        {category}{" "}
                        <MdOutlineKeyboardArrowRight className="text-2xl" />{" "}
                    </h3>
                </div>
            </a>
        </Link>
    );
};

export default CategoryTitle;
