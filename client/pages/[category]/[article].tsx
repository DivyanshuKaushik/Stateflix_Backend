import { useRouter } from "next/router";
import AffillateLinks from "../../components/AffillateLinks";
import NewsCard from "../../components/cards/NewsCard";
import NewsLayout from "../../components/layout/NewsLayout";
import PageLayout from "../../components/layout/PageLayout";
import NewsDetail from '../../components/news/NewsDetail'

const NewsDetailPage = () => {
    const router = useRouter();
    const { category, article } = router.query;
    return (
        <PageLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* news detail  */}
                <NewsDetail category={String(category)} article={String(article)} /> 
                {/* affilate section  */}
                <div className="col-span-1">
                    <AffillateLinks />
                </div>
                {/* related articles  */}
                <div className="col-span-3">
                    <NewsLayout>
                        <NewsCard />
                        <NewsCard />
                        <NewsCard />
                    </NewsLayout>
                </div>
            </div>
        </PageLayout>
    );
};

export default NewsDetailPage;
