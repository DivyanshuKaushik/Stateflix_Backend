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
                console.log("visitor",  data);
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

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span>Loading...</span>
            </div>
        );
    }

    return <>{children}</>;
};

export default VisitorProvider;