import Link from "next/link";
import React from "react";
import Ads from "../Ads";
import News from "../News";
import SideMenu from "./SideMenu";

const MainWrapper = ({children,ads}) => {
    return (
        <div className="grid gap-2 grid-cols-1 lg:grid-cols-4 bg-gray-50 dark:bg-[#151515] min-h-[calc(100vh-5rem)] pt-6 px-1 lg:px-10 ">
            <aside className="col-span-1 pr-6 sticky top-0 h-screen pt-4 lg:pt-2 overflow-y-scroll hidden lg:block">
                <SideMenu />
                <div className="flex flex-wrap text-gray-700 font-extralight">
                    <Link href="" >
                        <span className="text-sm mr-2 py-2">Advertise with us |</span>
                    </Link>
                    <Link href="" >
                        <span className="text-sm mr-2 py-2">Privacy Policy</span>
                    </Link>
                    <Link href="" >
                        <span className="text-sm mr-2 py-2">Terms & Conditions |</span>
                    </Link>
                    <Link href="" >
                        <span className="text-sm mr-2 py-2">Contact Us</span>
                    </Link>
                </div>
                <p className="text-sm text-gray-700 font-extralight my-2">Copyright © 2023 Stateflix, All Rights Reserved</p>
            </aside>
            <main className="col-span-2">
               {children}
            </main>
            <div className="col-span-1 flex-col items-center space-y-6 pt-4 hidden lg:flex ">
                <p className="text-xs text-gray-600">Sponsored</p>

               {ads ? ads.map((ad,index) => (<Ads ad={ad} key={index} />)) : (<Ads />)}
            </div>
        </div>
    );
};

export default MainWrapper;
