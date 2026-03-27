import React from 'react'
import { useModal } from '@/store/useModal'
import ToolTip from '@/components/ToolTip';
import { FiRefreshCw } from "react-icons/fi";
import api from '@/api/axios';
import { useState, useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
const Popup = ({ data, refreshListing }) => {
    const [loading, setloading] = useState(false)
    const { openModal, closeModal } = useModal();

    const callBack = async () => {
        try {
            setloading(true);
            const result = await api.get(`/user/re-invite/${data.id}`)
            console.log("popup result", result);
           
            closeModal()
        } catch (error) {
            console.log("popup Error", error);
            setloading(false)
        }
    }

    return (
        <>
              <div>
            <p>
                Do you confirm to reinvite this user?
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
        </>
    )
}

const Reinvite = ({ data, refreshListing }) => {
    const { openModal, closeModal } = useModal();
    const handleOpen = () => {
        openModal({
            title: "Reinvite User",
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
        <div className='flex justify-center  items-center'>
            <ToolTip
                content={"Resend Invitation"}
                component={
                    <button
                        onClick={handleOpen}
                        type="button"
                        className='btn btn-primary cursor-pointer !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center'
                    >
                        <FiRefreshCw className='flex-shrink-0 text-lg text-white' />
                    </button>
                } />
        </div>
    )
}

export default Reinvite



//  const logger = (msg) => {
//     if (process.env.NODE_ENV === "development") {
//         // console.log(msg)
//     } else {

//     }
// }