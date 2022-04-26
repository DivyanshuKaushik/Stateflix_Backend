import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../app/StoreProvider";
import Socials from "../Socials";
import Subsribe from "../utils/Subsribe";

// const category = [
//     "Sports",
//     "Bussiness",
//     "National",
//     "state",
//     "local",
//     "media",
//     "bollywood",
//     "tech",
// ];
const Header = () => {
    const {state,dispatch} = useContext(Store)
    // dispatch({type:'GET_CATEGORY'})
    console.log(state.category)
    return (
        <>
            {/* time and socials  */}
            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <span className="bg-gray-200 px-2 text-sm">
                        {new Date().toLocaleString()}
                    </span>
                    {/* subscribe button  */}
                    <Subsribe />
                </div>
                {/* socials  */}
               <Socials />
            </div>
            {/* main header  */}
            <header className="flex items-center bg-primary text-white space-x-8 sticky top-0 z-50">
                {/* logo  */}
                <Link href="/">
                    <a className="px-2">
                        <h1 className="text-xl font-semibold">StateFlix</h1>
                    </a>
                </Link>
                {/* category list */}
                <nav className="flex space-x-2 uppercase text-sm overflow-scroll scrollbar-hide">
                    {state.category?.map((item, i) => (
                        <Link key={i} href={`/${item}`}>
                            <a className="hover:bg-primary-dark hover:font-semibold p-2">
                                {item}
                            </a>
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
};

export default Header;