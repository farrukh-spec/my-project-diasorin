/* eslint-disable no-undef */
import api from "./axios"

export const getUsers = async ()=>{
const response =  await api.get("ticket/admin-dashboard")
 return response.data
}

export const getUsersTable=async(params)=>{
    const response = await api.get("/user/",{params: params})
     console.log("users response",response);
    return response?.data;

   
    
}

export const getUserById =async(id)=>{
const response = await api.get(`/user/${id}`)
return response?.data

}

export const getWorkerUser=async(params)=>{
    const response = await api.get("/lab/",{params: params})
     console.log("lab response",response);
    return response?.data;

   
    
}

// export const getWorkerUser=async(params)=>{
//     const response = await api.get("/lab/",{params: params})
//      console.log("lab response",response);
//     return response?.data;

   
    
// }

export const getDepartment=async(params)=>{
    const response = await api.get("/department/",{params: params})
     console.log("department response",response);
    return response?.data;  
}

export const addUser=async(payload)=>{
    const response = await api.post("/user/",payload)
    return response;
}
export const updateUser=async(id,payload)=>{
    const response = await api.patch(`/user/update/${id}`,payload)
    return response;
}