import React, { createContext, useState } from 'react'

export const addResponseContext = createContext()
export const registerResponseContext = createContext()
export const searchResponseOnAdminContext = createContext()
export const isPayedContext = createContext()
export const editResponseContext = createContext()
export const searchKeyOnVehicleContext = createContext()
export const cancelResponseContext = createContext()
export const pickUpResponseContext = createContext()

const ContextShare = ({children}) => {
  const [cancelResponse,setCancelresponse] = useState('')
    const [addResponse,setAddResponse]=useState('')
    const [registerResponse,setRegisterResponse] = useState("")
    const [searchResponseOnAdmin,setSearchResponseOnAdmin] = useState("")
    const [editResponse,setEditResponse] = useState("")
    const [isPayed,setIsPayed] = useState('')
    const [searchKeyOnvehicle,setSearchKeyOnVehicle] = useState('')
    const [pickUpResponse,setPickUpResponse] = useState('')
  return (
    <pickUpResponseContext.Provider value={{pickUpResponse,setPickUpResponse}}>
      <cancelResponseContext.Provider value={{cancelResponse,setCancelresponse}}>
        <searchKeyOnVehicleContext.Provider value={{searchKeyOnvehicle,setSearchKeyOnVehicle}}>
          <editResponseContext.Provider value={{editResponse,setEditResponse}}>
            <isPayedContext.Provider value={{isPayed,setIsPayed}}>
              <searchResponseOnAdminContext.Provider value={{searchResponseOnAdmin,setSearchResponseOnAdmin}}>
                <registerResponseContext.Provider value={{registerResponse,setRegisterResponse}}>
                  <addResponseContext.Provider value={{addResponse,setAddResponse}}>
                      {children}
                  </addResponseContext.Provider>
                </registerResponseContext.Provider>
              </searchResponseOnAdminContext.Provider>
            </isPayedContext.Provider>
          </editResponseContext.Provider>
        </searchKeyOnVehicleContext.Provider>
      </cancelResponseContext.Provider>
    </pickUpResponseContext.Provider>
  )
}

export default ContextShare