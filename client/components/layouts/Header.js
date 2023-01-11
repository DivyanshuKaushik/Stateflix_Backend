import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    HiMenu,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineUserCircle,
    HiSearch,
} from "react-icons/hi";
import useScrollDirection from "../../hooks/useScrollDirection";
import { useTheme } from "next-themes";
import SideMenu from "./SideMenu";
import Drawer from "../utils/Drawer";
const Header = () => {
    const scrollDirection = useScrollDirection();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    return (
        <nav
            className={`${
                scrollDirection === "down" ? "hidden" : "top-0"
            } h-6 flex justify-between items-center w-full py-6 px-6 dark:shadow-none shadow-md sticky z-50 bg-white dark:bg-[#101010]`}
        >
            {/* responsive mobile menu */}
            <button
                className="outline-none border-none lg:hidden"
                onClick={() => setOpen(true)}
            >
                <HiMenu size={24} className="dark:text-white" />
            </button>
            <Drawer
                type="left"
                state={open}
                setState={setOpen}
                width={{ sm: "40%", lg: "30%" }}
            >
                <SideMenu />
            </Drawer>
            {/* logo  */}
            <div className="relative h-6 w-32">
                <Image
                    src="/sf-logo.png"
                    layout="fill"
                    className="h-full w-full object-contain"
                />
            </div>
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? (
                    <span className="text-yellow-600">
                        <HiOutlineSun className="text-xl" />{" "}
                    </span>
                ) : (
                    <span className="text-blue-800">
                        <HiOutlineMoon className="text-xl" />{" "}
                    </span>
                )}
            </button>
        </nav>
    );
};

export default Header;
