import Link from 'next/link'


const AllCategories = ({categories,currentCategory}) => {
    return (
        <section className="flex flex-wrap items-center space-x-3 py-6">
            {/* show all category and highlight active  */}
            {categories?.map(({name}) => (
                <Link key={name} href={`/${name}`}>
                    {/* change color if category is active  */}
                    <a
                        className={`border ${
                            name == currentCategory
                                ? "border-primary text-primary "
                                : "text-secondary"
                        } hover:text-primary hover:border-primary transition-all duration-200 rounded-md text-sm mt-2 px-2 uppercase tracking-wide`}
                    >
                        {name}
                    </a>
                </Link>
            ))}
        </section>
    );
};

export default AllCategories;
    