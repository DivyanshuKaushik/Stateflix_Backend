import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectIsLoading,
    selectUser,
    setIsLoading,
    setUser,
} from "../../../app/features/authSlice";
import API from "../../../services/API";
import { useRouter } from "next/router";

const AuthLayout = ({ children }) => {
    const router = useRouter();
    // const isLoading = useSelector(selectIsLoading);

    const user = useSelector(selectUser);


    useEffect(()=>{
        if(!user){
            router.replace('/auth/login')
        }
    },[user])

    if (user) {
        return <>{children}</>;
    }
    // return <>{children}</>;

};

export default AuthLayout;