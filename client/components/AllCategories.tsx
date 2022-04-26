import Link from 'next/link'

interface Props{
    categories:string[];
    currentCategory:string;
}

const AllCategories = ({categories,currentCategory}:Props) => {
    return (
        <section className="flex flex-wrap items-center space-x-3 py-6">
            {/* show all category and highlight active  */}
            {categories?.map((item) => (
                <Link key={item} href={`/${item}`}>
                    {/* change color if category is active  */}
                    <a
                        className={`border ${
                            item == currentCategory
                                ? "border-primary text-primary "
                                : "text-secondary"
                        } hover:text-primary hover:border-primary transition-all duration-200 rounded-md text-sm mt-2 px-2 uppercase tracking-wide`}
                    >
                        {item}
                    </a>
                </Link>
            ))}
        </section>
    );
};

export default AllCategories;
    