import { Link } from 'react-router-dom'
import BookmarkBtn from '../utils/BookmarkBtn'

import ShareBtn from '../utils/ShareBtn'
const NewsCard = () => {
  return (
      <Link to="/sports/bgmi-123">
        <article className="w-full md:w-80 grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center pl-3 p-2 shadow-lg shadow-gray-200 rounded-lg">
            <div className="mb-4 md:my-0">
                <h3 className="text-xl md:text-lg text-secondary font-semibold">Battleground Mobile India IOS release date</h3>
                {/* <p className="text-sm md:text-xs text-justify mt-2 md:mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
            </div>
            <div className="w-full md:h-28 md:w-28">
                <img src='/download.png' alt="img" className="h-full w-full object-contain rounded-md" />
            </div>
            <div className="col-span-full flex justify-around w-full mt-2">
                <span className="text-xs text-gray-400">SportsBix</span>
                <span className="text-xs text-gray-400">Aug 26</span>
                <ShareBtn />
                <BookmarkBtn size='xl' />
            </div>
        </article>
      </Link>
  )
}

export default NewsCard