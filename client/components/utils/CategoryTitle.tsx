interface Props {
    title: string;
    color:string
}

const CategoryTitle = ({ title,color }: Props) => {
    return <h3 className={`text-center md:text-left text-red-500 font-semibold text-2xl mt-2 px-4 capitalize`}>{title}</h3>;
};

export default CategoryTitle;
