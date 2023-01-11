import Image from "next/image";
import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import useScrollDirection from "../../hooks/useScrollDirection";

import SideMenu from "./SideMenu";
import Drawer from "../utils/Drawer";
import { useSelector } from "react-redux";
import { selectVisitor } from "../../app/features/authSlice";
import VisitorProfile from "./header/VisitorProfile";
import DarkModeBtn from "../utils/DarkModeBtn";
import { Stack } from "@mui/material";

const Header = () => {
    const visitor = useSelector(selectVisitor);
    const scrollDirection = useScrollDirection();
    const [open, setOpen] = useState(false);
    const googleLogin = () => {
        window.open(
            `${process.env.STATEFLIX_API_URI}/auth/google/callback`,
            "_self"
        );
    };
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
                    alt="Stateflix Logo"
                />
            </div>
            {/* {visitor.name} */}
            {visitor ? (
                <VisitorProfile visitor={visitor} />
            ) : (
                <Stack direction="row" spacing={2}>
                    <button
                        className="outline-none border-none flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full"
                        onClick={googleLogin}
                    >
                        <Image
                            src="https://img.icons8.com/color/480/null/google-logo.png"
                            height={25}
                            width={25}
                            alt="google"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            SignIn / SignUp
                        </span>
                    </button>
                    <DarkModeBtn />
                </Stack>
            )}
        </nav>
    );
};

export default Header;
