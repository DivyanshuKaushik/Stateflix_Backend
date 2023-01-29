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
            console.log(categories,"iniital");
            setLoading(true)
            const cat = (await API.get("/categories")).data.data
            dispatch(setCategories(cat))
            // const publisher =  (await API.get("/publisher")).data.data
            // dispatch(setPublisher(publisher))
            setLoading(false)
        } catch (error) {
            dispatch(setCategories([]))
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        fetchInitialRequiredData()
    },[])
  return (
    !loading && children
  )
}

export default InitialStateProvider