import Link from "next/link"
import {FaSearch,FaMobile} from 'react-icons/fa'
const Header = () => {
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
  return (
    <header className="sticky z-40 shadow-md shadow-gray-300 px-4 md:px-10 mx-auto ">
    <div className="text-center">
      <Link href="/">
        <a className="text-center text-2xl md:text-5xl text-secondary font-serif font-semibold py-2 uppercase">
        State<span className="text-primary">flix</span>
        </a>
      </Link>
    </div>
    <hr className="bg-black pt-0.5 my-2 md:my-3"/>
    <div className="flex justify-around items-center">
      <nav className="flex overflow-x-scroll scrollbar-hide">
        {category&&category.map((item, i) => (
          <Link key={i} href={`/${item}`}>
            <a className="flex text-secondary text-sm font-semibold uppercase py-3 mx-3 hover:text-gray-800">
              {item}
            </a>
          </Link>
        ))}
      </nav>
      <div className="hidden md:block">
        <FaSearch size={16} />
      </div>
    </div>
  </header>
  )
}

export default Header