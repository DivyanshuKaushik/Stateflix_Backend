import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectIsLoading,
    selectVisitor,
    setIsLoading,
    setVisitor,
} from "../../../app/features/authSlice";
import API from "../../../services/API";
import { useRouter } from "next/router";

const VisitorProvider = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const visitor = useSelector(selectVisitor);
    useEffect(() => {
        async function getAuthenticatedVisitor() {
            try{
                dispatch(setIsLoading(true));
                const data = (await API.get('/auth/google/login/success',{withCredentials:true})).data.data
                if (data) {
                    dispatch(setVisitor(data));
                }
                dispatch(setIsLoading(false));
            }catch(error){
                // console.warn(error)
                dispatch(setIsLoading(false));
            }
        }
        getAuthenticatedVisitor();
    }, []);

    if(isLoading){
        return  <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
    }

    return <>{children}</>;
};

export default VisitorProvider;