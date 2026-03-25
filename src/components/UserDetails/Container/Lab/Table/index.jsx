import React from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ROLE_MANAGER } from '@/components/UserSection/constant';
import { APPROVER } from '@/components/UserSection/constant';
import { boolean } from 'yup';
import { Loading } from '@/components/dashBoard';
import { LISTING_LIMIT } from '@/components/UserSection/constant';
import ToolTip from '@/components/ToolTip';
import { GrDetach } from "react-icons/gr";
const Table = ({data,customStyles,role,loading,setSort,currentPage,setCurrentPage,count}) => {
  //console.log("data Table data", data);
  const navigate= useNavigate()
  //const{id} = useParams()
  const columns=[
    {
      name:"Lab Id",
      selector: row=> (<div className='font-[600] text-md text-gray-700 flex justify-center'>
                    <p>{row?.lab?.id}</p>
                </div>),
  wrap: true,
            width: "155px"
    },
    {
      name:"Lab Name",
      selector: row => (<p onClick={() => navigate(`/lab/${row.id}`)} className='hover:underline cursor-pointer font-[600] text-md text-gray-700'>
                    {row.lab.name}
                </p>
            ),
            wrap: true
    },
      {
            name: <div className='min-w-[200px]'>Department</div>,
            selector: row => (
                <p className='font-[600] text-md text-gray-700'>
                    {row.lab.department_data.name}
                </p>
            ),
            wrap: true
        },
         role === ROLE_MANAGER.value && {
            name: "Approver",
            selector: row => (
                <p className='font-[600] text-md text-gray-700'>
                    {APPROVER.find(approver => approver.value === row.is_approval)?.label || '-'}
                </p>
            ),
            wrap: true
        },
        {
            name: "Actions",
            selector: row => (
                <div className="flex items-center space-x-5 justify-center">
                    {/* <Delete data={row} refreshListing={refreshListing} userId={id} /> */}
                   <div className='flex justify-center items-center'>

            <ToolTip
                content={"Detach Lab"}
                component={
                    <button
                      //  onClick={handleOpen}
                        type="button"
                        className='btn btn-primary cursor-pointer !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center'
                    >
                        <GrDetach className='flex-shrink-0 text-lg text-white' />
                    </button>
                } />
        </div>
                </div>
            ),
            wrap: true,
            width: "100px"

        },
  ].filter(Boolean)

  const handleSort = (dat, order) => {
        setSort({
            title: dat.selector,
            order: order,
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
  return (
    <div>

      <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      progressComponent={<Loading />}
      progressPending={loading}
      noDataComponent={<span className='py-8'>There are no records to display</span>}
      pagination
      paginationServer
      paginationComponentOptions={{ noRowsPerPage: true }}
      onChangePage={handlePageChange}
      paginationTotalRows={count}
       paginationDefaultPage={currentPage}
        paginationPerPage={LISTING_LIMIT}
      />
    </div>
  )
}

export default Table