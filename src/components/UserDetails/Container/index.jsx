import React from 'react'
import { ROLES_ARR } from '@/components/UserSection/constant'
import { ROLE_DEPARTMENT_MANGER,ROLE_MANAGER,ROLE_WORKER } from '@/components/UserSection/constant'
import DepartmentContainer from './Department/Container'
import LabContainer from './Lab/Container'
const Container = ({userData}) => {
  return (
    <div>
    
    {
                userData &&
                <div className='max-w-[2300px] w-[97%] mx-auto mt-5 justify-between flex items-start bg-content-bg rounded-[6px] border-base border-2 p-5 mb-4 text-[#0B2C5F]'>
                    <div className='p-4'>
                        <h2 className='text-[30px] font-semibold capitalize'>
                            {userData?.first_name} {userData?.last_name}
                        </h2>
                        
                        <p className='text-[18px] mt-2'>
                            <span className='font-semibold'>Email:</span> {userData?.email}
                        </p>
                        <p className='text-[18px] mt-1'>
                            <span className='font-semibold'>Role:</span> {ROLES_ARR.find(role => role.value === userData?.role)?.label}
                        </p>
                    </div>
                    <div className='p-4'>
                    {/* <Edit data={userData} refreshListing={refreshListing} /> */}
                    </div>
                </div>


            }
            {
                userData?.role === ROLE_DEPARTMENT_MANGER.value && 
                <DepartmentContainer
                userData={userData}
                />
            }

            {
                (userData?.role === ROLE_WORKER.value || userData.role === ROLE_MANAGER.value) &&
                <LabContainer
                userData={userData}
                />
            }

    </div>
  )
}

export default Container