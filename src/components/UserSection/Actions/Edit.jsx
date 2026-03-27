import React from 'react'
import { HiPencil } from "react-icons/hi2";
import ToolTip from '../../ToolTip';
import { BiLoaderAlt } from 'react-icons/bi';
import { useModal } from '@/store/useModal';
import AddUser from '../AddUser';
import { useState } from 'react';
const Edit = ({data,refreshListing,refreshData}) => {
const { openModal,closeModal}=useModal();
  const [loading, setLoading] = useState(false);
  
  
const handleOpen=()=>{
     openModal({
          title: "Update User",
          size: "sm",
          height: "h-full",
          content: (
            // <ModalContent
            // fetchUsers={fetchUsers}
            // />
            <AddUser
             update={data}
             // fetchUsers={fetchUsers}
             refreshListing={refreshListing}
             refreshData={refreshData}
            />
          )
        })
}
  return (
    <div className='flex justify-center  items-center'>
            <ToolTip
                content={"Edit User"}
                component={
                    <button
                    onClick={handleOpen}
                    disabled={loading}
                    type="button"
                    className='btn btn-primary cursor-pointer !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center'
                >
                    {loading ? <BiLoaderAlt className=' text-lg text-white animate-spin' /> : <HiPencil className='flex-shrink-0 text-lg text-white' />}
                </button>
                } />
        </div>
  )
}

export default Edit