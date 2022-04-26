import React from 'react'
import NewsLayout from '../layout/NewsLayout'
import CategoryTitle from './CategoryTitle'
import NewsCard from './NewsCard'
import NewsWrapper from './NewsWrapper'

const AllNews = () => {
  return (
    <NewsLayout>
        {/* show all categorized news  */}
        <NewsWrapper>
            <CategoryTitle category='sports'/>
            {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
        <NewsWrapper>
            <CategoryTitle category='Latest News'/>
             {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
        <NewsWrapper>
            <CategoryTitle category='Bussiness'/>
             {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
        <NewsWrapper>
            <CategoryTitle category='Bollywood'/>
             {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
        <NewsWrapper>
            <CategoryTitle category='Bollywood'/>
             {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
        <NewsWrapper>
            <CategoryTitle category='Bollywood'/>
             {/* maping news of each category  */}
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </NewsWrapper>
    </NewsLayout>
  )
}

export default AllNews