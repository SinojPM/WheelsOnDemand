import commonApi from "./commonApi";
import serverUrl from "./serverUrl";
//register
export const registerApi =async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register`,reqBody)
}
//login
export const loginApi = async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody)
}
export const addVehicleApi = async (reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/addVehicle`,reqBody,reqHeader)
}
export const getAllVehiclesOnGarageApi = async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin/allvehicles?search=${searchKey}`,"",reqHeader)
}
export const getAllVehiclesApi = async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/all-vehicles`,"",reqHeader)
}
export const getAllUsersWithSearchApi = async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-users-withsearch?search=${searchKey}`,"",reqHeader)
}
export const getAllVehiclesForUserApi = async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user/allvehicles?search=${searchKey}`,"",reqHeader)
}
export const getVehicleOnViewApi = async(vid,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/${vid}/viewvehicle`,"",reqHeader)
}
export const addBookingToStoreApi = async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-booking`,reqBody,reqHeader)
}
export const getVehicleBookingsApi = async (vid,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/${vid}/vehicle-bookings`,"",reqHeader)
}
export const getUserBookingsApi = async (reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-user-bookings`,"",reqHeader)
}
export const getHomeVehiclesApi = async ()=>{
    return await commonApi('GET',`${serverUrl}/home-vehicles`)
}
export const getAdminBookingsApi = async (searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/bookings-admin?search=${searchKey}`,"",reqHeader)
}
export const getUserBookingsOnAdminApi = async (searchKey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/${searchKey}/user-bookings-admin`,"",reqHeader)
}
export const getUsersOnDashBoardApi = async (reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/total-user`,"",reqHeader)
}
export const getDashboardBookingsApi = async (reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/bookings-dashboard`,"",reqHeader)
}
export const getResponseFromGoogleApi = async (token,reqHeader)=>{
    return await commonApi('GET',`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,'',reqHeader)
}
export const googleLoginApi = async (reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google/login`,reqBody)
}
export const addRecentViewApi = async (reqBody,reqHeader) =>{
    return await commonApi('POST',`${serverUrl}/add/recentView`,reqBody,reqHeader)
}
export const getRecentViewsApi = async (reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/get/recentviews`,"",reqHeader)
}
export const getBookingViewApi = async(bid,reqheader)=>{
    return await commonApi("GET",`${serverUrl}/${bid}/get-booking/view`,"",reqheader)
}
export const addsalesToStrorageApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add/sales`,reqBody,reqHeader)
}
export const updatePaymentStatusOnBookingsApi = async(bid,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/${bid}/update-booking`,"",reqHeader)
}
export const completePickUpApi = async(bid,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/${bid}/edit-status`,"",reqHeader)
}
export const completeReturnApi = async(bid,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/${bid}/edit-status-completed`,"",reqHeader)
}
export const deleteVehicleApi = async(id,reqHeader)=>{
    return await commonApi("DELETE",`${serverUrl}/${id}/delete-vehicle`,"",reqHeader)
}
export const editVehicleApi = async(vid,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/${vid}/edit-vehicle`,reqBody,reqHeader)
}
export const getSalesApi= async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/get-sales`,"",reqHeader)
}
export const cancelBookingApi = async (bid,reqHeader)=>{
    return await commonApi("DELETE",`${serverUrl}/${bid}/cancel-booking`,"",reqHeader)
}
