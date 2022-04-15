import {Link, NavLink} from 'react-router-dom'
import { useState } from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'


function Navbar() {

  const cat = ['latest', 'popular', 'trending', 'top rated', 'upcoming'] 

  const [isActive, setIsActive] = useState(false)
  return (
    <>

    <header className='flex justify-between px-24'>
      <div className=''></div>
      <div>
      <Link to="/">
            <div className="text-7xl translate-x-12">State Flix</div>
            {/* <img src="" alt="logo" /> */}
          </Link>
      </div>
      <div className='flex items-center' >       
          <button className='text-white font-b bg-teal-500 px-7 py-2 mt-5 rounded-2xl items-center' >
            Login
          </button>
          
        </div>
    </header>
      
      <nav className='flex justify-center border-t-[1px] border-b-[1px] border-slate-200 my-5 py-2 '>
        {cat&&cat.map((item, index) => (
          <div className="px-10">
            <NavLink to={`/${item}`} key={index} className='flex-col text-black ' >{item}</NavLink>
          </div>
        ))}
      </nav>
      
    </>
 
  )
}
export default Navbar