import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className="bg-[#5161ce] h-10 justify-end ">
    <div className=" flex items-center  uppercase  text-[#fff]">
        <div className=' bg-white w-24 z-0 h-10 rounded-tr-lg absolute'></div>
        <Link className=' z-10 hover:text-black  p-2 w-24 hover: rounded-t-xl flex justify-center ' to="/test">Home</Link>
        <Link className=' z-10 hover:text-black  p-2 w-24 hover: rounded-t-xl flex justify-center ' to="/test">Latest</Link>
        <Link className=' z-10 hover:text-black  p-2 w-24 hover: rounded-t-xl flex justify-center ' to="/test">Sports</Link>
        <Link className=' z-10 hover:text-black  p-2 w-24 hover: rounded-t-xl flex justify-center ' to="/test">Politics</Link>
    </div>
    </div>
 
  )
}
export default Navbar