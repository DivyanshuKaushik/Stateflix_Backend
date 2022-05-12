import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useAppSelector } from "../../app/store";
import { Store } from "../../app/StoreProvider";
import AllCategories from "../../components/AllCategories";
import PublicPage from "../../components/layout/PublicPage";
import CategoryNews from "../../components/news/CategoryNews";
import API from "../../service/API";

const NewsByCategory = ({posts}) => {
    const router = useRouter();
    const { category }  = router.query;
    const { state, dispatch } = useContext(Store);
    const categories = useAppSelector(state=>state.category.category)
    return (
        <PublicPage>
            {/* all categories  */}
            <AllCategories categories={categories} currentCategory={String(category)} />
            {/* show all news by category  */}
            <CategoryNews posts={posts} />
            {/* pagination  */}
        </PublicPage>
    );
};

export default NewsByCategory;

export async function getServerSideProps(context){
    const { category } = context.query;
    const posts = (await axios.get(`${process.env.API_URL}/posts?category=${category}`)).data.data;
    return {
        props:{posts}
    }
}
