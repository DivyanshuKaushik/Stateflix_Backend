import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import moment from 'moment'
import { setCategory } from "../../app/slices/categorySlice";
import { useAppDispatch } from "../../app/store";
import {SocialsLogos} from "../Socials";
import Subsribe from "../utils/Subsribe";
import { API_URL } from "../../config";

const Header = () => {
    console.log(API_URL,"hello")
    // const {state,dispatch} = useContext(Store)
    const [today,setToday] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
    const dispatch = useAppDispatch()
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        async function fetchCategories() {
            const data = (await axios.get(API_URL+'/category')).data.data
            console.log(data)
            setCategories(data)
            // dispatch({type:'SET_CATEGORY',payload:category})
            dispatch(setCategory(data))
        }
        fetchCategories()
        setInterval(()=>{
            setToday(moment().format('MMMM Do YYYY, h:mm:ss a'))
        },60)
    },[])

    return (
        <>
            {/* time and socials  */}
            <div className="flex justify-between items-center py-1">
                <div className="flex space-x-2">
                    <span className="bg-gray-200 px-2 text-sm">
                        {moment().format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                    {/* subscribe button  */}
                    <Subsribe />
                </div>
                {/* socials  */}
               <SocialsLogos />
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
                    {categories?.map(({name}, i) => (
                        <Link key={i} href={`/${name}`}>
                            <a className="hover:bg-primary-dark font-semibold tracking-wider text-small p-2">
                                {name}
                            </a>
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
};

export default Header;