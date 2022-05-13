import React from "react";

interface Child{
    children:React.ReactFragment
}
export const Admin = ({ children }: any) => {
    const role = JSON.parse(String(localStorage.getItem("user"))).role;
    return role === "admin" && children;
};

export const Editor = ({ children }: Child) => {
    const role = JSON.parse(String(localStorage.getItem("user"))).role;
    
    return (
        <>
        {(role === "admin" || role==="editor") && children}
        </>
    ) ;
};

export const Reporter = ({ children }: any) => {
    const role = JSON.parse(String(localStorage.getItem("user"))).role;
    return (role === "admin" || role==="reporter") && children;
};