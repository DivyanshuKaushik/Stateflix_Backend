import { NavLink } from "react-router-dom";
import { FaHome } from 'react-icons/fa'
import { MdOutlineArticle, MdOutlineCreateNewFolder } from 'react-icons/md'
const category = [
  "Sports",
  "Bussiness",
  "National",
  "state",
  "local",
  "media",
  "bollywood",
  "tech",
];


const PrivateHeader = () => {
  return (
    <header className="flex items-center bg-purple-500 sticky top-0 z-50 py-2">
      {/* logo  */}
      <div className="flex-grow px-4">
        <h3 className="text-3xl text-white">StateFlix</h3>
      </div>
      
      {/* navlinks  */}
      <nav className="flex justify-center space-x-4 w-full">
          <NavLink to="/dashboard" className="flex items-center text-white">
                  <FaHome />
                  <span>Dashboard</span>
          </NavLink>
          <NavLink to="/posts" className="flex items-center text-white">
                  <MdOutlineArticle />
                  <span>Posts</span>
          </NavLink>
          <NavLink to="/posts/create" className="flex items-center text-white">
                  <MdOutlineCreateNewFolder />
                  <span>Create</span>
          </NavLink>
          <NavLink to="/posts/all" className="flex items-center text-white">
                  <MdOutlineCreateNewFolder />
                  <span>All Posts</span>
          </NavLink>
      </nav>
    </header>
  )
}

export default PrivateHeader