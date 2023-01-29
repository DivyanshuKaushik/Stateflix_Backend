import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectIsLoading,
    selectUser,
    setIsLoading,
    setUser,
} from "../../../app/features/authSlice";
import API from "../../../services/API";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const user = useSelector(selectUser);
    useEffect(() => {
        async function getUser() {
            try{
                dispatch(setIsLoading(true));
                // const token = Cookies.get("accessToken");
                // if(token){
                    const data = (await API.get('/getAuthenticatedUser')).data.data
                    if (data) {
                        dispatch(setUser(data));
                    }
                // }
                dispatch(setIsLoading(false));
            }catch(error){
                // console.warn(error)
                dispatch(setIsLoading(false));
            }
        }
        getUser();
    }, []);

    if(isLoading){
        return  <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
    }
    if(!isLoading && !user){
       return (<div className="flex justify-center items-center h-screen">
            <button className="bg-blue-500 p-2 text-white font-semibold" onClick={()=>router.push("/auth/login")}>Please Login to Continue</button>
       </div>)
    }

    return <>{children}</>;
};

export default AuthProvider;