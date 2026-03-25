import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getUserById } from '@/api/userService'
import { Loading } from '../dashBoard'
import Container from './Container'
const UserDetail = () => {
    const { id } = useParams();
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
//     const refreshListing = () => {
//     setRefresh(!refresh);
//   }

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
        <Container
        userData={userData}
        />
        </>
   }
    </>
  )
}

export default UserDetail