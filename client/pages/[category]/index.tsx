import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../../app/StoreProvider";
import AllCategories from "../../components/AllCategories";
import PageLayout from "../../components/layout/PageLayout";
import CategoryNews from "../../components/news/CategoryNews";

const NewsByCategory = () => {
    const router = useRouter();
    const { category }  = router.query;
    const { state, dispatch } = useContext(Store);
    return (
        <PageLayout>
            {/* all categories  */}
            <AllCategories categories={state.category} currentCategory={String(category)} />
            {/* show all news by category  */}
            <CategoryNews />
            {/* pagination  */}
        </PageLayout>
    );
};

export default NewsByCategory;
