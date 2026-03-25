import React from 'react'
import { useState } from 'react'
import { ORDER_DESCENDING, APPROVER } from '@/components/UserSection/constant'
import FilterSearch from '@/components/Filter/FilterSearch'
import FilterSelect from '@/components/Filter/FilterSelect'
import FilterSelectApi from '@/components/Filter/FilterSelectApi'
import { ROLE_MANAGER } from '@/components/UserSection/constant'
import { customStyle } from '@/components/Filter/selectFiledsStyles'
import _ from 'lodash'
const Filters = ({ filters, setFilters, appliedFilters, applyFilters, role,resetFilters }) => {
  const setFilterState = (value, field) => {
    // const copy= _.cloneDeep(filters)
    setFilters(old => {
      const copy = _.cloneDeep(old)
      copy[field] = value
      return copy
    })
  }
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };
  
  return (
    <div
      className='max-w-[2300px] w-[97%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-3'
    >
      <div
        onKeyDown={handleSearchKeyDown}
      >
        <FilterSearch
          placeholder={"Search"}
          label_text={"Search"}
          setState={(value) => setFilterState(value, "search")}
          state={filters.search}
        />
      </div>
      <FilterSelectApi
        isClearable={true}
        state={filters.department}
        setState={(value) => setFilterState(value, "department")}
        label_text={"Department"}
        placeholder={"All"}
        // url="api/department"
        url="department"
        valueGenerator={val => ({ label: val.name ? val.name : "-", value: val })}
      />
      {
        role === ROLE_MANAGER.value &&
        <FilterSelect
          options={APPROVER}
          state={filters.is_approval}
          setState={(value) => setFilterState(value, "is_approval")}
          placeholder="All "
          customStyle={customStyle}
          label_text={"Approver"}
        // isDisabled={true}
        />
      }

    <div
                    className="flex items-end z-0"
                >
                    <button
                        disabled={!(appliedFilters.search || appliedFilters?.is_approval || appliedFilters?.department || appliedFilters.sort_order.value !== ORDER_DESCENDING.value)}
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
                                filters.is_approval?.value === appliedFilters.is_approval?.value
                                &&
                                filters.department?.value === appliedFilters.department?.value
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
  )
}

export default Filters