import React from "react";
import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function DarkModeBtn() {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
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
    );
}