import React from 'react'

export interface PContext  {
    updated:boolean;
    setUpdated:React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangeContext = React.createContext<PContext>({updated:false,setUpdated:()=>{}});

interface Props {
    children:React.ReactChild
}

const ChangeProvider = ({children}:any) => {
    const [updated,setUpdated] = React.useState(false)
  return (
    <ChangeContext.Provider value={{updated,setUpdated}}>
        {children}
    </ChangeContext.Provider>
  )
}

export default ChangeProvider