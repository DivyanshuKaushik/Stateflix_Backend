import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategories } from '../app/features/categorySlice';
import { setPublisher } from '../app/features/publisherSlice';

import API from '../services/API';

const InitialStateProvider = ({children,categories}) => {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();

    async function fetchInitialRequiredData(){
        try {
            setLoading(true)
            const cat = (await API.get("/categories")).data.data
            dispatch(setCategories(cat))
            const publisher =  (await API.get("/publisher")).data.data
            dispatch(setPublisher(publisher))
            setLoading(false)
        } catch (error) {
            console.log(error);
            dispatch(setCategories([]))
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        fetchInitialRequiredData()
    },[])
    if(loading){
        return  <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
    }
  return (
    !loading && children
  )
}

export default InitialStateProvider