import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectIsLoading,
    selectUser,
    setIsLoading,
    setUser,
} from "../../app/features/userSlice";
import API from "../../services/API";
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
                const token = Cookies.get("accessToken");
                if(token){
                    const data = (await API.get('/getAuthenticatedUser',{headers:{Authorization:token}})).data.data
                    if (data) {
                        console.log(data);
                        dispatch(setUser({...data,token}));
                    }
                }
                dispatch(setIsLoading(false));
            }catch(error){
                // console.warn(error)
                dispatch(setIsLoading(false));
            }
        }
        getUser();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span>Loading...</span>
            </div>
        );
    }
    if(!isLoading && !user){
       return (<div className="flex justify-center items-center h-screen">
            <button className="bg-blue-500 p-2 text-white font-semibold" onClick={()=>router.push("/auth/login")}>Please Login to Continue</button>
       </div>)
    }

    return <>{children}</>;
};

export default AuthProvider;