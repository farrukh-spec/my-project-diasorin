import React from 'react'
import { useState,useEffect } from 'react'
import api from '@/api/axios'
import { useModal } from '@/store/useModal'
import ToolTip from '@/components/ToolTip'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { IoBanOutline } from 'react-icons/io5'
import { BiLoaderAlt } from 'react-icons/bi'
const Popup =({data,refreshListing})=>{
    const[loading,setLoading]=useState(false)
    const{openModal,closeModal}=useModal();
    const callBack=async()=>{
try {
    setLoading(true)
    const result = await api.patch(`/user/${data.id}`, { is_active: !data.is_active })
    console.log("result of status popupAtom",result);
    refreshListing()
    closeModal()
} catch (error) {
    if (error) {
        console.log("status popup error",error);
        
    }
    setLoading(false)
}
    }
    return(
         <div>
            <p>
                {
                    data.is_active ?
                        "Do you confirm to disable this user?"
                        :
                       "Do you confirm to activate this user?"

                }
            </p>

            <div className="flex items-center justify-end mt-2 space-x-5">
              
               
                <button
                    disabled={loading}
                    type="button"
                    className="btn btn-primary-outline"
                    onClick={closeModal}
                >
                    {
                        loading ?
                            <div className='flex items-center justify-center'>
                                <BiLoaderAlt className="animate-spin text-xl" />
                            </div>
                            :
                            <p className='text-primary'>
                                Cancel
                            </p>
                    }
                </button>
               
                <button
                    disabled={loading}
                    type="button"
                    className="btn btn-primary"
                    onClick={callBack}
                >
                    {
                        loading ?
                            <div className='flex items-center justify-center'>
                                <BiLoaderAlt className="animate-spin text-xl" />
                            </div>
                            :
                            <p>
                                Yes
                            </p>
                    }
                </button>
            </div>
        </div>
    )
}

const Status = ({data,refreshListing}) => {
const{openModal,closeModal}=useModal();
 const handleOpen = () => {
        openModal({
            title: data.is_active? "Disable User":"Activate User",
            size: "sm",
            height: "h-full",
            content: (
                <Popup
                    data={data}
                    //fetchUsers={fetchUsers}
                    refreshListing={refreshListing}
                />
            )
        })
          //logger("set?")
    }
  return (
   <div className='flex justify-center items-center'>
            <ToolTip
                content={
                    data.is_active ?
                        "Disable User"
                        :
                        "Activate User"
                }
                component={
                    <button
                        onClick={handleOpen}
                        type="button"
                        className='btn btn-primary !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center'
                    >
                        {
                            !data.is_active ?
                                <IoCheckmarkSharp className='flex-shrink-0 text-lg text-white' />
                                :
                                <IoBanOutline className='flex-shrink-0 text-lg text-white' />

                        }
                    </button>
                } />
        </div>
  )
}

export default Status