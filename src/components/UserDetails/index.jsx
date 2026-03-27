import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getUserById } from '@/api/userService'
import { Loading } from '../dashBoard/dashBoard'
import Container from './Container'
import NavBreadCrum from '../breadCrum'
const UserDetail = () => {
    const { id } = useParams();
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
//     const refreshListing = () => {
//     setRefresh(!refresh);
//   }
  const refreshListing = () => {
    setRefresh(!refresh);
  }
const getData = async()=>{
    setLoading(true)
    setError(false)
    try {
        const result = await getUserById(id);
       setUserData(result.payload)
        setLoading(false)
    } catch (error) {
        console.log(error);   
        setLoading(false)
    }
}
useEffect(()=>{
getData();
},[])
  return (
    <>
   {
    loading ? (<Loading/>)
        //     :error ? (
        //   <RetryApi error={error} retry={getData} />
        // ) 
        :
        <>
        <NavBreadCrum
        title={"User Deatil"}
        breadCrum={[
          {
            title:"Diasorin",
            link:"/"
          },
          
          {
            title:"Users",
            link:"/users"
          },
          
          {
            title:<span className='capitalize'>{userData.first_name} {userData.last_name}</span>,
            link:"/users/"+id,
          }
        ]}
        >
        <Container
        userData={userData}
        refreshListing={refreshListing}
        refreshData={getData}
        />
        </NavBreadCrum>
        </>
   }
    </>
  )
}

export default UserDetail