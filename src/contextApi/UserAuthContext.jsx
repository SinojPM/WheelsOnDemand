import React, { createContext, useEffect, useState } from 'react'
export const isUserContext = createContext()

const UserAuthContext = ({children}) => {
    const [isUserAuthorized,setIsUserAuthorized] = useState(false) 
    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user?.role=="user"){
            setIsUserAuthorized(true)
        }else{
            setIsUserAuthorized(false)
        }
    },[isUserAuthorized])
  return (
    <isUserContext.Provider value={{isUserAuthorized,setIsUserAuthorized}}>{children}</isUserContext.Provider>
  )
}

export default UserAuthContext