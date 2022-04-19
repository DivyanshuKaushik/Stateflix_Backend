import { Link } from 'react-router-dom'
import {FiPocket, FiShare2} from 'react-icons/fi'
const NewsLargeCard = () => {
  return (
      <Link to="/">
        <article className="w-full md:w-64 pl-3 p-2 shadow-lg shadow-gray-200 rounded-lg">
            <div className="w-full">
                <img src='/download.png' alt="img" className="h-full w-full object-contain rounded-md" />
            </div>
            <div className="mb-4 md:my-0">
                <h3 className="text-xl md:text-small text-secondary font-semibold">Battleground Mobile India IOS release date</h3>
            </div>
            <div className="col-span-full flex justify-around w-full mt-2">
                <span className="text-xs text-gray-400">SportsBix</span>
                <span className="text-xs text-gray-400">Aug 26</span>
                <button className="text-xs text-primary flex items-center"><FiShare2 className='mr-1' /> Share</button>
                <button className="text-xs text-primary flex items-center"> <FiPocket className='mr-1' /> Read Later</button>
            </div>
        </article>
      </Link>
  )
}

export default NewsLargeCard