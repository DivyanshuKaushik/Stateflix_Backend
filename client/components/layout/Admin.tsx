import React, { useState,useEffect, useContext } from 'react'
import { useRouter } from 'next/router' 
import Cookie from 'js-cookie'
import API from '../../service/API'
import { Store } from '../../app/StoreProvider'

const Admin = ({children}) => {
    const router = useRouter();
    const [user, setUser] = useState({})
    useEffect(()=>{
        async function getAuthUser(){
            try{
                const token = Cookie.get('accessToken')
                if(!token) router.push('/login')
                const user = (await API.get('/getAuthenticatedUser')).data
                if(!(user && user.role==="admin")) router.push('/login')
                setUser(user)
                console.log(user)

            }catch(error){
                router.push('/login')
            }
        }
        getAuthUser()
    },[])
    // const {state,dispatch} = useContext(Store)

    // useEffect(()=>{
    //     dispatch({type:'CREATE_USER_SESSION'})
    //     console.log(state.user,"user")
    // },[])

    
  return (
   <div>
       {user ? children : <div>You are not authorized to view this page</div>}
   </div>
  )
}

export default Admin