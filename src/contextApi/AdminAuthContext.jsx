import React, { createContext, useEffect, useState } from 'react'

export const isAdminContext = createContext()
const AdminAuthContext = ({children}) => {
    const [isAdminAuthorized,setIsAdminAuthorized] = useState(false)
    useEffect(()=>{
      const token = sessionStorage.getItem("token")
      const user = JSON.parse(sessionStorage.getItem('user'))
      if(user?.role=="admin"){
          setIsAdminAuthorized(true)
      }else{
          setIsAdminAuthorized(false)
      }
  },[isAdminAuthorized])
  return (
    <isAdminContext.Provider value={{isAdminAuthorized,setIsAdminAuthorized}}>{children}</isAdminContext.Provider>
  )
}

export default AdminAuthContext