import { useRouter } from "next/router";
import NewsCard from '../../components/cards/NewsCard'
import NewsLayout from '../../components/layout/NewsLayout'
import PageLayout from '../../components/layout/PageLayout'
import CategoryTitle from '../../components/utils/CategoryTitle'

const NewsByCategory = () => {
    const router = useRouter();
    const { category } = router.query;
  return (
      <PageLayout>
          {/* category name  */}
          <CategoryTitle title={String(category)} color='blue-400' />
          {/* render all news by category  */}
        <NewsLayout>
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsLayout>
      </PageLayout>
  )
}

export default NewsByCategory