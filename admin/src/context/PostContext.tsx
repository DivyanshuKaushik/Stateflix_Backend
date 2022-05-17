import React from 'react'

export interface PContext  {
    updated:boolean;
    setUpdated:React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostContext = React.createContext<PContext>({updated:false,setUpdated:()=>{}});

interface Props {
    children:React.ReactChild
}

const PostStateProvider = ({children}:any) => {
    const [updated,setUpdated] = React.useState(false)
  return (
    <PostContext.Provider value={{updated,setUpdated}}>
        {children}
    </PostContext.Provider>
  )
}

export default PostStateProvider