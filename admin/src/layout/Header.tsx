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
    <header className="">
      {/* logo  */}
      
      {/* navlinks  */}
      <nav className="flex justify-center space-x-4 w-full bg-purple-500 sticky top-0 z-50">
          <NavLink to="/dashboard">
              <a className="flex items-center text-sm text-white ">
                  <FaHome />
                  <span>Dashboard</span>
              </a>
          </NavLink>
          <NavLink to="/posts">
              <a className="flex items-center text-sm text-white ">
                  <MdOutlineArticle />
                  <span>Posts</span>
              </a>
          </NavLink>
          <NavLink to="/posts/create">
              <a className="flex items-center text-sm text-white ">
                  <MdOutlineCreateNewFolder />
                  <span>Create</span>
              </a>
          </NavLink>
          <NavLink to="/posts/all">
              <a className="flex items-center text-sm text-white ">
                  <MdOutlineCreateNewFolder />
                  <span>All Posts</span>
              </a>
          </NavLink>
      </nav>
    </header>
  )
}

export default PrivateHeader