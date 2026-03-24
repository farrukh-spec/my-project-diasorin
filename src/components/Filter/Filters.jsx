import React from 'react'
import FilterSelect from './FilterSelect'
//import { ROLES_ARR } from './Constants'
import { useState } from 'react'
import { customStyle } from './selectFiledsStyles'
import { ROLES_ARR,ORDER_DESCENDING,USER_STATUS } from './Constants'
//import { ORDER_DESCENDING,ROLES_ARR,USER_STATUS } from '../UserSection/constant'
import _ from 'lodash'
const Filters = ({filters,setFilters, applyFilters,appliedFilters,resetFilters}) => {
     const [selectedOption, setSelectedOption] = useState(null)
const setFilterState=(value,field)=>{
   // const copy= _.cloneDeep(filters)
    setFilters(old => {
        const copy= _.cloneDeep(old)
        copy[field]=value
        return copy
    })
}

const handleSearchKey = (event)=>{
if (event.key==="Enter"){
 applyFilters();
}
}
  return (
   <>
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-3' >
   <FilterSelect
    options={ROLES_ARR}
        state={filters.role}
        setState={(value) => setFilterState(value, "role")}
        placeholder="All "
        customStyle={customStyle}
         label_text={"Role"}
       // isDisabled={true}
   />

   <FilterSelect
    options={USER_STATUS}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        isMulti={true}
        placeholder="All"
        customStyle={customStyle}
        label_text={"All"}
       // isDisabled={true}
   />

<div 
className="flex items-end z-0"
>
    <button
     disabled={!(appliedFilters.search || appliedFilters?.user_status || appliedFilters?.role || appliedFilters?.department || appliedFilters?.lab || appliedFilters.sort_order.value !== ORDER_DESCENDING.value)}
     onClick={resetFilters}
      type="button"
     className={`w-full rounded-sm col-span-2 btn !py-2 !px-4 h-[42px] !text-sm btn-primary-outline z-0`}
    >
Reset Filters
    </button>
</div>
    <div className="flex items-end">
                    <button
                        disabled={
                            filters.search === appliedFilters.search
                                &&
                                filters.user_status?.value === appliedFilters.user_status?.value
                                &&
                                filters.role?.value === appliedFilters.role?.value
                                &&
                                filters.department?.value === appliedFilters.department?.value
                                &&
                                filters.lab?.value === appliedFilters.lab?.value
                                &&
                                filters.sort_order?.value === appliedFilters.sort_order?.value
                                ?
                                true
                                :
                                false
                        }
                        onClick={applyFilters}
                        type="button"
                        className='w-full col-span-2 btn rounded-sm !py-2 !px-4 h-[42px] !text-sm btn-primary'
                    >
                        <p className='relative'>
                           Apply Filters
                        </p>
                    </button>
                </div>
   </div>
   </>
  )
}

export default Filters