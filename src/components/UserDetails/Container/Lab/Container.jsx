import React from 'react'
import Filters from './Filters'
import { Import } from 'lucide-react'
import { useState,useEffect } from 'react'
import { DESENDING_ORDER,ORDER_DESCENDING, LISTING_LIMIT } from '@/components/UserSection/constant'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import api from '@/api/axios'
import Table from './Table'
import { customStyles } from '@/components/tableCustomStyle'
import { useModal } from '@/store/useModal'
import AddUser from '@/components/UserSection/AddUser'
import AddDepartment from '../Department/AddDepartment'
import AddLabs from './AddLabs'

  function LabContainer({ userData }) {
    const {id} = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({ title: "created_on", order: DESENDING_ORDER });
    const [filters, setFilters] = useState({
      search: "",
      department: "",
      is_approval: "",
      sort_order: ORDER_DESCENDING
    })
const {openModal,closeModal}=useModal();
    const [appliedFilters, setAppliedFilters] = useState({
      search: "",
      department: "",
      is_approval: "",
      sort_order: ORDER_DESCENDING
    })

    const getData = async (curr) => {
      try {

        setLoading(true)
        setError(false)
        let offset = 0;
        if (curr) {
          offset = 0;
        }
        else if (count) {
          offset = currentPage * LISTING_LIMIT + LISTING_LIMIT;
        }
        else {
          offset = 0;
        }

        const result = await api.get(`lab/${id}/lab-user?limit=${LISTING_LIMIT}&&offset=${offset}&search=${appliedFilters.search}&department=${appliedFilters.department ? appliedFilters.department.value.id : ""}&is_approval=${appliedFilters.is_approval ? appliedFilters.is_approval.value : ""}`);
        setData(result.data.payload);
        setLoading(false)
        setCount(result.data.count) 
      } catch (error) {
        //console.log("data log error",error);
        
        setLoading(false)
      }
    }


    const applyFilters = () => {
      const copy = _.cloneDeep(filters)
      //setCurrentPage(1)
      setAppliedFilters(copy)
    }
    useEffect(() => {
      getData(1)
    }, [appliedFilters])

     const resetFilters = () => {
        setCurrentPage(1)
        setFilters({
            search: "",
            department: "",

            is_approval: "",
            sort_order: ORDER_DESCENDING
        })
        setAppliedFilters({
            search: "",
            department: "",

            is_approval: "",
            sort_order: ORDER_DESCENDING
        })

        
    }

    
    const handleNewUser=()=>{
  openModal({
          title: "Assign Lab",
          size: "sm",
          height: "h-full",
          content: (
            <AddLabs
             // update={null} 
              id={userData?.id} 
              role={userData?.role}
            />
          )
  })
        }


    return (
      <div className='max-w-[2300px]  w-[97%] mx-auto bg-content-bg rounded-[6px] mb-4 border-base border-2 px-5 pt-5 '>
        <div className=' max-w-[2300px] w-[97%] mx-auto py-5 text-[#0B2C5F]'>
          <h2 className='text-[30px] font-semibold capitalize'>
            Labs

          </h2>
        </div>

        
        <Filters
          filters={filters}
          setFilters={setFilters}
          appliedFilters={appliedFilters}
          applyFilters={applyFilters}
          role={userData.role}
          resetFilters={resetFilters}
        />

         <div className='flex justify-end space-x-3 max-w-[2300px] my-6 w-[97%] mx-auto '>
                    <button
                        onClick={handleNewUser}
                        type="button"
                        className='btn w-[250px] text-center btn-primary'
                    >
                        <p>
                            Assign Lab
                        </p>
                    </button>
                </div>
        <div
        className=' my-6 mx-4 rounded-lg  overflow-hidden border-2 border-gray-200' >   
<Table
data={data}
customStyles={customStyles}
 role={userData.role}
  loading={loading}
  setSort={setSort}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  count={count}
/>
        </div>
      </div>
    )
  }

export default LabContainer